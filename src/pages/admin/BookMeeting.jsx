import { useState, useEffect } from "react";
import API from "../../api/api";

export default function BookMeeting({ selectedStartTime, selectedEndTime }) {
  const [title, setTitle] = useState("Mentor Session");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");

  useEffect(() => {
    if (selectedStartTime && selectedEndTime) {
      setStartTime(selectedStartTime);
      setEndTime(selectedEndTime);
    }
  }, [selectedStartTime, selectedEndTime]);

  const bookMeeting = async () => {
    try {
      const payload = {
        title,
        startTime,
        endTime,
        meetLink: "https://meet.google.com/sample",
        participants: [userEmail, mentorEmail],
      };

      await API.post("/meetings", payload);

      alert("Meeting booked ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Book Meeting</h3>

      <input
        placeholder="User Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Mentor Email"
        value={mentorEmail}
        onChange={(e) => setMentorEmail(e.target.value)}
      />
      <br /><br />

      <p><b>Start:</b> {new Date(startTime).toLocaleString()}</p>
      <p><b>End:</b> {new Date(endTime).toLocaleString()}</p>

      <button onClick={bookMeeting}>Confirm Booking</button>
    </div>
  );
}