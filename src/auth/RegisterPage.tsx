import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "", // New field for validation
    mobileNo: "",
    role: "EMPLOYEE",
    firstName: "",
    lastName: "",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Basic Empty Check
    if (!form.username || !form.password || !form.firstName || !form.mobileNo) {
      toast.error("Please fill in all required fields");
      return;
    }

    // 2. 🔥 Password Match Validation
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Create a copy of the data without 'confirmPassword' to send to backend
      const { confirmPassword, ...submitData } = form;

      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) throw new Error("Registration failed");

      toast.success("Account Created Successfully! ✅");
      navigate("/"); 
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
     <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
    
        
        {/* LEFT SIDE - DECORATIVE */}
        <div className="bg-blue-600 md:w-1/3 p-8 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Join KG</h2>
          <p className="text-blue-100 text-sm">Secure your account with a strong password.</p>
        </div>

        {/* RIGHT SIDE - FORM */}
        <form onSubmit={handleRegister} className="p-8 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">First Name</label>
              <input type="text" name="firstName" required className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Last Name</label>
              <input type="text" name="lastName" className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Username</label>
              <input type="text" name="username" required className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Mobile Number</label>
              <input type="text" name="mobileNo" required className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
              <input type="text" name="department" className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Role</label>
              <select name="role" className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" onChange={handleChange}>
                <option value="EMPLOYEE">Employee</option>
                <option value="USER">Manager / User</option>
              </select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Password</label>
              <input type="password" name="password" required className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleChange} />
            </div>

            {/* 🔥 CONFIRM PASSWORD */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                required 
                className={`w-full mt-1 p-2.5 border rounded-lg focus:ring-2 outline-none transition-all ${
                    form.confirmPassword && form.password !== form.confirmPassword 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-200 focus:ring-blue-500"
                }`} 
                onChange={handleChange} 
              />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-[10px] text-red-500 mt-1 font-bold">Passwords do not match</p>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>

          <p className="text-sm mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <span className="text-blue-600 font-bold cursor-pointer hover:underline" onClick={() => navigate("/")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
