import React,{useState} from 'react'
import {auth} from '../firebase/firebaseconfig.js'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const historial = useHistory()
    const[email,setEmail] = useState('')
    const[pass,setPass] = useState('')
    const[msgerror, setMsgError] = useState('')

    const RegistrarUsuario = (e)=>{
        e.preventDefault()
        
            auth.createUserWithEmailAndPassword(email,pass)
            .then(r => {
                historial.push('/')
            })
            .catch(e => {
            if(e.code === 'auth/invalid-email'){
                setMsgError('Formato de Email incorreto')
            }
            if(e.code === 'auth/weak-password'){
                setMsgError('A senha devera conter 6 ou mais caracteres')
            }
            
         } )
    
    }

    const LoginUsuario = () =>{
        auth.signInWithEmailAndPassword(email,pass)
        .then((r)=>{
            historial.push('/')
        })
        .catch((err)=>{
           if(err.code === 'auth/wron-password'){
               setMsgError('Senha errada')
           }
        })
    }

    return(
        <div className='row mt-5'>
            <div className='col'></div>
            <div className='col'>
                <form onSubmit={RegistrarUsuario} className='form-group'>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className='form-control' placeholder="Digite o email" type="email"/>
                
                    <input onChange={(e)=>{setPass(e.target.value)}} className='form-control mt-3' placeholder="Digite a senha" type="password"/>

                    <input className='btn btn-dark btn-block mt-3' type='submit' value='Registrar usuario'/>
                </form>

                <button onClick={LoginUsuario} className='btn btn-success btn-block mt-3'>Iniciar Sessão</button>    
                
                {
                    msgerror != null ?
                    (
                        <div>
                            {msgerror}
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className='col'></div>
        </div>
    )
}

export default Login;