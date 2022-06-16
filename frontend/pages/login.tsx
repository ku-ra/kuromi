import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useLogin } from '../hooks/useLogin';
import { UserContext } from '../context/user.context';

const Login: React.FC = () => {
      const router = useRouter();
      const mutation = useLogin();

      const { user, loggedIn, setUser } = useContext(UserContext);

      const [username , setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [loginError, setLoginError] = useState(false);

      useEffect(() => {
            document.title = 'Login - Kuromi';
      }, []);

      // This takes some time to load but its the best I could to considering UserContext takes its time, future fix pls
      useEffect(() => {
            if(loggedIn()){
                  router.push('/');
            }
      }, [user])

      useEffect(() => {
            if (mutation.isError) {
                setUsername('');
                setPassword('');
            }
      });

      const onSubmit = async (event: any) => {
            event.preventDefault();
            mutation.mutate({username: username, password: password}, {
                        onSuccess: () => { handleLoginSuccessful() },
                        onError: (data) => { handleLoginError(data) },
            });  
      }

      const handleLoginError = (error: any) => {
            console.log(error);
            let statuscode = error.response.status;
            if(statuscode == 401){ //Account doesnt exist / wrong pw
                  setLoginError(true);
            }
      }

      const handleLoginSuccessful = () => {
            setUser(username);
            setTimeout(() => { router.push('/') }, 1000)
      }

      return (
            <div className="min-h-full max-w-full mx-auto grid grid-cols-12">
                  <div className="col-span-2 h-screen"></div>
                  <div className="col-span-8 h-screen text-center">
                        <div className="flex h-screen">
                              <div className="m-auto space-y-8">
                                    <h1 className="font-sans text-whitetext-gray-900 font-bold text-xl subpixel-antialiased">Login</h1>
                                    <div className="form">
                                          <div className="pb-6">
                                                {mutation.isLoading && <h1>Logging in...</h1>}

                                                {mutation.isSuccess ? (
                                                            <h1 className="text-green-500">Login successful</h1>
                                                ) : null}

                                                {mutation.isError || loginError ? (
                                                            <h1 className="text-red-500">Error when logging in</h1>         
                                                ) : null}
                                          </div>      
                                          <div className="form">
                                                <form method="POST" onSubmit={onSubmit} className="space-y-12">
                                                      <div className="space-y-4">
                                                            <input
                                                                  disabled={mutation.isLoading}
                                                                  onChange={({ target }) => setUsername(target.value)}
                                                                  value={username}
                                                                  aria-label="Enter your username"
                                                                  type="text"
                                                                  placeholder="Username"
                                                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                            />
                                                            <input
                                                                  disabled={mutation.isLoading}
                                                                  onChange={({ target }) => setPassword(target.value)}
                                                                  value={password}
                                                                  aria-label="Enter your password"
                                                                  type="password"
                                                                  placeholder="Password"
                                                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                            />
                                                            <button
                                                                  disabled={mutation.isLoading}
                                                                  type="submit"
                                                                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-10 border border-blue-500 hover:border-transparent rounded"
                                                            >
                                                                  Log In
                                                            </button>
                                                      </div>
                                                </form>
                                          </div>
                                          <div>
                                                <p className="text-xs py-6">Don't have an account?{' '}<b onClick={() => router.push('/signup')}>Sign up</b></p>
                                          </div>
                                    </div>
                              </div>
                              <div className="col-span-2 h-screen"></div>
                        </div>
                  </div>
            </div>
      )
}

export default Login;