var primaryColors = [
    "rgb(238, 167, 173)",
    "rgb(237, 206, 152)",
    "rgb(210, 169, 211)",
    "rgb(160, 206, 155)",
    "rgba(150, 210, 216)"
];

var items_ID = [
    'scarf',
    'uni_tshirt',
    'socks',
    'tshirt_U',
    'tight_tshirt',
    'top',
    'bag',
    'blue_jumper',
    'panties',
    'pink_jumper',
    'blessed',
    'jacket',
    'love_mug',
    'T-shirt',
];

document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'SVG/itemPexesso.svg', true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('svg-container').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});

document.documentElement.style.setProperty('--primar-color', 'rgba(150, 210, 216, 1)');

var hoverTimeouts = {};

function colorHover(itemDiv) {
    var itemsElement = document.getElementById(itemDiv);

    clearTimeout(hoverTimeouts[itemDiv]); // Zrušíme předchozí časovač pro tento prvek, pokud existuje

    // Zkontrolujeme, zda byla barva již změněna
    var colorChanged = itemsElement.getAttribute('data-color-changed');
    if (!colorChanged) {
        var currentColorIndex = parseInt(itemsElement.getAttribute('data-color-index')) || 0;
        itemsElement.style.color = primaryColors[currentColorIndex];
        itemsElement.setAttribute('data-color-changed', 'true');
        itemsElement.setAttribute('data-color-index', (currentColorIndex + 1) % primaryColors.length);
    }
}

// Přidáme událost pro opuštění prvku s časovačem
function resetColor(itemDiv) {
    hoverTimeouts[itemDiv] = setTimeout(function() {
        var itemsElement = document.getElementById(itemDiv);
        itemsElement.removeAttribute('data-color-changed');
    }, 5); // Opoždění 500 ms
}

var pexessoDone = false;

function itemClick(itemDiv){
    if (pexessoDone) {
        var itemsElement = document.getElementById(itemDiv);
        var basketCount = document.getElementById('backet-count');


        itemsElement.style.visibility = 'hidden';

        // Zvýšení počtu v košíku o jedna
        var currentCount = parseInt(basketCount.innerText); // Získání aktuálního počtu a převedení na číslo
        if(isNaN(currentCount)) { // Pokud je aktuální počet nečíselný (např. není nic napsáno), nastaví se na 0
            currentCount = 0;
        }
        basketCount.innerText = currentCount + 1; // Zvýšení počtu o jedna a aktualizace HTML obsahu
    }
}

function basicHover(itemDiv, itemFrontPic, scale) {
    if (pexessoDone) {
        var itemsElement = document.getElementById(itemDiv);
        if (itemFrontPic != null) {
            var worshipFrontImage = document.getElementById(itemFrontPic);
            worshipFrontImage.style.display = 'none';
        }
        if (scale != null) {
            itemsElement.style.transform = scale;
        } else {
            itemsElement.style.transform = 'scale(1.03)';
        }

        itemsElement.addEventListener('mouseout', function () {
            itemsElement.style.transform = 'scale(1)';
            if (itemFrontPic != null) {
                worshipFrontImage.style.display = 'block';
            }
        });
    }
}

function ksHover() {
    if (pexessoDone) {
        var price = document.getElementById('n_9');
        var ks = document.getElementById('n_ks');
        price.style.transform = 'translateX(-100px)';
        ks.style.transform = 'translateX(100px)';
        ks.style.opacity = '1';

        var itemsElement = document.getElementById('love_mug');
        itemsElement.addEventListener('mouseout', function () {
            price.style.transform = 'translateX(0px)';
            ks.style.transform = 'translateX(0px)';
            ks.style.opacity = '0';
        });
    }
}

function filterItems(category) {
    var items = document.querySelectorAll('.item, .item_wide2, .item_heigh2');

    items.forEach(function(item) {
        var itemCategory = item.getAttribute('data-category');
        if (itemCategory.toLowerCase().includes(category.toLowerCase())) {
            item.style.display = 'block'; // Zobrazí položky v zadané kategorii
        } else {
            item.style.display = 'none'; // Skryje položky v ostatních kategoriích
        }
    });
}

function showAllItems() {
    var items = document.querySelectorAll('.item, .item_wide2, .item_heigh2');

    items.forEach(function(item) {
        item.style.display = 'block'; // Zobrazí všechny položky
    });
}

// Seznam dostupných barev


// Funkce pro změnu barvy
function changePrimaryColor() {
    var root = document.documentElement;
    var currentColor = root.style.getPropertyValue('--primar-color');
    var currentIndex = primaryColors.indexOf(currentColor);
    var nextIndex = (currentIndex + 1) % primaryColors.length; // Pokud jsme na konci, vrať se na začátek
    var nextColor = primaryColors[nextIndex];
    root.style.setProperty('--primar-color', nextColor);

    var svgObject = document.getElementById('svgObject');

    // Získáme dokument SVG
    var svgDoc = svgObject.contentDocument;

    // Najdeme konkrétní prvek SVG, který chceme změnit (např. podle id)
    var svgElement = svgDoc.getElementById('ididid');

    // Změníme barvu vyplnění
    svgElement.setAttribute('fill', 'red');
}

const INFO_div = document.querySelector('.INFO-div');
let isInfoClicked = false;

function togglePadding() {
    if (!isInfoClicked) {
        INFO_div.style.paddingTop = '0';
    } else {
        INFO_div.style.paddingTop = '200px';
    }
    isInfoClicked = !isInfoClicked;
}


const BASKET_div = document.querySelector('.BASKET_ey');
let isBasketClicked = false;

function toggleRight() {
    if (!isBasketClicked) {
        BASKET_div.style.right = '-50px';
    } else {
        BASKET_div.style.right = '-1050px';
    }
    isBasketClicked = !isBasketClicked;
}

function buy() {
    var basketCount = document.getElementById('backet-count');
    basketCount.innerText = ''; // Zvýšení počtu o jedna a aktualizace HTML obsahu
}


//-----------------PEXESSO-----------------//


// Náhodné zamíchání prvků v poli items_ID
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//shuffle(items_ID);

var currentCardIndex = 0; // Index aktuální karty

function flipCard(cardId) {
    if (!pexessoDone){
        var card = document.getElementById(cardId);
        var pexessoDiv = card.querySelector('.item-pexesso-div');

        // Pokud uživatel klikne na správné ID postupně vzestupně
        if (cardId === items_ID[currentCardIndex]) {
            card.classList.add('flipped');
            setTimeout(function() {
                pexessoDiv.style.display = 'none';
            }, 170);
            // Přeskočení na další kartu
            currentCardIndex++;

            // Pokud uživatel otočil všechny karty
            if (currentCardIndex === items_ID.length) {
                pexessoDone = true;

                /*
                currentCardIndex = 0; // Resetovat index pro další hru
                items_ID = shuffle(items_ID); // Zamíchat karty pro další hru
                 */
            }
        } else {
            // Uživatel klikl na špatné ID, zpětně otočit všechny karty
            for (var i = 0; i < items_ID.length; i++) {
                var currentCard = document.getElementById(items_ID[i]);
                currentCard.classList.remove('flipped');
                var currentPexessoDiv = currentCard.querySelector('.item-pexesso-div');
                // Přidání časového intervalu pro zobrazení pexessa
                setTimeout((function(div) {
                    return function() {
                        div.style.display = 'block';
                    };
                })(currentPexessoDiv), 110); // Přesně v polovině animace
            }

            // Přidat efekt zatřesení (shake) karty
            card.classList.add('shake');

            // Resetovat zatřesení po určité době
            setTimeout(function() {
                card.classList.remove('shake');
            }, 500);

            // Resetovat index pro další pokus
            currentCardIndex = 0;
        }
    }
}

//-----------------PEXESSO-----------------//

function notAvaliable () {
    if (pexessoDone) {
        var panties = document.getElementById('panties');
        const notAvaliableDiv = document.querySelector('.not_avaliable_div');
        notAvaliableDiv.style.opacity = '1';

        setTimeout(function() {
            notAvaliableDiv.style.opacity = '0';
        }, 500);
        // Přidat efekt zatřesení (shake) karty
        panties.classList.add('shakeNormal');

        // Resetovat zatřesení po určité době
        setTimeout(function() {
            panties.classList.remove('shakeNormal');
        }, 500);
    }
}





function flipCardSimple(cardId) {
    var card = document.getElementById(cardId);
    card.classList.toggle('flipped');
    var pexessoDiv = card.querySelector('.item-pexesso-div');

    if (card.classList.contains('flipped')) {
        // Po otočení políčka skryjeme prvek .item-pexesso-div počkáme na dokončení animace
        setTimeout(function() {
            pexessoDiv.style.display = 'none';
        }, 170); // Přesně v polovině animace
    } else {
        // Při otočení zpět zobrazíme prvek .item-pexesso-div
        setTimeout(function() {
            pexessoDiv.style.display = 'block';
        }, 110); // Přesně v polovině animace

    }
}
