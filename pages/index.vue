<!-- pages/index.vue -->
<script setup lang="ts">


// @ts-nocheck
import { ref } from 'vue';
import { useVoting } from '../composables/useVoting';

const { loginWithToken, currentVoter } = useVoting();
const router = useRouter();

const tokenInput = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

// Jika user kembali ke halaman ini tapi masih punya sesi aktif, lempar ke /vote
if (currentVoter.value) {
  router.push('/vote');
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
    router.push('/vote');
  } else {
    errorMessage.value = result.message;
  }
  
  isLoading.value = false;
};
</script>

<template>
  <div class="max-w-4xl mx-auto text-center py-12 md:py-24">
    <!-- Hero Section -->
    <div class="mb-12 animate-fade-in-up">
      <h1 class="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4 tracking-tight">
        Selamat Datang di <span class="text-brand-primary">PEMILOS 2026</span>
      </h1>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto">
        Gunakan hak suara Anda untuk menentukan masa depan kepengurusan OSIS. Pilihan Anda sangat berarti bagi kemajuan bersama.
      </p>
    </div>

    <!-- Token Input Card -->
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8 transform transition-all hover:-translate-y-1">
      <div class="mb-6">
        <div class="w-16 h-16 bg-blue-50 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="heroicons:key" class="text-3xl" />
        </div>
        <h2 class="text-2xl font-bold text-brand-dark">Akses Pemilihan</h2>
        <p class="text-sm text-slate-500 mt-2">Masukkan Token Pemilih yang diberikan oleh panitia.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input 
            v-model="tokenInput" 
            type="text" 
            placeholder="Contoh: PM-8X92-KL" 
            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all font-mono text-center text-lg uppercase tracking-wider"
            :disabled="isLoading"
          />
        </div>
        
        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm font-medium flex items-center justify-center gap-1">
          <Icon name="heroicons:exclamation-circle" />
          {{ errorMessage }}
        </p>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-brand-primary text-white font-bold text-lg py-3 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Icon v-if="isLoading" name="svg-spinners:180-ring-with-bg" class="text-xl" />
          {{ isLoading ? 'Memverifikasi...' : 'Mulai Memilih' }}
          <Icon v-if="!isLoading" name="heroicons:arrow-right" />
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>