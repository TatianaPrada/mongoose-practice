const express = require('express')
const app = express()
const chalk = require('chalk')
const mongoose = require('mongoose')
const DB = 'mongose-example'
const PORT = 3000


//Models // acceso al modelo de students
const Student = require('./models/Student.js')


// llamar a la base de datos MONGODB:

const connectToMongo = async () => {
    try {
    await   mongoose.connect(`mongodb+srv://Tatiana-Prada:contrasenha123@cluster0.gyfv1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
})
    console.log(chalk.greenBright   (`Connected to Mongo`))

    } catch (err){
        console.log(`Error: err`)
    }
}
connectToMongo()

// //Middleware for the view engine HBS

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")


//Middleware for the public
app.use(express.static('public'));

//Middleware for body-parser

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }))

//VIEWS ROUTES

app.get('/', (req, res)=>{
    res.render('home.hbs')
  })
  
  app.get('/all-students', async (req, res)=>{
    console.log(req.query)
    //const allStudents = await Student.find({}) //--->> muestra el 'filter' del modelo de la base de datos
    const allStudents = await Student.find({}, {name: 1, lastName: 1})
    //console.log(allStudents)
    res.render('allStudents.hbs', {allStudents}) //---> primer argumento el archivo de la vista, segundo argumento el objeto literal, de la info que quiero que muestre
  })

// app.get('/student/:id', async (req, res)=>{
//     const studentInfoFromDatabase = await Student.findById(
//         req.params.id)
       
//     console.log(studentInfoFromDatabase)
//     res.render('student.hbs', studentInfoFromDatabase)
// 
// })

app.get('/student/:id', async (req, res)=>{

  try {
    const studentInfoFromDatabase = await Student.findById(
      req.params.id,
      {name: 1, lastName: 1, age: 1, class: 1, idioma: 1}
    )
    res.render('student.hbs', studentInfoFromDatabase)
  }catch(err){
    res.render('error.hbs', {errorMsg: "El ID proporcionado no corresponde con ningún alumno."})
  }
})

//new student
app.get('/new-student', (req, res)=>{
  res.render('newStudent.hbs')
})

app.post('/new-student', async (req, res)=>{     //Post creado mediante axios en script.js
  //console.log(req.body)     // si arroja undefined, es porque no hay un middleware para body-parser
  try{
    const createdStudent = await Student.create(req.body)
    console.log(createdStudent)
    // res.redirect('/all-students')
  }catch(err) {
    console.log(err)
  }
})

//SERVER LISTENER

app.listen(PORT, ()=>{
    console.log(chalk.bgMagenta(`Server open at PORT ${PORT}`))
  })