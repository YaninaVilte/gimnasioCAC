from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Rutas para las páginas HTML
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/user')
def user():
    return render_template('user.html')

@app.route('/venta_productos')
def venta_productos():
    return render_template('venta_productos.html')

if __name__ == '__main__':
    app.run(debug=True)

# Configuración del manejo de la base de datos con SQL usando Flask-SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gimnasio.db'  # URL de la base de datos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Desactiva el seguimiento de modificaciones
db = SQLAlchemy(app)

# Definir el modelo de datos
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contraseña = db.Column(db.String(100), nullable=False)

if __name__ == '__main__':
    app.run(debug=True)

# Crear, leer, actualizar y eliminar registros de la base de datos.

from app import app, db, Usuario

@app.route('/crear_usuario', methods=['POST'])
def crear_usuario():
    datos = request.json
    nuevo_usuario = Usuario(nombre=datos['nombre'], email=datos['email'], contraseña=datos['contraseña'])
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({'mensaje': 'Usuario creado correctamente'}), 201

@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = Usuario.query.all()
    resultados = []
    for usuario in usuarios:
        resultados.append({
            'id': usuario.id,
            'nombre': usuario.nombre,
            'email': usuario.email
        })
    return jsonify(resultados)

if __name__ == '__main__':
    app.run(debug=True)
