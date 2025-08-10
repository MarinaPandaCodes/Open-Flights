import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-full mx-auto font-['Rajdhani'] text-[#f0f4ff] bg-[#0a0a1a] overflow-x-hidden">
      {/* Auth Buttons - Futuristic HUD Style */}
      <div className="absolute top-8 right-8 flex gap-4 z-[1000]">
        <Link
          to="/login"
          className="px-8 py-3 rounded-full bg-[rgba(16,24,39,0.8)] backdrop-blur-md text-[#00f0ff] font-medium transition-all duration-300 text-[1rem] tracking-[1px] border border-[rgba(0,240,255,0.3)] cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:bg-[rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] font-['Orbitron']"
        >
          LOGIN
        </Link>
        <Link
          to="/signup"
          className="px-8 py-3 rounded-full bg-[#00f0ff] text-[#0a0a1a] font-bold transition-all duration-300 text-[1rem] tracking-[1px] border border-[#00f0ff] cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] font-['Orbitron']"
        >
          SIGN UP
        </Link>
      </div>

      {/* Hero Section - Flight Deck Inspired */}
      <header className="relative bg-[url('https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2948')] bg-cover bg-center h-screen w-full flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:bg-[rgba(10,10,26,0.85)]">
        {/* Radar scan animation */}
        <div className="absolute inset-0 z-[1] opacity-30">
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full border border-[rgba(0,240,255,0.1)] animate-[radarPulse_6s_linear_infinite]"></div>
            <div className="absolute inset-0 rounded-full border border-[rgba(0,240,255,0.1)] animate-[radarPulse_6s_linear_infinite_2s]"></div>
            <div className="absolute inset-0 rounded-full border border-[rgba(0,240,255,0.1)] animate-[radarPulse_6s_linear_infinite_4s]"></div>
          </div>
        </div>

        {/* Flight path grid */}
        <div className="absolute inset-0 z-[1] opacity-10">
          <div className="w-full h-full bg-[linear-gradient(to_right,rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-[2] px-8 max-w-[1200px] text-center">
          <div className="inline-flex items-center mb-8 px-4 py-2 bg-[rgba(16,24,39,0.8)] backdrop-blur rounded-full border border-[rgba(0,240,255,0.3)] text-[#00f0ff] text-sm font-bold tracking-[3px] uppercase font-['Orbitron']">
            <span className="w-2 h-2 bg-[#00f0ff] rounded-full mr-2 animate-pulse"></span>
            NEXT-GEN FLIGHT ANALYTICS
          </div>
          <h1 className="font-['Orbitron'] text-[3.5rem] md:text-[5rem] mb-6 leading-[1.1] font-bold tracking-[2px] uppercase">
            <span className="text-[#00f0ff]">Sky</span>Metrics
            <span className="text-[#00f0ff]">AI</span>
          </h1>
          <p className="text-[1.2rem] md:text-[1.4rem] mb-12 font-light max-w-[700px] mx-auto text-[rgba(240,244,255,0.8)] leading-relaxed tracking-[0.5px]">
            Advanced predictive analytics for smarter flight decisions. Harnessing real-time data
            from 10,000+ flights daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="relative px-10 py-4 bg-[#00f0ff] text-[#0a0a1a] font-bold rounded-lg text-[1.1rem] transition-all duration-400 font-['Orbitron'] tracking-[2px] uppercase hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:-translate-y-[2px]"
            >
              DEPART NOW
              <span className="absolute inset-0 rounded-lg bg-[rgba(255,255,255,0.2)] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              to="/demo"
              className="px-10 py-4 bg-transparent text-[#f0f4ff] font-bold rounded-lg text-[1.1rem] border-2 border-[rgba(0,240,255,0.5)] transition-all duration-400 hover:bg-[rgba(0,240,255,0.1)] font-['Orbitron'] tracking-[2px] uppercase"
            >
              FLIGHT DEMO
            </Link>
          </div>
        </div>

        {/* Altitude indicator */}
        <div className="absolute bottom-10 left-10 z-[2] font-['Orbitron'] text-[rgba(0,240,255,0.8)] tracking-[2px]">
          <div className="text-sm mb-1">ALTITUDE</div>
          <div className="text-2xl font-bold">
            33,000<span className="text-sm ml-1">FT</span>
          </div>
        </div>

        {/* Speed indicator */}
        <div className="absolute bottom-10 right-10 z-[2] font-['Orbitron'] text-[rgba(0,240,255,0.8)] tracking-[2px]">
          <div className="text-sm mb-1">SPEED</div>
          <div className="text-2xl font-bold">
            547<span className="text-sm ml-1">KTS</span>
          </div>
        </div>
      </header>

      {/* Features Section - Flight Instrument Panel */}
      <section className="py-24 px-8 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a0a1a] via-[#071020] to-[#0a0a1a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Orbitron'] text-[2.5rem] md:text-[3.5rem] mb-4 font-bold tracking-[2px] uppercase">
              Flight <span className="text-[#00f0ff]">Instruments</span>
            </h2>
            <p className="text-[1.1rem] md:text-[1.2rem] max-w-[600px] mx-auto text-[rgba(240,244,255,0.7)] tracking-[0.5px]">
              Precision tools for aviation intelligence at your fingertips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[rgba(16,24,39,0.6)] p-8 rounded-xl border border-[rgba(0,240,255,0.2)] backdrop-blur-sm transition-all duration-500 hover:border-[rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] group">
              <div className="w-16 h-16 rounded-lg bg-[rgba(0,240,255,0.1)] flex items-center justify-center mb-6 group-hover:bg-[rgba(0,240,255,0.2)] transition-colors">
                <svg
                  className="w-8 h-8 text-[#00f0ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-['Orbitron'] text-[1.5rem] mb-4 text-[#f0f4ff] tracking-[2px] uppercase">
                Weather Radar
              </h3>
              <p className="text-[1rem] leading-relaxed text-[rgba(240,244,255,0.7)] tracking-[0.5px]">
                Real-time turbulence and weather pattern analysis to optimize flight paths and avoid
                disruptions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[rgba(16,24,39,0.6)] p-8 rounded-xl border border-[rgba(0,240,255,0.2)] backdrop-blur-sm transition-all duration-500 hover:border-[rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] group">
              <div className="w-16 h-16 rounded-lg bg-[rgba(0,240,255,0.1)] flex items-center justify-center mb-6 group-hover:bg-[rgba(0,240,255,0.2)] transition-colors">
                <svg
                  className="w-8 h-8 text-[#00f0ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-['Orbitron'] text-[1.5rem] mb-4 text-[#f0f4ff] tracking-[2px] uppercase">
                Delay Predictor
              </h3>
              <p className="text-[1rem] leading-relaxed text-[rgba(240,244,255,0.7)] tracking-[0.5px]">
                Machine learning models predict delays with 92% accuracy using historical and
                real-time data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[rgba(16,24,39,0.6)] p-8 rounded-xl border border-[rgba(0,240,255,0.2)] backdrop-blur-sm transition-all duration-500 hover:border-[rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] group">
              <div className="w-16 h-16 rounded-lg bg-[rgba(0,240,255,0.1)] flex items-center justify-center mb-6 group-hover:bg-[rgba(0,240,255,0.2)] transition-colors">
                <svg
                  className="w-8 h-8 text-[#00f0ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="font-['Orbitron'] text-[1.5rem] mb-4 text-[#f0f4ff] tracking-[2px] uppercase">
                Crew Analytics
              </h3>
              <p className="text-[1rem] leading-relaxed text-[rgba(240,244,255,0.7)] tracking-[0.5px]">
                Comprehensive crew performance metrics and scheduling optimization to enhance
                operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Flight Black Box */}
      <section className="py-24 px-8 relative bg-[#071020]">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-[rgba(16,24,39,0.8)] backdrop-blur-lg rounded-2xl border border-[rgba(0,240,255,0.2)] p-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>
            <div className="relative z-[2]">
              <h2 className="font-['Orbitron'] text-[2.5rem] md:text-[3rem] mb-12 text-center tracking-[2px] uppercase">
                Flight <span className="text-[#00f0ff]">Logs</span>
              </h2>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-[rgba(0,240,255,0.1)] border-2 border-[rgba(0,240,255,0.3)] flex items-center justify-center p-1">
                    <div className="w-full h-full rounded-full bg-[#0a0a1a] flex items-center justify-center overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                        alt="Pilot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <blockquote className="text-[1.4rem] leading-relaxed mb-6 font-light italic tracking-[0.5px]">
                    "SkyMetrics AI is like having a co-pilot that never sleeps. The predictive
                    analytics helped us reduce operational costs by 18% in the first quarter alone.
                    It's transformed how we plan our routes and crew schedules."
                  </blockquote>
                  <div className="font-['Orbitron'] text-[1.1rem] tracking-[1px]">
                    <div className="text-[#00f0ff]">CAPTAIN SARAH LI</div>
                    <div className="text-[rgba(240,244,255,0.7)]">
                      Chief Operations Officer, TransGlobal Airlines
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Flight Ready */}
      <section className="py-24 px-8 relative bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2948')] bg-cover bg-center before:absolute before:inset-0 before:bg-[rgba(10,10,26,0.9)]">
        <div className="max-w-[800px] mx-auto text-center relative z-[2]">
          <h2 className="font-['Orbitron'] text-[2.5rem] md:text-[4rem] mb-6 font-bold tracking-[2px] uppercase">
            <span className="text-[#00f0ff]">CLEARED</span> FOR TAKE
            <span className="text-[#00f0ff]">OFF</span>
          </h2>
          <p className="text-[1.2rem] mb-10 text-[rgba(240,244,255,0.8)] tracking-[0.5px]">
            Join 450+ airlines and 12,000+ pilots using SkyMetrics to optimize their flight
            operations.
          </p>
          <Link
            to="/signup"
            className="inline-block px-12 py-5 bg-[#00f0ff] text-[#0a0a1a] font-bold rounded-lg text-[1.1rem] transition-all duration-400 font-['Orbitron'] tracking-[2px] uppercase hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:-translate-y-[2px]"
          >
            REQUEST CLEARANCE
          </Link>
        </div>
      </section>

      {/* Footer - Flight Tower */}
      <footer className="py-16 px-8 border-t border-[rgba(0,240,255,0.1)] bg-[#071020]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[1.8rem] font-['Orbitron'] font-bold tracking-[2px] uppercase">
              <span className="text-[#00f0ff]">SKY</span>METRICS
            </div>
            <div className="flex flex-wrap justify-center gap-6 font-['Rajdhani'] tracking-[1px]">
              <Link
                to="/features"
                className="text-[rgba(240,244,255,0.8)] hover:text-[#00f0ff] transition-colors"
              >
                INSTRUMENTS
              </Link>
              <Link
                to="/pricing"
                className="text-[rgba(240,244,255,0.8)] hover:text-[#00f0ff] transition-colors"
              >
                PRICING
              </Link>
              <Link
                to="/blog"
                className="text-[rgba(240,244,255,0.8)] hover:text-[#00f0ff] transition-colors"
              >
                FLIGHT LOG
              </Link>
              <Link
                to="/contact"
                className="text-[rgba(240,244,255,0.8)] hover:text-[#00f0ff] transition-colors"
              >
                TOWER
              </Link>
            </div>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-[rgba(0,240,255,0.1)] flex items-center justify-center hover:bg-[rgba(0,240,255,0.3)] transition-colors border border-[rgba(0,240,255,0.2)]">
                <svg className="w-5 h-5 text-[#00f0ff]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-[rgba(0,240,255,0.1)] flex items-center justify-center hover:bg-[rgba(0,240,255,0.3)] transition-colors border border-[rgba(0,240,255,0.2)]">
                <svg className="w-5 h-5 text-[#00f0ff]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-[rgba(0,240,255,0.1)] flex items-center justify-center hover:bg-[rgba(0,240,255,0.3)] transition-colors border border-[rgba(0,240,255,0.2)]">
                <svg className="w-5 h-5 text-[#00f0ff]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[rgba(0,240,255,0.1)] text-center text-[rgba(240,244,255,0.5)] text-sm font-['Rajdhani'] tracking-[1px]">
            © {new Date().getFullYear()} SKYMETRICS AI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes radarPulse {
          0% {
            transform: scale(0.1);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
