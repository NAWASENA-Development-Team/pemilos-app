import fs from 'fs';

// Fungsi untuk membuat string acak
function getRandomChars(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Fungsi utama untuk generate token PM-XXXX-XX
function generateToken() {
  const part1 = getRandomChars(4);
  const part2 = getRandomChars(2);
  return `PM-${part1}-${part2}`;
}

// Fungsi untuk membuat banyak token dan menyimpannya ke CSV
function generateVotersCSV(jumlahSiswa) {
  let csvContent = "token,is_used\n";
  const tokenSet = new Set(); // Pakai Set biar nggak ada token yang kembar

  while (tokenSet.size < jumlahSiswa) {
    const newToken = generateToken();
    if (!tokenSet.has(newToken)) {
      tokenSet.add(newToken);
      csvContent += `${newToken},false\n`;
    }
  }
  
  fs.writeFileSync('tokens_pemilos.csv', csvContent);
  console.log(`✅ Sukses! ${jumlahSiswa} token berhasil dibuat dan disimpan di 'tokens_pemilos.csv'`);
}

// Silakan ubah angka 500 sesuai jumlah pemilih di sekolah
generateVotersCSV(991);