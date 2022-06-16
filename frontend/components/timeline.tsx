import client from '../client/axios'
import { useQuery } from "react-query";

import PostView from "./postView";
import { FetchData } from './postView'

const fetchTimeline = async () => {
    return await client.post<FetchData[]>('http://localhost:8001/api/v1/posts/home');    
}

const Timeline = () => {
    const { isLoading, isError, data, error } = useQuery('timeline', fetchTimeline);

    if (isLoading) {
        return <p>"Loading..."</p>
    }
    
    if (isError) {
        return <p>"Error: {error}"</p>
    }

    return (
        <>
            { 
                data ? data.data.map((post) => { 
                    return <PostView 
                        key={post.postId} 
                        postId={post.postId} 
                        description={post.description} 
                        type={post.type} 
                        createdAt={post.createdAt} 
                        Files={post.Files}
                        User={post.User}
                    /> 
                }) 
                    : null
            }
        </>
    );
};

export default Timeline;