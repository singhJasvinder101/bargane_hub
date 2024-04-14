import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ExchangeRateResponse {
    amount: number;
    base: string;
    date: string;
    rates: { [key: string]: number };
}

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('INR');
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get<ExchangeRateResponse>(
                    `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
                );
                const rate = response.data.rates[toCurrency];
                setConvertedAmount(rate);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [amount, fromCurrency, toCurrency]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(event.target.value));
    };

    const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setToCurrency(event.target.value);
    };

    return (
        <div className='p-8 mt-3 bg-slate-100 rounded-xl md:w-[49%]'>
            <h2 className='text-xl text-purple-600'>Currency Converter</h2>
            <div className='py-2'>
                <label>
                    <span className='text-purple-600 pr-2'>
                        Amount:
                    </span>
                    <input className='bg-slate-100 w-16' type="number" value={amount} onChange={handleAmountChange} />
                    {fromCurrency}
                </label>
                <label>
                    <span className='text-purple-600 px-2'>
                        <span className='text-purple-600 px-2'>
                            From:
                        </span>
                    </span>
                    <select className='bg-slate-100' value={fromCurrency} onChange={handleFromCurrencyChange}>
                        <option className='px-3' value="USD">USD</option>
                        <option className='px-3' value="EUR">EUR</option>
                        <option className='px-3' value="INR">INR</option>
                    </select>
                </label>
                <label>
                    <span className='text-purple-600 px-2'>
                        <span className='text-purple-600 px-2'>
                            To:
                        </span>
                    </span>
                    <select className='bg-slate-100' value={toCurrency} onChange={handleToCurrencyChange}>
                        <option className='px-3' value="USD">USD</option>
                        <option className='px-3' value="EUR">EUR</option>
                        <option className='px-3' value="INR">INR</option>
                    </select>
                </label>
            </div>
            <div>
                {convertedAmount !== null && (
                    <p>
                        {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;
