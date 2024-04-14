import React, { FC } from 'react'


interface headerTypes {
    title: string;
    subtitle?: string;
    center?: boolean;
}
const Header: FC<headerTypes> = ({ center, title, subtitle }) => {
    return (
        <div className={`${center} ? 'text-center' : 'text-start'`}>
            <div className="text-3xl font-bold">
                {title}
            </div>
            <div className="font-light text-xl text-gray-600 mt-2">
                {subtitle && subtitle}
            </div>
        </div>
    )
}

export default Header
