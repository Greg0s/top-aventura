<script setup lang="ts">
import { ref } from "vue";

const playerCount = ref(2);

const increment = () => {
  if (playerCount.value < 10) playerCount.value++;
};

const decrement = () => {
  if (playerCount.value > 1) playerCount.value--;
};
</script>

<template>
  <div
    class="w-[375px] h-[667px] bg-orange-50 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative border-[8px] border-white"
  >
    <div
      class="absolute -top-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"
    ></div>

    <div
      class="flex-1 flex flex-col items-center justify-between py-12 px-8 z-10"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-32 h-32 bg-white rounded-[2.5rem] shadow-soft flex items-center justify-center border-4 border-orange-200 mb-4"
        >
          <span class="text-6xl">🦊</span>
        </div>
        <h1 class="font-['Comfortaa'] text-3xl font-bold text-orange-900">
          Top Aventura
        </h1>
      </div>

      <div
        class="w-full bg-white rounded-[2.5rem] p-6 shadow-soft flex flex-col items-center border border-orange-100"
      >
        <p class="text-orange-900 font-semibold mb-4 text-lg">
          Nombre de joueurs
        </p>

        <div class="flex items-center gap-6">
          <button
            @click="decrement"
            class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 text-2xl flex items-center justify-center hover:bg-orange-200 transition-colors shadow-sm"
          >
            <i class="fa-solid fa-minus"></i>
          </button>

          <span
            class="text-5xl font-['Comfortaa'] font-bold text-orange-500 w-12 text-center"
          >
            {{ playerCount }}
          </span>

          <button
            @click="increment"
            class="w-12 h-12 rounded-2xl bg-orange-400 text-white text-2xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-md active:scale-95"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <button
        class="w-full h-16 bg-orange-400 hover:bg-orange-500 text-white font-['Comfortaa'] text-xl font-bold rounded-[2rem] shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 group"
      >
        Commencer
        <i
          class="fa-solid fa-play group-hover:translate-x-1 transition-transform"
        ></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.shadow-soft {
  box-shadow: 0 15px 30px -10px rgba(251, 146, 60, 0.2);
}
</style>
