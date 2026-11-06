import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  User,
  MapPin,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Mail,
  KeyRound,
  ArrowRight,
  RotateCw,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    sendOtp,
    verifyOtp,
    loading
  } = useAuth();

  // Mode: 'login' | 'signup'
  const [mode, setMode] = useState('signup');

  // Step: 1 (Enter Info / Email) | 2 (Enter & Verify OTP)
  const [step, setStep] = useState(1);

  // Form Fields
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // UI state
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sync mode when modal opens from different places
  useEffect(() => {
    if (authModalMode === 'register' || authModalMode === 'signup') {
      setMode('signup');
    } else {
      setMode('login');
    }
    setStep(1);
    setOtp('');
    setError('');
    setSuccessMsg('');
  }, [authModalMode, isAuthModalOpen]);

  // Resend cooldown countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  if (!isAuthModalOpen) return null;

  // ==========================================
  // STEP 1: SEND OTP (SIGNUP OR LOGIN)
  // ==========================================
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        setError('Please enter a valid 10-digit mobile number for order delivery calls.');
        return;
      }
    }

    try {
      const res = await sendOtp(cleanEmail, name.trim());
      setStep(2);
      setCountdown(30);
      setSuccessMsg(res.message || `6-digit verification code sent to ${cleanEmail}`);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check the email address.');
    }
  };

  // ==========================================
  // STEP 2: VERIFY OTP & COMPLETE REGISTRATION
  // ==========================================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanOtp = otp.trim().replace(/[^0-9]/g, '');
    if (cleanOtp.length < 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }

    try {
      await verifyOtp({
        email: email.trim().toLowerCase(),
        otp: cleanOtp,
        name: name.trim(),
        phone: phone.replace(/[^0-9]/g, ''),
        address: address.trim()
      });
      // Context will automatically save user token and close modal
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP code. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-orange-100 overflow-hidden relative transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#FF5722] to-[#FF7043] p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-3 inline-flex rounded-xl border border-orange-100 bg-white p-1.5 shadow-md shadow-black/10">
            <img
              src="/foodraja-logo-v2.png"
              alt="FoodRaja by Aarika Ashok Foundation"
              className="h-[56px] w-[110px] rounded-lg bg-white object-contain"
            />
          </div>

          <h3 className="text-lg font-black leading-tight flex items-center gap-2">
            <span>
              {step === 2
                ? 'Verify Your Email'
                : mode === 'signup'
                ? 'Create Verified Account'
                : 'Welcome Back!'}
            </span>
            <ShieldCheck className="w-5 h-5 text-emerald-200" />
          </h3>
          <p className="text-xs text-orange-100 mt-1">
            {step === 2
              ? 'Enter the 6-digit OTP sent to your email to verify ownership.'
              : mode === 'signup'
              ? 'Sign up with OTP verification to ensure secure food ordering.'
              : 'Log in with one-time verification code sent to your email.'}
          </p>
        </div>

        {/* Mode Switcher Tabs (Only visible on Step 1) */}
        {step === 1 && (
          <div className="flex border-b border-gray-100 bg-orange-50/40 p-1.5 m-4 mb-2 rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mode === 'signup'
                  ? 'bg-white text-[#FF5722] shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign Up (New User)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-white text-[#FF5722] shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          </div>
        )}

        {/* Feedback Alerts */}
        <div className="px-6 pt-2">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Modal Form Body */}
        <div className="p-6 pt-2 space-y-4">
          {step === 1 ? (
            /* =================================================== */
            /* STEP 1: FORM INPUTS & REQUEST OTP                  */
            /* =================================================== */
            <form onSubmit={handleSendOtp} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Kumar"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF5722] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="your-email@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF5722] focus:bg-white transition-all"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  {mode === 'signup'
                    ? '🔒 We send an OTP to verify that this email really belongs to you.'
                    : 'We will send a 6-digit login OTP to this email.'}
                </span>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/[^0-9]/g, ''));
                          setError('');
                        }}
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF5722] focus:bg-white transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Used by FoodRaja coordinator to call & confirm kitchen availability.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Delivery Address (Optional)
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                      <textarea
                        rows={2}
                        placeholder="House/Flat No, Landmark, Area"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF5722] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl font-black text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending OTP via Resend...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === 'signup'
                        ? 'Verify Email & Send OTP'
                        : 'Send Login OTP'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                {mode === 'signup' ? (
                  <p className="text-xs text-gray-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError('');
                        setSuccessMsg('');
                      }}
                      className="font-black text-[#FF5722] hover:underline"
                    >
                      Log In here
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    New to FoodRaja?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setError('');
                        setSuccessMsg('');
                      }}
                      className="font-black text-[#FF5722] hover:underline"
                    >
                      Create an account
                    </button>
                  </p>
                )}
              </div>
            </form>
          ) : (
            /* =================================================== */
            /* STEP 2: ENTER OTP & VERIFY EMAIL                   */
            /* =================================================== */
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
              <div className="bg-orange-50/80 p-3.5 rounded-2xl border border-orange-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
                    OTP Sent To
                  </span>
                  <strong className="text-gray-900 font-extrabold text-sm">{email}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp('');
                    setError('');
                  }}
                  className="text-xs text-[#FF5722] font-black hover:underline"
                >
                  Edit Email
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2 text-center">
                  Enter 6-Digit Email Verification Code *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="• • • • • •"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/[^0-9]/g, ''));
                      setError('');
                    }}
                    className="w-full pl-9 pr-3 py-3 bg-gray-50 border-2 border-orange-200 rounded-2xl text-center text-xl font-black tracking-[0.4em] text-gray-900 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1.5 block text-center">
                  ⏱️ Code expires in 10 minutes. Please check your inbox or spam folder.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl font-black text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>
                      {mode === 'signup'
                        ? 'Confirm Email & Create Account'
                        : 'Verify & Log In'}
                    </span>
                  </>
                )}
              </button>

              {/* Resend Code with 30s Cooldown */}
              <div className="text-center pt-1">
                {countdown > 0 ? (
                  <span className="text-xs text-gray-400">
                    Resend code in <strong className="text-gray-700">{countdown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="text-xs font-bold text-[#FF5722] hover:underline inline-flex items-center gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Didn't receive code? Resend OTP</span>
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="pt-2 text-center border-t border-gray-100">
            <span className="text-[10px] text-gray-400 inline-flex items-center gap-1">
              🔒 Powered by Resend Secure Email Verification
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
