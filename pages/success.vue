<!-- pages/success.vue -->
<script setup lang="ts">
// @ts-nocheck
const backToHome = () => {
  navigateTo('/');
};
</script>

<template>
  <div class="flex items-center justify-center min-h-[70vh] px-4">
    <div class="relative bg-white p-8 md:p-12 rounded-[3rem] shadow-brutal-lg border-4 border-brand-dark text-center max-w-lg w-full animate-bounce-in z-10">
      
      <!-- Ornamen Dekoratif -->
      <div class="absolute -top-6 -left-6 text-6xl animate-spin-slow">✨</div>
      <div class="absolute -bottom-6 -right-6 text-6xl animate-bounce">🎈</div>

      <div class="w-32 h-32 bg-brand-accent border-4 border-brand-dark text-brand-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-brutal-sm transform rotate-12 hover:-rotate-12 transition-transform duration-500">
        <Icon name="heroicons:hand-thumb-up-solid" class="text-6xl" />
      </div>
      
      <h2 class="text-4xl md:text-5xl font-black font-display text-brand-dark mb-4">Mantap! 🎉</h2>
      <p class="text-brand-dark/80 font-bold mb-8 leading-relaxed text-lg">
        Suaramu udah berhasil disimpen dengan aman! Makasih banyak udah ikutan PEMILOS 2026. Satu suara kamu sangat berarti! 🚀
      </p>
      
      <button 
        @click="backToHome" 
        class="w-full py-4 rounded-xl border-4 border-brand-dark bg-brand-cyan hover:bg-brand-primary text-brand-dark hover:text-white font-black font-display text-xl transition-all shadow-brutal-sm active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 group"
      >
        <Icon name="heroicons:home-solid" class="group-hover:animate-bounce" />
        Balik ke Beranda 🏠
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}
@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.8) translateY(40px) rotate(5deg); }
  100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
}

.animate-spin-slow {
  animation: spin 10s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>