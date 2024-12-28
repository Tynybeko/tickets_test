import React, { useEffect, useState } from 'react'
import { ITickets } from '../types/type.models'
import getTickets from '../api/get'




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


interface TicketsListProps {
    params: { [key: string]: any }
}
export default function TicketsList({ params = {} }: TicketsListProps) {
    const [tickets, setTickets] = useState<ITickets[]>([])
    useEffect(() => {
        const data = getTickets(params.currency, params.filters)
        setTickets(data)
    }, [params])

    return (
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
                            <button className="flex-1 bg-orange-500 text-white w-full py-2 rounded-lg font-semibold">
                                Купить <br /> за {item.Цена_x0020_в_x0020_дол}{getCurrencySym(params.currency)}
                            </button>
                        </div>
                        <div className="flex flex-[1_1_0] justify-between items-center px-5">
                            <div className='w-full'>

                                <div className="flex space-x-4 my-1 items-center">
                                    <p className="text-4xl font-medium">{toLocalTime(item.Время_x0020_вылета)}</p>
                                    <div className="flex flex-col flex-1 items-center justify-center my-4">
                                        <span className="text-gray-500 text-sm mb-1 uppercase">
                                            {item.Пересадки ? item.Пересадки : 'без'} {item.Пересадки != 1 ? `пересадки` : 'пересадка'}
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
    )
}
