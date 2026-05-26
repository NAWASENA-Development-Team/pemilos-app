<script setup lang="ts">
import { ref } from 'vue';

// State untuk mengontrol visibilitas Modal
const showTermsModal = ref(false);
const showHowToVoteModal = ref(false);
</script>

<template>
  <footer class="mt-20 border-t-4 border-brand-dark pt-12 pb-8 px-4 relative z-40 bg-brand-light">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 class="text-brand-dark font-black font-display text-2xl mb-4">Pemilos Asik! 🎉</h3>
          <p class="text-brand-dark/70 text-sm leading-relaxed max-w-sm font-bold">
            Platform pemilihan ketua OSIS digital yang fun, transparan, dan pastinya aman. Bikin milih pemimpin jadi lebih seru! 🚀
          </p>
        </div>
        <div class="md:text-right">
          <h4 class="text-brand-primary font-black font-display mb-4 text-sm uppercase tracking-wider">Jalan Pintas 🗺️</h4>
          <div class="flex flex-col md:items-end gap-3">
            <button @click="showTermsModal = true" class="text-brand-dark hover:text-brand-pink font-bold text-sm transition-colors text-left md:text-right hover:underline decoration-2 underline-offset-4">
              Syarat & Ketentuan 📜
            </button>
            <button @click="showHowToVoteModal = true" class="text-brand-dark hover:text-brand-pink font-bold text-sm transition-colors text-left md:text-right hover:underline decoration-2 underline-offset-4">
              Cara Milih 🗳️
            </button>
          </div>
        </div>
      </div>
      
      <div class="border-t-4 border-brand-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-brand-dark font-bold text-xs">
          &copy; 2026 MPK/OSIS SMAN 2 Jonggol. All Rights Reserved. ✨
        </p>
        <div class="flex gap-4 items-center bg-white px-4 py-2 border-2 border-brand-dark rounded-full shadow-brutal-sm">
          <span class="w-3 h-3 bg-green-500 rounded-full animate-bounce"></span>
          <span class="text-brand-dark font-black font-display text-[10px] uppercase tracking-wider">Sistem Aman & Aktif 🛡️</span>
        </div>
      </div>
    </div>

    <ClientOnly>
      <Teleport to="body">
        <Transition name="bounce">
          <div v-if="showHowToVoteModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div class="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm" @click="showHowToVoteModal = false"></div>
            
            <div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-8 max-w-lg w-full shadow-brutal-lg z-10">
              <div class="flex justify-between items-center mb-6 border-b-4 border-brand-dark pb-4">
                <h3 class="text-2xl font-black font-display text-brand-dark flex items-center gap-3">
                  <span class="w-10 h-10 rounded-full bg-brand-cyan border-2 border-brand-dark text-brand-dark flex items-center justify-center text-lg shadow-brutal-sm transform -rotate-12">🗳️</span>
                  Cara Milih
                </h3>
                <button @click="showHowToVoteModal = false" class="text-brand-dark hover:text-brand-pink hover:rotate-90 transition-transform bg-brand-light p-1 rounded-lg border-2 border-brand-dark shadow-brutal-sm">
                  <Icon name="heroicons:x-mark" class="text-2xl" />
                </button>
              </div>
              
              <ul class="space-y-4 text-brand-dark font-bold text-sm">
                <li class="flex gap-4 items-start">
                  <div class="w-8 h-8 rounded-full bg-brand-primary border-2 border-brand-dark flex items-center justify-center text-white font-black text-sm shrink-0 shadow-brutal-sm">1</div>
                  <p>Masukin token rahasia kamu buat masuk ke bilik suara.</p>
                </li>
                <li class="flex gap-4 items-start">
                  <div class="w-8 h-8 rounded-full bg-brand-pink border-2 border-brand-dark flex items-center justify-center text-white font-black text-sm shrink-0 shadow-brutal-sm">2</div>
                  <p>Pilih jagoan kamu buat Ketua, Waketu I, dan Waketu II!</p>
                </li>
                <li class="flex gap-4 items-start">
                  <div class="w-8 h-8 rounded-full bg-brand-accent border-2 border-brand-dark flex items-center justify-center text-brand-dark font-black text-sm shrink-0 shadow-brutal-sm">3</div>
                  <p>Cek lagi pilihanmu. Kalau udah mantap, klik <b>"Kirim Pilihan Saya"</b>. Ingat, gak bisa diulang ya!</p>
                </li>
              </ul>

              <button @click="showHowToVoteModal = false" class="mt-8 w-full py-3 bg-brand-accent hover:bg-brand-primary hover:text-white border-4 border-brand-dark rounded-xl text-brand-dark font-black font-display text-lg transition-colors shadow-brutal-sm hover:shadow-brutal active:translate-y-1 active:shadow-none">
                Oke, Paham! 👍
              </button>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>

    <ClientOnly>
      <Teleport to="body">
        <Transition name="bounce">
          <div v-if="showTermsModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div class="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm" @click="showTermsModal = false"></div>
            
            <div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-8 max-w-lg w-full shadow-brutal-lg z-10">
              <div class="flex justify-between items-center mb-6 border-b-4 border-brand-dark pb-4">
                <h3 class="text-2xl font-black font-display text-brand-dark flex items-center gap-3">
                  <span class="w-10 h-10 rounded-full bg-brand-pink border-2 border-brand-dark text-brand-dark flex items-center justify-center text-lg shadow-brutal-sm transform rotate-12">📜</span>
                  Aturan Main
                </h3>
                <button @click="showTermsModal = false" class="text-brand-dark hover:text-brand-pink hover:rotate-90 transition-transform bg-brand-light p-1 rounded-lg border-2 border-brand-dark shadow-brutal-sm">
                  <Icon name="heroicons:x-mark" class="text-2xl" />
                </button>
              </div>
              
              <div class="space-y-4 text-brand-dark font-bold text-sm leading-relaxed max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                <p class="p-3 bg-brand-light border-2 border-brand-dark rounded-xl shadow-brutal-sm"><strong>1. Hak Pilih:</strong> Cuma buat kamu, siswa/i aktif SMAN 2 Jonggol yang punya token resmi! 🎟️</p>
                <p class="p-3 bg-brand-light border-2 border-brand-dark rounded-xl shadow-brutal-sm"><strong>2. Rahasia Terjamin:</strong> Data kamu aman! Panitia nggak bisa ngintip kamu pilih siapa. 🤫</p>
                <p class="p-3 bg-brand-light border-2 border-brand-dark rounded-xl shadow-brutal-sm"><strong>3. Jangan Curang:</strong> Dilarang keras ngasih token ke orang lain atau coba nge-hack sistem! 🚫</p>
                <p class="p-3 bg-brand-light border-2 border-brand-dark rounded-xl shadow-brutal-sm"><strong>4. Hasil Mutlak:</strong> Hasil akhir dari sistem ini valid dan bakal disahkan sama panitia. 🏆</p>
              </div>

              <button @click="showTermsModal = false" class="mt-8 w-full py-3 bg-brand-cyan hover:bg-brand-primary hover:text-white border-4 border-brand-dark rounded-xl text-brand-dark font-black font-display text-lg transition-all shadow-brutal-sm hover:shadow-brutal active:translate-y-1 active:shadow-none">
                Siap Bos! 🫡
              </button>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>

  </footer>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #fdf4ff;
  border-radius: 10px;
  border: 1px solid #1e1b4b;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #7c3aed;
  border-radius: 10px;
  border: 1px solid #1e1b4b;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #f472b6;
}
</style>