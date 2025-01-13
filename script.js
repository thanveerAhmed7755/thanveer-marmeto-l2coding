const url = 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889'
const tbody = document.querySelector('tbody')

const subtotalPrice = document.querySelector('#subtotal-price')

const totalPrice = document.querySelector('#total-price')


let isDelete = false;

let isModal =  false;

let copyData = [];
let count = 0;

fetch(url).then((el) => el.json() ).then((el) => {
    generateNode(el)
    generateNode(el)
    generateNode(el)
    generateNode(el)
    generateNode(el)
})




function deleteCart(node)
{

    let data = confirm("Are you sure want to delete ?")
    data ? node.parentElement.parentElement.remove() : '';

    setTimeout(() => 
        {
    
            let allNodes = document.querySelectorAll('.subtotal-quantity')
            let total = 0
            
            allNodes.forEach(element => 
                {
                    total += parseInt(element.innerText.toString().match(/\d/ig).join("").slice(0,-2))
                }
            )
    
            subtotalPrice.innerText = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                total)
    
                totalPrice.innerText = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                    total)
        })
}

// console.log(localStorage.getItem('json-data'))

function generateNode(sample)
{

    localStorage.setItem('json-data',JSON.stringify(sample))

    let el = JSON.parse(localStorage.getItem('json-data'))

    

  let tr = document.createElement('tr')
  let td1 = document.createElement('td')
  let td2 = document.createElement('td')
  let td3 = document.createElement('td')
  let td4 = document.createElement('td')
  let td5 = document.createElement('td')
  let td6 = document.createElement('td')
  td1.innerHTML = `<img src=${el.items[0].image} style="width:3rem;margin-top:5px;" />`
  td2.innerText = el.items[0].product_title
  td3.innerText = new Intl.NumberFormat('en-IN', { style: 'currency', currency: el.currency }).format(
    el.original_total_price),
  td4.innerHTML = `<input type='tel' oninput="calculateQuanitity(${el.original_total_price},this,this.value)" value=${el.items[0].quantity} style="width:25px;text-align:center" size='1'  />`
  td5.innerText = new Intl.NumberFormat('en-IN', { style: 'currency', currency: el.currency }).format(
    el.original_total_price,
  )
  td5.className = 'subtotal-quantity';
  td6.innerHTML = `<button onclick="deleteCart(this)" style="background:transparent; border:none">
    <img src='./delete.png' style="width:1rem" />
  </button>`
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tr.appendChild(td5)
  tr.appendChild(td6)
  tbody.appendChild(tr)

  setTimeout(() => 
    {

        let allNodes = document.querySelectorAll('.subtotal-quantity')
        let total = 0
        
        allNodes.forEach(element => 
            {
                total += parseInt(element.innerText.toString().match(/\d/ig).join("").slice(0,-2))
            }
        )

        subtotalPrice.innerText = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
            total)

            totalPrice.innerText = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                total)
    })
}

function calculateQuanitity(price,node,value)
{
    let n = price;
    let temp = node.parentElement.parentElement.children[2].textContent;
    setTimeout(() => 
    {
        node.parentElement.parentElement.children[4].innerText = 
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
            parseInt(n) * value)
    })

    setTimeout(() => 
    {

        let allNodes = document.querySelectorAll('.subtotal-quantity')
        let total = 0
        
        allNodes.forEach(element => 
            {
                total += parseInt(element.innerText.toString().match(/\d/ig).join("").slice(0,-2))
            }
        )

        subtotalPrice.innerText = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
            total)

            totalPrice.innerText = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                total)
    })

}



