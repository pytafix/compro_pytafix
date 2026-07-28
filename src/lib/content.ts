import { marked } from "marked";
import { sanitizeContent } from "@/lib/sanitize";

export function renderStoredContent(content: string): string {
  const rendered = marked.parse(content, {
    gfm: true,
    breaks: false,
    async: false,
  });

  return sanitizeContent(rendered);
}
