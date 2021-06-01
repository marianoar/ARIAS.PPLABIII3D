import {Anuncio} from "./anuncio.js";


export function Anuncio_Auto(id, titulo, transaccion, descripcion, precio, puertas, km, potencia){

  Anuncio.call(this, id, titulo, transaccion, descripcion, precio,); // hereda

  this.puertas = puertas;
  this.km = km;
  this.potencia = potencia;

 }