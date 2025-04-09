import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendar, FaUser,FaInfo, FaBell, FaCog, FaSignOutAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { BsCalendar2Date, BsPerson, BsBell, BsGear, BsNewspaper } from 'react-icons/bs';
import { GiMedicines } from 'react-icons/gi';
// import './sidenav.css';

const SideNavbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('isSubscribed');
        localStorage.removeItem('fertilityNews');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
                {/* <button className="toggle-btn" onClick={toggleSidebar}>
                    {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </button> */}
            <div className="sidenav-header">
                {isOpen && (
                    <div style={{ textAlign: 'center' }}>
                        <img 
                            src="/reshu.png" 
                            alt="Umbracare Logo" 
                            style={{ height: '100px', marginBottom: '5px' }} 
                        />
                        {/* <h3>Umbracare</h3> */}
                    </div>
                )}
            </div>
            <div className="sidenav-menu">
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                    <MdOutlineDashboard />
                    {isOpen && <span>Dashboard</span>}
                </Link>
                <Link to="/pregnancy-postpartum-tracker" className={location.pathname === '/pregnancy-postpartum-tracker' ? 'active' : ''}>
                    <BsCalendar2Date />
                    {isOpen && <span>Pregnancy Tracker</span>}
                </Link>
                <Link to="/period-tracker" className={location.pathname === '/period-tracker' ? 'active' : ''}>
                    <BsCalendar2Date />
                    {isOpen && <span>Period Tracker</span>}
                </Link>
                <Link to="/ivf-tracker" className={location.pathname === '/ivf-tracker' ? 'active' : ''}>
                    <BsCalendar2Date />
                    {isOpen && <span>IVF Tracker</span>}
                </Link>
                <Link to="/newsletter" className={location.pathname === '/newsletter' ? 'active' : ''}>
                    <BsNewspaper />
                    {isOpen && <span>Newsletter</span>}
                </Link>
                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                    <BsPerson />
                    {isOpen && <span>Profile</span>}
                </Link>
                <Link to="/notifications" className={location.pathname === '/notifications' ? 'active' : ''}>
                    <BsBell />
                    {isOpen && <span>Notifications</span>}
                </Link>
                <Link to="/doctor-info" className={location.pathname === '/doctor-info' ? 'active' : ''}>
                    <FaUser />
                    {isOpen && <span>Doctor Info</span>}
                </Link>

                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                    <FaInfo />
                    {isOpen && <span>About Us</span>}
                </Link>

                <button onClick={handleLogout} className="logout-link">
                    <FaSignOutAlt />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
            <style jsx>{`
                .sidenav {
                    height: 100vh;
                    background-color: #b15870;
                    transition: width 0.3s ease;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 1000;
                }

                .sidenav.open {
                    width: 250px;
                }

                .sidenav.closed {
                    width: 70px;
                }

                .sidenav-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 15px;
                    border-bottom: 1px solid #e9ecef;
                }

                .sidenav-header h1 {
                    margin: 0;
                    font-size: 1.5rem;
                    color: #ff69b4;
                }

                .toggle-btn {
                    background: none;
                    border: none;
                    color: #ff69b4;
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .sidenav-menu {
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                    overflow-y: auto;
                    flex-grow: 1;
                }

                .sidenav-menu a, .sidenav-menu button {
                    display: flex;
                    align-items: center;
                    padding: 12px 15px;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-bottom: 5px;
                    transition: all 0.2s ease;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    font-size: 1rem;
                }

                .sidenav-menu a:hover, .sidenav-menu button:hover {
                    background-color: #ff69b4;
                    color: #fff;
                }

                .sidenav-menu a.active {
                    background-color: #ff69b4;
                    color: #fff;
                    font-weight: bold;
                }

                .sidenav-menu a svg, .sidenav-menu button svg {
                    font-size: 1.2rem;
                    min-width: 24px;
                }

                .sidenav-menu a span, .sidenav-menu button span {
                    margin-left: 10px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .logout-link {
                    margin-top: auto;
                    border-top: 1px solid #e9ecef;
                    padding-top: 10px;
                    color: #dc3545 !important;
                }

                .logout-link:hover {
                    background-color: #ffe6e6 !important;
                }
            `}</style>
        </div>
    );
};

export default SideNavbar;
