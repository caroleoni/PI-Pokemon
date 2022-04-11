const router = require('express').Router();
require("dotenv").config();
const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getApiPokemon = async() => {
    const firstPage = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const secondPage = await axios.get(firstPage.data.next);

    const allPokemons = firstPage.data.results.concat(secondPage.data.results);

    const result = await Promise.all(
        allPokemons.map(async e => {
            const pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.home.front_default,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                types: pokemon.data.types && pokemon.data.types.map(e => e.type.name).join(", ")
                // types: pokemon.data.types && pokemon.data.types.map(e => e.type.name)
            }
        })
    )
    return result;
};

const getDbPokemon = async() => {
    const pokemonDb = await Pokemon.findAll({
        include: {
            model: Type,
            atributes: ['name'],
            through: {
                atributes: []
            }
        }
    })
    
    return pokemonDb;
};

const getAllPokemons = async () => {
    const [apiInfo, dbInfo] = await Promise.all([getApiPokemon(), getDbPokemon()]);
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo; 
};

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        const allPokemons = await getAllPokemons();
        if(name) {
            let pokemonName = await allPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName.length > 0 ? res.json(pokemonName) : res.status(404).json({error: 'Name not found'});

        } else {
            res.json(allPokemons);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    const id  = req.params.id;
    try {
        let allPokemons = await getAllPokemons();
        if(id) {
            let idPokemon = allPokemons.filter(e => e.id == id)
            idPokemon.length ? res.json(idPokemon) : res.status(404).json( 'Pokemon not found') 
        }
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    const { id, name, types, image, hp, attack, defense, speed, height, weight, createdInDb } = req.body;
    try {
        //lo creo
        let newPokemon = await Pokemon.create({
            id, name, image, hp, attack, defense, speed, height, weight, createdInDb
        })
        for(let i = 0; i < types.length; i ++) {
            let typesDb = await Type.findAll({
                where: { name: types[0] }
            })
            await newPokemon.addType(typesDb);
        }
        
        
        res.json('Pokemon Created');

    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await Pokemon.destroy({
            where: { id }
        }))

    } catch (error) {
        console.log(error);
    }
});


module.exports = router;