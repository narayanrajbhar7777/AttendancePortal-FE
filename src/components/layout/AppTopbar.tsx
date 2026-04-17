import { useAuth } from "../../auth/AuthContext";

type Props = {
    employeeName: string;
    employeeRole: string
};

const AppTopbar = ({ employeeName, employeeRole }: Props) => {
    const { logout } = useAuth();

    return (
        <header className="ml-64 h-20 fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-30 flex items-center justify-between px-8">
            {/* SEARCH BAR */}
            <input
                className="w-full max-w-md rounded-full bg-slate-100 px-4 py-2 text-sm outline-none"
                placeholder="Search attendance..."
            />

            {/* USER INFO & LOGOUT SECTION */}
            <div className="flex flex-col items-end gap-1">
                <div className="text-right">
                    <p className="text-sm font-bold text-slate-800 leading-tight">
                        {employeeName}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        {employeeRole}
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AppTopbar;
