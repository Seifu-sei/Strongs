import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import crypto from "crypto";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Storage dirs
const dataDir = path.join(process.cwd(), "data");
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Simple JSON storage helpers
function readJson(file: string): any[] {
  const fp = path.join(dataDir, file);
  if (!fs.existsSync(fp)) return [];
  return JSON.parse(fs.readFileSync(fp, "utf8"));
}
function writeJson(file: string, data: any[]) {
  const fp = path.join(dataDir, file);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf8");
}

// Auth routes (very simple; do NOT use in production)
app.post("/api/auth/signup", (req, res) => {
  const users = readJson("users.json");
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
  if (users.find((u) => u.email === email)) return res.status(409).json({ message: "Email already registered" });
  const user = { id: crypto.randomUUID(), name, email, passwordHash: password };
  users.push(user);
  writeJson("users.json", users);
  return res.json({ id: user.id, name, email });
});

app.post("/api/auth/signin", (req, res) => {
  const users = readJson("users.json");
  const { email, password } = req.body || {};
  const user = users.find((u) => u.email === email && u.passwordHash === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const token = crypto.randomBytes(16).toString("hex");
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Multer for photo upload
const upload = multer({ dest: uploadsDir });

// Nodemailer transport (configure via env, fallback to json transport)
const transporter = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : nodemailer.createTransport({ jsonTransport: true });

app.post("/api/smc/register", upload.single("photo"), async (req, res) => {
  try {
    const smc = readJson("smc.json");
    const id = crypto.randomUUID();
    const payload = { id, ...req.body, photoPath: req.file ? `/uploads/${path.basename(req.file.path)}` : null, createdAt: new Date().toISOString() };
    smc.push(payload);
    writeJson("smc.json", smc);

    // Email notification to admin/user
    const toAddress = (req.body?.email as string) || "no-reply@example.com";
    const admin = process.env.ADMIN_EMAIL || toAddress;
    const info = await transporter.sendMail({
      to: admin,
      from: process.env.FROM_EMAIL || "strongs@example.com",
      subject: "New SMC Registration",
      text: `A new SMC registration was received for ${req.body?.lastName || ""} ${req.body?.firstName || ""}.`,
    });

    return res.json({ id, ok: true, emailPreview: (info as any).message || undefined });
  } catch (e: any) {
    return res.status(500).json({ message: e.message || "Failed" });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(port, () => console.log(`API listening on http://localhost:${port}`));