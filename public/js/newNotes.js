// const publishBtn = document.getElementById("publishbtn");
// const draftBtn = document.getElementById("draftbtn");
// const myform = document.getElementById("myForm");



// publishBtn.addEventListener("click" ,async() => {
//     let validity = myform.checkValidity();
//     console.log(validity);
//     if(!validity){
//         myform.reportValidity();
//         return
//     }


//     let form = new FormData(myform);
//     console.log(Object.fromEntries(form.entries()));
//     const {title,story} = Object.fromEntries(form.entries());
//     console.log("publish button clicked");
//     const res = await fetch("/new",{
//         method:"POST",
//         headers :{
//             "Content-Type":"application/json"
//         },
//         body: JSON.stringify({ title,story })
//     })


    
//     window.location.href = "/Dashboard"
// })

// draftBtn.addEventListener("click" , () => {
//     console.log("draft button clicked");
// })