// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import { authRoutes } from "./routes/auth.js";
// import { availabilityRoutes } from "./routes/availability.js";
// import  meetingRoutes  from "./routes/meeting.js";
// import { adminRoutes } from "./routes/admin.js";
// import { errorHandler } from "./middleware/errorHandler.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ CORS (BEST VERSION FOR DEV)
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// // ✅ Middleware
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Health check
// app.get("/health", (_, res) => res.json({ ok: true }));

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/availability", availabilityRoutes);
// app.use("/api/meetings", meetingRoutes);
// app.use("/api/admin", adminRoutes);

// // ❗ OPTIONAL DEBUG ROUTE (VERY USEFUL)
// app.get("/debug-token", (req, res) => {
//   res.json({
//     message: "Check Authorization header",
//     authHeader: req.headers.authorization || "No token received",
//   });
// });

// // ✅ Error handler (ALWAYS LAST)
// app.use(errorHandler);

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });





import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRoutes } from "./routes/auth.js";
import { availabilityRoutes } from "./routes/availability.js";
import { meetingRoutes } from "./routes/meeting.js"; // ✅ FIXED
import { adminRoutes } from "./routes/admin.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});