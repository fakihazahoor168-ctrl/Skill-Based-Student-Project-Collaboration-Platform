const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const Notification = require('../models/Notification');
const Project = require('../models/Project');

// @route   POST api/comments/:projectId
// @desc    Add a comment to a project
// @access  Private
router.post('/:projectId', auth, async (req, res) => {
    try {
        const { text } = req.body;
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        const newComment = new Comment({
            project: req.params.projectId,
            user: req.user,
            text
        });

        const comment = await newComment.save();
        const populatedComment = await comment.populate('user', ['name']);

        // Notify Project Owner (if commenter is not the owner)
        if (project.owner.toString() !== req.user) {
            const notification = new Notification({
                user: project.owner,
                sender: req.user,
                project: project._id,
                type: 'new_comment',
                message: `${populatedComment.user.name} commented on your project "${project.title}"`
            });
            await notification.save();
        }

        res.json(populatedComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/comments/:projectId
// @desc    Get all comments for a project
// @access  Public
router.get('/:projectId', async (req, res) => {
    try {
        const comments = await Comment.find({ project: req.params.projectId })
            .populate('user', ['name'])
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
