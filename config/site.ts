const configuredPrivacyContact =
  process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL?.trim();

export const siteConfig = {
  name: "ILINA",
  serviceName: "ILINA 피부타입",
  url: "https://skin.ilina.kr",
  brandUrl: "https://ilina.kr",
  // Public skin-service search identity. Keep the legacy origin separate so
  // a future hub restoration does not require changing feature code.
  serviceCanonicalUrl: "https://ilina.kr",
  privacyContactEmail: configuredPrivacyContact || "do.il2na@gmail.com",
} as const;
