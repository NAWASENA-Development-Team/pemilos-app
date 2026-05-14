<script setup lang="ts">
import { ref } from 'vue';

// State untuk mengontrol visibilitas Modal
const showTermsModal = ref(false);
const showHowToVoteModal = ref(false);
</script>

<template>
  <footer class="mt-20 border-t border-white/5 pt-12 pb-8 px-4 relative z-40">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 class="text-white font-bold text-xl mb-4">Secure Democracy</h3>
          <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
            Platform pemilihan ketua OSIS digital yang aman, transparan, dan terpercaya. Dikembangkan oleh Sekretaris Periode 25/26 SMAN 2 Jonggol untuk masa depan demokrasi sekolah.
          </p>
        </div>
        <div class="md:text-right">
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigasi Cepat</h4>
          <div class="flex flex-col md:items-end gap-3">
            <button @click="showTermsModal = true" class="text-gray-500 hover:text-blue-400 text-sm transition-colors text-left md:text-right">
              Syarat & Ketentuan
            </button>
            <button @click="showHowToVoteModal = true" class="text-gray-500 hover:text-blue-400 text-sm transition-colors text-left md:text-right">
              Cara Memilih
            </button>
          </div>
        </div>
      </div>
      
      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-600 text-xs font-medium">
          &copy; 2026 MPK/OSIS SMAN 2 Jonggol. All Rights Reserved.
        </p>
        <div class="flex gap-4 items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-gray-600 text-[10px] uppercase tracking-tighter">System Status: Online & Encrypted</span>
        </div>
      </div>
    </div>

    <ClientOnly>
      <Teleport to="body">
        <Transition name="modal-fade">
          <div v-if="showHowToVoteModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div class="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm" @click="showHowToVoteModal = false"></div>
            
            <div class="relative bg-[#111827] border border-white/10 rounded-[2rem] p-8 max-w-lg w-full shadow-[0_0_40px_rgba(37,99,235,0.15)] z-10">
              <div class="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <h3 class="text-2xl font-black text-white flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">🗳️</span>
                  Cara Memilih
                </h3>
                <button @click="showHowToVoteModal = false" class="text-slate-500 hover:text-red-400 transition-colors">
                  <Icon name="heroicons:x-mark" class="text-2xl" />
                </button>
              </div>
              
              <ul class="space-y-4 text-slate-300 font-medium text-sm">
                <li class="flex gap-4 items-start">
                  <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">1</div>
                  <p>Gunakan token atau NISN yang telah diberikan oleh panitia OSIS untuk login ke dalam sistem di halaman utama.</p>
                </li>
                <li class="flex gap-4 items-start">
                  <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">2</div>
                  <p>Pilih masing-masing 1 kandidat terbaikmu untuk posisi Ketua OSIS, Wakil Ketua I, dan Wakil Ketua II.</p>
                </li>
                <li class="flex gap-4 items-start">
                  <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">3</div>
                  <p>Pastikan pilihanmu sudah benar di panel bagian bawah. Klik <b>"Kirim Pilihan Saya"</b> jika sudah yakin. Suara tidak dapat diubah setelah dikirim.</p>
                </li>
              </ul>

              <button @click="showHowToVoteModal = false" class="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-colors active:scale-95">
                Mengerti
              </button>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>

    <ClientOnly>
      <Teleport to="body">
        <Transition name="modal-fade">
          <div v-if="showTermsModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div class="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm" @click="showTermsModal = false"></div>
            
            <div class="relative bg-[#111827] border border-white/10 rounded-[2rem] p-8 max-w-lg w-full shadow-[0_0_40px_rgba(139,92,246,0.15)] z-10">
              <div class="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <h3 class="text-2xl font-black text-white flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">📜</span>
                  Syarat & Ketentuan
                </h3>
                <button @click="showTermsModal = false" class="text-slate-500 hover:text-red-400 transition-colors">
                  <Icon name="heroicons:x-mark" class="text-2xl" />
                </button>
              </div>
              
              <div class="space-y-4 text-slate-400 text-sm leading-relaxed max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                <p><strong class="text-slate-200">1. Hak Pilih:</strong> Hanya siswa/i aktif SMAN 2 Jonggol yang terdaftar dan memiliki token resmi yang berhak memberikan suara.</p>
                <p><strong class="text-slate-200">2. Asas LUBER JURDIL:</strong> Sistem dilengkapi enkripsi. Panitia TIK tidak dapat melacak siapa memilih siapa, kami hanya menerima akumulasi data akhir.</p>
                <p><strong class="text-slate-200">3. Larangan:</strong> Dilarang membagikan token milikmu kepada orang lain atau mencoba melakukan eksploitasi pada sistem voting.</p>
                <p><strong class="text-slate-200">4. Finalitas:</strong> Keputusan akhir dari akumulasi suara di platform ini bersifat mutlak dan akan disahkan oleh panitia demisioner.</p>
              </div>

              <button @click="showTermsModal = false" class="mt-8 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)] active:scale-95">
                Saya Setuju
              </button>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>

  </footer>
</template>

<style scoped>
/* Animasi kemunculan popup agar terlihat playful dan smooth */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

/* Mempercantik Scrollbar untuk teks panjang di dalam popup */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>