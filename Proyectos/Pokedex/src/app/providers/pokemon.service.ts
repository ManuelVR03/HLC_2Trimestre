import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Pokemon } from 'src/app/modelo/Pokemon';


@Injectable()

export class PokemonServiceProvider {


    private URL = "https://pokeapi.co/api/v2";


    constructor(public http: HttpClient) {

    }

    getPokemons(offset: number): Promise<Pokemon[]> {

        let promise = new Promise<Pokemon[]>((resolve, reject) => {

            this.http.get(this.URL + "/pokemon?limit=9&offset=" + offset).toPromise()

                .then((data: any) => {

                    let pokemons = new Array<Pokemon>();

                    data.results.forEach((poke: any) => {

                        this.http.get(poke.url).toPromise()

                            .then((data: any) => {

                                let tipos = new Array<string>();

                                data.types.forEach((tipo: any) => {

                                    tipos.push(tipo.type.name);

                                });

                                let habilidades = new Array<string>();

                                data.abilities.forEach((habilidad: any) => {

                                    habilidades.push(habilidad.ability.name);

                                });

                                let img = data.sprites.other?.["showdown"]?.front_default || // 🏆 Animado (si existe)
                                data.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default || // 🎥 Otro animado
                                data.sprites.other?.["official-artwork"]?.front_default || // 🖼️ Imagen oficial HD
                                data.sprites.other?.["home"]?.front_default || // 🏠 Imagen de Pokémon Home
                                data.sprites.front_default; // 📸 Imagen por defecto

                                let pokemon = new Pokemon(data.id, data.name, img, tipos, habilidades, data.weight, data.height);

                                pokemons.push(pokemon);

                                pokemons.sort((a, b) => a.id - b.id);

                            })

                            .catch((error: Error) => {

                                reject(error.message);

                            });

                    });

                    
                    resolve(pokemons);


                })

                .catch((error: Error) => {

                    reject(error.message);

                });

        });

        return promise;

    }//end_getPokemons
}