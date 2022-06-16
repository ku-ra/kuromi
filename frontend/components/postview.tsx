import UserView from './userView'
import PostFiles from './postFiles'
import Avatar from './avatar'

export type FetchData = {
      postId: number,
      type: string,
      description: string,
      createdAt: Date,
      Files: FileData[],
      User: UserData,
}

type FileData = {
      fileType: string,
      filePath: string,
      createdAt: Date,
}

type UserData = {
      userId: number,
      username: string,
      customname: string,
      avatar: string,
      description: string,
      ActiveBadge: BadgeData
}

type BadgeData = {
      badgePath: string,
}

const PostView = ({postId, type, description, createdAt, Files, User}: FetchData) => {
      return ( 
            <div className="min-w-max w-full flex flex-row justify-start p-8 space-x-5 overflow-hidden border-b border-gray-100">
                  <Avatar avatar={User.avatar}></Avatar>
                  <div className="flex flex-col items-start">
                        <UserView name={User.username} custom={User.customname} bio={User.description} badge={User.ActiveBadge}></UserView>
                        <PostFiles main={Files[0].filePath} postId={postId} type={type} description={description} thumbs={Files.map((file) => {return file.filePath})}></PostFiles>
                  </div>
            </div>
      );
}


export default PostView;