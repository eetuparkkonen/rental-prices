<template>
  <v-card elevation="0" color="tertiary" class="w-100 h-100 text-center rounded-xl">
    <v-card-title class="mt-6"> Valitse suodattimet vuokra-asunnolle </v-card-title>

    <v-form>
      <div v-if="chartType === 'Taulukko'">
        <v-row class="my-6 d-flex justify-center">
          <v-col md="5">
            <v-text-field
              v-model="data.postal"
              dirty
              color="white"
              clearable
              label="Postinumero"
              base-color="black"
              item-color="black"
              bg-color="white"
              flat
            ></v-text-field>
          </v-col>

          <v-col md="5">
            <v-select
              v-model="data.quarter"
              :items="quarterItems"
              dirty
              color="white"
              clearable
              label="Vuosineljännes"
              base-color="black"
              item-color="black"
              bg-color="white"
              flat
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row class="my-6 d-flex justify-center">
          <v-col md="5">
            <v-select
              v-model="data.rooms"
              color="black"
              clearable
              label="Huoneiden määrä"
              :items="rooms"
              base-color="black"
              item-color="black"
              bg-color="white"
              flat
            >
              <!-- @vue-ignore -->
              <template v-slot:counter></template>
              <!-- v-select has a bug which shows counter value, this is a workaround -->
            </v-select>
          </v-col>
          <v-col md="5">
            <v-text-field
              v-model.number="data.squareMeters"
              color="black"
              clearable
              label="Neliömetrit"
              base-color="black"
              item-color="black"
              bg-color="white"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-col md="12">
          <v-text-field
            v-model="data.postal"
            dirty
            color="white"
            clearable
            label="Postinumero"
            base-color="black"
            item-color="black"
            bg-color="white"
            flat
          ></v-text-field>
        </v-col>
      </div>

      <v-btn color="primary" class="mb-8" @click="$emit('getData', data)"> Hae </v-btn>
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

<style lang="scss"></style>
