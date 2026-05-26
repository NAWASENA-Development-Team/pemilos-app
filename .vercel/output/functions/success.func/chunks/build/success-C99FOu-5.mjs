import { _ as __nuxt_component_1 } from './index-CQQPKTjA.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "success",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center min-h-[70vh] px-4" }, _attrs))} data-v-385f0c2c><div class="relative bg-white p-8 md:p-12 rounded-[3rem] shadow-brutal-lg border-4 border-brand-dark text-center max-w-lg w-full animate-bounce-in z-10" data-v-385f0c2c><div class="absolute -top-6 -left-6 text-6xl animate-spin-slow" data-v-385f0c2c>✨</div><div class="absolute -bottom-6 -right-6 text-6xl animate-bounce" data-v-385f0c2c>🎈</div><div class="w-32 h-32 bg-brand-accent border-4 border-brand-dark text-brand-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-brutal-sm transform rotate-12 hover:-rotate-12 transition-transform duration-500" data-v-385f0c2c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:hand-thumb-up-solid",
        class: "text-6xl"
      }, null, _parent));
      _push(`</div><h2 class="text-4xl md:text-5xl font-black font-display text-brand-dark mb-4" data-v-385f0c2c>Mantap! 🎉</h2><p class="text-brand-dark/80 font-bold mb-8 leading-relaxed text-lg" data-v-385f0c2c> Suaramu udah berhasil disimpen dengan aman! Makasih banyak udah ikutan PEMILOS 2026. Satu suara kamu sangat berarti! 🚀 </p><button class="w-full py-4 rounded-xl border-4 border-brand-dark bg-brand-cyan hover:bg-brand-primary text-brand-dark hover:text-white font-black font-display text-xl transition-all shadow-brutal-sm active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 group" data-v-385f0c2c>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:home-solid",
        class: "group-hover:animate-bounce"
      }, null, _parent));
      _push(` Balik ke Beranda 🏠 </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const success = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-385f0c2c"]]);

export { success as default };
//# sourceMappingURL=success-C99FOu-5.mjs.map
