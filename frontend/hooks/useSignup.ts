import { useMutation } from 'react-query';
import { ACCOUNT_REGISTER } from '../constants/apiRoutes';
import client from '../client/axios'

const signup = async (signupData: any) => {
    return await client.post(ACCOUNT_REGISTER, signupData);
}

export const useSignup = () => {
    return useMutation(signup);
};