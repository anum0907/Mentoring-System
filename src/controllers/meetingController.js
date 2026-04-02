

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMeeting = async (req, res) => {
  try {
    console.log("REQ.USER 👉", req.user); // ✅ DEBUG

    const { title, startTime, endTime, participants } = req.body;

    // ✅ VALIDATION
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized: user missing",
      });
    }

    if (!participants || participants.length < 2) {
      return res.status(400).json({
        message: "Participants required",
      });
    }

    // ✅ CREATE MEETING
    const meeting = await prisma.meeting.create({
      data: {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        adminId: req.user.id,

        participants: {
          create: participants.map((email) => ({
            email,
          })),
        },
      },
      include: {
        participants: true,
      },
    });

    res.json({
      message: "Meeting created successfully",
      data: meeting,
    });
  } catch (err) {
    console.error("❌ MEETING ERROR:", err);

    res.status(500).json({
      message: err.message || "Meeting creation failed",
    });
  }
};

export const getMyMeetings = async (req, res) => {
  try {
    const meetings = await prisma.meeting.findMany({
      where: {
        adminId: req.user.userId,
      },
      include: {
        participants: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    res.json({ data: meetings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch meetings" });
  }
};

export const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.meeting.delete({
      where: { id },
    });

    res.json({ message: "Meeting deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};