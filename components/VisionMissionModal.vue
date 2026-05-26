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
      <div class="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" @click="emit('close')"></div>
      
      <div class="relative bg-white border-4 border-brand-dark rounded-[2rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-brutal-lg overflow-hidden z-10">
        
        <div class="absolute top-0 left-0 right-0 h-4 bg-brand-primary"></div>

        <div class="p-8 pb-4 flex justify-between items-start mt-2">
          <div class="flex items-center gap-6">
            <div class="w-20 h-20 rounded-2xl overflow-hidden border-4 border-brand-dark shadow-brutal-sm transform -rotate-6">
              <img :src="candidate.photo_url" :alt="candidate.name" class="w-full h-full object-cover" />
            </div>
            <div>
              <span class="inline-block px-3 py-1 rounded-full bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-widest mb-2 border-2 border-brand-dark shadow-brutal-sm">
                Kandidat #{{ candidate.sequence_number }}
              </span>
              <h2 class="text-3xl font-black font-display text-brand-dark leading-tight tracking-tight">{{ candidate.name }}</h2>
            </div>
          </div>
          <button @click="emit('close')" class="p-2 bg-brand-light hover:bg-brand-pink border-2 border-brand-dark rounded-xl text-brand-dark hover:text-white transition-all shadow-brutal-sm active:translate-y-1 active:shadow-none hover:rotate-90">
            <Icon name="heroicons:x-mark-20-solid" class="text-2xl" />
          </button>
        </div>

        <div class="px-8 pb-10 overflow-y-auto custom-scrollbar space-y-8 text-left">
          
          <div class="space-y-4">
            <h3 class="flex items-center gap-3 text-2xl font-black font-display text-brand-dark">
              <div class="p-2 bg-brand-cyan rounded-xl border-2 border-brand-dark shadow-brutal-sm transform rotate-3">
                <Icon name="heroicons:eye-solid" class="text-brand-dark" />
              </div>
              Visi 🌟
            </h3>
            <div class="bg-brand-light border-4 border-brand-dark rounded-3xl p-6 shadow-inner">
              <p class="text-brand-dark leading-relaxed font-bold text-lg italic">
                "{{ candidate.vision }}"
              </p>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="flex items-center gap-3 text-2xl font-black font-display text-brand-dark">
              <div class="p-2 bg-brand-pink rounded-xl border-2 border-brand-dark shadow-brutal-sm transform -rotate-3">
                <Icon name="heroicons:flag-solid" class="text-brand-dark" />
              </div>
              Misi & Program Kerja 🚀
            </h3>
            <div class="space-y-3">
              <div v-for="(line, index) in candidate.mission.split('\n')" :key="index" 
                class="flex gap-4 bg-white border-2 border-brand-dark p-4 rounded-2xl group hover:bg-brand-accent transition-colors shadow-brutal-sm">
                <span class="text-brand-primary font-black font-display text-lg">{{ index + 1 }}.</span>
                <p class="text-brand-dark font-bold leading-relaxed text-sm">
                  {{ line }}
                </p>
              </div>
            </div>
          </div>

        </div>

        <div class="p-6 bg-brand-light border-t-4 border-brand-dark text-center">
          <button @click="emit('close')" class="w-full py-4 bg-brand-primary text-white font-black font-display text-xl rounded-xl border-4 border-brand-dark shadow-brutal-sm hover:shadow-brutal active:translate-y-1 active:shadow-none transition-all">
            Tutup Profil ✨
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Scrollbar Kustom biar Playful */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #fdf4ff;
  border-left: 2px solid #1e1b4b;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f472b6;
  border-radius: 10px;
  border: 2px solid #1e1b4b;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
}

/* Animasi Bounce Smooth untuk Modal */
.modal-bounce-enter-active {
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.modal-bounce-leave-active {
  animation: bounce-in 0.3s reverse cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.8) translateY(40px) rotate(-2deg); }
  100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
}
</style>