import { _ as __nuxt_component_1 } from './index-CQQPKTjA.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useVoting } from './useVoting-CPSer0xH.mjs';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentVoter } = useVoting();
    const tokenInput = ref("");
    const isLoading = ref(false);
    const errorMessage = ref("");
    if (currentVoter.value) {
      navigateTo("/vote");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 overflow-hidden" }, _attrs))} data-v-c6823989><div class="text-center mb-12 space-y-6 z-10 animate-bounce-in" data-v-c6823989><div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-brand-primary shadow-brutal-sm transform hover:-rotate-2 transition-transform duration-300" data-v-c6823989><span class="text-2xl animate-pulse" data-v-c6823989>🎉</span><span class="text-brand-primary text-xs font-bold uppercase tracking-widest font-display" data-v-c6823989>Pesta Demokrasi Dimulai!</span></div><h1 class="text-5xl md:text-7xl font-black font-display text-brand-dark tracking-tight leading-[1.1]" data-v-c6823989> Suaramu, <br data-v-c6823989> <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-primary to-brand-cyan" data-v-c6823989>Masa Depan Kita!</span> 🌟 </h1><p class="text-brand-primary text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed font-display" data-v-c6823989> &quot;Yuk, pilih pemimpin kece untuk sekolah kita yang lebih baik!&quot; 🚀 </p></div><div class="w-full max-w-md relative group z-10" data-v-c6823989><div class="relative bg-white border-4 border-brand-dark rounded-[2rem] p-8 md:p-10 shadow-brutal-lg flex flex-col items-center transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300" data-v-c6823989><div class="mb-6 p-4 bg-brand-accent rounded-full border-4 border-brand-dark shadow-brutal-sm transform -rotate-6 group-hover:rotate-12 transition-transform duration-500" data-v-c6823989>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:ticket-solid",
        class: "text-5xl text-brand-dark"
      }, null, _parent));
      _push(`</div><h2 class="text-3xl font-black font-display text-brand-dark mb-2 text-center" data-v-c6823989>Tiket Masuk 🎟️</h2><p class="text-base text-brand-primary mb-8 text-center font-bold" data-v-c6823989>Masukkan token rahasiamu di bawah ini ya!</p><form class="w-full space-y-6" data-v-c6823989><div class="relative group/input" data-v-c6823989><input${ssrRenderAttr("value", tokenInput.value)} type="text" placeholder="PM-XXXX-XX" class="w-full bg-brand-light px-6 py-5 rounded-2xl border-4 border-brand-primary focus:border-brand-pink focus:outline-none focus:ring-4 focus:ring-brand-pink/30 transition-all font-display font-black text-center text-3xl uppercase tracking-widest text-brand-dark placeholder:text-brand-primary/40 shadow-inner"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-c6823989></div>`);
      if (errorMessage.value) {
        _push(`<div class="flex items-center gap-2 text-white text-sm font-bold justify-center bg-red-500 py-3 rounded-xl border-4 border-brand-dark shadow-brutal-sm" data-v-c6823989>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:face-frown-solid",
          class: "text-xl"
        }, null, _parent));
        _push(` ${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="w-full relative overflow-hidden bg-brand-pink text-white border-4 border-brand-dark font-black font-display text-xl py-5 rounded-2xl shadow-brutal-sm hover:shadow-brutal transition-all active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed group/btn" data-v-c6823989><div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" data-v-c6823989></div><div class="relative flex items-center justify-center gap-3" data-v-c6823989>`);
      if (isLoading.value) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:180-ring-with-bg",
          class: "text-3xl"
        }, null, _parent));
      } else {
        _push(`<span data-v-c6823989>Gas Memilih! 🚀</span>`);
      }
      _push(`</div></button></form></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c6823989"]]);

export { index as default };
//# sourceMappingURL=index-BnH5g45V.mjs.map
