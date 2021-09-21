const name = 'Rob';
const userAge = '33';

const user = {
  name,
  age: userAge,
  location: 'Yakima'
}

console.log(user);

const product = {
  label: 'Salmon',
  price: 15,
  stock: 201,
  salePrice: undefined
}

// const label = product.label;

// const stock = product.stock;

// const {label:productLabel, stock, rating = 5} = product;
// console.log(productLabel);
// console.log(stock);
// console.log(rating);


const transaction = (type, {label, stock, }) => {
  console.log(type, label, stock)
}

transaction('order', product);