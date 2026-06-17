import { AdminNavbar } from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col">
      <AdminNavbar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
