import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import styles from './Navbar.module.css'
import { useContext } from 'react'
/* contexts */
import { Context } from '../../context/UserContext'


function Navbar() {
    const { authenticated } = useContext(Context)
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo} >
                <img src={Logo} alt="Adote um cão" />
                <h2> Adote um cão</h2>
            </div>
            <ul>
                <li>
                    | <Link to="/">Adotar</Link>
                </li>

                {authenticated ? (
                    <>
                        <p>LOgado</p>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li></>

                )}
            </ul>
        </nav>

    )
}
export default Navbar