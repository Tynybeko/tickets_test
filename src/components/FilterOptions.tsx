import React from 'react';

const filterOptions = [
    { id: 1, title: 'Все', value: null },
    { id: 2, title: 'Без пересадок', value: 0 },
    { id: 3, title: '1 пересадка', value: 1 },
    { id: 5, title: '2 пересадки', value: 2 },
    { id: 4, title: '3 пересадка', value: 3 },
];

interface FilterOptionsProps {
    filters: null | number[];
    onFilterChange: (value: number | null) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ filters, onFilterChange }) => {
    return (
        <div>
            <h3 className="font-medium mb-2">КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
            <div className="space-y-2">
                {filterOptions.map(item => (
                    <label key={item.id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={filters === null || (item.value !== null && filters.includes(item.value))}
                            className="mr-2"
                            onChange={() => onFilterChange(item.value)}
                        />
                        {item.title}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterOptions;