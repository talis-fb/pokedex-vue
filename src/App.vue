<template>
    <section>
        <Pokemon v-for="pk of pokemons" :key="pk.id" :id="pk.id" :name="pk.name" :types="pk.types"></Pokemon>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pokemon from './components/Pokemon.vue'

interface PokDades{
    pokemons: any[],
    URL_API: string
}

export default defineComponent({
    name: 'App',
    data: function():PokDades {
        return {
            pokemons: [],
            URL_API: 'https://pokeapi.co/api/v2/pokemon/'
        }
    },
    components: { Pokemon },
    mounted: async function(){
        for( let i=1; i<=150; i++ ){
            const res = await fetch(this.URL_API + i.toString())
            const pokemon_received:any = await res.json()
            const pokemon = { name: pokemon_received.name, id:pokemon_received.id, types:pokemon_received.types.map( (i:any) => i.type.name) }
            this.pokemons.push(pokemon)
        }
    }
});
</script>

<style lang="scss">
section {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
</style>
