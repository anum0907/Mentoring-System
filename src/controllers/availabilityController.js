import { prisma } from "../lib/prisma.js";

// ================= ADD AVAILABILITY =================
export async function addAvailability(req, res, next) {
  try {
    const userId = req.user.userId;
    const role = req.user.role;

    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "date, startTime, endTime required",
      });
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    const availability = await prisma.availability.create({
      data: {
        role,
        date: new Date(date),
        startTime: start,
        endTime: end,
        userId: role === "USER" ? userId : null,
        mentorId: role === "MENTOR" ? userId : null,
      },
    });

    res.status(201).json({
      success: true,
      data: availability,
    });
  } catch (e) {
    next(e);
  }
}

// ================= GET MY AVAILABILITY =================
export async function getMyAvailability(req, res, next) {
  try {
    const userId = req.user.userId;
    const role = req.user.role;

    const slots = await prisma.availability.findMany({
      where: role === "USER" ? { userId } : { mentorId: userId },
      orderBy: { startTime: "asc" },
    });

    res.json({ success: true, data: slots });
  } catch (e) {
    next(e);
  }
}

// ================= GET USER AVAILABILITY =================
export async function getUserAvailability(req, res, next) {
  try {
    const { userId } = req.params;

    const slots = await prisma.availability.findMany({
      where: { userId },
      orderBy: { startTime: "asc" },
    });

    res.json({ success: true, data: slots });
  } catch (e) {
    next(e);
  }
}

// ================= GET MENTOR AVAILABILITY =================
export async function getMentorAvailability(req, res, next) {
  try {
    const { mentorId } = req.params;

    const slots = await prisma.availability.findMany({
      where: { mentorId },
      orderBy: { startTime: "asc" },
    });

    res.json({ success: true, data: slots });
  } catch (e) {
    next(e);
  }
}

// ================= OVERLAP =================
export const getOverlappingSlots = async (req, res) => {
  try {
    const { userId, mentorId } = req.query;

    if (!userId || !mentorId) {
      return res.status(400).json({ message: "Missing IDs" });
    }

    // 👤 USER slots
    const userSlots = await prisma.availability.findMany({
      where: {
        userId,
      },
    });

    // 🎓 MENTOR slots
    const mentorSlots = await prisma.availability.findMany({
      where: {
        mentorId,
      },
    });

    let overlaps = [];

    // 🔥 OVERLAP LOGIC
    userSlots.forEach((u) => {
      mentorSlots.forEach((m) => {
        const start = new Date(Math.max(
          new Date(u.startTime),
          new Date(m.startTime)
        ));

        const end = new Date(Math.min(
          new Date(u.endTime),
          new Date(m.endTime)
        ));

        if (start < end) {
          overlaps.push({
            startTime: start,
            endTime: end,
          });
        }
      });
    });

    res.json({ data: overlaps });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Overlap error" });
  }
};