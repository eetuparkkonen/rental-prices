<template>
    <v-card 
    variant="elevated" 
    color="background"
    class="w-100 h-100 text-center"
    >
    <v-card-title class="mt-6">
        Valitse suodattimet vuokra-asunnolle
    </v-card-title>

        <v-form>
        <v-row class="mx-4 my-6 d-flex justify-center">
            <v-col md="5">
                <v-select 
                v-model="data.quarter"
                color="white"
                clearable 
                label="Vuosineljännes"
                :items="quarterItems"
                base-color="background"
                item-color="info"
                bg-color="info"
                required
                flat
                ></v-select>
            </v-col>
            <v-col md="5">
                <v-text-field 
                dirty
                v-model="data.postal"
                color="white"
                clearable 
                label="Postinumero"
                base-color="background"
                item-color="info"
                bg-color="info"
                required
                flat
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col md="5">
            <v-select
            v-model="data.rooms"
            color="white"
            clearable 
            label="Vuosineljännes"
            :items="rooms"
            base-color="background"
            item-color="info"
            bg-color="info"
            required
            flat
            ></v-select>
            </v-col>
        </v-row>

        <v-btn>
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
    rooms: ''
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
    { title: '2', value: '02' }
]

</script>


<style lang="scss">
.v-select--active-menu {
    background-color: white !important;
}
</style>