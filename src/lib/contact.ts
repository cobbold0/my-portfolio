import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(3).max(150),
  message: z.string().min(10).max(4000),
  honey: z.string().max(0).optional().default("")
});

const rateMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateMap.get(ip);

  if (!current || current.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (current.count >= MAX_PER_WINDOW) {
    return false;
  }

  current.count += 1;
  rateMap.set(ip, current);
  return true;
}

async function appendDevSubmission(payload: z.infer<typeof contactSchema>) {
  const storagePath = path.join(process.cwd(), "src", "content", "contact-submissions.json");

  let list: Array<z.infer<typeof contactSchema> & { timestamp: string }> = [];
  try {
    const raw = await fs.readFile(storagePath, "utf8");
    list = JSON.parse(raw) as Array<z.infer<typeof contactSchema> & { timestamp: string }>;
  } catch {
    list = [];
  }

  list.push({ ...payload, timestamp: new Date().toISOString() });
  await fs.writeFile(storagePath, JSON.stringify(list, null, 2), "utf8");
}

export async function handleContactSubmission(payload: z.infer<typeof contactSchema>) {
  const to = process.env.CONTACT_EMAIL_TO;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (to && host && user && pass) {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: user,
      to,
      subject: `[Portfolio Contact] ${payload.subject}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
    });
    return "email";
  }

  if (process.env.NODE_ENV !== "production") {
    await appendDevSubmission(payload);
    return "file";
  }

  console.log("Contact submission (no SMTP configured):", payload);
  return "log";
}
