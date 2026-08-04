import QRCode from "qrcode";
import { buildVCard } from "@/lib/vcard";
import { getContactEmail, getContactPhoneE164 } from "@/lib/site";

export async function getContactQrDataUrl() {
  if (!getContactEmail() && !getContactPhoneE164()) {
    return null;
  }

  const vcard = buildVCard();
  return QRCode.toDataURL(vcard, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 240,
    color: {
      dark: "#2a2433",
      light: "#00000000",
    },
  });
}
