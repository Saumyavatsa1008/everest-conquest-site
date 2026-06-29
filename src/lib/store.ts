import { promises as fs } from "fs";
import path from "path";
import os from "os";

/**
 * Lightweight JSON-file storage for form submissions.
 *
 * Locally, records are appended to ./data/<name>.json so you can open the file
 * and read every submission. On a read-only/serverless host (e.g. Vercel) the
 * project directory isn't writable, so we transparently fall back to the OS temp
 * dir. For durable production storage, swap the body of these two functions for
 * a real database (Postgres, Supabase, etc.) — the call sites won't change.
 */

export type Submission = Record<string, unknown> & {
  id: string;
  createdAt: string;
};

function dataDir(): string {
  // Prefer a project-local ./data folder; fall back to temp if not writable.
  return process.env.VERCEL ? path.join(os.tmpdir(), "everest-data") : path.join(process.cwd(), "data");
}

async function fileFor(name: string): Promise<string> {
  const dir = dataDir();
  await fs.mkdir(dir, { recursive: true });
  return path.join(dir, `${name}.json`);
}

export async function readAll(name: string): Promise<Submission[]> {
  try {
    const file = await fileFor(name);
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Submission[];
  } catch {
    return [];
  }
}

export async function append(
  name: string,
  record: Record<string, unknown>
): Promise<Submission> {
  const existing = await readAll(name);
  const entry: Submission = {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${existing.length + 1}`,
    createdAt: new Date().toISOString(),
    ...record,
  };
  existing.push(entry);
  const file = await fileFor(name);
  await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
  return entry;
}

/** Find a single record by a field match (e.g. by trackingId). */
export async function findBy(
  name: string,
  predicate: (s: Submission) => boolean
): Promise<Submission | undefined> {
  const all = await readAll(name);
  return all.find(predicate);
}

/** Patch the first record whose id matches, persisting the change. */
export async function update(
  name: string,
  id: string,
  patch: Record<string, unknown>
): Promise<Submission | undefined> {
  const all = await readAll(name);
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;
  all[idx] = { ...all[idx], ...patch };
  const file = await fileFor(name);
  await fs.writeFile(file, JSON.stringify(all, null, 2), "utf8");
  return all[idx];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmail = (v: unknown): v is string =>
  typeof v === "string" && EMAIL_RE.test(v.trim());

export const clean = (v: unknown, max = 2000): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
