import { useMutation } from 'react-query';
import { POST_CREATE } from '../constants/apiRoutes';
import client from '../client/axios'

import { queryErrorHandler } from './useQueryErrorHandling'; 

const postCreate = async (postData: any) => {
    //OnError in mutation
    const response = await client.post(POST_CREATE, postData, {headers: {}}).catch((e) => {queryErrorHandler(e)});
    return response;
}

export const usePostCreate = () => {
    return useMutation(postCreate);
};