import { createBooking } from "../../services/bookingService";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Toast notification component (unchanged)
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg border ${type === "success" ? "bg-[rgba(0,240,255,0.1)] border-[#00f0ff]/30 text-[#00f0ff]" : "bg-[rgba(255,80,80,0.1)] border-[#ff5050]/30 text-[#ff5050]"} font-['Rajdhani'] tracking-wider flex items-center shadow-lg backdrop-blur-sm`}>
      <div className="mr-4 font-bold">{type === "success" ? "✓" : "⚠️"}</div>
      <div>{message}</div>
      <button className="ml-4 text-lg font-bold" onClick={onClose}>×</button>
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
    <div className="fixed inset-0 z-40 bg-[rgba(10,10,26,0.8)] backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[rgba(16,24,39,0.9)] border border-[#00f0ff]/20 rounded-xl shadow-2xl shadow-[#00f0ff]/10 w-full max-w-2xl p-8">
        <h2 className="font-['Orbitron'] text-2xl text-[#00f0ff] mb-6 tracking-wider uppercase">
          {airline ? "EDIT AIRLINE" : "CREATE NEW AIRLINE"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">AIRLINE NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">IMAGE URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">COUNTRY</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">SLUG (URL IDENTIFIER)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">DESCRIPTION</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">HEADQUARTERS</label>
              <input
                type="text"
                name="headquarters"
                value={formData.headquarters}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">ESTABLISHED (YEAR)</label>
              <input
                type="number"
                name="established_year"
                value={formData.established_year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-transparent border border-[#00f0ff]/50 text-[#00f0ff] rounded-lg font-['Orbitron'] tracking-wider hover:bg-[rgba(0,240,255,0.1)] transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#00f0ff] text-[#0a0a1a] rounded-lg font-['Orbitron'] font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
            >
              {airline ? "UPDATE" : "CREATE"}
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
    <div className="fixed inset-0 z-40 bg-[rgba(10,10,26,0.8)] backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[rgba(16,24,39,0.9)] border border-[#00f0ff]/20 rounded-xl shadow-2xl shadow-[#00f0ff]/10 w-full max-w-2xl p-8">
        <h2 className="font-['Orbitron'] text-2xl text-[#00f0ff] mb-6 tracking-wider uppercase">
          BOOK FLIGHT - {airline.attributes.name.toUpperCase()}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">DEPARTURE DATE</label>
              <input
                type="date"
                name="departure_date"
                value={formData.departure_date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">DEPARTURE TIME</label>
              <input
                type="time"
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">RETURN DATE (OPTIONAL)</label>
              <input
                type="date"
                name="return_date"
                value={formData.return_date}
                onChange={handleChange}
                min={formData.departure_date || new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">PASSENGERS</label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num} className="bg-[#0a0a1a]">
                    {num} {num === 1 ? "PASSENGER" : "PASSENGERS"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">ORIGIN CITY</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                placeholder="City of departure"
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">DESTINATION</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                readOnly
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">CABIN CLASS</label>
              <select
                name="cabin_class"
                value={formData.cabin_class}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider"
              >
                {cabinClasses.map((cls) => (
                  <option key={cls.value} value={cls.value} className="bg-[#0a0a1a]">
                    {cls.label.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider">SPECIAL REQUESTS (OPTIONAL)</label>
              <textarea
                name="special_requests"
                value={formData.special_requests}
                onChange={handleChange}
                placeholder="Dietary needs, accessibility requirements, etc."
                className="w-full px-4 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isBooking}
              className={`px-6 py-3 bg-transparent border ${isBooking ? 'border-[#00f0ff]/20 text-[#00f0ff]/50' : 'border-[#00f0ff]/50 text-[#00f0ff]'} rounded-lg font-['Orbitron'] tracking-wider hover:bg-[rgba(0,240,255,0.1)] transition-colors`}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isBooking}
              className={`px-6 py-3 ${isBooking ? 'bg-[#00f0ff]/50' : 'bg-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]'} text-[#0a0a1a] rounded-lg font-['Orbitron'] font-bold tracking-wider transition-all`}
            >
              {isBooking ? "PROCESSING..." : "CONFIRM BOOKING"}
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
    addToast("You have been logged out successfully", "success");
  };

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

  // Updated to use airline ID instead of slug
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await axios.delete(`/api/v1/airlines/${id}`);
        setAirlines((prev) =>
          prev.filter((a) => a.id !== id)
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

  // Updated to use airline ID instead of slug
  const handleUpdate = async (formData) => {
    try {
      const response = await axios.put(
        `/api/v1/airlines/${editingAirline.id}`,
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

  // Updated to use airline ID through bookingAirline.id
  const handleBookingSubmit = async (bookingData) => {
    if (isBooking) return;
    setIsBooking(true);
    
    try {
      if (!bookingData.departure_date || !bookingData.departure_time || !bookingData.origin) {
        addToast("Please fill all required fields", "error");
        setIsBooking(false);
        return;
      }

      await createBooking(bookingAirline.id, bookingData);
      
      addToast(
        `Flight from ${bookingData.origin} to ${bookingData.destination} booked successfully!`,
        "success"
      );
      setBookingAirline(null);
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
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a1a] z-50">
        <div className="w-16 h-16 border-4 border-[#00f0ff] border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-4 text-[#00f0ff] font-['Orbitron'] tracking-wider uppercase">INITIALIZING AIRLINE DATABASE...</div>
      </div>
    );

  if (error)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a1a] z-50 p-4">
        <div className="text-4xl text-[#ff5050] mb-4">⚠️</div>
        <div className="text-[#f0f4ff] text-center font-['Rajdhani'] tracking-wider mb-6">{error}</div>
        <button
          className="px-6 py-3 bg-[#00f0ff] text-[#0a0a1a] rounded-lg font-['Orbitron'] font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
          onClick={() => window.location.reload()}
        >
          RETRY CONNECTION
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-[#f0f4ff]">
      {/* Toast notifications (unchanged) */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Airline Create/Edit Form Modal (unchanged) */}
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

      {/* Booking Form Modal for users (unchanged) */}
      {bookingAirline && (
        <BookingForm
          airline={bookingAirline}
          onSubmit={handleBookingSubmit}
          onCancel={() => setBookingAirline(null)}
          isBooking={isBooking}
        />
      )}

      {/* Logout button at the top right (unchanged) */}
      <div className="absolute top-4 right-4 z-40">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-transparent border border-[#ff5050]/50 text-[#ff5050] rounded-lg font-['Rajdhani'] tracking-wider hover:bg-[rgba(255,80,80,0.1)] transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          LOGOUT
        </button>
      </div>

      <header className="pt-12 pb-8 px-4 md:px-8 border-b border-[#00f0ff]/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="font-['Orbitron'] text-4xl font-bold tracking-wider uppercase">
                <span className="text-[#00f0ff]">OPEN</span>FLIGHTS
              </h1>
              <p className="font-['Rajdhani'] text-[#00f0ff]/80 tracking-wider mt-2">FLIGHT CONTROL SYSTEM</p>
            </div>

            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                placeholder="SEARCH AIRLINES..."
                className="w-full px-6 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#00f0ff]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {role === "user" && (
                <Link 
                  to="/my-bookings" 
                  className="px-6 py-3 bg-transparent border border-[#00f0ff]/50 text-[#00f0ff] rounded-lg font-['Orbitron'] tracking-wider hover:bg-[rgba(0,240,255,0.1)] transition-colors"
                >
                  MY BOOKINGS
                </Link>
              )}
              {role === "admin" && (
                <button
                  className="px-6 py-3 bg-[#00f0ff] text-[#0a0a1a] rounded-lg font-['Orbitron'] font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
                  onClick={() => {
                    setShowForm(true);
                    setEditingAirline(null);
                  }}
                >
                  CREATE NEW
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredAirlines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAirlines.map((airline) => (
                <div key={airline.id} className="bg-[rgba(16,24,39,0.5)] border border-[#00f0ff]/10 rounded-xl overflow-hidden hover:border-[#00f0ff]/30 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                  {/* Updated to use airline ID in the link */}
                  <Link
                    to={`/airlines/${airline.id}`}
                    className="block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={airline.attributes.image_url}
                        alt={airline.attributes.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,26,0.8)] to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-[rgba(0,240,255,0.2)] backdrop-blur-sm px-3 py-1 rounded-full border border-[#00f0ff]/30 text-[#00f0ff] font-['Orbitron'] text-sm font-bold tracking-wider">
                        {airline.attributes.avg_score.toFixed(1)} ★
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-['Orbitron'] text-xl font-bold tracking-wider mb-2">{airline.attributes.name}</h3>
                      <div className="flex flex-wrap gap-2 text-sm font-['Rajdhani'] tracking-wider text-[#00f0ff]">
                        <span>✈️ {airline.attributes.country}</span>
                        <span>⭐ {airline.attributes.reviews_count} REVIEWS</span>
                      </div>
                    </div>
                  </Link>

                  <div className="px-6 pb-6 flex flex-wrap gap-2">
                    {/* Updated to use airline ID in the link */}
                    <Link
                      to={`/airlines/${airline.id}`}
                      className="px-4 py-2 bg-transparent border border-[#00f0ff]/50 text-[#00f0ff] rounded-lg font-['Rajdhani'] tracking-wider hover:bg-[rgba(0,240,255,0.1)] transition-colors"
                    >
                      DETAILS
                    </Link>

                    {role === "admin" ? (
                      <>
                        <button
                          className="px-4 py-2 bg-transparent border border-[#00f0ff]/50 text-[#00f0ff] rounded-lg font-['Rajdhani'] tracking-wider hover:bg-[rgba(0,240,255,0.1)] transition-colors"
                          onClick={() => {
                            setEditingAirline(airline);
                            setShowForm(true);
                          }}
                        >
                          EDIT
                        </button>
                        <button
                          className="px-4 py-2 bg-transparent border border-[#ff5050]/50 text-[#ff5050] rounded-lg font-['Rajdhani'] tracking-wider hover:bg-[rgba(255,80,80,0.1)] transition-colors"
                          onClick={() =>
                            handleDelete(
                              airline.id,
                              airline.attributes.name
                            )
                          }
                        >
                          DELETE
                        </button>
                      </>
                    ) : (
                      <button
                        className="px-4 py-2 bg-[#00f0ff] text-[#0a0a1a] rounded-lg font-['Rajdhani'] font-bold tracking-wider hover:shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all"
                        onClick={() => setBookingAirline(airline)}
                      >
                        BOOK FLIGHT
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl text-[#00f0ff]/50 mb-4">🌐</div>
              <h3 className="font-['Orbitron'] text-2xl tracking-wider mb-2">NO AIRLINES FOUND</h3>
              <p className="font-['Rajdhani'] text-[#00f0ff]/80 tracking-wider">TRY ADJUSTING YOUR SEARCH CRITERIA</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 px-4 md:px-8 border-t border-[#00f0ff]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="font-['Rajdhani'] text-sm text-[#00f0ff]/50 tracking-wider mb-4 md:mb-0">
            DISPLAYING {filteredAirlines.length} OF {airlines.length} AIRLINES
          </p>
          <Link 
            to="/" 
            className="font-['Rajdhani'] text-sm text-[#00f0ff] tracking-wider hover:text-[#00f0ff]/80 transition-colors"
          >
            RETURN TO CONTROL PANEL
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Airlines;