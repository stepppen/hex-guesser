<template>
    <main>
        <div class="flex align-center justify-center">
            <div class="flex flex-col container-size">
                <h1>HEX Guesser</h1>
                <slot />
            </div>
        </div>
    </main>
</template>

<style>
.container-size{
    width: 30%;
}
@media (max-width: 768px) {
    .container-size{
        width: 100%;
        padding: 0 1rem;
    }
}
</style>