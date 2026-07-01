<script setup lang="ts">
import { ref } from "vue";

// State initialization
const isPlaying = ref(false);
const showOptions = ref(false);
const playerCount = ref(2);
const maxPlayers = ref(10);
const allowRepeat = ref(false);
const currentPlayerIndex = ref(0);
const isNumberRevealed = ref(false);
const playerNumbers = ref<number[]>([]);

// Home screen handlers
const incrementPlayerCount = () => {
  if (playerCount.value < maxPlayers.value) {
    playerCount.value++;
  }
};

const decrementPlayerCount = () => {
  if (playerCount.value > 1) {
    playerCount.value--;
  }
};

const incrementMaxPlayers = () => {
  if (maxPlayers.value < 100) {
    maxPlayers.value++;
  }
};

const decrementMaxPlayers = () => {
  if (maxPlayers.value > playerCount.value) {
    maxPlayers.value--;
  }
};

const toggleRepeat = () => {
  allowRepeat.value = !allowRepeat.value;
};

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const startGame = () => {
  if (!allowRepeat.value && playerCount.value > maxPlayers.value) {
    alert(
      "Le nombre de joueurs ne peut pas dépasser le nombre maximum si les chiffres ne se répètent pas.",
    );
    return;
  }

  if (!allowRepeat.value) {
    const availableNumbers = Array.from(
      { length: maxPlayers.value },
      (_, i) => i + 1,
    );

    for (let i = availableNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = availableNumbers[i];
      availableNumbers[i] = availableNumbers[j];
      availableNumbers[j] = temp;
    }

    playerNumbers.value = availableNumbers.slice(0, playerCount.value);
  } else {
    playerNumbers.value = Array.from(
      { length: playerCount.value },
      () => Math.floor(Math.random() * maxPlayers.value) + 1,
    );
  }

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
    currentPlayerIndex.value++;
    isNumberRevealed.value = false;
  } else {
    isPlaying.value = false;
  }
};
</script>

<template>
  <div
    class="min-w-[100dvw] min-h-[100dvh] bg-orange-50 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative"
  >
    <div
      class="absolute -top-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"
    ></div>

    <div
      v-if="!isPlaying"
      class="flex-1 flex flex-col items-center justify-between py-8 px-8 z-10 overflow-y-auto"
    >
      <div class="flex flex-col items-center mt-4 w-full max-w-md">
        <img
          src="/src/assets/top-aventura-logo.png"
          alt="Top Aventura Logo"
          class="h-80 aspect-[4/5] object-contain mb-2"
        />
      </div>

      <div
        class="w-full flex-1 flex flex-col gap-6 justify-center items-center max-w-md"
      >
        <div
          class="w-full bg-white rounded-[2.5rem] p-6 shadow-soft flex flex-col items-center border border-orange-100"
        >
          <p
            class="text-orange-900 font-['Nunito'] font-black tracking-widest mb-4 text-xl"
          >
            Nombre de joueurs
          </p>
          <div class="flex items-center gap-10">
            <button
              @click="decrementPlayerCount"
              class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 text-2xl flex items-center justify-center hover:bg-orange-200 transition-colors shadow-sm"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <span
              class="text-5xl font-['Fredoka'] font-bold text-orange-500 w-12 text-center"
            >
              {{ playerCount }}
            </span>
            <button
              @click="incrementPlayerCount"
              class="w-12 h-12 rounded-2xl bg-orange-400 text-white text-2xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-md active:scale-95"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div
          class="w-full bg-white rounded-[2.5rem] p-6 shadow-soft flex flex-col border border-orange-100"
        >
          <button
            @click="toggleOptions"
            class="w-full relative flex items-center justify-center text-orange-900 font-['Nunito'] font-black tracking-widest text-xl focus:outline-none"
          >
            <span>Options</span>
            <i
              class="fa-solid absolute right-0 text-orange-400 text-sm transition-transform duration-300"
              :class="showOptions ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
          </button>

          <Transition name="expand">
            <div v-if="showOptions" class="overflow-hidden">
              <div
                class="flex flex-col gap-6 mt-5 border-t border-orange-50 pt-5"
              >
                <div class="flex flex-col items-center gap-3">
                  <p
                    class="text-orange-900 font-semibold text-base font-['Nunito'] text-center"
                  >
                    Nombre maximum
                  </p>
                  <div class="flex items-center gap-10">
                    <button
                      @click="decrementMaxPlayers"
                      class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 text-xl flex items-center justify-center hover:bg-orange-200 transition-colors shadow-sm"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span
                      class="text-3xl font-['Fredoka'] font-bold text-orange-500 w-12 text-center"
                    >
                      {{ maxPlayers }}
                    </span>
                    <button
                      @click="incrementMaxPlayers"
                      class="w-10 h-10 rounded-xl bg-orange-400 text-white text-xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-md active:scale-95"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div class="flex flex-col items-center gap-3">
                  <p
                    class="text-orange-900 font-semibold text-base font-['Nunito'] text-center"
                  >
                    Permettre la répétition
                  </p>
                  <button
                    @click="toggleRepeat"
                    class="w-14 h-8 rounded-full transition-colors flex items-center px-1"
                    :class="allowRepeat ? 'bg-orange-400' : 'bg-orange-100'"
                  >
                    <div
                      class="w-6 h-6 rounded-full bg-white shadow-md transition-transform"
                      :class="allowRepeat ? 'translate-x-6' : 'translate-x-0'"
                    ></div>
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <button
        @click="startGame"
        class="w-full max-w-md py-5 mt-4 bg-orange-400 hover:bg-orange-500 text-white font-['Nunito'] font-black text-2xl rounded-[2rem] shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 group tracking-widest"
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
      <div class="text-center mt-8 w-full max-w-md">
        <h2
          class="font-['Nunito'] font-black text-4xl text-orange-900 mb-2 tracking-widest"
        >
          Joueur n°{{ currentPlayerIndex + 1 }}
        </h2>
      </div>

      <div
        class="flex-1 w-full flex flex-col items-center justify-center max-w-md"
      >
        <div
          v-if="isNumberRevealed"
          class="w-48 h-48 bg-white rounded-full shadow-soft flex items-center justify-center border-8 border-orange-400 animate-pop"
        >
          <span class="font-['Fredoka'] font-bold text-8xl text-orange-500">
            {{ playerNumbers[currentPlayerIndex] }}
          </span>
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
        class="w-full max-w-md py-5 bg-orange-400 hover:bg-orange-500 text-white font-['Nunito'] font-black text-2xl rounded-[2rem] shadow-lg shadow-orange-200 transition-all active:scale-95 tracking-widest"
      >
        Afficher le numéro
      </button>

      <button
        v-if="isNumberRevealed"
        @click="nextPlayer"
        class="w-full max-w-md py-5 pr-5 pl-5 bg-orange-600 hover:bg-orange-700 text-white font-['Nunito'] font-black text-2xl rounded-[2rem] shadow-lg shadow-orange-300 transition-all active:scale-95 flex items-center justify-center gap-3 group tracking-widest"
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
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap");

.shadow-soft {
  box-shadow: 0 15px 30px -10px rgba(251, 146, 60, 0.2);
}

.animate-pop {
  animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
}

/* Options expand/collapse transition */
.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s ease-in-out;
  max-height: 300px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
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
