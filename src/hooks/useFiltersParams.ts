import { useState, useEffect } from 'react';

interface FilterParams {
    currency: 'RUB' | 'USD' | 'EUR';
    filters: number[] | null;
}

const useFilterParams = (initialParams: FilterParams) => {
    const [params, setParams] = useState<FilterParams>(initialParams);

    const setCurrency = (currency: 'RUB' | 'USD' | 'EUR') => {
        setParams(prev => ({ ...prev, currency }));
    };

    const setFilters = (filters: number[] | null) => {
        setParams(prev => ({ ...prev, filters }));
    };

    const toggleFilter = (value: number | null) => {

        setParams(prev => {
            if (value === null) return { ...prev, filters: null }
            if (!prev.filters) {
                return { ...prev, filters: [value] };
            }
            if (prev.filters.includes(value)) {
                const updatedFilters = prev.filters.filter(f => f !== value);
                return { ...prev, filters: updatedFilters.length ? updatedFilters : null };
            }
            return { ...prev, filters: [...prev.filters, value] };
        });
    };


    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const currency = searchParams.get('currency') as 'RUB' | 'USD' | 'EUR';
        const filters = searchParams.get('filters')
            ? searchParams
                .get('filters')!
                .split(',')
                .map(Number)
            : null;

        setParams({ currency: currency || 'RUB', filters });
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('currency', params.currency);
        if (params.filters) {
            searchParams.set('filters', params.filters.join(','));
        } else {
            searchParams.delete('filters');
        }
        window.history.replaceState({}, '', `?${searchParams.toString()}`);
    }, [params]);

    return {
        params,
        setCurrency,
        setFilters,
        toggleFilter,
    };
};

export default useFilterParams;
