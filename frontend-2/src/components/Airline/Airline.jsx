import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import './Airline.css';

const Airline = () => {
  const { slug } = useParams();
  const [airline, setAirline] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const fetchAirline = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/airlines/${slug}`);
      setAirline(res.data.data);
      setReviews(res.data.included?.filter(item => item.type === 'review') || []);
    } catch (err) {
      console.error('Error fetching airline:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchAirline();
  }, [fetchAirline]);

  const calculateNewAverage = (currentAvg, currentCount, newScore) => {
    if (!currentAvg) return newScore;
    const total = currentAvg * currentCount + newScore;
    return total / (currentCount + 1);
  };

  const handleReviewSubmitted = useCallback((newReview) => {
    if (editingReview) {
      // Update existing review
      setReviews(prev => prev.map(review => 
        review.id === newReview.id ? newReview : review
      ));

      // Recalculate average score
      const newAvg = reviews.reduce((sum, review) => 
        sum + (review.id === newReview.id ? newReview.attributes.score : review.attributes.score), 
        0
      ) / reviews.length;

      setAirline(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          avg_score: parseFloat(newAvg.toFixed(1))
        }
      }));
    } else {
      // Add new review
      setReviews(prev => [newReview, ...prev]);
      setAirline(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          reviews_count: (prev.attributes.reviews_count || 0) + 1,
          avg_score: calculateNewAverage(prev.attributes.avg_score, prev.attributes.reviews_count, newReview.attributes.score)
        }
      }));
    }
    setShowReviewForm(false);
    setEditingReview(null);
  }, [editingReview, reviews]);

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await axios.delete(`/api/v1/reviews/${reviewId}`);
      
      const remainingReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(remainingReviews);
      
      // Update airline stats
      if (remainingReviews.length > 0) {
        const newAvg = remainingReviews.reduce((sum, review) => sum + review.attributes.score, 0) / remainingReviews.length;
        setAirline(prev => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            reviews_count: remainingReviews.length,
            avg_score: parseFloat(newAvg.toFixed(1))
          }
        }));
      } else {
        setAirline(prev => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            reviews_count: 0,
            avg_score: 0
          }
        }));
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err);
    }
  };

  if (loading) return (
    <div className="loading-screen">
      <div className="holographic-spinner" aria-label="Loading" />
      <p className="loading-text">Initializing neural scan...</p>
    </div>
  );

  if (error) return (
    <div className="error-screen">
      <div className="error-icon">⚠️</div>
      <h2>Connection Error</h2>
      <p>Failed to retrieve airline data: {error.message}</p>
      <button className="retry-button" onClick={fetchAirline}>
        Retry Connection
      </button>
    </div>
  );

  if (!airline) return (
    <div className="error-screen">
      <div className="error-icon">❌</div>
      <h2>No Airline Found</h2>
      <p>The requested neural pattern doesn't exist in our database</p>
      <Link to="/" className="retry-button">Return to Dashboard</Link>
    </div>
  );

  return (
    <div className="airline-container">
      {/* Header Section */}
      <div className="airline-header">
        <div 
          className="header-background" 
          style={{ backgroundImage: `url(${airline.attributes.image_url})` }} 
          aria-hidden="true"
        />
        <div className="header-content">
          <div className="airline-badge">
            {airline.attributes.name.substring(0, 2).toUpperCase()}
          </div>
          <h1 className="airline-title gradient-text">{airline.attributes.name}</h1>
          <div className="airline-meta">
            <div className="meta-item">
              <span>⭐</span>
              <span>{airline.attributes.avg_score?.toFixed(1) || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span>🧠</span>
              <span>{airline.attributes.reviews_count} Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="airline-tabs" role="tablist">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
          role="tab"
          aria-selected={activeTab === 'overview'}
          aria-controls="overview-tab"
        >
          📡 Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
          role="tab"
          aria-selected={activeTab === 'reviews'}
          aria-controls="reviews-tab"
        >
          🧠 Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="airline-content">
        {activeTab === 'overview' && (
          <div 
            id="overview-tab" 
            className="overview-tab tab-content" 
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
            <div className="airline-image-container">
              <img 
                src={airline.attributes.image_url} 
                alt={airline.attributes.name} 
                className="airline-image"
                loading="lazy"
              />
              <div className="image-overlay" />
            </div>

            <div className="airline-profile">
              <h2 className="profile-title">✈️ Flight Profile</h2>
              <p><strong>Description:</strong> {airline.attributes.description}</p>
              <p><strong>Country:</strong> {airline.attributes.country}</p>
              <p><strong>Headquarters:</strong> {airline.attributes.headquarters}</p>
              <p><strong>Established:</strong> {airline.attributes.established_year}</p>
            </div>

            <div className="holographic-bar" />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div 
            id="reviews-tab" 
            className="reviews-tab tab-content" 
            role="tabpanel"
            aria-labelledby="reviews-tab"
          >
            <h3 className="reviews-title">Open Flights Feedback Network</h3>
            {reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <h4>{review.attributes.title}</h4>
                      <div className="review-actions">
                        <button 
                          onClick={() => handleEditReview(review)}
                          className="action-button edit-button"
                          aria-label="Edit review"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteReview(review.id)}
                          className="action-button delete-button"
                          aria-label="Delete review"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    <div className="review-meta">
                      <span className="review-score">⭐ {review.attributes.score}</span>
                    </div>
                    <p className="review-description">{review.attributes.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-reviews">
                <p>No neural patterns detected</p>
                <div className="holographic-grid" aria-hidden="true" />
              </div>
            )}
            <button
              onClick={() => {
                setEditingReview(null);
                setShowReviewForm(true);
              }}
              className="add-review-button pulse"
              aria-label="Add new review"
            >
              Upload Experience ↑
            </button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewForm && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <button 
              className="close-button" 
              onClick={() => {
                setShowReviewForm(false);
                setEditingReview(null);
              }}
              aria-label="Close review form"
            >
              ×
            </button>
            <ReviewForm 
              airlineId={airline.id} 
              review={editingReview}
              onReviewSubmitted={handleReviewSubmitted} 
              onCancel={() => {
                setShowReviewForm(false);
                setEditingReview(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="airline-footer">
        <Link to="/airlines" className="back-link">
          ← Return to Airlines
        </Link>
      </div>
    </div>
  );
};

export default Airline;
