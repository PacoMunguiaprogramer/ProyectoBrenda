// bd/AdminBD.js
const ConectarBD = require('./ConexionBD');

class AdminBD {
    constructor() {
        this.db = new ConectarBD();
    }

    async obtenerTodos() {
        await this.db.conectarMySql();
        try {
            const [rows] = await this.db.conexion.query('SELECT * FROM administradores');
            return rows;
        } catch (err) {
            console.error('Error al obtener administradores:', err);
        } finally {
            await this.db.cerrarConexion();
        }
    }

    async crearAdmin(admin) {
        await this.db.conectarMySql();
        try {
            const { nombre, contrasena, celular, correo } = admin;
            await this.db.conexion.query('INSERT INTO administradores (nombre, contrasena, celular, correo) VALUES (?, ?, ?, ?)', [nombre, contrasena, celular, correo]);
        } catch (err) {
            console.error('Error al crear administrador:', err);
        } finally {
            await this.db.cerrarConexion();
        }
    }

    async obtenerPorCorreo(correo) {
        await this.db.conectarMySql();
        try {
            const [rows] = await this.db.conexion.query('SELECT * FROM administradores WHERE correo = ?', [correo]);
            return rows[0];
        } catch (err) {
            console.error('Error al obtener administrador por correo:', err);
        } finally {
            await this.db.cerrarConexion();
        }
    }

    async actualizar(id, datosActualizados) {
        await this.db.conectarMySql();
        try {
            const { nombre, contrasena, celular, correo } = datosActualizados;
            await this.db.conexion.query('UPDATE administradores SET nombre = ?, contraseña = ?, celular = ?, correo = ? WHERE idadministrador = ?', [nombre, contrasena, celular, correo, id]);
        } catch (err) {
            console.error('Error al actualizar administrador:', err);
        } finally {
            await this.db.cerrarConexion();
        }
    }

    async eliminar(id) {
        await this.db.conectarMySql();
        try {
            await this.db.conexion.query('DELETE FROM administradores WHERE idadministrador = ?', [id]);
        } catch (err) {
            console.error('Error al eliminar administrador:', err);
        } finally {
            await this.db.cerrarConexion();
        }
    }
}

module.exports = AdminBD;

