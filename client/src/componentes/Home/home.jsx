import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, orderByName, filterCreated, orderByAttack, getTypes, filterType } from '../../actions/index';
import {Link} from 'react-router-dom';

import SearchBar from "../SearchBar/SearchBar";
import styles from "./home.module.css";

export default function Home(){
    const dispatch = useDispatch()

    const types = useSelector((state)=> state.types)

    //declara constante y trae todo lo que esta en el estado de pokemones, el pokemones del final viene del reducer
    


    const [orden, setOrden] = useState('')

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
        }


    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
        },[dispatch])

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }    

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterType(e) {
        e.preventDefault();
        dispatch(filterType(e.target.value));
        setOrden(` ${e.target.value}`);
      }

  

    return (
        <div>

            <h1 className={styles.titulo}>Search by attack, type or even more</h1>

            <div className={styles.buttonContainer}>
            {/* BOTON CREAR POKEMON */}
            <button className={styles.buttoncreate}> <Link to= '/pokemon'>Create Pokemon</Link> </button>
            {/* BOTON RELOAD POKEMON */}
            <button className={styles.buttonReload} onClick={e => {handleClick(e)}}> Reload Pokemons</button>
            </div>

            {/* INICIO FILTRADOS */}
            <div className={styles.selectionfilterscontainer}>
                
                    <select className={styles.selectbtns} onChange={e=> handleSort(e)}>
                        <option>ORDER BY NAME</option>
                        <option value = 'asc'>Ascending order</option>
                        <option value = 'desc'>Descending order</option>
                    </select>
                    
                    <select className={styles.selectbtns} onChange={e => {handleSortAttack(e)}}>
                        <option>STRENGTH</option>
                        <option value = 'strong'>Stronger attack</option>
                        <option value = 'weak'>Weaker attack</option>
                    </select>

                    <select className={styles.selectbtns} onChange={(e) => {handleFilterType(e);}}>
                        <option>BY TYPE</option>
                        {types?.map((type) => (
                        <option key={type.id} value={type.nombre}>{type.nombre}</option>
                        ))}
                    </select>

                    <select className={styles.selectbtns} onChange={e=> handleFilterCreated(e)}>
                        <option>CREATOR</option>
                        <option value="all">Show all...</option>
                        <option value="api">Reals</option>
                        <option value="created">Created</option>
                    </select>
                
            </div>
            {/* CIERRE FILTRADOS */}
   
            
                <SearchBar/>


            {/* INICIO DE CARD */}
            
            </div>




        
    )
}