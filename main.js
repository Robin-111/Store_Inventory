// Use deployed URL.

const url = "https://js-211-dummy-server.herokuapp.com/api/inventory";

let getData = async () => {
  let res = await fetch(url);
  res = await res.json();

//   console.log(res);
  render(res);
};

getData();

let addProduct = async () => {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;
  let delivery = document.getElementById("delivery").value;
  let image = document.getElementById("image").value;

  let prod_data = {
    name,
    price,
    description,
    delivery,
    image,
  };
  document.getElementById("name").value = null;
  document.getElementById("price").value = null;
  document.getElementById("description").value = null;
  document.getElementById("delivery").value = null;
  document.getElementById("image").value = null;

  let res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(prod_data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getData();
};

let render = (data) => {
  let cont = document.getElementById("container");
  cont.innerHTML = null;
  data.forEach(({ name, price, description, delivery, image, id }) => {
    let div = document.createElement("div");
    div.setAttribute("class", "item");

    let img = document.createElement("img");
    img.src = image;

    let p = document.createElement("h3");
    p.innerText = name;

    let pr = document.createElement("p");
    pr.setAttribute("class", "product_price");
    pr.innerText = price;

    let des = document.createElement("p");
    des.innerText = description;

    let del = document.createElement("p");
    del.setAttribute("class", "product_delivery");
    del.innerText = delivery;

    let rem_btn = document.createElement("button");
    rem_btn.setAttribute("class", "remove_item");
    rem_btn.innerText = "Remove";
    rem_btn.onclick = () => {
      removeItem(id);
    };

    let up_btn = document.createElement("button");
    up_btn.innerText = "Update Price";
    up_btn.setAttribute("class", "update_item");
    up_btn.onclick = () => {
      updateItem(id);
    };

    div.append(img, p, pr, des, rem_btn, up_btn);
    cont.append(div);
  });
};

let updateItem = async (id) => {
  const newPrice = window.prompt("Enter new Price");

  let data = { price: newPrice };

  await fetch(`${url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getData();
};

let removeItem = async (id) => {
  let res = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });
  getData();
};

let sortLTH = async () => {
  let res = await fetch(`${url}?_sort=price&_order=asc`);
  res = await res.json();
  render(res);
};

let sortHTL = async () => {
  let res = await fetch(`${url}?_sort=price&_order=desc`);
  res = await res.json();
  render(res);
};

let filterGte = async () => {
  let res = await fetch(`${url}?price_gte=4000`);
  res = await res.json();
  render(res);
};


let filterLte = async () => {
    let res = await fetch(`${url}?price_lte=4000`);
    res = await res.json();
    render(res);
  };
  