
import tickets from './tickets.json'
import { ITickets } from '../types/type.models'

const СurrencyOption = {
    "RUB": 98.32,
    "USD": 1,
    "EUR": .9,
}

const TicketData: ITickets[] = tickets

export default function getTickets(currency: 'RUB' | 'USD' | 'EUR' = 'RUB', transfer: number[] | null): ITickets[] {
    const data = TicketData.map(el => ({ ...el, 'Цена_x0020_в_x0020_дол': Math.ceil(+el.Цена_x0020_в_x0020_дол * СurrencyOption[currency]) }))
    return data.filter(item => {
        if (transfer !== null) {
            return transfer.includes(item.Пересадки)
        }
        return item
    })
}

