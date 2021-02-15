import React,{useEffect,useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {auth} from '../firebase/firebaseconfig.js'

const Menu = () => {
    const historial = useHistory()
    const [usuario,setUsuario] = useState(null)
    


    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setUsuario(user.email)
                console.log(user.email)
            }
        })
    },[])
    const CerrarSession = () => {
        auth.signOut()
        setUsuario(null)
        historial.push('/')
    }




    return(
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Inicio</Link>
                    </li>

                    <li className='nav-item'>
                    {
                    !usuario ?
                    (
                        <Link className='nav-link' to='/login'>Login</Link>
                    )
                    :
                    ( <span></span> )
                    }
                        
                    </li>

                    
                    <li className='nav-item'>
                    {
                    usuario ?
                    (
                        <Link className='nav-link' to='/despesa'>Despesa</Link>
                    )
                    :
                    ( <span></span> )
                     }
                        
                    </li>
                    <li className='nav-item'>
                    {
                    usuario ?
                    (
                        <Link className='nav-link' to='/receita'>Receita</Link>
                    )
                    :
                    ( <span></span> )
                     }
                        
                    </li>
                </ul>
                {
                    usuario ?
                    (
                        <button onClick={CerrarSession} className='btn btn-danger'>Encerrar sessão</button>
                    )
                    :
                    ( <span></span> )
                }
                
            </nav>

        </div>
    )
}

export default Menu;