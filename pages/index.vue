<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import { useVoting } from '../composables/useVoting';

const { loginWithToken, currentVoter } = useVoting();

const tokenInput = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// Proteksi: Jika sudah login, langsung ke halaman vote
if (currentVoter.value) {
  navigateTo('/vote');
}

const handleLogin = async () => {
  if (!tokenInput.value.trim()) {
    errorMessage.value = 'Mohon masukkan token Anda.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  const result = await loginWithToken(tokenInput.value.trim());

  if (result.success) {
    navigateTo('/vote');
  } else {
    errorMessage.value = result.message;
  }
  
  isLoading.value = false;
};
</script>

<template>
  <div class="relative min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
    
    <div class="text-center mb-12 space-y-6 z-10 animate-fade-in">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
        <span class="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Encrypted Access Point</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
        Setiap Era <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Memiliki </span> <br> Pemimpinnya
      </h1>
      
      <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
        "Suara integritasmu hari ini, menentukan arah sekolah esok hari."
      </p>
    </div>

    <div class="w-full max-w-md relative group z-10">
      <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div class="relative bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl flex flex-col items-center">
        
        <div class="mb-8 p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-white/10 shadow-inner">
          <Icon name="heroicons:shield-check-solid" class="text-5xl text-blue-400 shadow-blue-500/50" />
        </div>

        <h2 class="text-2xl font-bold text-white mb-2">Verifikasi Pemilih</h2>
        <p class="text-sm text-slate-500 mb-8 text-center font-medium">Masukkan token 8-digit Anda untuk memulai voting.</p>

        <form @submit.prevent="handleLogin" class="w-full space-y-6">
          <div class="relative group/input">
            <input 
              v-model="tokenInput" 
              type="text" 
              placeholder="PM-XXXX-XX" 
              class="w-full bg-black/20 px-6 py-5 rounded-2xl border-2 border-white/5 focus:border-blue-500/40 focus:ring-8 focus:ring-blue-500/5 outline-none transition-all font-mono text-center text-2xl uppercase tracking-[0.3em] text-white placeholder:text-slate-700 placeholder:tracking-normal group-hover/input:border-white/10"
              :disabled="isLoading"
            />
          </div>
          
          <Transition name="slide">
            <div v-if="errorMessage" class="flex items-center gap-2 text-red-400 text-xs font-bold justify-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">
              <Icon name="heroicons:exclamation-circle-solid" />
              {{ errorMessage }}
            </div>
          </Transition>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full group relative overflow-hidden bg-white text-[#070b14] font-black text-lg py-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] hover:shadow-white/20 transition-all active:scale-[0.97] disabled:opacity-50"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="relative flex items-center justify-center gap-3">
              <Icon v-if="isLoading" name="svg-spinners:180-ring-with-bg" class="text-2xl" />
              <span v-else>Masuk ke Bilik Suara</span>
              <Icon v-if="!isLoading" name="heroicons:arrow-right-circle-solid" class="text-2xl group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}
</style>