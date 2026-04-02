// // import { useState } from "react";
// // import { useAuth } from "../../context/AuthContext";
// // import { useNavigate } from "react-router-dom";
// // import API from "../../api/api";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await API.post("/auth/login", {
// //         email,
// //         password,
// //       });

// //       const { token, user } = res.data;

// //       login(user, token);

// //       // role-based redirect
// //       if (user.role === "admin") navigate("/admin");
// //       else if (user.role === "mentor") navigate("/mentor");
// //       else navigate("/user");

// //     } catch (err) {
// //       alert("Login failed");
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>

// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="email"
// //           placeholder="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />

// //         <input
// //           type="password"
// //           placeholder="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />

// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // }





// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/api";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/auth/login", {
//         email,
//         password,
//       });

//       console.log("API Response:", res.data);

//       const { token, user } = res.data;

//       // ✅ FIXED
//       login({ user, token });

//       const role = user.role.toLowerCase();

//       if (role === "admin") navigate("/admin");
//       else if (role === "mentor") navigate("/mentor");
//       else navigate("/user");

//     } catch (err) {
//       console.log(err.response?.data);
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }





import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      login(user, token);

      // ✅ role-based redirect
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "mentor") navigate("/mentor");
      else navigate("/user");

    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}