import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../db.js";

const router = Router();
const ALLOWED_ROLES = ["admin", "customer"];

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body || {};

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ error: "Email, password, and role are required." });
  }

  const normalizedRole = String(role).toLowerCase();
  const normalizedEmail = String(email).toLowerCase().trim();

  if (!ALLOWED_ROLES.includes(normalizedRole)) {
    return res
      .status(400)
      .json({ error: "Role must be 'admin' or 'customer'." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const insertQuery = `
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, email, role, created_at;
    `;

    const { rows } = await pool.query(insertQuery, [
      normalizedEmail,
      passwordHash,
      normalizedRole,
    ]);
    const user = rows[0];
    return res.status(201).json({ message: "User registered", user });
  } catch (err) {
    // Unique violation code in Postgres
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email is already registered." });
    }
    console.error("Register error", err);
    return res.status(500).json({ error: "Unable to register user." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const normalizedEmail = String(email).toLowerCase().trim();

  try {
    const { rows } = await pool.query(
      `SELECT id, email, password_hash, role FROM users WHERE email = $1`,
      [normalizedEmail]
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const welcome =
      user.role === "admin" ? "Welcome Admin" : "Welcome Customer";
    return res.json({
      message: welcome,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ error: "Unable to login." });
  }
});

export default router;
