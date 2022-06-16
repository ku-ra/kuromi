const Avatar = (options: {avatar: string}) => {
    return (
        <div className="flex-none">
            <img src={options.avatar} width="64" height="64" className="rounded-full bg-transparent float-left" />
        </div>
    );
}

export default Avatar;