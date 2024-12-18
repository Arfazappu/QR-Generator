import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BASE_URL } from '../../config'
import Loader from '../components/commonComponent/Loader'
import { useSnackbar } from 'notistack'

export default function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login, authToken } = useAuth();

  const {enqueueSnackbar} = useSnackbar()

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(confirmPassword !== password){
      alert('Password is not matching.')
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/register`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({name, email, password})
      })

      if(!response.ok){
        throw new Error(`Response status : ${response.status}`)
      }

      const result = await response.json();

      const token = result?.content?.accessToken;

      // console.log(result);
      setName('')
      setPassword('')
      setConfirmPassword('')
      setEmail('');

      enqueueSnackbar('Successfully registered.', { variant: 'success' });

      login(token);
      navigate("/");

    } catch (error) {
      console.error('Error:', error);
      // alert('Error registering, Please try again.')
      enqueueSnackbar('Error registering, Please try again.', { variant: 'error'});
      
    } finally{
      setIsLoading(false);
    }
  }

  if(authToken) navigate('/'); // navigate to home if already logged in

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#42B2A4] focus:border-[#42B2A4] focus:z-10 sm:text-sm"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#42B2A4] focus:border-[#42B2A4] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#42B2A4] focus:border-[#42B2A4] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#42B2A4] focus:border-[#42B2A4] focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#42B2A4] hover:bg-[#3ba094] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3ba094]"
              disabled={isLoading}
            >
              {isLoading ? (<div className="flex gap-3">Sign up <Loader /></div>) : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p>
            Already have an account?{' '}
            <Link to='/login' onClick={(e) => isLoading && e.preventDefault()} className="font-medium text-[#42B2A4] hover:text-[#3ba094]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}