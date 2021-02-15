import React,{useState, useEffect} from 'react'
import {store} from '../firebase/firebaseconfig';


const ListaReceita = () => {
    const[idreceita, setIdReceita] = useState('')
    const[valor, setValor] = useState('')
    const[descricao, setDescricao] = useState('')
    const[receitas, setReceitas] = useState([])

    useEffect(()=>{
        const getReceitas = async()=>{
            try{
            const {docs} = await store.collection('receita').get()
            const novoArray = docs.map(item => ({id:item.id, ...item.data()}))
            setReceitas(novoArray)
            }catch(e){
                console.log(e)
            }
        }
        getReceitas()
    },[])

    const excluirReceita = async(id) => {
        try{
            await store.collection('receita').doc(id).delete()
            const {docs} = await store.collection('receita').get()
            const novoArray = docs.map(item => ({id:item.id, ...item.data()}))
            setReceitas(novoArray)

        }catch(e){
            console.log(e)
        }
    }

    const editarReceita = async(id) => {
        try{
            const data = await store.collection('receita').doc(id).get()
            const {valor, descricao} = data.data()
            setValor(valor)
            setDescricao(descricao)
            setIdReceita(id)
            
        }catch(e){
            console.log(e)
        }
    }

    const atualizarReceita = async(e) => {
        e.preventDefault()
        

        const receitaAtualizada = {
            valor: valor,
            descricao: descricao
        }

        try{
            await store.collection('receita').doc(idreceita).set(receitaAtualizada)
            const {docs} = await store.collection('receita').get()
            const novoArray = docs.map(item => ({id: item.id, ...item.data()}))
            setReceitas(novoArray)
        }catch(e){
            console.log(e)
        }
        setValor('')
        setDescricao('')
    }

    return(
    
    <div className='col'>
    <h2>Lista de receitas</h2>
        <form onSubmit={atualizarReceita} id="formu" className="mt-2">
            <h3>Editar:</h3>
            <input value={valor} onChange={(e)=>{setValor(e.target.value)}}  type='number' placeholder='Novo valor'/>
            <input value={descricao} onChange={(e)=>{setDescricao(e.target.value)}} className="ml-2" type='text' placeholder='Nova descrição'/>
            <input type='submit' value='OK' className='btn btn-success ml-2'/>
        </form>


    <ul className="list-group mt-6">
    {
        receitas.length !== 0 ?
        (
            receitas.map(item => (
                <li className="list-group-item" key={item.id}><h4>Valor:</h4>R${item.valor} <h4>Descrição</h4>{item.descricao}
                     <button onClick={(id) => {excluirReceita(item.id)}} className="btn btn-danger float-right ">EXCLUIR</button>
                     <a href="#formu"><button onClick={(id) => {editarReceita(item.id)}} className="btn btn-info float-right mr-2" >EDITAR</button></a>
                </li>
            ))
        )
        :
        (
            <span>
                Não há receitas registradas.
            </span>
        )
    }
    </ul>
</div>)
}

export default ListaReceita;


