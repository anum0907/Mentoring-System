
// import { Router } from "express";
// import {
//   addAvailability,
//   getMyAvailability,
//   getUserAvailability,
//   getMentorAvailability,
//   getOverlappingSlots,
// } from "../controllers/availabilityController.js";

// import { authenticate, requireRole } from "../middleware/auth.js";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const availabilityRoutes = Router();


// // ================= USER + MENTOR =================

// // ➕ Add availability
// availabilityRoutes.post("/", authenticate, addAvailability);

// // 📥 Get my availability
// availabilityRoutes.get("/me", authenticate, getMyAvailability);


// // ================= ADMIN =================

// // 👤 Get user availability
// availabilityRoutes.get(
//   "/user/:userId",
//   authenticate,
//   requireRole("ADMIN"),
//   getUserAvailability
// );

// // 🎓 Get mentor availability
// availabilityRoutes.get(
//   "/mentor/:mentorId",
//   authenticate,
//   requireRole("ADMIN"),
//   getMentorAvailability
// );


// // ================= OVERLAP =================

// // Example:
// // /api/availability/overlap?userId=123&mentorId=456

// availabilityRoutes.get(
//   "/overlap",
//   authenticate,
//   requireRole("ADMIN"),
//   getOverlappingSlots
// );

// // ================= ALL AVAILABILITY =================

// availabilityRoutes.get(
//   "/all",
//   authenticate,
//   requireRole("ADMIN"),
//   async (req, res) => {
//     try {
//       const data = await prisma.availability.findMany({
//         include: {
//           user: true,
//         },
//         orderBy: {
//           startTime: "asc",
//         },
//       });

//       res.json({ data });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error fetching availability" });
//     }
//   }
// );



import { Router } from "express";
import {
  addAvailability,
  getMyAvailability,
  getUserAvailability,
  getMentorAvailability,
  getOverlappingSlots,
} from "../controllers/availabilityController.js";

import { authenticate, requireRole } from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const availabilityRoutes = Router();

// ================= USER + MENTOR =================

// ➕ Add availability
availabilityRoutes.post("/", authenticate, addAvailability);

// 📥 Get my availability
availabilityRoutes.get("/me", authenticate, getMyAvailability);

// ================= ADMIN =================

// 👤 Get user availability
availabilityRoutes.get(
  "/user/:userId",
  authenticate,
  requireRole("ADMIN"),
  getUserAvailability
);

// 🎓 Get mentor availability
availabilityRoutes.get(
  "/mentor/:mentorId",
  authenticate,
  requireRole("ADMIN"),
  getMentorAvailability
);

// ================= OVERLAP =================

availabilityRoutes.get(
  "/overlap",
  authenticate,
  requireRole("ADMIN"),
  getOverlappingSlots
);

// ================= ✅ ALL AVAILABILITY =================

availabilityRoutes.get(
  "/all",
  authenticate,
  requireRole("ADMIN"),
  async (req, res) => {
    try {
      const data = await prisma.availability.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              role: true,
              email: true,
            },
          },
          mentor: {
            select: {
              id: true,
              name: true,
              role: true,
              email: true,
            },
          },
        },
        orderBy: {
          startTime: "asc",
        },
      });

      res.json({ data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching availability" });
    }
  }
);
      