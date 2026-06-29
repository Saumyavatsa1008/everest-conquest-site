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
  const message = clean(body.message, 4000);

  if (name.length < 2) {
    return Response.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  }
  if (!isEmail(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }
  if (message.length < 5) {
    return Response.json({ ok: false, error: "Please enter a message." }, { status: 422 });
  }

  await append("messages", { name, email, message });
  return Response.json({ ok: true, message: "Message received — we'll be in touch soon." });
}
