import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
    topbar: ReactNode;
    children: ReactNode;
};

const DashboardLayout = ({ topbar, children }: Props) => {
    return (
        <>
            <Sidebar />
            {topbar}
            <main className="ml-64 pt-20 p-8 bg-slate-50 min-h-screen">
                {children}
            </main>
        </>
    );
};

export default DashboardLayout;