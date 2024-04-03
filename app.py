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

#
#
# FLASK
#
#

#Configuración del manejo de la base de datos con SQL usando Flask-SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gimnasio.db'  # URL de la base de datos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Desactiva el seguimiento de modificaciones
db = SQLAlchemy(app)

# Definir el modelo de datos
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    fecha_nacimiento = db.Column(db.String(10), nullable=False)
    dni = db.Column(db.Integer, nullable=False)
    direccion = db.Column(db.String(200), nullable=False)
    ciudad = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    lesion_osea = db.Column(db.String(3), nullable=False)
    lesion_muscular = db.Column(db.String(3), nullable=False)
    enfermedad_cardiovascular = db.Column(db.String(3), nullable=False)
    asfixia_facil = db.Column(db.String(3), nullable=False)
    anemia = db.Column(db.String(3), nullable=False)
    actividad_fisica = db.Column(db.String(3), nullable=False)

# Crear, leer, actualizar y eliminar registros de la base de datos.
from app import app, db, Usuario

#definición del formulario de inscripción
def formulario():
    return render_template('formulario_inscripcion.html')

#Crear el user
@app.route('/crear_usuario', methods=['POST'])
def crear_usuario():
    datos = request.json
    nuevo_usuario = Usuario(nombre=datos['nombre'], email=datos['email'], contraseña=datos['contraseña'])
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({'mensaje': 'Usuario creado correctamente'}), 201

#incripción del user en la db
@app.route('/inscripcion', methods=['POST'])
def inscripcion():
    datos = request.form
    nuevo_usuario = Usuario(
        nombre=datos['nombre'],
        apellido=datos['apellido'],
        fecha_nacimiento=datos['fecha_nacimiento'],
        dni=int(datos['dni']),
        direccion=datos['direccion'],
        ciudad=datos['ciudad'],
        telefono=datos['telefono'],
        email=datos['email'],
        lesion_osea=datos['lesion_osea'],
        lesion_muscular=datos['lesion_muscular'],
        enfermedad_cardiovascular=datos['enfermedad_cardiovascular'],
        asfixia_facil=datos['asfixia_facil'],
        anemia=datos['anemia'],
        actividad_fisica=datos['actividad_fisica']
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return '¡Inscripción exitosa!'

if __name__ == '__main__':
    app.run(debug=True)
