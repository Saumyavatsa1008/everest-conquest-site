import { readAll } from "@/lib/store";

/**
 * Private viewer for all saved form submissions.
 *
 * Usage:  /api/admin/submissions?key=YOUR_ADMIN_KEY
 * Set ADMIN_KEY in the Vercel project's Environment Variables.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const expected = process.env.ADMIN_KEY;

  if (!expected) {
    return Response.json(
      { ok: false, error: "ADMIN_KEY is not configured on the server." },
      { status: 500 }
    );
  }
  if (key !== expected) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const [messages, newsletter, preorders, orders] = await Promise.all([
    readAll("messages"),
    readAll("newsletter"),
    readAll("preorders"),
    readAll("orders"),
  ]);

  return Response.json({
    ok: true,
    counts: {
      messages: messages.length,
      newsletter: newsletter.length,
      preorders: preorders.length,
      orders: orders.length,
    },
    messages,
    newsletter,
    preorders,
    orders,
  });
}
