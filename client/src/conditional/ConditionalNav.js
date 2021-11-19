import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';


const ConditionalNav = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 768;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [])

    return width < breakpoint ? <MobileNav /> : <Navbar />
}

export default ConditionalNav;