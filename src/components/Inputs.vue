<template>
    <v-card variant="elevated" color="primary" class="w-100 h-100 text-center">
        <v-card-title class="mt-6">
            Valitse suodattimet vuokra-asunnolle
        </v-card-title>

        <v-form>
            <v-row class="my-6 d-flex justify-center">
                <v-col md="5">
                    <v-select v-model="data.quarter" color="black" base-color="black" item-color="black" bg-color="white"
                        label="Vuosineljännes" :items="quarterItems" flat>
                        <!-- @vue-ignore -->
                        <template v-slot:counter></template>
                        <!-- v-select has a bug which shows counter value, this is a workaround -->
                    </v-select>
                </v-col>
                <v-col md="5">
                    <v-text-field v-model="data.postal" dirty color="white" clearable label="Postinumero" base-color="black"
                        item-color="black" bg-color="white" flat></v-text-field>
                </v-col>
            </v-row>
            <v-row class="my-6 d-flex justify-center">
                <v-col md="5">
                    <v-select v-model="data.rooms" color="black" clearable label="Huoneiden määrä" :items="rooms"
                        base-color="black" item-color="black" bg-color="white" flat>
                        <!-- @vue-ignore -->
                        <template v-slot:counter></template>
                        <!-- v-select has a bug which shows counter value, this is a workaround -->
                    </v-select>
                </v-col>
                <v-col md="5">
                    <v-text-field v-model.number="data.squareMeters" color="black" clearable label="Neliömetrit"
                        base-color="black" item-color="black" bg-color="white" type="number"></v-text-field>
                </v-col>
            </v-row>

            <v-btn class="mb-8" @click="$emit('getData', data)">
                Hae
            </v-btn>
        </v-form>


    </v-card>
</template>



<script lang="ts" setup>
import { computed, reactive } from 'vue';

const data = reactive({
    quarter: '',
    postal: '',
    rooms: '',
    squareMeters: 0
})

const quarterItems = [
    '2023Q1', '2023Q2',
    '2022Q1', '2022Q2', '2022Q3', '2022Q4',
    '2021Q1', '2021Q2', '2021Q3', '2021Q4',
    '2020Q1', '2020Q2', '2020Q3', '2020Q4',
    '2019Q1', '2019Q2', '2019Q3', '2019Q4',
    '2018Q1', '2018Q2', '2018Q3', '2018Q4',
    '2017Q1', '2017Q2', '2017Q3', '2017Q4',
    '2016Q1', '2016Q2', '2016Q3', '2016Q4',
    '2015Q1', '2015Q2', '2015Q3', '2015Q4'
]

const rooms = [
    { title: '1', value: '01' },
    { title: '2', value: '02' },
    { title: '3+', value: '03' }
]

</script>


<style lang="scss"></style>