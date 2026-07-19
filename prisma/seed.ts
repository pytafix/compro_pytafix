import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up database...');
  await prisma.serviceContent.deleteMany({});
  await prisma.sparepart.deleteMany({});
  await prisma.promo.deleteMany({});
  await prisma.portfolio.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.serviceRequest.deleteMany({});
  await prisma.setting.deleteMany({});
  console.log('Database cleaned.');

  console.log('Creating services...');
  const services = [
    {
      slug: 'jual-sparepart',
      title: 'Jual Sparepart',
      description: 'Suku cadang original laptop, HP, dan komputer dengan garansi keaslian. Tersedia RAM, SSD, baterai, LCD, keyboard, charger, dan komponen lainnya.',
      icon: 'inventory_2',
      isActive: true,
    },
    {
      slug: 'jual-laptop',
      title: 'Jual Laptop',
      description: 'Laptop baru dan bekas berkualitas: MacBook, Windows, gaming, ultrabook. Semua unit dicek kondisi, bersertifikat, dan bergaransi.',
      icon: 'laptop_mac',
      isActive: true,
    },
    {
      slug: 'service-hp',
      title: 'Service HP',
      description: 'Perbaikan HP semua merk: ganti LCD, baterai, charging port, motherboard, software, dan kerusakan cairan. Teknisi bersertifikat, bergaransi.',
      icon: 'smartphone',
      isActive: true,
    },
    {
      slug: 'service-laptop',
      title: 'Service Laptop',
      description: 'Servis laptop komprehensif: ganti keyboard, LCD, motherboard, fan, thermal paste, install ulang Windows/macOS, upgrade SSD/RAM. Garansi resmi.',
      icon: 'computer',
      isActive: true,
    },
  ];

  // Location-specific services for SEO (Malang, Batu, and kecamatan)
  const locations = [
    { city: 'malang', name: 'Malang' },
    { city: 'batu', name: 'Batu' },
    { city: 'blimbing', name: 'Blimbing' },
    { city: 'lowokwaru', name: 'Lowokwaru' },
    { city: 'klojen', name: 'Klojen' },
    { city: 'sukun', name: 'Sukun' },
    { city: 'kedungkandang', name: 'Kedungkandang' },
    { city: 'kepanjen', name: 'Kepanjen' },
    { city: 'singosari', name: 'Singosari' },
    { city: 'lawang', name: 'Lawang' },
  ];

  const baseServices = [
    { baseSlug: 'service-hp', title: 'Service HP', icon: 'smartphone' },
    { baseSlug: 'service-laptop', title: 'Service Laptop', icon: 'computer' },
    { baseSlug: 'jual-sparepart', title: 'Jual Sparepart', icon: 'inventory_2' },
    { baseSlug: 'jual-laptop', title: 'Jual Laptop', icon: 'laptop_mac' },
  ];

  const locationServices = [];
  for (const loc of locations) {
    for (const base of baseServices) {
      locationServices.push({
        slug: `${base.baseSlug}-${loc.city}`,
        title: `${base.title} ${loc.name}`,
        description: `${base.title} terpercaya di ${loc.name} dan sekitarnya. Teknisi bersertifikat, sparepart original, bergaransi resmi. Gratis antar-jemput area ${loc.name}.`,
        icon: base.icon,
        isActive: true,
      });
    }
  }

  const allServices = [...services, ...locationServices];

  for (const svc of allServices) {
    await prisma.serviceContent.create({ data: svc });
    console.log(`Created: ${svc.title}`);
  }

  console.log('Creating articles...');
  const articles = [
    {
      slug: 'cara-mengatasi-laptop-mati-total',
      title: 'Cara Mengatasi Laptop Mati Total: Panduan Lengkap & Solusi',
      excerpt: 'Laptop tiba-tiba mati total dan tidak mau nyala? Jangan panik. Simak penyebab umum dan langkah troubleshooting yang bisa Anda coba sebelum ke service center.',
      content: `## Penyebab Laptop Mati Total

Laptop mati total bisa disebabkan oleh berbagai hal, mulai dari yang sederhana hingga kerusakan hardware serius:

### 1. Masalah Daya (Paling Umum)
- **Baterai habis total** - Coba charge minimal 30 menit sebelum dicoba nyalakan
- **Charger rusak/kolom** - Cek indikator LED charger, coba charger lain
- **Port charging rusak** - Coba gerakkan kabel, lihat apakah indikator charging berkedip

### 2. Masalah Hardware
- **RAM bermasalah** - Coba buka casing, bersihkan kontak RAM dengan penghapus, pasang kembali
- **Motherboard short** - Tanda: laptop panas tapi layar gelap, indikator power menyala tapi tidak boot
- **IC Power/Charging rusak** - Butuh perbaikan level board

## Langkah Troubleshooting Mandiri

### Step 1: Hard Reset (Power Drain)
1. Cabut charger & baterai (jika removable)
2. Tekan tombol power 30-60 detik
3. Pasang baterai & charger, coba nyalakan

### Step 2: Cek Indikator
- **LED power menyala** tapi layar gelap → Masalah RAM/VGA/Display
- **LED charging tidak menyala** → Masalah charger/port charging/IC power
- **Semua LED mati** → Masalah motherboard/baterai short

### Step 3: Cek Eksternal
- Hubungkan ke monitor eksternal (HDMI/VGA)
- Jika monitor eksternal nyala → Masalah LCD/kabel flex/hinge

## Kapan Harus ke Service Center?

✅ **Bawa ke Pytafix jika:**
- Sudah coba hard reset tapi tetap mati
- Ada bau hangus/asap dari laptop
- Laptop pernah terjatuh/terkena air
- Indikator charging berkedip tidak normal
- Butuh diagnosa cepat & akurat

## Kenapa Pilih Pytafix?

- **Diagnosa gratis** jika servis di tempat
- **Teknisi bersertifikat** dengan pengalaman 5+ tahun
- **Garansi 30-90 hari** tergantung jenis perbaikan
- **Sparepart original** dengan garansi keaslian
- **Antar-jemput gratis** area Malang Raya

**Jangan biarkan laptop mati total menghentikan produktivitas Anda. Hubungi Pytafix sekarang untuk konsultasi gratis!**`,
      imageUrl: '/images/og-banner.png',
      author: 'Tim Teknisi Pytafix',
      publishedAt: new Date('2026-01-15'),
    },
    {
      slug: 'tips-memilih-service-hp-terpercaya',
      title: 'Tips Memilih Service HP Terpercaya di Malang: Jangan Sampai Dikhianati!',
      excerpt: 'Banyak service HP abal-abal yang ganti sparepart palsu atau cacat. Simak ciri-ciri service HP terpercaya agar HP Anda aman dan bergaransi.',
      content: `## Bahaya Service HP Sembarangan

Banyak kasus HP dikembalikan lebih rusak setelah service di tempat tidak jelas:
- Sparepart diganti dengan bekas/kw super
- IC dikupas/dijual kembali
- Data pribadi bocor
- Garansi palsu/tidak bertanggung jawab

## Ciri-Ciri Service HP Terpercaya

### 1. **Transparan Soal Harga & Sparepart**
- Menunjukkan sparepart asli sebelum dipasang
- Harga sparepart & jasa service terpisah, tidak "paket" misterius
- Bisa minta sparepart yang diganti (bukti transparansi)

### 2. **Teknisi Bersertifikat & Bengkel Resmi**
- Ada sertifikat pelatihan resmi (Apple, Samsung, dll)
- Bengkel memiliki alamat kantor jelas, bukan cuma "service antar"
- Terdaftar sebagai usaha legal (NPWP, SIUP)

### 3. **Garansi Tertulis & Jelas**
- Surat garansi fisik/digital dengan stempel & tanda tangan
- Durasi garansi jelas (minimal 30 hari untuk service, 3-6 bulan sparepart)
- Syarat garansi tidak memusingkan (tidak ada "garansi void jika dibuka teknisi lain")

### 4. **Prosedur Kerja Standar (SOP)**
- Diagnosa dulu, baru beri solusi & harga
- Foto/video kondisi HP sebelum & sesudah service
- Laporan service detail (apa yang diganti, tes apa saja)

### 5. **Reputasi & Review Nyata**
- Google Review 4.8+ dengan review detail (bukan bintang saja)
- Testimoni video/kustomer nyata, bukan screenshot WA
- Sudah lama beroperasi (minimal 2-3 tahun)

## Red Flag: JANGAN Service Di Sini!

🚫 **Harga terlalu murah** (contoh: ganti LCD iPhone 500rb - mustahil original)
🚫 **Tidak mau tunjuk sparepart** sebelum dipasang
🚫 **Minta HP dibawa pulang dulu** tanpa diagnosa
🚫 **Tidak ada alamat bengkel jelas** (hanya meet di mall/cafe)
🚫 **Garansi "seumur hidup" tapi tidak tertulis**
🚫 **Teknisi tidak mau jelaskan kerusakannya**

## Pytafix: Service HP Terpercaya di Malang

✅ **Transparan** - Tunjuk sparepart asli sebelum dipasang
✅ **Bersertifikat** - Teknisi training resmi Apple, Samsung, Xiaomi
✅ **Garansi Resmi** - 30 hari service, 3-6 bulan sparepart, tertulis
✅ **SOP Ketat** - Diagnosa gratis, foto before/after, laporan detail
✅ **Reputasi 4.9/5** - 1000+ review Google, testimoni video nyata
✅ **Antar-Jemput Gratis** - Seluruh Malang Raya

**Jangan risikokan HP Anda di tempat abal-abal. Bawa ke Pytafix untuk service aman, transparan, & bergaransi resmi!**`,
      imageUrl: '/images/og-banner.png',
      author: 'Tim Teknisi Pytafix',
      publishedAt: new Date('2026-02-10'),
    },
    {
      slug: 'kapan-ganti-baterai-laptop',
      title: 'Kapan Harus Ganti Baterai Laptop? 5 Tanda Wajib Anda Tahu',
      excerpt: 'Baterai laptop drop cepat, ngumpet, atau tidak mau charge? Jangan biarkan mengganggu aktivitas. Kenali 5 tanda wajib ganti baterai laptop.',
      content: `## 5 Tanda Wajib Ganti Baterai Laptop

### 1. **Umur Baterai Sudah > 2-3 Tahun**
- Baterai Li-ion umumnya 300-500 siklus charge (≈ 2-3 tahun pemakaian normal)
- Cek di Windows: \`powercfg /batteryreport\` → lihat "Design Capacity" vs "Full Charge Capacity"
- Jika kapasitas < 60% dari design → waktunya diganti

### 2. **Baterai Drop Cepat (Fast Drain)**
- Dari 100% ke 20% dalam < 2 jam pemakaian ringan
- Persentase loncat-loncat (misal 45% tiba-tiba jadi 12%)
- Laptop mati mendadak meski indikator masih 20-30%

### 3. **Tidak Mau Charge / Charging Lambat**
- "Plugged in, not charging" terus menerus
- Charge 1 jam tapi hanya naik 5-10%
- Harus posisi kabel tertentu baru charge (port longgar)

### 4. **Baterai Mengembang (Bloated) - BAHAYA!**
- Cek bottom case: apakah melengkung/terdengar "krek" saat ditekan?
- Trackpad/keyboard terangkat karena dorongan baterai
- **SEGERA GANTI** - Risiko ledakan/kebakaran!

### 4. **Laptop Hanya Hidup Pas Colok Charger**
- Cabut charger → mati total instan
- Baterai 0% meski sudah semalaman charge
- Indikator baterai selalu 0% atau "No battery detected"

## Tips Memperpanjang Umur Baterai

✅ Jangan biarkan 0% terlalu lama (charge saat 20-30%)
✅ Jangan selalu 100% colok charger (ideal 40-80%)
✅ Hindari panas berlebih (jangan main game sambil charge)
✅ Kalibrasi baterai tiap 1-2 bulan (charge penuh → pakai sampai 5% → charge penuh)

## Ganti Baterai di Pytafix: Aman & Original

- **Baterai Original/OEM** dengan garansi keaslian
- **Garansi 3-6 bulan** pemasangan + produk
- **Gratis cek health battery** sebelum & sesudah ganti
- **Antar-jemput gratis** area Malang Raya
- **Proses cepat** 30-60 menit (baterai removable) / 1-2 jam (internal)

**Baterai ngumpet/cepat habis? Bawa ke Pytafix untuk cek gratis & ganti original bergaransi!**`,
      imageUrl: '/images/og-banner.png',
      author: 'Tim Teknisi Pytafix',
      publishedAt: new Date('2026-03-05'),
    },
    {
      slug: 'upgrade-ssd-ram-laptop-untuk-performa-maksimal',
      title: 'Upgrade SSD & RAM Laptop: Cara Termurah Bikin Laptop Lompat 3x Lebih Cepat',
      excerpt: 'Laptop lemot, booting lama, aplikasi sering not responding? Upgrade SSD + RAM adalah solusi paling hemat dibanding beli laptop baru. Simak panduannya!',
      content: `## Kenapa Upgrade SSD + RAM Paling Efektif?

### HDD vs SSD: Perbedaan Langit & Bumi
| Aspek | HDD (Hard Disk Drive) | SSD (Solid State Drive) |
|-------|----------------------|------------------------|
| Kecepatan baca/tulis | 80-160 MB/s | **500-7000 MB/s** (NVMe) |
| Waktu boot Windows | 60-120 detik | **10-20 detik** |
| Buka aplikasi berat | 10-30 detik | **2-5 detik** |
| Ketahanan guncangan | Rendah (bagian bergerak) | **Tinggi (tanpa bagian bergerak)** |
| Suara | Berdesis/bergetar | **Diam total** |

### RAM: Multitasking Tanpa Lag
- 4 GB → **Minimal 8 GB** (standar 2024)
- 8 GB → **16 GB** (untuk editing, gaming, multitask berat)
- Dual channel (2x8GB) > Single channel (1x16GB)

## Laptop Anda Bisa Upgrade?

### Cek Spesifikasi:
1. **Slot RAM** - Banyak laptop modern RAM soldered (tidak bisa upgrade)
2. **Slot SSD** - M.2 NVMe / SATA / keduanya
3. **Maksimal support** - Cek manual/situs vendor

### Tools Cek Cepat:
- **Crucial System Scanner** (web) - Scan otomatis rekomendasi upgrade
- **CPU-Z** (software) - Lihat slot & tipe RAM/SSD saat ini

## Estimasi Harga Upgrade (Pytafix)

| Upgrade | Harga Estimasi | Garansi |
|---------|---------------|---------|
| SSD NVMe 500GB | Rp 450.000 - 650.000 | 3-5 tahun (brand) |
| SSD NVMe 1TB | Rp 750.000 - 1.100.000 | 3-5 tahun |
| RAM DDR4 8GB | Rp 350.000 - 500.000 | Seumur hidup (limited) |
| RAM DDR4 16GB (2x8) | Rp 700.000 - 1.000.000 | Seumur hidup |
| **Paket SSD 500GB + RAM 8GB** | **Rp 850.000** | **Termurah di Malang** |

## Proses Upgrade di Pytafix

1. **Cek Kompatibilitas Gratis** - Bawa laptop, kami scan gratis
2. **Backup Data** - Kami bantu backup data penting (optional)
3. **Upgrade + Clone OS** - Clone Windows ke SSD baru (data & aplikasi tetap utuh)
4. **Testing Full** - Benchmark, stress test, cek suhu
5. **Garansi Pemasangan** - 30 hari garansi kerja

## Kapan Harus Upgrade?

✅ Booting > 60 detik
✅ Buka Chrome + Excel + Spotify → lag/not responding
✅ Editing video/foto lambat rendering
✅ Gaming FPS drop tiba-tiba (bukan GPU)
✅ "Low memory" warning sering muncul

**Laptop lemot? Jangan beli baru dulu! Upgrade SSD+RAM di Pytafix mulai Rp 850rb - performa naik 3x, hemat 70% dibanding beli baru!**`,
      imageUrl: '/images/og-banner.png',
      author: 'Tim Teknisi Pytafix',
      publishedAt: new Date('2026-03-20'),
    },
    {
      slug: 'cara-mencegah-laptop-overheating',
      title: 'Cara Mencegah Laptop Overheating: 7 Tips Ampuh Agar Awet & Tidak Mati Mendadak',
      excerpt: 'Laptop panas berlebihan bikin performa turun, baterai cepat habis, hingga mati total. Simak 7 cara mencegah overheating yang mudah dilakukan sendiri.',
      content: `## Kenapa Laptop Overheating Berbahaya?

- **Throttling** - CPU/GPU naik turun kecepatan → lag, FPS drop
- **Degradasi Baterai** - Panas = musuh utama baterai Li-ion
- **Kegagalan Hardware** - Solder BGA retak, pasta kering, kapatisator bocor
- **Mati Mendadak** - Proteksi termal mematikan laptop paksa

## 7 Cara Mencegah Overheating (DIY)

### 1. **Bersihkan Debu & Ganti Thermal Paste (Tiap 6-12 Bulan)**
- Debu menyumbat kipas & heatsink → sirkulasi air terhenti
- Thermal paste kering → transfer panas CPU/GPU ke heatsink gagal
- **Pytafix: Bersih internal + ganti thermal paste premium hanya Rp 150.000**

### 2. **Gunakan Cooling Pad / Laptop Stand**
- Angkat bagian belakang laptop → aliran udara lebih baik
- Cooling pad dengan kipas 120mm+ efektif turun 5-15°C
- Hindari pakai di atas kasur/sofa/tekun (menutup ventilasi)

### 3. **Atur Power Management**
- Windows: Power Plan → "Balanced" atau "Power Saver" (bukan High Performance)
- Matikan "Turbo Boost" di BIOS jika tidak butuh performa maksimal
- Undervolting (advanced) - bisa turun 10-20°C tanpa kehilangan performa

### 4. **Batasi Proses Background**
- Task Manager → matikan startup apps tidak perlu
- Browser: batasi tab, gunakan extension "The Great Suspender"
- Update driver GPU & chipset ke versi terbaru

### 5. **Cek Suhu Secara Berkala**
- **Normal:** 35-50°C (idle), 60-80°C (load)
- **Waspada:** > 85°C (load), > 95°C (critical - akan throttle/mati)
- Tools: HWMonitor, Core Temp, MSI Afterburner

### 6. **Hindari Overcharging & Main Sambil Charge**
- Main game berat sambil charge = panas ganda (baterai + CPU/GPU)
- Cabut charger saat baterai 80-90% jika main game
- Gunakan charger original (charger murahan sering bikin panas)

### 7. **Service Berkala ke Bengkel Resmi**
- Bersih internal lengkap (kipas, heatsink, motherboard)
- Cek kondisi kipas (bising/bergetar = bearing aus)
- Cek pasta thermal & pad thermal GPU/VRAM

## Tanda Butuh Service Darurat

🚨 Suhu > 95°C saat load normal
🚨 Kipas berdesis keras / tidak berputar
🚨 Laptop mati sendiri saat main game/browsing berat
🚨 Bau hangus/asap dari ventilasi
🚨 Keyboard/trackpad terasa sangat panas

## Service Pencegahan Overheating di Pytafix

**Paket Perawatan Rutin (6-12 bulan sekali):**
✅ Buka casing & bersih internal total
✅ Ganti thermal paste CPU & GPU (premium grade)
✅ Ganti thermal pad VRAM/VRM jika perlu
✅ Bersih & cek kipas (lumas bearing / ganti kipas)
✅ Cek suhu stress test 30 menit
✅ **Hanya Rp 150.000** (termasuk thermal paste premium)

**Laptop panas & lemot? Bawa ke Pytafix untuk perawatan lengkap - awet, sejuk, performa maksimal!**`,
      imageUrl: '/images/og-banner.png',
      author: 'Tim Teknisi Pytafix',
      publishedAt: new Date('2026-04-01'),
    },
  ];

  for (const art of articles) {
    await prisma.article.create({ data: art });
    console.log(`Created article: ${art.title}`);
  }

  console.log('All done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });