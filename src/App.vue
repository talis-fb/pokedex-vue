<template>

    <Header @add_filter="add_filter" @remove_filter="remove_filter" ></Header>
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
    pokemons_saved: IPokemon[],
    pokemons_to_show?: string[],
    URL_API: string,
    sort: string,
    filters: {
        types: string[],
        name: string
    },
}

export default defineComponent({
    name: 'App',
    data: function():PokDades {
        return {
            pokemons_saved: [],
            pokemons_to_show: [],
            URL_API: 'https://pokeapi.co/api/v2/pokemon-form/',
            sort: 'id',
            filters: {
                types: [],
                name: ''
            },
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
        add_filter(name_type:string):void {
            this.filters.types.push(name_type)
        },
        remove_filter(name_type:string):void {
            this.filters.types = this.filters.types.filter( i => i != name_type )
        }
    },
    computed: {
        sort_pokemons_by_id():IPokemon[]  { 
            // IMPORTANTE: Metodos computados PRECISAM ter uma tipagem de retorno para conseguir ler os dades
            let pk:IPokemon[] = this.pokemons_saved.slice()

            // FILTER
            if( this.filters.types.length ){
                for(let i in this.pokemons_saved){
                    const pokemon = this.pokemons_saved[i]
                    const pk_valid = pokemon.types.every( st => this.filters.types.includes(st) )
                    if ( !pk_valid ) 
                        pk = pk.filter( i => i.id !== pokemon.id )
                }
            }

            if( this.sort === 'id')
                pk = pk.sort( (a, b) => a.id - b.id )

            //if( this.sort === 'name' )
                //pk =  this.pokemons.slice().sort( (a, b) => a.name - b.name )
            
            if ( this.filters.types.length ){
                pk = pk.filter( (i:IPokemon) => i.types.some( st => this.filters.types.includes(st)  ))
            }

            return pk//this.pokemons
        }
    },
    mounted: async function(){
        for( let i=1; i<=150; i++ ){
            this.request(i.toString())
                .then( pk => this.pokemons_saved.push(pk))
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
