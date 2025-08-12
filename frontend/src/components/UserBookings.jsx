import { useEffect, useState } from 'react';
import { updateBookingStatus, cancelBooking } from '../services/bookingService';
import { Link } from 'react-router-dom';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }

        const res = await fetch('/api/v1/bookings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          throw new Error('Unauthorized. Token may have expired. Please log in again.');
        }
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        // Handle empty body
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

        // Ensure every booking has a status
        const bookingsWithStatus = data.map(b => ({
          ...b,
          status: b.status || 'PENDING'
        }));

        setBookings(bookingsWithStatus);
      } catch (err) {
        console.error('Failed to load bookings:', err);
        setError(err.message || 'Failed to load bookings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId ? { ...b, status: newStatus } : b
        )
      );
      alert(`Booking ${newStatus.toLowerCase()} successfully`);
    } catch (err) {
      console.error('Status update error:', err);
      alert(err.message || `Failed to ${newStatus.toLowerCase()} booking.`);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(bookingId);
      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId ? { ...b, status: 'CANCELED' } : b
        )
      );
      alert('Booking canceled successfully');
    } catch (err) {
      console.error('Cancel error:', err);
      alert(err.message || 'Failed to cancel booking.');
    }
  };

  const handleConfirm = async (bookingId) => {
    if (!window.confirm("Are you sure you want to confirm this booking?")) return;
    await handleStatusUpdate(bookingId, 'CONFIRMED');
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.1)_0,_transparent_70%)]"></div>
      </div>

      {/* Radar lines */}
      <div className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="absolute inset-0 rounded-full border border-[rgba(0,240,255,0.05)] animate-[radarPulse_8s_linear_infinite]"></div>
        <div className="absolute inset-0 rounded-full border border-[rgba(0,240,255,0.05)] animate-[radarPulse_8s_linear_infinite_2s]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 border-b border-[#00f0ff]/20 pb-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#00f0ff] mr-3 animate-pulse"></div>
            <h1 className="font-['Orbitron'] text-3xl font-bold text-[#00f0ff] tracking-wider uppercase">
              FLIGHT MANIFEST CONTROL
            </h1>
          </div>
          <div className="text-[#00f0ff]/70 font-['Rajdhani'] tracking-wider text-sm">
            ACTIVE BOOKINGS: {bookings.filter(b => b.status === 'CONFIRMED').length}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
            <p className="text-red-300 font-['Rajdhani']">{error}</p>
          </div>
        )}

        {/* Bookings Table */}
        <div className="bg-[rgba(16,24,39,0.7)] backdrop-blur-lg rounded-xl border border-[#00f0ff]/20 shadow-2xl shadow-[#00f0ff]/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="grid grid-cols-12 gap-4 px-6 py-4 bg-[rgba(0,240,255,0.1)] border-b border-[#00f0ff]/10">
                <th className="col-span-3 font-['Orbitron'] text-[#00f0ff] text-sm tracking-wider uppercase text-left">AIRLINE</th>
                <th className="col-span-3 font-['Orbitron'] text-[#00f0ff] text-sm tracking-wider uppercase text-left">ROUTE</th>
                <th className="col-span-3 font-['Orbitron'] text-[#00f0ff] text-sm tracking-wider uppercase text-left">DEPARTURE</th>
                <th className="col-span-3 font-['Orbitron'] text-[#00f0ff] text-sm tracking-wider uppercase text-left">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00f0ff]"></div>
                    <p className="mt-4 text-[#00f0ff]/80 font-['Rajdhani'] tracking-wider">LOADING FLIGHT DATA...</p>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-[#00f0ff]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-['Orbitron'] text-[#00f0ff] tracking-wider">NO ACTIVE BOOKINGS</h3>
                    <p className="mt-1 text-[#00f0ff]/70 font-['Rajdhani'] tracking-wider">Your flight manifest is currently empty</p>
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[rgba(0,240,255,0.05)] transition-colors">
                    <td className="col-span-3 flex items-center">
                      <svg className="flex-shrink-0 h-5 w-5 text-[#00f0ff] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="font-['Rajdhani'] text-[#f0f4ff] tracking-wider">{b.airline?.name || 'Unknown Airline'}</span>
                    </td>
                    <td className="col-span-3 flex items-center font-['Rajdhani'] text-[#f0f4ff] tracking-wider">
                      <span className="font-medium">{b.origin}</span>
                      <svg className="mx-2 h-4 w-4 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="font-medium">{b.destination}</span>
                    </td>
                    <td className="col-span-3 font-['Rajdhani'] text-[#f0f4ff] tracking-wider">
                      {new Date(b.departure_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })} <span className="text-[#00f0ff]">|</span> {b.departure_time}
                    </td>
                    <td className="col-span-3 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-['Orbitron'] tracking-wider border ${
                        b.status === 'CONFIRMED' 
                          ? 'bg-[rgba(0,240,255,0.1)] text-[#00f0ff] border-[#00f0ff]/30'
                          : b.status === 'CANCELED'
                            ? 'bg-[rgba(255,50,50,0.1)] text-[#ff3232] border-[#ff3232]/30'
                            : 'bg-[rgba(255,200,0,0.1)] text-[#ffc800] border-[#ffc800]/30'
                      }`}>
                        {b.status}
                      </span>
                      {b.status === 'PENDING' ? (
                        <>
                          <button
                            onClick={() => handleConfirm(b.id)}
                            className="px-2 py-1 rounded-full text-xs font-['Orbitron'] tracking-wider bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors"
                          >
                            CONFIRM
                          </button>
                          <button
                            onClick={() => handleCancel(b.id)}
                            className="px-2 py-1 rounded-full text-xs font-['Orbitron'] tracking-wider bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
                          >
                            CANCEL
                          </button>
                        </>
                      ) : b.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleCancel(b.id)}
                          className="px-2 py-1 rounded-full text-xs font-['Orbitron'] tracking-wider bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
                        >
                          CANCEL
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center text-[#00f0ff]/70 font-['Rajdhani'] tracking-wider text-sm">
          <div>SYSTEM READY</div>
          <div>
            <Link 
              to="/airlines" 
              className="hover:text-[#00f0ff] transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              BACK TO AIRLINES
            </Link>
          </div>
          <div>OPENFLIGHTS FLIGHT CONTROL v2.4.1</div>
          <div>{new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</div>
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
