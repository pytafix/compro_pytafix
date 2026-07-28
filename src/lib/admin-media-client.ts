export async function deletePendingAdminUpload(url: string): Promise<boolean> {
  try {
    const response = await fetch("/api/admin/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      keepalive: true,
    });

    return response.ok;
  } catch {
    return false;
  }
}
