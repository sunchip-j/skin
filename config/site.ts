const configuredPrivacyContact =
  process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL?.trim();

export const siteConfig = {
  name: "ILINA",
  serviceName: "ILINA 피부타입",
  url: "https://skin.ilina.kr",
  privacyContactEmail: configuredPrivacyContact || "like4m@gmail.com",
} as const;
