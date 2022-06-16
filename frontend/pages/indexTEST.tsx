import { useEffect, useState } from 'react';
import { useLogout } from '../hooks/useLogout';

import Postview from '../components/postview';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import PostCreate from '../components/postcreate'
import { useUserContext } from '../context/user.context';

import { useRouter } from 'next/router';

export default function Home() {
	const logoutmutation = useLogout();
	const router = useRouter();
	useEffect(() => {
		document.title = 'Kuromi';
	}, []);

	const { user } = useUserContext();

	const newUser = {
		"name": "Jannik",
	}

	const Test = () => {
		localStorage.setItem('user', JSON.stringify(newUser));
	}

	const logout = () => {
		logoutmutation.mutate({}, {
			onSuccess: () => { /* Set userdata */},
			onError: () => {console.log("Logout Failed");}
	  	});
	}

	return(
		<div>
			<button onClick={logout}>Logout</button>
			<button onClick={() => Test()}>Test</button>
			<Header />
			<div className='grid'>
				<p>XD</p>
				<p>{JSON.stringify(user)}</p>
				<b onClick={() => router.push('/login')}>Sign up</b>
			</div>
			<PostCreate />
		</div>
	);
}