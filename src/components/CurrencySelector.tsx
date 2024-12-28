import React from 'react';

interface CurrencySelectorProps {
    currency: 'RUB' | 'USD' | 'EUR';
    onCurrencyChange: (cur: 'RUB' | 'USD' | 'EUR') => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currency, onCurrencyChange }) => {
    return (
        <div>
            <h3 className="font-medium mb-2">ВАЛЮТА</h3>
            <div className="flex gap-2 mb-4">
                {['RUB', 'USD', 'EUR'].map(cur => (
                    <button
                        key={cur}
                        onClick={() => onCurrencyChange(cur as 'RUB' | 'USD' | 'EUR')}
                        className={`px-4 py-1 border rounded ${currency === cur ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {cur}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CurrencySelector;
