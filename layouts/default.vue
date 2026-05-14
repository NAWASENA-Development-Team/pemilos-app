<script setup lang="ts">
// Layout dasar
</script>

<template>
  <div class="min-h-screen bg-[#070b14] font-sans text-slate-200 flex flex-col selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
    
    <div class="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

    <Navbar />
    
    <main class="flex-grow container mx-auto px-4 pt-32 pb-12 relative z-10">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>