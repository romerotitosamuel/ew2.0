import { getFirestore, getDoc, doc } from 'firebase/firestore'
import firebaseApp from '../credentials'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo600 from '../styles/images/logoWor600px.webp'
import IconLibrary from './icons/IconLibrary'

const db = getFirestore(firebaseApp)

const Home = () => {

    const [songsDom, setSongsDom] = useState([])
    const [songsSab, setSongsSab] = useState([])

    //PARA TRAER CANCIONES DEL DOMINGO
    const getSongsDom = async () => {

        const arraySnap = await getDoc(doc(db, 'domingo', 'listDom'))
        const arraySongs = arraySnap.data().dom
        //let paraLocal = []

        arraySongs.forEach(async (s) => {
            const songSnap = await getDoc(doc(db, 'canciones', s))
            const songWId = Object.assign(songSnap.data(), { id: s })
            setSongsDom(songsDom => [...songsDom, songWId])
            //paraLocal.push(songWId)
        })
    }
    //PARA TRAER CANCIONES DEL SABADO
    const getSongsSab = async () => {

        const arraySnap = await getDoc(doc(db, 'sabado', 'listSab'))
        const arraySongs = arraySnap.data().sab

        arraySongs.forEach(async (s) => {
            const songSnap = await getDoc(doc(db, 'canciones', s))
            const songWId = Object.assign(songSnap.data(), { id: s })
            setSongsSab(songsSab => [...songsSab, songWId])
        })
    }

    const enviarSong = (titulo, artista, bpm, url, letra, acordes, id, index) => {
        const song = { titulo, artista, bpm, url, letra, acordes, id, index }
        localStorage.setItem('song', JSON.stringify(song))
    }
    useEffect(() => getSongsDom(), [])
    useEffect(() => getSongsSab(), [])

    if (window.navigator.onLine) { localStorage.setItem('localSongsDom', JSON.stringify(songsDom)) }

    return (<>
        <div className='homePage'>
            <div className='homeHeader'>
                <img src={logo600} alt="No hay logo" />
                <Link to='/lib'><i className="material-icons" ><IconLibrary /></i></Link>
            </div>

            <div className="domHome" >
                {
                    songsDom.map((s) => {
                        return (

                            <Link to='./content' className='link' key={s.id}>
                                <div className='filaSong' onClick={() => enviarSong(s.titulo, s.artista, s.bpm, s.url, s.letra, s.acordes, s.id)}>
                                    {s.titulo} <small>- {s.artista}</small>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

            <a className='youtubeArea' href="https://music.youtube.com/playlist?list=PL_FgA7_oWUXKWcagYkqu2DW9z7IC-BiOu" target="_blank">
                <i className="material-icons" >play_circle_outline</i>
                <div>Playlist - Youtube Music</div>
            </a  >

            <div className="domHome" >
                {
                    songsSab.map((s) => {
                        return (

                            <Link to='./content' className='link' key={s.id}>
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
export default Home