import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFirestore, query, collection, orderBy, getDocs } from 'firebase/firestore'
import firebaseApp from '../credentials'
import IconHome from './icons/IconHome'
const db = getFirestore(firebaseApp)

const Lib = () => {
    const [songs, setSongs] = useState([])
    const [wordFilter, setWordFilter] = useState('')

    const getSongs = async () => {
        const songsSnap = await getDocs(query(collection(db, "canciones"), orderBy("titulo")))
        let forLocal = []
        songsSnap.forEach((ss) => {
            let songData = Object.assign(ss.data(), { id: ss.id })
            setSongs(songs => [...songs, songData])
            forLocal.push(songData)
        })
    }
    const enviarSong = (titulo, artista, bpm, url, letra, acordes) => {
        const song = { titulo, artista, bpm, url, letra, acordes }
        localStorage.setItem('song', JSON.stringify(song))
    }

    const searchingTitle = (e) => {
        setWordFilter(e)
    }

    useEffect(() => getSongs(), [])
    return (<>
        <div className="libPage">
            <div className="headerLib">

                <Link to='/'><i className="material-icons" ><IconHome/></i></Link>
                <input autoFocus type="text" onChange={(e) => { searchingTitle(e.target.value) }} name='searchInput' placeholder='&nbsp;Buscar' />
            </div>
            <div className="libArea">
                {
                    songs.filter((r) => r.titulo.toUpperCase().includes(wordFilter.toUpperCase()) === true).map((s) => {
                        return (
                            <Link to='../content' className='link' key={s.id}>
                                <div className='filaSong' onClick={() => enviarSong(s.titulo, s.artista, s.bpm, s.url, s.letra, s.acordes)}>
                                    {s.titulo} <small>- {s.artista}</small>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>

    </>)
}
export default Lib