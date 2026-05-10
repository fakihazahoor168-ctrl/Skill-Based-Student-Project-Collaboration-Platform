const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Project = require('../models/Project');

// @route   POST api/applications/:projectId
// @desc    Apply for a project
// @access  Private
router.post('/:projectId', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Check if user is the owner
        if (project.owner.toString() === req.user) {
            return res.status(400).json({ msg: 'You cannot apply for your own project' });
        }

        // Check if already applied
        const existingApp = await Application.findOne({
            project: req.params.projectId,
            applicant: req.user
        });

        if (existingApp) {
            return res.status(400).json({ msg: 'Already applied for this project' });
        }

        const newApplication = new Application({
            project: req.params.projectId,
            applicant: req.user,
            message: req.body.message
        });

        const application = await newApplication.save();

        // Create Notification for Project Owner
        const Notification = require('../models/Notification');
        const applicant = await require('../models/User').findById(req.user);
        
        const notification = new Notification({
            user: project.owner,
            sender: req.user,
            project: project._id,
            type: 'application',
            message: `${applicant.name} has applied to join your project "${project.title}"`
        });
        await notification.save();

        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/applications/project/:projectId
// @desc    Get all applications for a specific project (Owner only)
// @access  Private
router.get('/project/:projectId', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        if (project.owner.toString() !== req.user) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const applications = await Application.find({ project: req.params.projectId })
            .populate('applicant', ['name', 'email', 'skills'])
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/applications/:id
// @desc    Update application status (Accept/Reject)
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        let application = await Application.findById(req.params.id).populate('project');

        if (!application) {
            return res.status(404).json({ msg: 'Application not found' });
        }

        // Check if user is project owner
        if (application.project.owner.toString() !== req.user) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        application.status = status;
        await application.save();

        // Create Notification for Applicant
        const Notification = require('../models/Notification');
        const notification = new Notification({
            user: application.applicant,
            sender: req.user,
            project: application.project._id,
            type: status === 'accepted' ? 'accepted' : 'rejected',
            message: `Your application to join "${application.project.title}" has been ${status}.`
        });
        await notification.save();

        // If accepted, add to team
        if (status === 'accepted') {
            const project = await Project.findById(application.project._id);
            if (!project.team.includes(application.applicant)) {
                project.team.push(application.applicant);
                await project.save();
            }
        }

        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/applications/me
// @desc    Get my applications
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user })
            .populate('project', ['title', 'owner', 'status'])
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/applications/received
// @desc    Get applications received for my projects
// @access  Private
router.get('/received', auth, async (req, res) => {
    try {
        // Find projects owned by the user
        const projects = await Project.find({ owner: req.user });
        const projectIds = projects.map(p => p._id);

        const applications = await Application.find({ project: { $in: projectIds } })
            .populate('project', ['title'])
            .populate('applicant', ['name', 'email', 'skills'])
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
