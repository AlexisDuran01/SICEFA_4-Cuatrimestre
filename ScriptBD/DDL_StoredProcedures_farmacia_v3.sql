-- -----------------------------------------------------
-- Artifact:    DDL_StoredProcedures_farmacia_v3.sql
-- Version:     3.0
-- Date:        2023-05-02 12:50:00
-- Author:      Miguel Angel Gil Rios
-- Email:       mgil@utleon.edu.mx
--              angel.grios@gmail.com
-- Comments:    Se agregaron procedimientos almacenados
--              para insertar sucursales y empleados.
-- -----------------------------------------------------
-- USE sicefa;


-- ----------------------------------------------------------------- Inicio de la seccion Sucursal -----------------------------------------------------------------

-- Procedimiento almacenado para insertar una nueva sucursal.
--      Esta operacion implica que, al agregar una nueva sucursal,
--      de forma automatica se agregara un usuario administrador,
--      lo cual implica, la insercion de un empleado y una persona.
DROP PROCEDURE IF EXISTS insertarSucursal;
DELIMITER $$
CREATE PROCEDURE insertarSucursal(/* Datos Sucursal */
                                    IN	var_nombre          VARCHAR(49),    --  1
                                    IN	var_titular         VARCHAR(49),    --  2
                                    IN  var_rfc             VARCHAR(15),    --  3
                                    IN	var_domicilio       VARCHAR(129),   --  4
                                    IN  var_colonia         VARCHAR(65),    --  5
                                    IN  var_codigoPostal    VARCHAR(11),    --  6
                                    IN  var_ciudad          VARCHAR(65),    --  7
                                    IN  var_estado          VARCHAR(49),    --  8
                                    IN	var_telefono        VARCHAR(20),    --  9
                                    IN	var_latitud         VARCHAR(65),    -- 10
                                    IN	var_longitud        VARCHAR(65),    -- 11

                                  /* Parametros de Salida */
                                    OUT  var_idSucursal     INT,            -- 12
                                    OUT  var_idPersona      INT,            -- 13
                                    OUT  var_idUsuario      INT,            -- 14
                                    OUT  var_idEmpleado     INT,            -- 15
                                    OUT  var_codigoEmpleado VARCHAR( 9),    -- 17
                                    OUT  var_nombreUsuario  VARCHAR(33),    -- 17
                                    OUT  var_contrasenia    VARCHAR(33)     -- 18
                                 )
    BEGIN
        DECLARE idUsuarioMax INT;

        -- Comenzamos insertando los datos de la Sucursal:
        INSERT INTO sucursal(nombre, titular, rfc, domicilio, colonia, codigoPostal,
                             ciudad, estado, telefono, latitud, longitud, estatus)
                    VALUES(var_nombre, var_titular, var_rfc, var_domicilio, var_colonia, var_codigoPostal,
                           var_ciudad, var_estado, var_telefono, var_latitud, var_longitud, 1);

        -- Recuperamos el ID de la Sucursal que se genero:
        SET var_idSucursal = LAST_INSERT_ID();

        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);

        -- Generamos el nombre del Usuario Administrador que por default tendra la Sucursal:
        SET idUsuarioMax      = 1 + (SELECT MAX(idUsuario) FROM usuario);
        SET var_nombreUsuario = CONCAT('Admins', idUsuarioMax);
        SET var_contrasenia   = var_nombreUsuario;

        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_nombreUsuario, var_contrasenia, 'ADMS');

        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID();

        -- Insertamos los datos personales:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal,
                             ciudad, estado, telefono, foto)
                    VALUES( CONCAT('Admins_', var_titular), '', '',
                            'O', STR_TO_DATE('01/01/1901', '%d/%m/%Y'),
                            '', '', '', '',
                            '', '', '', '');

        -- Recuperamos el ID de la Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID();

        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal)
                    VALUES(var_codigoEmpleado, NOW(), var_puesto, var_salarioBruto,
                           1, var_idPersona, var_idUsuario, var_idSucursal);
    END
$$
DELIMITER ;

-- ----------------------------------------------------------------- Fin de la seccion Sucursal -----------------------------------------------------------------


-- ----------------------------------------------------------------- Inicio de la seccion producto -----------------------------------------------------------------

/* Procedimiento almacenado para insertar un producto */

DROP PROCEDURE IF EXISTS sp_insertProducto;
DELIMITER //
CREATE PROCEDURE sp_insertarProducto
(IN nombre VARCHAR(180) ,
IN nombreGenerico VARCHAR(200),
IN formaFarmaceutica VARCHAR(100),
IN unidadMedida VARCHAR(25),
IN presentacion VARCHAR(200),
IN  principalIndicacion VARCHAR(255),
IN contraindicaciones VARCHAR(255),
IN concentracion VARCHAR(255),
IN  unidadesEnvase INT,
IN precioCompra FLOAT,
IN  precioVenta FLOAT,
IN codigoBarras VARCHAR(65))
BEGIN

   INSERT INTO producto (nombre,
   nombreGenerico,
   formaFarmaceutica,
   unidadMedida,
   presentacion,
   principalIndicacion,
   contraindicaciones,
   concentracion,
   unidadesEnvase,
   precioCompra,
   precioVenta,
   foto,
   codigoBarras
   )
	VALUES (nombre,
   nombreGenerico,
   formaFarmaceutica,
   unidadMedida,
   presentacion,
   principalIndicacion,
   contraindicaciones,
   concentracion,
   unidadesEnvase,
   precioCompra,
   precioVenta,
   "No disponible",
   codigoBarras);
END;
// DELIMITER ;

/* Procedimiento almacenado para editar un producto */

DROP PROCEDURE IF EXISTS sp_updateProducto;
DELIMITER $$
CREATE PROCEDURE sp_updateProducto 
	(
		IN v_idProducto INT,
		IN v_nombre VARCHAR(180),
		IN v_nombreGenerico VARCHAR(200),
		IN v_formaFarmaceutica VARCHAR(100),
		IN v_unidadMedida VARCHAR(25),
        IN v_presentacion VARCHAR (200),
		IN v_principalIndicacion VARCHAR(255),
		IN v_contraindicaciones VARCHAR(255),
		IN v_concentracion VARCHAR(225),
        IN v_unidadesEnvase INT, 
		IN v_precioCompra FLOAT,
		IN v_precioVenta FLOAT,
		IN v_foto LONGTEXT,
		IN v_rutaFoto VARCHAR(254),
        IN v_codigoBarras VARCHAR(65),
		IN v_estatus INT
	)
	BEGIN 
UPDATE producto SET
            nombre = v_nombre,
            nombreGenerico = v_nombreGenerico,
            formaFarmaceutica = v_formaFarmaceutica,
            unidadMedida = v_unidadMedida,
            presentacion = v_presentacion,
            principalIndicacion = v_principalIndicacion,
            contraindicaciones = v_contraindicaciones,
            concentracion = v_concentracion,
            unidadesEnvase = v_unidadesEnvase,
            precioCompra = v_precioCompra,
            precioVenta = v_precioVenta,
            foto = v_foto,
            rutaFoto = v_rutaFoto,
            codigoBarras = v_codigoBarras,
            estatus = v_estatus
		WHERE idProducto = v_idProducto;
	END;
$$ DELIMITER ;


/* Procedimiento almacenado para eliminar logicamente un producto */

DROP PROCEDURE IF EXISTS sp_deleteProducto;
DELIMITER $$
CREATE PROCEDURE sp_deleteProducto 
	(
		IN v_idProducto INT
	)
	BEGIN 
		UPDATE producto SET estatus = 0
		WHERE idProducto = v_idProducto;
	END;
$$ DELIMITER ;

DROP PROCEDURE IF EXISTS sp_activarProducto;
DELIMITER $$
CREATE PROCEDURE sp_activarProducto
	(
		IN v_idProducto INT
	)
	BEGIN
		UPDATE producto SET estatus = 1
		WHERE idProducto = v_idProducto;
	END;
$$ DELIMITER ;


SELECT COUNT(idProducto) FROM producto;
SELECT * FROM producto WHERE estatus=0;
UPDATE producto
SET estatus = 1
WHERE idProducto;

-- ----------------------------------------------------------------- Fin de la seccion producto -----------------------------------------------------------------


-- ----------------------------------------------------------------- Inicio de la seccion cliente -----------------------------------------------------------------

/* Procedimiento almacenado para insertar un cliente */

DROP PROCEDURE IF EXISTS sp_insertCliente;
DELIMITER $$
CREATE PROCEDURE sp_insertCliente
    (
        -- datos de la persona
        IN v_nombre VARCHAR(45),
        IN v_apellidoPaterno VARCHAR(45),
        IN v_apellidoMaterno VARCHAR(45),
        IN v_genero VARCHAR(2),
        IN v_fechaNacimiento DATE,
        IN v_rfc VARCHAR(15),
        IN v_curp VARCHAR(19),
        IN v_domicilio VARCHAR(129),
        IN v_codigoPostal VARCHAR(11),
        IN v_ciudad VARCHAR(46),
        IN v_estado VARCHAR(40),
        IN v_telefono VARCHAR(20),
        IN v_foto LONGTEXT,
        
        -- datos del cliente
        IN v_email VARCHAR(45)
    )
BEGIN 
    DECLARE v_idPersona INT;
    
    INSERT INTO persona (
        nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, 
        rfc, curp, domicilio, codigoPostal, ciudad, estado, telefono, foto
    )
    VALUES (
        v_nombre, v_apellidoPaterno, v_apellidoMaterno, v_genero, v_fechaNacimiento,
        v_rfc, v_curp, v_domicilio, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_foto
    );
    
    SET v_idPersona = LAST_INSERT_ID();
    
    INSERT INTO cliente (email, fechaRegistro, idPersona)
    VALUES (v_email, NOW(), v_idPersona);
END;
$$ DELIMITER ;

DELIMITER $$

DROP PROCEDURE IF EXISTS sp_updateCliente;
CREATE PROCEDURE sp_updateCliente(
    IN var_idCliente INT,
    IN var_nombre VARCHAR(45),
    IN var_apellidoPaterno VARCHAR(45),
    IN var_apellidoMaterno VARCHAR(45),
    IN var_genero VARCHAR(2),
    IN var_fechaNacimiento DATE,
    IN var_rfc VARCHAR(15),
    IN var_curp VARCHAR(19),
    IN var_domicilio VARCHAR(129),
    IN var_codigoPostal VARCHAR(11),
    IN var_ciudad VARCHAR(46),
    IN var_estado VARCHAR(40),
    IN var_telefono VARCHAR(20),
    IN var_foto LONGTEXT,
    IN var_email VARCHAR(45)
)
BEGIN
    -- Actualizamos los datos de la persona:
    UPDATE persona
    SET nombre = var_nombre,
        apellidoPaterno = var_apellidoPaterno,
        apellidoMaterno = var_apellidoMaterno,
        genero = var_genero,
        fechaNacimiento = var_fechaNacimiento,
        rfc = var_rfc,
        curp = var_curp,
        domicilio = var_domicilio,
        codigoPostal = var_codigoPostal,
        ciudad = var_ciudad,
        estado = var_estado,
        telefono = var_telefono,
        foto = var_foto
    WHERE idPersona = (
        SELECT idPersona
        FROM cliente
        WHERE idCliente = var_idCliente
    );

    -- Actualizamos los datos del cliente:
    UPDATE cliente
    SET email = var_email
    WHERE idCliente = var_idCliente;
END $$

DELIMITER ;

CALL sp_updateCliente(
    1,
    'Luis',         -- Nuevo valor para el nombre
    'Garcia',
    'Ramirez',
    'H',
    '2003-02-10',
    'GARL030210LOS5F',
    'GARL030210HGTRMSA5',
    'Colina del fresno, #210. Colinas de Santa Julia',
    '37530',
    'León',
    'Guanajuato',
    '4771644321',
    '',
    'luisrgr81@gmail.com'
);


SELECT * FROM persona;
SELECT * FROM cliente;
CALL sp_insertCliente('Luis','Garcia','Ramirez','H','2003-02-10','GARL030210LOS5F','GARL030210HGTRMSA5','Colina del fresno, #210. Colinas de Santa Julia','37530','León','Guanajuato','4771644321','','luisrgr81@gmail.com');
-- Registro 1
CALL sp_insertCliente('Juan', 'Pérez', 'López', 'H', '1990-05-15', 'PERJ900515HDFXX', 'PERJ900515HGRXXX02', 'Calle 123, Colonia Centro', '12345', 'León', 'Guanajuato', '1234567890', '9876543210', 'juan.perez@example.com');

-- Registro 2
CALL sp_insertCliente('María', 'González', 'Martínez', 'M', '1985-08-20', 'GONM850820MDFXX', 'GONM850820MGRXXX04', 'Avenida 456, Colonia Norte', '54321', 'León', 'Guanajuato', '9876543210', '1234567890', 'maria.gonzalez@example.com');

-- Registro 3
CALL sp_insertCliente('Carlos', 'Rodríguez', 'Sánchez', 'H', '1982-03-10', 'RODC820310HDFXX', 'RODC820310HGRXXX06', 'Calle Principal, Colonia Sur', '67890', 'León', 'Guanajuato', '3456789012', '2109876543', 'carlos.rodriguez@example.com');

-- Registro 4
CALL sp_insertCliente('Ana', 'López', 'Díaz', 'M', '1995-11-25', 'LOPA951125MDFX', 'LOPA951125MGRXXX08', 'Avenida Secundaria, Colonia Este', '54321', 'León', 'Guanajuato', '6543210987', '7890123456', 'ana.lopez@example.com');

-- Registro 5
CALL sp_insertCliente('Pedro', 'Martínez', 'Hernández', 'H', '1988-07-18', 'MARP880718HDFXX', 'MARP880718HGRXXX10', 'Calle Tranquila, Colonia Oeste', '98765', 'León', 'Guanajuato', '2109876543', '3456789012', 'pedro.martinez@example.com');

-- Registro 6
CALL sp_insertCliente('Laura', 'Sánchez', 'Ramírez', 'M', '1993-01-30', 'SALR930130MDFXX', 'SALR930130MGRXXX12', 'Boulevard Principal, Colonia Poniente', '34567', 'León', 'Guanajuato', '7890123456', '6543210987', 'laura.sanchez@example.com');

-- Registro 7
CALL sp_insertCliente('Miguel', 'Díaz', 'Gómez', 'H', '1984-09-05', 'DIGM840905HDFXX', 'DIGM840905HGRXXX14', 'Calle de la Paz, Colonia Central', '87654', 'Ciudad7', 'Guanajuato', '3456789012', '2109876543', 'miguel.diaz@example.com');

-- Registro 8
CALL sp_insertCliente('Isabel', 'Hernández', 'Juárez', 'M', '1998-12-12', 'HEJI981212MDFXX', 'HEJI981212MGRXXX16', 'Avenida Principal, Colonia Noroeste', '23456', 'León', 'Guanajuato', '6543210987', '7890123456', 'isabel.hernandez@example.com');

-- Registro 9
CALL sp_insertCliente('Ricardo', 'Juárez', 'Ortiz', 'H', '1991-06-08', 'JUOR910608HDFXX', 'JUOR910608HGRXXX18', 'Calle de la Alegria, Colonia Suroeste', '76543', 'Ciudad9', 'Guanajuato', '2109876543', '3456789012', 'ricardo.juarez@example.com');


/*-----------Para encender de nuevo cliente----------*/
UPDATE cliente
SET estatus = 1
WHERE idCliente = 4;

/* Procedimiento almacenado para eliminar un cliente */


DROP PROCEDURE IF EXISTS sp_eliminarCliente;
DELIMITER $$

CREATE PROCEDURE sp_eliminarCliente
    (
        IN v_idCliente INT
    )
BEGIN
    UPDATE cliente
    SET estatus = 0 
    WHERE idCliente = v_idCliente;
END;

$$ DELIMITER ;

CALL sp_eliminarCliente(2);

/* Vista para las tablas cliente y empleado */

DROP VIEW IF EXISTS viewClientes;
CREATE VIEW viewClientes AS 
SELECT idCliente, nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc, curp, domicilio, codigoPostal, ciudad, estado, telefono, foto, email, fechaRegistro, estatus
FROM persona p, cliente c
WHERE p.idPersona = c.idPersona;

SELECT * FROM viewClientes WHERE nombre LIKE "Luis";
SELECT * FROM viewClientes WHERE idCliente = 1;
-- ----------------------------------------------------------------- Fin de la seccion cliente -----------------------------------------------------------------


-- ----------------------------------------------------------------- Inicio de la seccion empleado -----------------------------------------------------------------

 /*Procedimiento Almacenado para generar el codigo de un nuevo empleado*/

DROP PROCEDURE IF EXISTS generarCodigoEmpleado;
DELIMITER $$
CREATE PROCEDURE generarCodigoEmpleado(OUT codigo VARCHAR(8))
	BEGIN
		DECLARE anio INT;
		DECLARE mes VARCHAR(2);
		DECLARE num VARCHAR(4);
		SET anio  = RIGHT(year(now()),2);
		SET mes   = LPAD(RIGHT(month(now()),2), 2, '0');
		SET num   = (SELECT LPAD(MAX(idUsuario) + 1, 4, '0') FROM usuario);
		SET codigo= CONCAT(anio,mes,num);
	END
$$
DELIMITER ;

 /*Procedimiento almacenado para insertar un nuevo Empleado.*/
DROP PROCEDURE IF EXISTS insertarEmpleado;
DELIMITER $$
CREATE PROCEDURE insertarEmpleado(/* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN	var_foto            LONGTEXT,       -- 13

                                  /* Datos del la Sucursal */
                                    IN  var_idSucursal      INT,            -- 14

                                  /* Datos del Usuario    */
                                    IN  var_rol             VARCHAR(10),    -- 15

                                  /* Datos del Empleado */
                                    IN  var_puesto          VARCHAR(25),    -- 16
                                    IN  var_salarioBruto    FLOAT,          -- 17

                                  /* Parametros de Salida */
                                    OUT var_idPersona       INT,            -- 17
                                    OUT var_idUsuario       INT,            -- 18
                                    OUT var_idEmpleado      INT,            -- 19
                                    OUT var_codigoEmpleado  VARCHAR(9)      -- 20
                                 )
    BEGIN
        -- Comenzamos insertando los datos de la Persona:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal,
                             ciudad, estado, telefono, foto)
                    VALUES( var_nombre, var_apellidoPaterno, var_apellidoMaterno,
                            var_genero, STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
                            var_rfc, var_curp, var_domicilio, var_cp,
                            var_ciudad, var_estado, var_telefono, var_foto);

        -- Obtenemos el ID de Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID();

        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);

        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_codigoEmpleado, var_codigoEmpleado, var_rol);
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID();

        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal)
                    VALUES(var_codigoEmpleado, NOW(), var_puesto, var_salarioBruto,
                           1, var_idPersona, var_idUsuario, var_idSucursal);
    END
$$
DELIMITER ;


 /*Procedimiento almacenado para insertar un nuevo Empleado.*/

DROP PROCEDURE IF EXISTS sp_insertEmpleado;
DELIMITER $$
CREATE PROCEDURE sp_insertEmpleado(  /* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN	var_foto            LONGTEXT,       -- 13
                                    
                                  /* Datos del la Sucursal */
                                    IN  var_idSucursal      INT,            -- 14
                                    
                                  /* Datos del Usuario    */
                                    IN  var_rol             VARCHAR(10),    -- 15
                                    
                                  /* Datos del Empleado */  
                                    IN  var_puesto          VARCHAR(25),    -- 16
                                    IN  var_salarioBruto    FLOAT          -- 17
                                 )
    BEGIN
		DECLARE var_idPersona INT;
        DECLARE var_codigoEmpleado VARCHAR(10);
        DECLARE var_idUsuario INT;
        -- Comenzamos insertando los datos de la Persona:
        INSERT INTO persona(nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( var_nombre, var_apellidoPaterno, var_apellidoMaterno, 
                            var_genero, STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
                            var_rfc, var_curp, var_domicilio, var_cp,
                            var_ciudad, var_estado, var_telefono, var_foto);
        
        -- Obtenemos el ID de Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID();
        
        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);
        
        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_codigoEmpleado, var_codigoEmpleado, var_rol);
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID(); 
        
        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal)
                    VALUES(var_codigoEmpleado, NOW(), var_puesto, var_salarioBruto,
                           1, var_idPersona, var_idUsuario, var_idSucursal);
    END
$$
DELIMITER ;

CALL sp_insertEmpleado('Carlos','Padilla','Torres','H','05/12/2004','KDS5G1F7D5TFD6','KDS5G1F7D5TFD65GF3','Colina del fresno, #210. Colinas de Santa Julia','37530','León','Guanajuato','4771644321','',1,'EMPS','Desarrollador',15000.00);
SELECT * FROM empleado;
SELECT * FROM persona;
SELECT * FROM usuario;
SELECT * FROM sucursal;

-- Procedure para actualizar empleado
DELIMITER $$

CREATE PROCEDURE sp_updateEmpleado(
    IN var_idEmpleado INT,
    IN var_nombre VARCHAR(64),
    IN var_apellidoPaterno VARCHAR(64),
    IN var_apellidoMaterno VARCHAR(64),
    IN var_genero VARCHAR(2),
    IN var_fechaNacimiento VARCHAR(11),
    IN var_rfc VARCHAR(14),
    IN var_curp VARCHAR(19),
    IN var_domicilio VARCHAR(129),
    IN var_cp VARCHAR(11),
    IN var_ciudad VARCHAR(46),
    IN var_estado VARCHAR(40),
    IN var_telefono VARCHAR(20),
    IN var_foto LONGTEXT,
    IN var_puesto VARCHAR(25),   
    IN var_salarioBruto FLOAT
)
BEGIN
    UPDATE persona
    SET nombre = var_nombre,
        apellidoPaterno = var_apellidoPaterno,
        apellidoMaterno = var_apellidoMaterno,
        genero = var_genero,
        fechaNacimiento = STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
        rfc = var_rfc,
        curp = var_curp,
        domicilio = var_domicilio,
        codigoPostal = var_cp,
        ciudad = var_ciudad,
        estado = var_estado,
        telefono = var_telefono,
        foto = var_foto
    WHERE idPersona = (
        SELECT idPersona
        FROM empleado
        WHERE idEmpleado = var_idEmpleado
    );

    -- Actualizamos los datos del empleado:
    UPDATE empleado
    SET puesto = var_puesto,
        salarioBruto = var_salarioBruto
    WHERE idEmpleado = var_idEmpleado;
END
$$

DELIMITER ;
CALL sp_updateEmpleado(1,'Juan','Gomez','Perez','M','15/03/1985','XHGF1234567','CURP123456789','Calle 123','12345','Ciudad A','Estado B','123-456-7890','','Desarrollador',50.00);

-- Procedimiento para eliminar de forma logica

DROP PROCEDURE IF EXISTS sp_desactivarEmpleado;
DELIMITER $$

CREATE PROCEDURE sp_desactivarEmpleado(
    IN var_idEmpleado INT
)
BEGIN
    -- Actualizamos el estado del empleado a inactivo:
    UPDATE empleado
    SET activo = 0
    WHERE idEmpleado = var_idEmpleado;
END
$$

DELIMITER ;

CALL sp_desactivarEmpleado(2);

 /*Vista de las tablas empleado, persona y usuario*/

DROP VIEW IF EXISTS viewEmpleado;
CREATE VIEW viewEmpleado AS 
SELECT idEmpleado, nombre, apellidoPaterno, apellidoMaterno, genero, fechaNacimiento, rfc, curp, domicilio, 
	   codigoPostal, ciudad, estado, telefono, foto, codigo, fechaIngreso, puesto, salarioBruto, activo,
       nombreUsuario, contrasenia, rol
FROM persona p, empleado e, usuario u
WHERE p.idPersona = e.idPersona AND e.idUsuario = u.idUsuario;
SELECT * FROM viewEmpleado;
-- ----------------------------------------------------------------- Fin de la seccion empleado -----------------------------------------------------------------



-- ----------------------------------------------------------------- Inicio de la seccion sucursal -----------------------------------------------------------------

-- Procedimiento almacenado para insertar una nueva sucursal.
--      Esta operacion implica que, al agregar una nueva sucursal,
--      de forma automatica se agregara un usuario administrador,
--      lo cual implica, la insercion de un empleado y una persona.
DROP PROCEDURE IF EXISTS sp_insertSucursal;
DELIMITER $$
CREATE PROCEDURE sp_insertSucursal(/* Datos Sucursal */
                                    IN	var_nombre          VARCHAR(49),    --  1
                                    IN	var_titular         VARCHAR(49),    --  2
                                    IN  var_rfc             VARCHAR(15),    --  3                                    
                                    IN	var_domicilio       VARCHAR(129),   --  4
                                    IN  var_colonia         VARCHAR(65),    --  5
                                    IN  var_codigoPostal    VARCHAR(11),    --  6
                                    IN  var_ciudad          VARCHAR(65),    --  7
                                    IN  var_estado          VARCHAR(49),    --  8                                    
                                    IN	var_telefono        VARCHAR(20),    --  9
                                    IN	var_latitud         VARCHAR(65),    -- 10
                                    IN	var_longitud        VARCHAR(65)     -- 11
                                 )
    BEGIN
        DECLARE idUsuarioMax INT;
        DECLARE var_idSucursal INT;
		DECLARE var_codigoEmpleado VARCHAR(10);
        DECLARE var_nombreUsuario VARCHAR(30);
        DECLARE var_contrasenia VARCHAR(30);
        DECLARE var_idUsuario INT;
        DECLARE var_idPersona INT;
        
        -- Comenzamos insertando los datos de la Sucursal:
        INSERT INTO sucursal(nombre, titular, rfc, domicilio, colonia, codigoPostal,
                             ciudad, estado, telefono, latitud, longitud, estatus)
                    VALUES(var_nombre, var_titular, var_rfc, var_domicilio, var_colonia, var_codigoPostal,
                           var_ciudad, var_estado, var_telefono, var_latitud, var_longitud, 1);
        
        -- Recuperamos el ID de la Sucursal que se genero:
        SET var_idSucursal = LAST_INSERT_ID();
                
        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);
        
        -- Generamos el nombre del Usuario Administrador que por default tendra la Sucursal:
        SET idUsuarioMax      = 1 + (SELECT MAX(idUsuario) FROM usuario);
        SET var_nombreUsuario = CONCAT('Admins', idUsuarioMax);
        SET var_contrasenia   = var_nombreUsuario;
        
        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_nombreUsuario, var_contrasenia, 'ADMS');
        
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID();
        
        -- Insertamos los datos personales:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( CONCAT('Admins_', var_titular), '', '', 
                            'O', STR_TO_DATE('01/01/1901', '%d/%m/%Y'),
                            '', '', '', '',
                            '', '', '', '');
        
        -- Recuperamos el ID de la Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID();
        
        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal)
                    VALUES(var_codigoEmpleado, NOW(), 'Administrador', 0.0,
                           1, var_idPersona, var_idUsuario, var_idSucursal);
    END
$$
DELIMITER ;
SELECT * FROM sucursal;
CALL sp_insertSucursal("Sucursal Centro Max","Medicamos tu vida","G54D6F6FGS","Blvd. Torres Landa #5612","Cerrito de jerez","37530","Leon","Guanajuato","4779632563","21.06353483110673","-101.57969394332699");
SELECT * FROM sucursal;
SELECT * FROM persona;
SELECT * FROM empleado;
SELECT * FROM usuario;
DELETE FROM sucursal WHERE idSucursal = 4;


 /*Vista para tabla Sucursal*/

CREATE VIEW viewSucursal AS
SELECT idSucursal, nombre, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, 
	   telefono, latitud, longitud, estatus
FROM sucursal;
SELECT * FROM viewSucursal WHERE idSucursal = 1;


-- ~~~~~~~~~~~~ Procedimiento almacenado para modificar una sucursal  ~~~~~~~~~~~~ --
DROP PROCEDURE IF EXISTS sp_updateSucursal;
DELIMITER $$
CREATE PROCEDURE sp_updateSucursal(/* Datos Sucursal */
									IN  var_idSucursal		INT,			--  1
                                    IN	var_nombre          VARCHAR(49),    --  2
                                    IN	var_titular         VARCHAR(49),    --  3
                                    IN  var_rfc             VARCHAR(15),    --  4                                    
                                    IN	var_domicilio       VARCHAR(129),   --  5
                                    IN  var_colonia         VARCHAR(65),    --  6
                                    IN  var_codigoPostal    VARCHAR(11),    --  7
                                    IN  var_ciudad          VARCHAR(65),    --  8
                                    IN  var_estado          VARCHAR(49),    --  9                                    
                                    IN	var_telefono        VARCHAR(20),    --  10
                                    IN	var_latitud         VARCHAR(65),    --  11
                                    IN	var_longitud        VARCHAR(65)     --  12
                                 )
    BEGIN
        UPDATE sucursal SET
			nombre = var_nombre, 
            titular = var_titular,
            rfc = var_rfc, 
            domicilio = var_domicilio, 
            colonia = var_colonia, 
            codigoPostal = var_codigoPostal,
            ciudad = var_ciudad, 
            estado = var_estado, 
            telefono = var_telefono, 
            latitud = var_latitud, 
            longitud = var_longitud
		WHERE idSucursal = var_idSucursal;
    END
$$
DELIMITER ;

-- CALL sp_updateSucursal(14, 'Sucursal San Pedro', 'Medicamos tu vida', 'KGO542GDL2', 'Blvd San Pedro #214', 'San Pedro', '37596', 'Leon', 'Guanajuato', '4778596323', '3.156421235', '-12.25657456');
SELECT * FROM sucursal;

-- ~~~~~~~~~~~~ Procedimiento almacenado para eliminar logicamente una sucursal  ~~~~~~~~~~~~ --

DROP PROCEDURE IF EXISTS sp_deleteSucursal;
DELIMITER $$
CREATE PROCEDURE sp_deleteSucursal
	(
		IN v_idSucursal INT
	)
	BEGIN 
		UPDATE sucursal SET estatus = 0
		WHERE idSucursal = v_idSucursal;
	END;
$$ DELIMITER ;

CALL sp_deleteSucursal(5);
SELECT * FROM sucursal;
-- ----------------------------------------------------------------- Fin de la seccion sucursal -----------------------------------------------------------------

SELECT * FROM persona;
SELECT * FROM cliente;
SELECT * FROM empleado;
SELECT * FROM sucursal;
SELECT * FROM usuario;
UPDATE sucursal SET estatus = 1;