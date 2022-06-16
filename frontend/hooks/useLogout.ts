import { useMutation } from 'react-query';
import { ACCOUNT_LOGOUT } from '../constants/apiRoutes';
import client from '../client/axios'

const logout = async () => {
    return await client.post(ACCOUNT_LOGOUT);
}

export const useLogout = () => {
    return useMutation(logout);
};