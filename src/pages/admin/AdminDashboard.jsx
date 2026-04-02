import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [recommendedMentors, setRecommendedMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [overlaps, setOverlaps] = useState([]);
  const [callType, setCallType] = useState("");

  const [allAvailability, setAllAvailability] = useState([]);
  const [filterRole, setFilterRole] = useState("ALL");

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get(
          "http://localhost:5000/api/admin/users",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const mentorsRes = await axios.get(
          "http://localhost:5000/api/admin/mentors",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const availabilityRes = await axios.get(
          "http://localhost:5000/api/availability/all",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUsers(usersRes.data.data || []);
        setMentors(mentorsRes.data.data || []);
        setAllAvailability(availabilityRes.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // ================= RECOMMEND =================
  const handleUserSelect = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);

    if (!user) return;

    const scored = mentors.map((mentor) => {
      let score = 1;

      const desc = (mentor.description || "").toLowerCase();
      const userDesc = (user.description || "").toLowerCase();

      if (callType === "resume") {
        if (desc.includes("developer") || desc.includes("engineer"))
          score += 5;
      }

      if (callType === "guidance") {
        if (desc.includes("coach") || desc.includes("communication"))
          score += 5;
      }

      if (callType === "mock") {
        if (desc.includes("frontend") && userDesc.includes("frontend"))
          score += 5;

        if (desc.includes("backend") && userDesc.includes("backend"))
          score += 5;

        if (desc.includes("full stack")) score += 3;
      }

      return { ...mentor, score };
    });

    const sorted = scored.sort((a, b) => b.score - a.score);

    setRecommendedMentors(sorted);
    setSelectedMentor(null);
    setOverlaps([]);
  };

  // ================= CHECK AVAILABILITY =================
  const checkAvailability = async () => {
    if (!selectedUser || !selectedMentor) {
      alert("Select user & mentor");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/availability/overlap?userId=${selectedUser.id}&mentorId=${selectedMentor.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOverlaps(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= BOOK =================
  

  // ================= FILTER (ONLY FUTURE / CURRENT) =================
  const now = new Date();

const filteredAvailability =
  (filterRole === "ALL"
    ? allAvailability
    : allAvailability.filter(
        (a) =>
          a.user?.role === filterRole ||
          a.mentor?.role === filterRole
      )
  ).filter((a) => new Date(a.endTime) > now);

    const bookMeeting = async (slot) => {
  if (!selectedUser || !selectedMentor) {
    alert("Select user & mentor");
    return;
  }

  if (!selectedUser.email || !selectedMentor.email) {
    alert("Email missing");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/meetings",
      {
        title: "Mentoring Session",
        startTime: slot.startTime,
        endTime: slot.endTime,
        participants: [
          selectedUser.email,
          selectedMentor.email,
        ],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("✅ Meeting Booked");
  } catch (err) {
    console.error(err.response?.data);
    alert(err.response?.data?.message || "Booking failed");
  }
};
  // ================= UI =================
  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>Admin Dashboard</h1>

      {/* CALL TYPE */}
      <h3>Select Call Type</h3>
      <select
        onChange={(e) => setCallType(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      >
        <option value="">Select Call Type</option>
        <option value="resume">Resume Revamp</option>
        <option value="guidance">Job Market Guidance</option>
        <option value="mock">Mock Interview</option>
      </select>

      {/* USER */}
      <h3>Select User</h3>
      <select
        onChange={(e) => handleUserSelect(e.target.value)}
        style={{ padding: "8px", width: "100%" }}
      >
        <option>Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* MENTORS */}
      <h3 style={{ marginTop: "20px" }}>Recommended Mentors</h3>

      {recommendedMentors.length === 0 ? (
        <p>No mentors found</p>
      ) : (
        recommendedMentors.map((m, index) => (
          <div
            key={m.id}
            onClick={() => setSelectedMentor(m)}
            style={{
              border:
                selectedMentor?.id === m.id
                  ? "2px solid green"
                  : "1px solid #ccc",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              background: index === 0 ? "#f0fff0" : "white",
            }}
          >
            <strong>{m.name}</strong>
            {index === 0 && (
              <span style={{ color: "green", marginLeft: "10px" }}>
                ⭐ Best Match
              </span>
            )}
            <p>Score: {m.score}</p>
            <p style={{ fontSize: "12px", color: "#666" }}>
              {m.description}
            </p>
          </div>
        ))
      )}

      {/* CHECK */}
      <button
        onClick={checkAvailability}
        style={{
          marginTop: "10px",
          padding: "10px",
          width: "100%",
          background: "black",
          color: "white",
        }}
      >
        Check Availability
      </button>

      {/* SLOTS */}
      <h3 style={{ marginTop: "20px" }}>Available Slots</h3>

      {overlaps.length === 0 ? (
        <p>No slots found</p>
      ) : (
        overlaps.map((slot, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <p>
              {new Date(slot.startTime).toLocaleString()} →{" "}
              {new Date(slot.endTime).toLocaleString()}
            </p>
            <button onClick={() => bookMeeting(slot)}>Book Slot</button>
          </div>
        ))
      )}

      {/* ================= WHO IS AVAILABLE ================= */}

      <h2 style={{ marginTop: "40px" }}>Who is Available</h2>

      <select
        onChange={(e) => setFilterRole(e.target.value)}
        style={{ marginBottom: "10px", padding: "6px" }}
      >
        <option value="ALL">All</option>
        <option value="USER">Users</option>
        <option value="MENTOR">Mentors</option>
      </select>

      {filteredAvailability.length === 0 ? (
        <p>No one is available right now</p>
      ) : (
        filteredAvailability.map((a, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              background:
                a.user?.role === "MENTOR" ? "#e6f7ff" : "#fff7e6",
            }}
          >
            <strong>
  {a.user?.name || a.mentor?.name} (
  {a.user?.role || a.mentor?.role})
</strong>

            <p style={{ color: "green", fontWeight: "bold" }}>
              ✅ Available Now
            </p>

            <p>
              {new Date(a.startTime).toLocaleString()} →{" "}
              {new Date(a.endTime).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

