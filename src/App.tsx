import React from 'react';
import CurrencySelector from './components/CurrencySelector';
import FilterOptions from './components/FilterOptions';
import useFilterParams from './hooks/useFiltersParams';
import TicketsList from './components/TicketsList';




const App: React.FC = () => {
  const { params, setCurrency, toggleFilter } = useFilterParams({
    currency: 'RUB',
    filters: null,
  });


  return (
    <div className="h-screen overflow-hidden select-none bg-gray-100 p-4">
      <img className='w-20 mx-auto ' src="/logo.svg" alt="" />
      <div className="max-w-5xl mx-auto h-full">
        <div className="flex flex-col md:flex-row gap-4 h-full items-start">
          <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3 py-6">
            <CurrencySelector currency={params.currency} onCurrencyChange={setCurrency} />
            <FilterOptions filters={params.filters} onFilterChange={toggleFilter} />
          </div>
          <TicketsList params={params} />
        </div>
      </div>
    </div>
  );
};

export default App;
