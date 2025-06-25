import React, { useEffect, useState } from 'react';
import api from '../api/user';
import '../styles/news_styles.css';

import BurgerMenu from '../components/burger_menu.js';
import ContentSlider from '../components/content_slider.js';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [comments, setComments] = useState({});
  const [expandedNews, setExpandedNews] = useState({});
  const [showAllComments, setShowAllComments] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [replyTo, setReplyTo] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const gradients = [
    'linear-gradient(to bottom, rgba(20, 20, 20, 0.4), rgba(20, 20, 20, 0.1))',
    'linear-gradient(to bottom, rgba(40, 30, 60, 0.4), rgba(40, 30, 60, 0.1))',
    'linear-gradient(to bottom, rgba(30, 50, 40, 0.4), rgba(30, 50, 40, 0.1))',
    'linear-gradient(to bottom, rgba(60, 40, 40, 0.4), rgba(60, 40, 40, 0.1))',
  ];

  const commentBackgrounds = [
    'rgba(20, 20, 20, 0.1)',
    'rgba(40, 30, 60, 0.1)',
    'rgba(30, 50, 40, 0.1)',
    'rgba(60, 40, 40, 0.1)',
  ];

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    if (token) {
      api.get('/api/auth/users/me/')
        .then((res) => setUserId(res.data.id))
        .catch((err) => console.error('Failed to load user', err));
    }
  }, []);

  useEffect(() => {
    api.get('/news/')
      .then((response) => {
        const newsData = response.data.results || response.data;
        newsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setNews(newsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading news:', err);
        setError('Failed to load news');
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `http://127.0.0.1:8000${image}`;
  };

  const loadComments = (newsId) => {
    if (comments[newsId]) return;

    api.get(`/comments/?post_id=${newsId}`)
      .then((response) => {
        setComments((prev) => ({
          ...prev,
          [newsId]: response.data.results || response.data,
        }));
      })
      .catch((err) => {
        console.error(`Failed to load comments for news ${newsId}`, err);
        setComments((prev) => ({ ...prev, [newsId]: [] }));
      });
  };

  const toggleComments = (newsId) => {
    setExpandedNews((prev) => {
      const isExpanded = !!prev[newsId];
      if (!isExpanded && !comments[newsId]) loadComments(newsId);
      return { ...prev, [newsId]: !isExpanded };
    });
  };

  const toggleShowAll = (newsId) => {
    setShowAllComments((prev) => ({
      ...prev,
      [newsId]: !prev[newsId],
    }));
  };

  const handleCommentSubmit = (e, newsId) => {
    e.preventDefault();
    const text = newComment[newsId]?.trim();
    if (!text) return;

    api.post('/comments/', {
      post: newsId,
      text,
      replied_to: replyTo[newsId] || null,
    })
      .then((res) => {
        setComments((prev) => ({
          ...prev,
          [newsId]: [res.data, ...(prev[newsId] || [])],
        }));
        setNewComment((prev) => ({ ...prev, [newsId]: '' }));
        setReplyTo((prev) => ({ ...prev, [newsId]: null }));
      })
      .catch((err) => {
        console.error('Error posting comment:', err.response?.data || err);
      });
  };

  const handleDeleteComment = (commentId, newsId) => {
    api.delete(`/comments/${commentId}/`)
      .then(() => {
        setComments((prev) => ({
          ...prev,
          [newsId]: prev[newsId].map((c) =>
            c.id === commentId ? { ...c, text: 'deleted', is_deleted: true } : c
          ),
        }));
      })
      .catch((err) => {
        console.error('Error deleting comment:', err);
      });
  };

  const countTopLevelComments = (commentsList) => {
    if (!commentsList) return 0;
    return commentsList.length;
  };

  const renderReplies = (replies, newsId, index) => {
    return replies.map((reply) => (
      <div
        key={reply.id}
        className="comment_reply"
        style={{
          background: commentBackgrounds[(index + 1) % commentBackgrounds.length],
          marginLeft: `${index * 10}px`,
          paddingLeft: '5px',
          borderLeft: '3px solid #2a9d8f',
          marginTop: '10px',
        }}
      >
        <p><b>{reply.author_name || 'Anonymous'}</b></p>
        <span>{formatDate(reply.created_at)}</span>

        {reply.replied_to && (
          <p className="reply_to_info">
            Replying to: <b>{reply.author_name}</b>
          </p>
        )}

        <p className={reply.is_deleted ? 'deleted-comment' : ''}>
          {reply.is_deleted ? 'deleted comment' : reply.text}
        </p>
        {!reply.is_deleted && isAuthenticated && (
          <div className="comment_actions">
            {(reply.author == userId) && (
              <button onClick={() => handleDeleteComment(reply.id, newsId)}>
                Delete
              </button>
            )}
            <button onClick={() =>
              setReplyTo((prev) => ({ ...prev, [newsId]: reply.id }))
            }>
              Reply
            </button>
          </div>
        )}
        {reply.replies && renderReplies(reply.replies, newsId, index + 1)}
      </div>
    ));
  };

  // Рендер комментариев верхнего уровня с ограничением по 5 штук
  const renderCommentsWithLimit = (commentsList, newsId, index) => {
    const showAll = showAllComments[newsId];
    const commentsToShow = showAll ? commentsList : commentsList.slice(0, 5);

    return (
      <>
        {commentsToShow.map((comment, i) => (
          <div
            key={comment.id}
            className="comment_"
            style={{ background: commentBackgrounds[index % commentBackgrounds.length], marginLeft: '0' }}
          >
            <span>{formatDate(comment.created_at)}</span>
            <p><b>{comment.author_name}</b></p>

            <p className={comment.is_deleted ? 'deleted-comment' : ''}>
              {comment.is_deleted ? 'deleted comment' : comment.text}
            </p>

            {!comment.is_deleted && isAuthenticated && (
              <div className="comment_actions">
                {(comment.author == userId) && (
                  <button onClick={() => handleDeleteComment(comment.id, newsId)}>
                    Delete
                  </button>
                )}
                <button onClick={() =>
                  setReplyTo((prev) => ({ ...prev, [newsId]: comment.id }))
                }>
                  Reply
                </button>
              </div>
            )}

            {comment.replies && renderReplies(comment.replies, newsId, 1)}
          </div>
        ))}

        {commentsList.length > 5 && (
          <button
            className="show-more-comments-btn"
            onClick={() => toggleShowAll(newsId)}
          >
            {showAll ? 'Show less' : `Show more (${commentsList.length - 5} hidden)`}
          </button>
        )}
      </>
    );
  };

  const filteredNews = news.filter(
    (item) =>
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.text && item.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <a id="top"></a>
      <BurgerMenu />
      <ContentSlider />

      <main className="news_container">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading && <p>Loading news...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && filteredNews.length === 0 && <p>No news found...</p>}

        {!loading && !error && filteredNews.map((item, index) => (
          <div
            key={item.id}
            className="news_item"
            style={{ background: gradients[index % gradients.length] }}
          >
            <h2 className="news_title">{item.title || 'Untitled'}</h2>
            <p className="news_date"><i>{formatDate(item.created_at)}</i></p>
            <p
              className="news_text"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
            {item.image && (
              <img
                src={getImageUrl(item.image)}
                alt={item.title}
                className="news_image"
              />
            )}

            <button
              onClick={() => toggleComments(item.id)}
              className="toggle-comments-button"
            >
              {expandedNews[item.id] ? 'Hide Comments' : 'Show Comments'}
            </button>

            {expandedNews[item.id] && (
              <div className="comments_section_">
                {comments[item.id] ? (
                  comments[item.id].length > 0 ? (
                    renderCommentsWithLimit(comments[item.id], item.id, index)
                  ) : (
                    <p>No comments yet.</p>
                  )
                ) : (
                  <p>Loading comments...</p>
                )}

                {isAuthenticated && (
                  <form
                    onSubmit={(e) => handleCommentSubmit(e, item.id)}
                    className="comment_form"
                  >
                    {replyTo[item.id] && (
                      <p className="reply_notice">
                        Replying to comment #{replyTo[item.id]}{' '}
                        <button type="button" onClick={() =>
                          setReplyTo((prev) => ({ ...prev, [item.id]: null }))
                        }>
                          Cancel
                        </button>
                      </p>
                    )}
                    <textarea
                      required
                      placeholder="Write your comment..."
                      value={newComment[item.id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                    />
                    <button type="submit">Post Comment</button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
      </main>

      <footer>
        <nav className="foot_nav">
          <a href="#">HOME</a>
          <a href="#">TICKETS</a>
          <a href="#">LINEUP</a>
          <a href="#">CONTACT</a>
        </nav>
        <div className="foot_text">
          <p>Copyright ©2025 All rights reserved - Diamond Festival</p>
        </div>
      </footer>
      <a href="#top" className="scroll_to_top_link">&#8679;</a>
    </div>
  );
}
