import React, { useState } from 'react'
import { downHalfTone } from './functions'
import useSound from 'use-sound'
import click1 from '../styles/sounds/click1.mp3'
import IconHome from './icons/IconHome'
import IconMusic from './icons/IconMusic'
import IconLetter from './icons/IconLetter'
import IconDown from './icons/IconDown'
import IconYoutube from './icons/IconYoutube'
import IconMetronome from './icons/IconMetronome'



const Content = () => {
    let chordOnInit = localStorage.getItem('chordOn')
    const [song] = useState(JSON.parse(localStorage.getItem('song')))
    const [chordOn, setChordOn] = useState(chordOnInit)
    const [metro, setMetro] = useState(true)
    const [idTimer, setIdTimer] = useState(null)
    const [vidOn, setVidOn] = useState(true)


    
    const songArray = song.letra.split(['\n\n'])
    const acordeArray = song.acordes.split(['\n'])
    let son = null
    const [play] = useSound(click1)
    let widthW = window.screen.width
    
    

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
                    <div>
                        <div ><b>{song.titulo}</b></div>
                    </div>
                </div>
                <div className='vidRight'>
                    <div ><small>{song.artista}  </small></div>
                    <div><small><small>{song.bpm ? `${song.bpm} bpm` : ""}</small></small></div>

                </div>
            </div>
                <iframe
                    width={widthW}
                    height="70px"
                    src={`https://www.youtube.com/embed/${song.url}`}
                    frameborder="0"
                    autohide="2"
                    fs="0"
                    style={{ display: vidOn ? "none" : "block" }}>
                </iframe>

            
            <div className="contentArea" style={{ height: '100%' }}>
                <div className="contentLetra" style={{ display: chordOn ? "none" : "block" }}>
                    <pre>
                        {songArray.map((r) => {

                            if (r.substr(0, 4) === 'CORO') {
                                return (<div><b>{r.slice(5)}</b> <br /> </div>)
                            }
                            return (<div>{r} <br /> </div>)
                        })}
                    </pre>
                </div>
                <div className="contentAcordes" style={{ display: chordOn ? "block" : "none" }}>
                    <pre>
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
            
            <div className="blockButtons">

                <div  ><i className="material-icons" onClick={() => { clearInterval(idTimer); window.history.back() }}><IconHome /></i></div>
                <div onClick={() => {setChordOn(false);localStorage.setItem('chordOn',false)}}><i style={{ borderBottom: chordOn ? 'none' : 'solid' }} className="material-icons" ><IconLetter/></i></div>
                <div onClick={() => {setChordOn(true);localStorage.setItem('chordOn',true)}}><i style={{ borderBottom: chordOn ? 'solid' : 'none' }} className="material-icons" ><IconMusic/></i></div>
                <div><i style={{ color: chordOn ? "#65f32d" : "gray" }} onClick={() => ejecutarBajar()} className="material-icons" ><IconDown/></i></div>
                <div style={{ display: song.bpm ? 'block' : 'none' }}><i className="material-icons" onClick={() => metronome(metro)}><IconMetronome/></i></div>
                <div onClick={() => setVidOn(!vidOn)}><i className="material-icons" ><IconYoutube/></i></div>
                

            </div>
        </div>
    </>)
}
export default Content