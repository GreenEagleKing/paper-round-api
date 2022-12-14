const deleteBtn = document.querySelectorAll('.fa-trash')
const house = document.querySelectorAll('.house span')
const paperDelivered = document.querySelectorAll('span.delivered')
const papers = document.querySelectorAll('#newspaper')

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

// Delete todo item
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

// Mark as delivered item
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

// Mark as undelivered
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


// Counts publications yet to be delivered

function countPapers() {
    //creates object array for items not class as delivered
    let result = [];
    for (var i = 0; i < papers.length; i++) {
        if (papers[i].classList == ""){
        result.push({newspaper: papers[i].textContent});
        }
    }

    // Sums up duplicate newspapers
    let finalResult = Object.values(result.reduce((a,{newspaper}) => {
        let key = `${newspaper}`;
        a[key] = a[key] || {newspaper, count : 0};
        a[key].count++;
        return a;
    }, {}));

    // Creates an element for each newspaper + the total of that newspaper
    finalResult.forEach(element => {
        let liLocation = document.querySelector('.newspaperItems')
        let li = document.createElement('li')
        let spanPaper = document.createElement('span')
        let spanCount = document.createElement('span')
        li.appendChild(spanPaper)
        li.appendChild(spanCount);
        spanPaper.appendChild(document.createTextNode(element.newspaper));
        spanCount.appendChild(document.createTextNode(element.count));
        liLocation.appendChild(li);
        
    })
}

countPapers()

// When address is marked as delivered make the li element turn dark grey
function deliveredDark() {
    paperDelivered.forEach(element => {
        element.parentNode.style.backgroundColor = "rgb(100, 99, 99)"
    })
}

deliveredDark()