import { append, clean, isEmail } from "@/lib/store";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const quantity = Math.max(1, Math.min(10, Number(body.quantity) || 1));

  if (name.length < 2) {
    return Response.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  }
  if (!isEmail(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  const entry = await append("preorders", { name, email, quantity });
  return Response.json({
    ok: true,
    id: entry.id,
    message: `Thanks ${name.split(" ")[0]}! You're on the waitlist for ${quantity} ${quantity > 1 ? "copies" : "copy"}.`,
  });
}
