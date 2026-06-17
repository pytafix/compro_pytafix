export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <header className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-center">
          <div className="md:col-span-7 flex flex-col gap-6">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-on-surface">
              Servis Jujur, Garansi Pasti untuk Laptop, HP, dan Komputer Anda
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Melayani area Malang & sekitarnya. Teknisi tersertifikasi, suku cadang original, dan transparansi proses diagnostik untuk menjaga perangkat esensial Anda tetap prima.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded hover:bg-on-primary-fixed-variant transition-colors cursor-pointer">
                Booking Servis
              </button>
              <button className="border border-outline text-primary font-label-bold text-label-bold px-8 py-3 rounded hover:bg-surface-container transition-colors flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  chat
                </span>
                Chat WhatsApp
              </button>
            </div>
          </div>
          <div className="md:col-span-5 h-[400px] md:h-[500px] rounded-lg border border-outline-variant overflow-hidden bg-surface-container-low">
            <img
              alt="Technical Repair Workspace"
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqF0jqivhdbQ4AuLxzDky2D5JGwbHIPyR7RyIXyXJb5nAv5UGAFaQug9sIMTiUyI78AEZhcipbtWkS9DaBWsrKziKIVHFtMr__veQgpv-eEuhgQJPIznpGYvI5yMgDgzpo9t-UhmCeN-79ioojmn8ye2WL3nLU22cYYnWVx9SIAODvqs7X-CjfKrWGPYCyjwUGyOABV9RByMf7OW3SMOtg8NPvqWAjsA2vUXeP08yvrx32rXO0_2UP01lSD8lMCls1oVVPldHB0eKH"
            />
          </div>
        </div>
      </header>

      {/* Trust Badges */}
      <section className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop mb-16 md:mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-gutter bg-surface-container-lowest border border-outline-variant rounded-lg p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[28px]">verified</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Garansi Resmi</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Jaminan layanan hingga 90 hari</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[28px]">memory</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Sparepart Original</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Komponen bersertifikasi pabrik</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[28px]">home_repair_service</span>
            </div>
            <div>
              <h3 className="font-label-bold text-label-bold text-on-surface">Home Service</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Teknisi datang ke lokasi Anda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-surface-container-low py-16 md:py-24 border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
            <div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-2">
                Layanan Teknis
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Spesialisasi kami dalam penanganan perangkat elektronik.
              </p>
            </div>
            <a className="font-label-bold text-label-bold text-primary flex items-center gap-2 hover:underline mt-4 md:mt-0" href="/layanan">
              Lihat Semua Layanan <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-gutter">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-[40px] mb-6 group-hover:scale-110 transition-transform">
                laptop_mac
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Servis Laptop</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Diagnostik hardware, perbaikan motherboard, penggantian layar, dan upgrade storage/RAM.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-[40px] mb-6 group-hover:scale-110 transition-transform">
                smartphone
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">HP & Tablet</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Penggantian baterai, perbaikan LCD presisi tinggi, dan pemulihan data sistem.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-[40px] mb-6 group-hover:scale-110 transition-transform">
                inventory_2
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Sparepart</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Penyediaan komponen OEM bersertifikat dengan garansi pemasangan.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-primary text-[40px] mb-6 group-hover:scale-110 transition-transform">
                directions_car
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Home Service</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Penjadwalan kunjungan teknisi untuk perbaikan di tempat (khusus area Malang).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-24 max-w-container-max mx-auto px-4 md:px-8 lg:px-margin-desktop">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-center text-on-surface mb-16">
          Prosedur Layanan
        </h2>
        <div className="flex flex-col md:flex-row justify-between relative">
          <div className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-outline-variant z-0"></div>
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 mb-8 md:mb-0">
            <div className="h-12 w-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-4">
              1
            </div>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Booking</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant px-4">
              Jadwalkan servis via web atau WA.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 mb-8 md:mb-0">
            <div className="h-12 w-12 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-4">
              2
            </div>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Diagnosis</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant px-4">
              Pengecekan teknis & estimasi biaya.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4 mb-8 md:mb-0">
            <div className="h-12 w-12 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-4">
              3
            </div>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Repair</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant px-4">
              Pengerjaan dengan standar operasional ketat.
            </p>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col items-center text-center relative z-10 w-full md:w-1/4">
            <div className="h-12 w-12 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-bold text-label-bold border-4 border-surface mb-4">
              4
            </div>
            <h4 className="font-label-bold text-label-bold text-on-surface mb-2">Warranty</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant px-4">
              Pengujian akhir & penyerahan garansi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
