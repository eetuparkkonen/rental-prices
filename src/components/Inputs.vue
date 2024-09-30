<template>
  <v-card elevation="0" color="#f9f9f9" class="w-100 h-100 text-center rounded-xl">
    <v-card-title class="mt-6"> Valitse suodattimet vuokra-asunnolle </v-card-title>

    <v-form>
      <div v-if="chartType === 'Taulukko'">
        <v-row class="my-6 d-flex justify-center">
          <!-- Postal Code Field -->
          <v-col md="5">
            <v-text-field
              v-model="data.postal"
              clearable
              label="Postinumero"
              flat
              class="custom-input"
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <!-- Quarter Select -->
          <v-col md="5">
            <v-select
              v-model="data.quarter"
              :items="quarterItems"
              clearable
              label="Vuosineljännes"
              flat
              class="custom-select"
              hide-details="auto"
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="my-6 d-flex justify-center">
          <!-- Rooms Select -->
          <v-col md="5">
            <v-select
              v-model="data.rooms"
              clearable
              label="Huoneiden määrä"
              :items="rooms"
              flat
              class="custom-select"
              hide-details="auto"
            ></v-select>
          </v-col>

          <!-- Square Meters Field -->
          <v-col md="5">
            <v-text-field
              v-model.number="data.squareMeters"
              clearable
              label="Neliömetrit"
              type="number"
              class="custom-input"
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <!-- Example of another section of input -->
        <v-col md="12">
          <v-text-field
            v-model="data.postal"
            dirty
            clearable
            label="Postinumero"
            class="custom-input"
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </div>

      <v-btn color="secondary" class="mb-8" @click="$emit('getData', data)"> Hae </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { generateQuarterlyDates } from '@/helpers/dateHelper';
import { ChartType } from '@/types/main';

const quarterItems = generateQuarterlyDates(2015, 4);

const props = defineProps<{
  chartType: ChartType;
}>();

const data = reactive({
  quarter: '2023Q3',
  postal: '',
  rooms: '',
  squareMeters: 0,
});

const rooms = [
  { title: '1', value: '01' },
  { title: '2', value: '02' },
  { title: '3+', value: '03' },
];
</script>

<style lang="scss" >
$primary-color: #03a9f4;
$secondary-color: #4caf50;
$border-color: #e0e0e0;
$text-color: #333;
$label-color: #666;
$hover-color: #0288d1;
$input-background: #ffffff; /* Light background for input fields */
$input-border-radius: 12px;
$input-padding: 12px;
$box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add subtle shadow for depth */

.custom-input,
.custom-select {
  .v-input__control {
    background-color: $input-background; /* Lighter background */
    border-radius: $input-border-radius;
    padding: $input-padding;
    border: 1px solid $border-color;
    box-shadow: $box-shadow;

    &:focus-within {
      border-color: $primary-color;
      box-shadow: 0 0 10px rgba(3, 169, 244, 0.3); /* Subtle glow effect on focus */
    }
  }

  .v-field__overlay {
    background: $input-background !important;
  }

  .v-label {
    font-weight: bold;
    color: $label-color;
  }

  input {
    color: $text-color;
    background-color: transparent;
    &:focus {
      background-color: white;
    }
  }

  .v-input__append-inner .v-icon {
    color: $secondary-color;
  }

  .v-text-field__details {
    display: none;
  }
}

.v-btn {
  background-color: $primary-color;
  color: white;
  border-radius: 20px;
  box-shadow: none;
  padding: 10px 20px;

  &:hover {
    background-color: $hover-color;
  }
}

.container {
  background-color: #f1f7fc; /* Light background container */
  padding: 40px;
  border-radius: 15px;
  box-shadow: $box-shadow;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  color: $text-color;
  margin-bottom: 30px;
}
</style>
