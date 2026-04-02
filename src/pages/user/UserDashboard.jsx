import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>

      {!user ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>

          {/* ✅ ADD THIS BUTTON */}
          <br />
          <button onClick={() => navigate("/user/availability")}>
            Add Availability
          </button>
        </div>
      )}
    </div>
  );
}