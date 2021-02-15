import React,{useState, useEffect} from 'react';
import {store} from '../firebase/firebaseconfig';
import {useHistory} from 'react-router-dom'

const Receita = () =>{
    const historial = useHistory()
    const[valor, setValor] = useState('')
    const[descricao, setDescricao] = useState('')
    const[error, setError] = useState([])

    const mostrarReceitas = () => {
        historial.push('/receita/listareceita');
    }
    

    const setReceita = async (e) => {
        e.preventDefault()
        if(!valor.trim()){
            setError('O campo de Receita está vazio!')
        }
        if(!descricao.trim()){
            setError('O campo de Descrição está vazio!')
        }
        const receita = {
            valor:valor,
            descricao:descricao
        }
        try{
            e.preventDefault()
            const data = await store.collection('receita').add(receita)
            alert('receita salva')
        }catch(e){
            console.log(e)
        }
        setValor('')
        setDescricao('')

        
    }
    
    



    return(
        <div className='container'>
        <div className='col'>
            <h2>Receita</h2>
            <form onSubmit={setReceita} className='form-group'>
                <label>R$</label>
                <input value={valor} onChange={(e)=>{setValor(e.target.value)}} className='form-control' type='number' placeholder='Coloque o valor da receita'/>
                <input value={descricao} onChange={(e)=>{setDescricao(e.target.value)}} className='form-control mt-3' type='text' placeholder='Descrição'/>
                <input type='submit' value='Registrar' className='btn btn-dark btn-block mt-3'/>
            </form>
            {
                    error?
                    (
                        <div>
                            <p>{error}</p>
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
        </div>
        <div className='col'>
            <button onClick={mostrarReceitas} className='btn btn-dark btn-block mt-3'>Ver historico de receitas</button>
        </div>
    </div>
    )
}

export default Receita;