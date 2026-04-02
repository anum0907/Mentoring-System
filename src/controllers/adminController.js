// import bcrypt from "bcryptjs";
// import { prisma } from "../lib/prisma.js";
// import { v4 as uuidv4 } from "uuid";

// // ================= USERS =================

// export async function listUsers(req, res, next) {
//   try {
//     const users = await prisma.user.findMany({
//       where: { role: "USER" },
//       select: { id: true, name: true, email: true, timezone: true, createdAt: true },
//       orderBy: { name: "asc" },
//     });

//     res.status(200).json({
//       success: true,
//       data: users,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// export async function listMentors(req, res, next) {
//   try {
//     const mentors = await prisma.user.findMany({
//       where: { role: "MENTOR" },
//       select: { id: true, name: true, email: true, timezone: true, createdAt: true },
//       orderBy: { name: "asc" },
//     });

//     res.status(200).json({
//       success: true,
//       data: mentors,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// export async function createUser(req, res, next) {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!email?.trim() || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters",
//       });
//     }

//     if (!["USER", "MENTOR"].includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: "Role must be USER or MENTOR",
//       });
//     }

//     const existing = await prisma.user.findUnique({
//       where: { email: email.trim().toLowerCase() },
//     });

//     if (existing) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     const hashed = await bcrypt.hash(password, 12);

//     const user = await prisma.user.create({
//       data: {
//         id: uuidv4(),
//         name: name?.trim() || "User",
//         email: email.trim().toLowerCase(),
//         password: hashed,
//         role,
//         timezone: "UTC",
//       },
//       select: { id: true, name: true, email: true, role: true, timezone: true, createdAt: true },
//     });

//     res.status(201).json({
//       success: true,
//       data: user,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// // ================= AVAILABILITY =================

// export async function getAvailabilityForUser(req, res, next) {
//   try {
//     const { userId } = req.params;

//     const slots = await prisma.availability.findMany({
//       where: {
//         OR: [
//           { userId, role: "USER" },
//           { mentorId: userId, role: "MENTOR" },
//         ],
//       },
//       orderBy: [{ date: "asc" }, { startTime: "asc" }],
//     });

//     res.status(200).json({
//       success: true,
//       data: slots,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// // ================= OVERLAP =================

// function rangesOverlap(aStart, aEnd, bStart, bEnd) {
//   return aStart < bEnd && bStart < aEnd;
// }

// export async function getOverlappingSlots(req, res, next) {
//   try {
//     const { userId } = req.params;
//     const { startTime, endTime } = req.query;

//     if (!startTime || !endTime) {
//       return res.status(400).json({
//         success: false,
//         message: "startTime and endTime are required",
//       });
//     }

//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     const slots = await prisma.availability.findMany({
//       where: {
//         OR: [
//           { userId, role: "USER" },
//           { mentorId: userId, role: "MENTOR" },
//         ],
//       },
//     });

//     const overlapping = slots.filter((s) =>
//       rangesOverlap(start, end, s.startTime, s.endTime)
//     );

//     res.status(200).json({
//       success: true,
//       data: overlapping,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// // ================= MEETING =================

// export async function scheduleMeeting(req, res, next) {
//   try {
//     const adminId = req.userId;
//     const { title, startTime, endTime, participantEmails } = req.body;

//     if (!title?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required",
//       });
//     }

//     if (!startTime || !endTime) {
//       return res.status(400).json({
//         success: false,
//         message: "startTime and endTime are required",
//       });
//     }

//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     if (start >= end) {
//       return res.status(400).json({
//         success: false,
//         message: "End time must be after start time",
//       });
//     }

//     const meeting = await prisma.meeting.create({
//       data: {
//         id: uuidv4(),
//         adminId,
//         title: title.trim(),
//         startTime: start,
//         endTime: end,
//       },
//     });

//     if (Array.isArray(participantEmails)) {
//       await prisma.meetingParticipant.createMany({
//         data: participantEmails.map((email) => ({
//           id: uuidv4(),
//           meetingId: meeting.id,
//           email: email.trim(),
//         })),
//         skipDuplicates: true,
//       });
//     }

//     const result = await prisma.meeting.findUnique({
//       where: { id: meeting.id },
//       include: { participants: true },
//     });

//     res.status(201).json({
//       success: true,
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// export async function listMentors(req, res, next) {
//   try {
//     const mentors = await prisma.user.findMany({
//       where: { role: "MENTOR" },
//       select: { id: true, name: true, email: true, timezone: true, createdAt: true },
//       orderBy: { name: "asc" },
//     });

//     res.status(200).json({
//       success: true,
//       data: mentors,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// export async function createUser(req, res, next) {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!email?.trim() || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     if (password.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 8 characters",
//       });
//     }

//     if (!["USER", "MENTOR"].includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: "Role must be USER or MENTOR",
//       });
//     }

//     const existing = await prisma.user.findUnique({
//       where: { email: email.trim().toLowerCase() },
//     });

//     if (existing) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     const hashed = await bcrypt.hash(password, 12);

//     const user = await prisma.user.create({
//       data: {
//         id: uuidv4(),
//         name: name?.trim() || "User",
//         email: email.trim().toLowerCase(),
//         password: hashed,
//         role,
//         timezone: "UTC",
//       },
//       select: { id: true, name: true, email: true, role: true, timezone: true, createdAt: true },
//     });

//     res.status(201).json({
//       success: true,
//       data: user,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// // ================= AVAILABILITY =================

// export async function getAvailabilityForUser(req, res, next) {
//   try {
//     const { userId } = req.params;

//     const slots = await prisma.availability.findMany({
//       where: {
//         OR: [
//           { userId },
//           { mentorId: userId, },
//         ],
//       },
//       orderBy: [{ date: "asc" }, { startTime: "asc" }],
//     });

//     res.status(200).json({
//       success: true,
//       data: slots,
//     });
//   } catch (e) {
//     next(e);
//   }
// }



// function rangesOverlap(aStart, aEnd, bStart, bEnd) {
//   return aStart < bEnd && bStart < aEnd;
// }

// export async function getOverlappingSlots(req, res, next) {
//   try {
//     const { userId } = req.params;
//     const { startTime, endTime } = req.query;

//     if (!startTime || !endTime) {
//       return res.status(400).json({
//         success: false,
//         message: "startTime and endTime are required",
//       });
//     }

    
//     const end = new Date(endTime);

//     const slots = await prisma.availability.findMany({
//       where: {
//         OR: [
//           { userId, role: "USER" },
//           { mentorId: userId, role: "MENTOR" },
//         ],
//       },
//     });

//     const overlapping = slots.filter((s) =>
//       rangesOverlap(start, end, s.startTime, s.endTime)
//     );

//     res.status(200).json({
//       success: true,
//       data: overlapping,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// // ================= MEETING =================

// export async function scheduleMeeting(req, res, next) {
//   try {
//     const adminId = req.userId;
//     const { title, startTime, endTime, participantEmails } = req.body;

//     if (!title?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required",
//       });
//     }

//     if (!startTime || !endTime) {
//       return res.status(400).json({
//         success: false,
//         message: "startTime and endTime are required",
//       });
//     }

//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     if (start >= end) {
//       return res.status(400).json({
//         success: false,
//         message: "End time must be after start time",
//       });
//     }

//     const meeting = await prisma.meeting.create({
//       data: {
//         id: uuidv4(),
//         adminId,
//         title: title.trim(),
//         startTime: start,
//         endTime: end,
//       },
//     });

//     if (Array.isArray(participantEmails)) {
//       await prisma.meetingParticipant.createMany({
//         data: participantEmails.map((email) => ({
//           id: uuidv4(),
//           meetingId: meeting.id,
//           email: email.trim(),
//         })),
//         skipDuplicates: true,
//       });
//     }

//     const result = await prisma.meeting.findUnique({
//       where: { id: meeting.id },
//       include: { participants: true },
//     });

//     res.status(201).json({
//       success: true,
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// }




import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { v4 as uuidv4 } from "uuid";

// ================= USERS =================

export async function listUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        name: true,
        email: true,
        timezone: true,
        createdAt: true,
        tags: true,          // ✅ ADD THIS
        description: true    // ✅ ADD THIS
      },
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (e) {
    next(e);
  }
}
export async function listMentors(req, res, next) {
  try {
    const mentors = await prisma.user.findMany({
      where: { role: "MENTOR" },
      select: {
        id: true,
        name: true,
        email: true,
        timezone: true,
        createdAt: true,
        tags: true,          // ✅ ADD
        description: true    // ✅ ADD
      },
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      success: true,
      data: mentors,
    });
  } catch (e) {
    next(e);
  }
}


export async function createUser(req, res, next) {
  try {
    const { name, email, password, role, tags,description} = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (!["USER", "MENTOR"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be USER or MENTOR",
      });
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        name: name?.trim() || "User",
        email: email.trim().toLowerCase(),
        password: hashed,
        role,
        timezone: "UTC",
        tags: tags || [],
        description: description || null,
      },
      select: { id: true, name: true, email: true, role: true, timezone: true, createdAt: true },
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (e) {
    next(e);
  }
}

// ================= AVAILABILITY =================

export async function getAvailabilityForUser(req, res, next) {
  try {
    const { userId } = req.params;

    const slots = await prisma.availability.findMany({
      where: {
        OR: [
          { userId },
          { mentorId: userId },
        ],
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    });

    res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (e) {
    next(e);
  }
}

// ================= OVERLAP =================

function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

export async function getOverlappingSlots(req, res, next) {
  try {
    const { userId } = req.params;
    const { startTime, endTime } = req.query;

    if (!startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "startTime and endTime are required",
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    const slots = await prisma.availability.findMany({
      where: {
        OR: [
          { userId },
          { mentorId: userId },
        ],
      },
    });

    const overlapping = slots.filter((s) =>
      rangesOverlap(start, end, s.startTime, s.endTime)
    );

    res.status(200).json({
      success: true,
      data: overlapping,
    });
  } catch (e) {
    next(e);
  }
}

// ================= MEETING =================

export async function scheduleMeeting(req, res, next) {
  try {
    const adminId = req.userId;
    const { title, startTime, endTime, participantEmails } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "startTime and endTime are required",
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    //STEP 4: Invalid date check
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    //  STEP 5: Prevent past meeting
    if (start < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Cannot schedule meeting in the past",
      });
    }

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time",
      });
    }

    const meeting = await prisma.meeting.create({
      data: {
        id: uuidv4(),
        adminId,
        title: title.trim(),
        startTime: start,
        endTime: end,
      },
    });

    if (Array.isArray(participantEmails)) {
      await prisma.meetingParticipant.createMany({
        data: participantEmails.map((email) => ({
          id: uuidv4(),
          meetingId: meeting.id,
          email: email.trim().toLowerCase(), // ✅ FIXED
        })),
        skipDuplicates: true,
      });
    }

    const result = await prisma.meeting.findUnique({
      where: { id: meeting.id },
      include: { participants: true },
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
}



