const express = require('express');
const path = require('path');
const router = express.Router();
const AdminBD = require('../bd/AdminBD');
const bcrypt = require('bcryptjs');
const checkAdmin = require(path.resolve(__dirname, '../middleware/checkAdmin'));

const adminBD = new AdminBD();

// Ruta para mostrar el panel de administración
router.get('/admin', checkAdmin, (req, res) => {
    res.render('admin/dashboard');
});

// Ruta para gestionar administradores
router.get('/admin/usuarios', checkAdmin, async (req, res) => {
    try {
        const admins = await adminBD.obtenerTodos();
        res.render('admin/usuarios', { admins });
    } catch (err) {
        res.status(500).send('Error al obtener administradores');
    }
});

// Ruta para editar administrador
router.post('/admin/administradores/editar/:id', checkAdmin, async (req, res) => {
    const id = req.params.id;
    const datosActualizados = req.body;
    try {
        await adminBD.actualizar(id, datosActualizados);
        res.redirect('/admin/usuarios');
    } catch (err) {
        res.status(500).send('Error al actualizar administrador');
    }
});

// Ruta para eliminar administrador
router.post('/admin/administradores/eliminar/:id', checkAdmin, async (req, res) => {
    const id = req.params.id;
    try {
        await adminBD.eliminar(id);
        res.redirect('/admin/usuarios');
    } catch (err) {
        res.status(500).send('Error al eliminar administrador');
    }
});

// Ruta para registrar administrador
router.get('/registro-admin', (req, res) => {
    res.render('registro-admin');
});

router.post('/registro-admin', async (req, res) => {
    const { nombre, contrasena, celular, correo } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    try {
        await adminBD.crearAdmin({ nombre, contrasena: hashedPassword, celular, correo });
        res.redirect('/inicio-sesion-admin');
    } catch (err) {
        res.status(500).send('Error al registrar administrador');
    }
});

// Ruta para iniciar sesión de administrador
router.get('/inicio-sesion-admin', (req, res) => {
    res.render('inicio-sesion-admin');
});

router.post('/inicio-sesion-admin', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const admin = await adminBD.obtenerPorCorreo(correo);
        if (admin && await bcrypt.compare(contrasena, admin.contrasena)) {
            req.session.user = admin;
            res.redirect('/admin');
        } else {
            res.send('Correo o contraseña incorrectos');
        }
    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

module.exports = router;
