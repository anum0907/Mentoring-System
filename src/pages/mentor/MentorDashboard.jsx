import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function MentorDashboard() {
  const [mentor, setMentor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => {
        setMentor(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mentor Dashboard</h2>

      {!mentor ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p><strong>Name:</strong> {mentor.name}</p>
          <p><strong>Email:</strong> {mentor.email}</p>
          <p><strong>Role:</strong> {mentor.role}</p>

          {/* ✅ ADD THIS BUTTON */}
          <br />
          <button onClick={() => navigate("/mentor/availability")}>
            Add Availability
          </button>
        </div>
      )}
    </div>
  );
}