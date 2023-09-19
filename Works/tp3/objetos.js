var personaEjemplo = {
    "apellido": "Perez",
    "nombre": "Juan",
    "edad": 20,
    "documento": 12345
};

/**
 * 01 - crearPersona
 * 
 * Recibe
 * - `nombre`: string, con el nombre
 * - `apellido`: string, con el apellido
 * - `edad`: numero entero, con la edad de la persona
 * - `documento`: numero entero, con el documento de la persona
 * 
 * Retorna: 
 * - un objeto, representando una persona, con los campos recibidos.
 * 
 * Ejemplos:
 * - crearPersona("Juan", "Pérez", 20, 123456)
 * {
 *   nombre: "Juan",
 *   apellido: "Pérez",
 *   edad: 20,
 *   documento: 123456,
 * }
 */

function crearPersona(paramNombre, apellido, edad, documento) {

    let personaNueva = {
        "nombre": paramNombre,
        apellido: apellido,
        edad,
        documento,

    };

    return personaNueva
}

console.log("crearPersona()", crearPersona("Juan", "Pérez", 20, 123456));


/**
 * 02 - nombreCompletoDePersona
 * 
 * Recibe
 * - `persona`: objeto de la forma persona
 * 
 * Retorna: 
 * - un string, con el nombre completo de una persona. Asumimos que nombre completo tiene el formato "Apellido, Nombre". Por ejemplo para una persona con nombre "Juan" y apellido "Pérez", el nombre completo sería "Pérez, Juan".
 */

function nombreCompletoDePersona(persona) {

    let nombreCompleto = persona.apellido + ", " + persona.nombre;
    return nombreCompleto;

}

console.log("nombreCompletoDePersona()", nombreCompletoDePersona(personaEjemplo));


/**
 * 03 - felizCumpleaños
 * 
 * Recibe
 * - `persona`: objeto de la forma persona
 * 
 * Retorna: 
 * - un objeto, representando a la misma persona recibida, pero con un año más. 
 */

function felizCumpleaños(persona) {

    let personaNueva = Object.assign({}, persona);
    personaNueva.edad++;

    return personaNueva;

}

console.log("felizCumpleaños()", felizCumpleaños(personaEjemplo));


/**
 * 04 - sinDocumento
 * 
 * Recibe
 * - `persona`: objeto de la forma persona
 * 
 * Retorna: 
 * - un objeto, representando a la misma persona recibida, pero sin el campo documento.
 */

function sinDocumento(persona) {

    let personaNueva = Object.assign({}, persona);
    delete personaNueva.documento;

    return personaNueva;
    
}

console.log("sinDocumento()", sinDocumento(personaEjemplo));
