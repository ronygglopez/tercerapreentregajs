const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const productos = [
  {
    id: 1,
    nombre: "Cafe Late",
    precio: 1800,
    img: "https://www.somoselcafe.com.ar/img/novedades/87.webp",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Cafe Helado",
    precio: 1500,
    img: "https://img.freepik.com/fotos-premium/cafe-helado-servido-mesa-negra_76440-1754.jpg?w=360",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Desayuno Americano",
    precio: 5000,
    img: "https://www.cronista.com/files/image/419/419246/61d46ac6c3d06.jpg",
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "Merienda Divinas Delicias",
    precio: 4500,
    img: "https://www.cronista.com/files/image/480/480125/6331ddb8277aa.jpg",
    cantidad: 1,
  },
  {
    id: 5,
    nombre: "Smoothie Fusion: Explora Nuestras Ondas Refrescantes",
    precio: 2500,
    img: "https://www.foodiesfeed.com/wp-content/uploads/2023/05/raspberry-smoothie.jpg",
    cantidad: 1,
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio}$</p>
    
    `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some(
      (repeatProduct) => repeatProduct.id === product.id
    );

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
    }
    console.log(carrito);
    console.log(carrito.length);
    carritoCounter();
    saveLocal();
  });
});

//set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">carrito.</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>${product.precio} $</p>
      <span class="restar"> - </span>
      <p>cantidad: ${product.cantidad}</p>
      <span class="sumar"> + </span>
      <p>Total: ${product.cantidad * product.precio}</p>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");

    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = document.createElement("span");
    eliminar.innerText = "✖️";
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `total a pagar: ${total} $`;
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  carrito = carrito.filter((product) => product.id !== id);

  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();