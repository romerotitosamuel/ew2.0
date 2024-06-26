import React, { useEffect, useState } from 'react'
import firebaseApp from '../credentials'
import { getFirestore, getDoc, doc, onSnapshot, getDocs, collection } from 'firebase/firestore'

const db = getFirestore(firebaseApp)



const Crud = () => {


    //const colCanciones = collection(db, "canciones")
    /*onSnapshot(doc(colCanciones,"0MG7PDbe3umcLJa6cGpL"), (doc) => {
        
        let books = doc.data()
        console.log(books)
    }); */

const handlerSubmit = (e) => {
    let nombreServicio = e.target.nombreServicio.value
    let ministerioServicio = e.target.ministerioServicio.value
    let fechaServicio = e.target.fechaServicio.value
    let servicioActivo = true

}



    return (

        <div className='contCrud'>
            <p>Hola mundo crud</p>
            <form id="formServicio" onSubmit={handlerSubmit}>
                
                <small>Nombre de Servicio</small>
                <input type="text" id="nombreServicio" />
                
                <small>Ministerio</small>
                <input type="text" id="ministerioServicio" />
                
                <small>Fecha del servicio</small>
                <input type="date" id="fechaServicio" />
                
                <button type='submit'>Enviar</button>
            </form>


        </div>


    )
}

export default Crud