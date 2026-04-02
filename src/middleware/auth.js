// // import jwt from "jsonwebtoken";

// // const JWT_SECRET = process.env.JWT_SECRET;

// // // ✅ AUTHENTICATE MIDDLEWARE
// // export const authenticate = (req, res, next) => {
// //   try {
// //     const authHeader = req.headers.authorization;

// //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //       return res.status(401).json({ message: "No token provided" });
// //     }

// //     const token = authHeader.split(" ")[1];

// //     const decoded = jwt.verify(token, JWT_SECRET);

// //     // ✅ attach user to request
// //     req.user = decoded;

// //     next();
// //   } catch (err) {
// //     return res.status(401).json({ message: "Invalid token" });
// //   }
// // };

// // // ✅ ROLE MIDDLEWARE (your existing one - already correct)
// // export const requireRole = (role) => {
// //   return (req, res, next) => {
// //     if (req.user.role.toLowerCase() !== role.toLowerCase()) {
// //       return res.status(403).json({ message: "Forbidden" });
// //     }
// //     next();
// //   };
// // };






// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// // ✅ AUTHENTICATE USER
// export const authenticate = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // ❌ No token
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     // ✅ Extract token
//     const token = authHeader.split(" ")[1];

//     // ✅ Verify token
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // ✅ Attach user to request
//     req.user = decoded;

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // ✅ ROLE CHECK
// export const requireRole = (role) => {
//   return (req, res, next) => {
//     if (!req.user || req.user.role.toLowerCase() !== role.toLowerCase()) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     next();
//   };
// };





import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ AUTHENTICATE USER
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ FIX: attach correctly
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ ROLE CHECK
export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};