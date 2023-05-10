const axios = require('axios');
const {Type} = require('../db');
const {API_POKEMON_TYPE} = require('../utils/globals');


const addTypeDb = async () => {
    try {
        const allTypes = await Type.findAll()
        if (allTypes.length > 0) {
            return null
        }
        const reqType = await axios.get(API_POKEMON_TYPE)
        const resType = reqType.data.results
        resType.map(e => {
            Type.create({
                nombre: e.name
            })
        })
    } catch (err) {
        console.log(err)
    }
}
addTypeDb()


const getTypeApi = async () => {
    const result = await Type.findAll();
    return result;
}

module.exports = {
    getTypeApi
};