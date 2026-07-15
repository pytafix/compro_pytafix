"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Ada yang tidak beres
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Terjadi kesalahan kritis. Silakan muat ulang halaman.
            </p>
            {error.digest && (
              <p className="mt-2 text-sm text-gray-400">
                Kode: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
