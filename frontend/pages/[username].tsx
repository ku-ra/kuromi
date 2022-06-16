import Sidebar from '../components/sidebar'
import Header from '../components/header';

import ProfileView from '../components/profileView'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserPage = () => {
    const router = useRouter();

    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        if (router.isReady) {
            const { username } = router.query;
            if (!username) return;
            setUsername(username as string);
        }
    }, [router.isReady])


	return (
        <>
            <Header></Header>
            <div className="min-h-full max-w-full mx-auto grid grid-cols-12">
                <div className="col-span-2 h-screen hidden md:block"></div>
                <div className="col-span-3 h-screen mt-14 hidden md:block">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-span-4 h-screen text-center mt-14">
                    <div className="flex h-screen">
                        <div className="min-h-full min-w-full">
                            <ProfileView username={username}></ProfileView>                    
                        </div>
                    </div>
                </div>
                <div className="col-span-3 h-screen"></div>
            </div>
        </>
	);
};

export default UserPage;