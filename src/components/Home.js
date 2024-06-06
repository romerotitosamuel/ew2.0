import { getFirestore, getDoc, doc } from 'firebase/firestore'
import firebaseApp from '../credentials'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo600 from '../styles/images/logoWor600px.webp'

const db = getFirestore(firebaseApp)

const Home = () => {

    const [songsDom, setSongsDom] = useState([])
    const [songsSab, setSongsSab] = useState([])
    const [apps, setApps] = useState(false)


    let iphone = null
    let boss = 'https://play.google.com/store/apps/details?id=jp.co.roland.bosstuner&hl=es_BO&gl=US'
    let soundBrenner = 'https://play.google.com/store/apps/details?id=com.soundbrenner.pulse&hl=es_BO&gl=US'
    let bibleGateway = 'https://play.google.com/store/apps/details?id=com.csnmedia.android.bg&hl=es_BO&gl=US'
    let nuestroPanDiario = 'https://play.google.com/store/apps/details?id=org.rbc.odb&hl=es_BO&gl=US'

    if (navigator.userAgent.match(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i))) {
        iphone = true
    } else { iphone = false }
    if (iphone) {
        boss = 'https://apps.apple.com/us/app/boss-tuner/id1113473319'
        soundBrenner = 'https://apps.apple.com/us/app/the-metronome-by-soundbrenner/id1048954353'
        bibleGateway = 'https://apps.apple.com/us/app/bible-gateway/id506512797'
        nuestroPanDiario = 'https://apps.apple.com/pe/app/nuestro-pan-diario/id437496538'
    }
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
        //let paraLocal = []

        arraySongs.forEach(async (s) => {
            const songSnap = await getDoc(doc(db, 'canciones', s))
            const songWId = Object.assign(songSnap.data(), { id: s })
            setSongsSab(songsSab => [...songsSab, songWId])
            //paraLocal.push(songWId)
        })
    }






    const enviarSong = (titulo, artista, bpm, url, letra, acordes) => {
        const song = { titulo, artista, bpm, url, letra, acordes }
        localStorage.setItem('song', JSON.stringify(song))
    }
    useEffect(() => getSongsDom(), [])
    useEffect(() => getSongsSab(), [])

    //if (window.navigator.onLine) { localStorage.setItem('localSongsDom', JSON.stringify(songsDom)) }

    return (<>
        <div className='homePage'>
            <div className='homeHeader'>
                
                <img src={logo600} alt="No hay logo" />
            </div>

            <div className="domHome" style={{display: apps ? 'none' : 'block'}}>
                
                {
                    songsDom.map((s) => {
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
            
            {/*
            <div className="aplications" style={{display: apps ? 'block' : 'none'}}>
                <div className="contApp">
                    <img src="https://play-lh.googleusercontent.com/UsnCgUDSfqbFFjDGLgC3d8_n1CbOHe1JMjBmSeRw-pkJXGZ4v4DNQpYfMxA-x4ZH5a-6=s180-rw" alt="Boss Tuner" />
                    <a href={boss} target="_blank">
                        Boss Tuner (Afinador)
                    </a  >
                </div>
                <div className="contApp">
                    <img src="https://play-lh.googleusercontent.com/Ol4yyIJn3Or2v67kZrtVuvXDuBkwwhPidZReP07-kTjV38tc9IOHoWQ_WQo8cDMyKw=s180-rw" alt="Soundbrenner" />
                    <a href={soundBrenner} target="_blank">
                        Soundbrenner (metrónomo)
                    </a  >
                </div>
                <div className="contApp">
                    <img src="https://play-lh.googleusercontent.com/7HllI6WUdcDQ4ubbssOcsDmim_g-rSg2VrsMK7zrCUPjcsBRVm4u40PbW2cwV1uP6Zc=s180-rw" alt="Soundbrenner" />
                    <a href={bibleGateway} target="_blank">
                        Bible Gateway (Biblia)
                    </a  >
                </div>
                <div className="contApp">
                    <img src="https://play-lh.googleusercontent.com/5A3iedWtGCxhfSHpLkn1hfjz2ID5PEcOoPK8HKJasUp0OJAXpetbGPZiGkptbdOzWb0=s180-rw" alt="NuestroPanDiario" />
                    <a href={nuestroPanDiario} target="_blank">
                        Nuestro Pan Diario (Devocional)
                    </a  >
                </div>
            </div>
            */}

            <a className='youtubeArea' href="https://music.youtube.com/playlist?list=PL_FgA7_oWUXKWcagYkqu2DW9z7IC-BiOu" target="_blank">
                <i className="material-icons" >play_circle_outline</i>
                <div>Playlist - Youtube Music</div>
            </a  >
             <hr  />
            <div className="domHome" style={{display: apps ? 'none' : 'block'}}>
                
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
            <div className="footerHome">
                <Link to='/'><i className="material-icons" onClick={()=> setApps(false)} >home</i></Link>
                <div ><i className="material-icons" onClick = {()=> setApps(false)}>apps</i></div>
                <Link to='/lib'><i className="material-icons" >library_music</i></Link>
            </div>
        </div>
    </>)
}
export default Home