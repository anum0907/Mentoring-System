// // // import { createContext, useContext, useState } from "react";

// // // const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);

// // //   const login = (data) => {
// // //     localStorage.setItem("token", data.token);
// // //     localStorage.setItem("user", JSON.stringify(data.user));
// // //     setUser(data.user);
// // //   };

// // //   const logout = () => {
// // //     localStorage.clear();
// // //     setUser(null);
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, login, logout }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // // ✅ IMPORTANT LINE (this is missing in your code)
// // // export const useAuth = () => useContext(AuthContext);







// // import { createContext, useContext, useState } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(
// //     JSON.parse(localStorage.getItem("user")) || null
// //   );

// //   const login = ({ user, token }) => {
// //     localStorage.setItem("token", token);
// //     localStorage.setItem("user", JSON.stringify(user));
// //     setUser(user);
// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);







// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//   // ✅ Safe function to get user from localStorage
//   const getStoredUser = () => {
//     try {
//       const storedUser = localStorage.getItem("user");

//       if (!storedUser || storedUser === "undefined") {
//         return null;
//       }

//       return JSON.parse(storedUser);
//     } catch (error) {
//       return null;
//     }
//   };

//   const [user, setUser] = useState(getStoredUser());

//   // ✅ FIXED login
//   const login = ({ user, token }) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);









import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch {
      return null;
    }
  });

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);