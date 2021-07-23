import axios from 'axios'

const instance = axios.create({baseURL: `https://city-mobil.ru/api/cars`})

export const CarsApi = {
    getCars() {
        return instance.get(``)
    },
}
