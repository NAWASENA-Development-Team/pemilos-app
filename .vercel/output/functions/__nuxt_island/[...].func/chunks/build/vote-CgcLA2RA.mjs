import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_1 } from './index-CQQPKTjA.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useVoting } from './useVoting-CPSer0xH.mjs';
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
import 'vue-router';
import '@supabase/ssr';
import '@vue/shared';

const _sfc_main$2 = {
  __name: "CandidateCard",
  __ssrInlineRender: true,
  props: {
    candidate: Object
  },
  emits: ["showDetails"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative bg-white border-4 border-brand-dark rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-2 shadow-brutal-sm hover:shadow-brutal-lg overflow-hidden cursor-pointer" }, _attrs))}><div class="absolute top-6 right-6 w-14 h-14 bg-brand-accent border-4 border-brand-dark rounded-full flex items-center justify-center shadow-brutal-sm transform rotate-12 group-hover:-rotate-12 transition-transform duration-300 z-10"><span class="text-brand-dark font-black font-display text-2xl">#${ssrInterpolate(__props.candidate.sequence_number)}</span></div><div class="relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-6 bg-brand-light border-4 border-brand-dark shadow-inner group-hover:border-brand-pink transition-colors duration-300"><img${ssrRenderAttr("src", __props.candidate.photo_url)}${ssrRenderAttr("alt", __props.candidate.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"></div><div class="relative z-10 flex flex-col items-center text-center"><h2 class="text-2xl font-black font-display text-brand-dark mb-1 tracking-tight group-hover:text-brand-primary transition-colors">${ssrInterpolate(__props.candidate.name)}</h2><div class="w-full flex gap-3 mt-4"><button class="flex-1 py-3 px-4 rounded-xl bg-brand-light hover:bg-brand-accent text-brand-dark border-4 border-brand-dark font-bold font-display text-sm transition-all shadow-brutal-sm active:translate-y-1 active:shadow-none"> Visi &amp; Misi 📖 </button><div class="flex-1 py-3 px-4 rounded-xl bg-brand-primary text-white border-4 border-brand-dark font-black font-display text-sm shadow-brutal-sm group-hover:bg-brand-pink transition-colors flex items-center justify-center gap-1"> Pilih <span>🚀</span></div></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CandidateCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VisionMissionModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    candidate: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      if (__props.isOpen && __props.candidate) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden" }, _attrs))} data-v-f7eff269><div class="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" data-v-f7eff269></div><div class="relative bg-white border-4 border-brand-dark rounded-[2rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-brutal-lg overflow-hidden z-10" data-v-f7eff269><div class="absolute top-0 left-0 right-0 h-4 bg-brand-primary" data-v-f7eff269></div><div class="p-8 pb-4 flex justify-between items-start mt-2" data-v-f7eff269><div class="flex items-center gap-6" data-v-f7eff269><div class="w-20 h-20 rounded-2xl overflow-hidden border-4 border-brand-dark shadow-brutal-sm transform -rotate-6" data-v-f7eff269><img${ssrRenderAttr("src", __props.candidate.photo_url)}${ssrRenderAttr("alt", __props.candidate.name)} class="w-full h-full object-cover" data-v-f7eff269></div><div data-v-f7eff269><span class="inline-block px-3 py-1 rounded-full bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-widest mb-2 border-2 border-brand-dark shadow-brutal-sm" data-v-f7eff269> Kandidat #${ssrInterpolate(__props.candidate.sequence_number)}</span><h2 class="text-3xl font-black font-display text-brand-dark leading-tight tracking-tight" data-v-f7eff269>${ssrInterpolate(__props.candidate.name)}</h2></div></div><button class="p-2 bg-brand-light hover:bg-brand-pink border-2 border-brand-dark rounded-xl text-brand-dark hover:text-white transition-all shadow-brutal-sm active:translate-y-1 active:shadow-none hover:rotate-90" data-v-f7eff269>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark-20-solid",
          class: "text-2xl"
        }, null, _parent));
        _push(`</button></div><div class="px-8 pb-10 overflow-y-auto custom-scrollbar space-y-8 text-left" data-v-f7eff269><div class="space-y-4" data-v-f7eff269><h3 class="flex items-center gap-3 text-2xl font-black font-display text-brand-dark" data-v-f7eff269><div class="p-2 bg-brand-cyan rounded-xl border-2 border-brand-dark shadow-brutal-sm transform rotate-3" data-v-f7eff269>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:eye-solid",
          class: "text-brand-dark"
        }, null, _parent));
        _push(`</div> Visi 🌟 </h3><div class="bg-brand-light border-4 border-brand-dark rounded-3xl p-6 shadow-inner" data-v-f7eff269><p class="text-brand-dark leading-relaxed font-bold text-lg italic" data-v-f7eff269> &quot;${ssrInterpolate(__props.candidate.vision)}&quot; </p></div></div><div class="space-y-4" data-v-f7eff269><h3 class="flex items-center gap-3 text-2xl font-black font-display text-brand-dark" data-v-f7eff269><div class="p-2 bg-brand-pink rounded-xl border-2 border-brand-dark shadow-brutal-sm transform -rotate-3" data-v-f7eff269>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:flag-solid",
          class: "text-brand-dark"
        }, null, _parent));
        _push(`</div> Misi &amp; Program Kerja 🚀 </h3><div class="space-y-3" data-v-f7eff269><!--[-->`);
        ssrRenderList(__props.candidate.mission.split("\n"), (line, index) => {
          _push(`<div class="flex gap-4 bg-white border-2 border-brand-dark p-4 rounded-2xl group hover:bg-brand-accent transition-colors shadow-brutal-sm" data-v-f7eff269><span class="text-brand-primary font-black font-display text-lg" data-v-f7eff269>${ssrInterpolate(index + 1)}.</span><p class="text-brand-dark font-bold leading-relaxed text-sm" data-v-f7eff269>${ssrInterpolate(line)}</p></div>`);
        });
        _push(`<!--]--></div></div></div><div class="p-6 bg-brand-light border-t-4 border-brand-dark text-center" data-v-f7eff269><button class="w-full py-4 bg-brand-primary text-white font-black font-display text-xl rounded-xl border-4 border-brand-dark shadow-brutal-sm hover:shadow-brutal active:translate-y-1 active:shadow-none transition-all" data-v-f7eff269> Tutup Profil ✨ </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VisionMissionModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-f7eff269"]]), { __name: "VisionMissionModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "vote",
  __ssrInlineRender: true,
  setup(__props) {
    useVoting();
    const candidates = ref([]);
    const isLoading = ref(true);
    const isSubmitting = ref(false);
    const currentStep = ref(1);
    const selections = ref({
      chairman: null,
      vice_1: null,
      vice_2: null
    });
    const isVisionModalOpen = ref(false);
    const selectedCandidateForModal = ref(null);
    const filteredCandidates = computed(() => {
      const positions = ["chairman", "vice_1", "vice_2"];
      const targetPos = positions[currentStep.value - 1];
      return candidates.value.filter((c) => c.position === targetPos);
    });
    const currentPosName = computed(() => {
      const names = ["Ketua OSIS", "Wakil Ketua I", "Wakil Ketua II"];
      return names[currentStep.value - 1];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CandidateCard = _sfc_main$2;
      const _component_Icon = __nuxt_component_1;
      const _component_VisionMissionModal = __nuxt_component_2;
      if (!isLoading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto space-y-10 pb-40 px-4" }, _attrs))} data-v-757dc9c1><div class="flex justify-center items-center gap-4 mb-12 mt-8" data-v-757dc9c1><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="${ssrRenderClass([[currentStep.value >= i ? "opacity-100" : "opacity-40"], "flex items-center gap-3 transition-all duration-500"])}" data-v-757dc9c1><div class="${ssrRenderClass([
            "w-14 h-14 rounded-2xl flex items-center justify-center font-black font-display text-2xl border-4 transition-all duration-300 shadow-brutal-sm",
            currentStep.value === i ? "bg-brand-accent border-brand-dark text-brand-dark scale-110 rotate-6" : currentStep.value > i ? "bg-green-400 border-brand-dark text-brand-dark scale-100" : "bg-white border-brand-dark text-brand-dark/50"
          ])}" data-v-757dc9c1>`);
          if (currentStep.value > i) {
            _push(`<span data-v-757dc9c1>✔️</span>`);
          } else {
            _push(`<span data-v-757dc9c1>${ssrInterpolate(i)}</span>`);
          }
          _push(`</div>`);
          if (i < 3) {
            _push(`<div class="${ssrRenderClass([currentStep.value > i ? "bg-green-400" : "bg-white", "w-12 h-2 rounded-full border-2 border-brand-dark"])}" data-v-757dc9c1></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="text-center space-y-4 animate-bounce-in bg-white border-4 border-brand-dark p-8 rounded-[2rem] shadow-brutal-lg max-w-2xl mx-auto transform -rotate-1" data-v-757dc9c1><h2 class="text-4xl md:text-5xl font-black font-display text-brand-dark tracking-tight" data-v-757dc9c1>Pilih <span class="text-brand-primary underline decoration-brand-accent decoration-8 underline-offset-4" data-v-757dc9c1>${ssrInterpolate(currentPosName.value)}</span> 🎯</h2><p class="text-brand-dark/80 font-bold text-lg" data-v-757dc9c1>Klik kartu kandidat yang paling oke menurut kamu!</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8" data-v-757dc9c1><!--[-->`);
        ssrRenderList(filteredCandidates.value, (candidate) => {
          _push(`<div class="${ssrRenderClass([[selections.value[Object.keys(selections.value)[currentStep.value - 1]]?.id === candidate.id ? "scale-[1.05] z-20" : "hover:scale-[1.02] z-10"], "relative transition-all duration-300 transform"])}" data-v-757dc9c1>`);
          if (selections.value[Object.keys(selections.value)[currentStep.value - 1]]?.id === candidate.id) {
            _push(`<div class="absolute -inset-2 bg-brand-accent rounded-[2.5rem] border-4 border-brand-dark shadow-brutal-lg z-0 transform rotate-2 animate-pulse" data-v-757dc9c1></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_CandidateCard, {
            candidate,
            class: "relative z-10 h-full",
            onShowDetails: (c) => {
              selectedCandidateForModal.value = c;
              isVisionModalOpen.value = true;
            }
          }, null, _parent));
          if (selections.value[Object.keys(selections.value)[currentStep.value - 1]]?.id === candidate.id) {
            _push(`<div class="absolute -top-4 -right-4 z-30 bg-green-400 text-brand-dark w-16 h-16 rounded-full flex items-center justify-center shadow-brutal-sm border-4 border-brand-dark transform rotate-12" data-v-757dc9c1>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:check-badge-solid",
              class: "text-4xl"
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="fixed bottom-0 left-0 right-0 p-4 z-40" data-v-757dc9c1><div class="max-w-4xl mx-auto bg-white border-4 border-brand-dark p-4 md:p-6 rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] shadow-brutal-lg flex flex-col md:flex-row items-center justify-between gap-6 transform transition-transform duration-300 hover:-translate-y-2" data-v-757dc9c1><div class="flex gap-4 px-2 w-full md:w-auto justify-center" data-v-757dc9c1><!--[-->`);
        ssrRenderList(selections.value, (val, key) => {
          _push(`<div class="group relative" data-v-757dc9c1><div class="${ssrRenderClass([{ "border-solid bg-brand-light shadow-brutal-sm transform hover:scale-110 hover:-rotate-6": val, "bg-gray-100": !val }, "w-16 h-16 rounded-2xl border-4 border-brand-dark border-dashed flex items-center justify-center overflow-hidden transition-all duration-300"])}" data-v-757dc9c1>`);
          if (val) {
            _push(`<img${ssrRenderAttr("src", val.photo_url)} class="w-full h-full object-cover" data-v-757dc9c1>`);
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:user-solid",
              class: "text-brand-dark/20 text-2xl"
            }, null, _parent));
          }
          _push(`</div>`);
          if (val) {
            _push(`<span class="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-dark text-white font-bold text-xs py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-brutal-sm pointer-events-none after:content-[&#39;&#39;] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-brand-dark" data-v-757dc9c1>${ssrInterpolate(val.name)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div class="flex gap-3 w-full md:w-auto" data-v-757dc9c1>`);
        if (currentStep.value > 1) {
          _push(`<button class="flex-1 md:flex-none px-6 py-4 rounded-xl bg-brand-light hover:bg-brand-accent text-brand-dark border-4 border-brand-dark font-black font-display text-lg shadow-brutal-sm active:translate-y-1 active:shadow-none transition-all" data-v-757dc9c1> ⬅️ Balik </button>`);
        } else {
          _push(`<!---->`);
        }
        if (currentStep.value < 3) {
          _push(`<button${ssrIncludeBooleanAttr(!selections.value[Object.keys(selections.value)[currentStep.value - 1]]) ? " disabled" : ""} class="flex-1 md:flex-none px-8 py-4 rounded-xl bg-brand-primary hover:bg-brand-pink text-white border-4 border-brand-dark font-black font-display text-lg shadow-brutal-sm active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-primary" data-v-757dc9c1> Lanjut ➡️ </button>`);
        } else {
          _push(`<button${ssrIncludeBooleanAttr(!selections.value.vice_2 || isSubmitting.value) ? " disabled" : ""} class="flex-1 md:flex-none px-8 py-4 rounded-xl bg-green-400 hover:bg-green-300 text-brand-dark border-4 border-brand-dark font-black font-display text-lg shadow-brutal-sm active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden" data-v-757dc9c1><span class="relative z-10 flex items-center justify-center gap-2" data-v-757dc9c1>`);
          if (isSubmitting.value) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "svg-spinners:180-ring-with-bg",
              class: "text-2xl"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(isSubmitting.value ? "Tunggu Bentar..." : "Kirim Pilihanku! 🚀")}</span><div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" data-v-757dc9c1></div></button>`);
        }
        _push(`</div></div></div>`);
        _push(ssrRenderComponent(_component_VisionMissionModal, {
          isOpen: isVisionModalOpen.value,
          candidate: selectedCandidateForModal.value,
          onClose: ($event) => isVisionModalOpen.value = false
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center min-h-[60vh] gap-6" }, _attrs))} data-v-757dc9c1><div class="w-20 h-20 border-8 border-brand-light border-t-brand-primary rounded-full animate-spin shadow-brutal-sm" data-v-757dc9c1></div><p class="text-brand-dark font-black font-display tracking-widest text-xl uppercase animate-bounce" data-v-757dc9c1>Nyapin Bilik Suara... 🏃💨</p></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/vote.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vote = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-757dc9c1"]]);

export { vote as default };
//# sourceMappingURL=vote-CgcLA2RA.mjs.map
