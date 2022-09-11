const deleteBtn = document.querySelectorAll('.fa-trash')
const house = document.querySelectorAll('.house span')
const paperDelivered = document.querySelectorAll('.house span.delivered')


Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteItem)
})

Array.from(house).forEach((element) => {
    element.addEventListener('click', markDelivered)
})

// Array.from(paperDelivered).forEach((element) => {
//     element.addEventListener('click', markUndelivered)
// })

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