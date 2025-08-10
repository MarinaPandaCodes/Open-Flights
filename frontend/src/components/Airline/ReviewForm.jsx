import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        response = await axios.patch(
          `http://localhost:3000/api/v1/reviews/${review.id}`,
          { review: formData },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:3000/api/v1/reviews`,
          { review: formData },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      setSubmitStatus({ success: true, message: review ? 'Review updated successfully!' : 'Review uploaded successfully!' });

      if (!review) {
        setFormData({
          title: '',
          score: '',
          description: '',
          airline_id: airlineId
        });
      }

      if (onReviewSubmitted) {
        onReviewSubmitted(response.data.data);
      }

    } catch (error) {
      let errorMessage = 'Failed to submit review';
      let fieldErrors = {};

      if (error.response?.data?.errors) {
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
    <div className="max-w-2xl mx-auto p-6 bg-[rgba(16,24,39,0.8)] backdrop-blur-lg rounded-xl border border-[#00f0ff]/20 shadow-2xl shadow-[#00f0ff]/10 relative">
      {/* Flight panel header */}
      <div className="px-6 py-4 border-b border-[#00f0ff]/10 bg-[rgba(0,240,255,0.05)] mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#00f0ff] mr-2 animate-pulse"></div>
          <h2 className="font-['Orbitron'] text-xl font-bold text-[#00f0ff] tracking-wider uppercase">
            {review ? 'UPDATE FLIGHT LOG' : 'SUBMIT FLIGHT REPORT'}
          </h2>
        </div>
        <p className="text-[#00f0ff]/80 text-sm mt-1 font-['Rajdhani'] tracking-wider">
          Share your experience with the SkyMetrics network
        </p>
      </div>

      {submitStatus && (
        <div className={`mb-6 px-4 py-3 rounded-lg ${submitStatus.success ? 'bg-[rgba(0,240,255,0.1)] border border-[#00f0ff]/30 text-[#00f0ff]' : 'bg-[rgba(255,80,80,0.1)] border border-[#ff5050]/30 text-[#ff5050]'} text-sm flex items-center font-['Rajdhani'] tracking-wider`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">
            PILOT IDENTIFICATION
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              className={`block w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border ${errors.title ? 'border-[#ff5050]' : 'border-[#00f0ff]/30'} rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider`}
              placeholder="Enter your callsign"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          {errors.title && <p className="mt-1 text-sm text-[#ff5050] font-['Rajdhani'] tracking-wider">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="score" className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">
          FLIGHT RATING
        </label>
        <div className="relative">
          <select
            id="score"
            name="score"
            className={`block w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border ${
              errors.score ? 'border-[#ff5050]' : 'border-[#00f0ff]/30'
            } rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider appearance-none`}
            value={formData.score}
            onChange={handleChange}
            required
          >
            <option value="" className="bg-[#0a0a1a] text-[#f0f4ff]">Select rating</option>
            <option value="1" className="bg-[#0a0a1a] text-[#f0f4ff]">1 - Poor</option>
            <option value="2" className="bg-[#0a0a1a] text-[#f0f4ff]">2 - Fair</option>
            <option value="3" className="bg-[#0a0a1a] text-[#f0f4ff]">3 - Good</option>
            <option value="4" className="bg-[#0a0a1a] text-[#f0f4ff]">4 - Very Good</option>
            <option value="5" className="bg-[#0a0a1a] text-[#f0f4ff]">5 - Excellent</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-[#00f0ff] opacity-80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {errors.score && <p className="mt-1 text-sm text-[#ff5050] font-['Rajdhani'] tracking-wider">{errors.score}</p>}
      </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">
            FLIGHT REPORT
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows="5"
              className={`block w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border ${errors.description ? 'border-[#ff5050]' : 'border-[#00f0ff]/30'} rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider`}
              placeholder="Describe your flight experience..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <div className="absolute bottom-2 right-2 text-xs text-[#00f0ff]/50 font-['Rajdhani'] tracking-wider">
              {formData.description.length}/500
            </div>
          </div>
          {errors.description && <p className="mt-1 text-sm text-[#ff5050] font-['Rajdhani'] tracking-wider">{errors.description}</p>}
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={handleGoBack}
            className="px-6 py-3 bg-transparent text-[#00f0ff] font-['Orbitron'] tracking-wider rounded-lg border border-[#00f0ff]/30 hover:bg-[rgba(0,240,255,0.1)] transition-colors"
          >
            ← RETURN TO DASHBOARD
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#00f0ff] text-[#0a0a1a] font-bold font-['Orbitron'] tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all disabled:opacity-50 flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#0a0a1a]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                TRANSMITTING...
              </>
            ) : (
              review ? 'UPDATE LOG' : 'SUBMIT REPORT'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-[#00f0ff]/10 text-center">
        <p className="text-xs text-[#00f0ff]/50 font-['Rajdhani'] tracking-wider">
          SKYMETRICS FLIGHT REPORT SYSTEM v2.4.1
        </p>
      </div>
    </div>
  );
};

export default ReviewForm;