import { NextResponse } from "next/server";
import { getWhatsAppUrl } from "@/lib/site";

export async function GET() {
  const url = getWhatsAppUrl();

  if (!url) {
    return NextResponse.json({ error: "WhatsApp is not configured" }, { status: 404 });
  }

  return NextResponse.redirect(url, 302);
}
