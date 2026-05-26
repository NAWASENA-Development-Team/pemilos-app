<template>
  <nav class="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
    <div class="max-w-7xl mx-auto bg-white border-4 border-brand-dark shadow-brutal-sm hover:shadow-brutal rounded-3xl py-3 px-6 flex justify-between items-center transition-all duration-300">
      <div class="flex items-center gap-3 group cursor-pointer" @click="$router.push('/')">
        <div class="w-12 h-12 bg-brand-accent border-2 border-brand-dark rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
          <span class="text-brand-dark font-black font-display text-2xl">✨</span>
        </div>
        <div>
          <h1 class="text-brand-dark font-black font-display text-2xl tracking-tight leading-none group-hover:text-brand-primary transition-colors">Pemilos</h1>
          <p class="text-brand-pink text-[10px] uppercase tracking-widest font-bold mt-1">SMAN 2 Jonggol 🚀</p>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-6">
        <NuxtLink to="/" class="text-brand-dark hover:text-brand-pink hover:-translate-y-1 font-display transition-all font-bold text-lg">Beranda 🏠</NuxtLink>
        <NuxtLink to="/vote" class="bg-brand-cyan hover:bg-brand-primary border-2 border-brand-dark text-brand-dark hover:text-white px-6 py-2.5 rounded-2xl text-lg font-black font-display shadow-brutal-sm hover:shadow-none transition-all active:translate-y-1">
          Vote Sekarang! ⚡
        </NuxtLink>
      </div>

      <button class="md:hidden text-brand-dark bg-brand-light border-2 border-brand-dark p-2 hover:bg-brand-accent rounded-xl transition-colors shadow-brutal-sm active:translate-y-1 active:shadow-none">
        <Icon name="heroicons:bars-3-bottom-right-solid" class="h-6 w-6" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: #f472b6; /* brand-pink */
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 3px;
}
</style>