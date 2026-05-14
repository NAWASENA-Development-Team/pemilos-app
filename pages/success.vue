<!-- pages/success.vue -->
<script setup lang="ts">
// @ts-nocheck

const backToHome = () => {
  navigateTo('/');
};
</script>

<template>
  <div class="flex items-center justify-center min-h-[70vh]">
    <div class="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center max-w-lg w-full animate-pop-in">
      <div class="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
        <Icon name="heroicons:check" class="text-5xl" stroke-width="2" />
      </div>
      
      <h2 class="text-3xl font-extrabold text-brand-dark mb-4">Terima Kasih!</h2>
      <p class="text-slate-600 mb-8 leading-relaxed">
        Suara Anda telah berhasil direkam ke dalam sistem kami secara aman dan anonim. Terima kasih telah berpartisipasi dalam PEMILOS 2026.
      </p>
      
      <button 
        @click="backToHome" 
        class="w-full py-3.5 rounded-xl border-2 border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Icon name="heroicons:home" />
        Kembali ke Halaman Utama
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-pop-in {
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes popIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>