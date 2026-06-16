const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// @route   POST api/projects
// @desc    Create a project
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, tech, difficulty, githubRepo } = req.body;

        const newProject = new Project({
            title,
            description,
            tech: typeof tech === 'string' ? tech.split(',').map(t => t.trim()) : tech,
            difficulty,
            githubRepo: githubRepo || "",
            owner: req.user
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects
// @desc    Get all projects with search/filter
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, tech, difficulty } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (tech) {
            query.tech = { $in: tech.split(',') };
        }
        if (difficulty) {
            query.difficulty = difficulty;
        }

        const projects = await Project.find(query)
            .populate('owner', ['name', 'email'])
            .populate('team', ['name', 'email'])
            .sort({ createdAt: -1 });
            
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/me
// @desc    Get current user's projects
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user })
            .populate('team', ['name', 'email']);
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/recommended
// @desc    Get recommended projects based on user skills
// @access  Private
router.get('/recommended', auth, async (req, res) => {
    try {
        const user = await require('../models/User').findById(req.user);
        if (!user || !user.skills.length) {
            // If no skills, return recent projects
            const projects = await Project.find().sort({ createdAt: -1 }).limit(10);
            return res.json(projects);
        }

        const projects = await Project.find({
            tech: { $in: user.skills },
            owner: { $ne: req.user }
        })
        .populate('owner', ['name', 'email'])
        .sort({ createdAt: -1 });

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/joined
// @desc    Get projects the user has joined as a team member
// @access  Private
router.get('/joined', auth, async (req, res) => {
    try {
        const projects = await Project.find({ team: req.user })
            .populate('owner', ['name', 'email'])
            .populate('team', ['name', 'email']);
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/:id/suggested-teammates
// @desc    Get suggested teammates for a project based on skill match
// @access  Private
router.get('/:id/suggested-teammates', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Only project owner can get suggested teammates
        if (project.owner.toString() !== req.user) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const projectSkills = project.tech || [];
        if (projectSkills.length === 0) {
            return res.json([]);
        }

        // Get all users who are not the owner and not already in the team
        const User = require('../models/User');
        const users = await User.find({
            _id: { $ne: req.user, $nin: project.team },
            skills: { $exists: true, $ne: [] }
        }).select('name email skills bio github linkedin');

        const suggestions = [];

        users.forEach(user => {
            // Find intersection between user skills and project required tech (case-insensitive)
            const matchingSkills = user.skills.filter(skill => 
                projectSkills.some(projSkill => projSkill.toLowerCase() === skill.toLowerCase())
            );

            if (matchingSkills.length > 0) {
                const matchPercentage = Math.round((matchingSkills.length / projectSkills.length) * 100);
                suggestions.push({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        skills: user.skills,
                        bio: user.bio,
                        github: user.github,
                        linkedin: user.linkedin
                    },
                    matchingSkills,
                    matchPercentage
                });
            }
        });

        // Sort by matchPercentage descending
        suggestions.sort((a, b) => b.matchPercentage - a.matchPercentage);

        res.json(suggestions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('owner', ['name', 'email', 'skills', 'bio', 'github', 'linkedin'])
            .populate('team', ['name', 'email', 'skills']);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Check user
        if (project.owner.toString() !== req.user) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const { title, description, tech, status, difficulty, githubRepo } = req.body;
        const updatedFields = {};
        if (title) updatedFields.title = title;
        if (description) updatedFields.description = description;
        if (tech) updatedFields.tech = typeof tech === 'string' ? tech.split(',').map(t => t.trim()) : tech;
        if (status) updatedFields.status = status;
        if (difficulty) updatedFields.difficulty = difficulty;
        if (githubRepo !== undefined) updatedFields.githubRepo = githubRepo;

        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Check user
        if (project.owner.toString() !== req.user) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Project.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
