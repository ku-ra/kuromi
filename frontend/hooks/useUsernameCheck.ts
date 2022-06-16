import { useMutation } from 'react-query';
import { ACCOUNT_USERNAME_CHECK } from '../constants/apiRoutes';
import client from '../client/axios'


const usernameCheck = async (username: string) => {
    return await client.post(`${ACCOUNT_USERNAME_CHECK}${username}`);
}

export const useUsernameCheck = () => {
    return useMutation(usernameCheck);
};