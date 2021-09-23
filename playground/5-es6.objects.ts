const userName = 'Rob';
const userAge = '33';

const user = {
  userName,
  age: userAge,
  location: 'Yakima'
}

console.log(user);

type product = {
  label?: string,
  price? : number,
  stock?: number,
  salePrice? : undefined | number
}

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


const transaction = (type : string, {label, stock }: product) => {
  console.log(type, label, stock)
}

transaction('order', product);