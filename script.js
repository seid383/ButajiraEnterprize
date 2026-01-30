const inputs=document.querySelectorAll(".input");
const form =document.querySelector("form")

function focusFun(){
    let parent=this.parentNode;
    parent.classList.add("focus");
}
function blurFun(){
    let parent=this.parentNode;
    if(this.value === ""){
        parent.classList.remove("blur");
    }
    
}
inputs.forEach((input)=> {
    input.addEventListener("focus", focusFun);
    input.addEventListener("blur", blurFun);
});



//form submit handling


form.addEventListener("submit", function (e){
    e.preventDefault(); //stop page relode

    const name=form.querySelector('input[name="name"]').value.trim();
    const email=form.querySelector('input[name="email"]').value.trim();
    const phone=form.querySelector('input[name="phone"]').value.trim();
    const message=form.querySelector('textarea[name="message"]').value.trim();

    if(!name || !email || !phone || !message){
        alert("⚠️ እባኮትን ሁሉንም ይሙሉ");
        return;
    }

    //simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        alert("❌ እባኮትን ትክክለኛው ኢሜይል ይሙሉ");
        return;
    }

    //success message
    emailjs
    .sendForm("service_66vxqe5",
        "template_rwnj1jm",
        this        
    )
    .then(
        ()=>{
        alert("✅ መለእቶን በተሳካ ሁኔታ ተልኳል");
        form.reset();
        inputs.forEach((input) => {
            input.parentNode.classList.remove("focus");
});
},
(error) => {
    alert("❌ መለእቶ አልተላክም እንደገና ይሞክሩ");
    console.error(error);
}
);
});
const locationBtn=document.getElementById("getLocation");
const locationInput=document.getElementById("location");
const mapFrame=document.getElementById("mapFrame");

locationBtn.addEventListener("click", ()=>{
    if(!navigator.geolocation){
        alert("GPS is not supported on this device");
        return;
    }
        locationBtn.textContent="Getting Location....";

        navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude=position.coords.latitude;
            const longtude=position.coords.longitude;

            //save location for email
            locationInput.value = `Latitude: ${latitude}, Longitude: ${longtude}`;

            //update map

            mapFrame.src = `https://www.google.com/maps?q=${latitude},${longtude}&output=embed`;

            alert("✅ ቦታ በትክክል ተጨምሯል");
            locationBtn.textContent="ቦታ ተጨሯል";
        },
        ()=>{
            alert("Location access denied");
            locationBtn.textContent="use my location ";
        }

    );
});
