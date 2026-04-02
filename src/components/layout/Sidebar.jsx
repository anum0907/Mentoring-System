import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-slate-900 p-4">
      <h2 className="text-white mb-4">Admin</h2>

      <nav className="space-y-2">
        <Link to="/admin" className="block text-slate-300">
          Dashboard
        </Link>
        <Link to="/admin/users" className="block text-slate-300">
          Users
        </Link>
        <Link to="/admin/mentors" className="block text-slate-300">
          Mentors
        </Link>
        <Link to="/admin/bookings" className="block text-slate-300">
          Bookings
        </Link>
      </nav>
    </div>
  );
}