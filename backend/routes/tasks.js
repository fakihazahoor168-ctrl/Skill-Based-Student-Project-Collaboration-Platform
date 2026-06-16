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
        const isTeam = project.team.some(member => member.toString() === req.user) || project.owner.toString() === req.user;
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
// @desc    Update task (status for team members, full edit for owner)
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, deadline, assignedTo, status } = req.body;
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        const project = await Project.findById(task.project);
        if (!project) return res.status(404).json({ msg: 'Associated project not found' });

        const isOwner = project.owner.toString() === req.user;
        const isTeamMember = project.team.some(member => member.toString() === req.user);

        if (!isOwner && !isTeamMember) {
            return res.status(401).json({ msg: 'User not authorized to update this task' });
        }

        if (status !== undefined) {
            task.status = status;
        }

        // Only project owner can edit task details (title, description, deadline, assignedTo)
        if (isOwner) {
            if (title !== undefined) task.title = title;
            if (description !== undefined) task.description = description;
            if (deadline !== undefined) task.deadline = deadline;
            if (assignedTo !== undefined) task.assignedTo = assignedTo ? assignedTo : null;
        } else if (title !== undefined || description !== undefined || deadline !== undefined || assignedTo !== undefined) {
            return res.status(401).json({ msg: 'Only the project owner can edit task details' });
        }

        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        const project = await Project.findById(task.project);
        if (!project) return res.status(404).json({ msg: 'Associated project not found' });

        // Only project owner can delete tasks
        if (project.owner.toString() !== req.user) {
            return res.status(401).json({ msg: 'Only the project owner can delete tasks' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
