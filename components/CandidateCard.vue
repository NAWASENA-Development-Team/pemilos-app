<template>
  <div class="group relative bg-white border-4 border-brand-dark rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-2 shadow-brutal-sm hover:shadow-brutal-lg overflow-hidden cursor-pointer">
    
    <div class="absolute top-6 right-6 w-14 h-14 bg-brand-accent border-4 border-brand-dark rounded-full flex items-center justify-center shadow-brutal-sm transform rotate-12 group-hover:-rotate-12 transition-transform duration-300 z-10">
      <span class="text-brand-dark font-black font-display text-2xl">#{{ candidate.sequence_number }}</span>
    </div>

    <div class="relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-6 bg-brand-light border-4 border-brand-dark shadow-inner group-hover:border-brand-pink transition-colors duration-300">
      <img 
        :src="candidate.photo_url" 
        :alt="candidate.name" 
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
      />
    </div>

    <div class="relative z-10 flex flex-col items-center text-center">
      <h2 class="text-2xl font-black font-display text-brand-dark mb-1 tracking-tight group-hover:text-brand-primary transition-colors">{{ candidate.name }}</h2>
      
      <div class="w-full flex gap-3 mt-4">
        <button 
          @click.stop="$emit('showDetails', candidate)" 
          class="flex-1 py-3 px-4 rounded-xl bg-brand-light hover:bg-brand-accent text-brand-dark border-4 border-brand-dark font-bold font-display text-sm transition-all shadow-brutal-sm active:translate-y-1 active:shadow-none"
        >
          Visi & Misi 📖
        </button>
        <div class="flex-1 py-3 px-4 rounded-xl bg-brand-primary text-white border-4 border-brand-dark font-black font-display text-sm shadow-brutal-sm group-hover:bg-brand-pink transition-colors flex items-center justify-center gap-1">
          Pilih <span>🚀</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  candidate: Object
})
defineEmits(['showDetails'])
</script>