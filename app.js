//variables


const mongoose = require('mongoose')
const chalk = require('chalk')

const DB = 'mongose-example'

//Models
const Student = require('./models/Student.js')

// llamar a la base de datos:

const connectToMongo = async () => {
    try {
    await   mongoose.connect(`mongodb://localhost:27017/${DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
})
    console.log(chalk.greenBright   (`Connected to a Mongo`))

    } catch (err){
        console.log(`Error: err`)
    }
}

connectToMongo()



//Create a new document

//CREATE --> Crear un nuevo documento. Para esto, tenemos que aplicar el metodo .create() sobre el modelo en el que queremos crear el documento.

const createStudent = async()=>{
    try{
      const student = await Student.create({
        name: 'Jimena',
        lastName: 'Miranda',
        age: 7,
        grades: [8, 9, 6, 5, 8],
        class: 'B',
        pendingBills: true
      })
      console.log(student)
    }catch(err){
      console.log('ERROR: ', err)
    }
  
  }
  
//   createStudent()

  //READ:

  //.find() --> Recibe como primer argumento los parámetros del filtro y segundo argumento los parámetros del Project
  const findStudent = async ()=>{
      try {
          const students = await Student.find({age:10}, {name: 1, lastName: 1})  //{name: 1, lastName: 1}, {sort: {lastName: 1}, limit: 20})  ESTE SERÍA EL TERCER ARGUMENTO, DONDE PODEMOS AGREGAR LAS DEMÁS OPCIONES DE SORT-LIMIT...
          console.log(students)
      }catch(err){
          console.log('ERROR: ', err)
      }
  }
//findStudent()

// .findByID() --> Busca un documento por su ID 
  const findStudentById = async (id)=>{
    try{
      const student = await Student.findById(id)
      console.log(student)
    }catch(err){
      console.log('ERROR: ', err)
    }
    
  }
//   findStudentById("618e432dea2fd8235ddfacba")


//.find()
//.findOne()
//.findById()


//UPDATE

//.findOneAndUpdate() Recibe como primer argumento el filter del documento que quiero editar, y segundo argumento lo que quiero editar (puede ser uno o más) y tercer argumento {new: true} para que se actualice el documento

const updateStudent = async ()=>{
    try{
        const updatedStudent = await Student.findOneAndUpdate({name: 'Jaime'}, {pendingBills: false, name: "Juan"}, {new: true})
        console.log(updatedStudent)
    }catch(err){
        console.log("error", err)
    }
}
//updateStudent()
//{"grades.0": 100}, //Para acceder a un array dentro de Mongo, hay que hacerlo con un . y poner todo el query entre comillas

//.findByIdAndUpdate()
const updateStudentById = async (id)=>{
    try{
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {age: 5},
        {new: true}
      )
  
      console.log(updatedStudent)
    }catch(err){
      console.log(err)
    }
  }
  
  //updateStudentById("618e3d520009f850d2654a76")

  //DELETE

  // .findOneAndDelete()

  const deleteOneStudent = async ()=>{
    try{
      const response = await Student.findOneAndDelete({name: "Andrea"}) //Elimina al primer alumno que encuentres que se llame Andrea
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }
  
  // deleteOneStudent()
  
  
  // .deleteMany()
  const deleteManyStudents = async ()=>{
    try{
      const response = await Student.deleteMany({name: "Andrea"}) //Elimina a todos los alumnos que se llaman Andrea
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }
  
  deleteManyStudents()

  // .findByIdAndDelete()

const deleteStudentById = async (id)=>{
    try{
      const deletedStudent = await Student.findByIdAndDelete(id, {new: true})
      console.log(deletedStudent)
    }catch(err){
      console.log(err)
    }
  }
  
  //deleteStudentById("618e42f5061995ffab4f2a31")

