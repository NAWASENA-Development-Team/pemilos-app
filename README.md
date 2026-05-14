# Pemilos App - E-Voting OSIS SMAN 2 Jonggol 🗳️

> **Sistem Pemilihan Ketua OSIS Digital.** Aplikasi *e-voting* yang aman, cepat, dan transparan untuk mendukung proses demokrasi siswa di sekolah.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://pemilos-app.vercel.app/)
[![Status](https://img.shields.io/badge/Status-Active-success)]()

## 📖 Tentang Proyek

**Pemilos App** adalah platform pemungutan suara elektronik (*e-voting*) yang dikembangkan untuk memfasilitasi Pemilihan Ketua OSIS (Pemilos) di SMAN 2 Jonggol. Sistem ini dirancang untuk mendigitalkan proses pemungutan suara konvensional yang menggunakan kertas, sehingga proses pemilihan menjadi lebih efisien, meminimalisir kecurangan (suara ganda/rusak), dan mempercepat perhitungan suara secara aktual (*real-time*).

🔗 **Live Demo / Portal Pemilihan:** [https://pemilos-app.vercel.app/](https://pemilos-app.vercel.app/)

## ✨ Fitur Utama

- **Sistem Autentikasi Aman (Token/NISN):** Pemilih masuk menggunakan kredensial unik (seperti Token unik atau NISN) untuk memastikan prinsip satu siswa, satu suara (1 Vote per User).
- **Profil Kandidat Komprehensif:** Menampilkan foto kandidat ketua dan wakil ketua, nomor urut, serta informasi detail mengenai Visi, Misi, dan Program Kerja mereka.
- **Antarmuka Pemilihan Intuitif (One-Click Vote):** Proses pemilihan (*voting*) yang didesain semudah mungkin agar dapat dilakukan dengan cepat melalui perangkat *smartphone* maupun komputer/laptop.
- **Mekanisme Konfirmasi Suara:** Sistem peringatan (*pop-up confirmation*) sebelum suara dikirim secara permanen ke *database*, untuk mencegah salah pencet.
- **Papan Skor Real-time (Khusus Admin/Panitia):** Fitur monitoring untuk memantau progres suara yang masuk secara langsung tanpa harus menunggu penghitungan manual di akhir acara.
- **Aksesibilitas Tinggi:** UI responsif dan dioptimalkan agar dapat berjalan ringan meskipun diakses oleh banyak siswa secara bersamaan (*concurrent users*).

## 🛠️ Teknologi yang Digunakan

*(Catatan: Sesuaikan dengan tumpukan teknologi asli yang digunakan)*

- **Frontend:** [Nuxt.js] (https://nuxt.com/) / [Vue.js] (https://vuejs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Context API / Zustand / Redux]
- **Database & Autentikasi:** [Supabase / Firebase]
- **Hosting / Deployment:** [Vercel](https://vercel.com/)

## 🚀 Cara Menjalankan Proyek (Local Development)

### Prasyarat
Pastikan Anda telah menginstal **Node.js** dan **npm** (atau yarn) di lingkungan pengembangan Anda.

### Langkah Instalasi

1. **Clone repositori ini**
   ```bash
   git clone [https://github.com/FerrDxD/pemilos-app.git](https://github.com/FerrDxD/pemilos-app.git)
