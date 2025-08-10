import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    const payload = {
      user: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role: formData.role,
      },
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || '',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        navigate('/login');
      } else {
        setErrors(
          data.errors
            ? Array.isArray(data.errors)
              ? { general: data.errors.join(', ') }
              : data.errors
            : { general: 'Signup failed. Please try again.' }
        );
      }
    } catch (error) {
      setErrors({ general: error.message || 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a1a] p-4 relative overflow-hidden">
      {/* Flight deck background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.1)_0,_transparent_70%)]"></div>
      </div>

      {/* Radar lines */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="absolute inset-0 rounded-full border border-[rgba(0,240,255,0.05)] animate-[radarPulse_6s_linear_infinite]"></div>
        <div className="absolute inset-0 rounded-full border border-[rgba(0,240,255,0.05)] animate-[radarPulse_6s_linear_infinite_2s]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[rgba(16,24,39,0.8)] backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl shadow-[#00f0ff]/10 border border-[#00f0ff]/20">
          {/* Flight panel header */}
          <div className="px-8 py-6 border-b border-[#00f0ff]/10 bg-[rgba(0,240,255,0.05)]">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#00f0ff] mr-2 animate-pulse"></div>
                <h2 className="font-['Orbitron'] text-xl font-bold text-[#00f0ff] tracking-wider uppercase">
                  Crew Registration
                </h2>
              </div>
              <div className="text-xs text-[#00f0ff]/70 tracking-wider">NEW MEMBER ACCESS</div>
            </div>
          </div>

          <div className="p-8">
            <p className="text-center text-[#00f0ff]/80 mb-8 font-['Rajdhani'] tracking-wider">
              JOIN THE SKYMETRICS FLIGHT CONTROL SYSTEM
            </p>

            {errors.general && (
              <div className="mb-6 px-4 py-3 rounded-lg bg-[rgba(255,80,80,0.1)] border border-[rgba(255,80,80,0.3)] text-[#ff5050] text-sm flex items-center font-['Rajdhani'] tracking-wider">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider"
                >
                  FULL NAME
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#00f0ff] opacity-80"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 bg-[rgba(0,240,255,0.05)] border ${
                      errors.name ? 'border-[#ff5050]' : 'border-[#00f0ff]/30'
                    } rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-[#ff5050] font-['Rajdhani'] tracking-wider">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider"
                >
                  PILOT ID / EMAIL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#00f0ff] opacity-80"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-4 py-3 bg-[rgba(0,240,255,0.05)] border ${
                      errors.email ? 'border-[#ff5050]' : 'border-[#00f0ff]/30'
                    } rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider`}
                    placeholder="pilot@skymetrics.ai"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-[#ff5050] font-['Rajdhani'] tracking-wider">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider"
                >
                  CLEARANCE LEVEL
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-3 bg-[rgba(0,240,255,0.05)] border border-[#00f0ff]/30 rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all appearance-none font-['Rajdhani'] tracking-wider"
                  >
                    <option value="user">STANDARD CLEARANCE</option>
                    <option value="admin">ADMINISTRATOR</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#00f0ff] opacity-80"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider"
                >
                  ACCESS CODE
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#00f0ff] opacity-80"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-12 py-3 bg-[rgba(0,240,255,0.05)] border ${
                      errors.password ? 'border-[#ff5050]' : 'border-[#00f0ff]/30'
                    } rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-[#ff5050] font-['Rajdhani'] tracking-wider">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#00f0ff] mb-2 font-['Rajdhani'] tracking-wider"
                >
                  CONFIRM ACCESS CODE
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#00f0ff] opacity-80"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-12 py-3 bg-[rgba(0,240,255,0.05)] border ${
                      errors.confirmPassword ? 'border-[#ff5050]' : 'border-[#00f0ff]/30'
                    } rounded-lg text-[#f0f4ff] placeholder-[#00f0ff]/50 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/50 focus:border-[#00f0ff] transition-all font-['Rajdhani'] tracking-wider`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-[#ff5050] font-['Rajdhani'] tracking-wider">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-[#00f0ff] rounded-lg font-['Orbitron'] font-bold text-[#0a0a1a] hover:shadow-lg hover:shadow-[#00f0ff]/40 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex justify-center items-center tracking-wider uppercase"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0a0a1a]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      REQUESTING CLEARANCE...
                    </>
                  ) : (
                    'REGISTER CREW'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-[#00f0ff]/80 font-['Rajdhani'] tracking-wider">
              ALREADY HAVE CLEARANCE?{' '}
              <Link
                to="/login"
                className="font-medium text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors"
              >
                REQUEST ACCESS
              </Link>
            </div>
          </div>

          {/* Flight panel footer */}
          <div className="px-8 py-4 bg-[rgba(0,240,255,0.05)] border-t border-[#00f0ff]/10 text-center">
            <p className="text-xs text-[#00f0ff]/50 font-['Rajdhani'] tracking-wider">
              SKYMETRICS AI FLIGHT CONTROL SYSTEM v2.4.1
            </p>
          </div>
        </div>
      </div>

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

export default Signup;
