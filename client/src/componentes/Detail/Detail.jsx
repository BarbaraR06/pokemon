import { useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../../actions/index'
import { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

import styles from './Detail.module.css'

export default function Detail() {

    //const pokemon = useSelector(state => state.data);

    const dispatch = useDispatch()
    const { id } = useParams();


    useEffect(() => {

        dispatch(getDetail(id));
    }, [dispatch, id])


    const myPokemon = useSelector((state) => state.detail)

    return (
        <div>

            {
                myPokemon.length > 0 ?
                    <div className={styles.form}>
                        <h1>{myPokemon[0].name}</h1>
                        <img src={myPokemon[0].sprite} alt='' width='200px' height='250px' />
                        <h3>Types: {myPokemon[0].types.map(e => e + " ")}</h3>
                        <h4>Hp: {myPokemon[0].life}</h4>
                        <h4>Attack: {myPokemon[0].attack}</h4>
                        <h4>Defense: {myPokemon[0].defense}</h4>
                        <h4>Speed: {myPokemon[0].speed}</h4>
                        <h4>Height: {myPokemon[0].height}</h4>
                        <h4>Weight: {myPokemon[0].weight}</h4>

                    </div>
                    :
                    <div>

                        <p> Loading your pokemon... </p>

                    </div>
            }
            <p>
                <Link to='/home' ><button className={styles.buttondetail}>Return</button></Link>
            </p>
        </div>
    )
}