import { unstable_cache } from "next/cache";
import QRCode from "qrcode";
import { buildVCard } from "@/lib/vcard";
import { getContactEmail, getContactPhoneE164 } from "@/lib/site";

async function generateContactQrDataUrl() {
  if (!getContactEmail() && !getContactPhoneE164()) {
    return null;
  }

  return QRCode.toDataURL(buildVCard(), {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 240,
    color: {
      dark: "#2a2433",
      light: "#00000000",
    },
  });
}

export function getContactQrDataUrl() {
  return unstable_cache(generateContactQrDataUrl, ["contact-qr-vcard"], {
    revalidate: 3600,
  })();
}
