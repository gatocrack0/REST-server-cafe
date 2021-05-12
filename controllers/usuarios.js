const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    // const { q, nombre = 'No name', apikey} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    // const usuarios = await Usuario.find( query )
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments( query );
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body;
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    res.json(usuario);
}

const usuariosPost = async(req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    // Guardar en BD
    await usuario.save();
    res.status(201).json(usuario);
}

const usuariosPatch =  (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async(req = request, res = response) => {
    const { id } = req.params;
    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}