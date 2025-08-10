import { useEffect, useState } from "react";
import { getUserBookings } from "../services/bookingService";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getUserBookings()
      .then(setBookings)
      .catch(console.error);
  }, []);

  return (
    <div className="bookings-page">
      <h2>My Flight Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              ✈ {b.airline.name} — {b.origin} → {b.destination} on {b.departure_date} at {b.departure_time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBookings;
