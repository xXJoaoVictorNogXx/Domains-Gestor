import axios from 'axios';
import { Domain } from '../types/domainTypes';
import { User } from '../types/userTypes';
import { Account } from "../types/accountTypes";


// Instância base do Axios
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
})

axiosInstance.interceptors.request.use(
    //caso de sucesso
    (res) => {
        console.log('Requisição enviada:', res);
        return res;
    },
    //caso de erro
    (err) => {
        console.error('Erro na requisição:', err);
        return Promise.reject(err);
    }
)


export const createAccount = async () => {
    const response = await axiosInstance.post<User[]>('/login')
    console.log('Resposta da criação de conta:', response);
    return response.data
}  
    
export const getAccount = async () => {
    const response = await axiosInstance.get<Account[]>('/accounts');
    console.log('Resposta da obtenção de conta:', response);
    return response.data
}

export const getDomains = async () => {
    const response = await axiosInstance.get<Domain[]>('/domains');
    return response.data
}

