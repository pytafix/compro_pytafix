import { randomUUID } from "crypto";
import { del, put } from "@vercel/blob";
import { fileTypeFromBuffer } from "file-type";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { isManagedAdminBlobUrl } from "@/lib/blob-media";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (auth) return auth;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    return NextResponse.json(
      { error: "Penyimpanan media belum dikonfigurasi" },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty" }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
    }
    if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json({ error: "Unsupported file extension" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const detectedType = await fileTypeFromBuffer(buffer);
    if (!detectedType || !ALLOWED_MIME_TYPES.has(detectedType.mime)) {
      return NextResponse.json(
        { error: "File content does not match an allowed image format" },
        { status: 400 }
      );
    }

    const blob = await put(
      `admin/media/${randomUUID()}.${detectedType.ext}`,
      buffer,
      {
        access: "public",
        contentType: detectedType.mime,
        addRandomSuffix: false,
        token: blobToken,
      }
    );

    return NextResponse.json(
      { url: blob.url },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin(request);
  if (auth) return auth;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
    return NextResponse.json(
      { error: "Penyimpanan media belum dikonfigurasi" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const url =
    typeof body === "object" && body !== null && "url" in body
      ? (body as { url?: unknown }).url
      : undefined;

  if (!isManagedAdminBlobUrl(url)) {
    return NextResponse.json({ error: "Invalid managed media URL" }, { status: 400 });
  }

  try {
    await del(url, { token: blobToken });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
