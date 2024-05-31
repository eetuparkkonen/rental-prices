<template>
  <v-app full-height class="app-container">
    <v-app-bar color="tertiary" class="app-bar">
      <v-app-bar-title class="font-weight-bold">
        Tervetuloa asuntojen vuokraseurantaan!
      </v-app-bar-title>
    </v-app-bar>

    <v-container fluid class="w-50">
      <Inputs @getData="onGetPrices" />
    </v-container>

    <v-container>
      <Widget :data="data" :squareMeters="squareMeters" :chartType="chartType" :key="`chart-${data?.[0]?.id}`" />
    </v-container>

  </v-app>
</template>

<script setup lang="ts">
import Inputs from '@/components/Inputs.vue'
import Widget from '@/components/Widget.vue'
import { getAllRentalPricesBySqM, getRentalPricesBySqM } from '@/services/rents.service'
import { InputTypes, Root } from '@/types/rentals';
import { Ref, onMounted } from 'vue';
import { ref } from 'vue';

const data: Ref<Root[]> = ref([])
const squareMeters: Ref<number[]> = ref([])

const chartType = ref<'line' | 'table'>('line')

const onGetPrices = async (params: InputTypes, chartsType: 'line' | 'table') => {
  try {
    if (chartsType === 'table') {
      const rent = await getRentalPricesBySqM(params)
      data.value.push(rent)
      squareMeters.value.push(params.squareMeters)
      localStorage.setItem('rent', JSON.stringify({rent: rent, squareMeters: params.squareMeters}))
    } else {
      data.value = []
      
      const rents = await getAllRentalPricesBySqM(params)

      for (const rent of rents) {
        data.value.push(rent)
        squareMeters.value.push(params.squareMeters)
      }

      localStorage.setItem('rent', JSON.stringify({rent: rents, squareMeters: params.squareMeters}))
    }

    chartType.value = chartsType
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
</style>

<style lang="scss">
</style>
