import { Anuncio_Auto } from "./anuncio_auto.js";

const elementoContenedor = document.getElementById("divLista");
//const select=document.getElementsByTagName('select')[0];

//const select=document.getElementById('selectTransaccion');
const delay = 1000;
let anuncios = [];
let boton = null;

//const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
//PROBLEMAS: no pude hacer que el select funcione con otro evento, 
window.addEventListener("DOMContentLoaded", () => {

  getAnuncios();

  document.forms[0].addEventListener("submit", HandlerSubmit);

  //select.addEventListener("click",HandlerChange);
  //console.log(data);
  document.addEventListener("click", HandlerClick);



  
 // document.addEventListener("onChange", HandlerChange);
  // if (anuncios.length > 0) {
  //   HandlerLoadList( anuncios);
  // }

});

function HandlerChange(e) {
  e.preventDefault();
  // alert("algo");
  //let elemento=document.getElementsByTagName('select')[0];
  //elemento.addEventListener("onchange",HandlerChange )

  console.log(select.id);

  let seleccion = select.value;
  if (seleccion != "Todos") {
    const filter = anuncios.filter(e => e.transaccion === seleccion);
    console.log(filter);
   // CalculoPromedio(filter);
  
    agregarSpinner();
    setTimeout(() => {
      HandlerLoadList(filter);
      eliminarSpinner();
    }, delay);

    let aux = document.getElementById("promedio").value=CalculoPromedio(filter);
    //aux.innerHTML="ALGO";//CalculoPromedio(filter);
    
  }
  else {
    getAnuncios();
    let aux = document.getElementById("promedio").value=CalculoPromedio(anuncios);
  }
}

function CalculoPromedio(obj){
  
  const mapeadoPrecio = obj.map(e => e.precio);
  console.log(mapeadoPrecio);
  const reduce = mapeadoPrecio.reduce((prev, next) => Number(prev) + Number(next));
  console.log(reduce);
  return reduce;
}
function HandlerSubmit(e) {
  e.preventDefault();
  //console.log(e.target);

  const frm = e.target;

  if (frm.id.value) {
    const modificoAnuncio = new Anuncio_Auto(
      parseInt(frm.id.value), frm.titulo.value, frm.transaccion.value,
      frm.descripcion.value, frm.precio.value, frm.puertas.value, frm.km.value, frm.potencia.value);

    agregarSpinner();

    setTimeout(() => {
      updateAnuncio(modificoAnuncio);
      eliminarSpinner();
    }, delay
    );

    frm.id.value = "";
  } else {
    const nuevoAnuncio = new Anuncio_Auto(Date.now(), frm.titulo.value, frm.transaccion.value,
      frm.descripcion.value, frm.precio.value, frm.puertas.value, frm.km.value, frm.potencia.value);

    agregarSpinner();
    setTimeout(() => {
      altaAnuncioCar(nuevoAnuncio);
      eliminarSpinner();
    }, delay
    );


  }
  limpiarForm(frm);
}

function HandlerClick(e) {

  //console.log(data);
  if (e.target.matches("td")) {

    let id = e.target.parentNode.dataset.id;
    CargarForm(id);
  } else if (e.target.matches("#btnDelete")) {
    let id = parseInt(parseInt(document.forms[0].id.value));

     console.log(id);

    if (confirm("¿Desea borrar este anuncio?")) {

     // anuncios.splice(anuncios.findIndex((elemento) => elemento.id == id), 1);

    deleteAnuncio(id);
      agregarSpinner();

      setTimeout(() => {
        HandlerLoadList();
        eliminarSpinner();
      }, delay);
    }

    limpiarForm(document.forms[0]);

    document.getElementById("btnSubmit").value = "Guardar";
    document.getElementById("btnDelete").classList.add("oculto");
  }
}

function CargarForm(id) {

  let Anuncio = null;

  const { titulo, transaccion, descripcion, precio, puertas, km, potencia } = anuncios.filter(p => p.id === parseInt(id))[0];

  const myFrm = document.forms[0];
  myFrm.titulo.value = titulo;
  myFrm.transaccion.value = transaccion;
  myFrm.descripcion.value = descripcion;
  myFrm.precio.value = precio;
  myFrm.puertas.value = puertas;
  myFrm.km.value = km;
  myFrm.potencia.value = potencia;
  myFrm.id.value = id;

  const btn = document.getElementById("btnSubmit").value = "Modificar";

  document.getElementById("btnDelete").classList.remove("oculto");
}

// function AltaAnuncio(objeto) {
//   anuncios.push(objeto);
//   HandlerLoadList();

//   almacenarDataLocalStorage(anuncios);
// }

// function modificarAnuncio(objeto) {
//   let index = anuncios.findIndex((elemento) => elemento.id == objeto.id);
//   anuncios.splice(index, 1, objeto);
//   almacenarDataLocalStorage(anuncios);
//   HandlerLoadList();
//   document.getElementById("btnSubmit").value = "Guardar";
//   document.getElementById("btnDelete").classList.add("oculto");

// }

// function almacenarDataLocalStorage(data) {
//   localStorage.setItem("anuncios", JSON.stringify(data));
//   // HandlerLoadList();
// }

function setInicio() {
  limpiarForm();
  HandlerLoadList();
}
function limpiarForm(frm) {
  frm.reset();
}

function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/sp.gif");
  spinner.setAttribute("alt", "imagen spinner");

  document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner() {
  document.getElementById("spinner-container").innerHTML = "";
}

function HandlerLoadList(e) {

  renderizarLista(CrearTabla(e), elementoContenedor);
  // const emisor = e.target;
  // emisor.textContent = "eliminar lista";
  //  emisor.removeEventListener("click", HandlerLoadList);
  //  emisor.addEventListener("click",HandlerDeleteList);
}

function CrearTabla(items, contenedor) {
  const tabla = document.createElement("table");
  tabla.appendChild(crearTHead(items[0]));
  tabla.appendChild(crearTBody(items));
  return tabla;
}

function crearTHead(item) {

  const thead = document.createElement("thead");

  const tr = document.createElement("tr");

  // while(item.hasChildNodes){
  for (const key in item) {
    if (key != "id") {

      const th = document.createElement("th");
      th.textContent = key;
      // const txt = document.createTextNode(key);
      tr.appendChild(th);

    }

  }
  thead.appendChild(tr);
  return thead;
}

function crearTBody(items) {
  const tbody = document.createElement("tbody");

  items.forEach(items => {
    const tr = document.createElement("tr");
    for (const key in items) {
      if (key === "id") {
        tr.setAttribute("data-id", items[key]);
      } else {
        const td = document.createElement("td");
        //   td.addEventListener("click", handlerSelector);
        td.textContent = items[key];
        tr.appendChild(td);

      }
    }

    tbody.appendChild(tr);

  });
  return tbody;
}

function renderizarLista(lista, contenedor) {


  while (contenedor.hasChildNodes()) {

    contenedor.removeChild(contenedor.firstChild);
  }

  if (lista) {
    contenedor.appendChild(lista);
  }
}

///////////////////////////////////////////////////////////////////////

const getAnuncios = () => {

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {

    if (xhr.readyState == 4) {

      if (xhr.status >= 200 && xhr.status < 299) {
        anuncios = JSON.parse(xhr.responseText);
        console.log(anuncios);
        HandlerLoadList(anuncios);
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.log(`Error: ${xhr.status} : ${statusText}`);
      }
    } else {
    }
  };

  xhr.open("GET", "http://localhost:3000/anuncios/");
  xhr.send();
};
// const getAnuncios = () => {

//   const xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = () => {

//     if (xhr.readyState == 4) {

//       if (xhr.status >= 200 && xhr.status < 299) {
//         data = JSON.parse(xhr.responseText);
//      //   console.log(data);
//       } else {
//         const statusText = xhr.statusText || "Ocurrio un error";
//         console.log(`Error: ${xhr.status} : ${statusText}`);
//       }
//     } else {
//     }
//   };

//   xhr.open("GET", "http://localhost:3000/anuncios/");
//   xhr.send();
// };

const altaAnuncioCar = (obj) => {

  const xhr = new XMLHttpRequest();
  //document.querySelector(".spinner").appendChild(createSpinner());

  xhr.onreadystatechange = () => {

    if (xhr.readyState == 4) {

      if (xhr.status >= 200 && xhr.status < 299) {
        obj = JSON.parse(xhr.responseText);

      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.log(`Error: ${xhr.status} : ${statusText}`);
      }
      // document.querySelector(".spinner").innerHTML = "";
    } else {

      // document.querySelector(".spinner").appendChild(createSpinner());
    }
  };
  xhr.open("POST", "http://localhost:3000/anuncios/");
  //seteo cabecera MIME types
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
  xhr.send(JSON.stringify(obj));
};


const updateAnuncio= (obj) => {

  const xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = () => {
  
    if (xhr.readyState == 4) {
  
      if (xhr.status >= 200 && xhr.status < 299) {
        //data = JSON.parse(xhr.responseText);
  
      } else {
        const statusText = xhr.statusText || "Ocurrio un error";
        console.log(`Error: ${xhr.status} : ${statusText}`);
      }
      //document.querySelector(".spinner").innerHTML = "";
    } else {
  
     // document.querySelector(".spinner").appendChild(createSpinner());
    }
  };
  xhr.open("PUT", "http://localhost:3000/anuncios/"+obj.id);
  //seteo cabecera MIME types
  xhr.setRequestHeader("Content-Type","application/json;charset=utf-8")
  xhr.send(JSON.stringify(obj));
  };

  
  const deleteAnuncio = (id) => {

    const xhr = new XMLHttpRequest();

    
    xhr.onreadystatechange = () => {
    
      if (xhr.readyState == 4) {
    
        if (xhr.status >= 200 && xhr.status < 299) {
         // data = JSON.parse(xhr.responseText);
    
        } else {
          const statusText = xhr.statusText || "Ocurrio un error";
          console.log(`Error: ${xhr.status} : ${statusText}`);
        }
      } else {
    
      }
    };
    xhr.open("DELETE", "http://localhost:3000/anuncios/"+id);
    //seteo cabecera MIME types
    //xhr.setRequestHeader("Content-Type","application/json;charset=utf-8")
    xhr.send();
    };