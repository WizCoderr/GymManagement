import React from 'react' 
import Login from '../../components/Login/login'
import Signup from '../../components/Signup/signup'
import Sidebar from '../../components/Sidebar/sidebar'
const Home = () => {
    return (
        <div className='w-full h-[100vh]'>
            <div className='border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl'>
                Welcome to Fit Track Pro
            </div>
            <div className='w-full bg-cover flex justify-center h-[100%] bg-[url("https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]'>
                <div className='w-full lg:flex gap-32'>


                <Login />
                <Signup/>
                

            



                </div>
            </div>

        </div>
    )

}

export default Home