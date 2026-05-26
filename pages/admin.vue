<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted, computed } from 'vue';
import { useVoting } from '../composables/useVoting';

// --- Integrasi Chart.js ---
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement,
  LineElement,
  Title,
  Filler
} from 'chart.js';
import { Doughnut, Line } from 'vue-chartjs';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement,
  LineElement,
  Title,
  Filler
);

const { fetchCandidates } = useVoting();
// @ts-ignore
const supabase = useSupabaseClient<any>();

const candidates = ref([]);
const votes = ref([]);
const totalVoters = ref(0);
const usedVotersCount = ref(0);
const isLoading = ref(true);
const isAuthenticated = ref(false);
const passwordInput = ref('');
const loginError = ref(false);

// Verifikasi Password Admin
const handleAdminLogin = () => {
  if (passwordInput.value === 'Demisioner26') {
    isAuthenticated.value = true;
    loginError.value = false;
    loadData();
  } else {
    loginError.value = true;
  }
};

const loadData = async () => {
  isLoading.value = true;
  candidates.value = await fetchCandidates();
  const { data } = await supabase.from('votes').select('*');
  votes.value = data || [];
  
  // Ambil total voters untuk partisipasi
  const { count } = await supabase
    .from('voters')
    .select('*', { count: 'exact', head: true });
  
  totalVoters.value = count || 0;
  usedVotersCount.value = votes.value.length;
  isLoading.value = false;
};

// Logika Akumulasi ID untuk Hasil Suara
const results = computed(() => {
  const categories = { chairman: [], vice_1: [], vice_2: [] };
  const totalVotes = votes.value.length;

  if (candidates.value.length === 0) return categories;

  ['chairman', 'vice_1', 'vice_2'].forEach(pos => {
    const posKey = pos === 'chairman' ? 'chairman_id' : pos === 'vice_1' ? 'vice_1_id' : 'vice_2_id';
    
    categories[pos] = candidates.value
      .filter(c => c.position === pos)
      .map(c => {
        const count = votes.value.filter(v => v[posKey] === c.id).length;
        const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
        return { ...c, count, percentage };
      });
  });

  return categories;
});

const totalIncomingVotes = computed(() => votes.value.length);

const participationPercentage = computed(() => {
  if (totalVoters.value === 0) return 0;
  return (usedVotersCount.value / totalVoters.value) * 100;
});

// --- Konfigurasi Visual Grafik ---
const chartColors = ['#fde047', '#f472b6', '#22d3ee', '#7c3aed', '#4ade80'];

const getChartData = (posKey) => {
  const categoryData = results.value[posKey] || [];
  return {
    labels: categoryData.map(c => `Paslon #${c.sequence_number}`),
    datasets: [
      {
        data: categoryData.map(c => c.count),
        backgroundColor: chartColors.slice(0, categoryData.length),
        borderColor: '#1e1b4b',
        borderWidth: 4,
        hoverOffset: 12,
      }
    ]
  };
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%', // Membuat lubang donat lebih besar & elegan
  plugins: {
    legend: { display: false }, // Disembunyikan karena kita buat legend custom di UI
    tooltip: {
      backgroundColor: '#1e1b4b',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      titleFont: { size: 14, family: 'Fredoka', weight: 'bold' },
      bodyFont: { size: 14, family: 'Plus Jakarta Sans', weight: 'bold' },
      padding: 12,
      cornerRadius: 12,
      borderColor: '#1e1b4b',
      borderWidth: 3,
      displayColors: true,
    }
  },
  animation: {
    animateScale: true,
    animateRotate: true,
    duration: 1500,
    easing: 'easeOutBounce' // Animasi playful saat load
  }
};

// Data untuk diagram partisipasi
const turnoutChartData = computed(() => {
  const unused = totalVoters.value - usedVotersCount.value;
  return {
    labels: ['Sudah Memilih', 'Belum Memilih'],
    datasets: [
      {
        data: [usedVotersCount.value, unused > 0 ? unused : 0],
        backgroundColor: ['#22d3ee', '#f472b6'], // Cyan & Pink
        borderColor: '#1e1b4b',
        borderWidth: 4,
        hoverOffset: 8
      }
    ]
  };
});

// Data untuk grafik garis tren aktivitas per jam
const timelineChartData = computed(() => {
  const counts: Record<string, number> = {};
  votes.value.forEach(v => {
    if (!v.created_at) return;
    const date = new Date(v.created_at);
    const hourStr = date.getHours().toString().padStart(2, '0') + ':00';
    counts[hourStr] = (counts[hourStr] || 0) + 1;
  });

  const hours = Object.keys(counts).sort();
  const finalLabels = hours.length ? hours : ['08:00', '09:00', '10:00', '11:00', '12:00'];
  const finalData = hours.length ? hours.map(h => counts[h]) : [0, 0, 0, 0, 0];

  return {
    labels: finalLabels,
    datasets: [
      {
        label: 'Suara Masuk per Jam',
        data: finalData,
        borderColor: '#7c3aed', // brand-primary
        backgroundColor: '#7c3aed20', // transparent purple fill
        borderWidth: 4,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fde047', // brand-accent
        pointBorderColor: '#1e1b4b',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };
});

const timelineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e1b4b',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      titleFont: { family: 'Plus Jakarta Sans', weight: 'bold' },
      bodyFont: { family: 'Plus Jakarta Sans' },
      borderWidth: 3,
      borderColor: '#1e1b4b',
      padding: 10,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#1e1b4b1a',
      },
      ticks: {
        color: '#1e1b4b',
        font: { family: 'Plus Jakarta Sans', weight: 'bold' }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#1e1b4b',
        font: { family: 'Plus Jakarta Sans', weight: 'bold' }
      }
    }
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto py-6 px-4 font-sans text-brand-dark selection:bg-brand-pink/30 relative">
    
    <!-- UN-AUTHENTICATED STATE (LOGIN PANEL) -->
    <div v-if="!isAuthenticated" class="min-h-[70vh] flex items-center justify-center relative">
      <div class="w-full max-w-md relative group">
        <!-- Playful brutalist stack offset -->
        <div class="absolute inset-0 bg-brand-dark rounded-[2rem] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-300"></div>
        
        <!-- Main Card container -->
        <div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-8 md:p-12 text-center flex flex-col items-center">
          <div class="mb-6 p-5 bg-brand-accent rounded-full border-4 border-brand-dark shadow-brutal-sm transform -rotate-6 group-hover:rotate-6 transition-transform duration-500">
            <Icon name="heroicons:lock-closed-solid" class="text-4xl text-brand-dark" />
          </div>
          
          <h2 class="text-3xl font-black font-display text-brand-dark mb-3 tracking-tight">Area Terbatas! 🔐</h2>
          <p class="text-brand-dark/70 text-sm font-bold mb-10 leading-relaxed">Hanya panitia inti (Demisioner) yang diizinkan mengakses data real-time hasil pemilihan ini.</p>
          
          <form @submit.prevent="handleAdminLogin" class="w-full space-y-6">
            <div class="relative">
              <input 
                v-model="passwordInput" 
                type="password" 
                placeholder="••••••••" 
                class="w-full bg-brand-light px-6 py-4 rounded-2xl border-4 border-brand-primary focus:border-brand-pink focus:outline-none focus:ring-4 focus:ring-brand-pink/30 transition-all font-display font-black text-center text-2xl tracking-[0.25em] text-brand-dark placeholder:text-brand-primary/30 shadow-inner"
              />
              <Transition name="bounce">
                <p v-if="loginError" class="absolute -bottom-7 left-0 right-0 text-red-500 text-xs font-black animate-bounce mt-1">❌ Password salah, coba cek lagi!</p>
              </Transition>
            </div>
            
            <button type="submit" class="w-full relative overflow-hidden bg-brand-pink text-white border-4 border-brand-dark font-black font-display text-lg py-4 rounded-2xl shadow-brutal-sm hover:shadow-brutal transition-all active:translate-y-1 active:shadow-none group/btn mt-4">
              <div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              <div class="relative flex items-center justify-center gap-2">
                <span>Buka Panel Hasil 🔑</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- AUTHENTICATED STATE (REAL-TIME DASHBOARD) -->
    <div v-else class="space-y-12 animate-fade-in">
      
      <!-- HEADER BANNER & STATS -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b-4 border-brand-dark pb-10">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border-4 border-brand-dark shadow-brutal-sm text-brand-primary font-black text-xs uppercase tracking-wider transform hover:-rotate-1 transition-transform">
            <span class="relative flex h-3.5 w-3.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border border-brand-dark"></span>
            </span>
            Perhitungan Live Vote ⚡
          </div>
          <h1 class="text-5xl md:text-7xl font-black font-display text-brand-dark tracking-tight leading-[1.1]">
            Hasil <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-primary to-brand-cyan">Real-Time!</span> 📊
          </h1>
        </div>
        
        <!-- Key Stats Cards -->
        <div class="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
          
          <!-- Card Total Suara -->
          <div class="relative group">
            <div class="absolute inset-0 bg-brand-dark rounded-3xl translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-300"></div>
            <div class="relative bg-brand-accent border-4 border-brand-dark px-8 py-5 rounded-3xl flex flex-col items-center sm:items-end justify-center text-center sm:text-right">
              <p class="text-brand-dark font-black font-display text-xs uppercase tracking-widest mb-1">Total Suara Masuk 📥</p>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-black font-display text-brand-dark tracking-tight">{{ totalIncomingVotes }}</span>
                <span class="text-brand-dark font-bold text-xs">Pemilih</span>
              </div>
            </div>
          </div>

          <!-- Card Partisipasi -->
          <div class="relative group">
            <div class="absolute inset-0 bg-brand-dark rounded-3xl translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-300"></div>
            <div class="relative bg-white border-4 border-brand-dark px-8 py-5 rounded-3xl flex flex-col items-center sm:items-end justify-center text-center sm:text-right">
              <p class="text-brand-dark font-black font-display text-xs uppercase tracking-widest mb-1">Tingkat Turnout 📈</p>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-black font-display text-brand-primary tracking-tight">{{ participationPercentage.toFixed(1) }}%</span>
                <span class="text-brand-dark/70 font-bold text-xs">Partisipasi</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ADDITIONAL PROFESSIONAL CHARTS GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Voter Participation Doughnut Chart -->
        <div class="relative group lg:col-span-1">
          <div class="absolute inset-0 bg-brand-dark rounded-[2rem] translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 duration-300"></div>
          <div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-between min-h-[350px]">
            <h3 class="text-xl font-black font-display text-brand-dark mb-4 text-center">Partisipasi Pemilih 👥</h3>
            <div class="relative w-48 h-48 flex-shrink-0">
              <Doughnut :data="turnoutChartData" :options="chartOptions" />
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span class="text-brand-dark/50 text-[10px] font-black uppercase tracking-widest">Total</span>
                <span class="text-2xl font-black font-display text-brand-dark leading-none">{{ totalVoters }}</span>
              </div>
            </div>
            <div class="flex justify-center gap-6 mt-4 w-full">
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brand-cyan border-2 border-brand-dark rounded-full"></span>
                <span class="text-xs font-bold text-brand-dark">Voted ({{ usedVotersCount }})</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3.5 h-3.5 bg-brand-pink border-2 border-brand-dark rounded-full"></span>
                <span class="text-xs font-bold text-brand-dark">Abstained ({{ Math.max(0, totalVoters - usedVotersCount) }})</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Attendance Timeline / Turnout Velocity Line Chart -->
        <div class="relative group lg:col-span-2">
          <div class="absolute inset-0 bg-brand-dark rounded-[2rem] translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 duration-300"></div>
          <div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-6 md:p-8 flex flex-col h-full min-h-[350px]">
            <h3 class="text-xl font-black font-display text-brand-dark mb-4 flex items-center gap-2">
              <span>Tren Kehadiran Pemilih 📈</span>
              <span class="text-xs font-bold text-brand-pink bg-brand-light px-2.5 py-1 rounded-lg border-2 border-brand-dark">Live Graph</span>
            </h3>
            <div class="flex-grow w-full min-h-[220px]">
              <Line :data="timelineChartData" :options="timelineChartOptions" />
            </div>
          </div>
        </div>

      </div>

      <!-- MAIN RESULTS SECTION (CATEGORIES) -->
      <div v-for="(posLabel, posKey) in { chairman: 'Ketua OSIS 🏆', vice_1: 'Wakil Ketua I 🥈', vice_2: 'Wakil Ketua II 🥉' }" :key="posKey" 
           class="relative group">
        
        <!-- Offset Background Layer -->
        <div class="absolute inset-0 bg-brand-dark rounded-[2.5rem] translate-x-3 translate-y-3 transition-transform duration-300"></div>
        
        <!-- Main Card Container -->
        <div class="relative bg-white border-4 border-brand-dark rounded-[2.5rem] p-8 md:p-10 flex flex-col space-y-8">
          
          <h3 class="text-3xl font-black font-display text-brand-dark flex items-center gap-3">
            <span class="w-3 h-8 bg-brand-primary rounded-full border-2 border-brand-dark"></span>
            {{ posLabel }}
          </h3>

          <div class="flex flex-col lg:flex-row gap-12 items-center">
            
            <!-- Doughnut Chart Section -->
            <div class="relative w-60 h-60 flex-shrink-0">
              <Doughnut v-if="results[posKey] && results[posKey].length" :data="getChartData(posKey)" :options="chartOptions" />
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span class="text-brand-dark/50 text-[10px] font-black uppercase tracking-widest font-display">Total</span>
                <span class="text-3xl font-black font-display text-brand-dark leading-none">{{ totalIncomingVotes }}</span>
              </div>
            </div>

            <!-- Candidate Performance & Visual Progress Section -->
            <div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(cand, index) in results[posKey]" :key="cand.id" 
                class="group/cand bg-white border-4 border-brand-dark rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-sm relative overflow-hidden flex flex-col gap-4">
                
                <!-- Side highlight stripe in candidate color -->
                <div class="absolute left-0 top-0 bottom-0 w-2.5 transition-all duration-300 group-hover/cand:w-3.5 border-r-2 border-brand-dark"
                     :style="{ backgroundColor: chartColors[index % chartColors.length] }"></div>

                <div class="pl-4 flex justify-between items-center gap-4">
                  
                  <div class="flex items-center gap-4">
                    <!-- Mini Candidate Photo with border -->
                    <div class="w-14 h-14 rounded-2xl border-4 border-brand-dark overflow-hidden shrink-0 shadow-brutal-sm group-hover/cand:rotate-3 transition-transform duration-300">
                      <img :src="cand.photo_url" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-brand-dark/50 uppercase tracking-[0.15em] mb-0.5">Paslon #{{ cand.sequence_number }}</p>
                      <h4 class="text-lg font-black font-display text-brand-dark leading-snug">{{ cand.name }}</h4>
                    </div>
                  </div>
                  
                  <div class="text-right shrink-0">
                    <div class="text-3xl font-black font-display text-brand-dark leading-none mb-1">{{ cand.count }}</div>
                    <div class="text-sm font-black font-display px-2 py-0.5 rounded-lg border-2 border-brand-dark shadow-brutal-sm inline-block" 
                         :style="{ backgroundColor: chartColors[index % chartColors.length] }">
                      {{ cand.percentage.toFixed(1) }}%
                    </div>
                  </div>
                </div>

                <!-- Custom striped brutalist progress bar -->
                <div class="w-full bg-brand-light border-4 border-brand-dark rounded-2xl h-7 overflow-hidden shadow-inner relative flex items-center">
                  <div 
                    class="h-full border-r-4 border-brand-dark brutalist-progress-bar transition-all duration-1000"
                    :style="{ 
                      width: `${cand.percentage}%`, 
                      backgroundColor: chartColors[index % chartColors.length] 
                    }"
                  ></div>
                  <!-- Percentage label overlay inside progress bar if wide enough, otherwise outside -->
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span class="text-xs font-black font-display text-brand-dark tracking-wide uppercase">
                      {{ cand.percentage.toFixed(1) }}% Tercapai
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- SYNC BUTTON -->
      <div class="flex justify-center pt-8 pb-12">
        <button @click="loadData" class="px-8 py-5 bg-brand-accent hover:bg-brand-primary hover:text-white border-4 border-brand-dark rounded-2xl text-brand-dark font-black font-display text-xl transition-all duration-300 flex items-center gap-3 shadow-brutal hover:shadow-none active:translate-y-1 group">
          <Icon name="heroicons:arrow-path" :class="{'animate-spin': isLoading}" class="text-brand-dark group-hover:text-white group-hover:rotate-180 transition-all duration-700 text-2xl" />
          Sinkronisasi Data Terbaru! 🔄
        </button>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.brutalist-progress-bar {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.25) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.25) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: move-stripes 2s linear infinite;
}

@keyframes move-stripes {
  0% { background-position: 0 0; }
  100% { background-position: 1rem 0; }
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
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