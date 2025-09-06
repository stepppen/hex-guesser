<template>
    <div>
        <h2>Similarity of colors</h2>
        <p>
            Choose how difficult you want the game to be. The higher the assimilation, the harder it is to distinguish the colors.
        </p>
        <div class="flex flex-col gap-4 my-4">
            <div class="flex gap-2">
                <USlider v-model="levelVal" />
                <p>{{ levelVal }}%</p>
            </div>
            <UButton @click="startLevel()" class="flex align-center justify-center rounded-full">
                Start Game
            </UButton>

        </div>

    </div>
</template>

<script setup lang="ts">
const { levelVal } = useLevel();
const startLevel = () => { 
    navigateTo("/game");
}
// const value = ref(33)
</script>