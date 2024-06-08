import React, { useState, useEffect } from 'react'
import firebaseApp from "../credentials"
import { getFirestore, doc, getDoc, collection, orderBy, getDocs, query, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
const db = getFirestore(firebaseApp)



const Add = () => {

    const [songs, setSongs] = useState([])
    const [songsSab, setSongsSab] = useState([])
    const [wordFilter, setWordFilter] = useState('')

    const getSongs = async () => {
        const songsSnap = await getDocs(query(collection(db, "canciones"), orderBy("titulo")))

        songsSnap.forEach((ss) => {
            let songData = Object.assign(ss.data(), { id: ss.id })
            setSongs(songs => [...songs, songData])
        })
    }
    useEffect(() => getSongs(), [])

    const getSongsSab = async () => {
        let arraySabSnap = await getDoc(doc(db, 'sabado', 'listSab'))
        let arraySab = arraySabSnap.data().sab
        arraySab.forEach( async (s) => {
            let songSnap = await getDoc(doc(db, 'canciones', s))
            let songWId = Object.assign(songSnap.data(), {id: s})
            setSongsSab(songsSab => [...songsSab , songWId])
        })

    }
    const searchingTitle = (e) => {
        setWordFilter(e)
    }
    useEffect( ()=> getSongsSab(), [])

    const addSong = async (s) => {
        let arraySabSnap = await getDoc(doc(db, 'sabado', 'listSab'))
        let arraySab = arraySabSnap.data().sab
        arraySab.push(s)
        await setDoc(doc(db, 'sabado', 'listSab'), { sab: arraySab })

        document.getElementById('deletear').innerHTML = ''
        getSongsSab()



        //window.location.reload()
    }
    const cleanSongs = async () => {
        await setDoc(doc(db, 'sabado', 'listSab'), { sab: [] })
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

                {songsSab.map( (s) => {
                    return( <div className='cancionesAdded' key={s.id}>
                        {s.titulo}<small> - {s.artista}</small>
                    </div> )
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