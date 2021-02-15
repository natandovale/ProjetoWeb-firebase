import React,{useState} from 'react';
import {store} from '../firebase/firebaseconfig';
import {useHistory} from 'react-router-dom';

const Despesa = () =>{
    const historial = useHistory()
    const[valor, setValor] = useState('')
    const[descricao, setDescricao] = useState('')
    const[error, setError] = useState([])

    const mostrarDespesa = () => {
        historial.push('/despesa/listardespesa');
    }

    const setDespesas = async (e) => {
        e.preventDefault()
        if(!valor.trim()){
            setError('O campo de Despesa está vazio!')
        }
        if(!descricao.trim()){
            setError('O campo de Descrição está vazio!')
        }
        const despesa = {
            valor:valor,
            descricao:descricao
        }
        try{
            e.preventDefault()
            const data = await store.collection('despesa').add(despesa)
            alert('Despesa salva')
        }catch(e){
            console.log(e)
        }
        setValor('')
        setDescricao('')

        
    }
    

    return(
        <div className='container'>
            <div className='col'>
                <h2>Despesa</h2>
                <form onSubmit={setDespesas} className='form-group'>
                    <label>R$</label>
                    <input value={valor} onChange={(e)=>{setValor(e.target.value)}} className='form-control' type='number' placeholder='Coloque o valor da despesa'/>
                    <input value={descricao} onChange={(e)=>{setDescricao(e.target.value)}}  className='form-control mt-3' type='text' placeholder='Descrição'/>
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
               <button onClick={mostrarDespesa} className='btn btn-dark btn-block mt-3'>Ver historico de despesas</button>
            </div>
        </div>
    )
}

export default Despesa;