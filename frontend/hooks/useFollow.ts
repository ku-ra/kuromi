import { useMutation } from 'react-query';
import { PROFILE_FOLLOW } from '../constants/apiRoutes';
import client from '../client/axios'

import { queryErrorHandler } from './useQueryErrorHandling'; 

const follow = async (targetUsername: any) => {
    //OnError in mutation
    const response = await client.post(PROFILE_FOLLOW, {targetUsername: targetUsername}, {headers: {}});
    return response;
}

export const useFollow = () => {
    return useMutation(follow);
};