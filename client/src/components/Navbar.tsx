"use client"
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'next/image'
import Sidebar from "./Sidebar";
import { MdOutlineManageSearch } from "react-icons/md";
import { RiMenu5Fill } from "react-icons/ri";
import useProfile from "./useProfile";
import { useAuthContext } from "./AppContext";
import axiosInstance from "../axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchIsOpen, setSearchIsOpen] = useState(false)
    const { UserData: userData, isLoading } = useProfile();
    const { accessToken, setAccessToken, setUser } = useAuthContext()
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    function toggleSidebar() {
        setIsOpen(!isOpen)
        if (!isOpen) {
            document.body.classList.add('toggle-sidebar');
        } else {
            document.body.classList.remove('toggle-sidebar');
        }
    }

    function toggleSearchBar() {
        setSearchIsOpen(!searchIsOpen)
        if (typeof window !== 'undefined' && document !== null) {
            const searchBar = document.querySelector('.search-bar');
            if (searchBar) {
                searchBar.classList.toggle('search-bar-show');
            }
        }
    }

    const handleSignOut = async () => {
        try {
            const res = await axiosInstance.post('api/auth/logout', {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setAccessToken(null)
            setUser({})
            router.push('/login')
        } catch (error: any) {
            console.log(error?.message)
        }
    }
    console.log(!accessToken && !userData && !isLoading)

    return (
        <div className="md:px-12">
            <header id="header" className="header md:pl-8 md:px-24 fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center mx-12 justify-content-between">
                    <RiMenu5Fill className="ml-4 toggle-sidebar-btn d-lg-none" onClick={toggleSidebar} />
                    <div className="d-flex align-items-center">
                        <Link href="/" className="text-black merriweather-bold decoration-white text-3xl">
                            Bargane <span className="text-purple-700">Hub</span>
                        </Link>
                    </div>

                </div>



                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item d-block d-lg-none">
                            <span className="nav-link nav-icon search-bar-toggle">
                                <MdOutlineManageSearch id="search" onClick={toggleSearchBar} />
                            </span>
                        </li>

                        <li className="nav-item dropdown">
                            <span className="nav-link nav-icon" data-bs-toggle="dropdown">
                                <Image
                                    src="/assets/notification.svg"
                                    alt="Notification"
                                    width={24}
                                    height={24}
                                />
                                <span className="badge bg-primary badge-number">4</span>
                            </span>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                <li className="dropdown-header">
                                    You have 4 new notifications
                                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-exclamation-circle text-warning"></i>
                                    <div>
                                        <h4>Lorem Ipsum</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>30 min. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-x-circle text-danger"></i>
                                    <div>
                                        <h4>Atque rerum nesciunt</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>1 hr. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-check-circle text-success"></i>
                                    <div>
                                        <h4>Sit rerum fuga</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>2 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-info-circle text-primary"></i>
                                    <div>
                                        <h4>Dicta reprehenderit</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>4 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="dropdown-footer">
                                    <a href="#">Show all notifications</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link nav-icon" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Image
                                    src="/assets/cart.svg"
                                    alt="Add Image"
                                    width={24}
                                    height={24}
                                />
                                <span className="badge bg-success badge-number">3</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                <li className="dropdown-header">
                                    You have 3 new messages
                                    <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>Maria Hudson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>4 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>Anna Nelson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>6 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="message-item">
                                    <a href="#">
                                        <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle" />
                                        <div>
                                            <h4>David Muldon</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>8 hrs. ago</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="dropdown-footer">
                                    <a href="#">Show all messages</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown pe-3">
                            {accessToken && userData && (
                                <span className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                                    <img src="/assets/profile-img.jpg" alt="Profile" className="rounded-circle" />
                                    <span className="d-none d-md-block dropdown-toggle ps-2">{userData.username}</span>

                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                        <li className="dropdown-header">
                                            <span>Email: {"   " + userData.email}</span>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <div onClick={() => router.push('/dashboard')} className="dropdown-item d-flex align-items-center">
                                                <i className="bi bi-person"></i>
                                                <span className="text-purple-600">My Dashboard</span>
                                            </div>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                                <i className="bi bi-gear"></i>
                                                <span>Account Settings</span>
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>


                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <i className="bi bi-box-arrow-right"></i>
                                                <span onClick={handleSignOut}>Sign Out</span>
                                            </a>
                                        </li>
                                    </ul>
                                </span>

                            )}
                            {!accessToken && (
                                <Link
                                    href={'/login'}
                                    className="disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    rounded-lg
                                    hover:opacity-80
                                    transition
                                    w-full
                                    bg-purple-600
                                    px-3
                                    py-2
                                    text-white
                                     decoration-transparent
                                    font-bold"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>


            </header>

            <Sidebar />
        </div>
    )
}

export default Navbar