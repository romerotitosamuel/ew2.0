import React, { useState, useEffect } from 'react'
import firebaseApp from '../credentials'
import { getFirestore, doc, setDoc, collection, getDocs, orderBy, query, deleteDoc, getDoc } from 'firebase/firestore'
import { downHalfTone } from './functions'
const db = getFirestore(firebaseApp)
//Prueba de guardado
const Lab = () => {

    const ejecutar = (rr) => {
        console.log(rr)
    }

    const [songs, setSongs] = useState([])
    const [visualData, setVisualData] = useState({})
    const [edition, setEdition] = useState(false)
    const [idToUpdate, setIdToUpdate] = useState('')
    const [songArray, setSongArray] = useState([])
    const [acordeArray, setAcordeArray] = useState([])


    const getSongs = async () => {
        const songsSnap = await getDocs(query(collection(db, "canciones"), orderBy("titulo")))

        songsSnap.forEach((ss) => {
            let songData = Object.assign(ss.data(), { id: ss.id })
            setSongs(songs => [...songs, songData])
        })
    }

    const borrarDoc = async (id, titulo, artista) => {
        let confirmacion = window.confirm(`Esta seguro que desea borar la canción ${titulo} de ${artista}`)

        if (confirmacion) {
            await deleteDoc(doc(db, "canciones", id));
        }
        window.location.reload()
    }

    const printVisual = async (visualId) => {
        let visualDataSnap = await getDoc(doc(db, "canciones", visualId))
        let pushed = Object.assign(visualDataSnap.data(), { id: visualId })
        setSongArray(pushed.letra.split(['\n\n']))
        setAcordeArray(pushed.acordes.split(['\n']))
        setVisualData(pushed)
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()

        let titulo = e.target.titulo.value
        let artista = e.target.artista.value
        let bpm = e.target.bpm.value
        let url = e.target.url.value
        let letra = e.target.letra.value
        let acordes = e.target.acordes.value

        const objFromForm = { titulo, artista, bpm, url, letra, acordes }

        if (edition) {
            await setDoc(doc(db, 'canciones', idToUpdate), objFromForm)
            printVisual(idToUpdate)
            document.getElementById("formulario").reset()
            setEdition(false)
        } else {
            await setDoc(doc(collection(db, "canciones")), objFromForm)
            document.getElementById("formulario").reset()
            alert(`Tu canción de ${artista} ha sido creada`)
            window.location.reload()
        }
    }

    const modoEditar = async (id) => {
        let songEditSnap = await getDoc(doc(db, "canciones", id))
        let wr = songEditSnap.data()

        let titulo = document.getElementById('titulo'); titulo.value = wr.titulo
        let artista = document.getElementById('artista'); artista.value = wr.artista
        let bpm = document.getElementById('bpm'); bpm.value = wr.bpm
        let url = document.getElementById('url'); url.value = wr.url
        let letra = document.getElementById('letra'); letra.value = wr.letra
        let acordes = document.getElementById('acordes'); acordes.value = wr.acordes

        setEdition(true)
        printVisual(id)
        setIdToUpdate(id)
    }

    const ejecutarBajar = () => {
        let contenido = document.getElementsByClassName('chord')

        for (let i = 0; i < contenido.length; i = i + 1) {
            console.log(contenido[i].textContent)
            let nuevo = downHalfTone(contenido[i].textContent)
            contenido[i].textContent = nuevo
        }

    }

    useEffect(() => getSongs(), [])

    return (<>
        <div className='labBody'>

            <div className='labList'>
                <h3>Listado</h3>
                {songs.map((s) => {
                    return (<>
                        <div className='listFlex' key={s.id.toString()}>
                            <div className='iconBlock'>
                                <i className="material-icons" onClick={() => printVisual(s.id)}>preview</i>
                                <i className="material-icons" onClick={() => modoEditar(s.id)}>edit</i>
                                <i className="material-icons" onClick={() => borrarDoc(s.id, s.titulo, s.artista)}>delete_outline</i>
                            </div>
                            <div >
                                {s.titulo} <em><small>- {s.artista}</small></em>
                            </div>
                        </div>
                    </>)
                })}
            </div>

            <div className='labShow'>
                <h3>Vista previa   <i className="material-icons" onClick={() => modoEditar(visualData.id)}>edit</i></h3>
                <div className='prevEncabezado'>
                    {visualData.titulo} - <small>{visualData.artista}</small>
                </div>
                <div className='prevContenido'>


                    <pre id='vis'>
                        {acordeArray.map((line) => {
                            const m = line.substr(0, 2)
                            if (m === "In" || m === "So" || m === "Pu" || m === " " || m === "  " || m === "   " || m === "    " || m === "     " || m === "     " || m === "C " || m === "Cm" || m === "C#" || m === "D " || m === "Dm" || m === "D#" || m === "Eb" || m === "E " || m === "Em" || m === "F " || m === "Fm" || m === "F#" || m === "G " || m === "Gm" || m === "G#" || m === "A " || m === "Am" || m === "A#" || m === "Bb" || m === "B " || m === "Bm") {
                                return (<div className='chord'> {line}</div>)
                            } else {
                                return (<div>{line}</div>)
                            }
                        })
                        }

                    </pre>



                    <hr /><br /><hr />
                    <pre>
                        {songArray.map((r) => {

                            if (r.substr(0, 4) === 'CORO') {
                                return (<div><b>{r.slice(5)}</b> <br /> </div>)
                            }
                            return (<div>{r} <br /> </div>)
                        })}
                    </pre>
                </div>
            </div>

            <div className='labEdit'>
                <h4>Crear / Editar</h4>
                <button onClick={() => ejecutar()}>Ejecutar</button>
                <button onClick={() => ejecutarBajar()}>Bajar 1/2 Tono</button>
                <form onSubmit={handlerSubmit} id='formulario'>
                    <div><button type='submit'>{edition ? 'Actualizar' : 'Crear'}</button> </div>
                    <small>Título</small>
                    <input type="text" id='titulo' />
                    <small>Artista</small>
                    <input type="text" id='artista' />
                    <small>BPM</small>
                    <input type="number" id='bpm' />
                    <small>URL</small>
                    <input type="text" id='url' />
                    <small>Letra</small>
                    <textarea id="letra" rows="20"></textarea>
                    <small>Acordes</small>
                    <textarea id="acordes" rows="20"></textarea>
                </form>
            </div>
        </div>
    </>)
}
export default Lab