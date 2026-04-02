
# 🎯 Mentoring Call Scheduling System

A full-stack mentoring platform designed to streamline scheduling between users and mentors, with a strong focus on **product thinking, RBAC, and intelligent matching**.

---

## 🚀 Overview

This system enables:

- Users to add availability
- Mentors to manage availability
- Admins to control scheduling, recommend mentors, and book calls

Inspired by platforms like **Cal.com** and **Acuity Scheduling**, the goal was to build a simple, intuitive, and scalable scheduling workflow.

---

## 🔐 Role-Based Access Control (RBAC)

### 👤 User
- Add availability
- Define tags & description
- ❌ Cannot book meetings

### 🧑‍🏫 Mentor
- Add availability
- Maintain profile (tags & description)
- ❌ Cannot book meetings

### 🛠 Admin
- View all users & mentors
- Get mentor recommendations
- Check availability overlaps
- Book meetings

---

## 🧠 Mentor Recommendation System

A lightweight recommendation engine based on:

- Tag matching
- Description similarity (vectorless approach)

### ⚙️ Matching Logic
- Each matching tag increases score
- Mentors are ranked by match score
- Best match is highlighted in UI

---

## ⏱ Availability Overlap System

The system calculates overlapping slots between users and mentors using:

- Date matching
- Time intersection logic:
