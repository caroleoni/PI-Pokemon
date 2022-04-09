import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
    return (
        <section className='container-LandingPage'>
        <div className='landingPage'>
            <h1>¡Welcome to Pokemon!</h1>
            <Link to='/home'>
                <button className='btn-landingPage'>Start</button>
            </Link>
            <h5 className='footer'>App developed by Carolina Leoni, Full-Stack Developer Student</h5>
        </div>
        </section>
    )
}