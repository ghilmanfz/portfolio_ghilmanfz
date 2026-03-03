import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

function isAuthenticated(): boolean {
  const cookieStore = cookies();
  return cookieStore.get("admin_auth")?.value === ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate type
  const allowedTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Format tidak didukung. Gunakan: mp4, webm, ogg, mov" },
      { status: 400 }
    );
  }

  // Max 100MB
  if (file.size > 100 * 1024 * 1024) {
    return NextResponse.json({ error: "File terlalu besar (max 100MB)" }, { status: 400 });
  }

  // Sanitize filename
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "mp4";
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  const filename = `${base}-${Date.now()}.${ext}`;

  // Ensure target directory exists
  const dir = path.join(process.cwd(), "public", "videos");
  await fs.mkdir(dir, { recursive: true });

  // Write file
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/videos/${filename}` });
}
