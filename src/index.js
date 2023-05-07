const express = require('express') 
const morgan = require('morgan')

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//RUTAS:
app.get('/',(req,res)=>{
    res.json({
        "titulo":"Hola"
    })
})

app.post("/mutant",(req,res)=>{

    // "A T G C G A",
    // "C A G T G C",
    // "T T A T G T",
    // "A G A A G G",
    // "H C C C T A",
    // "T C A C T G"


    const data = req.body;
    
    const d = data.dna

    function verificarDNA(data) {
    const regex = /(.)\1{3}/; // Expresión regular para encontrar cuatro letras iguales

    // Comprueba la secuencia horizontalmente
    for (let i = 0; i < data.length; i++) {
        if (regex.test(data[i])) {
        return true;
        }
    }

    // Comprueba la secuencia verticalmente
    for (let j = 0; j < data[0].length; j++) {
        let col = '';
        for (let i = 0; i < data.length; i++) {
        col += data[i][j];
        }
        if (regex.test(col)) {
        return true;
        }
    }

    // Comprueba la secuencia diagonalmente (izquierda a derecha)
    for (let i = 0; i < data.length - 3; i++) {
        for (let j = 0; j < data[0].length - 3; j++) {
        let diagonal = '';
        for (let k = 0; k < 4; k++) {
            diagonal += data[i+k][j+k];
        }
        if (regex.test(diagonal)) {
            return true;
        }
        }
    }

    // Comprueba la secuencia diagonalmente (derecha a izquierda)
    for (let i = 0; i < data.length - 3; i++) {
        for (let j = data[0].length - 1; j >= 3; j--) {
        let diagonal = '';
        for (let k = 0; k < 4; k++) {
            diagonal += data[i+k][j-k];
        }
        if (regex.test(diagonal)) {
            return true;
        }
        }
    }

    // Si no se encuentra ninguna secuencia, devuelve falso
    return false;
    }



    res.send(verificarDNA(d))
})



app.listen(app.get('port'),()=>{
    console.log(`Serivdor en el puerto ${3000}`)
})