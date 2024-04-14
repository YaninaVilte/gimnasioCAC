let productos = [];


fetch("../products.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        renderizarProductos(productos);
    })


const contenedorProductos = document.getElementById("contenedorProductos");


function renderizarProductos(productosEnStore) {

    contenedorProductos.innerHTML = "";

    productosEnStore.forEach(producto => {
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
        <button class="ver-detalle-btn" data-producto-id="${producto.id}">Ver detalle</button>
        </div>
        </div>`;

        contenedorProductos.append(div)
    });

    // Agrega manejador de eventos clic a los botones "Ver detalle"
    const verDetalleBtns = document.querySelectorAll('.ver-detalle-btn');
    verDetalleBtns.forEach(btn => {
        btn.addEventListener('click', mostrarDetalleProducto);
    });
}

renderizarProductos(productos)

function mostrarDetalleProducto(event) {
    const productoId = event.target.getAttribute('data-producto-id');
    window.location.href = `productDetail.html?id=${productoId}`;
}


document.addEventListener("DOMContentLoaded", function () {
    const categoryProductos = document.querySelectorAll(".categoria_producto");
    categoryProductos[0].classList.add("ct_filtro-active");

    categoryProductos.forEach(function (categoryProducto) {
        categoryProducto.addEventListener("click", function () {
            let catProduct = categoryProducto.getAttribute("category");

            categoryProductos.forEach(function (ca) {
                ca.classList.remove("ct_filtro-active");
            });
            categoryProducto.classList.add("ct_filtro-active");

            const claseProductos = document.querySelectorAll(".claseProductos");
            claseProductos.forEach(function (producto) {
                producto.style.display = "none";
            });
            const claseProductosToShow = document.querySelectorAll(`.claseProductos[category="${catProduct}"]`);
            claseProductosToShow.forEach(function (productoToShow) {
                productoToShow.style.display = "block";
            });
        });
    });

    const categoryAll = document.querySelector(".categoria_producto[category='all']");
    categoryAll.addEventListener("click", function () {
        const claseProductos = document.querySelectorAll(".claseProductos");
        claseProductos.forEach(function (producto) {
            producto.style.display = "block";
        });
    });

    const search = document.getElementById("search");
    search.addEventListener("input", function () {
        const query = search.value.trim().toLowerCase();
        const claseProductos = document.querySelectorAll(".claseProductos");

        claseProductos.forEach(function (producto) {
            if (
                producto.querySelector(".nombre").textContent.toLowerCase().includes(query) ||
                producto.querySelector(".precio").textContent.toLowerCase().includes(query) ||
                producto.getAttribute("category").toLowerCase().includes(query)
            ) {
                producto.style.display = "block";
            } else {
                producto.style.display = "none";
            }
        });
    });

});