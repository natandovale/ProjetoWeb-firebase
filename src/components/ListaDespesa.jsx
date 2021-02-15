import React,{useState, useEffect} from 'react'
import {store} from '../firebase/firebaseconfig';


const ListaDespesa = () => {
    const[iddespesa, setIdDespesa] = useState('')
    const[valor, setValor] = useState('')
    const[descricao, setDescricao] = useState('')
    const[despesas, setDespesas] = useState([])

    useEffect(()=>{
        const getDespesas = async()=>{
            try{
            const {docs} = await store.collection('despesa').get()
            const novoArray = docs.map(item => ({id:item.id, ...item.data()}))
            setDespesas(novoArray)
            }catch(e){
                console.log(e)
            }
        }
        getDespesas()
    },[])

    const excluirDespesa = async(id) => {
        try{
            await store.collection('despesa').doc(id).delete()
            const {docs} = await store.collection('despesa').get()
            const novoArray = docs.map(item => ({id:item.id, ...item.data()}))
            setDespesas(novoArray)

        }catch(e){
            console.log(e)
        }
    }

    const editarDespesa = async(id) => {
        try{
            const data = await store.collection('despesa').doc(id).get()
            const {valor, descricao} = data.data()
            setValor(valor)
            setDescricao(descricao)
            setIdDespesa(id)
            
        }catch(e){
            console.log(e)
        }
    }

    const atualizarDespesa = async(e) => {
        e.preventDefault()
        

        const despesaAtualizada = {
            valor: valor,
            descricao: descricao
        }

        try{
            await store.collection('despesa').doc(iddespesa).set(despesaAtualizada)
            const {docs} = await store.collection('despesa').get()
            const novoArray = docs.map(item => ({id: item.id, ...item.data()}))
            setDespesas(novoArray)
        }catch(e){
            console.log(e)
        }
        setValor('')
        setDescricao('')
    }

    return(
    
    <div className='col'>
        <h2>Lista de despesas</h2>
        <form onSubmit={atualizarDespesa} id="formu" className="mt-2">
            <h3>Editar</h3>
            <input value={valor} onChange={(e)=>{setValor(e.target.value)}}  type='number' placeholder='Novo valor'/>
            <input value={descricao} onChange={(e)=>{setDescricao(e.target.value)}} className="ml-2" type='text' placeholder='Nova descrição'/>
            <input type='submit' value='OK' className='btn btn-success ml-2'/>
        </form>




    <ul className="list-group mt-6">
    {
        despesas.length !== 0 ?
        (
            despesas.map(item => (
                <li className="list-group-item" key={item.id}><h4>Valor:</h4>R${item.valor} <h4>Descrição:</h4>{item.descricao}
                    <button onClick={(id) => {excluirDespesa(item.id)}} className="btn btn-danger float-right ">EXCLUIR</button>
                    
                    <a href="#formu"><button onClick={(id) => {editarDespesa(item.id)}} className="btn btn-info float-right mr-2" >EDITAR</button></a>
                </li>
                
                ))
        )
        :
        (
            <span>
                Não há despesas registradas.
            </span>
        )
    }
    </ul>
</div>)
}

export default ListaDespesa;


