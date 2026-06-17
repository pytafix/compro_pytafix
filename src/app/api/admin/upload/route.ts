import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create safe filename
    const originalName = file.name;
    const extension = path.extname(originalName);
    const basename = path.basename(originalName, extension);
    const safeName = `${basename.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}${extension}`;

    // Ensure public/uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }

    // Write file
    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${safeName}`;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
