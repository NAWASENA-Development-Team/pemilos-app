<template>
  <nav class="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
    <div class="max-w-7xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-3xl py-4 px-6 flex justify-between items-center transition-all duration-300 hover:border-blue-500/30">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span class="text-white font-bold text-xl">P</span>
        </div>
        <div>
          <h1 class="text-white font-bold text-lg tracking-tight leading-none">Pemilos</h1>
          <p class="text-blue-400 text-[10px] uppercase tracking-widest font-semibold mt-1">SMAN 2 Jonggol</p>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors text-sm font-medium">Beranda</NuxtLink>
        <NuxtLink to="/vote" class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95">
          Mulai Vote
        </NuxtLink>
      </div>

      <button class="md:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* Tambahkan micro-animation untuk link */
.router-link-active {
  color: #3b82f6;
  font-weight: 700;
}
</style>