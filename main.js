let shop = document.getElementById('shop');
console.log(shop);

let basket = JSON.parse(localStorage.getItem('data'))|| [];

// let getData =[

//     {
//         id:'rtrryrr',
//         name:'Casual Shirt',
//         img:'./images/img-1.jpg',
//         price:750,
//         desc: 'A vert nice wears for men with good qualiy'
//     },
//     {
//         id:'hghghgh',
//         name:'T Shirt',
//         img:'./images/img-2.jpg',
//         price:250,
//         desc: 'A vert nice wears for men with good qualiy'
//     },
//     {
//         id:'mcmcmc',
//         name:'Round Neck',
//         img:'./images/img-3.jpg',
//         price:230,
//         desc: 'A vert nice wears for men with good qualiy'
//     },
//     {
//         id:'adadada',
//         name:'Men Suite',
//         img:'./images/img-4.jpg',
//         price:150,
//         desc: 'A vert nice wears for men with good qualiy'
//     },
// ]

let getShop = () => {
    return ( shop.innerHTML=getData.map((x) => {
       
            let {id, name, desc, price, img}= x;
            let search = basket.find((x) => x.id === id) || [];
        return(
                `
        <div id=product-id-${id}  class="item">
        <img src=${img} alt="">
        <p>${desc}</p>
        <h3>${name}</h3>
        <div class="cart-details">
            <h3>$ ${price}</h3>
            
        <div>
                <span><i onclick="decrement(${id})" class="bi bi-dash-lg"></i></span>
                <span id=${id}>${search.item === undefined? 0: search.item}</span>
                <span><i onclick="increment(${id})" class="bi bi-plus-lg"></i></span>
            </div>
        </div>
    </div>
    `
        )
    }).join(''))
}
getShop()

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
}


const calculate = () => {
    let search = basket.map((x) => x.item).reduce((x, y) =>  x + y, 0)
    let cartIcons = document.getElementById('cartamount')
    cartIcons.innerHTML = search

    console.log(search)

}
calculate()