import axios from "axios";

export const getUserBookings = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/api/v1/bookings", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
