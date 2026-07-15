"use client";

import { useState } from "react";
import { toast } from "sonner";

interface UseFileUploadReturn {
  isUploading: boolean;
  uploadFile: (file: File) => Promise<string | null>;
  uploadUrl: string;
  setUploadUrl: (url: string) => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file) return null;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File terlalu besar (maks 5 MB)");
      return null;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Tipe file tidak didukung. Gunakan JPG, PNG, WebP, GIF, atau AVIF.");
      return null;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Gagal upload file");
        return null;
      }

      const data = await res.json();
      setUploadUrl(data.url);
      toast.success("Gambar berhasil diupload!");
      return data.url;
    } catch {
      toast.error("Gagal upload file");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadFile, uploadUrl, setUploadUrl };
}