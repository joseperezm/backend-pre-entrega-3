document.getElementById('finalize-purchase').addEventListener('click', function() {
    const cartId = this.getAttribute('data-cart-id');

    fetch(`/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Compra finalizada con éxito!');
            window.location.href = '/products';
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data) {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error(error);
        alert('Error al finalizar la compra, por favor intente nuevamente.');
    });
});