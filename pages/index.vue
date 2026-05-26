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
    
    <div class="text-center mb-12 space-y-6 z-10 animate-bounce-in">
      <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-brand-primary shadow-brutal-sm transform hover:-rotate-2 transition-transform duration-300">
        <span class="text-2xl animate-pulse">🎉</span>
        <span class="text-brand-primary text-xs font-bold uppercase tracking-widest font-display">Pesta Demokrasi Dimulai!</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-black font-display text-brand-dark tracking-tight leading-[1.1]">
        Suaramu, <br> <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-primary to-brand-cyan">Masa Depan Kita!</span> 🌟
      </h1>
      
      <p class="text-brand-primary text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed font-display">
        "Yuk, pilih pemimpin kece untuk sekolah kita yang lebih baik!" 🚀
      </p>
    </div>

    <div class="w-full max-w-md relative group z-10">
      
      <!-- Playful Form Container -->
      <div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-8 md:p-10 shadow-brutal-lg flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">
        
        <div class="mb-6 p-4 bg-brand-accent rounded-full border-4 border-brand-dark shadow-brutal-sm transform -rotate-6 group-hover:rotate-12 transition-transform duration-500">
          <Icon name="heroicons:ticket-solid" class="text-5xl text-brand-dark" />
        </div>

        <h2 class="text-3xl font-black font-display text-brand-dark mb-2 text-center">Tiket Masuk 🎟️</h2>
        <p class="text-base text-brand-primary mb-8 text-center font-bold">Masukkan token rahasiamu di bawah ini ya!</p>

        <form @submit.prevent="handleLogin" class="w-full space-y-6">
          <div class="relative group/input">
            <input 
              v-model="tokenInput" 
              type="text" 
              placeholder="PM-XXXX-XX" 
              class="w-full bg-brand-light px-6 py-5 rounded-2xl border-4 border-brand-primary focus:border-brand-pink focus:outline-none focus:ring-4 focus:ring-brand-pink/30 transition-all font-display font-black text-center text-3xl uppercase tracking-widest text-brand-dark placeholder:text-brand-primary/40 shadow-inner"
              :disabled="isLoading"
            />
          </div>
          
          <Transition name="bounce">
            <div v-if="errorMessage" class="flex items-center gap-2 text-white text-sm font-bold justify-center bg-red-500 py-3 rounded-xl border-4 border-brand-dark shadow-brutal-sm">
              <Icon name="heroicons:face-frown-solid" class="text-xl" />
              {{ errorMessage }}
            </div>
          </Transition>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full relative overflow-hidden bg-brand-pink text-white border-4 border-brand-dark font-black font-display text-xl py-5 rounded-2xl shadow-brutal-sm hover:shadow-brutal transition-all active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed group/btn"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            
            <div class="relative flex items-center justify-center gap-3">
              <Icon v-if="isLoading" name="svg-spinners:180-ring-with-bg" class="text-3xl" />
              <span v-else>Gas Memilih! 🚀</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-in {
  animation: bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.8) translateY(40px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
</style>