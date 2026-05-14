<template>
  <div class="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] overflow-hidden cursor-pointer">
    
    <div class="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform z-10">
      <span class="text-white font-black text-2xl">{{ candidate.sequence_number }}</span>
    </div>

    <div class="relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-6 bg-[#1a1c23] border border-white/5">
      <img 
        :src="candidate.photo_url" 
        :alt="candidate.name" 
        class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent"></div>
    </div>

    <div class="relative z-10 flex flex-col items-center text-center">
      <h2 class="text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-blue-400 transition-colors">{{ candidate.name }}</h2>
      
      <div class="w-full flex gap-3 mt-4">
        <button 
          @click.stop="$emit('showDetails', candidate)" 
          class="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-sm transition-all border border-white/10 hover:border-white/20"
        >
          Visi & Misi
        </button>
        <div class="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm">
          Pilih #{{ candidate.sequence_number }}
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