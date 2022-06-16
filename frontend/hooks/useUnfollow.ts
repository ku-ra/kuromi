import { useMutation } from 'react-query';
import { PROFILE_UNFOLLOW } from '../constants/apiRoutes';
import client from '../client/axios'

import { queryErrorHandler } from './useQueryErrorHandling'; 

const unfollow = async (targetUsername: any) => {
    return await client.post(PROFILE_UNFOLLOW, {targetUsername: targetUsername}, {headers: {}});
}

export const useUnfollow = () => {
    return useMutation(unfollow);
};