import React, { useState, useEffect } from 'react'
import firebaseApp from "../credentials"
import { getFirestore, doc, getDoc, collection, orderBy, getDocs, query, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
const db = getFirestore(firebaseApp)



const Add = () => {

    const [songs, setSongs] = useState([])
    const [songsDom, setSongsDom] = useState([])
    const [wordFilter, setWordFilter] = useState('')

    const getSongs = async () => {
        const songsSnap = await getDocs(query(collection(db, "canciones"), orderBy("titulo")))

        songsSnap.forEach((ss) => {
            let songData = Object.assign(ss.data(), { id: ss.id })
            setSongs(songs => [...songs, songData])
        })
    }
    useEffect(() => getSongs(), [])

    const getSongsDom = async () => {
        let arrayDomSnap = await getDoc(doc(db, 'domingo', 'listDom'))
        let arrayDom = arrayDomSnap.data().dom
        arrayDom.forEach(async (s) => {
            let songSnap = await getDoc(doc(db, 'canciones', s))
            let songWId = Object.assign(songSnap.data(), { id: s })
            setSongsDom(songsDom => [...songsDom, songWId])
        })

    }
    const searchingTitle = (e) => {
        setWordFilter(e)
    }
    useEffect(() => getSongsDom(), [])

    const addSong = async (s) => {
        let arrayDomSnap = await getDoc(doc(db, 'domingo', 'listDom'))
        let arrayDom = arrayDomSnap.data().dom
        arrayDom.push(s)
        await setDoc(doc(db, 'domingo', 'listDom'), { dom: arrayDom })
        
        document.getElementById('deletear').innerHTML = ''
        getSongsDom()
        //window.location.reload()
    }
    const cleanSongs = async () => {
        await setDoc(doc(db, 'domingo', 'listDom'), { dom: [] })
        window.location.reload()
    }



    return (<>
        <div className="pagAdd">

            <div className="addHeader">

                <Link to='/'><i className="material-icons" >chevron_left</i></Link>

                <div>
                    <div ><b>Añadir Canciones</b></div>
                    <div ><small>Escoge las canciones que desees</small></div>
                </div>
                <i className='material-icons' onClick={() => cleanSongs()}>playlist_remove</i>

            </div>
            <div className='addAdded' id='deletear'>

                {songsDom.map((s) => {
                    return (<div className='cancionesAdded' key={s.id}>
                        {s.titulo}<small> - {s.artista}</small>
                    </div>)
                })
                }
            </div>

            <br /><hr /> <br />
            <input autoFocus type="text" onChange={(e) => { searchingTitle(e.target.value) }} name='searchInput' placeholder='&nbsp;Buscar' />

            <div className="allSongs">
                {songs.filter((r) => r.titulo.toUpperCase().includes(wordFilter.toUpperCase()) === true).map((s) => {
                    return (<div key={s.id} className='blockList'>
                        <div>{s.titulo}<small> - {s.artista}</small></div>
                        <i className="material-icons" onClick={() => addSong(s.id)}>add</i>
                    </div>)
                })}
            </div>
        </div>
    </>)

}

export default Add