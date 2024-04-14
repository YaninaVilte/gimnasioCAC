window.onload = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const productoId = queryParams.get('id');
    console.log("ID del producto:", productoId);

    fetch("../products.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderizarProductoPorId(data, productoId);

            const botonAgregarAlCarrito = document.getElementById("agregarAlCarrito");
            botonAgregarAlCarrito.addEventListener("click", function () {
                const numero = parseInt(document.getElementById("numero").textContent);
                const producto = data.find(producto => producto.id === parseInt(productoId));
                const productoSeleccionado = {
                    nombre: producto.nombre,
                    precio: producto.precio,
                    img: producto.img,
                    cantidad: numero,
                    id: producto.id,
                    
                };
                agregarAlCarrito(productoSeleccionado);
            });
        })
}


let carrito = [];

const carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

if (carritoLocalStorage) {
    carrito = carritoLocalStorage;
} else {
    carrito = [];
}

function actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        console.log("¡El producto ya ha sido agregado al carrito!");
    } else {
        carrito.push(producto);
        console.log("Producto agregado al carrito:", producto);
        actualizarLocalStorage();
    }
}

function renderizarProductoPorId(productos, productoId) {
    const productoEncontrado = productos.find(producto => producto.id === parseInt(productoId));
    if (productoEncontrado) {
        renderizarProducto(productoEncontrado);
    } else {
        console.log("Producto no encontrado");
    }
}

function renderizarProducto(producto) {
    const detalleProductoContainer = document.getElementById("detalleProductoContainer");
    detalleProductoContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("productDetailContainer");
    div.innerHTML = `
    <div class="photoDetail">
    <img src="${producto.img}"></img>
    </div>
    <div>
    <h4 class="categoria">Categoría: ${producto.category}</h4>
    <h2 class="titleDetail">${producto.nombre}</h2>
    <h1 class="priceDetail">$ ${producto.precio}</h1>
    <h3 class="description">${producto.detail}</h3>
    <div id="contador">
    <button id="restar">-</button>
    <span id="numero">1</span>
    <button id="sumar">+</button>
    </div>
    <button id="agregarAlCarrito">Agregar al carrito</button>
    </div>
    </div>`;

    detalleProductoContainer.append(div);

    const numeroElemento = document.getElementById("numero");
    const botonSumar = document.getElementById("sumar");
    const botonRestar = document.getElementById("restar");

    let numero = 1;

    function actualizarNumero() {
        numeroElemento.textContent = numero;
    }

    botonSumar.addEventListener("click", function () {
        const stockDisponible = producto.stock;
        if (numero < stockDisponible) {
            numero++;
            actualizarNumero();
        }
    });

    botonRestar.addEventListener("click", function () {
        if (numero > 1) {
            numero--;
            actualizarNumero();
        }
    });

    actualizarNumero();
}
