<template>

    <Header></Header>
    <section class="list-pokemons">
        <Pokemon 
             v-for="pk of sort_pokemons_by_id" :key="pk.id"
             :id="pk.id" :name="pk.name" :types="pk.types" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pokemon from './components/Pokemon.vue'
import Header from './components/Header.vue'

interface IPokemon {
    id:  number,
    name: string,
    types: string[]
}

interface PokDades{
    pokemons: IPokemon[],
    URL_API: string
}

export default defineComponent({
    name: 'App',
    data: function():PokDades {
        return {
            pokemons: [],
            URL_API: 'https://pokeapi.co/api/v2/pokemon-form/'
        }
    },
    components: { Pokemon, Header },
    methods: {
        async request(id:string):Promise<IPokemon> {
            // request from API the dades of a pokemon
            const res = await fetch(this.URL_API + id)
            const pokemon_received = await res.json()
            type TypeRequest = { type: { name:string } }
            const pokemon = {
                name: pokemon_received.name,
                id: pokemon_received.id,
                types: pokemon_received.types.map( (i:TypeRequest):string => i.type.name) as string[]
            }
            return pokemon
        },  
    },
    computed: {
        sort_pokemons_by_id():IPokemon[] { 
            // IMPORTANTE: Metodos computados PRECISAM ter uma tipagem de retorno para conseguir ler os dades
            return this.pokemons.slice().sort( (a, b) => a.id - b.id )
        }
    },
    mounted: async function(){
        for( let i=1; i<=150; i++ ){
            this.request(i.toString())
                .then( pk => this.pokemons.push(pk))
                .catch( err => console.log(`Erro request a pokemon: ${err}`) )
            
        }
    },
});
</script>

<style lang="scss">

body {
background: url('https://assets.pokemon.com/static2/_ui/img/chrome/body_bg.png');
}

.list-pokemons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}
</style>
