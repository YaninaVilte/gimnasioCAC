let productosCarrito = localStorage.getItem("carrito");
productosCarrito = JSON.parse(productosCarrito);

const contenedorProductosCarrito = document.getElementById("contenedorProductosCarrito");
let botonEliminar = document.querySelectorAll(".botonEliminar");
const contenedorVaciarContinuar = document.getElementById("vaciar-continuar");

const botonVaciar = document.getElementById("vaciarCarrito");
botonVaciar.addEventListener('click', vaciarCarrito);
const botonComprar = document.getElementById("continuarCompra");
botonComprar.addEventListener('click', comprarCarrito);

const tituloCarrito = document.getElementById("tituloCarrito");
const tituloCarritoVacio = document.getElementById("tituloCarritoVacio");
const precioCarrito = document.getElementById("precioCarrito");
const unidadesCarrito = document.getElementById("unidadesCarrito");

function renderizarCarrito() {
    contenedorProductosCarrito.innerHTML = '';
    let totalCarrito = 0;
    let totalCantidad = 0;
    productosCarrito.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add("card");
        div.innerHTML = `
            <h5 class="nombre"><small>Producto</small><br>${producto.nombre}</h5> 
            <img class="imagen" src="${producto.img}"></img>
            <p class="cantidad"><small>Cantidad</small><br> ${producto.cantidad}</p>
            <p class="precio"><small>Precio</small><br>$ ${producto.precio}</p>
            <p class="subtotal"><small>Subtotal</small><br>$ ${producto.precio * producto.cantidad}</p>
            <button id="${producto.id}" class="botonEliminar">Eliminar del carrito</button>
        `;
        contenedorProductosCarrito.appendChild(div);
        totalCarrito += producto.precio * producto.cantidad;
        totalCantidad += producto.cantidad;
        precioCarrito.innerHTML = `Precio total: $ ${totalCarrito}`
        unidadesCarrito.innerHTML = `Total unidades: ${totalCantidad}`
    })

    botonesEliminar();

    if (productosCarrito.length === 0) {
        botonVaciar.style.display = 'none';
        botonComprar.style.display = 'none';
        tituloCarrito.style.display = 'none';
        tituloCarritoVacio.style.display = 'block';
        unidadesCarrito.style.display = 'none';
        precioCarrito.style.display = 'none';
    } else {
        botonVaciar.style.display = 'block';
        botonComprar.style.display = 'block';
        tituloCarrito.style.display = 'block';
        tituloCarritoVacio.style.display = 'none';
        unidadesCarrito.style.display = 'block';
        precioCarrito.style.display = 'block';
    }

}

renderizarCarrito();

function botonesEliminar() {
    botonEliminar = document.querySelectorAll(".botonEliminar");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProductoCarrito);
    });
}

function eliminarProductoCarrito(e) {
    const idProducto = parseInt(e.currentTarget.id);
    const index = productosCarrito.findIndex(producto => producto.id === idProducto);

    productosCarrito.splice(index, 1);
    renderizarCarrito();

    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
}



function comprarCarrito() {
    productosCarrito = [];
    actualizarCarritoLocalstorage();
    renderizarCarrito();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Gracias por tu compra!',
        showConfirmButton: false,
        timer: 1500
    });
}

function vaciarCarrito() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        text: "¡Tus productos se van a borrar del carrito!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, quiero borrarlos!',
        cancelButtonText: 'No, quiero continuar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Listo!',
                'Tu carrito fue eliminado!',
                'warning'
            );
            productosCarrito = [];
            actualizarCarritoLocalstorage();
            renderizarCarrito();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Tus productos están a salvo',
                'Podés continuar con la compra :)',
                'success'
            );
        }
    });
}


function actualizarCarritoLocalstorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}