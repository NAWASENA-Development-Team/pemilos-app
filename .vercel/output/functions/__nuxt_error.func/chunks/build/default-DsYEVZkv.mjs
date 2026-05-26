import { _ as __nuxt_component_0$1 } from './nuxt-link-CEuyMcXv.mjs';
import { _ as __nuxt_component_1$1, a as __nuxt_component_0$2 } from './index-CQQPKTjA.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './composables-BZs227Uh.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  const _component_Icon = __nuxt_component_1$1;
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed top-4 left-0 right-0 z-50 px-4 md:px-8" }, _attrs))} data-v-b521da4f><div class="max-w-7xl mx-auto bg-white border-4 border-brand-dark shadow-brutal-sm hover:shadow-brutal rounded-3xl py-3 px-6 flex justify-between items-center transition-all duration-300" data-v-b521da4f><div class="flex items-center gap-3 group cursor-pointer" data-v-b521da4f><div class="w-12 h-12 bg-brand-accent border-2 border-brand-dark rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300" data-v-b521da4f><span class="text-brand-dark font-black font-display text-2xl" data-v-b521da4f>✨</span></div><div data-v-b521da4f><h1 class="text-brand-dark font-black font-display text-2xl tracking-tight leading-none group-hover:text-brand-primary transition-colors" data-v-b521da4f>Pemilos</h1><p class="text-brand-pink text-[10px] uppercase tracking-widest font-bold mt-1" data-v-b521da4f>SMAN 2 Jonggol 🚀</p></div></div><div class="hidden md:flex items-center gap-6" data-v-b521da4f>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "text-brand-dark hover:text-brand-pink hover:-translate-y-1 font-display transition-all font-bold text-lg"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Beranda 🏠`);
      } else {
        return [
          createTextVNode("Beranda 🏠")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/vote",
    class: "bg-brand-cyan hover:bg-brand-primary border-2 border-brand-dark text-brand-dark hover:text-white px-6 py-2.5 rounded-2xl text-lg font-black font-display shadow-brutal-sm hover:shadow-none transition-all active:translate-y-1"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Vote Sekarang! ⚡ `);
      } else {
        return [
          createTextVNode(" Vote Sekarang! ⚡ ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><button class="md:hidden text-brand-dark bg-brand-light border-2 border-brand-dark p-2 hover:bg-brand-accent rounded-xl transition-colors shadow-brutal-sm active:translate-y-1 active:shadow-none" data-v-b521da4f>`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "heroicons:bars-3-bottom-right-solid",
    class: "h-6 w-6"
  }, null, _parent));
  _push(`</button></div></nav>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b521da4f"]]), { __name: "Navbar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-20 border-t-4 border-brand-dark pt-12 pb-8 px-4 relative z-40 bg-brand-light" }, _attrs))} data-v-f50486d5><div class="max-w-7xl mx-auto" data-v-f50486d5><div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12" data-v-f50486d5><div data-v-f50486d5><h3 class="text-brand-dark font-black font-display text-2xl mb-4" data-v-f50486d5>Pemilos Asik! 🎉</h3><p class="text-brand-dark/70 text-sm leading-relaxed max-w-sm font-bold" data-v-f50486d5> Platform pemilihan ketua OSIS digital yang fun, transparan, dan pastinya aman. Bikin milih pemimpin jadi lebih seru! 🚀 </p></div><div class="md:text-right" data-v-f50486d5><h4 class="text-brand-primary font-black font-display mb-4 text-sm uppercase tracking-wider" data-v-f50486d5>Jalan Pintas 🗺️</h4><div class="flex flex-col md:items-end gap-3" data-v-f50486d5><button class="text-brand-dark hover:text-brand-pink font-bold text-sm transition-colors text-left md:text-right hover:underline decoration-2 underline-offset-4" data-v-f50486d5> Syarat &amp; Ketentuan 📜 </button><button class="text-brand-dark hover:text-brand-pink font-bold text-sm transition-colors text-left md:text-right hover:underline decoration-2 underline-offset-4" data-v-f50486d5> Cara Milih 🗳️ </button></div></div></div><div class="border-t-4 border-brand-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4" data-v-f50486d5><p class="text-brand-dark font-bold text-xs" data-v-f50486d5> © 2026 MPK/OSIS SMAN 2 Jonggol. All Rights Reserved. ✨ </p><div class="flex gap-4 items-center bg-white px-4 py-2 border-2 border-brand-dark rounded-full shadow-brutal-sm" data-v-f50486d5><span class="w-3 h-3 bg-green-500 rounded-full animate-bounce" data-v-f50486d5></span><span class="text-brand-dark font-black font-display text-[10px] uppercase tracking-wider" data-v-f50486d5>Sistem Aman &amp; Aktif 🛡️</span></div></div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-f50486d5"]]), { __name: "Footer" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Navbar = __nuxt_component_0;
      const _component_Footer = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#fdf4ff] font-sans text-brand-dark flex flex-col selection:bg-brand-pink/30 selection:text-brand-primary overflow-x-hidden relative" }, _attrs))}><div class="fixed top-[-5%] left-[-10%] w-[600px] h-[600px] bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply animate-pulse" style="${ssrRenderStyle({ "animation-duration": "8s" })}"></div><div class="fixed top-[20%] right-[-5%] w-[400px] h-[400px] bg-brand-pink/20 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-multiply animate-pulse" style="${ssrRenderStyle({ "animation-duration": "10s" })}"></div><div class="fixed bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-accent/30 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply animate-pulse" style="${ssrRenderStyle({ "animation-duration": "12s" })}"></div><div class="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle at 2px 2px, #7c3aed 1px, transparent 0)", "background-size": "32px 32px" })}"></div>`);
      _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
      _push(`<main class="flex-grow container mx-auto px-4 pt-32 pb-12 relative z-10">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DsYEVZkv.mjs.map
