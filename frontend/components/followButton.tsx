import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useFollow } from '../hooks/useFollow'
import { useUnfollow } from '../hooks/useUnfollow'
import { useUserContext } from '../context/user.context';
import Client from '../client/axios';

type FollowStatus = {
    status: boolean
}

type User = {
    username: string | null
}

const fetchFollowStatus = async ({ queryKey }: any) => {
    const [ key, { username } ] = queryKey;
    return (await Client.post<FollowStatus>(`http://localhost:8001/api/v1/relations/follow/status`, { targetUsername: username })).data;    
}

const FollowButton = ({ username }: User) => {
    const { loggedIn } = useUserContext();

    const [ following, setFollowing ] = useState<boolean>(false);

    const { isLoading, isError, data, error } = useQuery(['isFollowing', { username }], fetchFollowStatus);

    const router = useRouter();
    const followMutation = useFollow();
    const unfollowMutation = useUnfollow();

    const handleFollow = () => {
        if (loggedIn()) {
            followMutation.mutate(username, {
                onSuccess: () => { setFollowing(true);  console.log("Followed") },
                onError: (data) => { console.log(data) },
            });
        } else {
            router.push('./login');
        }
    }

    const handleUnfollow = () => {
        if (loggedIn()) {
            unfollowMutation.mutate(username, {
                onSuccess: () => { setFollowing(false); console.log("Unfollowed") },
                onError: (data) => { console.log(data) },
            });
        } else {
            router.push('./login');
        }
    }
    
    useEffect(() => {
        if (data) {
            setFollowing(data.status);
        }
    }, [data])


    return (
        following ? ( 
            <button className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-1.5 px-4 border border-pink-500 hover:border-transparent rounded w-52" disabled={isLoading || isError} onClick={() => handleUnfollow()}>
                Unfollow
            </button>
        ) : (
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-1.5 px-4 rounded w-52" disabled={isLoading || isError} onClick={() => handleFollow()}>
                Follow
            </button>
        )
    )
}

export default FollowButton;