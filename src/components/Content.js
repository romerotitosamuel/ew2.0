import React, { useEffect, useState } from 'react'
import { downHalfTone } from './functions'
import { Link } from 'react-router-dom'
import useSound from 'use-sound'
import click1 from '../styles/sounds/click1.mp3'
import IconMusic from './icons/IconMusic'
import IconLetter from './icons/IconLetter'
import IconDown from './icons/IconDown'
import IconYoutube from './icons/IconYoutube'
import IconMetronome from './icons/IconMetronome'
import IconLibrary from './icons/IconLibrary'
import IconLeft from './icons/IconLeft'
import IconPlus from './icons/IconPlus'
import IconMinus from './icons/IconMinus'



const Content = () => {
    const [song] = useState(JSON.parse(localStorage.getItem('song')))
    const [chordOn, setChordOn] = useState(JSON.parse(localStorage.getItem('chordOn')))
    const [metro, setMetro] = useState(true)
    const [idTimer, setIdTimer] = useState(null)
    const [vidOn, setVidOn] = useState(true)
    const [quickListOn, setquickListOn] = useState(true)
    const [fontSize, setFontSize] = useState(JSON.parse(localStorage.getItem('fontSize')))
    



    const songsDom = JSON.parse(localStorage.getItem('localSongsDom'))
    const songsSab = JSON.parse(localStorage.getItem('localSongsSab'))
    const songArray = song.letra.split(['\n\n'])
    const acordeArray = song.acordes.split(['\n'])
    let son = null
    const [play] = useSound(click1)

    const enviarSong = (titulo, artista, bpm, url, letra, acordes) => {
        const song = { titulo, artista, bpm, url, letra, acordes }
        localStorage.setItem('song', JSON.stringify(song))
        window.location.reload()
    }


    const ejecutarBajar = () => {
        let contenido = document.getElementsByClassName('chord')

        for (let i = 0; i < contenido.length; i = i + 1) {
            console.log(contenido[i].textContent)
            let nuevo = downHalfTone(contenido[i].textContent)
            contenido[i].textContent = nuevo
        }
    }
    const metronome = (r) => {
        if (r) {
            son = setInterval(() => play(), 60 / song.bpm * 1000)
            setIdTimer(son)
            setMetro(false)
        } else {
            clearInterval(idTimer)
            setMetro(true)
        }
    }

    return (<>
        <div className="contentAll">
            <div className="contentHeader">
                <div className='headerLeft'>
                    <div  >
                        <i className="material-icons" onClick={() => { clearInterval(idTimer); window.history.back() }}><IconLeft /></i>
                    </div>

                    <div ><b>{song.titulo}</b></div>

                </div>
                <div className='vidRight'>
                    <div ><small>{song.artista}  </small></div>
                    <div><small><small>{song.bpm ? `${song.bpm} bpm` : ""}</small></small></div>

                </div>
            </div>
            <div className='zoomButtons'> 
            <div onClick={() => { setFontSize(fontSize - 2); localStorage.setItem('fontSize', fontSize) }}><i className="material-icons" ><IconMinus /></i></div>
            <div onClick={() => { setFontSize(fontSize + 2); localStorage.setItem('fontSize', fontSize) }}><i className="material-icons" ><IconPlus /></i></div>

            </div>


            <div className="contentArea" >
                <div className="contentLetra" style={{ display: chordOn ? "none" : "block" }}>
                    <pre style={{fontSize:fontSize}}>
                        {songArray.map((r) => {

                            if (r.substr(0, 4) === 'CORO') {
                                return (<div><b>{r.slice(5)}</b> <br /> </div>)
                            }
                            return (<div>{r} <br /> </div>)
                        })}
                    </pre>
                </div>
                <div className="contentAcordes" style={{ display: chordOn ? "block" : "none" }}>
                    <pre style={{fontSize:fontSize}}>
                        {acordeArray.map((line) => {
                            const m = line.substr(0, 2)
                            if (m === "In" || m === "So" || m === " " || m === "  " || m === "   " || m === "    " || m === "     " || m === "     " || m === "C " || m === "Cm" || m === "C#" || m === "D " || m === "Dm" || m === "D#" || m === "Eb" || m === "E " || m === "Em" || m === "F " || m === "Fm" || m === "F#" || m === "G " || m === "Gm" || m === "G#" || m === "A " || m === "Am" || m === "A#" || m === "Bb" || m === "B " || m === "Bm") {
                                return (<div className='chord'>{line}</div>)
                            } else {
                                return (<div>{line}</div>)
                            }
                        })
                        }
                    </pre>
                </div>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${song.url}`}
                frameborder="0"
                autohide="2"
                style={{ display: vidOn ? "none" : "block" }}>
            </iframe>
            <div className='quickList' style={{ display: quickListOn ? "none" : "block" }}>
                {
                    songsDom.map((s) => {
                        return (<Link to='#' className='link' key={s.id}>
                            <div className='filaSong' onClick={() => enviarSong(s.titulo, s.artista, s.bpm, s.url, s.letra, s.acordes)}>
                                {s.titulo}
                            </div>
                        </Link>
                        )
                    })
                }
                <hr/>
                { 
                
                    songsSab.map((s) => {
                        return (<Link to='#' className='link' key={s.id}>
                            <div className='filaSong' onClick={() => enviarSong(s.titulo, s.artista, s.bpm, s.url, s.letra, s.acordes)}>
                                {s.titulo}
                            </div>
                        </Link>
                        )
                    })
                }

            </div>
            
            <div className="blockButtons">

                <div className="youtube1" onClick={() => setquickListOn(!quickListOn)}><i className="material-icons" id="youtube" ><IconLibrary /></i></div>

                <div onClick={() => { setChordOn(false); localStorage.setItem('chordOn', false) }}><i style={{ borderBottom: chordOn ? 'none' : 'solid' }} className="material-icons" ><IconLetter /></i></div>
                <div onClick={() => { setChordOn(true); localStorage.setItem('chordOn', true) }}><i style={{ borderBottom: chordOn ? 'solid' : 'none' }} className="material-icons" ><IconMusic /></i></div>
                <div><i style={{ color: chordOn ? "#65f32d" : "gray" }} onClick={() => ejecutarBajar()} className="material-icons" ><IconDown /></i></div>
                <div style={{ display: song.bpm ? 'block' : 'none' }}><i className="material-icons" onClick={() => metronome(metro)}><IconMetronome /></i></div>
                <div className="youtube1" onClick={() => setVidOn(!vidOn)}><i className="material-icons" id="youtube" ><IconYoutube /></i></div>


            </div>
        </div>
    </>)
}
export default Content
// 