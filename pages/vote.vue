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
  <div v-if="!isLoading" class="max-w-6xl mx-auto space-y-10 pb-32">
    
    <div class="flex justify-center items-center gap-4 mb-12">
      <div v-for="i in 3" :key="i" 
        class="flex items-center gap-3 transition-all duration-500"
        :class="[currentStep >= i ? 'opacity-100' : 'opacity-30']"
      >
        <div :class="[
          'w-10 h-10 rounded-xl flex items-center justify-center font-bold border-2 transition-all',
          currentStep === i ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110' : 'bg-white/5 border-white/10 text-slate-400'
        ]">
          {{ i }}
        </div>
        <div v-if="i < 3" class="w-8 h-0.5 bg-white/10 rounded-full"></div>
      </div>
    </div>

    <div class="text-center space-y-2 animate-slide-down">
      <h2 class="text-4xl font-black text-white tracking-tight">Pilih {{ currentPosName }}</h2>
      <p class="text-slate-400 font-medium italic">Ketuk pada kartu untuk memilih kandidat kepercayaanmu.</p>
    </div>

    <Transition name="page-fade" mode="out-in">
      <div :key="currentStep" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="candidate in filteredCandidates" :key="candidate.id"
          @click="selectCandidate(candidate)"
          class="relative cursor-pointer transition-all duration-300 transform"
          :class="[selections[Object.keys(selections)[currentStep-1]]?.id === candidate.id ? 'scale-[1.02]' : 'hover:scale-[1.01]']"
        >
          <div v-if="selections[Object.keys(selections)[currentStep-1]]?.id === candidate.id" 
            class="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2.2rem] blur opacity-75 animate-pulse z-0">
          </div>
          
          <CandidateCard 
            :candidate="candidate" 
            class="relative z-10"
            @showDetails="(c) => { selectedCandidateForModal = c; isVisionModalOpen = true; }"
          />

          <div v-if="selections[Object.keys(selections)[currentStep-1]]?.id === candidate.id" 
            class="absolute top-4 right-4 z-20 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <Icon name="heroicons:check-16-solid" class="text-2xl" />
          </div>
        </div>
      </div>
    </Transition>

    <div class="fixed bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-[#070b14] via-[#070b14]/90 to-transparent">
      <div class="max-w-4xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 p-4 rounded-[2rem] shadow-2xl flex flex-wrap items-center justify-between gap-4">
        
        <div class="flex gap-4 px-2">
          <div v-for="(val, key) in selections" :key="key" class="group relative">
            <div class="w-12 h-12 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all"
              :class="{'border-blue-500/50 bg-blue-500/10': val}">
              <img v-if="val" :src="val.photo_url" class="w-full h-full object-cover" />
              <Icon v-else name="heroicons:user-solid" class="text-white/20" />
            </div>
            <span v-if="val" class="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {{ val.name }}
            </span>
          </div>
        </div>

        <div class="flex gap-3">
          <button v-if="currentStep > 1" @click="prevStep" 
            class="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/5">
            Kembali
          </button>

          <button v-if="currentStep < 3" @click="nextStep" 
            :disabled="!selections[Object.keys(selections)[currentStep-1]]"
            class="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all disabled:opacity-30">
            Lanjut
          </button>

          <button v-else @click="handleFinalSubmit" 
            :disabled="!selections.vice_2 || isSubmitting"
            class="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-black shadow-lg shadow-green-900/20 transition-all active:scale-95 disabled:opacity-30">
            {{ isSubmitting ? 'Mengirim Suara...' : 'Kirim Pilihan Saya' }}
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

  <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div class="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
    <p class="text-blue-400 font-bold tracking-widest text-xs uppercase animate-pulse">Memuat Bilik Suara...</p>
  </div>
</template>

<style scoped>
.page-fade-enter-active, .page-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-fade-enter-from { opacity: 0; transform: translateX(20px); }
.page-fade-leave-to { opacity: 0; transform: translateX(-20px); }

.animate-slide-down {
  animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>