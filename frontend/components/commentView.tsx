import Avatar from './avatar'

type CommentData = {
    comment: string,
    createdAt: Date,
    User: UserData,
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

const CommentView = ({comment, createdAt, User}: CommentData) => {
          return (
            <>
                <div className="w-full flex flex-row space-x-4 items-start">
                    <Avatar avatar={User.avatar}></Avatar>
                    <div className="flex flex-col">
                        <div className="flex flex-row space-x-2 items-center align-center">
                            <a href={`/${User.username}`} className="font-bold">{User.customname ? User.customname : User.username}</a>
                            {User.ActiveBadge ? <img className="h-6 border-none flex-none" src={User.ActiveBadge.badgePath}/> : null}
                            <p className="text-xs">@{User.username}</p>
                            <p>-</p>
                            <p className="font-light text-xs text-gray-700">{new Date(Date.now().valueOf() - new Date(createdAt).valueOf()).getDay()} Days ago</p>
                        </div>
                        <p className="font-light text-sm">{comment}</p>
                    </div>
                </div>
                
            </>
          );
    }

export default CommentView;