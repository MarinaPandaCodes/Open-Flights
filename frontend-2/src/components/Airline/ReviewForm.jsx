import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ReviewForm.css';

const ReviewForm = ({ airlineId, review, onReviewSubmitted, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    score: '',
    description: '',
    airline_id: airlineId
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  // Sync formData with review prop for editing
  useEffect(() => {
    if (review) {
      setFormData({
        title: review.attributes.title || '',
        score: review.attributes.score ? String(review.attributes.score) : '',
        description: review.attributes.description || '',
        airline_id: airlineId
      });
    } else {
      setFormData({
        title: '',
        score: '',
        description: '',
        airline_id: airlineId
      });
    }
  }, [review, airlineId]);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (submitStatus?.success) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Please enter your name';
    if (!formData.score) newErrors.score = 'Please select a rating';
    if (!formData.description.trim()) newErrors.description = 'Please share your experience';
    else if (formData.description.length > 500) newErrors.description = 'Review must be less than 500 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      let response;

      if (review) {
        // Update existing review
        response = await axios.patch(
          `http://localhost:3000/api/v1/reviews/${review.id}`,
          { review: formData },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        // Create new review
        response = await axios.post(
          `http://localhost:3000/api/v1/reviews`,
          { review: formData },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      setSubmitStatus({ success: true, message: review ? 'Review updated successfully!' : 'Review uploaded successfully!' });

      // Reset form only if creating new review
      if (!review) {
        setFormData({
          title: '',
          score: '',
          description: '',
          airline_id: airlineId
        });
      }

      // Callback to parent with new or updated review
      if (onReviewSubmitted) {
        onReviewSubmitted(response.data.data);
      }

    } catch (error) {
      let errorMessage = 'Failed to submit review';
      let fieldErrors = {};

      if (error.response?.data?.errors) {
        // Map backend errors to field names
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
          fieldErrors[field] = messages.join(', ');
        });
        errorMessage = 'Please correct the highlighted fields';
      } else if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText;
      } else if (error.request) {
        errorMessage = 'No response from server';
      }

      setErrors(fieldErrors);
      setSubmitStatus({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(`/airlines`);
    }
  };

  return (
    <div className="review-form-container">
      <div className="holographic-header">
        <h2 className="section-title">
          <span className="gradient-text">{review ? 'Edit' : 'Submit'}</span> Your Review
        </h2>
        <p className="section-subtitle">Share your flight experience with Open Flights network</p>
      </div>

      {submitStatus && (
        <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
          {submitStatus.message}
          {submitStatus.success && <div className="countdown-bar"></div>}
        </div>
      )}

      <form className="review-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="title" className="input-label">
            <span className="label-text">Traveler Identification</span>
            <div className="input-container">
              <input
                type="text"
                id="title"
                name="title"
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Enter your name"
                value={formData.title}
                onChange={handleChange}
                required
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              <div className="input-underline"></div>
            </div>
            {errors.title && (
              <p id="title-error" className="field-error">
                {errors.title}
              </p>
            )}
          </label>
        </div>

        <div className="form-field">
          <label htmlFor="score" className="input-label">
            <span className="label-text">Score</span>
            <div className="input-container">
              <select
                id="score"
                name="score"
                className={`form-select ${errors.score ? 'error' : ''}`}
                value={formData.score}
                onChange={handleChange}
                required
                aria-describedby={errors.score ? "score-error" : undefined}
              >
                <option value="">Select rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <div className="select-arrow"></div>
              <div className="input-underline"></div>
            </div>
            {errors.score && (
              <p id="score-error" className="field-error">
                {errors.score}
              </p>
            )}
          </label>
        </div>

        <div className="form-field">
          <label htmlFor="description" className="input-label">
            <span className="label-text">Feedback</span>
            <div className="input-container">
              <textarea
                id="description"
                name="description"
                rows="5"
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Share your experience..."
                value={formData.description}
                onChange={handleChange}
                required
                aria-describedby={errors.description ? "description-error" : undefined}
              ></textarea>
              <div className="input-underline"></div>
              <div className="character-count">
                {formData.description.length}/500
              </div>
            </div>
            {errors.description && (
              <p id="description-error" className="field-error">
                {errors.description}
              </p>
            )}
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="back-button"
            onClick={handleGoBack}
          >
            ← Back
          </button>
          <button
            type="submit"
            className="submit-button pulse"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="uploading-text">Submitting...</span>
                <span className="uploading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              </>
            ) : (
              <>
                {review ? 'Update Review' : 'Submit'}
                <span className="arrow">↑</span>
              </>
            )}
          </button>
          <div className="tech-circle"></div>
        </div>
      </form>

      <div className="grid-overlay"></div>
    </div>
  );
};

export default ReviewForm;
