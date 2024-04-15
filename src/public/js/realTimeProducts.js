const socket = io();

socket.on("products", (data) => {
    renderProducts(data);
}); 

const renderProducts = (productos) => {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";


    productos.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img src="${item.thumbnails}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-title">Categoría: ${item.category}</p>
            <p class="card-text">Precio: $${item.price}</p>
            <p class="card-text">Stock: ${item.stock}</p>
            <p class="card-text">Status: ${item.status}</p>
            <p class="card-text">Code: ${item.code}</p>
            <p class="card-text mini mt-2 mb-2">ID: ${item._id}</p>
            <button type="button" class="btn btn-primary mt-2">Eliminar Producto</button>
        </div>
        `;
        productContainer.appendChild(card);

        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item._id);
        });
    });
}

const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
}

document.getElementById("btnSend").addEventListener("click", (event) => {
    event.preventDefault();
    addProduct();
});

const addProduct = () => {
    const form = document.querySelector('.texto-formulario');

    if (form.checkValidity() === true) {
        const product = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            price: parseFloat(document.getElementById("price").value),
            thumbnails: document.getElementById("thumbnails").value || "uploads/placeholder.jpg",
            code: document.getElementById("code").value,
            stock: parseInt(document.getElementById("stock").value),
            category: document.getElementById("category").value,
            status: document.getElementById("status").value === "true"
        };

        socket.emit("addProduct", product);

        form.reset(); 
        
        form.classList.remove('was-validated');
        Array.from(form.querySelectorAll('.form-control')).forEach((input) => {
            input.classList.remove('is-invalid');
        });

        document.getElementById("status").value = "true"; 
    } else {
        form.classList.add('was-validated');
    }
};