const savedBooks = [];
const cart = document.querySelector(".offcanvas-body");
const cartTitle = document.querySelector(".offcanvas-title");
const cartBody = document.querySelector(".offcanvas-body > p");
const list = document.querySelector(".offcanvas-body > ul");

fetch("https://striveschool-api.herokuapp.com/books")
  .then(response => {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong!");
    }
  })

  .then(books => {
    // seleziono la grid dal html
    const grid = document.getElementById("grid");

    // creo la riga e aggiungo la classe corrispondente
    const row = document.createElement("div");
    row.classList.add("row");
    grid.appendChild(row);

    books.forEach((book, i) => {
      // creo una colonna per ogni libro
      const col = document.createElement("div");
      col.classList.add("col-3");
      row.appendChild(col);

      // creo una card per ogni libro
      const card = document.createElement("div");
      card.classList.add("card");
      col.appendChild(card);

      // aggiungo l'immagine
      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.src = book.img;
      card.appendChild(img);

      // creo il body della card
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      card.appendChild(cardBody);

      // aggiungo del contenuto al interno del body
      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = book.title;
      cardBody.appendChild(title);

      const price = document.createElement("p");
      price.classList.add("card-text");
      price.textContent = book.price + " €";
      cardBody.appendChild(price);

      // creo un pulsante 'Scarta' usato per eliminare un libro
      const btnDelete = document.createElement("a");
      btnDelete.classList.add("btn", "btn-danger");
      btnDelete.textContent = "Scarta";
      cardBody.appendChild(btnDelete);

      // il click del bottone scatena funzione per l'eliminazione del libro
      btnDelete.addEventListener("click", () => {
        // const id = book.asin;
        // // dopo aver eliminato il libro dall' API, esegue la seguente funzione
        // deleteBook(id)
        // cerca sul DOM l'elemento con l'id corrispondente al libro da eliminare

        col.remove();
      });

      const btnBuy = document.createElement("a");
      btnBuy.classList.add("btn", "btn-success", "ms-2");
      btnBuy.textContent = "Compra ora";
      cardBody.appendChild(btnBuy);

      // il click del bottone scatena funzione per l'aggiunta del libro al carrello
      btnBuy.addEventListener("click", () => {
        // si salva il libro sulla localStorage
        savedBooks.push(book.title);
        localStorage.setItem(`cart-items`, savedBooks);

        // modifico il messaggio default
        cartTitle.textContent = "Stai per comprare prodotti...";
        cartBody.textContent = " ";

        let bookOnCart = document.createElement("li");
        bookOnCart.textContent = book.title;
        cart.appendChild(list);
        list.append(bookOnCart);

        col.remove();
      });
    });
  })

  .catch(error => console.log(error));

// // Eliminazione del libro sull' API
// const deleteBook = id => {
//   return fetch(`https://striveschool-api.herokuapp.com/books/${id}`, {
//     method: "DELETE"
//   })
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(error => console.log(error));
// };

window.onload = () => {
  let cartBooks = localStorage.getItem("cart-items");
  cartBooks = cartBooks.split(",");

  cartBooks.forEach(element => {
    savedBooks.push(element);
  });

  console.log(savedBooks);

  // modifico il messaggio default
  if (cartBooks) {
    cartTitle.textContent = "Stai per comprare prodotti...";
    cartBody.textContent = " ";

    cart.appendChild(list);

    for (book of savedBooks) {
      let bookOnCart = document.createElement("li");
      bookOnCart.textContent = book;
      list.append(bookOnCart);
    }
  }
};
