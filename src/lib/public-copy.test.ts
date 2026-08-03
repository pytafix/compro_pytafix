import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const publicCopyFiles = [
  "src/app/(public)/tentang-kami/page.tsx",
  "src/app/(public)/testimoni/page.tsx",
  "src/app/(public)/artikel/[slug]/page.tsx",
  "src/components/home/Testimonials.tsx",
].map((file) => resolve(process.cwd(), file));

describe("public copy guardrails", () => {
  it("does not expose internal editorial or publication workflow language", () => {
    const source = publicCopyFiles.map((file) => readFileSync(file, "utf8")).join("\n");

    expect(source).not.toMatch(/melalui panel Pytafix|disetujui untuk dipublikasikan|catatan editorial/i);
    expect(source).not.toMatch(/tidak memublikasikan angka keberhasilan|belum dapat dibuktikan/i);
    expect(source).not.toMatch(/Ditinjau oleh Tim Editorial/i);
  });

  it("uses the reviewed organization byline instead of arbitrary admin authors", () => {
    const articleSource = readFileSync(resolve(process.cwd(), "src/app/(public)/artikel/[slug]/page.tsx"), "utf8");
    const listSource = readFileSync(resolve(process.cwd(), "src/app/(public)/artikel/page.tsx"), "utf8");
    const llmsSource = readFileSync(resolve(process.cwd(), "src/app/llms.txt/route.ts"), "utf8");

    expect(`${articleSource}\n${listSource}\n${llmsSource}`).not.toMatch(/Tim Editorial Pytafix/);
  });

  it("does not expose SEO research language in area pages", () => {
    const areaSource = [
      "src/app/(public)/area-layanan/page.tsx",
      "src/app/(public)/area-layanan/[slug]/page.tsx",
    ].map((file) => readFileSync(resolve(process.cwd(), file), "utf8")).join("\n");

    expect(areaSource).not.toMatch(/\bpilot\b|first-party|Google Search Console|\bGSC\b|doorway|scaled content/i);
  });
});
