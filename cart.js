let mylabel = document.getElementById('label');
console.log(mylabel);
console.log(getData)
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem('data')) || [];
console.log(basket);

const calculate = () => {
    let search = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    let cartIcons = document.getElementById('cartamount');
    cartIcons.innerHTML = search;

    console.log(search);
};
calculate();

let generateCartItem = () => {
    if (basket.length !== 0) {
       return(
        shoppingCart.innerHTML = basket.map((x) => {
            let  {id, item} = x;
            let search = getData.find((y) => y.id === id)|| [];
            return(
                `
                <div class='cart-item'>
                <img width="100" src=${search.img} alt="" />
                <div class="details">
                    <div class="title-price-x">
                            <h4 class="title-price">
                               <p>${search.name}</p>
                                <p class="cart-item-price">#${search.price}</p>

                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-file-excel-fill"></i>
                    </div>
                    <div>
                        <span><i onclick="decrement(${id})" class="bi bi-dash-lg"></i></span>
                        <span id=${id}>${item}</span>
                        <span><i onclick="increment(${id})" class="bi bi-plus-lg"></i></span>
                    </div>
                        
                        
                   <h3>$ ${item * search.price}</h3>
                </div>
                </div>
                
                `
            )
        }).join(' ') 
       )
    } else {
        shoppingCart.innerHTML = ``;
        mylabel.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `;
    }
};

generateCartItem();


let increment = (id) => {
    let selected = id
   let search = basket.find((x) => x.id === selected.id)
   if( search === undefined ){
    basket.push({
        id: selected.id,
        item: 1
    })
   }else{
    search.item += 1
   }
   generateCartItem()
   update(selected.id)
    // console.log(search)
    localStorage.setItem('data', JSON.stringify(basket))
}


let decrement = (id) => {
    let selected = id
    let search = basket.find((x) => x.id === selected.id);
    
    if (search === undefined) return;

    else if( search.item === 0)return;

    else{
     search.item -= 1
    }   
    update(selected.id) 
    basket = basket.filter((x) => x.item !== 0) 
    generateCartItem()
 
    localStorage.setItem('data', JSON.stringify(basket))

    //  console.log(search)
}

let update = (id) => {
    // console.log(id);
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    // console.log(search)
    // console.log('calculate')
    calculate()
    TotalAmount();
}


let removeItem = (id) => {
    
    let selectedItem = id;

    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItem();
    TotalAmount();
    localStorage.setItem('data', JSON.stringify(basket))

}

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) =>{
            let {item, id } = x;
            let search = getData.find((y) => y.id === id)|| [];

            return item * search.price

        } ).reduce((x, y) =>  x + y, 0);
        mylabel.innerHTML = `
        <h2> Total Bill : $ ${amount}</h2>
        <button>Check Out</button>
        <button onclick="clearCart()">Clear Cart</button>
        
        `
        // console.log(amunt)
    }else return;
};
TotalAmount();

let clearCart = () => {
    basket = [];
    generateCartItem();
    localStorage.setItem('data', JSON.stringify(basket))
}


