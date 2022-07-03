import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import GoogleLogo from '../../google'
import FacebookLogo from '../../facebook'
import EmailLogo from '../../email'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../utils/urlHelpers'
import AuthContext from '../../context/auth/authContext'
import logoReact from '../../logo.svg'
import logoSpring from '../../spring-3.svg'



const Home = () => {
    const authContext = useContext(AuthContext);
    const { submitLogin, checkServerStatus, checkingServer, serverStatus, isAuthenticated } = authContext

    useEffect(() => {
        checkServerStatus()
        //eslint-disable-next-line
    }, [])
    const [login, setLogin] = useState({
        emailLogin: false,
        email: '',
        password: ''
    })
    const { emailLogin, email, password } = login
    const toggleEmailLogin = () => {
        setLogin({ ...login, emailLogin: !emailLogin ? true : false })
    }
    const onChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const submitLoginForm = (e) => {
        e.preventDefault();
        if (serverStatus) {
            submitLogin(email, password)
        }
    }
    if (isAuthenticated) {

        return <Navigate to='/user' />;
    } else {
        return (
            <section id='features' className="flex flex-col h-screen bg-[#ecffff]">
                <div className='max-w-6xl px-5 mx-auto mt-20 text-center'>
                    <div className='inline-block mb-12 max-w-md text-justify text-sm md:text-base'>
                        <p><span className='font-bold'>Brief: </span>This is the demo of the react-spring auth example.
                            I activated Google credentials to demonstrate Google OAuth2 Login. Facebook Login can also be activated simply by creating an app in
                            Facebook Dev console and placing the credentials inside of the code</p>
                        <p><span className='font-bold'>Note: </span>This app is deployed to the Free Dynos of Heroku, That means it turns itself Off
                            within 30 mins of inactivity. You'll need to wait the server status light turn to green in order to test the application and it can take like 12 - 20 seconds</p>
                    </div>
                    <div className='flex flex-col py-6 shadow-xl space-y-6 bg-white relative text-sm md:text-base'>
                        {!emailLogin ? (
                            <Fragment>
                                <div className='px-6 md:px-12'>
                                    <a href={serverStatus ? GOOGLE_AUTH_URL : "#"} className='flex flex-row border border-[#80808080] py-2 rounded-lg shadow-sm
                        hover:bg-[#ea4335] hover:text-white hover:shadow-lg transition duration-300 space-x-12 px-6 text-start' >
                                        <GoogleLogo className="w-1/3" />
                                        <span className='w-2/3'> Login With Google</span>
                                    </a>
                                </div>
                                <div className='px-6 md:px-12'>
                                    <a href={serverStatus ? FACEBOOK_AUTH_URL : "#"} className='flex flex-row border border-[#80808080] py-2 rounded-lg shadow-sm
                        hover:bg-[#1877f2] hover:text-white hover:shadow-lg transition duration-300  space-x-12 px-6 text-start' >
                                        <FacebookLogo className="w-1/3" />
                                        <span className='w-2/3'> Login With Facebook</span>
                                    </a>
                                </div>
                                <div className='px-6 md:px-12'>
                                    <Link to='#' onClick={toggleEmailLogin} className='flex flex-row border border-[#80808080] py-2 rounded-lg shadow-sm
                        hover:bg-[#555] hover:text-white hover:shadow-lg transition duration-300 space-x-12 px-6 text-start' >
                                        <EmailLogo className="w-1/3" />
                                        <span className='w-2/3'> Login With Email</span>
                                    </Link>
                                </div>
                            </Fragment>

                        ) : (
                            <Fragment>
                                <div onClick={toggleEmailLogin} className='absolute right-10 top-6 cursor-pointer block'>
                                    <hr className='w-6 border-b-2 border-darkGrayishBlue  -rotate-45 absolute' />
                                    <hr className='w-6 border-b-2 border-darkGrayishBlue  rotate-45 absolute' />
                                </div>
                                <form className='flex flex-col space-y-6'>
                                    <div className='px-12'>
                                        <input className='bg-darkerLightGray w-full rounded-lg py-2 focus:outline-none indent-6 border-b-2 border-b-transparent focus:border-b-darkGrayishBlue'
                                            type="text" placeholder='Email' name='email' value={email} onChange={onChange} />
                                    </div>
                                    <div className='px-12'>
                                        <input className='bg-darkerLightGray w-full rounded-lg py-2 focus:outline-none indent-6 border-b-2 border-b-transparent focus:border-b-darkGrayishBlue'
                                            type="password" placeholder='Password' name='password' value={password} onChange={onChange} />
                                    </div>
                                    <div className='px-12'>
                                        <Link to='#' onClick={(e) => submitLoginForm(e)} className='flex flex-row border border-[#80808080] py-2 rounded-lg shadow-sm
                        hover:bg-[#555] hover:text-white hover:shadow-lg transition duration-300 space-x-12 px-6 text-start' >
                                            <EmailLogo className="w-1/3" />
                                            <span className='w-2/3'> Login With Email</span>
                                        </Link>
                                    </div>
                                </form>
                            </Fragment>
                        )}
                        <div className='flex flex-row justify-end px-12'>

                            {
                                checkingServer ? (
                                    <p className='relative pr-6 mr-6'>Checking Server Status, Please Wait
                                        <span className='absolute animate-ping -right-6 bg-yellow-400 w-6 h-6 inline-block align-middle rounded-full'></span>
                                        <span className='absolute -right-6 bg-yellow-400 w-6 h-6 inline-block align-middle rounded-full'></span>
                                    </p>
                                ) : serverStatus ? (

                                    <p className='relative pr-6 mr-6'>Server Status Ready
                                        <span className='absolute animate-ping -right-6 bg-green-500 w-6 h-6 inline-block align-middle rounded-full'></span>
                                        <span className='absolute -right-6 bg-green-500 w-6 h-6 inline-block align-middle rounded-full'></span>
                                    </p>
                                ) : (

                                    <p className='relative pr-6 mr-6'>Server Status Fail
                                        <span className='absolute animate-ping -right-6 bg-red-500 w-6 h-6 inline-block align-middle rounded-full'></span>
                                        <span className='absolute -right-6 bg-red-500 w-6 h-6 inline-block align-middle rounded-full'></span>
                                    </p>
                                )
                            }


                        </div>
                    </div>
                    <div className='flex flex-row mt-6'>
                        <div className='p-4'>
                            <img src={logoReact} alt='react-logo' className='rounded-full h-36' />
                        </div>
                        <div className='p-4'>
                            <img src={logoSpring} alt='react-logo' className='rounded-full w-36 h-36' />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}



export default Home