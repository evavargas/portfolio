import { site, getContactEmail, getContactPhoneE164 } from "@/lib/site";

function escapeVCardValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildVCard() {
  const email = getContactEmail();
  const phone = getContactPhoneE164();
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue("Vargas")};${escapeVCardValue("Eva")};;;`,
    `FN:${escapeVCardValue(site.name)}`,
    `TITLE:${escapeVCardValue(site.title)}`,
  ];

  if (phone) {
    lines.push(`TEL;TYPE=CELL:+${phone}`);
  }

  if (email) {
    lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardValue(email)}`);
  }

  lines.push(`URL:${site.linkedin}`);
  lines.push(`URL:${site.github}`);
  lines.push(`NOTE:${escapeVCardValue(site.note)}`);
  lines.push("END:VCARD");

  return lines.join("\r\n");
}
