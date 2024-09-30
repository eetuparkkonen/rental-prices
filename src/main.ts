import { createApp } from 'vue'
import App from '@/App.vue'
import '@/assets/styles/main.scss'
import vuetify from '@/plugins/vuetify'
import VueApexCharts from "vue3-apexcharts"

createApp(App).use(vuetify).use(VueApexCharts).mount('#app')
