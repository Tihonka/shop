'use strict';

let buttonEl = document.querySelectorAll('.content_img');
let buyCounter = document.querySelector('.buy_counter');
let shoppingList = document.querySelector('.product_in_cart');
let productsList = document.querySelector('.list');
let cart = document.querySelector('.cart_icon');
let productName = document.querySelectorAll('.heading_item');
let productPrice = document.querySelectorAll('.price_size');
let sumBuys = document.querySelector('.cart_sum');





// При наведении на корзину делает видимым блок с выбранными товарами:

cart.addEventListener('mouseover', function(event){
    shoppingList.style.display = "block";
})

// Добавляем всем кнопкам функиию clickHandler обработчик события при клике:
buttonEl.forEach(function(button){
    button.addEventListener('click', clickHandler);   
})

/**
 * Функция при клике по кнопке button увеличивает счетчик количества покупок buyCounter на 1
 * и вызывает функцию добавления товара в корзину addToCart
 * @param {click} event объект с информацией о событии
 */
function clickHandler(event){
    buyCounter.textContent = +buyCounter.textContent + 1;
    addToCart(event);
       }



    let clickArrow = [0, 0, 0, 0, 0, 0, 0, 0, 0];  //массив для подсчета количества кликов по каждой кнопке
    
    /**
     * Функция распознает по какой кнопке произошел клик,увеличивает соответствующее значение в масиве clickArrow,
     * формирует разметку addProduct для блока с выбранными товарами,
     * считает итоговую сумму sum в корзине перемножая количество кликов по элементу на его цену
     * @param {click} event объект с информацией о событии
     */
    function addToCart(event){
        let index = event.target.getAttribute('data-ID');
        clickArrow[index]++;

        for (let i = 0; i < clickArrow.length; i++)
        {
            let child = document.querySelector (`.pic${i}`);
            if (child)
            {
                child.remove();
            }
        }
        let sum = 0;   //переменная для подсчета суммы в корзине
        for (let i = 0; i < clickArrow.length; i++)
        {    
            if (clickArrow[i] > 0)
            {
                let addProduct = `<tbody class="pic${i}"><tr>
                <td>${productName.item(i).textContent}</td>
                <td>${clickArrow[i]} шт.</td>
                <td>$${productPrice.item(i).textContent}</td>
                <td>$${(clickArrow[i]*productPrice.item(i).textContent).toFixed(2)}</td>
                </tr></tbody>`;
             
                productsList.insertAdjacentHTML("beforeend", addProduct);
            }

            sum +=clickArrow[i]*productPrice.item(i).textContent;
        }

        sumBuys.textContent = "  $" + sum.toFixed(2);      
    }




