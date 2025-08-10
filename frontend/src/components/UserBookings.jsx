import { useEffect, useState } from 'react';
import { getUserBookings } from '../services/bookingService';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUserBookings()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] p-8 relative overflow-hidden">
      {/* Flight deck background elements */}
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
        {/* Flight Control Header */}
        <div className="flex justify-between items-center mb-10 border-b border-[#00f0ff]/20 pb-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#00f0ff] mr-3 animate-pulse"></div>
            <h1 className="font-['Orbitron'] text-3xl font-bold text-[#00f0ff] tracking-wider uppercase">
              FLIGHT MANIFEST CONTROL
            </h1>
          </div>
          <div className="text-[#00f0ff]/70 font-['Rajdhani'] tracking-wider text-sm">
            ACTIVE BOOKINGS: {bookings.length}
          </div>
        </div>

        {/* Flight Data Display */}
        <div className="bg-[rgba(16,24,39,0.7)] backdrop-blur-lg rounded-xl border border-[#00f0ff]/20 shadow-2xl shadow-[#00f0ff]/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[rgba(0,240,255,0.1)] border-b border-[#00f0ff]/10">
            <div className="col-span-3 font-['Orbitron'] text-[#00f0ff] text-sm tracking-wider uppercase">AIRLINE</div>
            <div className="col-span-3 font-['Orbitron'] text-[#00f0ff] text-sm tracking-wider uppercase">ROUTE</div>
            <div className="col-span-3 font-['Orbitron'] text-[#00f0ff] text-sm tracking-wider uppercase">DEPARTURE</div>
            <div className="col-span-3 font-['Orbitron'] text-[#00f0ff] text-sm tracking-wider uppercase">STATUS</div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00f0ff]"></div>
              <p className="mt-4 text-[#00f0ff]/80 font-['Rajdhani'] tracking-wider">LOADING FLIGHT DATA...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-[#00f0ff]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-['Orbitron'] text-[#00f0ff] tracking-wider">NO ACTIVE BOOKINGS</h3>
              <p className="mt-1 text-[#00f0ff]/70 font-['Rajdhani'] tracking-wider">Your flight manifest is currently empty</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#00f0ff]/10">
              {bookings.map((b) => (
                <li key={b.id} className="hover:bg-[rgba(0,240,255,0.05)] transition-colors">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4">
                    <div className="col-span-3 flex items-center">
                      <svg className="flex-shrink-0 h-5 w-5 text-[#00f0ff] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="font-['Rajdhani'] text-[#f0f4ff] tracking-wider">{b.airline.name}</span>
                    </div>
                    <div className="col-span-3 flex items-center font-['Rajdhani'] text-[#f0f4ff] tracking-wider">
                      <span className="font-medium">{b.origin}</span>
                      <svg className="mx-2 h-4 w-4 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="font-medium">{b.destination}</span>
                    </div>
                    <div className="col-span-3 font-['Rajdhani'] text-[#f0f4ff] tracking-wider">
                      {b.departure_date} <span className="text-[#00f0ff]">|</span> {b.departure_time}
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className="px-2 py-1 rounded-full text-xs font-['Orbitron'] tracking-wider bg-[rgba(0,240,255,0.1)] text-[#00f0ff] border border-[#00f0ff]/30">
                        CONFIRMED
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Flight Control Footer */}
        <div className="mt-8 flex justify-between items-center text-[#00f0ff]/70 font-['Rajdhani'] tracking-wider text-sm">
          <div>SYSTEM READY</div>
          <div>SKYMETRICS FLIGHT CONTROL v2.4.1</div>
          <div>{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes radarPulse {
          0% { transform: scale(0.1); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default UserBookings;