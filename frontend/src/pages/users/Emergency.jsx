import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/infosys-main.png';
import Arrow from '../../assets/icons/right-arrow.png';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import EmergencyTable from '../../components/EmergencyTable';
const Emergency = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/dashboard/user' },
        { name: 'About', path: '/user/about' },
        { name: 'Resources', path: '/user/resources' },
        { name: 'Self Assessment', path: '/user/assessment' },
        { name: 'Emergency', path: '/user/emergency' },
    ];
    const handleLogout = () => {
        Cookies.remove('role');
        Cookies.remove('session');
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    return (
        <div className='main'>
            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 fade-in sticky bg-[#b7fdd3] top-0 z-50">
                <img src={Logo} alt="Logo" className="w-[7%]" />
                <ul className="flex items-center gap-5 bg-[#8abe9f] px-10 text-white p-3 rounded-full">
                    {navItems.map((item, index) => (
                        <Link to={item.path} key={index}>
                            <li
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''
                                    }`}
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="flex items-center gap-5">
                    <button className="flex items-center gap-3 border border-[#779F87] p-3 rounded-full text-[#6a8f79] hover:bg-[#779F87] hover:text-white transition-all duration-300">
                        <span>Professional</span>
                        <img src={Arrow} alt="Arrow" className="w-4" />
                    </button>
                    <button
                        className="p-2 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Emergency Contacts */}
            <section className="">
                <EmergencyTable/>
            </section>

            <Footer />
        </div>
    )
}

export default Emergency
