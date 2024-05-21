import React from "react";
import axios from "axios";
export default class PostService{

    static async getAll(limit=10, page=2){
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            return response;
    }

    static async getById(id){
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/'+ id)
        return response;
    }
    static async getCommentsById(id){
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response;
    }
    static async getCord(city,countryCode){
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=7f0b365e8005dbb34ccb9d850e3a76cb&units=imperial`)
        return response
    }
    static async getPogoda(lat,lon){
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7f0b365e8005dbb34ccb9d850e3a76cb&units=metric&lang=ru`)
        return response
    }
}