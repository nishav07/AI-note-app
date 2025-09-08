const publishBtn = document.getElementById("publishbtn");
const draftBtn = document.getElementById("draftbtn");
const myform = document.getElementById("myForm");

publishBtn.addEventListener("click" , () => {
    let validity = myform.checkValidity();
    console.log(validity);
    if(!validity){
        myform.reportValidity();
        return
    }
    let form = new FormData(myform);
    console.log(Object.fromEntries(form.entries()));
    console.log("publish button clicked");
})

draftBtn.addEventListener("click" , () => {
    console.log("draft button clicked");
})