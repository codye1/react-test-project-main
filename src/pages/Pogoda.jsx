import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import MyInput from '../components/UI/input/MyInput';
import { useFetching } from '../hooks/useFetching';
import Iframe from 'react-iframe'


const Pogoda = () => {

    const [pogoda,setPogoda]= useState()
    const [city,setCity]=useState()
    const [cityl,setcityl]=useState('Париж')
    const [lat,setLat]=useState()
    const [lon,setLon]=useState()

    const [fetchCord] = useFetching( async (city,code)=>{
        const responses = await PostService.getCord(city,code)
        fetchPogoda(String(responses.data[0].lat),String(responses.data[0].lon))
        setLat(responses.data[0].lat)
        setLon(responses.data[0].lon)
        setCity(responses.data[0].name)
        return responses
    })

    const [fetchPogoda] = useFetching( async (lat,lon)=>{
        const response = await PostService.getPogoda(lat,lon)

        setPogoda(response)
    })


    useEffect(()=>{
        fetchCord(cityl,'804')
    },[cityl])

    if(pogoda != undefined){
        return (
            <div>

        <Iframe url={`https://api.maptiler.com/maps/basic-v2/?key=XyT8E9T7XeDwpsq9fbbX#7/${lat}/${lon}`}
        width="640px"
        height="320px"
        id=""
        className=""
        display="block"
        position="relative"/>
                <MyInput
                    value={cityl}
                    type='text'
                    placeholder='Введите город'
                    onChange={e=>setcityl(e.target.value)}
                ></MyInput>
                <h1>Погода в {city}</h1>
                <h1>Температура: {Math.round(pogoda.data.main.temp)}°C</h1>
                <h1>Описание погоды: {pogoda.data.weather[0].description}</h1>
            </div>
        );
    }


};

export default Pogoda;