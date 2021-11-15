const createStudentButton = document.getElementById('create-student-button')

createStudentButton.addEventListener('click', ()=>{
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const age = document.getElementById('age').value
    const classSelect = document.getElementById('class').value
    const idioma = document.getElementById('idioma').value

    const allInputs = {name,lastName, age, class: classSelect,idioma}
    //console.log(allInputs)

    axios ({                        // Necesario para llevar información del front al backend
        method: "POST",
        url: "http://localhost:3000/new-student",
        data: allInputs
    })
})  