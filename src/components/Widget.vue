<template>
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
                <td>{{ value.value[0] ?? 'Arvoa ei löytynyt' }} {{ value.value[0] ? ' €' : '' }}</td>
                <td> {{ Object.keys(value.dimension.Vuosineljännes.category.label)[0] }} </td>
                <td> {{ Object.values(value.dimension.Huoneluku.category.label)[0] }} </td>
                <td> {{ Object.values(value.dimension.Postinumero.category.label)[0] }} </td>
                <td> {{ squareMeters[i] }} &#13217;</td>
                <td>{{ calculatedPrice(squareMeters[i], value.value[0] ?? 0) }} €</td>
            </tr>
        </tbody>
    </v-table>
</template>


<script lang="ts" setup>
import { Root } from '@/types/rentals';

const props = defineProps<{
    data: Root[] | undefined
    squareMeters: number[]
}>()

const calculatedPrice = (sqm: number, price: number) => {
    return (sqm * price).toFixed(0)
}
</script>

<style lang="scss"></style>