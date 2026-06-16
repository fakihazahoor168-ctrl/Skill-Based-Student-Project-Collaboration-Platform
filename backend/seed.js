const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Comment = require('./models/Comment');
const Application = require('./models/Application');
const Notification = require('./models/Notification');

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB.');

        // ========== WIPE DATABASE ==========
        console.log('Wiping all collections...');
        await User.deleteMany({});
        await Project.deleteMany({});
        await Task.deleteMany({});
        await Comment.deleteMany({});
        await Application.deleteMany({});
        await Notification.deleteMany({});
        console.log('All collections cleared.');

        // ========== CREATE USERS ==========
        console.log('Creating users...');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('123456', salt);

        const fakiha = new User({
            name: 'Fakiha Zahoor',
            email: 'fakiha@test.com',
            password: passwordHash,
            skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Python', 'JavaScript'],
            bio: 'Full Stack Developer & Computer Science student passionate about building scalable web applications and AI-powered tools.',
            github: 'https://github.com/fakiha',
            linkedin: 'https://linkedin.com/in/fakiha'
        });
        await fakiha.save();
        console.log('  ✅ Fakiha created');

        const laiba = new User({
            name: 'Laiba Khan',
            email: 'laiba@test.com',
            password: passwordHash,
            skills: ['React', 'Python', 'Machine Learning', 'Figma', 'TensorFlow', 'UI/UX Design'],
            bio: 'AI Enthusiast & UI/UX Designer. Love creating beautiful interfaces powered by intelligent algorithms.',
            github: 'https://github.com/laiba',
            linkedin: 'https://linkedin.com/in/laiba'
        });
        await laiba.save();
        console.log('  ✅ Laiba created');

        const ali = new User({
            name: 'Ali Ahmed',
            email: 'ali@test.com',
            password: passwordHash,
            skills: ['Python', 'Django', 'Flask', 'PostgreSQL', 'Docker'],
            bio: 'Backend developer specializing in Python microservices and cloud deployment.',
            github: 'https://github.com/ali',
            linkedin: 'https://linkedin.com/in/ali'
        });
        await ali.save();
        console.log('  ✅ Ali created');

        // ========== PROJECT 1: Fakiha's Project (Team: Laiba) ==========
        console.log('Creating projects...');
        const project1 = new Project({
            title: 'AI Study Assistant',
            description: 'A smart platform that helps students summarize their lecture notes, generate quizzes, and track their study progress using AI and NLP techniques.',
            tech: ['React', 'Node.js', 'Python', 'MongoDB'],
            difficulty: 'advanced',
            status: 'in-progress',
            githubRepo: 'microsoft/BotFramework-WebChat',
            owner: fakiha._id,
            team: [laiba._id]
        });
        await project1.save();
        console.log('  ✅ Project 1: AI Study Assistant');

        // Tasks for Project 1
        await Task.create([
            {
                project: project1._id,
                title: 'Design Dashboard UI',
                description: 'Create Figma mockups and implement the main student dashboard in React with charts and progress tracking.',
                status: 'in-progress',
                assignedTo: laiba._id,
                deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            },
            {
                project: project1._id,
                title: 'Setup MongoDB Schemas',
                description: 'Design and implement all database schemas for Users, Notes, Quizzes, and Study Sessions.',
                status: 'completed',
                assignedTo: fakiha._id,
                deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            },
            {
                project: project1._id,
                title: 'Build REST API Endpoints',
                description: 'Create Express routes for CRUD operations on notes and quizzes with JWT authentication.',
                status: 'todo',
                assignedTo: fakiha._id,
                deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
            }
        ]);
        console.log('  ✅ 3 Tasks added to Project 1');

        // Comments for Project 1
        await Comment.create([
            {
                project: project1._id,
                user: fakiha._id,
                text: 'Hey Laiba! Welcome to the project. I have finished the database schemas. Can you start working on the dashboard mockups?'
            },
            {
                project: project1._id,
                user: laiba._id,
                text: 'Sure Fakiha! I have started the Figma designs. The color palette looks amazing with the dark theme. Will share the link by tomorrow!'
            },
            {
                project: project1._id,
                user: fakiha._id,
                text: 'Great work! Also, I have integrated the GitHub repo so we can track our commits directly from the workspace.'
            }
        ]);
        console.log('  ✅ Comments added to Project 1');

        // ========== PROJECT 2: Laiba's Project (Team: Fakiha) ==========
        const project2 = new Project({
            title: 'EcoTrack - Carbon Footprint Calculator',
            description: 'An interactive web app that helps users calculate and reduce their daily carbon footprint through personalized recommendations and gamification.',
            tech: ['React', 'Python', 'Machine Learning', 'Figma'],
            difficulty: 'intermediate',
            status: 'open',
            githubRepo: 'facebook/react',
            owner: laiba._id,
            team: [fakiha._id]
        });
        await project2.save();
        console.log('  ✅ Project 2: EcoTrack');

        // Tasks for Project 2
        await Task.create([
            {
                project: project2._id,
                title: 'Train ML Model for Predictions',
                description: 'Train a machine learning model to predict carbon footprint based on user lifestyle data.',
                status: 'in-progress',
                assignedTo: laiba._id,
                deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            },
            {
                project: project2._id,
                title: 'Build API for Recommendations',
                description: 'Create Express API endpoints that serve personalized eco-friendly recommendations.',
                status: 'todo',
                assignedTo: fakiha._id,
                deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
            }
        ]);
        console.log('  ✅ 2 Tasks added to Project 2');

        // Comments for Project 2
        await Comment.create([
            {
                project: project2._id,
                user: laiba._id,
                text: 'I have started working on the ML model. Using TensorFlow with a dataset of carbon emission factors. Looking promising!'
            },
            {
                project: project2._id,
                user: fakiha._id,
                text: 'Awesome Laiba! I will set up the backend APIs this week so the model predictions can be served to the frontend.'
            }
        ]);
        console.log('  ✅ Comments added to Project 2');

        // ========== PROJECT 3: Fakiha's Solo Project (Open for applications) ==========
        const project3 = new Project({
            title: 'SkillSync - Team Collaboration Platform',
            description: 'A project management and team collaboration platform where students can create projects, find teammates based on skill matching, manage tasks, and communicate in real-time.',
            tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript'],
            difficulty: 'advanced',
            status: 'in-progress',
            githubRepo: 'vercel/next.js',
            owner: fakiha._id,
            team: []
        });
        await project3.save();
        console.log('  ✅ Project 3: SkillSync');

        // Tasks for Project 3
        await Task.create([
            {
                project: project3._id,
                title: 'Implement JWT Authentication',
                description: 'Set up user registration, login, and JWT token-based authentication for the entire application.',
                status: 'completed',
                assignedTo: fakiha._id,
                deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                project: project3._id,
                title: 'Build Notification System',
                description: 'Create a notification system that alerts project owners when someone applies to join their project.',
                status: 'completed',
                assignedTo: fakiha._id,
                deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                project: project3._id,
                title: 'Add GitHub Integration',
                description: 'Integrate GitHub API to show recent commits from linked repositories in the project workspace.',
                status: 'in-progress',
                assignedTo: fakiha._id,
                deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            }
        ]);
        console.log('  ✅ 3 Tasks added to Project 3');

        // ========== APPLICATION: Ali applies to Project 3 ==========
        console.log('Creating applications & notifications...');
        const application1 = new Application({
            project: project3._id,
            applicant: ali._id,
            message: 'Hi Fakiha! I am a Python backend developer with experience in Django and Flask. I would love to help build the backend APIs and microservices for SkillSync!',
            status: 'pending'
        });
        await application1.save();
        console.log('  ✅ Ali applied to SkillSync');

        // Ali also applies to Project 1
        const application2 = new Application({
            project: project1._id,
            applicant: ali._id,
            message: 'Hey! I noticed you need Python skills for the AI Study Assistant. I have experience with NLP and would love to contribute to the quiz generation module!',
            status: 'pending'
        });
        await application2.save();
        console.log('  ✅ Ali applied to AI Study Assistant');

        // ========== NOTIFICATIONS ==========
        await Notification.create([
            {
                user: fakiha._id,
                sender: ali._id,
                project: project3._id,
                type: 'application',
                message: 'Ali Ahmed has applied to join your project "SkillSync - Team Collaboration Platform"',
                read: false
            },
            {
                user: fakiha._id,
                sender: ali._id,
                project: project1._id,
                type: 'application',
                message: 'Ali Ahmed has applied to join your project "AI Study Assistant"',
                read: false
            },
            {
                user: laiba._id,
                sender: fakiha._id,
                project: project1._id,
                type: 'accepted',
                message: 'Fakiha Zahoor added you to the team for "AI Study Assistant"',
                read: true
            }
        ]);
        console.log('  ✅ Notifications created');

        console.log('\n========================================');
        console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
        console.log('========================================');
        console.log('\nLogin Credentials:');
        console.log('  Fakiha  → fakiha@test.com  / 123456');
        console.log('  Laiba   → laiba@test.com   / 123456');
        console.log('  Ali     → ali@test.com     / 123456');
        console.log('\nProjects Created:');
        console.log('  1. AI Study Assistant (Fakiha owns, Laiba in team)');
        console.log('  2. EcoTrack (Laiba owns, Fakiha in team)');
        console.log('  3. SkillSync (Fakiha owns, open for applications)');
        console.log('========================================\n');

        process.exit();
    } catch (error) {
        console.error('Error seeding DB:', error);
        process.exit(1);
    }
}

seedDatabase();
