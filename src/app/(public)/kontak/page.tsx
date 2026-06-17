import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami | Pytafix",
  description: "Hubungi Pytafix untuk layanan perbaikan HP, Tablet, Laptop, dan PC. Kami siap membantu menyelesaikan masalah perangkat elektronik Anda.",
};

export default function KontakPage() {
  const waLink = "https://wa.me/6281234567890?text=Halo%20Pytafix,%20saya%20ingin%20berkonsultasi%20tentang%20perbaikan%20perangkat%20saya.";

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 md:py-20 px-4 md:px-8 lg:px-margin-desktop text-center border-b border-outline-variant mb-16">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4 md:font-headline-xl md:text-headline-xl font-headline-lg-mobile text-headline-lg-mobile">
            Hubungi Pytafix
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Tim teknisi profesional kami siap mendengarkan dan mengatasi masalah perangkat elektronik Anda dengan cepat dan transparan.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div>
            <h2 className="font-headline-md text-primary mb-6">Informasi Kontak</h2>
            <p className="font-body-lg text-on-surface-variant mb-8">
              Kunjungi pusat perbaikan kami atau hubungi kami melalui saluran berikut untuk konsultasi gratis.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-outline-variant shadow-sm">
                <div className="bg-primary-container text-primary p-3 rounded-lg flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-on-surface mb-1">Alamat Bengkel</h3>
                  <p className="font-body-md text-on-surface-variant">Jl. Elektronik No. 123<br/>Kec. Lowokwaru, Malang Raya<br/>Jawa Timur 65141</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-outline-variant shadow-sm">
                <div className="bg-primary-container text-primary p-3 rounded-lg flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-on-surface mb-1">Telepon & WhatsApp</h3>
                  <p className="font-body-md text-on-surface-variant">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-outline-variant shadow-sm">
                <div className="bg-primary-container text-primary p-3 rounded-lg flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                </div>
                <div>
                  <h3 className="font-label-bold text-on-surface mb-1">Jam Operasional</h3>
                  <p className="font-body-md text-on-surface-variant">Senin - Sabtu: 09:00 - 18:00<br/>Minggu: Tutup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map / Action */}
          <div className="flex flex-col">
            <h2 className="font-headline-md text-primary mb-6">Lokasi Kami</h2>
            <div className="flex-grow bg-surface-container border border-outline-variant rounded-xl overflow-hidden min-h-[300px] relative">
              {/* Embed Google Maps */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d126438.33806399127!2d112.56174154964654!3d-7.973468593450259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x7887433be326f55!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            
            <div className="mt-8 text-center bg-surface p-8 rounded-xl border border-outline-variant shadow-sm">
               <h3 className="font-headline-sm text-on-surface mb-3">Butuh Respon Cepat?</h3>
               <p className="font-body-md text-on-surface-variant mb-6">Konsultasikan keluhan kerusakan perangkat Anda langsung dengan teknisi kami via WhatsApp.</p>
               <a 
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-label-bold text-lg transition-all bg-[#25D366] hover:bg-[#1DA851] text-white shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">chat</span>
                  Chat WhatsApp Sekarang
               </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
