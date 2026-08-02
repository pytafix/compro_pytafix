export type PublicFaq = {
  id: string;
  question: string;
  answer: string;
};

export const DEFAULT_FAQS: PublicFaq[] = [
  {
    id: "estimasi-biaya",
    question: "Kapan saya menerima estimasi biaya servis?",
    answer:
      "Estimasi diberikan setelah pemeriksaan awal. Pengerjaan dan penggantian komponen dimulai setelah Anda menyetujui ruang lingkup serta biayanya.",
  },
  {
    id: "keamanan-data",
    question: "Apa yang perlu dilakukan untuk melindungi data sebelum servis?",
    answer:
      "Jika perangkat masih dapat digunakan, buat cadangan data dan keluar dari akun penting. Beri tahu tim jika pemeriksaan membutuhkan akses ke sistem; akses tidak boleh dilakukan di luar kebutuhan diagnosis yang Anda setujui.",
  },
  {
    id: "garansi-servis",
    question: "Bagaimana ketentuan garansi servis?",
    answer:
      "Cakupan dan durasi garansi mengikuti jenis pekerjaan, komponen, serta keterangan pada nota servis. Klaim untuk kendala yang sama akan diperiksa terlebih dahulu sebelum dinyatakan masuk garansi.",
  },
  {
    id: "antar-jemput",
    question: "Apakah tersedia layanan antar-jemput perangkat?",
    answer:
      "Ketersediaan antar-jemput bergantung pada area dan jadwal operasional. Kirim lokasi melalui WhatsApp agar tim dapat mengonfirmasi jangkauan, waktu, dan ketentuannya.",
  },
  {
    id: "cek-status",
    question: "Bagaimana cara memantau proses perbaikan?",
    answer:
      "Gunakan ID servis dan nomor WhatsApp yang dipakai saat booking pada halaman Cek Status Servis. Halaman tersebut menampilkan status terbaru tanpa menampilkan nama, alamat, atau catatan pribadi Anda.",
  },
];

export const SERVICE_PRINCIPLES = [
  {
    icon: "troubleshoot",
    title: "Periksa sebelum memperbaiki",
    description: "Keluhan dan kondisi perangkat diperiksa sebelum ruang lingkup pekerjaan ditetapkan.",
  },
  {
    icon: "receipt_long",
    title: "Biaya dikonfirmasi",
    description: "Estimasi dan pilihan komponen disampaikan untuk persetujuan sebelum pengerjaan.",
  },
  {
    icon: "query_stats",
    title: "Status dapat dilacak",
    description: "ID servis digunakan untuk melihat tahap perbaikan tanpa menampilkan data pribadi.",
  },
  {
    icon: "verified_user",
    title: "Ketentuan tertulis",
    description: "Cakupan garansi mengikuti pekerjaan, komponen, dan keterangan pada nota servis.",
  },
];

export type PublicServiceCopy = {
  title?: string;
  description: string;
  content: string;
};

/**
 * Public copy guardrail for records created by older seeds or edited before
 * the current evidence policy. Admin data remains editable, but public pages
 * must not repeat unsupported credentials, warranty, or inventory claims.
 */
export const PUBLIC_SERVICE_COPY: Record<string, PublicServiceCopy> = {
  "jual-sparepart": {
    title: "Jual Suku Cadang",
    description:
      "Katalog suku cadang laptop, HP, dan komputer. Kondisi, kompatibilitas, stok, serta ketentuan garansi dikonfirmasi untuk setiap item.",
    content: `## Cocokkan sebelum membeli

Kebutuhan suku cadang perlu dicocokkan dengan model perangkat, nomor komponen, dan hasil pemeriksaan. Kesamaan bentuk atau nama dagang belum tentu berarti kompatibel. Kirimkan model perangkat dan gejala yang muncul agar kebutuhan dapat dibahas lebih terarah.

## Informasi yang perlu dikonfirmasi

Sebelum transaksi, mintalah informasi tertulis tentang identitas komponen, kondisi (baru, bekas, atau rekondisi bila relevan), stok, harga, pemasangan, pengujian, serta ketentuan pengembalian atau garansi. Ketersediaan dan kecocokan dapat berubah, sehingga konfirmasi terakhir berlaku untuk item yang dipilih.

## Jika membutuhkan pemasangan

Pemeriksaan dapat membantu membedakan kerusakan komponen dari masalah kabel, konektor, atau bagian lain. Pengerjaan pemasangan dilakukan setelah ruang lingkup, estimasi biaya, risiko data, dan ketentuan layanan disetujui. Simpan nota dan rincian komponen untuk referensi setelah transaksi.`,
  },
  "jual-laptop": {
    title: "Jual Laptop",
    description:
      "Katalog laptop baru atau bekas yang sedang tersedia. Kondisi, kelengkapan, hasil pemeriksaan, dan ketentuan transaksi dicatat per unit.",
    content: `## Periksa unit yang dipilih

Ketersediaan laptop berubah sesuai stok. Periksa model dan spesifikasi, kondisi fisik, kelengkapan, kesehatan baterai, penyimpanan, layar, keyboard, port, konektivitas, serta hasil pengujian. Untuk unit bekas atau rekondisi, tanyakan bagian yang pernah diganti dan batas informasi yang dapat dibuktikan.

## Konfirmasi transaksi

Harga, metode pembayaran, status stok, dan ketentuan transaksi perlu dikonfirmasi untuk unit yang dipilih. Minta foto atau pemeriksaan langsung bila informasi katalog belum cukup. Pastikan data pribadi pada perangkat lama telah dihapus dan akun telah dikeluarkan sebelum serah-terima.

## Catatan setelah pembelian

Simpan nota, rincian unit, aksesori, dan ketentuan garansi yang tertulis. Jika muncul kendala, jelaskan gejala dan waktu kemunculannya; pemeriksaan ulang diperlukan sebelum cakupan layanan dapat ditentukan.`,
  },
  "service-hp": {
    title: "Servis HP",
    description:
      "Pemeriksaan dan perbaikan HP untuk kendala layar, baterai, port pengisian, perangkat lunak, atau komponen lain sesuai hasil diagnosis.",
    content: `## Ruang lingkup pemeriksaan

Pemeriksaan dimulai dari gejala, riwayat kejadian, dan kondisi fisik perangkat. Kendala layar, baterai, port pengisian, tombol, kamera, perangkat lunak, atau komponen lain dapat memiliki penyebab berbeda. Diagnosis tidak dapat dipastikan hanya dari foto atau satu gejala.

## Persetujuan sebelum pengerjaan

Hasil diagnosis, pilihan tindakan, komponen yang tersedia, estimasi biaya dan waktu, risiko data, serta ketentuan garansi dijelaskan sebelum pengerjaan dilanjutkan. Jangan menyerahkan kata sandi akun; bila akses sistem benar-benar diperlukan untuk pengujian, sepakati batas dan tujuannya.

## Setelah perbaikan

Mintalah penjelasan tentang pengujian yang dilakukan, komponen yang dipasang atau dikembalikan, serta rincian pada nota. Simpan cadangan data dan periksa fungsi penting ketika perangkat diterima. Cakupan garansi mengikuti pekerjaan, komponen, dan keterangan tertulis pada nota servis.`,
  },
  "service-laptop": {
    title: "Servis Laptop",
    description:
      "Pemeriksaan dan perbaikan laptop untuk kendala daya, layar, keyboard, pendinginan, perangkat lunak, serta opsi peningkatan SSD atau RAM.",
    content: `## Masalah yang perlu dibedakan

Ruang lingkup perbaikan ditentukan setelah laptop diperiksa. Kendala daya, layar, keyboard, pendinginan, sistem operasi, penyimpanan, dan memori dapat saling menyerupai. Catat kapan masalah terjadi, pesan kesalahan, bunyi indikator, perubahan setelah pembaruan, dan aksesori yang digunakan.

## Pilihan tindakan

Tim menjelaskan temuan, opsi tindakan, kebutuhan komponen, risiko data, estimasi waktu, biaya, dan cakupan garansi sebelum Anda menyetujui pengerjaan. Untuk upgrade SSD atau RAM, kompatibilitas model, cadangan data, dan rencana migrasi perlu dipastikan lebih dahulu.

## Serah-terima

Mintalah hasil pengujian dan rincian pekerjaan pada nota. Periksa fungsi daya, layar, input, konektivitas, pengisian, dan data yang disepakati ketika perangkat diterima. Cakupan garansi mengikuti pekerjaan, komponen, dan keterangan tertulis pada nota servis.`,
  },
};

export function getPublicServiceCopy<T extends { slug: string; description: string; content?: string | null }>(
  service: T
): T {
  const copy = PUBLIC_SERVICE_COPY[service.slug];
  return copy ? ({ ...service, ...copy } as T) : service;
}

export type ArticleReference = {
  label: string;
  url: string;
};

export const ARTICLE_REFERENCES: Record<string, ArticleReference[]> = {
  "cara-mengatasi-laptop-mati-total": [
    {
      label: "Microsoft Support — pemecahan masalah layar kosong di Windows",
      url: "https://support.microsoft.com/en-us/windows/troubleshooting-blank-screens-in-windows-51ef7b96-47cb-b454-fcab-fac643784457",
    },
  ],
  "tips-memilih-service-hp-terpercaya": [
    {
      label: "Apple Support — menyiapkan perangkat sebelum diservis",
      url: "https://support.apple.com/en-ie/109519",
    },
  ],
  "kapan-ganti-baterai-laptop": [
    {
      label: "Apple Support — servis dan daur ulang baterai",
      url: "https://support.apple.com/en-gb/108376",
    },
    {
      label: "Microsoft Support — merawat baterai di Windows",
      url: "https://support.microsoft.com/en-us/windows/caring-for-your-battery-in-windows-2db3e37f-5e7d-488e-9086-ed15320519e4",
    },
  ],
  "upgrade-ssd-ram-laptop-untuk-performa-maksimal": [
    {
      label: "Microsoft Support — penjelasan memori komputer",
      url: "https://support.microsoft.com/en-US/Windows/Experience/Compatibility/all-about-computer-memory",
    },
    {
      label: "Microsoft Support — tips meningkatkan performa PC di Windows",
      url: "https://support.microsoft.com/en-us/windows/tips-to-improve-pc-performance-in-windows-b3b3ef5b-5953-fb6a-2528-4bbed82fba96",
    },
  ],
  "cara-mencegah-laptop-overheating": [
    {
      label: "Intel — panduan menjaga pendinginan PC",
      url: "https://www.intel.com/content/dam/doc/best-practices/technology-tips-12-ways-to-keep-pc-cool.pdf",
    },
  ],
};

export type ArticleEditorialOverride = {
  title: string;
  excerpt: string;
  content: string;
};

export const ARTICLE_EDITORIAL_OVERRIDES: Record<string, ArticleEditorialOverride> = {
  "cara-mengatasi-laptop-mati-total": {
    title: "Laptop Mati Total: Pemeriksaan Aman Sebelum Servis",
    excerpt:
      "Langkah aman untuk membedakan masalah daya, layar, dan proses boot tanpa membongkar laptop secara berisiko.",
    content: `## Mulai dari gejala yang terlihat

Istilah “mati total” sering dipakai untuk beberapa kondisi berbeda: tidak ada lampu sama sekali, lampu menyala tetapi layar gelap, atau perangkat menyala lalu berhenti saat proses boot. Catat lampu indikator, suara kipas, bunyi peringatan, panas yang tidak biasa, dan kejadian sebelum masalah muncul.

## Pemeriksaan yang relatif aman

1. Lepaskan aksesori USB, kartu memori, dan perangkat eksternal.
2. Periksa stopkontak, kabel, serta adaptor dari kerusakan fisik. Gunakan adaptor pembanding hanya jika spesifikasinya benar-benar sesuai.
3. Bila perangkat mendukungnya, lakukan prosedur pelepasan daya sesuai panduan pabrikan.
4. Jika lampu daya menyala tetapi layar gelap, naikkan kecerahan dan coba pintasan pemulihan layar yang direkomendasikan sistem operasi.
5. Catat pola indikator atau bunyi berulang; informasi ini membantu diagnosis.

Jangan membuka casing, menghubungkan sumber daya yang tidak sesuai, atau terus menyalakan perangkat jika ada bau hangus, cairan, baterai mengembang, atau panas berlebihan.

## Data dan keputusan servis

Jika perangkat sempat menyala, buat cadangan data sebelum tindakan lebih lanjut. Pemeriksaan teknisi seharusnya menghasilkan penjelasan tentang temuan, opsi tindakan, risiko data, ketersediaan komponen, dan estimasi biaya. Pengerjaan baru dilanjutkan setelah Anda menyetujuinya.

Gejala yang sama dapat memiliki penyebab berbeda, sehingga artikel ini tidak dapat memastikan komponen yang rusak tanpa pemeriksaan.`,
  },
  "tips-memilih-service-hp-terpercaya": {
    title: "Cara Memilih Tempat Servis HP dengan Lebih Aman",
    excerpt:
      "Gunakan bukti proses, estimasi tertulis, perlindungan data, dan ketentuan garansi—bukan klaim pemasaran semata.",
    content: `## Nilai prosesnya, bukan hanya janji

Tempat servis yang layak dipertimbangkan mampu menjelaskan alur penerimaan perangkat, pemeriksaan, persetujuan biaya, pencatatan komponen, pengujian, dan pengembalian. Mintalah estimasi tertulis dan tanyakan apa yang terjadi bila ditemukan kerusakan tambahan.

## Pertanyaan penting sebelum menyerahkan HP

- Apakah pengerjaan menunggu persetujuan biaya?
- Bagaimana kondisi fisik dan aksesori dicatat saat diterima?
- Apakah pilihan komponen, kondisi, dan asalnya dijelaskan?
- Apakah komponen lama dapat dikembalikan bila tidak diperlukan untuk klaim pemasok?
- Apa cakupan, durasi, dan pengecualian garansi pada nota?
- Siapa yang dapat mengakses perangkat dan untuk pengujian apa?

Cadangkan data, keluar dari akun penting, aktifkan mode perbaikan bila tersedia, dan jangan membagikan kata sandi akun. Jika akses sistem benar-benar diperlukan, sepakati batasnya.

## Tanda untuk berhati-hati

Hindari keputusan tergesa-gesa bila harga final diberikan tanpa pemeriksaan, penggantian komponen dilakukan tanpa persetujuan, kondisi perangkat tidak dicatat, atau garansi hanya berupa janji lisan. Rating dan testimoni dapat membantu, tetapi periksa rincian, konsistensi, serta sumbernya.

Pytafix menggunakan alur pemeriksaan dan persetujuan estimasi; kemampuan, ketersediaan komponen, waktu, dan cakupan garansi tetap perlu dikonfirmasi untuk kasus Anda.`,
  },
  "kapan-ganti-baterai-laptop": {
    title: "Kapan Baterai Laptop Perlu Diperiksa atau Diganti?",
    excerpt:
      "Kenali penurunan kapasitas, mati mendadak, kegagalan pengisian, dan tanda baterai mengembang beserta langkah amannya.",
    content: `## Penurunan daya belum selalu berarti baterai rusak

Waktu pakai dapat berkurang karena usia baterai, beban aplikasi, pengaturan daya, suhu, adaptor, port pengisian, atau masalah sistem. Bandingkan pemakaian pada kondisi serupa dan gunakan laporan kesehatan baterai yang disediakan sistem operasi bila tersedia.

## Tanda yang perlu diperiksa

- Persentase turun tidak wajar atau perangkat mati saat indikator masih menunjukkan daya.
- Baterai tidak mengisi meskipun adaptor dan sumber listrik sesuai.
- Laptop hanya bekerja ketika terhubung ke adaptor.
- Sistem menampilkan rekomendasi servis baterai.
- Casing, trackpad, atau keyboard terangkat.

Baterai yang mengembang adalah masalah keselamatan. Hentikan penggunaan, jangan ditekan atau ditusuk, lepaskan dari sumber listrik jika aman, dan ikuti panduan pabrikan untuk penanganan serta daur ulang.

## Sebelum memutuskan penggantian

Periksa kondisi adaptor, kabel, konektor, port, pembaruan firmware, dan laporan kapasitas. Angka kapasitas adalah salah satu petunjuk, bukan satu-satunya keputusan. Kompatibilitas baterai pengganti harus mengikuti model perangkat dan spesifikasi pabrikan.

Mintalah informasi tertulis tentang identitas komponen, kondisi, harga, pekerjaan pemasangan, pengujian, dan garansi. Lama pengerjaan bergantung pada desain laptop, stok komponen, dan hasil pemeriksaan.`,
  },
  "upgrade-ssd-ram-laptop-untuk-performa-maksimal": {
    title: "Panduan Memeriksa Kelayakan Upgrade SSD dan RAM",
    excerpt:
      "Tentukan sumber perlambatan, kompatibilitas perangkat, rencana cadangan, dan manfaat upgrade sebelum membeli komponen.",
    content: `## Diagnosis kebutuhan lebih dulu

SSD dapat membantu waktu boot dan akses berkas ketika penyimpanan menjadi hambatan. RAM membantu ketika aplikasi kehabisan memori dan sistem sering memindahkan data ke penyimpanan. Upgrade tidak otomatis memperbaiki panas berlebih, prosesor yang terlalu lambat, perangkat lunak bermasalah, atau kerusakan komponen.

Periksa penggunaan CPU, memori, dan penyimpanan saat masalah muncul. Pastikan juga ruang kosong, aplikasi awal, pembaruan sistem, dan kesehatan penyimpanan.

## Kompatibilitas yang harus dipastikan

- Apakah RAM dapat dilepas atau disolder?
- Berapa jenis, kecepatan, kapasitas maksimum, dan konfigurasi kanal yang didukung?
- Apakah slot penyimpanan menggunakan SATA, M.2 SATA, atau NVMe?
- Apakah panjang modul, key, dan generasi antarmuka sesuai?
- Apakah penggantian memengaruhi garansi pabrikan?

Gunakan manual servis atau dokumentasi resmi model perangkat. Kesamaan bentuk tidak selalu berarti kompatibel.

## Lindungi data

Buat cadangan yang dapat diuji sebelum kloning atau instalasi ulang. Tentukan apakah penyimpanan lama akan dikembalikan, dihapus, atau tetap dipakai. Jangan menganggap proses kloning selalu berhasil pada media yang mulai rusak.

Biaya dan manfaat bergantung pada model laptop, komponen, kapasitas, merek, kondisi, serta pekerjaan migrasi data. Minta rincian komponen dan estimasi sebelum pengerjaan.`,
  },
  "cara-mencegah-laptop-overheating": {
    title: "Laptop Terlalu Panas: Pencegahan dan Tanda Bahaya",
    excerpt:
      "Pelajari cara menjaga ventilasi, mengurangi beban, memantau gejala, dan menentukan kapan laptop perlu diperiksa.",
    content: `## Panas adalah gejala, bukan diagnosis

Laptop dapat terasa hangat saat bekerja berat. Masalah perlu dicurigai bila performa turun tajam, kipas terus bekerja keras, perangkat mati sendiri, muncul bau tidak biasa, atau area tertentu terlalu panas. Batas suhu berbeda menurut model dan komponen, jadi gunakan dokumentasi pabrikan sebagai acuan.

## Langkah pencegahan

1. Gunakan laptop di permukaan keras dan rata agar ventilasi tidak tertutup.
2. Bersihkan debu pada bukaan luar tanpa mendorong kotoran masuk ke perangkat.
3. Kurangi aplikasi latar dan periksa proses yang menggunakan CPU atau GPU secara terus-menerus.
4. Gunakan profil daya yang sesuai kebutuhan.
5. Pasang pembaruan sistem, firmware, dan driver dari sumber resmi.
6. Gunakan adaptor dengan spesifikasi yang sesuai.

Jangan menyemprotkan cairan, memasukkan benda ke kipas, atau membongkar baterai. Penggantian pasta termal dan pembersihan internal memerlukan prosedur yang sesuai dengan model perangkat.

## Kapan perlu berhenti menggunakan perangkat

Matikan perangkat jika ada asap, bau hangus, baterai mengembang, cairan, suara mekanis tidak biasa, atau panas yang membuat casing berubah bentuk. Lepaskan daya bila aman dan minta pemeriksaan.

Teknisi seharusnya menjelaskan sumber panas yang ditemukan, tindakan yang disarankan, risiko, kebutuhan komponen, dan estimasi biaya sebelum pengerjaan.`,
  },
};

export const PUBLIC_REVIEWED_SERVICE_SLUGS = new Set(Object.keys(PUBLIC_SERVICE_COPY));
export const PUBLIC_REVIEWED_ARTICLE_SLUGS = new Set(Object.keys(ARTICLE_EDITORIAL_OVERRIDES));

export function isPublicReviewedServiceSlug(slug: string): boolean {
  return PUBLIC_REVIEWED_SERVICE_SLUGS.has(slug);
}

export function isPublicReviewedArticleSlug(slug: string): boolean {
  return PUBLIC_REVIEWED_ARTICLE_SLUGS.has(slug);
}

/**
 * Admin FAQ records are held out of public rendering until an editorial
 * review status exists. This prevents legacy, unverified answers from
 * bypassing the public copy guardrails.
 */
export function getPublicFaqs(): PublicFaq[] {
  return DEFAULT_FAQS;
}
