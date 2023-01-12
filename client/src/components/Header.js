import React from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <header>
                <nav>
                    <p>Book Store</p>
                    <ul>
                        <li><Link className='navList' to='/'>Home</Link></li>
                        <li><Link className='navList' to='/books'>Add Book</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}