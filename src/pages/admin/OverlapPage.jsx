import { useState } from "react";
import API from "../../api/api";

export default function OverlapPage() {
  const [userId, setUserId] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const getOverlap = async () => {
    try {
      const res = await API.get(
        `/availability/overlap?userId=${userId}&mentorId=${mentorId}`
      );
      setSlots(res.data.data);
      setSelectedSlot(null); // reset selection
    } catch (err) {
      console.error(err);
      alert("Error fetching overlap");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Check Overlap</h2>

      {/* USER ID */}
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br /><br />

      {/* MENTOR ID */}
      <input
        placeholder="Mentor ID"
        value={mentorId}
        onChange={(e) => setMentorId(e.target.value)}
      />
      <br /><br />

      <button onClick={getOverlap}>Check Overlap</button>

      {/* SLOTS */}
      <h3>Available Slots</h3>

      {slots.length === 0 && <p>No slots found</p>}

      {slots.map((slot, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <button
            onClick={() => setSelectedSlot(slot)}
            style={{
              padding: "10px",
              border: "1px solid black",
              cursor: "pointer",
              width: "300px"
            }}
          >
            {new Date(slot.startTime).toLocaleString()} →
            {new Date(slot.endTime).toLocaleString()}
          </button>
        </div>
      ))}

      {/* BOOK SECTION */}
      {selectedSlot && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "2px solid green"
          }}
        >
          <h3>Book Meeting</h3>

          <p>
            <b>Start:</b>{" "}
            {new Date(selectedSlot.startTime).toLocaleString()}
          </p>

          <p>
            <b>End:</b>{" "}
            {new Date(selectedSlot.endTime).toLocaleString()}
          </p>

          <button
            onClick={async () => {
              try {
                await API.post("/meetings", {
                  title: "Mentor Session",
                  startTime: selectedSlot.startTime,
                  endTime: selectedSlot.endTime,
                  meetLink: "https://meet.google.com/sample",
                  participants: [
                    "user@gmail.com",
                    "mentor@gmail.com"
                  ],
                });

                alert("Meeting booked ✅");
              } catch (err) {
                console.error(err);
                alert("Booking failed");
              }
            }}
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}