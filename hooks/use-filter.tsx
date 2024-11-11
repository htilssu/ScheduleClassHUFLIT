import {useEffect, useState} from 'react';
import {useSearchParams} from "next/navigation";

export interface Filter {
    year: string,
    semester: string,
    major: string
}

const useFilter = () => {
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState<Filter>({
        year: '',
        semester: '',
        major: ''
    });

    const year = searchParams?.get("year");
    const semester = searchParams?.get("semester");
    const major = searchParams?.get("major");
    useEffect(() => {
        setFilters({
            year: year || '',
            semester: semester || '',
            major: major || ''
        });
    }, [year, semester, major]);

    return {filters, setFilters};
};

export default useFilter;