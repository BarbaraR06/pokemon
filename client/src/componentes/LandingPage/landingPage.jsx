import React from "react";
import styles from './landingPage.module.css'
import LogoPokemon from '../../LogoPokemon.png'
import { Link } from 'react-router-dom';


const Landing = () => {
    return (
        <div className={styles.landing}>
            <h1 className={styles.titulo}>Welcome!</h1>
            <Link to="/home">
            <button className={styles.button}> Login to capture them all </button>
            </Link>
            <img className={styles.logo} src={LogoPokemon} alt='LogoPokemon' height={400} />
        </div>
    )
}



export default Landing;