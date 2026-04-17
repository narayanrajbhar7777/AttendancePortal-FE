import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  
  // Normalize role to handle any case sensitivity from backend
  const role = user?.role?.toUpperCase();

  // Standard class for links
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? "bg-blue-600 text-white shadow-md" 
        : "text-slate-600 hover:bg-blue-100"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-blue-50 border-r border-slate-200 p-4 z-40">
      
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-black text-blue-900 tracking-tighter">KG</h1>
      </div>

      <nav className="space-y-2">
        
        {/* ✅ SHOW IF ROLE IS EMPLOYEE */}
        {role === "EMPLOYEE" && (
          <NavLink to="/employee/dashboard" className={linkClass}>
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">Employee Dashboard</span>
          </NavLink>
        )}

        {/* ✅ SHOW IF ROLE IS USER (Admin/Manager) */}
        {role === "USER" && (
          <>
            <NavLink to="/user/dashboard" className={linkClass}>
              <span className="material-symbols-outlined">groups</span>
              <span className="font-medium">User Dashboard</span>
            </NavLink>

            <NavLink to="/user/attendance" className={linkClass}>
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="font-medium">Attendance Management</span>
            </NavLink>
          </>
        )}

      </nav>
    </aside>
  );
};

export default Sidebar;
