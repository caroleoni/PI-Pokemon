const router = require('express').Router();
require("dotenv").config();
const axios = require('axios');
const { Type } = require('../db');

router.get('/', async (req, res) => {
    try {
        const apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
        const arrayTypes = await apiTypes.data.results.map(t => t.name);
        // console.log(arrayTypes);
        arrayTypes.forEach(t => {
            Type.findOrCreate({
                where: {
                    name: t
                }
            })
        })
        let allTypes = await Type.findAll(); //guarda en db
        res.json(allTypes);

    } catch (error) {
        console.log(error)
    }
});


module.exports = router;
