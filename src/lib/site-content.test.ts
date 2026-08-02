import { describe, expect, it } from "vitest";
import { ARTICLE_EDITORIAL_OVERRIDES, DEFAULT_FAQS, getPublicFaqs, getPublicServiceCopy, isPublicReviewedArticleSlug, isPublicReviewedServiceSlug, PUBLIC_SERVICE_COPY } from "./site-content";

describe("public service copy guardrails", () => {
  it("replaces legacy service claims on public rendering", () => {
    const service = getPublicServiceCopy({
      slug: "service-laptop",
      title: "Service Laptop",
      description: "Teknisi bersertifikat dengan garansi resmi.",
      content: "Klaim lama",
    });

    expect(service.description).toBe(PUBLIC_SERVICE_COPY["service-laptop"].description);
    expect(service.content).toBe(PUBLIC_SERVICE_COPY["service-laptop"].content);
    expect(service.description).not.toMatch(/bersertifikat|garansi resmi/i);
  });

  it("leaves unknown service records unchanged", () => {
    const service = {
      slug: "service-baru",
      description: "Deskripsi admin",
      content: null,
    };

    expect(getPublicServiceCopy(service)).toEqual(service);
  });

  it("holds arbitrary service/article slugs outside the reviewed public set", () => {
    expect(isPublicReviewedServiceSlug("service-baru")).toBe(false);
    expect(isPublicReviewedServiceSlug("service-laptop")).toBe(true);
    expect(isPublicReviewedArticleSlug("artikel-baru")).toBe(false);
    expect(isPublicReviewedArticleSlug("cara-mengatasi-laptop-mati-total")).toBe(true);
  });

  it("uses the reviewed FAQ baseline instead of mutable admin rows", () => {
    expect(getPublicFaqs()).toEqual(DEFAULT_FAQS);
    expect(getPublicFaqs().map((faq) => `${faq.question} ${faq.answer}`).join(" "))
      .not.toMatch(/catatan internal|listing Google Maps|pin pada preview/i);
  });

  it("keeps reviewed public content free from internal QA terminology", () => {
    const reviewedCopy = [
      ...Object.values(PUBLIC_SERVICE_COPY).flatMap((copy) => [copy.title, copy.description, copy.content]),
      ...Object.values(ARTICLE_EDITORIAL_OVERRIDES).flatMap((article) => [article.title, article.excerpt, article.content]),
    ].join(" ");

    expect(reviewedCopy).not.toMatch(/listing Google Maps|pin pada preview|catatan internal|\bpreview\b|\binternal\b/i);
  });
});
