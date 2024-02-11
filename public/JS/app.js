

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })


const weatherForms=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

// let imageFnd=document.querySelector('#temp');

weatherForms.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;

    messageOne.textContent='Fetching information'
    messageTwo.textContent='';
    // imageFnd.src='';
    fetch(`/weather?address=${location}`).then((res)=>{
    res.json().then((data)=>{
        // console.log('OBJ',data);
        if(data.error)
        {
            // console.log(data.error);
            messageOne.textContent=data.error;
        }else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
            // imageFnd.src=data.icon;

            // console.log(data.location);
            // console.log('WEATHERS',data.forecast);
        }
    })
})

    // console.log('location',location);
})