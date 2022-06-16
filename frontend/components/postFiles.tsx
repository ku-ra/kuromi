import Link from 'next/link'

type PostFileData = {
      postId: number,
      main: string,
      type: string,
      description: string,
      thumbs: string[]
}


const PostFiles = ({postId, main, type, description, thumbs}: PostFileData) => {
      return ( 
            <>
                  <p className="break-all text-xs pt-2">{description}</p>
                  <div className="flex flex-row justify-center py-2 space-x-5">
                        <Link href={`/post/${postId}`}>
                              { type == 'video' ? Video(main) 
                                    : type == 'image' ? Image(main) 
                                    : "" }
                        </Link>
                        <div className="space-y-4">
                              {thumbs.slice(1).map((path, index) => {
                                    return Thumbnail(path, index) 
                              })}
                        </div>
                  </div>
            </>
      );
}

const Image = (src: string) => {
      return <img width="354" height="630" src={src} className="bg-white rounded-md cursor-pointer" />
}

const Video = (src: string) => {
      return <video width="354" height="630" src={src} className="bg-white rounded-md cursor-pointer" />
}

const Thumbnail = (src: string, key: number) => {
      return <img key={key} width="80" height="142" src={src} className="bg-white rounded-md" />
}

export default PostFiles;