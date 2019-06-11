var list = 'studentList'
var studentsList = getLocalList(list)

var nombre = document.getElementById('nombre');
var dni = document.getElementById('dni');
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
        console.log ('todo bien');
    } else {
        inputNode.classList.remove('is-valid')
        inputNode.classList.add('is-invalid');
        console.log('todo mal');
    }

    validateSubmit()
}

function validarDni (event){
    var inputNode = event.target;
    

    if (inputNode.value > 0) {
        inputNode.classList.remove('is-invalid')
        inputNode.classList.add('is-valid');
        console.log ('todo bien')
    } else {
        inputNode.classList.remove('is-valid')
        inputNode.classList.add('is-invalid');
        console.log('todo mal');
    }

    validateSubmit()
}


function validateSubmit () {
    var addStudentButtonNode = document.getElementById('agregar-btn')
    var inputFields = document.getElementsByClassName('is-valid')
    if (inputFields.length === 2) {
        addStudentButtonNode.disabled = true;
        setLocalList();
    } else {
        addStudentButtonNode.disabled = true;
        setLocalList();
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
    '<h3>' +
    newStudent.nombre +
    ' ' +
    newStudent.lastName +
    '</h3>' +
    '<h4>DNI:' +
    newStudent.dni +
    '</h4><p>E-mail:' +
    newStudent.email +
    '</p>'
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
    
  var studentDeleted = document.getElementById(deleteDniValue)

  console.log(studentDeleted)

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



  