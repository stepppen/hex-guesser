<template>

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
                    <div class="w-full">
                    <UButton @click="goToHome()" class="flex align-center justify-center rounded-full h-8 w-full">
                        To Menu
                    </UButton>
                    </div>
</template>

<script setup>
import { UButton } from '#components';
const { levelVal } = useLevel();

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

// onMounted(() => { 
//     console.log(levelVal.value);

// })


const goToHome = () => { 
    navigateTo("/");
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
            rangeAround(r),
            rangeAround(g),
            rangeAround(b)
            // Math.floor(Math.random() * 256),
            // Math.floor(Math.random() * 256),
            // Math.floor(Math.random() * 256)
            )
        );
    }

  // Shuffle
  colorOptions.value = Array.from(options).sort(() => Math.random() - 0.5);
}

//random function generating target hex
//adjustedRGB(r)
//specified computed function generating adjusted random hex for divs:
    //function adjustedVal(targetVal){
        //levelVal.value

        //let maxRange = map sliderVal from 0 - 100 to 230 - 0
        //for (let i= 0; i <= sliderVal; i++) { maxRange-- }

        //let min =  targetVal - maxRange (constrain 0 - 255);
        //let max = targetVal + maxRange (constrain 0 - 255);

        //getRandomInt_r(min, max)

// }

function rangeAround(targetVal) { 
    let slider = levelVal.value;
    //setting min to 0 will break logic at edge case slider = 100
    let maxRange = mapValue(slider, 0, 100, 255, 20); 
    return randomWithin(maxRange, targetVal);
}

function randomWithin(range, targetVal){ 
    let minVal = Math.max(0, Math.min(255, targetVal - range));
    let maxVal = Math.max(0, Math.min(255, targetVal + range));
    return getRandomInt(minVal, maxVal)
}

function mapValue(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

function getRandomInt(minVal, maxVal) {
    console.log(minVal, maxVal)
  const minCeiled = Math.ceil(minVal);
  const maxFloored = Math.floor(maxVal);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//target_r=50; sliderVal=50 => maxRange=127; min=0; max=200
//target_r=50; sliderVal=0 => maxRange=230; min=0; max=255
//target_r=50; sliderVal=100 => maxRange=0; min=30; max=70
//target_r=127; sliderVal=0 => maxRange=230; min=0; max=255

function rgbToHex(r, g, b) {
  return "#" + [r, g, b]
    .map(val => val.toString(16).padStart(2, "0").toUpperCase())
    .join("");
}



// function createDivs(){
//     for(let i = 0; i <= 6; i++){
//         const grid = document.getElementById("color-grid");
//         let div_index = i.toString()+"index";
//         // console.log(div_index);
//         // const colorDiv = document.createElement("div");
//         const colorDiv = document.getElementById(div_index);


        
//         colorDiv.id = div_index;
//         let final_id = colorDiv.id
        
//         // console.log(final_id)
        
//         //console.log(randomIndexFunc)
//         randomIndex = (Math.random()*10);
//         // randomIndex.constrain(randomIndex, 0, 6);
//         if(randomIndex <= 5){ 
//             randomIndex = Math.floor(randomIndex);
//         }else{ 
//             randomIndex = Math.floor(randomIndex/2);
//         }

//         //randomIndex = Math
//         //if (indexCollector.has(randomIndex))return


//         console.log(randomIndex, hex_arr)
//         // let scaled_val = scale(randomIndex, 0, 10, 0, 6)
//         // randomIndex = Math.floor(scaled_val)
//         //let mappedIndex = Math.floor(scale(randomIndex, 0, 10, 0, 6));
//         // console.log(randomIndex)
//         let random_hex = hex_arr[randomIndex - 1]
//         hex_arr.splice(randomIndex - 1, 1)
//         // random_hex.splice(randomIndex - 1)
//         //changeBG()

//         //const correctDiv = document.getElementById(final_id);
//         //correctDiv.classList.add("div-bg");
//         colorDiv.style.backgroundColor = `${random_hex}`;
//         colorDiv.innerHTML = random_hex
//         // console.log(random_hex);
//         random_hex = ""
//         indexCollector.add(randomIndex);
//     }
    
//     // hex_arr = [];
// }

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