import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/infosys-main.png';
import { Link } from 'react-router-dom';
import DisplayAppointments from '../../components/DisplayAppointments';

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const Appoinment = () => {
    const navItems = [
        { name: 'Home', path: '/dashboard/professional' },
        { name: 'Resources', path: '/professional/resources' },
        { name: 'Appoinments', path: '/professional/appointments' },
        { name: 'Sessions', path: '/professional/sessions' }
    ];
    const handleLogout = () => {
        // Clear the session storage
        sessionStorage.clear();
        navigate('/login');
        window.location.reload();
      };
    return (
        <motion.div
            className="main"
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
        >
            {/* Navbar Section */}
            <nav className="flex justify-between items-center px-24 sticky bg-[#b7fdd3] top-0 z-50">
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
                    <button
                        className="p-2 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Appoinment Display Section */}
            <DisplayAppointments/>

        </motion.div>
    )
}

export default Appoinment
