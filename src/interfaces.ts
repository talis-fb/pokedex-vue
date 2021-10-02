
export interface IPokemon {
    id:  number,
    name: string,
    types: string[]
}

export interface PokDades{
    pokemons_saved: IPokemon[],
    pokemons_to_show?: string[],
    URL_API: string,
    sort: string,
    filters: {
        types: string[],
        name: string
    },
}

export interface StyleType {
    height:string, 
    opacity:number
}

export type TypesNames = 'bug' | 'ice' | 'dark' | 'fire' | 'rock' | 'fairy' | 'ghost' | 'normal' | 'poison' | 'electric' | 'psychic' | 'grass' | 'steel' | 'water' | 'dragon' | 'flying' | 'ground' | 'fighting'

export interface IType {
    name:TypesNames,
    state:boolean
}
export type Types = Array<IType>

export interface Dades {
    search: string
    sort: '-id' | '+id' | '-name' | '+name'
    types: Types
    icons: any
}
