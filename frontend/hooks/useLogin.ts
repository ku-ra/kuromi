import { useMutation } from 'react-query';
import { ACCOUNT_LOGIN } from '../constants/apiRoutes';
import client from '../client/axios'

const login = async (loginData: any) => {
    return await client.post(ACCOUNT_LOGIN, loginData);
}

export const useLogin = () => {
    return useMutation(login);
};