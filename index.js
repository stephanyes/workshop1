//Nombre
var inputName = document.getElementById('inputName');

inputName.onblur = showMessage1;

function showMessage1(event){
  var inputNode1 = event.target;

  console.log(inputNode1.value);

  if (!validateName(inputNode1.value)) {
    inputNode1.classList.remove('is-valid');
    inputNode1.classList.add('is-invalid');
  } else {
    inputNode1.classList.remove('is-invalid');
    inputNode1.classList.add('is-valid');
  }
}


function validateName (name) {
  var re1= /^([a-zA-Z ]){2,30}$/;
  return re1.test(String(name).toLowerCase());
}

//Apellido
var inputApellido = document.getElementById('inputApellido');

inputApellido.onblur = showMessage3;

function showMessage3(event){
  var inputNode3 = event.target;

  console.log(inputNode3.value);

  if (!validateApellido(inputNode3.value)) {
    inputNode3.classList.remove('is-valid');
    inputNode3.classList.add('is-invalid');
  } else {
    inputNode3.classList.remove('is-invalid');
    inputNode3.classList.add('is-valid');
  }
}


function validateApellido (apellido) {
  var re3= /^([a-zA-Z ]){2,30}$/;
  return re3.test(String(apellido).toLowerCase());
}



// if (dniNode.value && dni.value >  0  &&  !(checkDnirepeat(dniNode.value))) {
//     inputDni.classList.remove('is-invalid')
//     inputDni.classList.add('is-valid')
//     dniOK = true;
//     if (mailOK === true && dniOK === true && firstNameOK === true) {
//         document.getElementById('addStudent').disabled = false;
//     }
// } else {
//     inputDni.classList.remove('is-valid')
//     inputDni.classList.add('is-invalid')
// }
// }


//DNI
var inputDni = document.getElementById('inputDni');

inputDni.onblur = showMessage2;

function showMessage2(event){

  var inputNode2 = event.target;

  console.log(inputNode2.value);

  if (!validateDni(inputNode2.value)) {
    inputNode2.classList.remove('is-valid');
    inputNode2.classList.add('is-invalid');
  } else {
    inputNode2.classList.remove('is-invalid');
    inputNode2.classList.add('is-valid');
  }
}

function validateDni (dni) {
  var re2= /^[0-9]{8}$/;
  return re2;
}


//Deshabilita el boton
document.getElementById('submitButton').disabled = true;

//Valida el DNI y habilita el boton una vez que el DNI esta habilitado
document.getElementById("inputDni").addEventListener("keyup", function() {
  var nameInput = document.getElementById('inputDni').value;

  if (nameInput != "") {
    document.getElementById('submitButton').removeAttribute("disabled");
  } else {
    document.getElementById('submitButton').setAttribute("disabled", null);
  }
});


//Email
//Con jQuery
var inputEmail = $('#inputEmail');
inputEmail.blur(function(){
  var emailNode = $(this);
  if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailNode.val())){
    inputEmail.addClass('is-valid');
  } else {
    inputEmail.addClass('is-invalid');
  }
});


// var inputEmail = document.getElementById('inputEmail');
//
// inputEmail.onblur = showMessage;
//
// function showMessage(event){
//   var inputNode = event.target;
//
//   console.log(inputNode.value);
//
//   if (!validateEmail(inputNode.value)) {
//     inputNode.classList.remove('is-valid');
//     inputNode.classList.add('is-invalid');
//   } else {
//     inputNode.classList.remove('is-invalid');
//     inputNode.classList.add('is-valid');
//   }
// }
//
//
// function validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }



//Agrega el alumno ingresado en el FORM y lo manda al local storage
var submitButton = document.getElementById("submitButton");
submitButton.onclick = studentAdd;

function studentAdd() {
    var studentFirstName = document.getElementById("inputName");
    var studentLastName = document.getElementById("inputApellido");
    var studentDni = document.getElementById("inputDni");
    var studentEmail = document.getElementById("inputEmail");

    saveStudentList(
        studentFirstName.value,
        studentLastName.value,
        studentDni.value,
        studentEmail.value
    );
}

function saveStudentList(firstName, lastName, dni, email) {
    var studentsList = [];

    if (localStorage.getItem('students')) {
        studentsList = JSON.parse(localStorage.getItem('students'));
    }

    studentsList.push(new Students(firstName, lastName, dni, email));

    var studentsJson = JSON.stringify(studentsList);

    localStorage.setItem('students', studentsJson);
}

function Students(firstName, lastName, dni, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.email = email;
}





//Llevar la info de localStorage al Listado de alumnos

if (localStorage.getItem('students')) {
  var nuevalista = JSON.parse(localStorage.getItem('students'));
  for ( var i = 0; i < nuevalista.length; i++){

    var newListStudent = document.createElement('li');

    var studenth1 = document.createElement('h1');
    studenth1.textContent = nuevalista[i].firstName + ' ' + nuevalista[i].lastName ;
    var studenth3 = document.createElement('h3');
    studenth3.textContent = "DNI: " +  nuevalista[i].dni;

    var studentP = document.createElement('p');
    studentP.textContent = nuevalista[i].email;

    newListStudent.append(studenth1);
    newListStudent.append(studenth3);
    newListStudent.append(studentP);


    document.getElementById("studentListAdd").append(newListStudent);


    console.log(nuevalista[i]);

  }
} else {
  console.log("No hay alumnos en sistema");
}




// Buscar algo en localStorage y borrarlo
var deleteStudent = document.getElementById("deleteStudent");
deleteStudent.onclick = borrarAlumno;

// //Tengo que verificar que el DNI esta y si esta que elimine solo a ese del LocalStorage.
function borrarAlumno() {

      if (localStorage.getItem("students")) {

        var deleteDni = document.getElementById('deleteDni').value;

        var eliminarDni = JSON.parse(localStorage.getItem('students'));

        if (localStorage.getItem("students") === "[]"){
          alert("No hay alumnos en la base de datos");

        }
        // if ( deleteDni === '') {
        //   alert("Ingrese el DNI del Alumno a eliminar");
        //
        // }

        if (localStorage.getItem('students') !== deleteDni ){
          alert("Esta persona no se encuentra en la base de datos");
        }




        for ( var i = 0; i < eliminarDni.length; i++){

          if (eliminarDni[i].dni === deleteDni ) {

            eliminarDni.splice(i,1);
            var dniJson = JSON.stringify(eliminarDni);
            localStorage.setItem('students', dniJson);
            alert("Alumno " + deleteDni + " fue eliminado de la base de datos");

        }
      }


    }
}



//Buscar Alumno y agregarlo en forma de LI
var findStudent = document.getElementById('findStudent');
findStudent.onclick = findStudentData;

function findStudentData() {
  if (localStorage.getItem('students')){

    var search = document.getElementById('searchStudent').value;
    var searchJson = JSON.parse(localStorage.getItem('students'));


    if (localStorage.getItem("students") === "[]"){
      alert("No hay alumnos en la base de datos");

    } else if (search === ""){
        alert("Ingrese el nombre del Alumno a buscar");
      }

      for ( var i = 0; i < searchJson.length; i++) {

          if (searchJson[i].firstName === search){

              var studentFound = document.createElement('li');

              var studenth1 = document.createElement('h1');
              studenth1.textContent = searchJson[i].firstName + ' ' + searchJson[i].lastName;
              var studenth3 = document.createElement('h3');
              studenth3.textContent = "DNI: " + searchJson[i].dni;

              studentFound.append(studenth1);
              studentFound.append(studenth3);

              document.getElementById("studentSearch").append(studentFound);

          }



      }



  }

}

























//Para Eliminar Alumno con DNI


//Deshabilito el boton Eliminar Alumno
// document.getElementById('deleteStudent').disabled = true;

// var deleteDni = document.getElementById('deleteDni');
// deleteDni.onblur = showMessage2;
//
// function showMessageD(event){
//
//   var eliminateDNI = event.target;
//
//   console.log(eliminateDNI.value);
//
//   if (!validateDni2(eliminateDNI.value)) {
//     eliminateDNI.classList.remove('is-valid');
//     eliminateDNI.classList.add('is-invalid');
//   } else {
//     eliminateDNI.classList.remove('is-invalid');
//     eliminateDNI.classList.add('is-valid');
//
//   }
// }
//
// function validateDni2 (dni) {
//   var re2= /^[0-9]{8}$/;
//   return re2.test(String(dni));
// }


// document.getElementById("deleteDni").addEventListener("keyup", function() {
//   var dni = document.getElementById('deleteDni').value;
//   if (dni != "") {
//     document.getElementById('deleteStudent').removeAttribute("disabled");
//   } else {
//     document.getElementById('deleteStudent').setAttribute("disabled", null);
//   }
// });
