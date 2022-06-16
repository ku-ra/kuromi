import { useMutation } from 'react-query';
import { USERS_EDIT } from '../constants/apiRoutes';
import client from '../client/axios'

const userEdit = async (userEditData: any) => {
    return await client.post(USERS_EDIT, userEditData);
}

export const useUserEdit = () => {
    return useMutation(userEdit);
};