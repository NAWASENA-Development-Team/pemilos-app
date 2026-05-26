import { _ as __nuxt_component_1 } from './index-CQQPKTjA.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { u as useVoting, a as useSupabaseClient } from './useVoting-CPSer0xH.mjs';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
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
    Chart.register(ArcElement, Tooltip, Legend);
    useVoting();
    useSupabaseClient();
    const candidates = ref([]);
    const votes = ref([]);
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
    const chartColors = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];
    const hoverColors = ["#60A5FA", "#A78BFA", "#F472B6", "#FBBF24", "#34D399"];
    const getChartData = (posKey) => {
      const categoryData = results.value[posKey] || [];
      return {
        labels: categoryData.map((c) => c.name),
        datasets: [
          {
            data: categoryData.map((c) => c.count),
            backgroundColor: chartColors.slice(0, categoryData.length),
            hoverBackgroundColor: hoverColors.slice(0, categoryData.length),
            borderWidth: 0,
            hoverOffset: 15
            // Efek playful saat di-hover
          }
        ]
      };
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "75%",
      // Membuat lubang donat lebih besar & elegan
      plugins: {
        legend: { display: false },
        // Disembunyikan karena kita buat legend custom di UI
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          titleFont: { size: 14, family: "Inter" },
          bodyFont: { size: 14, weight: "bold" },
          padding: 12,
          cornerRadius: 12,
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0B0F19] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] text-slate-200 selection:bg-blue-500/30 font-sans" }, _attrs))} data-v-51f561c7><div class="max-w-7xl mx-auto py-12 px-6" data-v-51f561c7>`);
      if (!isAuthenticated.value) {
        _push(`<div class="min-h-[70vh] flex items-center justify-center" data-v-51f561c7><div class="w-full max-w-md relative group" data-v-51f561c7><div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" data-v-51f561c7></div><div class="relative bg-[#111827]/80 backdrop-blur-2xl border border-white/10 p-12 rounded-[3rem] text-center shadow-2xl" data-v-51f561c7><div class="mb-8 inline-flex p-5 bg-red-500/10 rounded-full border border-red-500/20 ring-4 ring-red-500/5" data-v-51f561c7>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:lock-closed-solid",
          class: "text-4xl text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
        }, null, _parent));
        _push(`</div><h2 class="text-3xl font-black text-white mb-3 tracking-tight" data-v-51f561c7>Restricted Area</h2><p class="text-slate-400 text-sm mb-10 font-medium leading-relaxed" data-v-51f561c7>Hanya panitia inti (Demisioner) yang diizinkan mengakses data real-time ini.</p><form class="space-y-5" data-v-51f561c7><div class="relative" data-v-51f561c7><input${ssrRenderAttr("value", passwordInput.value)} type="password" placeholder="Password Admin..." class="w-full bg-black/40 px-6 py-4 rounded-2xl border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none text-center text-white font-mono tracking-[0.3em] transition-all" data-v-51f561c7>`);
        if (loginError.value) {
          _push(`<p class="absolute -bottom-6 left-0 right-0 text-red-400 text-xs font-bold animate-bounce" data-v-51f561c7>Password tidak valid!</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98] mt-4" data-v-51f561c7> Buka Panel Hasil </button></form></div></div></div>`);
      } else {
        _push(`<div class="space-y-16 animate-fade-in" data-v-51f561c7><div class="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-12" data-v-51f561c7><div class="text-center md:text-left" data-v-51f561c7><div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6" data-v-51f561c7><span class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping absolute" data-v-51f561c7></span><span class="w-2.5 h-2.5 bg-blue-500 rounded-full relative" data-v-51f561c7></span> Live Vote Calculation </div><h1 class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tighter drop-shadow-sm" data-v-51f561c7> Real-Time Results </h1></div><div class="bg-[#111827]/60 border border-white/10 px-10 py-6 rounded-3xl backdrop-blur-xl text-center md:text-right hover:bg-white/[0.02] transition-colors" data-v-51f561c7><p class="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2" data-v-51f561c7>Total Suara Masuk</p><div class="flex items-baseline justify-center md:justify-end gap-2" data-v-51f561c7><span class="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" data-v-51f561c7>${ssrInterpolate(totalIncomingVotes.value)}</span><span class="text-blue-400 font-bold tracking-wide" data-v-51f561c7>Pemilih</span></div></div></div><!--[-->`);
        ssrRenderList({ chairman: "Ketua OSIS", vice_1: "Wakil Ketua I", vice_2: "Wakil Ketua II" }, (posLabel, posKey) => {
          _push(`<div class="bg-[#111827]/40 border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-md" data-v-51f561c7><h3 class="text-3xl font-black text-white/90 flex items-center gap-4 mb-10" data-v-51f561c7><div class="w-2 h-10 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" data-v-51f561c7></div> ${ssrInterpolate(posLabel)}</h3><div class="flex flex-col lg:flex-row gap-12 items-center" data-v-51f561c7><div class="relative w-64 h-64 flex-shrink-0" data-v-51f561c7>`);
          if (results.value[posKey] && results.value[posKey].length) {
            _push(ssrRenderComponent(unref(Doughnut), {
              data: getChartData(posKey),
              options: chartOptions
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" data-v-51f561c7><span class="text-slate-400 text-[10px] font-bold uppercase tracking-widest" data-v-51f561c7>Total</span><span class="text-2xl font-black text-white" data-v-51f561c7>${ssrInterpolate(totalIncomingVotes.value)}</span></div></div><div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4" data-v-51f561c7><!--[-->`);
          ssrRenderList(results.value[posKey], (cand, index) => {
            _push(`<div class="group bg-white/[0.02] border border-white/5 rounded-3xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-1 relative overflow-hidden" data-v-51f561c7><div class="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl transition-all duration-300 group-hover:w-2" style="${ssrRenderStyle({ backgroundColor: chartColors[index % chartColors.length] })}" data-v-51f561c7></div><div class="pl-4 flex justify-between items-center" data-v-51f561c7><div data-v-51f561c7><p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1" data-v-51f561c7>Paslon #${ssrInterpolate(cand.sequence_number)}</p><h4 class="text-lg font-bold text-slate-200 group-hover:text-white transition-colors" data-v-51f561c7>${ssrInterpolate(cand.name)}</h4></div><div class="text-right" data-v-51f561c7><div class="text-3xl font-black text-white mb-0.5" data-v-51f561c7>${ssrInterpolate(cand.count)}</div><div class="text-xs font-bold" style="${ssrRenderStyle({ color: chartColors[index % chartColors.length] })}" data-v-51f561c7>${ssrInterpolate(cand.percentage.toFixed(1))}% </div></div></div></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        });
        _push(`<!--]--><div class="flex justify-center pt-8 pb-12" data-v-51f561c7><button class="px-8 py-4 bg-[#111827]/80 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-300 font-bold transition-all duration-300 flex items-center gap-3 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-95 group" data-v-51f561c7>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: [{ "animate-spin": isLoading.value }, "text-blue-400 group-hover:rotate-180 transition-transform duration-500"]
        }, null, _parent));
        _push(` Sinkronisasi Data Terbaru </button></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-51f561c7"]]);

export { admin as default };
//# sourceMappingURL=admin-DRV8B3pM.mjs.map
