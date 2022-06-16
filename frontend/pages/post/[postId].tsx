import Client from '../../client/axios';

import UserView from '../../components/userView'
import CommentView from '../../components/commentView'

import { useQuery } from 'react-query';
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react';


type PostData = {
    postId: number,
    description: string,
    createdAt: Date,
    Files: FileData[],
    Comments: CommentData[]
    User: UserData,
}

type CommentData = {
    comment: string,
    createdAt: Date,
    User: UserData
}

type UserData = {
    customname: string,
    username: string,
    avatar: string,
    description: string,
    ActiveBadge: BadgeData | null,
}

type BadgeData = {
    badgePath: string,
}

type FileData = {
    type: string,
    filePath: string
}

const fetchPostDetails = async ({ queryKey }: any) => {
    const [key, { postId }] = queryKey;
    return (await Client.post<PostData>(`http://localhost:8001/api/v1/posts/info`, { postId: postId })).data;
}

const nextImageExists = (length: number, index: number, decrease: boolean): boolean => {
    if (decrease) {
        if (index - 1 >= 0) {
            return true;
        }

        return false;
    }

    if (index + 1 < length) {
        return true;
    }

    return false;
}

const PostPage = (options: { postId: number }) => {
    const postId = options.postId;
    const [images, setImages] = useState<string[]>([]);
    const [imageIndex, setImageIndex] = useState<number>(0);

    const setNextImage = (decrease: boolean) => {
        if (data) {
            if (nextImageExists(data.Files.length, imageIndex, decrease)) {
                setImageIndex(imageIndex + (decrease ? -1 : 1));
            } 
        }
    }

    const onKeyDown = (event: any) => {
        if (['KeyD', 'ArrowRight'].includes(event.code) && nextImageExists(images.length, imageIndex, false)) {
            setNextImage(false);
        } 
        
        if (['KeyA', 'ArrowLeft'].includes(event.code) && nextImageExists(images.length, imageIndex, true)) {
            setNextImage(true);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown, {once: false});
    });

    const {isLoading, isError, data, error} = useQuery(['postDetails', { postId }], fetchPostDetails, {
        onSuccess: (data) => { setImages(data.Files.map((image) => { return image.filePath })) }
    });

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Error: {error}</p>
    }

    if (!data) {
        return <p>Loading...</p>
    }

	return (
        <>
            <div className="min-h-screen w-full flex flex-row">
                <div className="h-screen w-3/4 flex items-center justify-center flex-none min-w-max bg-gray-800">
                    <div className="w-3/4 h-screen grid grid-cols-2 absolute">
                        <div className="col-span-1 flex items-center justify-start ">
                        { 
                            nextImageExists(images.length, imageIndex, true) ? 
                                (<div className="ml-10 w-16 h-16 rounded-full bg-gray-900 opacity-60 items-center justify-center flex cursor-pointer" onClick={() => setNextImage(true)}>
                                    <h1 className="text-3xl text-white mb-1">{"<"}</h1> 
                                </div>)
                            : null 
                        }
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                        { 
                            nextImageExists(images.length, imageIndex, false) ? 
                                (<div className="mr-10 w-16 h-16 rounded-full bg-gray-900 opacity-60 items-center justify-center flex cursor-pointer" onClick={() => setNextImage(false)}>
                                    <h1 className="text-3xl text-white mb-1">{">"}</h1> 
                                </div>)
                            : null 
                        }
                        </div>
                    </div>
                    <img className="h-screen w-auto" src={images[imageIndex]} />
                </div>
                <div className="bg-white w-1/4 h-screen flex flex-col p-4" onKeyDownCapture={(event) => onKeyDown(event)}>
                    <div className="w-full">
                        <div className="flex flex-row space-x-4">
                            <div className="flex-none">
                                <img src={data.User.avatar} width="64" height="64" className="rounded-full bg-transparent float-left" />
                            </div>
                            <div className="flex flex-col">
                                <UserView name={data.User.username} custom={data.User.customname} bio={data.User.description} badge={data.User.ActiveBadge?.badgePath}></UserView>
                            </div>
                        </div>
                    </div>
                    <p className="pt-4 text-sm border-b border-gray-300 pb-4 mb-9 px-4">{data.description}</p>
                    <div className="w-full flex flex-col">
                        {data.Comments.map((comment, index) => { return <CommentView key={index} comment={comment.comment} createdAt={comment.createdAt} User={comment.User}></CommentView> })}
                    </div>
                </div>
            </div>
        </>
	)
}

export async function getServerSideProps(ctx: NextRouter) {
    const { postId } = ctx.query;
    return {
      props: {
        postId,
      },
    };
  }

export default PostPage;

