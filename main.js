// let call all of inputs attrubires by ID
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
// let call all of outputs attrubites by ads
let search = document.getElementById('search');
let deleteALL = document.getElementById("deleteall");
let tbody = document.getElementById('tbody');
// mood function
mood = 'create'
let temp;
// get total
function getTotal(){
    if(price.value != ''){
        let results = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = results
        total.style.background = '#ffff00ce'
        total.style.color = '#02163b'
    }else{
        total.innerHTML = ''
        total.style.background = '#02163b'
        total.style.color = '#8797de'
        priceRequird();
    }
}
function priceRequird(){
    if(taxes.value != '' && ads.value != '' && discount.value != ''){
        price.classList.add("warrning")
        price.placeholder = 'Price required!'
    } else{
        price.classList.remove("warrning")
        price.placeholder = 'Price'
    }
}



// create products
let dataPro;
if(localStorage.data != null){
    dataPro = JSON.parse(localStorage.data);
} else{
    dataPro = [];
}

create.onclick = function(){
    let userData = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    if(title.value != '' && price.value != '' && category.value != '' && count.value <= 100){
        if(mood == 'create'){
            // count function
            if(userData.count > 1){
                for(let i=0; i<userData.count; i++){
                    dataPro.push(userData);       
                    clearData();     
                }
            }else{
                dataPro.push(userData);
                clearData();
            }
            clearData();
            clearWarrningMSG()
        } else{
            dataPro[temp] = userData;
            mood = 'create'
            count.style.display = 'block'
            create.style.background = '#02163b'
            create.style.color = '#8797de'
            create.innerHTML = 'Create'
            clearData();
        }
    } else{
        warrningMSG();
        countWrrning();
    }
    // save products in localstorage
    localStorage.setItem('data', JSON.stringify(dataPro));

    showData();
}

// clear inputs.value function
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    category.value = '';
    count.value = '';
    total.innerHTML = '';
    total.style.background = '#01102b'
    total.style.color = '#8797de'
    count.placeholder = 'Count'
    count.classList.remove('warrning');
}
// warning message
function warrningMSG(){
    price.classList.add('warrning');
    title.classList.add('warrning');
    category.classList.add('warrning');
    title.placeholder = 'Title is required!'
    price.placeholder="Price is required!"
    category.placeholder="Category is required!"
}
function clearWarrningMSG(){
    price.classList.remove('warrning');
    title.classList.remove('warrning');
    category.classList.remove('warrning');
    title.placeholder = 'Title'
    price.placeholder="Price"
    category.placeholder="Category"
}
// count warrning function
function countWrrning(){
    if(count.value <= 100){
        count.placeholder = 'Count'
        count.classList.remove('warrning');
    } else{
        count.value = ''
        count.placeholder = 'Maximum 100 characters allowed.'
        count.classList.add('warrning');
}
}

// showdata (read data)
function showData(){
    let table = "";
    for(let  i=0; i<dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td id='ipad' class="mobile">${dataPro[i].taxes}</td>
            <td id='ipad' class="mobile">${dataPro[i].ads}</td>
            <td class="mobile">${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td class='mobile'>${dataPro[i].category}</td>
            <td onclick='deleteIteam(${i})' class="trans"><button>Delete</button></td>
            <td onclick='updateIteam(${i})' class="trans"><button>Update</button></td>
        </tr>     `
    }
    tbody.innerHTML = table
    if(dataPro.length > 1){
        deleteALL.innerHTML = `
        <button onclick="clearALL()">Clear All(${dataPro.length})</button>
        `
    }else{
        deleteALL.innerHTML = '';
    }
}
showData();


// delete all function
function clearALL(){
    dataPro.splice(0);
    localStorage.clear();
    showData();
}
// update funtion
function updateIteam(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    total.innerHTML = dataPro[i].total
    create.innerHTML = 'update'
    create.style.background = '#ffff00ce'
    create.style.color = '#02163b'
    count.style.display = 'none'
    mood = 'update'
    temp = i;
    getTotal();
    scroll({
        top:0,
        behavior: 'smooth',
    })
}




// delete function
function deleteIteam(i){
    dataPro.splice(i,1);
    localStorage.data = JSON.stringify(dataPro);
    showData();
}



// search function
let moodSearch = 'Title'
function getSearchMood(id){
    if(id == 'searchbytitle'){
        moodSearch = 'Title'
    } else{
        moodSearch = 'Category'
    }
    search.placeholder = 'Search By ' + moodSearch
    search.focus();
    search.style.height = '40px';
    search.style.backgroundColor = '#ffffffd0'
    search.value = ''
    showData();
}
// start searching by looping on the arrays
function searchData(value){
    table = '';
    if(moodSearch == "Title"){
        for(let i=0; i<dataPro.length; i++){
            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td id='ipad' class="mobile">${dataPro[i].taxes}</td>
                    <td id='ipad' class="mobile">${dataPro[i].ads}</td>
                    <td class="mobile">${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td class="mobile">${dataPro[i].category}</td>
                    <td onclick='deleteIteam(${i})' class="trans"><button>Delete</button></td>
                    <td onclick='updateIteam(${i})' class="trans"><button>Update</button></td>
                </tr>     `
            }
        }
    } else{
        for(let i=0; i<dataPro.length; i++){
            if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td id='ipad' class="mobile">${dataPro[i].taxes}</td>
                    <td id='ipad' class="mobile">${dataPro[i].ads}</td>
                    <td class="mobile">${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td class="mobile">${dataPro[i].category}</td>
                    <td onclick='deleteIteam(${i})' class="trans"><button>Delete</button></td>
                    <td onclick='updateIteam(${i})' class="trans"><button>Update</button></td>
                </tr>     `
            }
        }
    }
    tbody.innerHTML = table;
}






