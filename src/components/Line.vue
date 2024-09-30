<template>
  <div>
    <!-- ApexCharts component -->
    <apexchart type="line" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import ApexCharts from 'vue3-apexcharts';
import { getRentalPricesBySqM } from '@/services/rents.service';
import { generateQuarterlyDates } from '@/helpers/dateHelper';
import { InputTypes } from '@/types/rentals';

const title = ref('');
const quarters = ref(generateQuarterlyDates(2015, 4));

const dataToFetch = reactive({
  quarter: quarters as any,
  postal: '00200',
  rooms: '01',
  squareMeters: 50,
});

// Series data for the chart
const series = ref([
  {
    name: dataToFetch.postal,
    data: [] as number[],
  },
]);

// Chart options
const chartOptions = ref({
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: true, // Disable data labels on each point
  },
  stroke: {
    curve: 'smooth', // Makes the line smooth
  },
  title: {
    text: 'Keskimääräinen neliöhinta',
    align: 'left',
  },
  xaxis: {
    categories: quarters.value, // Replace with your dynamic categories (e.g., quarters)
  },
  yaxis: {
    title: {
      text: '€/m²',
    },
  },
  tooltip: {
    enabled: true,
  },
});

const fetchData = async (params: InputTypes) => {
  quarters.value = generateQuarterlyDates(2015, 4);
  // first clear all data and categories
  series.value[0].data = [];
  chartOptions.value.xaxis.categories = [];

  // Load data from API
  const itemsForChart: string[] = [];

  let name = '';

  dataToFetch.postal = params.postal;

  for (const item of quarters.value) {
    dataToFetch.quarter = item;

    try {
      const data = await getRentalPricesBySqM(dataToFetch);
      const value = data.value[0] ?? 0;
      series.value[0].data.push(value);

      const quarter = Object.keys(data.dimension.Vuosineljännes.category.label)[0];

      itemsForChart.push(quarter);

      title.value = data.source;

      name = Object.values(data.dimension.Postinumero.category.label)[0];
      series.value[0].name = name;
    } catch (e) {
      console.error(e);
    }
  }
};

defineExpose({
  fetchData,
});

onMounted(async () => {
  // Load data from API
  const itemsForChart: string[] = [];

  let name = '';

  for (const item of quarters.value) {
    dataToFetch.quarter = item;
    try {
      const data = await getRentalPricesBySqM(dataToFetch);
      const value = data.value[0] ?? 0;
      series.value[0].data.push(value);

      const quarter = Object.keys(data.dimension.Vuosineljännes.category.label)[0];

      itemsForChart.push(quarter);

      title.value = data.source;

      name = Object.values(data.dimension.Postinumero.category.label)[0];
      series.value[0].name = name;
    } catch (e) {
      console.error(e);
    }
  }
});
</script>

<style scoped>
/* Style your component if needed */
</style>
