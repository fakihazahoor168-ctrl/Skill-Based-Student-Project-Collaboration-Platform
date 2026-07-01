const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');

// Helper to clean and extract JSON object from model output
function extractJSONObject(text) {
    let cleanText = text.trim();
    
    // Remove markdown codeblock backticks if present
    if (cleanText.startsWith('```')) {
        const firstLineEnd = cleanText.indexOf('\n');
        const lastLineStart = cleanText.lastIndexOf('```');
        if (firstLineEnd !== -1 && lastLineStart !== -1) {
            cleanText = cleanText.substring(firstLineEnd, lastLineStart).trim();
        }
    }
    
    // Find the first '{' and last '}' to isolate the JSON object
    const startIdx = cleanText.indexOf('{');
    const endIdx = cleanText.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
        cleanText = cleanText.substring(startIdx, endIdx + 1);
    }
    
    return JSON.parse(cleanText);
}

// @route   POST api/ai/generate-roadmap/:projectId
// @desc    Generate a roadmap of 5 tasks using Hugging Face (Llama-3.3-70B-Instruct)
// @access  Private
router.post('/generate-roadmap/:projectId', auth, async (req, res) => {
    try {
        const token = process.env.HF_TOKEN;
        if (!token) {
            return res.status(400).json({ 
                msg: 'Hugging Face API Token is missing. Please add HF_TOKEN to backend/.env to use this feature.' 
            });
        }

        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Only project owner can generate the roadmap
        const isOwner = project.owner.toString() === req.user;
        if (!isOwner) {
            return res.status(401).json({ msg: 'Not authorized: Only the project owner can generate a roadmap.' });
        }

        const systemPrompt = `You are a professional project manager. Provide exactly 5 initial, logical project tasks to kickstart this student project.
You must return a JSON object with a single key "tasks" containing the array of 5 task objects.
Each task object in the array must have exactly these keys:
- "title": (String, short actionable title, max 50 chars)
- "description": (String, detailed step-by-step description, max 200 chars)

Do not include any text outside of the JSON object.`;

        const userPrompt = `Project Title: "${project.title}"
Project Description: "${project.description}"
Technologies: ${project.tech.join(', ')}`;

        // Request body using OpenAI-compatible format and forcing JSON mode output
        const requestBody = {
            model: "meta-llama/Llama-3.3-70B-Instruct",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.1,
            max_tokens: 800
        };

        const modelEndpoint = "https://router.huggingface.co/v1/chat/completions";
        
        const response = await fetch(modelEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('Hugging Face API Error Response:', errText);
            
            // Check for Hugging Face model loading (503) error
            if (response.status === 503) {
                return res.status(503).json({ 
                    msg: 'The Hugging Face model is currently loading. Please wait a few seconds and try again.' 
                });
            }
            
            return res.status(502).json({ msg: 'Error communicating with Hugging Face API.', details: errText });
        }

        const data = await response.json();
        
        // Extract content from OpenAI response structure
        const textResult = data.choices?.[0]?.message?.content;
        if (!textResult) {
            return res.status(502).json({ msg: 'No response content received from Hugging Face model.' });
        }

        let generatedTasks;
        try {
            const parsedObj = extractJSONObject(textResult);
            generatedTasks = parsedObj.tasks;
        } catch (parseError) {
            console.error('Failed to parse Hugging Face output as JSON:', textResult, parseError);
            return res.status(502).json({ 
                msg: 'AI response did not contain a valid JSON task array.', 
                text: textResult 
            });
        }

        if (!Array.isArray(generatedTasks)) {
            return res.status(502).json({ msg: 'AI did not return an array of tasks.' });
        }

        // Map and save tasks to the database
        const taskPromises = generatedTasks.slice(0, 5).map(taskData => {
            const newTask = new Task({
                project: project._id,
                title: taskData.title,
                description: taskData.description,
                status: 'todo'
            });
            return newTask.save();
        });

        const savedTasks = await Promise.all(taskPromises);
        res.json({ success: true, tasks: savedTasks });

    } catch (err) {
        console.error('Error generating roadmap with Hugging Face:', err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/ai/match-explanation
// @desc    Generate AI explanations for why suggested teammates are a good fit
// @access  Private
router.post('/match-explanation', auth, async (req, res) => {
    try {
        const token = process.env.HF_TOKEN;
        if (!token) {
            return res.status(400).json({ msg: 'HF_TOKEN is missing in backend/.env' });
        }

        const { projectTitle, projectTech, teammates } = req.body;

        if (!teammates || teammates.length === 0) {
            return res.json({ explanations: {} });
        }

        // Build a concise prompt for all teammates at once
        const teammateList = teammates.map((t, i) => 
            `${i + 1}. "${t.name}" — Skills: [${t.skills.join(', ')}], Matching: [${t.matchingSkills.join(', ')}], Match: ${t.matchPercentage}%`
        ).join('\n');

        const systemPrompt = `You are an expert talent recruiter. For each candidate below, write a brief 1-sentence explanation (max 80 chars) of why they are a good fit for the project.
Return a JSON object where each key is the candidate number (as a string like "1", "2", etc.) and the value is the explanation string.
Do not include any text outside of the JSON object.`;

        const userPrompt = `Project: "${projectTitle}"
Required Tech: [${projectTech.join(', ')}]

Candidates:
${teammateList}`;

        const requestBody = {
            model: "meta-llama/Llama-3.3-70B-Instruct",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2,
            max_tokens: 500
        };

        const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('HF Match Explanation Error:', errText);
            return res.status(502).json({ msg: 'Error communicating with Hugging Face API.' });
        }

        const data = await response.json();
        const textResult = data.choices?.[0]?.message?.content;

        if (!textResult) {
            return res.json({ explanations: {} });
        }

        try {
            const parsed = extractJSONObject(textResult);
            // Map the numbered keys back to teammate user IDs
            const explanations = {};
            teammates.forEach((t, i) => {
                explanations[t.userId] = parsed[String(i + 1)] || "Strong skill match for this project.";
            });
            res.json({ explanations });
        } catch (parseError) {
            console.error('Failed to parse match explanation JSON:', textResult);
            // Return generic explanations if parsing fails
            const explanations = {};
            teammates.forEach(t => {
                explanations[t.userId] = "Strong skill match for this project.";
            });
            res.json({ explanations });
        }

    } catch (err) {
        console.error('Error generating match explanations:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
