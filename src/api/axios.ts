import axios from 'axios';
import { Domain } from '../types/domainTypes';
import { User } from '../types/userTypes';
import { Account, CreateAccountFormData } from "../types/accountTypes";

// Instância base do Axios
export const axiosInstance = axios.create({
  baseURL: "api",
        headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
})


// Parte de contas do domínio
export const createDomainAccount = async (data: CreateAccountFormData & { domainId: string; isBlocked: boolean }) => {
  const payload = {
    ...data,
    id: String(Date.now()), 
  };
  
  const response = await axiosInstance.post('/accounts', payload);
  return response.data;
};

export const deleteDomainAccount = async (id: string) => {
  await axiosInstance.delete(`/accounts/${id}`);
};

export const updateDomainAccount = async ({ id, data }: { id: string; data: any }) => {
  const response = await axiosInstance.patch(`/accounts/${id}`, data);
  return response.data;
};

//Parte de acessos e criação de usuários do sistema em si
export const loginUser = async (credentials: { email: User['email']; password: User['password'] }) => {
  try {
    const usersResponse = await axiosInstance.get(`/users?email=${credentials.email}`);
    const foundUsers = usersResponse.data;

    if (foundUsers.length > 0) {
      const userLogado = foundUsers[0];
      return {
        accessToken: `fake-jwt-token-${userLogado.id}`, 
        user: userLogado
      };
    }

    const adminResponse = await axiosInstance.get('/login');
    const adminData = adminResponse.data;

    if (
      adminData?.user?.email === credentials.email && 
      adminData?.user?.password === credentials.password
    ) {
      return {
        accessToken: adminData.accessToken, 
        user: adminData.user
      };
    }

    throw new Error("Email ou senha inválidos");
    
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('fake-jwt-token'); 
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        console.log('Requisição enviada:', config.url);
        return config;
    },
    (err) => {
        console.error('Erro na montagem da requisição:', err);
        return Promise.reject(err);
    }
) 

export const createAccount = async (userData: { name: string; email: User['email']; password: User['password'] }) => {
  const response = await axiosInstance.post<User[]>('/users', userData); 
  console.log('Resposta da criação de conta:', response.data);
  return response.data;
};
    
export const getAccount = async () => {
    const response = await axiosInstance.get<Account[]>('/accounts');
    console.log('Resposta da obtenção de conta:', response);
    return response.data
}

export const getDomains = async () => {
    const response = await axiosInstance.get<Domain[]>('/domains');
    return response.data
}
