import axios from 'axios';
import { Products } from '../interface/types';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const fetchData = async (): Promise<Products> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};
