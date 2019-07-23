console.log('Client Side Javascript is loaded')

// fetch('http://localhost:3000/weather?address=India').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    if(!location){
        console.log('No location provided')
    }else{
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            message1.textContent = data.error
            //console.log(data.error)
        } else {
            message2.textContent = data.location
            //console.log(data.location)
            //console.log(data.forecast)
        }
    })
})
}
})