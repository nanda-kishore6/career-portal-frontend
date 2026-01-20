import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-slate-50 to-white">

      <Navbar />
      <main className="pt-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
