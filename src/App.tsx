import React, { useEffect, useState } from 'react';
import { ITickets } from './types/type.models';
import getTickets from './api/get';




const filterOptions = [
  {
    id: 1,
    title: "Все",
    value: null
  },
  {
    title: 'Без пересадок',
    id: 2,
    value: 0
  },
  {
    title: '1 пересадка',
    id: 3,
    value: 1
  },
  {
    title: ' 2 пересадки',
    id: 5,
    value: 2
  },
  {
    title: '3 пересадка',
    id: 4,
    value: 3
  },
]

const getCurrencySym = (key: string) => {
  return {
    'USD': '$',
    'RUB': '₽',
    'EUR': "€"
  }[key]

}


const toLocalTime = (date: string) => {
  return new Date(date).toLocaleTimeString('RU-ru', {
    timeStyle: 'short'
  })
}
const toLocalDate = (date: string) => {
  let objDate = new Date(date)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short'
  }).format(objDate)
};


const App: React.FC = () => {
  const [currency, setCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');
  const [tickets, setTickets] = useState<ITickets[]>([])
  const [filters, setFilters] = useState<null | number[]>(null);
  useEffect(() => {
    const data = getTickets(currency, filters)
    setTickets(data)
  }, [currency, filters])

  const handleCurrencyChange = (cur: 'RUB' | 'USD' | 'EUR') => setCurrency(cur);
  const handleFilterChange = (value: number | null) => {
    if (value === null) return setFilters(null);
    if (filters?.includes(value)) return setFilters(prev => prev !== null && prev.length != 1 ? prev?.filter(el => el != value) : null)
    setFilters(prev => prev !== null ? [...prev, value] : [value])
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto h-full">
        <div className="flex flex-col md:flex-row gap-4 h-full">
          <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
            <h3 className="font-medium mb-2">ВАЛЮТА</h3>
            <div className="flex gap-2 mb-4">
              {['RUB', 'USD', 'EUR'].map((cur) => (
                <button
                  key={cur}
                  onClick={() => handleCurrencyChange(cur as 'RUB' | 'USD' | 'EUR')}
                  className={`px-4 py-1 border rounded ${currency === cur ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <h3 className="font-medium mb-2">КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
            <div className="space-y-2">
              {
                filterOptions.map(item => (
                  <label key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters == null || (item.value !== null && filters.includes(item.value))}
                      className="mr-2"
                      onChange={() => {
                        handleFilterChange(item.value)
                      }}
                    />
                    {item.title}
                  </label>
                ))
              }
            </div>
          </div>

          <div className="w-full overflow-auto no-scrollbar h-screen">
            {
              tickets.length ? tickets.map(item => (
                <div key={item.Код} className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
                  <div className=" flex flex-[0_1_200px] px-5 flex-col items-center content-center border-r">
                    <img
                      src="/png/Turkish_Airlines_logo.png"
                      alt="Turkish Airlines"
                      className="w-[80%] mr-4 object-cover"
                    />
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold">
                      Купить <br /> за {item.Цена_x0020_в_x0020_дол}{getCurrencySym(currency)}
                    </button>
                  </div>

                  <div className="flex flex-[1_1_0] justify-between items-center px-5">
                    <div className='w-full'>

                      <div className="flex space-x-4 my-1 items-center">
                        <p className="text-4xl font-medium">{toLocalTime(item.Время_x0020_вылета)}</p>
                        <div className="flex flex-col flex-1 items-center justify-center my-4">
                          <span className="text-gray-500 text-sm mb-1 uppercase">
                            {item.Пересадки ? item.Пересадки : 'без'} {item.Пересадки != 1 ? `пересадки` : 'пересадка' }
                          </span>
                          <div className="flex-grow w-[80%] border-t border-gray-300 relative">
                            <div className="absolute -right-5 w-5 -top-2.5 opacity-60">
                              <img src="/png/plane.png" alt="" />
                            </div>
                          </div>
                        </div>
                        <p className="text-4xl font-medium">{toLocalTime(item.Время_x0020_прилета)}</p>
                      </div>
                      <div className='flex justify-between  w-full'>
                        <div className='flex flex-col'>
                          <p className="text-gray-500 text-xl text-center">{item.Откуда}</p>
                          <p className="text-gray-400 text-sm">
                            {toLocalDate(item.Время_x0020_вылета)}
                          </p>
                        </div>
                        <div className='flex flex-col'>
                          <p className="text-gray-500 text-xl text-center">{item.Куда}</p>
                          <p className="text-gray-400 text-sm">
                            {toLocalDate(item.Время_x0020_прилета)}

                          </p>
                        </div>
                      </div>


                    </div>


                  </div>
                </div>
              ))
                :
                <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
                  <p className="w-full text-gray-500 text-xl text-center">Пока отсутвует</p>
                </div>

            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
