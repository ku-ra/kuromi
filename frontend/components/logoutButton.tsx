import { useContext } from 'react';
import { useLogout } from '../hooks/useLogout';
import { handleLogout } from '../hooks/useQueryErrorHandling';
import { UserContext } from '../context/user.context';

const LogoutButton = () => {
    const logoutmutation = useLogout();

    const { setUser } = useContext(UserContext);

    const logout = () => {
		logoutmutation.mutate({}, {
			onSuccess: () => { setUser(""); handleLogout();},
			onError: (data) => {handleLogoutError(data);}
	  	});
	}

    const handleLogoutError = (error: any) => {
        console.log(error)
        let statuscode = error.response.status;
        if(statuscode == 403){
            handleLogout();
        }
    }

    return (
        <button className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded"
            onClick={() => logout()}>
            Sign out
        </button>
    );
}

export default LogoutButton;