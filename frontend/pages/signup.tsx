import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useUsernameCheck } from '../hooks/useUsernameCheck';

const Signup: React.FC = () => {
    const router = useRouter();
    const signupMutation = useSignup();
    const usernameCheckMutation = useUsernameCheck();

    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [userExists, setUserExists] = useState(false);

    const isInvalid = password === '' || emailAddress === '' || username === '' || userExists;

    useEffect(() => {
        document.title = 'Sign Up - Kuromi';
    }, []);

    useEffect(() => {
        if (signupMutation.isError) {
            setUsername('');
            setEmailAddress('');
            setPassword('');
        }
    });

    // Checks if the username exists in our database
    const checkUsernameExists = () => {
        usernameCheckMutation.mutate(username, {
              onSuccess: (data) => {setUserExists(data.data.exists)}
        });
    }

    const handleSignUp = async (event: any) => {
        event.preventDefault();
        signupMutation.mutate({
                username: username,
                password: password,
                email: emailAddress,
                description: '',
                avatar: ''
            }, {
                onSuccess: () => { handlesignupSuccessful() },
                onError: (data) => { console.log(data) },
            });
    }

    const handlesignupSuccessful = () => {
        setTimeout(() => { router.push('/login') }, 1000)
    }

    return (
        <div className="min-h-full max-w-full mx-auto grid grid-cols-12">
            <div className="col-span-2 h-screen"></div>
            <div className="col-span-8 h-screen text-center">
                <div className="flex h-screen">
                    <div className="m-auto space-y-8">
                        <h1 className="font-sans text-whitetext-gray-900 font-bold text-xl subpixel-antialiased">Sign Up</h1>
                        <div className="form">
                            {userExists ? (
                                <h1 className="text-red-500">Username vergeben</h1>
                            ) : null}
                            {signupMutation.isSuccess ? (
                                <h1 className="text-green-500">Signup successful</h1>
                            ) : null}
                            {signupMutation.isLoading && <p>Signing up...</p>}
                            <div className="form">
                                <form method="POST" className="space-y-12">
                                    <div className="space-y-4">
                                        <input
                                            disabled={signupMutation.isLoading}
                                            aria-label="Enter your username"
                                            type="text"
                                            placeholder="Username"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            onChange={({ target }) => setUsername(target.value)}
                                            onBlur={() => checkUsernameExists()}
                                            value={username}
                                        />
                                        <input
                                            disabled={signupMutation.isLoading}
                                            aria-label="Enter your email address"
                                            type="text"
                                            placeholder="Email address"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            onChange={({ target }) => setEmailAddress(target.value)}
                                            value={emailAddress}
                                        />
                                        <input
                                            disabled={signupMutation.isLoading}
                                            aria-label="Enter your password"
                                            type="password"
                                            placeholder="Password"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            onChange={({ target }) => setPassword(target.value)}
                                            value={password}
                                        />
                                        <button
                                            disabled={isInvalid}
                                            type="submit"
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-10 border border-blue-500 hover:border-transparent rounded"
                                            onClick={(event: any) => handleSignUp(event)}
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <p className="text-xs py-6">Already have an account?{' '}<b onClick={() => router.push('/login')}>Login</b></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-span-2 h-screen"></div>
        </div>
    );
}

export default Signup;

