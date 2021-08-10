// const Role = require('../models/role');
// const Usuario = require('../models/usuario');
// const Categoria = require('../models/categoria');
// const Producto = require('../models/producto');

const { Role, Usuario, Categoria, Producto } = require('../models')


const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const correoExiste = async(correo) => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        throw new Error(`El correo ${ correo } ya existe en la BD`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ) {
        throw new Error(`El id ${ id } no existe`);
    }
}

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById( id );
    if( !existeCategoria ) {
        throw new Error(`El id ${ id } no existe`);
    }
}

const categoriaExiste = async(categoria) => {
    const existeCategoria = await Categoria.findOne({ categoria });
    if( existeCategoria ) {
        throw new Error(`La categoria ${ categoria } ya existe en la BD`);
    }
}

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById( id );
    if( !existeProducto ) {
        throw new Error(`El id ${ id } no existe`);
    }
}

/* Validar colecciones permitidas */
const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida - ${colecciones}`);
    }
    return true;
}


module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    categoriaExiste,
    existeProductoPorId,
    coleccionesPermitidas
}