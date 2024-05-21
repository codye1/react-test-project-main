import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MyInput from '../components/UI/input/MyInput';

const Converter = () => {
    const defoult = ['UAH','USD','EUR']
    const [result,setResult]=useState()
    const [number,setNumber]=useState('1')
    const [fromCurrency,setFromCurrency]=useState('UAH')
    const [toCurrency,setToCurrency]=useState('UAH')
   function converters() {
        if (fromCurrency===toCurrency) {
            setResult(number)
        }else if (fromCurrency==='UAH'){
            toCurrency==='USD'? setResult(parseInt(number)*0.03) : setResult(parseInt(number)*0.03)
        }else if (fromCurrency==='USD'){
            toCurrency==='USD'? setResult(number) : toCurrency==='EUR'? setResult(parseInt(number)*0.92) : setResult(parseInt(number)*35)
        }else if (fromCurrency==='EUR'){
            toCurrency==='EUR'? setResult(number) : toCurrency==='UAH'? setResult(parseInt(number)*36) : setResult(parseInt(number)*1.09)
        }
    }

    useEffect(()=>{converters()},[number,fromCurrency,toCurrency ])


    return (
        <div className='blockoprosa'>
            <div className='blockconvert'>
                {defoult.map((cur)=>(
                    <button
                    onClick={()=>setFromCurrency(cur)}
                    className={fromCurrency===cur?'active': ''}
                    key={cur}
                    >{cur}
                    </button>
                ))}
            <MyInput type='number' value={number} onChange={(e)=>{
                setNumber(e.target.value)
                }} className={'convinp'}></MyInput>
            </div>
            <div className='blockconvert'>
            {defoult.map((cur)=>(
                    <button
                    onClick={()=>setToCurrency(cur)}
                    className={toCurrency===cur?'active': ''}
                    key={cur}
                    >{cur}
                    </button>
                ))}
            <div className='convinp'>{Math.ceil(result)}</div>
            </div>
        </div>
    );
};

export default Converter;