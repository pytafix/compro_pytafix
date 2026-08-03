# Riset Programmatic SEO, Local SEO, AEO, dan GEO — Malang Raya

Tanggal riset: 3 Agustus 2026
Domain: `https://www.pytafix.web.id`

## Keputusan arsitektur

Jangan menerbitkan matriks `4 layanan × 41 kecamatan = 164 halaman` sekaligus. Data internal belum menyediakan bukti unik per kecamatan, dan halaman lama menunjukkan risiko yang sama: 40 baris lokasi/service lama sangat mirip (rata-rata kemiripan 0,969) serta tidak memiliki konten khusus lokasi. Google mendefinisikan doorway abuse dan scaled content abuse sebagai pola halaman serupa yang dibuat terutama untuk menangkap kueri, bukan memberi nilai baru.

Rilis yang aman:

1. Satu hub regional yang mencakup seluruh wilayah administratif Malang Raya dan menjelaskan batas layanan secara jujur.
2. Satu halaman pilot untuk Batu karena ada sinyal first-party terkuat: kueri `service hp batu` memperoleh 9 impresi pada posisi rata-rata 5 dalam GSC (1 Mei–2 Agustus 2026), sementara klik masih 0.
3. Empat layanan aktif tetap menjadi halaman kanonis. Halaman pilot menautkan ke semuanya; tidak membuat empat halaman Batu yang saling tumpang tindih.
4. Kecamatan lain masuk direktori hub, bukan halaman indexable, sampai ada bukti permintaan dan bahan unik: riwayat servis, foto pekerjaan, rute/opsi pengambilan yang benar-benar tersedia, atau data lokal yang bisa diverifikasi.

## Sumber layanan yang benar-benar tersedia

Sumber publik saat ini adalah `ServiceContent` Prisma/admin, bukan Sanity. Audit live pada 3 Agustus 2026 menemukan 44 baris: 4 aktif dan direview untuk publik, 40 baris lokasi lama nonaktif. Empat layanan aktif:

- Servis HP (`service-hp`)
- Servis Laptop (`service-laptop`)
- Jual Suku Cadang (`jual-sparepart`)
- Jual Laptop (`jual-laptop`)

Keempat copy publik memiliki konten editorial terkontrol; baris lokasi lama tidak dipakai sebagai sumber copy.

## Cakupan wilayah yang diverifikasi

Malang Raya dipakai sebagai istilah regional untuk Kota Malang, Kota Batu, dan Kabupaten Malang. Sumber pemerintah/BPS yang dipakai untuk daftar administratif:

- Kota Malang: 5 kecamatan — Blimbing, Klojen, Kedungkandang, Lowokwaru, Sukun.
- Kota Batu: 3 kecamatan — Batu, Junrejo, Bumiaji.
- Kabupaten Malang: 33 kecamatan — Donomulyo, Kalipare, Pagak, Bantur, Gedangan, Sumbermanjing Wetan, Dampit, Tirtoyudo, Ampelgading, Poncokusumo, Wajak, Turen, Bululawang, Gondanglegi, Pagelaran, Kepanjen, Sumberpucung, Kromengan, Ngajum, Wonosari, Wagir, Pakisaji, Tajinan, Tumpang, Pakis, Jabung, Lawang, Singosari, Karangploso, Dau, Pujon, Ngantang, Kasembon.

Sumber: [BPK Jawa Timur — Kabupaten Malang dan Malang Raya](https://jatim.bpk.go.id/kabupaten-malang/), [LPPD Kabupaten Malang — 33 kecamatan](https://web-admin.malangkab.go.id/5/uploads/dokumen/malangkab-pusat-opd%403507-Narasi%20LPPD%20Tahun%202022.pdf), [Profil Statistik Kota Malang — 5 kecamatan](https://satudata.malangkota.go.id/file_publikasi/Buku%20Profil%20Statistik%20Sektoral%202021_2025-07-08%2001-56-15.pdf), dan [Pemerintah Kota Batu — 3 kecamatan](https://batukota.go.id/Portal/detail_b/5291).

Daftar administratif tidak otomatis berarti Pytafix memiliki cabang atau kunjungan di setiap kecamatan. Copy harus tetap menggunakan pola “konfirmasi area/jadwal melalui WhatsApp”.

## Bukti demand dan kompetisi

- First-party GSC: hanya satu kueri geo yang terlihat pada periode riset, yaitu `service hp batu`; belum ada bukti first-party untuk 40 kecamatan lain.
- SERP publik menunjukkan kompetisi dan intent lokal untuk `service laptop Malang`, `service laptop Batu`, `service laptop Singosari`, `service hp Kepanjen`, dan `service laptop Lawang`. Ini cukup untuk prioritas riset lanjutan, bukan bukti volume atau bukti bahwa Pytafix sudah beroperasi di lokasi tersebut.
- Bing Webmaster keyword API tidak dapat dipakai karena kredensial invalid; tidak ada volume keyword pihak ketiga yang diklaim dalam keputusan ini.

## SEO, AEO, dan GEO guardrails

- Halaman harus server-rendered, punya title/H1/meta unik, canonical self, breadcrumb, dan internal link ke layanan serta kontak.
- Hub regional menjadi jawaban yang bisa dikutip: definisi Malang Raya, alamat resmi, cara konfirmasi area, daftar layanan, dan batas klaim dalam paragraf mandiri.
- `llms.txt` hanya membantu discovery agen; bukan pengganti indexing, sitemap, atau GSC.
- Schema harus mengikuti konten terlihat. Hub memakai `CollectionPage`/`ItemList`; halaman pilot memakai `Service`/`BreadcrumbList` hanya untuk layanan yang benar-benar dijelaskan.
- Jangan membuat FAQPage schema baru untuk mengejar rich result komersial; gunakan heading dan elemen FAQ yang terlihat untuk pemahaman pengguna/AEO.
- Tidak ada klaim “cabang”, “teknisi di lokasi”, “bisa ditunggu”, rating, sertifikasi, atau waktu tempuh tanpa bukti owner.

## Rencana rollout

1. Rilis hub `/area-layanan` + daftar 41 kecamatan.
2. Rilis pilot `/area-layanan/batu` dan alihkan URL legacy `*-batu` ke hub pilot agar sinyal GSC lama tidak hilang ke halaman generik.
3. Submit/inspeksi hanya hub dan pilot setelah deploy; tunggu recrawl 2–4 minggu.
4. Tambah area berikutnya hanya bila ada query GSC/Bing, permintaan booking, atau bukti first-hand yang cukup. Setiap halaman baru harus melewati swap test, copy review, dan crawl.

## Batasan

Riset ini tidak mengklaim volume keyword absolut, ranking map pack, atau ketersediaan layanan lapangan per kecamatan. Data tersebut memerlukan GBP Insights/geo-grid dan konfirmasi operasional owner.
