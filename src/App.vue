<template>
  <v-app full-height class="apppp">
    <v-app-bar color="primary" class="app-bar">
      <v-app-bar-title class="font-weight-bold">
        Tervetuloa asuntojen vuokraseurantaan!
      </v-app-bar-title>
    </v-app-bar>
    
    <v-container fluid class="w-50">
      <Inputs />
    </v-container>

  </v-app>
</template>

<script setup lang="ts">
import Inputs from '@/components/Inputs.vue'
import { getRentalPricesBySqM } from '@/services/rents.service'
import { BasicQuery } from '@/types/rentals';

const data: BasicQuery = {
  query: [
    {
      code: "Vuosineljännes",
      selection: {
        filter: "item",
        values: [
          "2023Q2"
        ]
      }
    },
    {
      code: "Postinumero",
      selection: {
        filter: "item",
        values: [
          "00350"
        ]
      }
    },
    {
      code: "Huoneluku",
      selection: {
        filter: "item",
        values: [
          "02"
        ]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: [
          "lkm_ptno"
        ]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
}


const onGetPrices = async () => {
  try {
    const rent = await getRentalPricesBySqM(data)
    console.log(rent, "rent")
  } catch (e) {
    console.error(e, "e")
  }
  
}

</script>

<style scoped lang="scss">
.app-bar {
  position: relative !important;
}
.apppp {
  background: linear-gradient(90deg, #b9deed, #efefef);
}
</style>
