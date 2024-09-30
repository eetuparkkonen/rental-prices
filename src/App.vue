<template>
  <v-app full-height class="app-container">
    <v-container class="app-container-card ma-auto rounded-xl bg-background">
      <v-container fluid class="w-50">
        <v-select
          v-model="chartType"
          label="Kuvaajatyyppi"
          base-color="primary"
          item-color="primary"
          bg-color="tertiary"
          color="primary"
          :items="['Viiva', 'Taulukko']"
        />
        <Inputs @getData="onGetPrices" :chartType="chartType" />
      </v-container>

      <v-container v-if="chartType === 'Taulukko'">
        <Table :data="data" :squareMeters="squareMeters" />
      </v-container>

      <v-container v-else>
        <Line ref="lineComponent" />
      </v-container>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import Inputs from '@/components/Inputs.vue';
import Table from '@/components/Table.vue';
import Line from '@/components/Line.vue';
import { getRentalPricesBySqM } from '@/services/rents.service';
import { InputTypes, Root } from '@/types/rentals';
import { Ref, onMounted } from 'vue';
import { ref, watch } from 'vue';
import { ChartType } from '@/types/main';

const data: Ref<Root[]> = ref([]);
const squareMeters: Ref<number[]> = ref([]);
const chartType: Ref<ChartType> = ref('Taulukko');
const lineComponent: Ref<InstanceType<typeof Line> | null> = ref(null);

watch(chartType, () => {
  // Clear data when changing chart type
  data.value = [];
  squareMeters.value = [];
});

const onGetPrices = async (params: InputTypes) => {
  try {
    if (chartType.value === 'Taulukko') {
      const rent = await getRentalPricesBySqM(params);

      data.value.push(rent);

      squareMeters.value.push(params.squareMeters);

      localStorage.setItem('rent', JSON.stringify({ rent: rent, squareMeters: params.squareMeters }));
    } else {
      // Let the Line component handle the data fetching
      await lineComponent!.value!.fetchData(params);
    }
  } catch (e) {
    console.error(e, 'e');
  }
};

onMounted(() => {
  const rent = localStorage.getItem('rent');

  if (rent) {
    data.value.push(JSON.parse(rent).rent);
    squareMeters.value.push(JSON.parse(rent).squareMeters);
  }
});
</script>

<style lang="scss" scoped>
.app-container-card {
  min-height: 80%;
  min-width: 80%;
}
</style>
