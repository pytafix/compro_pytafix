import Image from "next/link"; // We will use img instead for simplicity
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | Pytafix",
  description: "Solusi profesional untuk perbaikan perangkat keras Anda. Kami berdedikasi untuk memulihkan kinerja optimal elektronik esensial Anda dengan presisi teknis."
};

export default function TentangKami() {
  return (
    <main className="flex-grow pb-24 text-center md:text-left">
      {/* Hero / Headline Section */}
      <section className="mb-24 text-center px-margin-mobile md:px-margin-desktop bg-surface-container-low py-20 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-6">
            Tentang Pytafix
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Berdiri di Malang, kami adalah spesialis perbaikan perangkat elektronik yang memadukan keahlian teknisi tersertifikasi dengan peralatan diagnostik canggih. Kepercayaan Anda adalah prioritas utama kami.
          </p>
        </div>
      </section>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Story Section (Bento Grid) */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-gutter text-left">
          <div className="md:col-span-7 bg-surface-container-lowest p-8 md:p-12 border border-outline-variant rounded-xl flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                corporate_fare
              </span>
              <h2 className="font-headline-md text-headline-md text-primary">Keluarga Pyta Group</h2>
            </div>
            <p className="mb-4 text-on-surface-variant">
              Pytafix merupakan divisi layanan perangkat keras dari <strong className="text-on-surface">Pyta Group</strong>, sebuah ekosistem inovasi teknologi yang juga menaungi <strong className="text-on-surface">Pytagotech</strong>.
            </p>
            <p className="text-on-surface-variant">
              Dengan dukungan standar operasional korporat dari grup kami, Pytafix tidak beroperasi seperti tempat servis biasa. Setiap proses diagnostik, SOP perbaikan, dan jaminan keamanan data pelanggan diawasi secara ketat. Kami memastikan Anda mendapatkan kualitas layanan kelas enterprise dengan harga yang bersahabat.
            </p>
          </div>
          <div className="md:col-span-5 rounded-xl overflow-hidden border border-outline-variant relative min-h-[300px]">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt="A macro shot of a sophisticated electronic circuit board undergoing repair in a pristine, brightly lit laboratory setting."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8pAzD-blK_AbEVRSc2NoWmEJtI8VKpuaIQcTyFO0cE6fCuZ_gIJSZ2Rxtqq0k0bQbJnfKeZMJKjsUgTOnc6rFi88PRz4OT8_71EYjCQatQIP-DyLWVPDwvDoZC9QdobdORs1B0kJfS58Vtss9bpW1NcCO6ZSNHmijBSL8xGFW4MppCM0O9oDlEjYGYKOU0Jyeco6_QQEb_tIaEm7WnZnkXNa-wQNCQ3FxsSFa2xxG2IJrQGYLDMd8Qx--zk9Zd1upPT-3_Esah4b0"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-24">
          <h2 className="font-headline-lg text-headline-lg text-primary text-center mb-12">Nilai Inti Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter text-center">
            {/* Value 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg hover:border-primary transition-colors group">
              <span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                handshake
              </span>
              <h3 className="font-label-bold text-label-bold text-on-surface mb-2">Jujur</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Diagnosa transparan tanpa biaya tersembunyi. Kami komunikasikan kondisi nyata perangkat Anda.
              </p>
            </div>
            {/* Value 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg hover:border-primary transition-colors group">
              <span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <h3 className="font-label-bold text-label-bold text-on-surface mb-2">Bergaransi</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Setiap layanan dilindungi jaminan kualitas. Keandalan jangka panjang adalah janji kami.
              </p>
            </div>
            {/* Value 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg hover:border-primary transition-colors group">
              <span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                memory
              </span>
              <h3 className="font-label-bold text-label-bold text-on-surface mb-2">Sparepart Asli</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Penggunaan komponen original untuk memastikan integritas struktural dan fungsionalitas optimal.
              </p>
            </div>
            {/* Value 4 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg hover:border-primary transition-colors group">
              <span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                engineering
              </span>
              <h3 className="font-label-bold text-label-bold text-on-surface mb-2">Berpengalaman</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Teknisi bersertifikat dengan jam terbang tinggi dalam menangani berbagai anomali perangkat keras.
              </p>
            </div>
          </div>
        </section>

        {/* Service Area Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center text-left">
          <div className="order-2 lg:order-1 h-96 bg-surface-container border border-outline-variant rounded-xl relative overflow-hidden flex items-center justify-center">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              alt="A stylized, modern, top-down map interface showing an urban grid"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPQSx7SWf0YJ0j-TA4GFvLaQp3riR7cpryZGR7BIiAmbidv6bqO_t4kaA9Z3vn5zZAIC6fNUpixAIbPfRD18HzcSWC79cunA6UGAU8XiAfaBYWWOclIoyIr3mJDwsZoXj0USqZ_tAZ_FQjF7JvzY79mXsnZyopCgYBNf8qCgrEGPgxS_ZVtcOCvOTsfCmmZq6ONlJzfP4xsbI4Rg30q1AZ1fOw2EnY5tsiOTuL0ocWBWZMUYrC-a09jZn1FQjReIXEycjqvACXB6Xk"
            />
            <div className="absolute inset-0 bg-primary/10"></div>
            <div className="relative bg-surface-container-lowest/90 backdrop-blur-sm border border-primary p-4 rounded shadow-sm text-center">
              <span className="material-symbols-outlined text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              <p className="font-label-bold text-label-bold text-primary">Pusat Layanan Malang</p>
            </div>
          </div>
          <div className="order-1 lg:order-2 pl-0 lg:pl-8">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Area Jangkauan Layanan</h2>
            <p className="text-on-surface-variant mb-6">
              Kami melayani perbaikan dan penjemputan perangkat di wilayah <strong className="text-on-surface">Malang Raya</strong>. Fokus cakupan operasional kami memastikan respon cepat untuk keadaan darurat perangkat keras Anda.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 border-b border-outline-variant pb-3">
                <span className="material-symbols-outlined text-primary">my_location</span>
                <span className="font-label-bold text-label-bold text-on-surface">Kecamatan Klojen</span>
              </li>
              <li className="flex items-center gap-3 border-b border-outline-variant pb-3">
                <span className="material-symbols-outlined text-primary">my_location</span>
                <span className="font-label-bold text-label-bold text-on-surface">Kecamatan Blimbing</span>
              </li>
              <li className="flex items-center gap-3 border-b border-outline-variant pb-3">
                <span className="material-symbols-outlined text-primary">my_location</span>
                <span className="font-label-bold text-label-bold text-on-surface">Kecamatan Lowokwaru</span>
              </li>
              <li className="flex items-center gap-3 border-b border-outline-variant pb-3">
                <span className="material-symbols-outlined text-primary">my_location</span>
                <span className="font-label-bold text-label-bold text-on-surface">Kecamatan Sukun</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">my_location</span>
                <span className="font-label-bold text-label-bold text-on-surface">Kecamatan Kedungkandang</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
