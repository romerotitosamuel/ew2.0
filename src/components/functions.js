
export function downHalfTone(content) {
        let bajado = content.replace(/C |Cm |C# |C#m |D |Dm |D# |D#m |Eb |Ebm |E |Em |F |Fm |F# |F#m |G |Gm |G# |G#m |A |Am |A# |A#m |Bb |Bbm |B |Bm /g, (chord) => {
                switch (chord) {
                        case "C ": return "B ";
                        case "Cm ": return "Bm ";
                        case "C# ": return "C ";
                        case "C#m ": return "Cm ";
                        case "D ": return "C# ";
                        case "Dm ": return "C#m ";
                        case "D# ": return "D ";
                        case "D#m ": return "Dm ";
                        case "Eb ": return "D ";
                        case "Ebm ": return "Dm ";
                        case "E ": return "Eb ";
                        case "Em ": return "Ebm ";
                        case "F ": return "E ";
                        case "Fm ": return "Em ";
                        case "F# ": return "F ";
                        case "F#m ": return "Fm ";
                        case "G ": return "F# ";
                        case "Gm ": return "F#m ";
                        case "G# ": return "G ";
                        case "G#m ": return "Gm ";
                        case "A ": return "G# ";
                        case "Am ": return "G#m ";
                        case "A# ": return "A ";
                        case "A#m ": return "Am ";
                        case "Bb ": return "A ";
                        case "Bbm ": return "Am ";
                        case "B ": return "Bb ";
                        case "Bm ": return "Bbm ";
                }
        })
        return (bajado)
}
/*export function downHalfTone(content) {
        let bajado = content.replace(/C |.C |Cm |.Cm |C# |.C# |C#m |.C#m |D |.D |Dm |.Dm |D# |.D# |D#m |.D#m |Eb |.Eb |Ebm |.Ebm |E |.E |Em |.Em |F|.F |Fm |.Fm |F# |.F# |F#m |.F#m |G |.G |Gm |.Gm |G# |.G# |G#m |.G#m |A |.A |Am |.Am |A# |.A# |A#m |.A#m |Bb |.Bb |Bbm |.Bbm |B |.B |Bm |.Bm /g, (chord) => {
                switch (chord) {
                        case "C ": return "B ";
                        case ".C ": return ".B ";
                        case "Cm ": return "Bm ";
                        case ".Cm ": return ".Bm ";
                        case "C# ": return "C ";
                        case ".C# ": return ".C ";
                        case "C#m ": return "Cm ";
                        case ".C#m ": return ".Cm ";
                        case "D ": return "C# ";
                        case ".D ": return ".C# ";
                        case "Dm ": return "C#m ";
                        case ".Dm ": return ".C#m ";
                        case "D# ": return "D ";
                        case ".D# ": return ".D ";
                        case "D#m ": return "Dm ";
                        case ".D#m ": return ".Dm ";
                        case "Eb ": return "D ";
                        case ".Eb ": return ".D ";
                        case "Ebm ": return "Dm ";
                        case ".Ebm ": return ".Dm ";
                        case "E ": return "Eb ";
                        case ".E ": return ".Eb ";
                        case "Em ": return "Ebm ";
                        case ".Em ": return ".Ebm ";
                        case "F ": return "E ";
                        case ".F ": return ".E ";
                        case "Fm ": return "Em ";
                        case ".Fm ": return ".Em ";
                        case "F# ": return "F ";
                        case ".F# ": return ".F ";
                        case "F#m ": return "Fm ";
                        case ".F#m ": return ".Fm ";
                        case "G ": return "F# ";
                        case ".G ": return ".F# ";
                        case "Gm ": return "F#m ";
                        case ".Gm ": return ".F#m ";
                        case "G# ": return "G ";
                        case ".G# ": return ".G ";
                        case "G#m ": return "Gm ";
                        case ".G#m ": return ".Gm ";
                        case "A ": return "G# ";
                        case ".A ": return ".G# ";
                        case "Am ": return "G#m ";
                        case ".Am ": return ".G#m ";
                        case "A# ": return "A ";
                        case ".A# ": return ".A ";
                        case "A#m ": return "Am ";
                        case ".A#m ": return ".Am ";
                        case "Bb ": return "A ";
                        case ".Bb ": return ".A ";
                        case "Bbm ": return "Am ";
                        case ".Bbm ": return ".Am ";
                        case "B ": return "Bb ";
                        case ".B ": return ".Bb ";
                        case "Bm ": return "Bbm ";
                        case ".Bm ": return ".Bbm ";
                }
        })
        return (bajado)
}*/






