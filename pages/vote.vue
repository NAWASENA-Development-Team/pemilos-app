<script setup lang="ts">
// @ts-nocheck
import { ref, computed, onMounted } from 'vue';
import { useVoting } from '../composables/useVoting';

const { currentVoter, fetchCandidates, submitVote } = useVoting();

const candidates = ref([]);
const isLoading = ref(true);
const isSubmitting = ref(false);

// State untuk tahap pemilihan (1: Ketua, 2: Wakil 1, 3: Wakil 2)
const currentStep = ref(1);

// State untuk menyimpan ID pilihan user
const selections = ref({
  chairman: null,
  vice_1: null,
  vice_2: null
});

// Modal Visi Misi
const isVisionModalOpen = ref(false);
const selectedCandidateForModal = ref(null);

onMounted(async () => {
  if (!currentVoter.value) {
    navigateTo('/');
    return;
  }
  candidates.value = await fetchCandidates();
  isLoading.value = false;
});

// Computed properties untuk memfilter kandidat berdasarkan posisi
const filteredCandidates = computed(() => {
  const positions = ['chairman', 'vice_1', 'vice_2'];
  const targetPos = positions[currentStep.value - 1];
  return candidates.value.filter(c => c.position === targetPos);
});

const currentPosName = computed(() => {
  const names = ['Ketua OSIS', 'Wakil Ketua I', 'Wakil Ketua II'];
  return names[currentStep.value - 1];
});

// Handlers
const selectCandidate = (candidate) => {
  const keys = ['chairman', 'vice_1', 'vice_2'];
  selections.value[keys[currentStep.value - 1]] = candidate;
};

const nextStep = () => { if (currentStep.value < 3) currentStep.value++; };
const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };

const handleFinalSubmit = async () => {
  isSubmitting.value = true;
  const result = await submitVote({
    chairmanId: selections.value.chairman.id,
    vice1Id: selections.value.vice_1.id,
    vice2Id: selections.value.vice_2.id
  });

  if (result.success) {
    navigateTo('/success');
  } else {
    alert(result.message);
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div v-if="!isLoading" class="max-w-6xl mx-auto space-y-10 pb-40 px-4">
    
    <!-- Progress Indicator -->
    <div class="flex justify-center items-center gap-4 mb-12 mt-8">
      <div v-for="i in 3" :key="i" 
        class="flex items-center gap-3 transition-all duration-500"
        :class="[currentStep >= i ? 'opacity-100' : 'opacity-40']"
      >
        <div :class="[
          'w-14 h-14 rounded-2xl flex items-center justify-center font-black font-display text-2xl border-4 transition-all duration-300 shadow-brutal-sm',
          currentStep === i ? 'bg-brand-accent border-brand-dark text-brand-dark scale-110 rotate-6' : 
          currentStep > i ? 'bg-green-400 border-brand-dark text-brand-dark scale-100' : 'bg-white border-brand-dark text-brand-dark/50'
        ]">
          <span v-if="currentStep > i">✔️</span>
          <span v-else>{{ i }}</span>
        </div>
        <div v-if="i < 3" class="w-12 h-2 rounded-full border-2 border-brand-dark"
             :class="currentStep > i ? 'bg-green-400' : 'bg-white'"></div>
      </div>
    </div>

    <!-- Judul Tahap -->
    <div class="text-center space-y-4 animate-bounce-in bg-white border-4 border-brand-dark p-8 rounded-[2rem] shadow-brutal-lg max-w-2xl mx-auto transform -rotate-1">
      <h2 class="text-4xl md:text-5xl font-black font-display text-brand-dark tracking-tight">Pilih <span class="text-brand-primary underline decoration-brand-accent decoration-8 underline-offset-4">{{ currentPosName }}</span> 🎯</h2>
      <p class="text-brand-dark/80 font-bold text-lg">Klik kartu kandidat yang paling oke menurut kamu!</p>
    </div>

    <!-- Grid Kandidat -->
    <Transition name="page-bounce" mode="out-in">
      <div :key="currentStep" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        <div v-for="candidate in filteredCandidates" :key="candidate.id"
          @click="selectCandidate(candidate)"
          class="relative transition-all duration-300 transform"
          :class="[selections[Object.keys(selections)[currentStep-1]]?.id === candidate.id ? 'scale-[1.05] z-20' : 'hover:scale-[1.02] z-10']"
        >
          <!-- Indikator Terpilih -->
          <div v-if="selections[Object.keys(selections)[currentStep-1]]?.id === candidate.id" 
            class="absolute -inset-2 bg-brand-accent rounded-[2.5rem] border-4 border-brand-dark shadow-brutal-lg z-0 transform rotate-2 animate-pulse">
          </div>
          
          <CandidateCard 
            :candidate="candidate" 
            class="relative z-10 h-full"
            @showDetails="(c) => { selectedCandidateForModal = c; isVisionModalOpen = true; }"
          />

          <div v-if="selections[Object.keys(selections)[currentStep-1]]?.id === candidate.id" 
            class="absolute -top-4 -right-4 z-30 bg-green-400 text-brand-dark w-16 h-16 rounded-full flex items-center justify-center shadow-brutal-sm border-4 border-brand-dark transform rotate-12">
            <Icon name="heroicons:check-badge-solid" class="text-4xl" />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Bottom Action Bar -->
    <div class="fixed bottom-0 left-0 right-0 p-4 z-40">
      <div class="max-w-4xl mx-auto bg-white border-4 border-brand-dark p-4 md:p-6 rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] shadow-brutal-lg flex flex-col md:flex-row items-center justify-between gap-6 transform transition-transform duration-300 hover:-translate-y-2">
        
        <!-- Pilihan Berjalan -->
        <div class="flex gap-4 px-2 w-full md:w-auto justify-center">
          <div v-for="(val, key) in selections" :key="key" class="group relative">
            <div class="w-16 h-16 rounded-2xl border-4 border-brand-dark border-dashed flex items-center justify-center overflow-hidden transition-all duration-300"
              :class="{'border-solid bg-brand-light shadow-brutal-sm transform hover:scale-110 hover:-rotate-6': val, 'bg-gray-100': !val}">
              <img v-if="val" :src="val.photo_url" class="w-full h-full object-cover" />
              <Icon v-else name="heroicons:user-solid" class="text-brand-dark/20 text-2xl" />
            </div>
            <!-- Tooltip -->
            <span v-if="val" class="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-dark text-white font-bold text-xs py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-brutal-sm pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-brand-dark">
              {{ val.name }}
            </span>
          </div>
        </div>

        <!-- Tombol Navigasi -->
        <div class="flex gap-3 w-full md:w-auto">
          <button v-if="currentStep > 1" @click="prevStep" 
            class="flex-1 md:flex-none px-6 py-4 rounded-xl bg-brand-light hover:bg-brand-accent text-brand-dark border-4 border-brand-dark font-black font-display text-lg shadow-brutal-sm active:translate-y-1 active:shadow-none transition-all">
            ⬅️ Balik
          </button>

          <button v-if="currentStep < 3" @click="nextStep" 
            :disabled="!selections[Object.keys(selections)[currentStep-1]]"
            class="flex-1 md:flex-none px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-pink text-white border-4 border-brand-dark font-black font-display text-lg shadow-brutal-sm active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-primary">
            Lanjut ➡️
          </button>

          <button v-else @click="handleFinalSubmit" 
            :disabled="!selections.vice_2 || isSubmitting"
            class="flex-1 md:flex-none px-8 py-4 rounded-xl bg-green-400 hover:bg-green-300 text-brand-dark border-4 border-brand-dark font-black font-display text-lg shadow-brutal-sm active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden">
            <span class="relative z-10 flex items-center justify-center gap-2">
              <Icon v-if="isSubmitting" name="svg-spinners:180-ring-with-bg" class="text-2xl" />
              {{ isSubmitting ? 'Tunggu Bentar...' : 'Kirim Pilihanku! 🚀' }}
            </span>
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>

    <VisionMissionModal 
      :isOpen="isVisionModalOpen" 
      :candidate="selectedCandidateForModal" 
      @close="isVisionModalOpen = false" 
    />
  </div>

  <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-6">
    <div class="w-20 h-20 border-8 border-brand-light border-t-brand-primary rounded-full animate-spin shadow-brutal-sm"></div>
    <p class="text-brand-dark font-black font-display tracking-widest text-xl uppercase animate-bounce">Nyapin Bilik Suara... 🏃💨</p>
  </div>
</template>

<style scoped>
.page-bounce-enter-active {
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.page-bounce-leave-active {
  animation: bounce-in 0.3s reverse cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.animate-bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.8) translateY(-40px) rotate(-5deg); }
  100% { opacity: 1; transform: scale(1) translateY(0) rotate(-1deg); }
}

@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.9) translateX(40px); }
  100% { opacity: 1; transform: scale(1) translateX(0); }
}
</style>