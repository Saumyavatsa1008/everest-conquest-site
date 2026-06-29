import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

/**
 * Storage for form submissions.
 *
 * In production (Vercel) we use Upstash Redis — a durable, serverless data store.
 * The whole list for each form is kept as a single JSON value under the key
 * `everest:<name>`, mirroring the local JSON-file layout so every helper below
 * behaves identically in both environments.
 *
 * Locally (no Redis env vars) we fall back to ./data/<name>.json so you can open
 * the file and read submissions during development.
 *
 * The Upstash integration on Vercel injects either KV_REST_API_* or
 * UPSTASH_REDIS_REST_* variables — we accept both.
 */

export type Submission = Record<string, unknown> & {
  id: string;
  createdAt: string;
};

const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const redis =
  REDIS_URL && REDIS_TOKEN
    ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN })
    : null;

const keyFor = (name: string) => `everest:${name}`;

// ---- local file fallback (development) ---------------------------------------

function dataDir(): string {
  return path.join(process.cwd(), "data");
}

async function fileFor(name: string): Promise<string> {
  const dir = dataDir();
  await fs.mkdir(dir, { recursive: true });
  return path.join(dir, `${name}.json`);
}

async function readFromFile(name: string): Promise<Submission[]> {
  try {
    const file = await fileFor(name);
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Submission[];
  } catch {
    return [];
  }
}

async function writeToFile(name: string, all: Submission[]): Promise<void> {
  const file = await fileFor(name);
  await fs.writeFile(file, JSON.stringify(all, null, 2), "utf8");
}

// ---- unified read / write ----------------------------------------------------

export async function readAll(name: string): Promise<Submission[]> {
  if (redis) {
    const data = await redis.get<Submission[]>(keyFor(name));
    return Array.isArray(data) ? data : [];
  }
  return readFromFile(name);
}

async function writeAll(name: string, all: Submission[]): Promise<void> {
  if (redis) {
    await redis.set(keyFor(name), all);
    return;
  }
  await writeToFile(name, all);
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
  await writeAll(name, existing);
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
  await writeAll(name, all);
  return all[idx];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isEmail = (v: unknown): v is string =>
  typeof v === "string" && EMAIL_RE.test(v.trim());

export const clean = (v: unknown, max = 2000): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
