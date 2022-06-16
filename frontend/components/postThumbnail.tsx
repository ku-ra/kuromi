import Link from 'next/link'

export type PostThumbnailData = {
    postId: number,
    Files: FileData[]
}

type FileData = {
    fileType: string,
    filePath: string,
    thumbnailPath: string,
    createdAt: Date,
}

const PostThumbnail = ({postId, Files}: PostThumbnailData) => {
    return (
        <>
        { 
            Files[0] ? (
                <div className="bg-transparent cursor-pointer">
                    <Link href={`/post/${postId}`}>
                        <img src={Files[0].thumbnailPath}></img>
                    </Link>
                </div>
            ) : null 
        }
        </>
    )
}

export default PostThumbnail;