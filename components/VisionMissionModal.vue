<script setup lang="ts">
// Kita ambil tipe data dari file types kamu
import type { Candidate } from '../types';

defineProps<{
  isOpen: boolean;
  candidate: Candidate | null;
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <Transition name="modal-bounce">
    <div v-if="isOpen && candidate" class="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
      <div class="absolute inset-0 bg-[#070b14]/80 backdrop-blur-xl" @click="emit('close')"></div>
      
      <div class="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
        
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        <div class="p-8 pb-4 flex justify-between items-start">
          <div class="flex items-center gap-6">
            <div class="w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/10">
              <img :src="candidate.photo_url" :alt="candidate.name" class="w-full h-full object-cover" />
            </div>
            <div>
              <span class="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 border border-blue-500/20">
                Kandidat #{{ candidate.sequence_number }}
              </span>
              <h2 class="text-3xl font-black text-white leading-tight tracking-tight">{{ candidate.name }}</h2>
            </div>
          </div>
          <button @click="emit('close')" class="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all active:scale-90">
            <Icon name="heroicons:x-mark-20-solid" class="text-2xl" />
          </button>
        </div>

        <div class="px-8 pb-10 overflow-y-auto custom-scrollbar space-y-8 text-left">
          
          <div class="space-y-4">
            <h3 class="flex items-center gap-3 text-lg font-bold text-white/90">
              <div class="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Icon name="heroicons:eye-solid" class="text-blue-400" />
              </div>
              Visi Utama
            </h3>
            <div class="bg-white/5 border border-white/5 rounded-3xl p-6 shadow-inner">
              <p class="text-slate-300 leading-relaxed font-medium italic">
                "{{ candidate.vision }}"
              </p>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="flex items-center gap-3 text-lg font-bold text-white/90">
              <div class="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Icon name="heroicons:flag-solid" class="text-purple-400" />
              </div>
              Misi & Program Kerja
            </h3>
            <div class="space-y-3">
              <div v-for="(line, index) in candidate.mission.split('\n')" :key="index" 
                class="flex gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl group hover:bg-white/10 transition-colors">
                <span class="text-blue-500 font-black text-sm">{{ index + 1 }}.</span>
                <p class="text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed text-sm">
                  {{ line }}
                </p>
              </div>
            </div>
          </div>

        </div>

        <div class="p-6 bg-black/20 border-t border-white/10 text-center">
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Official Candidate Profile &copy; Pemilos 2026</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Scrollbar Kustom biar tetep Clean & Dark */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

/* Animasi Bounce Smooth untuk Modal */
.modal-bounce-enter-active {
  animation: bounce-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-bounce-leave-active {
  animation: bounce-in 0.3s reverse cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.9) translateY(30px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
</style>