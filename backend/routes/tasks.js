const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');

// @route   POST api/tasks/:projectId
// @desc    Create a task for a project
// @access  Private
router.post('/:projectId', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        // Only owner or team members can add tasks
        const isTeam = project.team.includes(req.user) || project.owner.toString() === req.user;
        if (!isTeam) return res.status(401).json({ msg: 'Not authorized' });

        const { title, description, assignedTo, deadline } = req.body;
        const newTask = new Task({
            project: req.params.projectId,
            title,
            description,
            assignedTo,
            deadline
        });

        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/tasks/:projectId
// @desc    Get all tasks for a project
// @access  Private
router.get('/:projectId', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId })
            .populate('assignedTo', ['name', 'email'])
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/tasks/:id
// @desc    Update task status
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task.status = status;
        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
