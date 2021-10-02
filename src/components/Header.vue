<template>
    <header>
        <div class="generations">
            <button>(1)</button>
            <button>(2)</button>
            <button>(4)</button>
            <button>(5)</button>
            <button>(6)</button>
            <button>(7)</button>
        </div>

        <div class="types">
            <a v-for="(tp, ind) in types" :key="ind">
                <img @click="click_type(tp)" :style="style_type(ind)" :src="name_file(tp.name)" alt="">
            </a>
        </div>

        <div class="search">
            <div class="input-search">
                <input type="search" v-model="search" />
                <svg class="icon-search" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg> 
            </div>

            <div class="options-sort">
                <button @click="change_sort('-id')" :class=" sort=='-id' ? 'active' : '' " v-html="icons.ArrowDown + 'ID' "></button>
                <button @click="change_sort('+id')" :class=" sort=='+id' ? 'active' : '' " v-html="icons.ArrowUp + 'ID' "></button>
                <button @click="change_sort('-name')" :class=" sort=='-name' ? 'active' : '' " v-html="icons.ArrowDown + 'NAME' "></button>
                <button @click="change_sort('+name')" :class=" sort=='+name' ? 'active' : '' " v-html="icons.ArrowUp + 'NAME' "></button>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { StyleType,  IType,  Dades  } from '../interfaces'

export default defineComponent({
    name: 'Header',
    data: function():Dades {
        return {
            search: '',
            sort: '-id',
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
            ],
            icons: {
                ArrowUp: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/> </svg>',
                ArrowDown: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/> </svg>'
            }
        }
    },
    watch: {
        search: function(newValue){
            this.$emit('update_search', newValue)
        },
        sort: function(newValue){
            this.$emit('update_sort', newValue)
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
        },
        change_sort(sort:'-id' | '+id' | '-name' | '+name'){
            this.sort = sort
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
    height: 70px;

    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    position: sticky;
    top:0px;
    z-index: 9;

    .generations{
        height: 100%;
        width: 20%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        & > button {
            float: left;
            width: auto;
            height: 46%;
            font-size: 17px;
            padding: 5px;

            &:nth-child(1){
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
            &:last-child{
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }
        }
    }

    .search{
        position: relative;
        height: 100%;
        .input-search {
            position: relative;
            height: 60%;
            .icon-search {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
            input {
                height: 100%;
                width: 100%;
                background-color: #F2F2F2;
                border-radius: 10px;
            }
        }
        .options-sort {
            height: 40%;
            display: flex;
            justify-content: space-around;
            align-items:center;
            button {
                height: 80%;
                cursor: pointer;
                border-radius: 5px;
                text-align: center;
                font-size: 12px;
                background-color: #F2F2F2;
                transition: 0.1s;
                &.active {
                    background-color: #705898dd;
                }
            }
            
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
