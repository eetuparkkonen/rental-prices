<template>
  <div v-if="chartType === 'table'">
    <v-table class="ml-auto mr-auto">
      <thead>
        <tr class="text-center">
          <th class="pa-5 text-center">Keskimääräinen neliöhinta</th>
          <th class="pa-5 text-center">Vuosineljännes</th>
          <th class="pa-5 text-center">Huoneiden määrä</th>
          <th class="pa-5 text-center">Postinumero / alue</th>
          <th class="pa-5 text-center">Neliömäärä</th>
          <th class="pa-5 text-center">Laskennallinen hinta</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, i) in data" class="text-center">
          <td>
            {{ value.value[0] ?? "Arvoa ei löytynyt" }}
            {{ value.value[0] ? " €" : "" }}
          </td>
          <td>
            {{ Object.keys(value.dimension.Vuosineljännes.category.label)[0] }}
          </td>
          <td>
            {{ Object.values(value.dimension.Huoneluku.category.label)[0] }}
          </td>
          <td>
            {{ Object.values(value.dimension.Postinumero.category.label)[0] }}
          </td>
          <td>{{ squareMeters[i] }} &#13217;</td>
          <td>{{ calculatedPrice(squareMeters[i], value.value[0] ?? 0) }} €</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div v-else>
    <div id="chart" v-if="data && data.length && series && chartOptions">
      <apexchart
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Root } from "@/types/rentals";
import { computed } from "vue";

const props = defineProps<{
  data: Root[] | undefined;
  squareMeters: number[];
  chartType: "line" | "table";
}>();

const calculatedPrice = (sqm: number, price: number) => {
  return (sqm * price).toFixed(0);
};

// Create computed for series
const series = computed(() => {
  return [{
    name: "Vuokrat",
    data:
      props.data?.map((rent) => {
        return (
          calculatedPrice(props.squareMeters[0], rent?.value?.[0] ?? 0) ?? 0
        );
      }) ?? [],
  }];
});

const chartOptions = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  colors: ['#C6ACCE'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 6,
  },
  title: {
    text: `Vuokra neljännesvuosittain ${props.squareMeters[0]}m², ${props.data?.[1]?.dimension.Postinumero.category.label}`,
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: [
    '2015Q4', '2016Q1', '2016Q2', '2016Q3', '2016Q4',
    '2017Q1', '2017Q2', '2017Q3', '2017Q4',
    '2018Q1', '2018Q2', '2018Q3', '2018Q4',
    '2019Q1', '2019Q2', '2019Q3', '2019Q4',
    '2020Q1', '2020Q2', '2020Q3', '2020Q4',
    '2021Q1', '2021Q2', '2021Q3', '2021Q4',
    '2022Q1', '2022Q2', '2022Q3', '2022Q4',
    '2023Q1', '2023Q2'
    ],
  },
};
</script>

<style lang="scss"></style>
