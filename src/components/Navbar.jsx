import React from 'react';

const Navbar = () => {
    return (
        <nav className='h-[60px] bg-white my-4 rounded-lg flex justify-center items-center gap-4' > 
            <img src="logos_firebase.svg" alt="" />
            <h2 className='text-2xl '>Firebase Contact App</h2>
        </nav>
    );
}

export default Navbar;
