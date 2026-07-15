import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "strong", "em", "u", "s",
  "ul", "ol", "li",
  "a", "blockquote", "code", "pre",
  "img", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "th", "td",
  "div", "span", "section", "article",
];

const allowedAttributes = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "width", "height", "loading"],
  "*": ["class", "id", "style"],
  blockquote: ["cite"],
};

const allowedSchemes = ["http", "https", "mailto", "tel"];

export function sanitizeContent(content: string): string {
  return sanitizeHtml(content, {
    allowedTags,
    allowedAttributes,
    allowedSchemes,
    allowedIframeHostnames: [],
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
    selfClosing: ["img", "br", "hr"],
  });
}

export function sanitizeExcerpt(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: ["p", "br", "strong", "em", "a"],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
  });
}