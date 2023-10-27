<template>
  <v-app full-height class="app-container">
    <img :src="BackgroundSvg" id="bg-waves"/>
    <v-app-bar color="tertiary" class="app-bar">
      <v-app-bar-title class="font-weight-bold">
        Tervetuloa asuntojen vuokraseurantaan!
      </v-app-bar-title>
    </v-app-bar>

    <v-container fluid class="w-50">
      <Inputs @getData="onGetPrices" />
    </v-container>

    <v-container>
      <Widget :data="data" :squareMeters="squareMeters" />
    </v-container>

  </v-app>
</template>

<script setup lang="ts">
import BackgroundSvg from '@/assets/svgs/background.svg'
import Inputs from '@/components/Inputs.vue'
import Widget from '@/components/Widget.vue'
import { getRentalPricesBySqM } from '@/services/rents.service'
import { InputTypes, Root } from '@/types/rentals';
import { Ref, onMounted } from 'vue';
import { ref } from 'vue';

const data: Ref<Root[]> = ref([])
const squareMeters: Ref<number[]> = ref([])

const onGetPrices = async (params: InputTypes) => {
  try {
    const rent = await getRentalPricesBySqM(params)

    data.value.push(rent)

    squareMeters.value.push(params.squareMeters)

    localStorage.setItem('rent', JSON.stringify({rent: rent, squareMeters: params.squareMeters}))
  } catch (e) {
    console.error(e, "e")
  }
}

onMounted(() => {
  const rent = localStorage.getItem('rent')
  
  if (rent) {
    data.value.push(JSON.parse(rent).rent)
    squareMeters.value.push(JSON.parse(rent).squareMeters)
  }
})
</script>

<style scoped lang="scss">
.app-bar {
  position: relative !important;
}

.app-container {
 // background-color: #A6F6FF;
}
</style>

<style lang="scss">
#bg-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
</style>
