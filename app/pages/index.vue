<template>

    <div class="flex align-center justify-center">
        <div class="flex flex-col">
                <h1 class="main-title">HEX Guesser</h1>
                <div class="flex gap-2">
                    <UButton @click="generateColors()" class="flex align-center justify-center rounded-full">
                        Generate
                    </Ubutton>
                    <div class="bg-slate-200 p-4 rounded-full hex-bubble h-12 flex flex-col align-center justify-center">
                        <p id="randomNumberDisplay" class="text-center">{{ targetHex }}</p>
                    </div>
                </div>
                    <div class="adaptive-grid">
                        <div 
                            v-for="(color, index) in colorOptions" 
                            :key="index"
                            class="color-block"
                            :style="{ backgroundColor: gameStarted ? color : '#bababa' }"
                            :class="{
                                'border-4 border-green-500': selectedHex === color && color === targetHex,
                                'border-4 border-red-500': selectedHex === color && color !== targetHex
                            }"
                            @click="checkColor(color)"
                        >
                        <div class="bg-white rounded-full">
                            <p v-if="showHex" class="p-2 ">
                                {{ color }}
                            </p>
                        </div>
                        </div>
                    </div>
        </div>
    </div>
</template>

<script setup>
import { UButton } from '#components';

let r = 0;
let g = 0;
let b = 0;
// let indexCollector = [];
 const indexCollector = new Set();
let randomIndex = 0;
// const isGenerated = ref(false);
let hex_arr = [];
let converted_hex = ["#"];
const targetHex = ref("");
let selectedHex = ref("")
const gameStarted = ref(false);
let showHex = ref(false)
const colorOptions = ref([]);
let transfered_hex = "";
const hexadecimal_arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

function generateRGB() {    
    randomIndex = 0;
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(255);
  for( let i = 0; i < 6; i++){ 
    r = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    b = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    g = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    rgbToHex(r, g, b);
  }
//   console.log("RGB generated: ", r, g, b)
}
function generateColors() {
    showHex.value = false;
    gameStarted.value = true

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    targetHex.value = rgbToHex(r, g, b);

    // 6 unique hex codes, including target
    const options = new Set([targetHex.value]);
    while (options.size < 6) {
        options.add(
            rgbToHex(
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256)
            )
        );
    }

  // Shuffle
  colorOptions.value = Array.from(options).sort(() => Math.random() - 0.5);
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b]
    .map(val => val.toString(16).padStart(2, "0").toUpperCase())
    .join("");
}

function generateHex(r, g, b){
    const randomNumberDisplay = document.getElementById('randomNumberDisplay');
    
    let r_division = Math.floor(r/16);
    let r_remainder = Math.floor(r%16);
    converted_hex.push(hexadecimal_arr[r_division - 1]);
    converted_hex.push(hexadecimal_arr[r_remainder - 1]);

    let g_division = Math.floor(g/16);
    let g_remainder = Math.floor(g%16);
    converted_hex.push(hexadecimal_arr[g_division - 1]);
    converted_hex.push(hexadecimal_arr[g_remainder - 1]);

    let b_division = Math.floor(b/16);
    let b_remainder = Math.floor(b%16);
    converted_hex.push(hexadecimal_arr[b_division - 1]);
    converted_hex.push(hexadecimal_arr[b_remainder - 1]);
    randomNumberDisplay.innerHTML = "";
    let final_hex = converted_hex.join("");
    randomNumberDisplay.innerHTML = final_hex;
    // transfered_hex = final_hex
    hex_arr.push(final_hex);
    if (hex_arr.length === 6){ 
        createDivs();
    }
    converted_hex = ["#"];
    final_hex = "";
    //console.log(hex_arr);
    // hex_arr = [];
}

// function generateSimilar(){

// }

function createDivs(){
    //console.log(hex_arr.length);
    // const correctDiv = document.getElementById('correctDiv');
    // correctDiv.classList.remove("default-hex-bg")
    // correctDiv.style.backgroundColor = `${transfered_hex}`;
    // console.log(hex_arr);
    // const populateDivs = document.getElementsByClassName("color-block");
    // console.log(populateDivs)

    for(let i = 0; i <= 6; i++){
        const grid = document.getElementById("color-grid");
        let div_index = i.toString()+"index";
        // console.log(div_index);
        // const colorDiv = document.createElement("div");
        const colorDiv = document.getElementById(div_index);
        
        // console.log(colorDiv)
        //colorDiv.classList.add("color-block");
        //grid.appendChild(colorDiv)
        //console.log(grid)
        // colorDiv.classList.add(i);


        
        colorDiv.id = div_index;
        let final_id = colorDiv.id
        
        // console.log(final_id)
        
        //console.log(randomIndexFunc)
        randomIndex = (Math.random()*10);
        // randomIndex.constrain(randomIndex, 0, 6);
        if(randomIndex <= 5){ 
            randomIndex = Math.floor(randomIndex);
        }else{ 
            randomIndex = Math.floor(randomIndex/2);
        }

        //randomIndex = Math
        //if (indexCollector.has(randomIndex))return


        console.log(randomIndex, hex_arr)
        // let scaled_val = scale(randomIndex, 0, 10, 0, 6)
        // randomIndex = Math.floor(scaled_val)
        //let mappedIndex = Math.floor(scale(randomIndex, 0, 10, 0, 6));
        // console.log(randomIndex)
        let random_hex = hex_arr[randomIndex - 1]
        hex_arr.splice(randomIndex - 1, 1)
        // random_hex.splice(randomIndex - 1)
        //changeBG()

        //const correctDiv = document.getElementById(final_id);
        //correctDiv.classList.add("div-bg");
        colorDiv.style.backgroundColor = `${random_hex}`;
        colorDiv.innerHTML = random_hex
        // console.log(random_hex);
        random_hex = ""
        indexCollector.add(randomIndex);
    }
    
    // hex_arr = [];
}

function checkColor(selected) {
    selectedHex.value = selected;
    showHex.value = true;
}

</script>

<style scoped>
.color-block{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    min-width: 100px;
    height: 100px;
    /* border: 1px black; */
    /* background-color: aqua; */
    background-color: #bababa;
}
.adaptive-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  min-height: 400px;
  padding: 1rem 0;
  opacity: 1;
  position: relative;
  z-index: 1;
}
.div-bg{
    background-color: red;
}
</style>