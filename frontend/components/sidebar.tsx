import HomeIcon from '../static/icons/fi-rr-home.svg'
import HeartIcon from '../static/icons/fi-rr-heart.svg'
import AppsIcon from '../static/icons/fi-rr-apps.svg'

import LoginButton from '../components/loginButton'
import LogoutButton from '../components/logoutButton'

import { isAuthenticated } from '../context/user.context';

const Sidebar = () => {    
    return (
        <div className="h-screen flex flex-col p-8 divide-y divide-gray-800 divide-opacity-90 fixed w-3/12">
            <div className="min-w-full flex flex-col pb-8 px-4">
                <ul className="space-y-5">
                    <li>
                        <a href="/" className="flex flex-row justify-start items-center space-x-5">
                            <HomeIcon className="h-7 flex-none"></HomeIcon>
                            <p className="font-bold text-base">Home</p>
                        </a>
                    </li>
                    <li>
                        <a href="trending" className="flex flex-row justify-start items-center space-x-5">
                            <HeartIcon className="h-7 flex-none"></HeartIcon>
                            <p className="font-bold text-base">Trending</p>
                        </a>
                    </li>
                    <li>
                        <a href="discover" className="flex flex-row justify-start items-center space-x-5">
                            <AppsIcon className="h-7 flex-none"></AppsIcon>
                            <p className="font-bold text-base">Discover</p>
                        </a>
                    </li>
                    
                </ul>
            </div>
            <div className="min-w-full flex flex-col py-8 px-4 h-full space-y-12">
                <div className="p-4 bg-gray-100 h-5/6"></div>
                { isAuthenticated() ? <LogoutButton/> : <LoginButton/> }
            </div>
        </div>
    )
};

export default Sidebar;