import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaCode, FaCheckCircle, FaRocket, FaTasks, FaComments } from "react-icons/fa";
import { FiArrowLeft, FiSend } from "react-icons/fi";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [applying, setApplying] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchProject();
    fetchTasks();
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`http://localhost:5000/api/comments/${id}`, 
        { text: commentText },
        { headers: { "x-auth-token": token } }
      );
      setComments([res.data, ...comments]);
      setCommentText("");
    } catch (err) {
      alert("Failed to post comment");
    }
  };

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
        headers: { "x-auth-token": token }
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/tasks/${id}`, 
        { title: taskTitle, description: taskDesc },
        { headers: { "x-auth-token": token } }
      );
      setTaskTitle("");
      setTaskDesc("");
      setShowTaskForm(false);
      fetchTasks();
    } catch (err) {
      alert("Failed to add task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, 
        { status },
        { headers: { "x-auth-token": token } }
      );
      fetchTasks();
    } catch (err) {
      alert("Failed to update task");
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Please enter a message!");
    
    setApplying(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/applications/${id}`, 
        { message }, 
        { headers: { "x-auth-token": token } }
      );
      alert("Application sent successfully! 🚀");
      setMessage("");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!project) return <div className="error-screen">Project not found.</div>;

  const isOwner = user?.id === (project.owner?._id || project.owner);

  return (
    <div className="project-details-page" style={{ padding: '20px' }}>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      <div className="details-container">
        <div className="glass-card main-info">
          <div className="header-flex">
            <h1>{project.title}</h1>
            <span className="status-badge">{project.status?.toUpperCase() || 'OPEN'}</span>
          </div>
          <p className="description">{project.description}</p>
          
          <div className="meta-info">
            <div className="meta-item">
              <FaUser /> <span>Owned by: <b>{project.owner?.name || 'Unknown'}</b></span>
            </div>
            <div className="meta-item">
              <FaRocket /> <span>Difficulty: <b>{project.difficulty || 'Intermediate'}</b></span>
            </div>
          </div>

          <div className="tech-section">
            <h3><FaCode /> Technologies</h3>
            <div className="tech-tags">
              {project.tech?.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="team-section">
            <h3><FaCheckCircle /> Project Team ({project.team?.length || 0})</h3>
            <div className="team-avatars">
              {project.team?.length > 0 ? project.team.map((m, i) => (
                <div key={i} className="team-member" title={m.name}>
                  {m.name?.[0]?.toUpperCase()}
                </div>
              )) : <p>No team members yet. Be the first to join!</p>}
            </div>
          </div>

          <hr style={{ border: '1px solid rgba(255,255,255,0.05)', margin: '30px 0' }} />

          {/* TASKS SECTION */}
          {(isOwner || project.team?.some(m => m._id === user?.id)) && (
            <div className="tasks-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3><FaTasks /> Project Roadmap & Tasks</h3>
                {isOwner && <button onClick={() => setShowTaskForm(!showTaskForm)} className="add-task-btn">+ New Task</button>}
              </div>

              {showTaskForm && (
                <form className="task-form glass-card" onSubmit={handleAddTask}>
                  <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
                  <textarea placeholder="Description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />
                  <button type="submit">Create Task</button>
                </form>
              )}

              <div className="task-list">
                {tasks.length > 0 ? tasks.map(task => (
                  <div key={task._id} className={`task-item ${task.status}`}>
                    <div className="task-info">
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                    </div>
                    <div className="task-actions">
                      <select value={task.status} onChange={(e) => updateTaskStatus(task._id, e.target.value)}>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                )) : <p className="empty-msg">No tasks created yet.</p>}
              </div>
            </div>
          )}

          <hr style={{ border: '1px solid rgba(255,255,255,0.05)', margin: '30px 0' }} />

          {/* DISCUSSION SECTION */}
          <div className="discussion-section">
            <h3><FaComments /> Team Discussion</h3>
            <form className="comment-form" onSubmit={handleAddComment}>
              <input 
                type="text" 
                placeholder="Write a comment..." 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit">Post</button>
            </form>

            <div className="comments-list">
              {comments.length > 0 ? comments.map(comment => (
                <div key={comment._id} className="comment-item">
                  <div className="comment-avatar">
                    {comment.user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="user-name">{comment.user?.name}</span>
                      <span className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                </div>
              )) : <p className="empty-msg">No comments yet. Start the conversation!</p>}
            </div>
          </div>
        </div>

        {/* APPLICATION FORM */}
        {!isOwner && (
          <div className="glass-card apply-form">
            <h3>Apply to join this project</h3>
            <p>Tell the owner why you're a good fit for this team.</p>
            <form onSubmit={handleApply}>
              <textarea 
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit" disabled={applying}>
                {applying ? "Sending..." : <><FiSend /> Send Application</>}
              </button>
            </form>
          </div>
        )}

        {isOwner && (
          <div className="glass-card owner-panel">
            <h3>Owner Controls</h3>
            <p>You are the owner of this project. You can manage applications and project details.</p>
            <div className="panel-btns">
              <button onClick={() => navigate(`/edit/${id}`)}>Edit Project</button>
              <button onClick={() => navigate(`/request`)}>View Applications</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .project-details-page { color: white; max-width: 1000px; margin: 0 auto; }
        .back-btn { background: none; border: none; color: #22d3ee; cursor: pointer; display: flex; align-items: center; gap: 5px; margin-bottom: 20px; font-weight: 600; }
        .details-container { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
        .header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .status-badge { background: #22d3ee22; color: #22d3ee; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1px solid #22d3ee44; }
        .description { font-size: 16px; color: #94a3b8; line-height: 1.6; margin-bottom: 30px; }
        .meta-info { display: flex; gap: 20px; margin-bottom: 30px; }
        .meta-item { display: flex; align-items: center; gap: 10px; color: #cbd5e1; font-size: 14px; }
        .tech-section h3, .team-section h3 { font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        .team-avatars { display: flex; gap: 10px; flex-wrap: wrap; }
        .team-member { width: 40px; height: 40px; border-radius: 50%; background: #334155; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid #22d3ee; }
        .apply-form textarea { width: 100%; height: 120px; background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 15px; color: white; margin-bottom: 15px; outline: none; }
        .apply-form button, .owner-panel button { width: 100%; background: linear-gradient(90deg, #06b6d4, #3b82f6); border: none; padding: 12px; border-radius: 10px; color: white; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px; }
        .panel-btns { display: flex; gap: 10px; }
        .add-task-btn { background: #10b981; border: none; color: white; padding: 5px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; }
        .task-form { padding: 20px; margin-top: 20px; display: flex; flex-direction: column; gap: 10px; }
        .task-form input { background: #0f172a; border: 1px solid #334155; padding: 10px; color: white; border-radius: 5px; }
        .task-list { margin-top: 20px; }
        .task-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border: 1px solid #334155; border-radius: 10px; margin-bottom: 10px; }
        .task-item.completed { opacity: 0.6; border-left: 5px solid #10b981; }
        .task-item.in-progress { border-left: 5px solid #f59e0b; }
        .task-item.todo { border-left: 5px solid #64748b; }
        .task-info h4 { margin: 0; font-size: 16px; color: #f8fafc; }
        .task-info p { margin: 5px 0 0; font-size: 13px; color: #94a3b8; }
        .task-actions select { background: #1e293b; color: white; border: 1px solid #334155; padding: 5px; border-radius: 5px; outline: none; }
        .comment-form { display: flex; gap: 10px; margin: 20px 0; }
        .comment-form input { flex: 1; background: #0f172a; border: 1px solid #334155; padding: 10px; color: white; border-radius: 5px; }
        .comment-form button { background: #22d3ee; border: none; padding: 0 20px; border-radius: 5px; color: #0f172a; font-weight: bold; cursor: pointer; }
        .comment-item { display: flex; gap: 15px; margin-bottom: 20px; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .comment-avatar { width: 35px; height: 35px; border-radius: 50%; background: #334155; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; border: 1px solid #22d3ee; }
        .comment-header { display: flex; gap: 10px; align-items: center; margin-bottom: 5px; }
        .user-name { font-weight: bold; color: #f8fafc; font-size: 14px; }
        .comment-date { font-size: 11px; color: #64748b; }
        .comment-content p { margin: 0; font-size: 14px; color: #cbd5e1; }
        @media (max-width: 768px) { .details-container { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}