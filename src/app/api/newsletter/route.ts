import { append, clean, isEmail } from "@/lib/store";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = clean(body.email, 200);
  if (!isEmail(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  }

  await append("newsletter", { email });
  return Response.json({ ok: true, message: "You're subscribed — see you on the summit!" });
}
