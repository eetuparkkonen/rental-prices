<template>
  <v-app full-height class="app-container">
    <v-container class="app-container-card ma-auto rounded-xl bg-background">
      <v-container fluid class="w-50">
        <v-select
          v-model="chartType"
          label="Kuvaajatyyppi"
          :items="['Viiva', 'Taulukko']"
          class="custom-select"
          hide-details="auto"
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

$primary-color: #03a9f4; // Button primary color
$secondary-color: #4caf50; // Secondary color
$border-color: #dcdcdc; // Light gray border color
$text-color: #333; // Dark text color
$label-color: #555; // Slightly darker label color
$hover-color: #0288d1; // Button hover color
$input-background: #ffffff; // Bright white background for input fields
$input-border-radius: 12px; // Rounded corners
$input-padding: 12px; // Padding for inputs
$box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // Light shadow for depth

.custom-select {
  .v-input__control {
    background-color: $input-background; // White background
    border-radius: $input-border-radius;
    border: 1px solid $border-color; // Light gray border
    box-shadow: $box-shadow; // Light shadow

    &:focus-within {
      border-color: $primary-color; // Blue border on focus
      box-shadow: 0 0 10px rgba(3, 169, 244, 0.3); // Subtle glow effect on focus
    }
  }

  .v-label {
    font-weight: bold;
    color: $label-color; // Slightly darker for better visibility
  }

  .v-select__selection {
    color: $text-color; // Dark text for readability
    background-color: transparent; // Keep background transparent
  }

  .v-input__append-inner .v-icon {
    color: $secondary-color; // Icon color
  }

  .v-select__slot {
    border-radius: $input-border-radius; // Rounded corners for the dropdown
    background-color: $input-background; // White background
    border: 1px solid $border-color; // Light gray border
    box-shadow: $box-shadow; // Light shadow

    &:focus {
      border-color: $primary-color; // Blue border on focus
    }
  }

  .v-select__menu {
    background-color: white; // Dropdown background
    box-shadow: $box-shadow; // Shadow for dropdown
    border-radius: $input-border-radius; // Rounded corners for dropdown
  }

  .v-list-item {
    color: $text-color; // Text color for dropdown items

    &:hover {
      background-color: rgba(3, 169, 244, 0.1); // Light blue on hover
    }
  }
}
</style>
