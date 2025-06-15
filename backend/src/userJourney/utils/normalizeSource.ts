export class Normalize {
  private static readonly rules: { keyword: string[]; label: string }[] = [
    { keyword: ["facebook", "fb"], label: "facebook" },
    { keyword: ["instagram", "insta", "ig", "reels", "stories"], label: "instagram" },
    { keyword: ["google"], label: "google" },
    { keyword: ["manychat"], label: "manychat" },
    { keyword: ["mail", "email", "mailbiz"], label: "email" },
    { keyword: ["organic", "organico"], label: "organic" },
    { keyword: ["site", "bio", "link"], label: "link" },
    { keyword: ["whatsapp"], label: "whatsapp" },
  ];

  private static normalizeString(value: string): string {
    const fonte = (value || "").toLowerCase();

    for (const { keyword, label } of this.rules) {
      if (keyword.some(k => fonte.includes(k))) {
        return label;
      }
    }

    return "unknown";
  }

  static normalizeOrFallback(source: string, medium: string): string {
    const normalized = this.normalizeString(source);
    return normalized === "unknown"
      ? this.normalizeString(medium)
      : normalized;
  }
}

