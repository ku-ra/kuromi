type UserData = {
      name: string,
      custom: string,
      bio: string,
      badge: BadgeData,
}

type BadgeData = {
      badgePath: string,
}

const UserView = ({name, custom, bio, badge}: UserData) => {
            console.log(badge)
            return (
                  <>
                        <div className="flex flex-row space-x-2 items-center align-center">
                            <a href={`/${name}`} className="font-bold text-gray-900">{custom ? custom : name}</a>
                            {badge ? <img className="h-6 border-none flex-none" src={badge.badghePath}/> : null}
                            <p className="text-xs text-gray-900">@{name}</p>
                        </div>
                        <p className="break-all text-sm text-gray-700">{bio}</p>
                  </>
            );
      }

export default UserView;