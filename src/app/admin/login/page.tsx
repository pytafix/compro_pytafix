"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        toast.success("Login berhasil!");
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        toast.error(data.error || "Password salah.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan koneksi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-outline-variant rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container text-on-primary-container mb-4">
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              admin_panel_settings
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface">Pytafix Admin</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Silakan masukkan kata sandi untuk mengakses dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="font-label-bold text-label-bold text-on-surface block" htmlFor="password">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface border border-outline-variant rounded px-4 py-3 pr-12 font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 flex items-center justify-center cursor-pointer"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary font-label-bold text-label-bold px-4 py-3 rounded hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? "Memproses..." : "Masuk"}
            {!isLoading && <span className="material-symbols-outlined text-[20px]">login</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
