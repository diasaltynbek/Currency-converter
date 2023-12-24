import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
    const [fromCurrency, setFromCurrency] = useState('RUB');
    const [toCurrency, setToCurrency] = useState('USD');
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(1);

    const ratesRef = useRef({});

    useEffect(() => {
        fetch('https://open.er-api.com/v6/latest')
        .then(res => res.json())
        .then((json) => {
            ratesRef.current = json.rates;
            onChangeToPrice(1);
        }).catch(err => {
            console.warn(err);
            alert('Не удалось получить информацию');
        })
    }, []);

    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency];
        const result = price * ratesRef.current[toCurrency];

        setToPrice(result.toFixed(3));
        setFromPrice(value);    
    }

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
        setFromPrice(result.toFixed(3));
        setToPrice(value)
    }

    React.useEffect(() => {
       onChangeFromPrice(fromPrice); 
    }, [fromCurrency]);

    React.useEffect(() => {
        onChangeToPrice(toPrice); 
     }, [toCurrency]);
 
  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;