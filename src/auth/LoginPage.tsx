import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { loginApi } from "./authService";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "EMPLOYEE") {
      navigate("/employee/dashboard");
    } else if (user?.role === "USER") {
      navigate("/user/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault(); // Prevent refresh if wrapped in form
    
    if (!username || !password) {
      toast.warn("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      const res = await loginApi(username, password);
      login(res);
      toast.success(`Welcome back, ${res.fullName || username}!`);
      
      if (res.role === "EMPLOYEE") navigate("/employee/dashboard");
      else if (res.role === "USER") navigate("/user/dashboard");
      
    } catch (err) {
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="bg-blue-600 md:w-1/2 p-12 text-white flex flex-col justify-center relative">
          <div className="relative z-10">
            <h1 className="text-5xl font-black mb-6 tracking-tighter">KG</h1>
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Log in to manage your attendance, track your hours, and stay connected with your team.
            </p>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12"></div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="p-12 md:w-1/2 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
            <p className="text-gray-500 mb-8">Enter your credentials to continue</p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* USERNAME */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  placeholder="e.g. amit_sharma"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-3.5 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-right mt-2">
                    <span 
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs text-blue-600 hover:underline cursor-pointer font-medium">Forgot Password?</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:bg-gray-400 flex justify-center items-center"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     Logging in...
                  </span>
                ) : "Login to Dashboard"}
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account yet?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 cursor-pointer font-bold hover:underline"
              >
                Register Now
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
