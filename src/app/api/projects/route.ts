import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

const DATA_PATH = path.join(process.cwd(), "src", "data", "projects.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

function isAuthenticated(): boolean {
  const cookieStore = cookies();
  return cookieStore.get("admin_auth")?.value === ADMIN_PASSWORD;
}

export async function GET() {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
