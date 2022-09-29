const deleteBtn = document.querySelectorAll('.fa-trash')
const house = document.querySelectorAll('.house span')
const paperDelivered = document.querySelectorAll('span.delivered')
const papers = [...document.querySelectorAll('.paper')]

// Updates h2 to todays date
const date = document.querySelector('#date').innerText = new Date().toDateString()

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteItem)
})

Array.from(house).forEach((element) => {
    element.addEventListener('click', markDelivered)
})

Array.from(paperDelivered).forEach((element) => {
    element.addEventListener('click', markUnDelivered)
})


async function deleteItem(){
    const addressText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'addressFromJS' : addressText
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function markDelivered() {
    const addressText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch ('markDelivered', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'addressFromJS': addressText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        
    } catch(err){
        console.log(err)
    }
    
}

async function markUnDelivered() {
    const addressText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch ('markUnDelivered', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'addressFromJS' : addressText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(error){
        console.log(err)
    }
}

function countPapers() {
    
    const dataArr = []
    for (let i = 0; i < papers.length; i++) {
        dataArr.push(papers[i].innerText);
    }
    dataArr.reduce(function(a, b){
        a[b] = a[b] + 1 || 1
        return a;
    }, {});
    for (var c in dataArr) {
        const spanLocation = document.querySelector('.newspaperItems')
        const newElement = document.createElement('li');
        newElement.id = dataArr[c]; newElement.className = "newspaper";
        newElement.innerHTML = dataArr[c];
        spanLocation.appendChild(newElement);
    } 
}

countPapers()

// When address is marked as delivered make the li element turn dark grey
function deliveredDark() {
    paperDelivered.forEach(element => {
        element.parentNode.style.backgroundColor = "rgb(100, 99, 99)"
    })
}

deliveredDark()