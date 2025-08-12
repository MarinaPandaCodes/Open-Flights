// src/services/bookingService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json"
  };
};

/**
 * Create a new booking for a given airline.
 * @param {number|string} airlineId - The airline's ID.
 * @param {object} bookingData - The booking details.
 * @returns {Promise<object>} - The created booking data.
 */
export const createBooking = async (airlineId, bookingData) => {
  try {
    const response = await axios.post(
      `${API_URL}/airlines/${airlineId}/bookings`,
      { booking: bookingData },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.errors || error.response?.data?.error || 'Failed to create booking';
    throw new Error(Array.isArray(errMsg) ? errMsg.join(", ") : errMsg);
  }
};

/**
 * Get all bookings for the current user.
 * @returns {Promise<Array>} - Array of bookings.
 */
export const getUserBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Update the status of a booking.
 * @param {number|string} bookingId - Booking ID.
 * @param {string} status - New status (e.g. 'CONFIRMED', 'CANCELED').
 * @returns {Promise<object>} - Updated booking data.
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/bookings/${bookingId}`,
      {  booking: { status } },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update booking status');
  }
};

/**
 * Cancel a booking by deleting it.
 * @param {number|string} bookingId - Booking ID.
 * @returns {Promise<object>} - Response data.
 */
export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/bookings/${bookingId}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to cancel booking');
  }
};
