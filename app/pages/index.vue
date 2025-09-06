<template>
    <p>
        The HEX guesser is a game where you can train your eye to learn how to read hexadecimal color values.
    </p>
    <p>{{ highscore }}</p>
        <UButton @click="goToGame()" class="flex align-center justify-center rounded-full py-2 my-4">
            Start Game
        </UButton>
</template>

<script setup>
 const goToGame = () => {
      navigateTo('/level');
    };

onMounted(() => { 
    localStorage.getItem('highScore');
    
    // if (localStorage.getItem('highScore')) {
    //     this.highscore = ;
    // }
    console.log(highscore)
});

// const highscore = localStorage.getItem('highScore')
    
</script>