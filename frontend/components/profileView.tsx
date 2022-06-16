import Client from '../client/axios';
import PostThumbnail, { PostThumbnailData } from '../components/postThumbnail'
import FollowButton from '../components/followButton'

import { useQuery } from 'react-query'


type DetailedUserData = {
    username: string,
    customname: string,
    description: string,
    avatar: string,
    followerCount: string,
    followingCount: string,
    Posts: PostThumbnailData[],
}

type User = {
    username: string | null
}

const fetchProfileView = async ({ queryKey }: any) => {
    const [ key, { username } ] = queryKey;
    return await Client.post<DetailedUserData>(`http://localhost:8001/api/v1/users/profile/${username}`);    
}


const ProfileView = ({username}: User) => {
    const userView = useQuery(['userview', { username }], fetchProfileView);

    if (userView.isLoading) {
        return (
            <div className="h-full flex justify-center items-center">
                <p>Loading...</p>
            </div>
        )
    }
    
    if (userView.isError) {
        return (
            <div className="h-full flex justify-center items-center">
                <p>An unknown error occured: {userView.error}</p>
            </div>
        )
    }

    if (!userView.data) {
        return (
            <div className="h-full flex justify-center items-center">
                <p>An unknown error occured</p>
            </div>
        )
    }

    return (
            <div className="min-w-full bg-white px-0 py-16 m-auto">
                <div className="min-w-full min-h-screen flex flex-col items-start space-y-4">
                    <div className="flex flex-row space-x-6">
                        <div className="w-28 h-28 bg-transparent rounded-full">
                            <img src={userView.data.data.avatar} className="rounded-full"></img>
                        </div>
                        <div className="flex flex-col space-y-1 justify-between">
                            <div className="space-y-0.5 text-left">
                                <h1 className="font-bold text-2xl">@{userView.data.data.username}</h1>
                                <p className="font-semibold text-base">{userView.data.data.customname}</p>
                            </div>
                            <FollowButton username={username}></FollowButton>
                        </div>
                    </div>
                    <div className="break-all font-base text-sm pt-4">
                        <p>{userView.data.data.description}</p>
                    </div>
                    <div className="flex flex-row items-center w-full py-2 space-x-8">
                        <div className="space-x-1 mt-auto">
                            <span className="font-semibold text-base text-gray-800">{userView.data.data.followerCount}</span>
                            <span className="font-light text-sm text-gray-800">Followers</span>
                        </div>
                        <div className="space-x-1 mt-auto">
                            <span className="font-semibold text-base text-gray-800">{userView.data.data.followingCount}</span>
                            <span className="font-light text-sm text-gray-800">Following</span>
                        </div>
                    </div>
                    <div className="w-full pt-2 flex flex-row">
                    <div className="w-full text-center">
                        <button className="w-full py-2 border-b-2 border-black">
                            <p className="text-sm font-bold">Videos</p>
                        </button>
                    </div>
                    <div className="w-full text-center">
                        <button className="w-full hover:border-black py-2 border-b-2 border-gray-50">
                            <p className="text-sm font-bold">Texts</p>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-1 w-full">
                    {userView.data.data.Posts.map((post, index) => { return (<PostThumbnail key={index} postId={post.postId} Files={post.Files}/>); })}
                </div>
                </div>
            </div>
    )
}

export default ProfileView;