import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Airlines.css";

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-message">
        {type === "success" ? "✓" : "⚠️"} {message}
      </div>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

// Airline create/edit form
const AirlineForm = ({ airline, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: airline?.attributes?.name || "",
    image_url: airline?.attributes?.image_url || "",
    country: airline?.attributes?.country || "",
    slug: airline?.attributes?.slug || "",
    description: airline?.attributes?.description || "",
    headquarters: airline?.attributes?.headquarters || "",
    established_year: airline?.attributes?.established_year?.toString() || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      established_year:
        formData.established_year === ""
          ? null
          : parseInt(formData.established_year, 10)
    };
    onSubmit(submissionData);
  };

  return (
    <div className="airline-form-modal">
      <div className="airline-form-container">
        <h2>{airline ? "Edit Airline" : "Create New Airline"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Airline Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Slug (URL Identifier)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Headquarters</label>
            <input
              type="text"
              name="headquarters"
              value={formData.headquarters}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Established (Year)</label>
            <input
              type="number"
              name="established_year"
              value={formData.established_year}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {airline ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Enhanced Booking form modal
const BookingForm = ({ airline, onSubmit, onCancel, isBooking }) => {
  const [formData, setFormData] = useState({
    departure_date: "",
    return_date: "",
    departure_time: "",
    passengers: 1,
    cabin_class: "economy",
    origin: "",
    destination: airline.attributes.country || "",
    special_requests: ""
  });

  const cabinClasses = [
    { value: "economy", label: "Economy" },
    { value: "premium_economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.departure_date || !formData.departure_time || !formData.origin) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="booking-form-modal">
      <div className="booking-form-container">
        <h2>Book Flight - {airline.attributes.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Departure Date</label>
              <input
                type="date"
                name="departure_date"
                value={formData.departure_date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="form-group">
              <label>Departure Time</label>
              <input
                type="time"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Return Date (Optional)</label>
              <input
                type="date"
                name="return_date"
                value={formData.return_date}
                onChange={handleChange}
                min={formData.departure_date || new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="form-group">
              <label>Passengers</label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Passenger" : "Passengers"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Origin City</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                placeholder="City of departure"
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cabin Class</label>
              <select
                name="cabin_class"
                value={formData.cabin_class}
                onChange={handleChange}
                required
              >
                {cabinClasses.map((cls) => (
                  <option key={cls.value} value={cls.value}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Special Requests (Optional)</label>
            <textarea
              name="special_requests"
              value={formData.special_requests}
              onChange={handleChange}
              placeholder="Dietary needs, accessibility requirements, etc."
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={onCancel}
              disabled={isBooking}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={isBooking}
            >
              {isBooking ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Airlines = () => {
  const role = localStorage.getItem("role");
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingAirline, setEditingAirline] = useState(null);
  const [bookingAirline, setBookingAirline] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await axios.get("/api/v1/airlines");
        setAirlines(response.data.data);
      } catch (err) {
        console.error("Error fetching airlines:", err);
        setError("Failed to load airlines");
        addToast("Failed to load airlines. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchAirlines();
  }, []);

  const addToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleDelete = async (slug, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await axios.delete(`/api/v1/airlines/${slug}`);
        setAirlines((prev) =>
          prev.filter((a) => a.attributes.slug !== slug)
        );
        addToast(`${name} has been deleted successfully.`, "success");
      } catch (err) {
        console.error("Error deleting airline:", err);
        addToast(`Failed to delete ${name}. Please try again.`, "error");
      }
    }
  };

  const handleCreate = async (formData) => {
    try {
      const response = await axios.post("/api/v1/airlines", {
        airline: formData
      });
      setAirlines((prev) => [...prev, response.data.data]);
      setShowForm(false);
      addToast(`${formData.name} created successfully!`, "success");
    } catch (err) {
      console.error("Error creating airline:", err);
      const errorMsg =
        err.response?.data?.error ||
        "Failed to create airline. Please try again.";
      addToast(errorMsg, "error");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await axios.put(
        `/api/v1/airlines/${editingAirline.attributes.slug}`,
        {
          airline: formData
        }
      );
      setAirlines((prev) =>
        prev.map((a) =>
          a.id === editingAirline.id ? response.data.data : a
        )
      );
      setEditingAirline(null);
      setShowForm(false);
      addToast(`${formData.name} updated successfully!`, "success");
    } catch (err) {
      console.error("Detailed update error:", {
        message: err.message,
        response: err.response?.data,
        config: err.config
      });
      const errorMsg =
        err.response?.data?.error ||
        "Failed to update airline. Please try again.";
      addToast(errorMsg, "error");
    }
  };

  const handleBookingSubmit = async (bookingData) => {
    if (isBooking) return;
    setIsBooking(true);
    
    try {
      if (!bookingData.departure_date || !bookingData.departure_time || !bookingData.origin) {
        addToast("Please fill all required fields", "error");
        return;
      }

      const response = await axios.post("/api/v1/bookings", {
        booking: {
          airline_id: bookingAirline.id,
          departure_date: bookingData.departure_date,
          return_date: bookingData.return_date || null,
          departure_time: bookingData.departure_time,
          passengers: parseInt(bookingData.passengers, 10),
          cabin_class: bookingData.cabin_class,
          origin: bookingData.origin.trim(),
          destination: bookingData.destination.trim(),
          special_requests: bookingData.special_requests?.trim() || null
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 201) {
        addToast(
          `Flight from ${bookingData.origin} to ${bookingData.destination} booked successfully!`,
          "success"
        );
        setBookingAirline(null);
      }
    } catch (err) {
      console.error("Booking error details:", {
        error: err,
        response: err.response,
        request: err.request
      });
      
      const errorMessage = err.response?.data?.errors?.join(", ") || 
                          err.response?.data?.message || 
                          err.message || 
                          "Booking failed. Please try again.";
      
      addToast(errorMessage, "error");
    } finally {
      setIsBooking(false);
    }
  };

  const filteredAirlines = airlines.filter((airline) =>
    airline.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <div className="loading-text">Initializing Airline Database...</div>
      </div>
    );

  if (error)
    return (
      <div className="error-screen">
        <div className="error-icon">⚠️</div>
        <div className="error-message">{error}</div>
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry Connection
        </button>
      </div>
    );

  return (
    <div className="airlines-container">
      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Airline Create/Edit Form Modal */}
      {(showForm || editingAirline) && (
        <AirlineForm
          airline={editingAirline}
          onSubmit={editingAirline ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingAirline(null);
          }}
        />
      )}

      {/* Booking Form Modal for users */}
      {bookingAirline && (
        <BookingForm
          airline={bookingAirline}
          onSubmit={handleBookingSubmit}
          onCancel={() => setBookingAirline(null)}
          isBooking={isBooking}
        />
      )}

      <header className="airlines-header">
        <div className="header-content">
          <h1 className="main-title">
            <span className="gradient-text">Open Flights </span>Network
          </h1>
          <p className="sub-title">Connect with airlines worldwide</p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search airlines..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">🔍</div>
          </div>

          <div className="search-actions">
            {role === "user" && (
              <Link to="/my-bookings" className="btn-view-bookings">
                 My Bookings
              </Link>
            )}
          </div>

          <div className="header-actions">
            {role === "admin" && (
              <button
                className="btn-create"
                onClick={() => {
                  setShowForm(true);
                  setEditingAirline(null);
                }}
              >
                Create New Airline
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="airlines-grid">
        {filteredAirlines.length > 0 ? (
          filteredAirlines.map((airline) => (
            <div key={airline.id} className="airline-card">
              <Link
                to={`/airlines/${airline.attributes.slug}`}
                className="card-link"
              >
                <div className="card-image-container">
                  <img
                    src={airline.attributes.image_url}
                    alt={airline.attributes.name}
                    className="card-image"
                  />
                  <div className="card-overlay"></div>
                  <div className="card-badge">
                    {airline.attributes.avg_score.toFixed(1)}
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="airline-name">{airline.attributes.name}</h3>
                  <div className="airline-meta">
                    <span className="meta-item">
                      ✈️ {airline.attributes.country}
                    </span>
                    <span className="meta-item">
                      ⭐ {airline.attributes.reviews_count} reviews
                    </span>
                  </div>
                </div>
              </Link>

              <div className="card-actions">
                <Link
                  to={`/airlines/${airline.attributes.slug}`}
                  className="btn-show"
                >
                  Show
                </Link>

                {role === "admin" ? (
                  <>
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setEditingAirline(airline);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() =>
                        handleDelete(
                          airline.attributes.slug,
                          airline.attributes.name
                        )
                      }
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-book"
                    onClick={() => setBookingAirline(airline)}
                  >
                    Book Flight
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🌐</div>
            <h3>No airlines found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </main>

      <footer className="airlines-footer">
        <div className="footer-content">
          <p>
            Showing {filteredAirlines.length} of {airlines.length} airlines
          </p>
          <div className="footer-links">
            <Link to="/" className="home-link">
              Return to Orbit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Airlines;