# Kebijakan Keamanan (Security Policy)

Dokumen ini menguraikan kebijakan keamanan khusus untuk aplikasi **Pemilos App SMAN 2 Jonggol** dan prosedur pelaporan kerentanan. Integritas sistem, kerahasiaan suara (*vote anonymity*), dan keamanan data pemilih adalah prioritas mutlak dalam proyek ini.

## Versi yang Didukung

Sistem Pemilos dikelola secara internal oleh Divisi TIK OSIS. Selama masa pemilihan berlangsung, dukungan keamanan penuh diberikan pada versi produksi (*production*) yang sedang berjalan:

| Versi | Didukung |
|-------|----------|
| 1.x.x | ✅ Ya      |
| < 1.0 | ❌ Tidak   |

## Melaporkan Kerentanan Keamanan

Sistem *e-voting* sangat rentan terhadap upaya manipulasi. Jika Anda adalah anggota tim pengembang, auditor internal, atau pihak yang menemukan potensi celah keamanan (misalnya: kemungkinan manipulasi token, celah pengiriman suara ganda, atau kebocoran data kandidat/pemilih), ikuti panduan ini:

1. **JANGAN PUBLIKASIKAN TEMUAN ANDA**: Kerahasiaan adalah kunci. Jangan membuat *Issue* publik di GitHub, memposting di grup media sosial, atau memberitahu pihak di luar tim TIK/Pengurus Inti OSIS.
2. **Laporan Darurat**: Segera laporkan celah tersebut secara privat dan tertulis kepada Lead Developer / Divisi TIK melalui email resmi di: **[ferdi@nawasena.site]**.
3. **Isi Laporan**: 
   - Deskripsi lengkap mengenai kerentanan.
   - Langkah-langkah detail untuk mereproduksi eksploitasi tersebut.
   - Analisis potensi dampak (misal: "Memungkinkan pengguna melakukan *voting* tanpa mematikan status token aktif").

### Tindakan Cepat (Incident Response):
Jika laporan diterima pada saat masa pemilihan (hari-H) sedang berlangsung, tim berhak melakukan **Penghentian Sistem Sementara (Maintenance Mode)** untuk menambal celah sebelum proses pemilihan dilanjutkan.

## Aturan Keamanan Sistem (Zero-Tolerance Policy)

Peringatan keras bagi seluruh pengguna, panitia, dan pengembang. Tindakan berikut dianggap sebagai pelanggaran berat terhadap integritas Pemilos:
- **Eksploitasi Kredensial**: Mencoba menebak, meretas, atau menggunakan Token/NISN milik siswa lain.
- **Injeksi Data**: Melakukan manipulasi *payload* (seperti SQL Injection atau modifikasi *request body*) saat mengirim form pemilihan untuk mengubah perolehan suara kandidat.
- **Serangan DoS**: Mencoba membuat server *down* (Denial of Service) selama jam pemilihan berlangsung.
- **Akses Ilegal Database**: Mencoba membobol akses *dashboard admin/database* untuk melihat siapa memilih siapa (melanggar prinsip *Luber Jurdil*).

---
Sistem ini diawasi. Setiap upaya untuk meretas, memanipulasi, atau mengganggu jalannya demokrasi digital ini akan dicatat (*logged*) dan ditindaklanjuti sesuai dengan aturan sekolah.
