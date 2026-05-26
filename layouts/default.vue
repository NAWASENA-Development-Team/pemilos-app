<script setup lang="ts">
// Layout dasar
</script>

<template>
  <div class="min-h-screen bg-[#fdf4ff] font-sans text-brand-dark flex flex-col selection:bg-brand-pink/30 selection:text-brand-primary overflow-x-hidden relative">
    
    <!-- Playful Background Blobs -->
    <div class="fixed top-[-5%] left-[-10%] w-[600px] h-[600px] bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply animate-pulse" style="animation-duration: 8s;"></div>
    <div class="fixed top-[20%] right-[-5%] w-[400px] h-[400px] bg-brand-pink/20 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-multiply animate-pulse" style="animation-duration: 10s;"></div>
    <div class="fixed bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-accent/30 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply animate-pulse" style="animation-duration: 12s;"></div>

    <!-- Wavy pattern overlay for extra playfulness -->
    <div class="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style="background-image: radial-gradient(circle at 2px 2px, #7c3aed 1px, transparent 0); background-size: 32px 32px;"></div>

    <Navbar />
    
    <main class="flex-grow container mx-auto px-4 pt-32 pb-12 relative z-10">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>