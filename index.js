var list = 'studentList'
var studentsList = getLocalList(list)

var nombre = document.getElementById('nombre');
var dni = document.getElementById('dni');
var email = document.getElementById('email');
var addStudentButtonNode = document.getElementById('agregar-btn');
var mainListNode = document.getElementById ('mainList');
var deleteDniNode = document.getElementById('dniDelete');
var deleteStudentButtonNode = document.getElementById('btn-eliminar')
deleteStudentButtonNode.onclick = deleteStudent
addStudentButtonNode.onclick = addStudent;
nombre.onblur = validarNombre;
dni.onblur = validarDni;


function validarNombre (event){
    var inputNode = event.target;

    if (typeof inputNode.value == 'string') {
        inputNode.classList.remove('is-invalid')
        inputNode.classList.add('is-valid');
        console.log (inputNode.value);
    } else {
        inputNode.classList.remove('is-valid')
        inputNode.classList.add('is-invalid');
        console.log('invalid input' + inputNode.value);
    }

    validateSubmit()
}

function validarDni (event){
    var inputNode = event.target;

    if (typeof inputNode.value) {
        inputNode.classList.remove('is-invalid')
        inputNode.classList.add('is-valid');
        console.log (inputNode.value)
    } else {
        inputNode.classList.remove('is-valid')
        inputNode.classList.add('is-invalid');
        console.log('dni erroneo: ' + inputNode.value);
    }

    validateSubmit()
}


function validateSubmit () {
    var addStudentButtonNode = document.getElementById('agregar-btn')
    var inputFields = document.getElementsByClassName('is-valid')
    if (inputFields.length === 2) {
        addStudentButtonNode.disabled = false;
        setLocalList ();
    } else {
        addStudentButtonNode.disabled = false;
        setLocalList ();
    }
  }


function getLocalList (key){
    if (typeof key === "string") {
        var localList = localStorage.getItem(key);
        if (localList){
            var listParsed = JSON.parse (localList);
            return listParsed;
        } else {
            return [ ]
        }
    }
}

function setLocalList (key, student){
   if (typeof key ==='string' && Array.isArray(student)){

    var studentString = JSON.stringify(student);

    localStorage.setItem(key, studentString)
   }
}

function addStudent (){
    var firstNameValue = nombre.value;
    var dniValue = dni.value;

    var student = {
        nombre: firstNameValue,
        dni:  dniValue
    }
    studentsList.push(student);
    setLocalList (list, studentsList);
    createStudentNode (student)
}

function createStudentNode (newStudent){

    var liNode = document.createElement('li');
    mainListNode.appendChild(liNode)

    liNode.className = 'list-group-item';

    liNode.id = newStudent.dni;

    liNode.innerHTML = 
    '<h4>' +
    newStudent.nombre +
    '</h4>' +
    '<h5>DNI:' +
    newStudent.dni +
    '</h5><h5>E-mail:' +
    newStudent.email +
    '</h5>'
    return liNode
}

function cargaInicial (studentsList){
    for (i=0; i < studentsList.length; i++){
        var student = studentsList[i];
        createStudentNode(student);
    }
}

cargaInicial(studentsList)


function deleteStudent () {
  var deleteDniValue = deleteDniNode.value

  var index = searchStudent(deleteDniValue, studentsList)

  studentsList.splice(index, 1)

  setLocalList(list, studentsList)
    
  console.log('usuario eliminado: '+deleteDniNode.value )

  var studentDeleted = document.getElementById(deleteDniValue)

  mainListNode.removeChild(studentDeleted)

  deleteDniNode.value = ''

}

function searchStudent (dni, studentsList) {
    var student
  
    for (var i = 0; i < studentsList.length; i++) {
      student = studentsList[i]
      if (dni === student.dni) {
        return i
      }
    }
    return -1
  }
  