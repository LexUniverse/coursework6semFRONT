import {$authHost, $host} from "./index";


export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data
}

export const createLocation = async (locationData, token) => {
    try {
        const { data } = await $authHost.post('api/location/', locationData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ошибка при создании локации');
    }
};

export const fetchLocation = async () => {
    const {data} = await $host.get('api/location');
    return data
}

export const createVacancy = async (vacancy) => {
    const {data} = await $authHost.post('api/vacancy', vacancy);
    return data
}

export const fetchVacancy = async (employmentTypeId, locationId, page, limit = 5) => {
    const {data} = await $host.get('api/vacancy', {params: {employmentTypeId, locationId, page, limit}});
    return data
}

export const fetchOneVacancy = async (id) => {
    const {data} = await $host.get('api/vacancy/' + id);
    return data
}

export const updateVacancy = async (id, vacancy) => {
    const {data} = await $authHost.put('api/vacancy/' + id, vacancy);
    return data
}

export const deleteVacancy = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/vacancy/${id}`});
    return data;
}

export const deleteType = async (id) => {
    const { data } = await $authHost({ method: 'DELETE', url: `api/type/${id}` });
    return data;
}

export const deleteLocation = async (id) => {
    const { data } = await $authHost({ method: 'DELETE', url: `api/location?id=${id}` });
    return data;
}

