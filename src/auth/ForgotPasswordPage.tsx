import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    identifier: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identifier) {
      toast.warn("Please enter your Username or Mobile");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/forgot-password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.identifier }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "User not found");
      }

      toast.success("OTP sent to your registered mobile!");
      setStep(2);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          otp: form.otp,
          newPassword: form.newPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Reset failed");
      }

      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      toast.error(err.message || "Invalid OTP or session expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* LEFT SIDE - BRANDING */}
        <div className="bg-blue-600 md:w-1/2 p-12 text-white flex flex-col justify-center relative">
          <div className="relative z-10">
            <h1 className="text-5xl font-black mb-6 tracking-tighter">KG</h1>
            <h2 className="text-3xl font-bold mb-4">Account Recovery</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Verify your identity to choose a new password and regain access to your dashboard.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        </div>

        {/* RIGHT SIDE - DYNAMIC FORMS */}
        <div className="p-12 md:w-1/2 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h2>
            <p className="text-gray-500 mb-8">
              {step === 1 
                ? "Enter your identifier to receive an OTP." 
                : "Enter the OTP sent to your phone and set a new password."}
            </p>

            {step === 1 ? (
              /* FORM STEP 1 */
              <form onSubmit={handleRequestOtp} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Username / Mobile</label>
                  <input
                    type="text"
                    name="identifier"
                    required
                    className="w-full mt-1 p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. 9876543210"
                    value={form.identifier}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:bg-gray-400"
                >
                  {loading ? "Processing..." : "Send Recovery Code"}
                </button>
              </form>
            ) : (
              /* FORM STEP 2 */
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">6-Digit OTP</label>
                  <input
                    type="text"
                    name="otp"
                    required
                    maxLength={6}
                    className="w-full mt-1 p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="123456"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    required
                    className="w-full mt-1 p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full mt-1 p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-100"
                >
                  {loading ? "Resetting..." : "Update Password"}
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <p
                onClick={() => (step === 2 ? setStep(1) : navigate("/"))}
                className="text-sm text-blue-600 cursor-pointer font-bold hover:underline"
              >
                {step === 2 ? "← Back to identifier" : "← Back to Login"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
