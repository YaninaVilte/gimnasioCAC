window.onload = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const productoId = queryParams.get('id');
    console.log("ID del producto:", productoId);

    // Hacer fetch del archivo JSON local
    fetch("../products.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderizarProductoPorId(data, productoId);
        })
}

const detalleProductoContainer = document.getElementById("detalleProductoContainer");

function renderizarProductoPorId(productos, productoId) {
    const productoEncontrado = productos.find(producto => producto.id === parseInt(productoId));
    if (productoEncontrado) {
        renderizarProducto(productoEncontrado);
    } else {
        console.log("Producto no encontrado");
    }
}

function renderizarProducto(producto) {
    detalleProductoContainer.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("claseProductos");
    div.setAttribute("category", producto.category);
    div.innerHTML = `
    <div class="photo">
    <img src="${producto.img}"></img>
    </div>
    <div class="description">
    <h4 class="categoria">Categoría: ${producto.category}</h4>
    <h2 class="nombre">${producto.nombre}</h2>
    <h1 class="precio">$ ${producto.precio}</h1>
    <button>Agregar al carrito</button>
    </div>
    </div>`;

    detalleProductoContainer.append(div);
}
