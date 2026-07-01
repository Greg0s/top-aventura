<script setup lang="ts">
import { ref } from "vue";

// State initialization
const isPlaying = ref(false);
const playerCount = ref(2);
const currentPlayerIndex = ref(0);
const isNumberRevealed = ref(false);
const playerNumbers = ref<number[]>([]);

// Home screen handlers
const increment = () => {
  if (playerCount.value < 10) {
    playerCount.value++;
  }
};

const decrement = () => {
  if (playerCount.value > 1) {
    playerCount.value--;
  }
};

const startGame = () => {
  // Generate base numbers from 1 to 10
  const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Shuffle array using Fisher-Yates algorithm
  for (let i = availableNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = availableNumbers[i];
    availableNumbers[i] = availableNumbers[j];
    availableNumbers[j] = temp;
  }

  // Extract only the required amount of unique numbers
  playerNumbers.value = availableNumbers.slice(0, playerCount.value);

  // Reset game state for the new round
  currentPlayerIndex.value = 0;
  isNumberRevealed.value = false;
  isPlaying.value = true;
};

// Game screen handlers
const revealNumber = () => {
  isNumberRevealed.value = true;
};

const nextPlayer = () => {
  if (currentPlayerIndex.value < playerCount.value - 1) {
    // Progress to the next player
    currentPlayerIndex.value++;
    isNumberRevealed.value = false;
  } else {
    // Max players reached, return to home screen
    isPlaying.value = false;
  }
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
      v-if="!isPlaying"
      class="flex-1 flex flex-col items-center justify-between py-12 px-8 z-10"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-32 h-32 bg-white rounded-[2.5rem] shadow-soft flex items-center justify-center border-4 border-orange-200 mb-4"
        >
          <span class="text-6xl">🦊</span>
        </div>
        <h1
          class="font-['Oi'] text-3xl text-orange-900 text-center tracking-wide"
        >
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

          <span class="text-5xl font-['Oi'] text-orange-500 w-12 text-center">
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
        @click="startGame"
        class="w-full h-16 bg-orange-400 hover:bg-orange-500 text-white font-['Oi'] text-xl rounded-[2rem] shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 group tracking-wider"
      >
        Commencer
        <i
          class="fa-solid fa-play group-hover:translate-x-1 transition-transform"
        ></i>
      </button>
    </div>

    <div
      v-if="isPlaying"
      class="flex-1 flex flex-col items-center justify-between py-12 px-8 z-10"
    >
      <div class="text-center mt-8">
        <h2 class="font-['Oi'] text-4xl text-orange-900 mb-2 tracking-wide">
          Joueur n°{{ currentPlayerIndex + 1 }}
        </h2>
      </div>

      <div class="flex-1 w-full flex flex-col items-center justify-center">
        <div
          v-if="isNumberRevealed"
          class="w-48 h-48 bg-white rounded-full shadow-soft flex items-center justify-center border-8 border-orange-400 animate-pop"
        >
          <span class="font-['Oi'] text-8xl text-orange-500">{{
            playerNumbers[currentPlayerIndex]
          }}</span>
        </div>

        <div
          v-else
          class="w-48 h-48 bg-orange-200 rounded-full shadow-inner flex items-center justify-center border-8 border-dashed border-orange-400"
        >
          <i
            class="fa-solid fa-question text-6xl text-orange-400 opacity-50"
          ></i>
        </div>
      </div>

      <button
        v-if="!isNumberRevealed"
        @click="revealNumber"
        class="w-full h-16 bg-orange-400 hover:bg-orange-500 text-white font-['Oi'] text-lg rounded-[2rem] shadow-lg shadow-orange-200 transition-all active:scale-95 tracking-wide"
      >
        Afficher le numéro
      </button>

      <button
        v-if="isNumberRevealed"
        @click="nextPlayer"
        class="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white font-['Oi'] text-lg rounded-[2rem] shadow-lg shadow-orange-300 transition-all active:scale-95 flex items-center justify-center gap-3 group tracking-wide"
      >
        {{
          currentPlayerIndex < playerCount - 1
            ? "Passer au suivant"
            : "Terminer"
        }}
        <i
          class="fa-solid"
          :class="
            currentPlayerIndex < playerCount - 1
              ? 'fa-arrow-right group-hover:translate-x-1'
              : 'fa-house'
          "
        ></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Honk:MORF@15&family=Oi&display=swap");

.shadow-soft {
  box-shadow: 0 15px 30px -10px rgba(251, 146, 60, 0.2);
}

.animate-pop {
  animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
}

@keyframes pop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
