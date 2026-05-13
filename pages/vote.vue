<!-- pages/vote.vue -->
<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted } from 'vue';
import { useVoting } from '../composables/useVoting';
import type { Candidate } from '../types';

const router = useRouter();
const { currentVoter, fetchCandidates, submitVote } = useVoting();

const candidates = ref<Candidate[]>([]);
const isLoading = ref(true);
const isSubmitting = ref(false);

// Modal Visi Misi
const isVisionModalOpen = ref(false);
const selectedCandidateForModal = ref<Candidate | null>(null);

// Modal Konfirmasi Vote
const isConfirmModalOpen = ref(false);
const selectedCandidateForVote = ref<Candidate | null>(null);

// Proteksi Halaman
onMounted(async () => {
  if (!currentVoter.value) {
    router.push('/');
    return;
  }
  
  candidates.value = await fetchCandidates();
  isLoading.value = false;
});

// Handlers
const openVisionModal = (candidate: Candidate) => {
  selectedCandidateForModal.value = candidate;
  isVisionModalOpen.value = true;
};

const openConfirmModal = (candidate: Candidate) => {
  selectedCandidateForVote.value = candidate;
  isConfirmModalOpen.value = true;
};

const confirmVote = async () => {
  if (!selectedCandidateForVote.value) return;
  
  isSubmitting.value = true;
  const result = await submitVote(selectedCandidateForVote.value.id);
  
  if (result.success) {
    router.push('/success');
  } else {
    alert(result.message); // Tampilkan error jika gagal
    isSubmitting.value = false;
    isConfirmModalOpen.value = false;
  }
};
</script>

<template>
  <div v-if="!isLoading" class="max-w-6xl mx-auto">
    <div class="text-center mb-10">
      <h2 class="text-3xl md:text-4xl font-bold text-brand-dark mb-3">Daftar Pasangan Calon</h2>
      <p class="text-slate-600">Silakan pelajari visi & misi setiap kandidat sebelum menentukan pilihan Anda.</p>
    </div>

    <!-- Candidate Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <CandidateCard 
        v-for="candidate in candidates" 
        :key="candidate.id" 
        :candidate="candidate" 
        @showDetails="openVisionModal"
        @vote="openConfirmModal"
      />
    </div>

    <!-- Vision & Mission Modal -->
    <VisionMissionModal 
      :isOpen="isVisionModalOpen" 
      :candidate="selectedCandidateForModal" 
      @close="isVisionModalOpen = false" 
    />

    <!-- Confirmation Modal -->
    <Transition name="fade">
      <div v-if="isConfirmModalOpen && selectedCandidateForVote" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" @click="!isSubmitting && (isConfirmModalOpen = false)"></div>
        
        <div class="relative bg-white rounded-2xl w-full max-w-md p-6 text-center shadow-2xl">
          <div class="w-16 h-16 bg-brand-accent/20 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="heroicons:question-mark-circle" class="text-4xl" />
          </div>
          <h3 class="text-2xl font-bold text-brand-dark mb-2">Konfirmasi Pilihan</h3>
          <p class="text-slate-600 mb-6">
            Anda akan memilih <strong>Paslon {{ selectedCandidateForVote.sequence_number }}</strong>. Pilihan yang sudah dikirim tidak dapat diubah. Apakah Anda yakin?
          </p>
          
          <div class="flex gap-3">
            <button 
              @click="isConfirmModalOpen = false" 
              :disabled="isSubmitting"
              class="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button 
              @click="confirmVote" 
              :disabled="isSubmitting"
              class="flex-1 py-3 rounded-xl bg-brand-primary text-white font-bold hover:bg-blue-800 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Icon v-if="isSubmitting" name="svg-spinners:180-ring-with-bg" />
              {{ isSubmitting ? 'Mengirim...' : 'Ya, Saya Yakin' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
  
  <!-- Loading Skeleton/Spinner -->
  <div v-else class="flex flex-col items-center justify-center min-h-[50vh]">
    <Icon name="svg-spinners:bars-scale" class="text-5xl text-brand-primary mb-4" />
    <p class="text-slate-500 font-medium">Memuat data kandidat...</p>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>