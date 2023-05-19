const axios = require('axios');
const { Type } = require('../db');
const { API_POKEMON_TYPE } = require('../utils/globales')


// 1 - ADHIERE LOS TYPES A LA BASE DE DATOS CUANDO EL SERVIDOR ESTA ANDANDO
const addTypeDb = async () => {
    try {
        const allTypes = await Type.findAll()

        if (allTypes.length === 0) {
            console.log('No hay datos en la base de datos local. Insertando desde la API Externa ...');
        }
        const reqType = await axios.get(API_POKEMON_TYPE)
        const resType = reqType.data.results
        resType?.map(e => {
            Type.create({
                nombre: e.name
            })
        })

    } catch (err) {
        console.log(err)
    }
}
addTypeDb()


// 2 - LOS TYPES SON TRAIDOS DE LA BASE DE DATOS Y ENVIADOS AL ROUTER
const getTypeApi = async (req, res) => {
    const result = await Types.findAll();
    return res.send(result)
}

module.exports = {
    getTypeApi
};