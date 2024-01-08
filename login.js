let dropdown = document.getElementsByClassName("dropdowns");
for (let i of dropdown) {
    i.addEventListener("mouseenter", (e) => {
        e.target.children[1].style.display = "block";
    });
}
for (let i of dropdown) {
    i.addEventListener("mouseleave", (e) => {
        e.target.children[1].style.display = "none";
    });
}
document.getElementById("cart").addEventListener("click", () => {
    document.getElementById("cart-offcanvas").style.visibility = "visible";
    document.getElementById("offcanvas-body").className = "cart-anim-start";
});
document.getElementById("cart-close").addEventListener("click", () => {
    document.getElementById("offcanvas-body").className = "cart-anim-end";
    setTimeout(() => {
        document.getElementById("cart-offcanvas").style.visibility = "hidden";
    }, 300);
});

let b = fetch("https://api.escuelajs.co/api/v1/users")
        .then((data) => {
            if (!data.ok) {
                throw new Error("Responded with Error : " + status);
            }
            return data.json();
        })
        .then((a) => {
            sessionStorage.setItem("dataOfUsers", JSON.stringify(a));
        })
        .catch((error) => {
            console.log(error);
        });

        userData = JSON.parse(sessionStorage.getItem("dataOfUsers"));
        
        for(let i in userData){  
            console.log(userData[i]["avatar"]);
        }
        function checkUserDetails(){
            let emailId =  document.getElementById("email-id").value;
            let password = document.getElementById("pass").value;
            for(let i in userData){  
                console.log(userData[i]["avatar"]);
                if(emailId == userData[i]["email"] && password == userData[i]["password"]){
                    console.log(userData[i]["name"]);
                    alert("Login Successful");
                    sessionStorage.setItem("username",userData[i]["name"]);
                    sessionStorage.setItem("url",userData[i]["avatar"]);
                    console.log(userData[i]["avatar"]);
                    return true;
                }
            }
            alert("Email or password doesn't match");
            return false;
        }
        document.getElementById("offcanvas-body").innerHTML = sessionStorage.getItem("cart-item");