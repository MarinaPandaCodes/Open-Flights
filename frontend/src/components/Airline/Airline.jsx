import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const Airline = () => {
  const { id } = useParams();
  const [airline, setAirline] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [bookingStats, setBookingStats] = useState({
    total_bookings: 0,
    monthly_bookings: [],
    cabin_distribution: []
  });

  // Fetch airline data
  const fetchAirline = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/airlines/${id}`);
      setAirline(res.data.data);
      setReviews(res.data.included?.filter(item => item.type === 'review') || []);
      
      // Fetch booking analytics data
      const statsRes = await axios.get(`/api/v1/airlines/${id}/booking_stats`);
      setBookingStats({
        total_bookings: statsRes.data.data.total_bookings,
        monthly_bookings: Object.entries(statsRes.data.data.monthly_bookings).map(([date, count]) => ({
          name: new Date(date).toLocaleString('default', { month: 'short' }),
          bookings: count
        })),
        cabin_distribution: Object.entries(statsRes.data.data.cabin_distribution).map(([cabin, count]) => ({
          name: cabin.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
          value: count
        }))
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAirline();
  }, [fetchAirline]);

  // Demo data in case API fails (remove in production)
  const demoBookingData = [
    { name: 'Jan', bookings: 1200 },
    { name: 'Feb', bookings: 1900 },
    { name: 'Mar', bookings: 1500 },
    { name: 'Apr', bookings: 1800 },
    { name: 'May', bookings: 2100 },
    { name: 'Jun', bookings: 2400 },
    { name: 'Jul', bookings: 2600 },
    { name: 'Aug', bookings: 2300 },
    { name: 'Sep', bookings: 2000 },
    { name: 'Oct', bookings: 1700 },
    { name: 'Nov', bookings: 1400 },
    { name: 'Dec', bookings: 1100 },
  ];

  const demoClassDistribution = [
    { name: 'Economy', value: 65 },
    { name: 'Premium Economy', value: 15 },
    { name: 'Business', value: 15 },
    { name: 'First Class', value: 5 }
  ];

  const COLORS = ['#00f0ff', '#00c8ff', '#0095ff', '#0062ff'];

  const calculateNewAverage = (currentAvg, currentCount, newScore) => {
    if (!currentAvg) return newScore;
    const total = currentAvg * currentCount + newScore;
    return total / (currentCount + 1);
  };

  const handleReviewSubmitted = useCallback((newReview) => {
    if (editingReview) {
      setReviews(prev => prev.map(review => 
        review.id === newReview.id ? newReview : review
      ));

      const newAvg = reviews.reduce((sum, review) => 
        sum + (review.id === newReview.id ? newReview.attributes.score : review.attributes.score), 
        0
      ) / reviews.length;

      setAirline(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          avg_score: parseFloat(newAvg.toFixed(1))
        }
      }));
    } else {
      setReviews(prev => [newReview, ...prev]);
      setAirline(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          reviews_count: (prev.attributes.reviews_count || 0) + 1,
          avg_score: calculateNewAverage(prev.attributes.avg_score, prev.attributes.reviews_count, newReview.attributes.score)
        }
      }));
    }
    setShowReviewForm(false);
    setEditingReview(null);
  }, [editingReview, reviews]);

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await axios.delete(`/api/v1/reviews/${reviewId}`);
      const remainingReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(remainingReviews);
      
      if (remainingReviews.length > 0) {
        const newAvg = remainingReviews.reduce((sum, review) => sum + review.attributes.score, 0) / remainingReviews.length;
        setAirline(prev => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            reviews_count: remainingReviews.length,
            avg_score: parseFloat(newAvg.toFixed(1))
          }
        }));
      } else {
        setAirline(prev => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            reviews_count: 0,
            avg_score: 0
          }
        }));
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a1a] z-50">
      <div className="w-16 h-16 border-4 border-[#00f0ff] border-t-transparent rounded-full animate-spin"></div>
      <div className="mt-4 text-[#00f0ff] font-['Orbitron'] tracking-wider uppercase">INITIALIZING NEURAL SCAN...</div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a1a] z-50 p-4 text-center">
      <div className="text-4xl text-[#ff5050] mb-4">⚠️</div>
      <h2 className="font-['Orbitron'] text-xl text-[#f0f4ff] mb-2 tracking-wider">CONNECTION ERROR</h2>
      <p className="font-['Rajdhani'] text-[#f0f4ff]/80 tracking-wider mb-6">FAILED TO RETRIEVE AIRLINE DATA: {error.message}</p>
      <button 
        className="px-6 py-3 bg-[#00f0ff] text-[#0a0a1a] rounded-lg font-['Orbitron'] font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
        onClick={fetchAirline}
      >
        RETRY CONNECTION
      </button>
    </div>
  );

  if (!airline) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a1a] z-50 p-4 text-center">
      <div className="text-4xl text-[#ff5050] mb-4">❌</div>
      <h2 className="font-['Orbitron'] text-xl text-[#f0f4ff] mb-2 tracking-wider">NO AIRLINE FOUND</h2>
      <p className="font-['Rajdhani'] text-[#f0f4ff]/80 tracking-wider mb-6">THE REQUESTED NEURAL PATTERN DOESN'T EXIST IN OUR DATABASE</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-[#00f0ff] text-[#0a0a1a] rounded-lg font-['Orbitron'] font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
      >
        RETURN TO DASHBOARD
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-[#f0f4ff]">
      {/* Header Section */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: `url(${airline.attributes.image_url})` }}
          aria-hidden="true"
        />
        <div className="relative z-10 pt-16 pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-[rgba(0,240,255,0.1)] border-2 border-[#00f0ff] flex items-center justify-center text-3xl font-['Orbitron'] font-bold text-[#00f0ff] tracking-wider">
              {airline.attributes.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="font-['Orbitron'] text-4xl font-bold tracking-wider uppercase">
                <span className="text-[#00f0ff]">{airline.attributes.name}</span>
              </h1>
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2 font-['Rajdhani'] tracking-wider">
                  <span className="text-[#00f0ff]">⭐</span>
                  <span>{airline.attributes.avg_score?.toFixed(1) || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 font-['Rajdhani'] tracking-wider">
                  <span className="text-[#00f0ff]">🧠</span>
                  <span>{airline.attributes.reviews_count} REVIEWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[#00f0ff]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex">
          <button
            className={`px-6 py-4 font-['Orbitron'] tracking-wider ${activeTab === 'overview' ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]' : 'text-[#f0f4ff]/50 hover:text-[#f0f4ff]'}`}
            onClick={() => setActiveTab('overview')}
          >
            📡 OVERVIEW
          </button>
          <button
            className={`px-6 py-4 font-['Orbitron'] tracking-wider ${activeTab === 'reviews' ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]' : 'text-[#f0f4ff]/50 hover:text-[#f0f4ff]'}`}
            onClick={() => setActiveTab('reviews')}
          >
            🧠 REVIEWS
          </button>
          <button
            className={`px-6 py-4 font-['Orbitron'] tracking-wider ${activeTab === 'analytics' ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]' : 'text-[#f0f4ff]/50 hover:text-[#f0f4ff]'}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 BOOKING ANALYTICS
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden border border-[#00f0ff]/20">
              <img 
                src={airline.attributes.image_url} 
                alt={airline.attributes.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,26,0.8)] via-transparent to-transparent"></div>
            </div>

            <div className="space-y-6">
              <h2 className="font-['Orbitron'] text-2xl text-[#00f0ff] tracking-wider uppercase">✈️ FLIGHT PROFILE</h2>
              <div className="space-y-4 font-['Rajdhani'] tracking-wider">
                <p><span className="text-[#00f0ff] font-medium">DESCRIPTION:</span> {airline.attributes.description}</p>
                <p><span className="text-[#00f0ff] font-medium">COUNTRY:</span> {airline.attributes.country}</p>
                <p><span className="text-[#00f0ff] font-medium">HEADQUARTERS:</span> {airline.attributes.headquarters}</p>
                <p><span className="text-[#00f0ff] font-medium">ESTABLISHED:</span> {airline.attributes.established_year}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="font-['Orbitron'] text-2xl text-[#00f0ff] tracking-wider uppercase mb-8">OPEN FLIGHTS FEEDBACK NETWORK</h3>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="bg-[rgba(16,24,39,0.5)] border border-[#00f0ff]/10 rounded-xl p-6 hover:border-[#00f0ff]/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-['Orbitron'] text-xl tracking-wider">{review.attributes.title}</h4>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditReview(review)}
                          className="px-3 py-1 bg-transparent border border-[#00f0ff]/50 text-[#00f0ff] rounded-lg font-['Rajdhani'] tracking-wider text-sm hover:bg-[rgba(0,240,255,0.1)] transition-colors"
                        >
                          ✏️ EDIT
                        </button>
                        <button 
                          onClick={() => handleDeleteReview(review.id)}
                          className="px-3 py-1 bg-transparent border border-[#ff5050]/50 text-[#ff5050] rounded-lg font-['Rajdhani'] tracking-wider text-sm hover:bg-[rgba(255,80,80,0.1)] transition-colors"
                        >
                          🗑️ DELETE
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4 font-['Rajdhani'] tracking-wider">
                      <span className="text-[#00f0ff]">⭐</span>
                      <span>{review.attributes.score}</span>
                    </div>
                    <p className="font-['Rajdhani'] tracking-wider text-[#f0f4ff]/80">{review.attributes.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl text-[#00f0ff]/50 mb-4">🧠</div>
                <p className="font-['Rajdhani'] tracking-wider text-[#f0f4ff]/80">NO NEURAL PATTERNS DETECTED</p>
              </div>
            )}
            <button
              onClick={() => {
                setEditingReview(null);
                setShowReviewForm(true);
              }}
              className="mt-8 px-6 py-3 bg-[#00f0ff] text-[#0a0a1a] rounded-lg font-['Orbitron'] font-bold tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all animate-pulse"
            >
              UPLOAD EXPERIENCE ↑
            </button>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-12">
            <div>
              <h3 className="font-['Orbitron'] text-2xl text-[#00f0ff] tracking-wider uppercase mb-6">📈 MONTHLY BOOKINGS</h3>
              <div className="bg-[rgba(16,24,39,0.5)] border border-[#00f0ff]/10 rounded-xl p-6 h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bookingStats.monthly_bookings.length > 0 ? bookingStats.monthly_bookings : demoBookingData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#00f0ff/20" />
                    <XAxis dataKey="name" stroke="#00f0ff" />
                    <YAxis stroke="#00f0ff" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#0a0a1a',
                        borderColor: '#00f0ff',
                        color: '#f0f4ff'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="bookings" fill="#00f0ff" name="Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-['Orbitron'] text-2xl text-[#00f0ff] tracking-wider uppercase mb-6">🥧 CABIN CLASS DISTRIBUTION</h3>
                <div className="bg-[rgba(16,24,39,0.5)] border border-[#00f0ff]/10 rounded-xl p-6 h-96 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookingStats.cabin_distribution.length > 0 ? bookingStats.cabin_distribution : demoClassDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {bookingStats.cabin_distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#0a0a1a',
                          borderColor: '#00f0ff',
                          color: '#f0f4ff'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="font-['Orbitron'] text-2xl text-[#00f0ff] tracking-wider uppercase mb-6">📊 BOOKING STATISTICS</h3>
                <div className="bg-[rgba(16,24,39,0.5)] border border-[#00f0ff]/10 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[#00f0ff]/10">
                    <span className="font-['Rajdhani'] tracking-wider">Total Bookings</span>
                    <span className="font-['Orbitron'] text-[#00f0ff]">
                      {bookingStats.total_bookings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#00f0ff]/10">
                    <span className="font-['Rajdhani'] tracking-wider">Most Popular Cabin</span>
                    <span className="font-['Orbitron'] text-[#00f0ff]">
                      {bookingStats.cabin_distribution.length > 0 
                        ? bookingStats.cabin_distribution.reduce((a, b) => a.value > b.value ? a : b).name
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-['Rajdhani'] tracking-wider">Peak Booking Month</span>
                    <span className="font-['Orbitron'] text-[#00f0ff]">
                      {bookingStats.monthly_bookings.length > 0 
                        ? bookingStats.monthly_bookings.reduce((a, b) => a.bookings > b.bookings ? a : b).name
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-40 bg-[rgba(10,10,26,0.8)] backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[rgba(16,24,39,0.9)] border border-[#00f0ff]/20 rounded-xl shadow-2xl shadow-[#00f0ff]/10 w-full max-w-2xl p-8 relative">
            <button 
              className="absolute top-4 right-4 text-[#00f0ff] text-2xl hover:text-[#00f0ff]/80 transition-colors"
              onClick={() => {
                setShowReviewForm(false);
                setEditingReview(null);
              }}
            >
              ×
            </button>
            <ReviewForm 
              airlineId={airline.id} 
              review={editingReview}
              onReviewSubmitted={handleReviewSubmitted} 
              onCancel={() => {
                setShowReviewForm(false);
                setEditingReview(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-[#00f0ff]/10 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/airlines" 
            className="font-['Rajdhani'] text-[#00f0ff] tracking-wider hover:text-[#00f0ff]/80 transition-colors"
          >
            ← RETURN TO AIRLINES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Airline;
