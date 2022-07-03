import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'

const User = () => {
    const authContext = useContext(AuthContext)
    const { logout, user } = authContext

    return (
        <section id='features' className="bg-[#ecffff] h-screen">
            <div className='flex flex-row justify-end px-6 md:px-20 py-6'>
                <Link to='#' onClick={logout} className='text-2xl text-[#777] border-b-4 border-b-transparent hover:border-b-[#333] hover:text-[#333] pb-1 transition duration-300'>Logout</Link>
            </div>
            <div className='max-w-4xl px-5 mx-auto text-center'>
                <div className='flex flex-col items-center md:flex-row shadow-lg bg-white p-12 md:space-x-6'>
                    <div className=''>
                        <img src={user.imageUrl || logo} alt='avatar' className='rounded-full w-36' />
                    </div>
                    <div className='flex flex-col w-2/3 items-center md:items-start justify-center md:space-y-3'>
                        <div className='px-4'>
                            <p className='text-2xl'>{user.fullName}</p>
                        </div>
                        <div className='w-full'>
                            <hr className='border-b-4 rounded-full h-0 border-b-[#999]' />
                        </div>
                        <div className='px-4'>
                            <p className='text-[#666]'><span className='text-[#333] font-bold text-lg'>Email: </span>{user.email}</p>
                        </div>
                        <div className='px-4'>
                            <p className='text-[#666]'><span className='text-[#333] font-bold text-lg'>Provider:</span> {user.provider}</p>
                        </div>
                        <div className='px-4'>
                            <p className='text-[#666] text-justify'>This is a demo application. If you see this page that means you created an account here. 
                                Don't worry because everything will be deleted within 10 mins as we wipe out everything in the DB every 10 minutes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default User