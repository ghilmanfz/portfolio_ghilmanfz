import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get client IP — check forwarded headers first (for proxies/Vercel)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") ?? "";

    // Skip lookup for local dev IPs
    if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
      return NextResponse.json({ country: "Unknown", city: "", region: "" });
    }

    // ip-api.com free tier — no key needed, 45 req/min
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city,regionName`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return NextResponse.json({ country: "Unknown", city: "", region: "" });
    }

    const data = await res.json();

    if (data.status === "success") {
      return NextResponse.json({
        country: data.country ?? "Unknown",
        city: data.city ?? "",
        region: data.regionName ?? "",
      });
    }

    return NextResponse.json({ country: "Unknown", city: "", region: "" });
  } catch {
    return NextResponse.json({ country: "Unknown", city: "", region: "" });
  }
}
