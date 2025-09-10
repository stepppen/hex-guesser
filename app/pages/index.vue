<template>
  <div class="h-full">
    <div>
      <p>
        The HEX guesser is a game where you can train your eye to learn how to read hexadecimal color values.
      </p>
      <UButton @click="goToGame()" class="flex align-center justify-center rounded-full py-2 my-4 w-full">
          Start Game
      </UButton>
      <UButton @click="clearData()" class="flex align-center justify-center rounded-full py-2 bg-gray-400 hover:bg-gray-500 w-full">
        Clear Data
      </UButton>
      <div class="flex justify-between w-full border-b pb-2 my-4">
        <p>Level</p>
        <p>Highscore</p>
      </div>
      <div  v-for="item in levelAndHighscore" class="flex justify-between w-full border-b  transparent-border pb-2 my-4">
        <p>{{ item.level }}</p>
        <p>{{ item.score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { highScoreTracker } = useHighscore();
const levelAndHighscore = ref([]);
const highscore = localStorage.getItem('highScore');
const highscoreKey = localStorage.getItem('highScoreKey');
const level = localStorage.getItem('level');
 const goToGame = () => {
      navigateTo('/level');
    };

onMounted(() => {
  const results = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("highScore-")) {
      const level = key.split("-")[1];
      const score = localStorage.getItem(key);
      results.push({ level, score });
    }
  }
  levelAndHighscore.value = results;
});

function clearData(){ 
    levelAndHighscore.value = [];
    localStorage.clear();
}
</script>

<style>
.transparent-border{ 
  border-bottom: 1px solid rgba(255, 255, 255, .2);
}
</style>
