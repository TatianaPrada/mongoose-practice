const express = require('express')
const app = express()
const chalk = require('chalk')
const mongoose = require('mongoose')
const DB = 'mongose-example'
const PORT = 3500

//Models // acceso al modelo de students
const Student = require('./models/Student.js')


// llamar a la base de datos MONGODB:

const connectToMongo = async () => {
    try {
    await   mongoose.connect(`mongodb+srv://Tatiana-Prada:contrasenha123@cluster0.gyfv1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
})
    console.log(chalk.greenBright   (`Connected to a Mongo`))

    } catch (err){
        console.log(`Error: err`)
    }
}
connectToMongo()

// //Middleware for the view engine HBS

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

//VIEWS ROUTES

app.get('/', (req, res)=>{
    res.render('home.hbs')
  })
  
  app.get('/all-students', async (req, res)=>{
    //const allStudents = await Student.find({}) //--->> muestra el 'filter' del modelo de la base de datgos
    const allStudents = await Student.find({}, {name: 1, lastName: 1})
    console.log(allStudents)
    res.render('allStudents.hbs', {allStudents}) //---> primer argumento el archivo de la vista, segundo argumento el objeto literal, de la info que quiero que muestre
  })

app.get('/student/:id', async (req, res)=>{
    const studentInfoFromDatabase = await Student.findById(
        req.params.id)
        // {name: 1, lastName: 1, age: 1, class: 1, idioma: 1})
       // const prueba = {...studentInfoFromDatabase, prueba: studentInfoFromDatabase.language}
    console.log(studentInfoFromDatabase)
    res.render('student.hbs', studentInfoFromDatabase)
})

//SERVER LISTENER

app.listen(PORT, ()=>{
    console.log(chalk.bgMagenta(`Server open at PORT ${PORT}`))
  })