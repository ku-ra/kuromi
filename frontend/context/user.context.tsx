import { createContext, useContext, useState, useEffect } from 'react';

type UserData = {
	user: string
	setUser: (user: string) => void
	loggedIn : () => boolean
}

export const UserContext = createContext<UserData>({user: "", setUser: () => {}, loggedIn: () => {}});

export function UserContextProvider({children}: any): any {
	const [user, setUser] = useState<string>("");

	useEffect(() => {
		const data = localStorage.getItem('user');
		if (data) {
			setUser(JSON.parse(data));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user])

	const loggedIn = () => {
		return !!user;
	}

	return(
		<UserContext.Provider
			value={{user, setUser, loggedIn}}
		>
			{children}
		</UserContext.Provider>
	);
}

export function useUserContext() {
	return useContext(UserContext);
}

export function isAuthenticated() {
	return !!useUserContext().user;
}