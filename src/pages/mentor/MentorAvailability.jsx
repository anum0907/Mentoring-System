// import { useState } from "react";
// import axios from "axios";

// export default function MentorAvailability() {
//   const [date, setDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const token = localStorage.getItem("token");

//   const handleSubmit = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/availability",
//         {
//           date,
//           startTime,
//           endTime,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Availability added");
//       setDate("");
//       setStartTime("");
//       setEndTime("");
//     } catch (err) {
//       console.error(err);
//       alert("Error adding availability");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Mentor Availability</h2>

//       <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       <br /><br />

//       <input
//         type="datetime-local"
//         value={startTime}
//         onChange={(e) => setStartTime(e.target.value)}
//       />
//       <br /><br />

//       <input
//         type="datetime-local"
//         value={endTime}
//         onChange={(e) => setEndTime(e.target.value)}
//       />
//       <br /><br />

//       <button onClick={handleSubmit}>Add Availability</button>
//     </div>
//   );
// }


// import { useState } from "react";
// import API from "../../api/api";

// export default function MentorAvailability() {
//   const [date, setDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         date,
//         startTime: new Date(startTime).toISOString(),
//         endTime: new Date(endTime).toISOString(),
//       };

//       await API.post("/availability", payload);

//       alert("Availability added ✅");

//       setDate("");
//       setStartTime("");
//       setEndTime("");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Mentor Availability</h2>

//       <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       <br /><br />

//       <input
//         type="datetime-local"
//         value={startTime}
//         onChange={(e) => setStartTime(e.target.value)}
//       />
//       <br /><br />

//       <input
//         type="datetime-local"
//         value={endTime}
//         onChange={(e) => setEndTime(e.target.value)}
//       />
//       <br /><br />

//       <button onClick={handleSubmit}>Add Availability</button>
//     </div>
//   );
// }




import { useState } from "react";
import API from "../../api/api";

export default function MentorAvailability() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        date,
        startTime,
        endTime,
      };

      await API.post("/availability", payload);

      alert("Availability added ✅");

      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding availability");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mentor Availability</h2>

      {/* DATE */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br /><br />

      {/* START TIME */}
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br /><br />

      {/* END TIME */}
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