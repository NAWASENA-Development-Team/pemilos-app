import { _ as __nuxt_component_1 } from './index-CQQPKTjA.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { u as useVoting, a as useSupabaseClient } from './useVoting-CPSer0xH.mjs';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Filler } from 'chart.js';
import { Doughnut, Line } from 'vue-chartjs';
import { _ as _export_sfc } from './server.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './composables-BZs227Uh.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    Chart.register(
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
    useVoting();
    useSupabaseClient();
    const candidates = ref([]);
    const votes = ref([]);
    const totalVoters = ref(0);
    const usedVotersCount = ref(0);
    const isLoading = ref(true);
    const isAuthenticated = ref(false);
    const passwordInput = ref("");
    const loginError = ref(false);
    const results = computed(() => {
      const categories = { chairman: [], vice_1: [], vice_2: [] };
      const totalVotes = votes.value.length;
      if (candidates.value.length === 0) return categories;
      ["chairman", "vice_1", "vice_2"].forEach((pos) => {
        const posKey = pos === "chairman" ? "chairman_id" : pos === "vice_1" ? "vice_1_id" : "vice_2_id";
        categories[pos] = candidates.value.filter((c) => c.position === pos).map((c) => {
          const count = votes.value.filter((v) => v[posKey] === c.id).length;
          const percentage = totalVotes > 0 ? count / totalVotes * 100 : 0;
          return { ...c, count, percentage };
        });
      });
      return categories;
    });
    const totalIncomingVotes = computed(() => votes.value.length);
    const participationPercentage = computed(() => {
      if (totalVoters.value === 0) return 0;
      return usedVotersCount.value / totalVoters.value * 100;
    });
    const chartColors = ["#fde047", "#f472b6", "#22d3ee", "#7c3aed", "#4ade80"];
    const getChartData = (posKey) => {
      const categoryData = results.value[posKey] || [];
      return {
        labels: categoryData.map((c) => `Paslon #${c.sequence_number}`),
        datasets: [
          {
            data: categoryData.map((c) => c.count),
            backgroundColor: chartColors.slice(0, categoryData.length),
            borderColor: "#1e1b4b",
            borderWidth: 4,
            hoverOffset: 12
          }
        ]
      };
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      // Membuat lubang donat lebih besar & elegan
      plugins: {
        legend: { display: false },
        // Disembunyikan karena kita buat legend custom di UI
        tooltip: {
          backgroundColor: "#1e1b4b",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          titleFont: { size: 14, family: "Fredoka", weight: "bold" },
          bodyFont: { size: 14, family: "Plus Jakarta Sans", weight: "bold" },
          padding: 12,
          cornerRadius: 12,
          borderColor: "#1e1b4b",
          borderWidth: 3,
          displayColors: true
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 1500,
        easing: "easeOutBounce"
        // Animasi playful saat load
      }
    };
    const turnoutChartData = computed(() => {
      const unused = totalVoters.value - usedVotersCount.value;
      return {
        labels: ["Sudah Memilih", "Belum Memilih"],
        datasets: [
          {
            data: [usedVotersCount.value, unused > 0 ? unused : 0],
            backgroundColor: ["#22d3ee", "#f472b6"],
            // Cyan & Pink
            borderColor: "#1e1b4b",
            borderWidth: 4,
            hoverOffset: 8
          }
        ]
      };
    });
    const timelineChartData = computed(() => {
      const counts = {};
      votes.value.forEach((v) => {
        if (!v.created_at) return;
        const date = new Date(v.created_at);
        const hourStr = date.getHours().toString().padStart(2, "0") + ":00";
        counts[hourStr] = (counts[hourStr] || 0) + 1;
      });
      const hours = Object.keys(counts).sort();
      const finalLabels = hours.length ? hours : ["08:00", "09:00", "10:00", "11:00", "12:00"];
      const finalData = hours.length ? hours.map((h) => counts[h]) : [0, 0, 0, 0, 0];
      return {
        labels: finalLabels,
        datasets: [
          {
            label: "Suara Masuk per Jam",
            data: finalData,
            borderColor: "#7c3aed",
            // brand-primary
            backgroundColor: "#7c3aed20",
            // transparent purple fill
            borderWidth: 4,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#fde047",
            // brand-accent
            pointBorderColor: "#1e1b4b",
            pointBorderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8
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
          backgroundColor: "#1e1b4b",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          titleFont: { family: "Plus Jakarta Sans", weight: "bold" },
          bodyFont: { family: "Plus Jakarta Sans" },
          borderWidth: 3,
          borderColor: "#1e1b4b",
          padding: 10
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#1e1b4b1a"
          },
          ticks: {
            color: "#1e1b4b",
            font: { family: "Plus Jakarta Sans", weight: "bold" }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#1e1b4b",
            font: { family: "Plus Jakarta Sans", weight: "bold" }
          }
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto py-6 px-4 font-sans text-brand-dark selection:bg-brand-pink/30 relative" }, _attrs))} data-v-c995f11a>`);
      if (!isAuthenticated.value) {
        _push(`<div class="min-h-[70vh] flex items-center justify-center relative" data-v-c995f11a><div class="w-full max-w-md relative group" data-v-c995f11a><div class="absolute inset-0 bg-brand-dark rounded-[2rem] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-300" data-v-c995f11a></div><div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-8 md:p-12 text-center flex flex-col items-center" data-v-c995f11a><div class="mb-6 p-5 bg-brand-accent rounded-full border-4 border-brand-dark shadow-brutal-sm transform -rotate-6 group-hover:rotate-6 transition-transform duration-500" data-v-c995f11a>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:lock-closed-solid",
          class: "text-4xl text-brand-dark"
        }, null, _parent));
        _push(`</div><h2 class="text-3xl font-black font-display text-brand-dark mb-3 tracking-tight" data-v-c995f11a>Area Terbatas! 🔐</h2><p class="text-brand-dark/70 text-sm font-bold mb-10 leading-relaxed" data-v-c995f11a>Hanya panitia inti (Demisioner) yang diizinkan mengakses data real-time hasil pemilihan ini.</p><form class="w-full space-y-6" data-v-c995f11a><div class="relative" data-v-c995f11a><input${ssrRenderAttr("value", passwordInput.value)} type="password" placeholder="••••••••" class="w-full bg-brand-light px-6 py-4 rounded-2xl border-4 border-brand-primary focus:border-brand-pink focus:outline-none focus:ring-4 focus:ring-brand-pink/30 transition-all font-display font-black text-center text-2xl tracking-[0.25em] text-brand-dark placeholder:text-brand-primary/30 shadow-inner" data-v-c995f11a>`);
        if (loginError.value) {
          _push(`<p class="absolute -bottom-7 left-0 right-0 text-red-500 text-xs font-black animate-bounce mt-1" data-v-c995f11a>❌ Password salah, coba cek lagi!</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit" class="w-full relative overflow-hidden bg-brand-pink text-white border-4 border-brand-dark font-black font-display text-lg py-4 rounded-2xl shadow-brutal-sm hover:shadow-brutal transition-all active:translate-y-1 active:shadow-none group/btn mt-4" data-v-c995f11a><div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" data-v-c995f11a></div><div class="relative flex items-center justify-center gap-2" data-v-c995f11a><span data-v-c995f11a>Buka Panel Hasil 🔑</span></div></button></form></div></div></div>`);
      } else {
        _push(`<div class="space-y-12 animate-fade-in" data-v-c995f11a><div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b-4 border-brand-dark pb-10" data-v-c995f11a><div class="space-y-2" data-v-c995f11a><div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border-4 border-brand-dark shadow-brutal-sm text-brand-primary font-black text-xs uppercase tracking-wider transform hover:-rotate-1 transition-transform" data-v-c995f11a><span class="relative flex h-3.5 w-3.5" data-v-c995f11a><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" data-v-c995f11a></span><span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border border-brand-dark" data-v-c995f11a></span></span> Perhitungan Live Vote ⚡ </div><h1 class="text-5xl md:text-7xl font-black font-display text-brand-dark tracking-tight leading-[1.1]" data-v-c995f11a> Hasil <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-primary to-brand-cyan" data-v-c995f11a>Real-Time!</span> 📊 </h1></div><div class="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0" data-v-c995f11a><div class="relative group" data-v-c995f11a><div class="absolute inset-0 bg-brand-dark rounded-3xl translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-300" data-v-c995f11a></div><div class="relative bg-brand-accent border-4 border-brand-dark px-8 py-5 rounded-3xl flex flex-col items-center sm:items-end justify-center text-center sm:text-right" data-v-c995f11a><p class="text-brand-dark font-black font-display text-xs uppercase tracking-widest mb-1" data-v-c995f11a>Total Suara Masuk 📥</p><div class="flex items-baseline gap-2" data-v-c995f11a><span class="text-4xl font-black font-display text-brand-dark tracking-tight" data-v-c995f11a>${ssrInterpolate(totalIncomingVotes.value)}</span><span class="text-brand-dark font-bold text-xs" data-v-c995f11a>Pemilih</span></div></div></div><div class="relative group" data-v-c995f11a><div class="absolute inset-0 bg-brand-dark rounded-3xl translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-300" data-v-c995f11a></div><div class="relative bg-white border-4 border-brand-dark px-8 py-5 rounded-3xl flex flex-col items-center sm:items-end justify-center text-center sm:text-right" data-v-c995f11a><p class="text-brand-dark font-black font-display text-xs uppercase tracking-widest mb-1" data-v-c995f11a>Tingkat Turnout 📈</p><div class="flex items-baseline gap-2" data-v-c995f11a><span class="text-4xl font-black font-display text-brand-primary tracking-tight" data-v-c995f11a>${ssrInterpolate(participationPercentage.value.toFixed(1))}%</span><span class="text-brand-dark/70 font-bold text-xs" data-v-c995f11a>Partisipasi</span></div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-v-c995f11a><div class="relative group lg:col-span-1" data-v-c995f11a><div class="absolute inset-0 bg-brand-dark rounded-[2rem] translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 duration-300" data-v-c995f11a></div><div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-between min-h-[350px]" data-v-c995f11a><h3 class="text-xl font-black font-display text-brand-dark mb-4 text-center" data-v-c995f11a>Partisipasi Pemilih 👥</h3><div class="relative w-48 h-48 flex-shrink-0" data-v-c995f11a>`);
        _push(ssrRenderComponent(unref(Doughnut), {
          data: turnoutChartData.value,
          options: chartOptions
        }, null, _parent));
        _push(`<div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" data-v-c995f11a><span class="text-brand-dark/50 text-[10px] font-black uppercase tracking-widest" data-v-c995f11a>Total</span><span class="text-2xl font-black font-display text-brand-dark leading-none" data-v-c995f11a>${ssrInterpolate(totalVoters.value)}</span></div></div><div class="flex justify-center gap-6 mt-4 w-full" data-v-c995f11a><div class="flex items-center gap-2" data-v-c995f11a><span class="w-3.5 h-3.5 bg-brand-cyan border-2 border-brand-dark rounded-full" data-v-c995f11a></span><span class="text-xs font-bold text-brand-dark" data-v-c995f11a>Voted (${ssrInterpolate(usedVotersCount.value)})</span></div><div class="flex items-center gap-2" data-v-c995f11a><span class="w-3.5 h-3.5 bg-brand-pink border-2 border-brand-dark rounded-full" data-v-c995f11a></span><span class="text-xs font-bold text-brand-dark" data-v-c995f11a>Abstained (${ssrInterpolate(Math.max(0, totalVoters.value - usedVotersCount.value))})</span></div></div></div></div><div class="relative group lg:col-span-2" data-v-c995f11a><div class="absolute inset-0 bg-brand-dark rounded-[2rem] translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 duration-300" data-v-c995f11a></div><div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-6 md:p-8 flex flex-col h-full min-h-[350px]" data-v-c995f11a><h3 class="text-xl font-black font-display text-brand-dark mb-4 flex items-center gap-2" data-v-c995f11a><span data-v-c995f11a>Tren Kehadiran Pemilih 📈</span><span class="text-xs font-bold text-brand-pink bg-brand-light px-2.5 py-1 rounded-lg border-2 border-brand-dark" data-v-c995f11a>Live Graph</span></h3><div class="flex-grow w-full min-h-[220px]" data-v-c995f11a>`);
        _push(ssrRenderComponent(unref(Line), {
          data: timelineChartData.value,
          options: timelineChartOptions
        }, null, _parent));
        _push(`</div></div></div></div><!--[-->`);
        ssrRenderList({ chairman: "Ketua OSIS 🏆", vice_1: "Wakil Ketua I 🥈", vice_2: "Wakil Ketua II 🥉" }, (posLabel, posKey) => {
          _push(`<div class="relative group" data-v-c995f11a><div class="absolute inset-0 bg-brand-dark rounded-[2.5rem] translate-x-3 translate-y-3 transition-transform duration-300" data-v-c995f11a></div><div class="relative bg-white border-4 border-brand-dark rounded-[2.5rem] p-8 md:p-10 flex flex-col space-y-8" data-v-c995f11a><h3 class="text-3xl font-black font-display text-brand-dark flex items-center gap-3" data-v-c995f11a><span class="w-3 h-8 bg-brand-primary rounded-full border-2 border-brand-dark" data-v-c995f11a></span> ${ssrInterpolate(posLabel)}</h3><div class="flex flex-col lg:flex-row gap-12 items-center" data-v-c995f11a><div class="relative w-60 h-60 flex-shrink-0" data-v-c995f11a>`);
          if (results.value[posKey] && results.value[posKey].length) {
            _push(ssrRenderComponent(unref(Doughnut), {
              data: getChartData(posKey),
              options: chartOptions
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" data-v-c995f11a><span class="text-brand-dark/50 text-[10px] font-black uppercase tracking-widest font-display" data-v-c995f11a>Total</span><span class="text-3xl font-black font-display text-brand-dark leading-none" data-v-c995f11a>${ssrInterpolate(totalIncomingVotes.value)}</span></div></div><div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6" data-v-c995f11a><!--[-->`);
          ssrRenderList(results.value[posKey], (cand, index) => {
            _push(`<div class="group/cand bg-white border-4 border-brand-dark rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-sm relative overflow-hidden flex flex-col gap-4" data-v-c995f11a><div class="absolute left-0 top-0 bottom-0 w-2.5 transition-all duration-300 group-hover/cand:w-3.5 border-r-2 border-brand-dark" style="${ssrRenderStyle({ backgroundColor: chartColors[index % chartColors.length] })}" data-v-c995f11a></div><div class="pl-4 flex justify-between items-center gap-4" data-v-c995f11a><div class="flex items-center gap-4" data-v-c995f11a><div class="w-14 h-14 rounded-2xl border-4 border-brand-dark overflow-hidden shrink-0 shadow-brutal-sm group-hover/cand:rotate-3 transition-transform duration-300" data-v-c995f11a><img${ssrRenderAttr("src", cand.photo_url)} class="w-full h-full object-cover" data-v-c995f11a></div><div data-v-c995f11a><p class="text-[10px] font-black text-brand-dark/50 uppercase tracking-[0.15em] mb-0.5" data-v-c995f11a>Paslon #${ssrInterpolate(cand.sequence_number)}</p><h4 class="text-lg font-black font-display text-brand-dark leading-snug" data-v-c995f11a>${ssrInterpolate(cand.name)}</h4></div></div><div class="text-right shrink-0" data-v-c995f11a><div class="text-3xl font-black font-display text-brand-dark leading-none mb-1" data-v-c995f11a>${ssrInterpolate(cand.count)}</div><div class="text-sm font-black font-display px-2 py-0.5 rounded-lg border-2 border-brand-dark shadow-brutal-sm inline-block" style="${ssrRenderStyle({ backgroundColor: chartColors[index % chartColors.length] })}" data-v-c995f11a>${ssrInterpolate(cand.percentage.toFixed(1))}% </div></div></div><div class="w-full bg-brand-light border-4 border-brand-dark rounded-2xl h-7 overflow-hidden shadow-inner relative flex items-center" data-v-c995f11a><div class="h-full border-r-4 border-brand-dark brutalist-progress-bar transition-all duration-1000" style="${ssrRenderStyle({
              width: `${cand.percentage}%`,
              backgroundColor: chartColors[index % chartColors.length]
            })}" data-v-c995f11a></div><div class="absolute inset-0 flex items-center justify-center pointer-events-none" data-v-c995f11a><span class="text-xs font-black font-display text-brand-dark tracking-wide uppercase" data-v-c995f11a>${ssrInterpolate(cand.percentage.toFixed(1))}% Tercapai </span></div></div></div>`);
          });
          _push(`<!--]--></div></div></div></div>`);
        });
        _push(`<!--]--><div class="flex justify-center pt-8 pb-12" data-v-c995f11a><button class="px-8 py-5 bg-brand-accent hover:bg-brand-primary hover:text-white border-4 border-brand-dark rounded-2xl text-brand-dark font-black font-display text-xl transition-all duration-300 flex items-center gap-3 shadow-brutal hover:shadow-none active:translate-y-1 group" data-v-c995f11a>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: [{ "animate-spin": isLoading.value }, "text-brand-dark group-hover:text-white group-hover:rotate-180 transition-all duration-700 text-2xl"]
        }, null, _parent));
        _push(` Sinkronisasi Data Terbaru! 🔄 </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c995f11a"]]);

export { admin as default };
//# sourceMappingURL=admin-DfikLmC7.mjs.map
