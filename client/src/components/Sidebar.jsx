import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Sidebar = () => {
    return (
        <div>
            <aside id="sidebar" className="sidebar ">
                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <Link className="nav-link " href="/">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link " href="/add">
                            <i className="bi bi-grid"></i>
                            <span>Add Listings</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                            <span className="px-2">Explore</span>
                            <Image
                                src="/assets/chevron-down.svg"
                                alt="Notification"
                                width={14}
                                height={24}
                            />
                        </a>
                        <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="/">
                                    <span>People - Community</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span>Places - Venues</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span>Programs - Events</span>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <span>Predicts - store</span>
                                </a>
                            </li>
                        </ul>
                        {/* <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="components-alerts.html">
                                    <i className="bi bi-circle"></i><span>Alerts</span>
                                </a>
                            </li>
                            <li>
                                <a href="components-accordion.html">
                                    <i className="bi bi-circle"></i><span>Accordion</span>
                                </a>
                            </li>
                        </ul> */}
                    </li>



                </ul>

            </aside>
        </div>
    )
}

export default Sidebar