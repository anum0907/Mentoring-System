import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("12345678", 10);

  // 🛠 ADMIN
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@gmail.com",
      password,
      role: "ADMIN",
      tags: ["Management"],
      description: "System Admin",
    },
  });

  console.log("Admin created:", admin.email);

  // 👤 USERS (10)
  const usersData = [
    {
      name: "Ali Khan",
      email: "ali@gmail.com",
      tags: ["Tech", "Asks Questions"],
      description: "Frontend learner",
    },
    {
      name: "Sara Ahmed",
      email: "sara@gmail.com",
      tags: ["Communication", "Non-tech"],
      description: "HR student",
    },
    {
      name: "Usman Tariq",
      email: "usman@gmail.com",
      tags: ["Tech"],
      description: "Backend developer",
    },
    {
      name: "Zoya Ahmed",
      email: "zoya@gmail.com",
      tags: ["Communication"],
      description: "Business student",
    },
    {
      name: "Omar Sheikh",
      email: "omar@gmail.com",
      tags: ["Tech", "Communication"],
      description: "Full stack dev",
    },
    {
      name: "Noor Fatima",
      email: "noor@gmail.com",
      tags: ["Non-tech"],
      description: "Marketing student",
    },
    {
      name: "Hassan Ali",
      email: "hassan@gmail.com",
      tags: ["Tech"],
      description: "CS student",
    },
    {
      name: "Ayesha Khan",
      email: "ayesha@gmail.com",
      tags: ["Communication"],
      description: "Content writer",
    },
    {
      name: "Bilal Ahmed",
      email: "bilal@gmail.com",
      tags: ["Tech"],
      description: "Software engineer",
    },
    {
      name: "Fatima Noor",
      email: "fatima@gmail.com",
      tags: ["Non-tech", "Communication"],
      description: "Management student",
    },
  ];

  for (let u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        ...u,
        password,
        role: "USER",
      },
    });
  }

  console.log("Users seeded");

  // 🧑‍🏫 MENTORS (5)
  const mentorsData = [
    {
      name: "Saad Raza",
      email: "saad@gmail.com",
      tags: ["Tech", "Big Tech"],
      description: "Senior developer at Google",
    },
    {
      name: "Anum Arif",
      email: "anum@gmail.com",
      tags: ["Communication"],
      description: "Career coach",
    },
    {
      name: "Hina Malik",
      email: "hina@gmail.com",
      tags: ["Non-tech", "Communication"],
      description: "HR specialist",
    },
    {
      name: "Zain Raza",
      email: "zain@gmail.com",
      tags: ["Tech"],
      description: "Backend engineer",
    },
    {
      name: "Sara Ahmed",
      email: "mentor.sara@gmail.com",
      tags: ["Tech", "Communication"],
      description: "Full stack mentor",
    },
  ];

  for (let m of mentorsData) {
    await prisma.user.upsert({
      where: { email: m.email },
      update: {},
      create: {
        ...m,
        password,
        role: "MENTOR",
      },
    });
  }

  console.log("Mentors seeded");
}

main()
  .then(() => {
    console.log("Seeding done ✅");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });