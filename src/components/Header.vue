<template>
    <header>
        <div class="sort">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/> </svg>
            ID
        </div>

        <div class="types">
            <a v-for="(tp, ind) in types" :key="ind">
                <img @click="click_type(tp)" :style="style_type(ind)" :src="name_file(tp.name)" alt="">
            </a>
        </div>

        <div class="search">
            <input type="search" v-model="search" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type StyleType = { height:string, opacity:number }
type TypesNames = 'bug' | 'ice' | 'dark' | 'fire' | 'rock' | 'fairy' | 'ghost' | 'normal' | 'poison' | 'electric' | 'psychic' | 'grass' | 'steel' | 'water' | 'dragon' | 'flying' | 'ground' | 'fighting'
interface IType {
    name:TypesNames,
    state:boolean
}
type Types = Array<IType>
interface Dades {
    search: string
    types: Types
}

export default defineComponent({
    name: 'Header',
    data: function():Dades {
        return {
            search: '',
            types: [ 
                {name: 'bug', state: false },
                {name: 'ice', state: false },
                {name: 'dark', state: false },
                {name: 'fire', state: false },
                {name: 'rock', state: false },
                {name: 'fairy', state: false },
                {name: 'ghost', state: false },
                {name: 'grass', state: false },
                {name: 'steel', state: false },
                {name: 'water', state: false },
                {name: 'dragon', state: false },
                {name: 'flying', state: false },
                {name: 'ground', state: false },
                {name: 'normal', state: false },
                {name: 'poison', state: false },
                {name: 'psychic', state: false },
                {name: 'electric', state: false },
                {name: 'fighting', state: false }
            ]
        }
    },
    watch: {
        search: function(newValue){
            this.$emit('update_search', newValue)
        }
    },
    methods: {
        style_type(type:number):StyleType {
            const height = this.types[type].state ? {height: '70%'} : {height: '45%'}
            const opacity = this.types[type].state ? {opacity: 1} : {opacity: 0.5}
            return { ...height, ...opacity }
        },
        name_file(type:string){
            return require('../assets/Icon_' + type + '.webp')
        },
        click_type(bixo:IType){
            bixo.state = !bixo.state
            if(bixo.state){
                this.$emit('add_filter', bixo.name)
            } else {
                this.$emit('remove_filter', bixo.name)
            }
        }
    }
});
</script>

<style lang="scss">
header {
    background-color: #fff;
    margin: 0 auto;
    margin-bottom: 10px;
    width: 95%;
    max-width:1300px;
    height: 50px;

    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    position: sticky;
    top:0px;
    z-index: 9;

    .sort{
        border: 1px solid black;
        height: 85%;
        border-radius: 5px;
        background-color: #edd;
        text-align: center;
        padding: 8px;
    }

    .search{
        position: relative;
        height: 85%;
        svg {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
        input {
            width: 100%;
            height: 100%;
            background-color: #F2F2F2;
            border-radius: 10px;
        }
    }

    .types{
        height: 100%;
        display: flex;
        align-items: center;
        gap: 5px;

    }

    a {
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        img {
            transition: 0.1s;
            height: 60%;
        }
    }
}
</style>
