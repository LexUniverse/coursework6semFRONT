import axios from 'axios';
import { $authHost } from "./index";

export const addVacancyToList = async (vacancyId) => {
    try {
        await $authHost.post('/api/list', { vacancyId });
    } catch (error) {
        throw new Error('Ошибка при добавлении вакансии в список');
    }
};

export const getAllVacanciesInList = async () => {
    try {
        const { data } = await $authHost.get('/api/list');
        return data;
    } catch (error) {
        throw new Error('Ошибка при получении списка вакансий');
    }
};

export const deleteVacancyFromList = async (vacancyId) => {
    try {
        await $authHost.delete('/api/list', { data: { vacancyId } });
    } catch (error) {
        throw new Error('Ошибка при удалении вакансии из списка');
    }
};
