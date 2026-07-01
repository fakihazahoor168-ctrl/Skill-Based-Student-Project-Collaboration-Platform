import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaCode, FaCheckCircle, FaRocket, FaTasks, FaComments, FaGithub } from "react-icons/fa";
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
  const [suggestedTeammates, setSuggestedTeammates] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [matchExplanations, setMatchExplanations] = useState({});
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDesc, setEditTaskDesc] = useState("");
  const [editTaskDeadline, setEditTaskDeadline] = useState("");
  const [editTaskAssignedTo, setEditTaskAssignedTo] = useState("");
  const [commits, setCommits] = useState([]);
  const [loadingCommits, setLoadingCommits] = useState(false);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchProject();
    fetchTasks();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (project && user) {
      const userId = user.id || user._id;
      const isOwner = userId === (project.owner?._id || project.owner);
      if (isOwner) {
        fetchSuggestions();
      }
    }
    
    if (project?.githubRepo) {
      fetchCommits(project.githubRepo);
    }
  }, [project, user]);

  const fetchCommits = async (repo) => {
    try {
      setLoadingCommits(true);
      const res = await axios.get(`https://api.github.com/repos/${repo}/commits?per_page=5`);
      setCommits(res.data);
    } catch (err) {
      console.error("Error fetching GitHub commits:", err);
    } finally {
      setLoadingCommits(false);
    }
  };

  const fetchSuggestions = async () => {
    try {
      setLoadingSuggestions(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/projects/${id}/suggested-teammates`, {
        headers: { "x-auth-token": token }
      });
      setSuggestedTeammates(res.data);

      // Fetch AI match explanations if we have suggestions and project data
      if (res.data.length > 0 && project) {
        try {
          const aiRes = await axios.post('http://localhost:5000/api/ai/match-explanation', {
            projectTitle: project.title,
            projectTech: project.tech,
            teammates: res.data.map(sug => ({
              userId: sug.user._id,
              name: sug.user.name,
              skills: sug.user.skills,
              matchingSkills: sug.matchingSkills,
              matchPercentage: sug.matchPercentage
            }))
          }, {
            headers: { "x-auth-token": token }
          });
          if (aiRes.data.explanations) {
            setMatchExplanations(aiRes.data.explanations);
          }
        } catch (aiErr) {
          console.error("AI match explanation error (non-critical):", aiErr);
        }
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

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

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: { "x-auth-token": token }
      });
      fetchComments();
    } catch (err) {
      alert("Failed to delete comment");
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

  const handleGenerateRoadmap = async () => {
    if (!window.confirm("Are you sure you want to auto-generate a 5-step AI roadmap for this project? This will create new tasks in your list based on project details.")) {
      return;
    }
    try {
      setGeneratingRoadmap(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(`http://localhost:5000/api/ai/generate-roadmap/${id}`, {}, {
        headers: { "x-auth-token": token }
      });
      if (res.data.success) {
        fetchTasks();
        alert("AI Roadmap generated successfully!");
      } else {
        alert(res.data.msg || "Failed to generate AI roadmap");
      }
    } catch (err) {
      console.error("AI Roadmap Error:", err);
      const errMsg = err.response?.data?.msg || "Failed to communicate with AI API. Ensure GEMINI_API_KEY is configured in backend/.env";
      alert(errMsg);
    } finally {
      setGeneratingRoadmap(false);
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

  const startEditingTask = (task) => {
    setEditingTaskId(task._id);
    setEditTaskTitle(task.title);
    setEditTaskDesc(task.description || "");
    setEditTaskDeadline(task.deadline ? task.deadline.substring(0, 10) : "");
    setEditTaskAssignedTo(task.assignedTo?._id || task.assignedTo || "");
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/tasks/${editingTaskId}`, {
        title: editTaskTitle,
        description: editTaskDesc,
        deadline: editTaskDeadline || null,
        assignedTo: editTaskAssignedTo || null
      }, {
        headers: { "x-auth-token": token }
      });
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      alert("Failed to edit task details");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { "x-auth-token": token }
      });
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
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

  const userId = user?.id || user?._id;
  const isOwner = userId === (project.owner?._id || project.owner);

  return (
    <div className="project-details-page" style={{ padding: '20px' }}>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      <div className={`details-container ${(!isOwner && project.team?.some(m => (m._id || m) === userId)) ? 'member-view' : ''}`}>
        <div className="glass-card main-info">
          <div className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '28px', lineHeight: '1.2', wordBreak: 'break-word', flex: 1 }}>{project.title}</h1>
            <span className="status-badge" style={{ flexShrink: 0, alignSelf: 'flex-start' }}>{project.status?.toUpperCase() || 'OPEN'}</span>
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
          {(isOwner || project.team?.some(m => (m._id || m) === userId)) && (
            <div className="tasks-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3><FaTasks /> Project Roadmap & Tasks</h3>
                {isOwner && (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                      onClick={handleGenerateRoadmap} 
                      disabled={generatingRoadmap}
                      className="ai-roadmap-btn"
                    >
                      {generatingRoadmap ? "✨ Generating..." : "✨ Auto-Generate AI Roadmap"}
                    </button>
                    <button onClick={() => setShowTaskForm(!showTaskForm)} className="add-task-btn">+ New Task</button>
                  </div>
                )}
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
                    {editingTaskId === task._id ? (
                      <form className="task-edit-form" onSubmit={handleEditTask} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <input 
                            type="text" 
                            value={editTaskTitle} 
                            onChange={(e) => setEditTaskTitle(e.target.value)} 
                            required 
                            placeholder="Task Title"
                          />
                          <textarea 
                            value={editTaskDesc} 
                            onChange={(e) => setEditTaskDesc(e.target.value)} 
                            placeholder="Description"
                          />
                          
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: '11px', color: '#94a3b8' }}>Deadline</label>
                              <input 
                                type="date" 
                                value={editTaskDeadline} 
                                onChange={(e) => setEditTaskDeadline(e.target.value)} 
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: '11px', color: '#94a3b8' }}>Assignee</label>
                              <select 
                                value={editTaskAssignedTo} 
                                onChange={(e) => setEditTaskAssignedTo(e.target.value)}
                              >
                                <option value="">Unassigned</option>
                                <option value={project.owner?._id || project.owner}>{project.owner?.name} (Owner)</option>
                                {project.team?.map(m => (
                                  <option key={m._id} value={m._id}>{m.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                            <button type="submit" className="save-task-btn">Save</button>
                            <button type="button" className="cancel-task-btn" onClick={() => setEditingTaskId(null)}>Cancel</button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="task-info">
                          <h4>{task.title}</h4>
                          {task.description && <p>{task.description}</p>}
                          <div className="task-meta" style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '11px', color: '#64748b' }}>
                            {task.assignedTo && (
                              <span>👤 Assigned: <b>{task.assignedTo?.name || 'Unknown'}</b></span>
                            )}
                            {task.deadline && (
                              <span>📅 Deadline: <b>{new Date(task.deadline).toLocaleDateString()}</b></span>
                            )}
                          </div>
                        </div>
                        <div className="task-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <select value={task.status} onChange={(e) => updateTaskStatus(task._id, e.target.value)}>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                          {isOwner && (
                            <div className="task-owner-controls" style={{ display: 'flex', gap: '5px' }}>
                              <button className="task-edit-btn" onClick={() => startEditingTask(task)} title="Edit Task">✏️</button>
                              <button className="task-delete-btn" onClick={() => handleDeleteTask(task._id)} title="Delete Task">🗑️</button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
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
                  <div className="comment-content" style={{ flex: 1 }}>
                    <div className="comment-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span className="user-name">{comment.user?.name}</span>
                        <span className="comment-date" style={{ marginLeft: '10px' }}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      {(user?.id === comment.user?._id || user?.id === comment.user || isOwner) && (
                        <button 
                          className="comment-delete-btn" 
                          onClick={() => handleDeleteComment(comment._id)}
                          title="Delete Comment"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                    <p>{comment.text}</p>
                  </div>
                </div>
              )) : <p className="empty-msg">No comments yet. Start the conversation!</p>}
            </div>
          </div>

          {project.githubRepo && (
            <>
              <hr style={{ border: '1px solid rgba(255,255,255,0.05)', margin: '30px 0' }} />
              <div className="github-section">
                <h3><FaGithub /> GitHub Activity</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '15px' }}>
                  Repository: <b><a href={`https://github.com/${project.githubRepo}`} target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee' }}>{project.githubRepo}</a></b>
                </p>
                {loadingCommits ? (
                  <p style={{ fontSize: '13px', color: '#94a3b8' }}>Fetching recent commits...</p>
                ) : commits.length > 0 ? (
                  <div className="commits-list">
                    {commits.map((commitData) => (
                      <div key={commitData.sha} className="commit-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <p className="commit-msg">
                            <a href={commitData.html_url} target="_blank" rel="noopener noreferrer">
                              {commitData.commit.message}
                            </a>
                          </p>
                          <span className="commit-date">
                            {new Date(commitData.commit.author.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                          {commitData.author?.avatar_url && (
                            <img src={commitData.author.avatar_url} alt="avatar" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                          )}
                          <span className="commit-author">{commitData.commit.author.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '13px', color: '#94a3b8' }}>No commits found or API limit reached.</p>
                )}
              </div>
            </>
          )}

        </div>

        {/* APPLICATION FORM */}
        {!isOwner && !project.team?.some(m => (m._id || m) === userId) && (
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

        {isOwner && (
          <div className="glass-card suggestions-card" style={{ marginTop: '20px' }}>
            <h3>🎯 AI-Powered Teammate Suggestions</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '15px' }}>
              AI-analyzed candidates ranked by skill compatibility.
            </p>
            {loadingSuggestions ? (
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>Analyzing matching profiles...</p>
            ) : suggestedTeammates.length > 0 ? (
              <div className="suggestions-list">
                {suggestedTeammates.map((sug, idx) => (
                  <div key={idx} className="suggestion-item">
                    <div className="suggestion-header">
                      <span className="suggestion-name">{sug.user.name}</span>
                      <span className={`match-badge ${
                        sug.matchPercentage >= 75 ? 'match-high' : 
                        sug.matchPercentage >= 50 ? 'match-medium' : 'match-low'
                      }`}>
                        {sug.matchPercentage}% Match
                      </span>
                    </div>

                    <div className="suggestion-skills">
                      {sug.user.skills.map((skill, sIdx) => {
                        const isMatched = sug.matchingSkills.some(
                          ms => ms.toLowerCase() === skill.toLowerCase()
                        );
                        return (
                          <span 
                            key={sIdx} 
                            className={`suggestion-skill-tag ${isMatched ? 'matched' : ''}`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>

                    {matchExplanations[sug.user._id] && (
                      <p style={{ fontSize: '12px', color: '#a78bfa', fontStyle: 'italic', margin: '6px 0', padding: '6px 10px', background: 'rgba(167, 139, 250, 0.08)', borderRadius: '6px', borderLeft: '3px solid #a78bfa' }}>
                        🤖 {matchExplanations[sug.user._id]}
                      </p>
                    )}
                    {sug.user.bio && <p className="suggestion-bio">{sug.user.bio}</p>}

                    <div className="suggestion-footer">
                      <a 
                        href={`mailto:${sug.user.email}?subject=Collaboration Invitation for project: ${project.title}`} 
                        className="suggestion-email"
                      >
                        ✉️ Invite via Email
                      </a>
                      <div className="suggestion-links">
                        {sug.user.github && (
                          <a href={sug.user.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                            GitHub
                          </a>
                        )}
                        {sug.user.linkedin && (
                          <a href={sug.user.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>No suggested teammates found with matching skills.</p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .project-details-page { color: white; max-width: 1000px; margin: 0 auto; }
        .back-btn { background: none; border: none; color: #22d3ee; cursor: pointer; display: flex; align-items: center; gap: 5px; margin-bottom: 20px; font-weight: 600; }
        .details-container { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
        .details-container.member-view { display: block; max-width: 850px; margin: 0 auto; }
        .details-container.member-view .main-info { width: 100%; }
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
        .ai-roadmap-btn { background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%); border: none; color: white; padding: 5px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: transform 0.2s, opacity 0.2s; }
        .ai-roadmap-btn:hover { transform: translateY(-1px); opacity: 0.9; }
        .ai-roadmap-btn:disabled { background: #334155; color: #94a3b8; cursor: not-allowed; transform: none; }
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
        
        .github-section { padding-top: 10px; }
        .github-section h3 { font-size: 18px; margin-bottom: 5px; display: flex; align-items: center; gap: 8px; }
        .commits-list { display: flex; flex-direction: column; gap: 10px; }
        .commit-item { background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; }
        .commit-msg a { color: #f8fafc; text-decoration: none; font-size: 14px; font-weight: 500; }
        .commit-msg a:hover { color: #22d3ee; text-decoration: underline; }
        .commit-date { font-size: 11px; color: #94a3b8; }
        .commit-author { font-size: 12px; color: #cbd5e1; }

        .suggestions-card { padding: 20px; }
        .suggestions-card h3 { font-size: 18px; margin-bottom: 5px; display: flex; align-items: center; gap: 8px; }
        .suggestions-list { display: flex; flex-direction: column; gap: 12px; max-height: 450px; overflow-y: auto; padding-right: 5px; }
        .suggestion-item { padding: 12px; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; background: rgba(15, 23, 42, 0.4); }
        .suggestion-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .suggestion-name { font-weight: bold; font-size: 14px; color: #f8fafc; }
        .match-badge { font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: bold; }
        .match-high { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .match-medium { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
        .match-low { background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); }
        .suggestion-skills { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px; }
        .suggestion-skill-tag { font-size: 10px; background: rgba(255, 255, 255, 0.05); color: #94a3b8; padding: 1px 4px; border-radius: 3px; }
        .suggestion-skill-tag.matched { background: rgba(34, 211, 238, 0.15); color: #22d3ee; border: 1px solid rgba(34, 211, 238, 0.3); }
        .suggestion-bio { font-size: 12px; color: #cbd5e1; margin-bottom: 8px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .suggestion-footer { display: flex; justify-content: space-between; align-items: center; font-size: 11px; margin-top: 5px; }
        .suggestion-email { color: #22d3ee; text-decoration: none; display: flex; align-items: center; gap: 4px; font-weight: bold; }
        .suggestion-email:hover { text-decoration: underline; }
        .suggestion-links { display: flex; gap: 8px; }
        .suggestion-links a { color: #94a3b8; text-decoration: none; }
        .suggestion-links a:hover { color: #22d3ee; }

        .task-edit-btn, .task-delete-btn, .comment-delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .task-edit-btn:hover { background: rgba(34, 211, 238, 0.15); }
        .task-delete-btn:hover, .comment-delete-btn:hover { background: rgba(239, 68, 68, 0.15); }
        .task-edit-form input, .task-edit-form textarea, .task-edit-form select {
          width: 100%;
          background: #0f172a;
          border: 1px solid #334155;
          padding: 8px;
          color: white;
          border-radius: 5px;
          outline: none;
          margin-bottom: 5px;
        }
        .task-edit-form label {
          display: block;
          margin-bottom: 2px;
        }
        .save-task-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .cancel-task-btn {
          background: #64748b;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        @media (max-width: 768px) { .details-container { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}