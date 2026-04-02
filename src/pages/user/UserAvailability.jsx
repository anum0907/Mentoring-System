// import { useState } from "react";
// import axios from "axios";

// export default function UserAvailability() {
//   const [date, setDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const handleSubmit = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/availability", {
//         date,
//         startTime,
//         endTime,
//       });

//       alert("Availability added ✅");

//       setDate("");
//       setStartTime("");
//       setEndTime("");
//     } catch (err) {
//       console.error(err);
//       alert("Error adding availability");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>User Availability</h1>

//       <div style={{ marginBottom: "10px" }}>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <input
//           type="time"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//         />
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <input
//           type="time"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//         />
//       </div>

//       <button onClick={handleSubmit}>Add Availability</button>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";

export default function UserAvailability() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/availability",
        {
          date,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Availability added ✅");

      setDate("");
      setStartTime("");
      setEndTime("");

    } catch (err) {
      console.error(err);
      alert("Error adding availability (401 fix applied)");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>User Availability</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br /><br />

      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br /><br />

      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Add Availability</button>
    </div>
  );
}