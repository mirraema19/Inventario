const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '24mb' }));

const connection = mysql.createConnection({
  host: 'database-1.cadauwhy9ndh.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Bryam203A',
  database: 'sys',
  insecureAuth: true
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Ruta para agregar un material a la tabla Obra_blanca
app.post('/api/obra_blanca', (req, res) => {
  const { tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra } = req.body;

  connection.query('INSERT INTO Obra_blanca (Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios) VALUES (?, ?, ?, ?, ?)',
    [tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra],
    (error, results) => {
      if (error) {
        console.error('Error al agregar el material a Obra_blanca', error);
        res.status(500).json({ error: 'Error al agregar el material a Obra_blanca' });
      } else {
        res.status(200).json({ message: 'Material agregado correctamente a Obra_blanca' });
      }
    }
  );
});

// Ruta para agregar un material a la tabla Obra_negra
app.post('/api/obra_negra', (req, res) => {
  const { tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra } = req.body;

  connection.query('INSERT INTO Obra_negra (Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios) VALUES (?, ?, ?, ?, ?)',
    [tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra],
    (error, results) => {
      if (error) {
        console.error('Error al agregar el material a Obra_negra', error);
        res.status(500).json({ error: 'Error al agregar el material a Obra_negra' });
      } else {
        res.status(200).json({ message: 'Material agregado correctamente a Obra_negra' });
      }
    }
  );
});

// Ruta para agregar un material a la tabla Obra_gris
app.post('/api/obra_gris', (req, res) => {
  const { tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra } = req.body;

  connection.query('INSERT INTO Obra_gris (Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios) VALUES (?, ?, ?, ?, ?)',
    [tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra],
    (error, results) => {
      if (error) {
        console.error('Error al agregar el material a Obra_gris', error);
        res.status(500).json({ error: 'Error al agregar el material a Obra_gris' });
      } else {
        res.status(200).json({ message: 'Material agregado correctamente a Obra_gris' });
      }
    }
  );
});

// Ruta para obtener todos los registros de obra_blanca
app.get('/api/obra_blanca', (req, res) => {
  connection.query('SELECT id, Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios FROM Obra_blanca', (error, results) => {
    if (error) {
      console.error('Error al obtener los registros de obra_blanca', error);
      res.status(500).json({ error: 'Error al obtener los registros de obra_blanca' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta para obtener todos los registros de obra_negra
app.get('/api/obra_negra', (req, res) => {
  connection.query('SELECT id, Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios FROM Obra_negra', (error, results) => {
    if (error) {
      console.error('Error al obtener los registros de obra_negra', error);
      res.status(500).json({ error: 'Error al obtener los registros de obra_negra' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta para obtener todos los registros de obra_gris
app.get('/api/obra_gris', (req, res) => {
  connection.query('SELECT id, Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios FROM Obra_gris', (error, results) => {
    if (error) {
      console.error('Error al obtener los registros de obra_gris', error);
      res.status(500).json({ error: 'Error al obtener los registros de obra_gris' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Ruta para eliminar un registro de obra_blanca por su ID
app.delete('/api/obra_blanca/:id', (req, res) => {
  const obraBlancaId = req.params.id;
  connection.query('DELETE FROM Obra_blanca WHERE id = ?', [obraBlancaId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el registro de obra_blanca', error);
      res.status(500).json({ error: 'Error al eliminar el registro de obra_blanca' });
    } else {
      res.status(200).json({ message: 'Registro de obra_blanca eliminado correctamente' });
    }
  });
});

// Ruta para eliminar un registro de obra_negra por su ID
app.delete('/api/obra_negra/:id', (req, res) => {
  const obraNegraId = req.params.id;
  connection.query('DELETE FROM Obra_negra WHERE id = ?', [obraNegraId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el registro de obra_negra', error);
      res.status(500).json({ error: 'Error al eliminar el registro de obra_negra' });
    } else {
      res.status(200).json({ message: 'Registro de obra_negra eliminado correctamente' });
    }
  });
});

// Ruta para eliminar un registro de obra_gris por su ID
app.delete('/api/obra_gris/:id', (req, res) => {
  const obraGrisId = req.params.id;
  connection.query('DELETE FROM Obra_gris WHERE id = ?', [obraGrisId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el registro de obra_gris', error);
      res.status(500).json({ error: 'Error al eliminar el registro de obra_gris' });
    } else {
      res.status(200).json({ message: 'Registro de obra_gris eliminado correctamente' });
    }
  });
});

// Ruta para actualizar un registro de obra_blanca por su ID
app.put('/api/obra_blanca/:id', (req, res) => {
  const obraBlancaId = req.params.id;
  const { tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra } = req.body;

  // Actualizar el registro en la base de datos
  const query = 'UPDATE Obra_blanca SET Tipo_de_material = ?, Tamaño = ?, Cantidad = ?, Unidad_de_medida = ?, Comentarios = ? WHERE id = ?';
  const values = [tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra, obraBlancaId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al actualizar el registro de obra_blanca', error);
      res.status(500).json({ error: 'Error al actualizar el registro de obra_blanca' });
    } else {
      res.status(200).json({ message: 'Registro de obra_blanca actualizado correctamente' });
    }
  });
});

// Ruta para actualizar un registro de obra_negra por su ID
app.put('/api/obra_negra/:id', (req, res) => {
  const obraNegraId = req.params.id;
  const { tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra } = req.body;
  // Actualizar el registro en la base de datos
  const query = 'UPDATE Obra_negra SET Tipo_de_material = ?, Tamaño = ?, Cantidad = ?, Unidad_de_medida = ?, Comentarios = ? WHERE id = ?';
  const values = [tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra, obraNegraId];
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al actualizar el registro de obra_negra', error);
      res.status(500).json({ error: 'Error al actualizar el registro de obra_negra' });
    } else {
      res.status(200).json({ message: 'Registro de obra_negra actualizado correctamente' });
    }
  });
});

// Ruta para actualizar un registro de obra_gris por su ID
app.put('/api/obra_gris/:id', (req, res) => {
  const obraGrisId = req.params.id;
  const { tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra } = req.body;

  // Actualizar el registro en la base de datos
  const query = 'UPDATE Obra_gris SET Tipo_de_material = ?, Tamaño = ?, Cantidad = ?, Unidad_de_medida = ?, Comentarios = ? WHERE id = ?';
  const values = [tipoMaterial, tamaño, cantidad, unidadMedida, tipoObra, obraGrisId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al actualizar el registro de obra_gris', error);
      res.status(500).json({ error: 'Error al actualizar el registro de obra_gris' });
    } else {
      res.status(200).json({ message: 'Registro de obra_gris actualizado correctamente' });
    }
  });
});

// Autenticación de inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM login WHERE usuario = ? AND contraseña = ? COLLATE utf8mb4_bin';
  const values = [email, password];
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al autenticar al usuario', err);
      res.status(500).json({ error: 'Error al autenticar al usuario' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false });
      }
    }
  });
});

// Ruta para obtener todos los registros de todas las obras
app.get('/api/all_materials', (req, res) => {
  const query = 'SELECT id, Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios, "Obra_blanca" AS Tipo_de_obra FROM Obra_blanca ' +
                'UNION ALL ' +
                'SELECT id, Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios, "Obra_gris" AS Tipo_de_obra FROM Obra_gris ' +
                'UNION ALL ' +
                'SELECT id, Tipo_de_material, Tamaño, Cantidad, Unidad_de_medida, Comentarios, "Obra_negra" AS Tipo_de_obra FROM Obra_negra';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los registros de todas las obras', error);
      res.status(500).json({ error: 'Error al obtener los registros de todas las obras' });
    } else {
      res.status(200).json(results);
    }
  });
});


const port = 4000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
