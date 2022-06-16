import Router from 'next/router';

export const handleLogout = () => {
    localStorage.removeItem('user');
    Router.push('/login');
}

export const queryErrorHandler = (error: any) => {
    let code = error.response.status;

    if(code == 403){
        //Resource is forbidden, redirect to login and reset localStorageUser
        handleLogout();
    }else{
        console.log(error);
    }
}