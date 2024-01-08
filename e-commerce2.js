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
document.getElementById("filter").addEventListener("click", ()=>{
    document
        .getElementById("filter")
        .setAttribute(
            "style",
            " background-color: white;color: black;border: 1px solid black;transition: all 0.5s ease;"
        );
    document.getElementById("filter-offcanvas").style.visibility = "visible";
    document.getElementById("offcanvas-filter-body").className =
        "filter-anim-start";
});

document.getElementById("filter-close").addEventListener("click", () => {
    document.getElementById("offcanvas-filter-body").className =
        "filter-anim-end";
    setTimeout(() => {
        document.getElementById("filter-offcanvas").style.visibility = "hidden";
    }, 300);
    document
        .getElementById("filter")
        .setAttribute("style", " background-color:black;color: white;border:none;");
});
let user = document.getElementById("user");

user.addEventListener('click',()=>{
    if(user.style.background != ""){
        document.getElementById("logout").className="logout-anim";
        document.getElementById("logout").style.display="block";
        document.getElementById("logout").addEventListener("click",()=>{
        document.getElementById("user-img").style.display="flex";
        user.style.background = "";
        sessionStorage.setItem("username","");
        sessionStorage.setItem("avatar","");
        document.getElementById("username").innerHTML="";
        document.getElementById("logout").style.display="none";
        })
    }
})
if(user.style.background == "" && sessionStorage.getItem("name") ==""){
    user.style.background = `url(${sessionStorage.getItem("url")}`;
    user.style.backgroundPosition="center";
    user.style.backgroundSize ="cover";
    document.getElementById("user-img").style.display="none";
    document.getElementById("username").innerHTML = "Welcome "+ "<strong>"+sessionStorage.getItem("username")+"</strong>";
}

let b = fetch("https://dummyjson.com/products")
    .then((data) => {
        if (!data.ok) {
            throw new Error("Responded with Error : " + status);
        }
        return data.json();
    })
    .then((a) => {
        sessionStorage.setItem("product", JSON.stringify(a));
    })
    .catch((error) => {
        console.log(error);
    });
    
let products = document.getElementById("products");
let productData = sessionStorage.getItem("product");
let filterList = document.getElementById("filter-list");

productData = JSON.parse(productData);
delete productData.total;
delete productData.skip;
delete productData.limit;
let count = 0;
let count1 = 0;


if (!products.hasChildNodes()) {
    for(let i in productData){
        for(let j = 10;j<20;j++){
            let col = document.createElement("div");
            col.className = "col"+" "+ productData[i][j]["category"];
            col.setAttribute("custom","rating:"+productData[i][j]["rating"]);
            col.setAttribute("name",productData[i][j]["brand"]);
            products.appendChild(col);
            let box = document.createElement("div");
            box.className = "box";
            box.setAttribute("style", "position:relative;transition:all 0.8s;");
            col.appendChild(box);
            let image = document.createElement("img");
            box.appendChild(image);
            let div = document.createElement("div");
            div.className = "img-box";
            div.setAttribute("style", "position:absolute;top:0;left:0;opacity:0;");
            box.appendChild(div);
            let image1 = document.createElement("img");
            div.appendChild(image1);
            let div1 = document.createElement("div");
            div1.setAttribute(
                "style",
                "position:absolute;top:40%;left:35%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;"
            );
            div.appendChild(div1);
            let icon1 = document.createElement("i");
            icon1.className = "fa fa-shopping-cart icon";
            icon1.onclick = function(){
                addToCart(productData[i][j]["images"][0],productData[i][j]["title"],productData[i][j]["price"]);
            }
            icon1.setAttribute("id", "icon" + ++count);
            icon1.style =
                "font-size: 15px; color: grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
            div1.appendChild(icon1);
            let icon2 = document.createElement("i");
            icon2.className = "fa fa-eye icon";
            icon2.setAttribute("id", "icon" + ++count);
            icon2.onclick=function() {  
                openModal(productData[i][j]["images"],productData[i][j]["title"],productData[i][j]["price"],productData[i][j]["brand"],productData[i][j]["description"],productData[i][j]["category"],productData[i][j]["stock"]);
                };
            icon2.style = "font-size: 15px; color: grey;height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
            div1.appendChild(icon2);
            let icon3 = document.createElement("i");
            icon3.className = "fa fa-heart icon";
            icon3.setAttribute("id", "icon" + ++count);
            icon3.onclick = function(){
                addToWishtList(productData[i][j]["images"][0],productData[i][j]["title"],productData[i][j]["price"],productData[i][j]["stock"]);
            }
            icon3.style =
                "font-size: 15px;color:grey;height:100%;padding:8px;cursor:pointer;";
            div1.appendChild(icon3);
            let div2 = document.createElement("div");
            div2.setAttribute(
                "style",
                "position:absolute;top:70%;left:30%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;"
            );
            div.appendChild(div2);
            ++count1;
            let iconDiv1 = document.createElement("div");
            iconDiv1.setAttribute("id", "text" + count1);
            iconDiv1.style =
                "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:18%;opacity:0;";
            iconDiv1.innerHTML = "Add to Cart";
            div.appendChild(iconDiv1);
            let divTraingle1 = document.createElement("div");
            divTraingle1.setAttribute("id", "t" + count1);
            divTraingle1.style =
                "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:38%;opacity:0;";
            div.appendChild(divTraingle1);
            ++count1;
            let iconDiv2 = document.createElement("div");
            iconDiv2.setAttribute("id", "text" + count1);
            iconDiv2.style =
                "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:29%;opacity:0;";
            iconDiv2.innerHTML = "Quick View";
            div.appendChild(iconDiv2);
            let divTraingle2 = document.createElement("div");
            divTraingle2.setAttribute("id", "t" + count1);
            divTraingle2.style =
                "width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:47%;opacity:0;";
            div.appendChild(divTraingle2);
            ++count1;
            let iconDiv3 = document.createElement("div");
            iconDiv3.setAttribute("id", "text" + count1);
            iconDiv3.style =
                "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:40%;opacity: 0 ;";
            iconDiv3.innerHTML = "Add to WishList";
            div.appendChild(iconDiv3);
            let divTraingle3 = document.createElement("div");
            divTraingle3.setAttribute("id", "t" + count1);
            divTraingle3.style =
                "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:58%;opacity:0;";
            div.appendChild(divTraingle3);
            for (let k in productData[i][j]) {
                if (k == "images") {
                    for (let l = 0; l < productData[i][j][k].length; l++) {
                        if (productData[i][j][k].length == 1) {
                            image.src = productData[i][j][k][l];
                            image1.src = productData[i][j][k][l];
                        } else if (productData[i][j][k].length == 3) {
                            image.src = productData[i][j][k][2];
                            image1.src = productData[i][j][k][1];
                        } else {
                            if (l == 3) {
                                image.src = productData[i][j][k][l];
                            } else if (l == 2) {
                                image1.src = productData[i][j][k][l];
                            }
                        }
                    }
                } else if (k == "price") {
                    let div2Child1 = document.createElement("div");
                    div2Child1.innerHTML ="Beauty Items";
                    div2.appendChild(div2Child1);
                    let div2Child2 = document.createElement("div");
                    div2Child2.setAttribute("id","products-price");
                    div2Child2.innerHTML = "Price : $" +"<span class='product-price'>"+productData[i][j][k]+"</span>"; 
                    div2.appendChild(div2Child2);
                }else if(k == "title"){
                    col.setAttribute("id",productData[i][j][k]);
                }
            }
        }
    }
}
if (products.hasChildNodes()) {
    for (let i of products.children) {
        i.children[0].addEventListener("mouseenter", (e) => {
            e.target.children[0].style = "opacity:0;transition: all 0.8s;";
            e.target.children[1].children[2].className = "product-anim";
            e.target.children[1].style =
                "position:absolute;top:0;left:0;opacity:1;transition: all 0.8s;";
        });
    }
    for (let i of products.children) {
        i.children[0].addEventListener("mouseleave", (e) => {
            e.target.children[0].style = "opacity:1;transition: all 0.8s;";
            e.target.children[1].children[2].className = "";
            e.target.children[1].style =
                "position:absolute;top:0;left:0;opacity:0;transition: all 0.8s;";
        });
    }
}

let icons = document.getElementsByClassName("icon");
for (let i of icons) {
    i.addEventListener("mouseenter", (e) => {
        let num = 0;
        if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
            num = e.target.id.charAt(e.target.id.length - 1);
            if (e.target.className == "fa fa-heart icon") {
                e.target.style =
                    "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                document.getElementById("text" + num).style =
                    document.getElementById("text" + num).getAttribute("style") +
                    "opacity:1;transition:0.2s ease;";
                document.getElementById("t" + num).style =
                    document.getElementById("t" + num).getAttribute("style") +
                    "opacity:1;";
            } else {
                e.target.style =
                    "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                if (e.target.className != "fa fa-heart icon") {
                    document.getElementById("text" + num).style =
                        document.getElementById("text" + num).getAttribute("style") +
                        "opacity:1;transition:0.2s ease;";
                    document.getElementById("t" + num).style =
                        document.getElementById("t" + num).getAttribute("style") +
                        "opacity:1;transition:0.2s ease;";
                }
            }
        } else {
            num =
                e.target.id.charAt(e.target.id.length - 2) +
                e.target.id.charAt(e.target.id.length - 1);
            if (e.target.className == "fa fa-heart icon") {
                e.target.style =
                    "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                document.getElementById("text" + num).style =
                    document.getElementById("text" + num).getAttribute("style") +"opacity:1;transition:0.2s ease;";
                document.getElementById("t" + num).style =
                    document.getElementById("t" + num).getAttribute("style") + "opacity:1;";
            } else {
                e.target.style =
                    "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                if (e.target.className != "fa fa-heart icon") {
                    document.getElementById("text" + num).style =
                        document.getElementById("text" + num).getAttribute("style") +
                        "opacity:1;transition:0.2s ease;";
                    document.getElementById("t" + num).style =
                        document.getElementById("t" + num).getAttribute("style") +
                        "opacity:1;transition:0.2s ease;";
                }
            }
        }
    });
    i.addEventListener("mouseleave", (e) => {
        let num = 0;
        if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
            num = e.target.id.charAt(e.target.id.length - 1);
            if (e.target.className == "fa fa-heart icon") {
                e.target.style =
                    "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                document.getElementById("text" + num).style =
                    document.getElementById("text" + num).getAttribute("style") +
                    "opacity:0;transition:0.2s ease;";
                document.getElementById("t" + num).style =
                    document.getElementById("t" + num).getAttribute("style") +
                    "opacity:0;transition:0.2s ease;";
            } else {
                e.target.style =
                    "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                if (e.target.id == "icon" + num) {
                    document.getElementById("text" + num).style =
                        document.getElementById("text" + num).getAttribute("style") +
                        "opacity:0;transition:0.2s ease;";
                    document.getElementById("t" + num).style =
                        document.getElementById("t" + num).getAttribute("style") +
                        "opacity:0;transition:0.2s ease;";
                }
            }
        } else {
            num =
                e.target.id.charAt(e.target.id.length - 2) +
                e.target.id.charAt(e.target.id.length - 1);
            if (e.target.className == "fa fa-heart icon") {
                e.target.style =
                    "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                document.getElementById("text" + num).style =
                    document.getElementById("text" + num).getAttribute("style") +
                    "opacity:0;transition:0.2s ease;";
                document.getElementById("t" + num).style =
                    document.getElementById("t" + num).getAttribute("style") +
                    "opacity:0;transition:0.2s ease;";
            } else {
                e.target.style =
                    "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                if (e.target.id == "icon" + num) {
                    document.getElementById("text" + num).style =
                        document.getElementById("text" + num).getAttribute("style") +
                        "opacity:0;transition:0.2s ease;";
                    document.getElementById("t" + num).style =
                        document.getElementById("t" + num).getAttribute("style") +
                        "opacity:0;transition:0.2s ease;";
                }
            }
        }
    });
}

let navtabs = document.getElementsByClassName("nav-tabs");
for (let i of navtabs) {
    let num = i.getAttribute("id").charAt(i.getAttribute("id").length - 1);
    i.setAttribute("onclick", "navtabFunc(this," + num + ")");
}
function navtabFunc(e, num) {
    if (num == 1) {
        document.getElementById("products").className="row row-cols-2 gy-5";
        for(let i of document.getElementById("products").children){
            i.children[0].children[1].children[0].style="width:650px;height:320px!important";
            i.children[0].children[1].children[1].style="position:absolute;top:40%;left:45%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;";
            i.children[0].children[1].children[2].style="position:absolute;top:70%;left:30%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;";
            i.children[0].children[1].children[3].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:28%;opacity:0;";
            i.children[0].children[1].children[4].style="width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:46%;opacity:0;";
            i.children[0].children[1].children[5].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:32%;opacity:0;";
            i.children[0].children[1].children[6].style="width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:51%;opacity:0;";
            i.children[0].children[1].children[7].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:37%;opacity: 0 ;";
            i.children[0].children[1].children[8].style="width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:56%;opacity:0;";
        }
        for(let j of document.getElementsByClassName("navtabs")){
            j.className="navtabs";
        }
        for(let k of e.children){
            k.className="navtabs active";
        }
    } else if (num == 2) {
        document.getElementById("products").className="row row-cols-3 gy-5";
        for(let i of document.getElementById("products").children){
            i.children[0].children[1].children[0].style="width:427px;height:320px!important";
            i.children[0].children[1].children[1].style="position:absolute;top:40%;left:42%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;";
            i.children[0].children[1].children[2].style="position:absolute;top:70%;left:40%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;";
            i.children[0].children[1].children[3].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:25%;opacity:0;";
            i.children[0].children[1].children[4].style="width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:44%;opacity:0;";
            i.children[0].children[1].children[5].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:32%;opacity:0;";
            i.children[0].children[1].children[6].style="width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:51%;opacity:0;";
            i.children[0].children[1].children[7].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:39%;opacity: 0 ;";
            i.children[0].children[1].children[8].style="width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:58%;opacity:0;";
        }
        for(let j of document.getElementsByClassName("navtabs")){
            j.className="navtabs";
        }
        for(let k of e.children){
            k.className="navtabs active";
        }
    } else {
        document.getElementById("products").className="row row-cols-4 gy-5";
        for(let i of document.getElementById("products").children){
            i.children[0].children[1].children[0].style="width:100%;height:320px!important";
            i.children[0].children[1].children[1].style="position:absolute;top:40%;left:35%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;";
            i.children[0].children[1].children[2].style="position:absolute;top:70%;left:32%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;";
            i.children[0].children[1].children[3].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:18%;opacity:0;";
            i.children[0].children[1].children[4].style="width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:38%;opacity:0;";
            i.children[0].children[1].children[5].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:29%;opacity:0;";
            i.children[0].children[1].children[6].style="width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:47%;opacity:0;";
            i.children[0].children[1].children[7].style="width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:40%;opacity: 0 ;";
            i.children[0].children[1].children[8].style="width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:58%;opacity:0;";
        }
        for(let j of document.getElementsByClassName("navtabs")){
            j.className="navtabs";
        }
        for(let k of e.children){
            k.className="navtabs active";
        }
    } 
}
function openModal(imgSrcArr,title,price,brand,description,category,stock){
    document.getElementById("modal").style="visibility:visible";
    document.getElementById("modal-row").children[0].innerHTML="";
    let box = document.createElement("div");
    box.className="box";
    document.getElementById("modal-row").children[0].appendChild(box);
    let carousel = document.createElement("div");
    carousel.className="carousel";
    box.appendChild(carousel);
    let slider = document.createElement("div");
    slider.className="slider";
    carousel.appendChild(slider);
    let carouselIndicator = document.createElement("div");
    carouselIndicator.className="carousel-indicatorsMyVersion";
    carousel.appendChild(carouselIndicator);
    let prevBtn = document.createElement("button");
    prevBtn.setAttribute("id","prev");
    carousel.appendChild(prevBtn);
    let prevIcon = document.createElement("i");
    prevIcon.className="fa fa-arrow-left";
    prevBtn.appendChild(prevIcon);
    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("id","next");
    carousel.appendChild(nextBtn);
    let nextIcon = document.createElement("i");
    nextIcon.className = "fa fa-arrow-right";
    nextBtn.appendChild(nextIcon);
   for(let i=0;i<imgSrcArr.length;i++){
        let img = document.createElement("img");
        img.setAttribute("src",imgSrcArr[i]);
        img.className="slide";
        img.setAttribute("id","img"+(i+1));
        slider.appendChild(img);
        let carouselInd = document.createElement("div");
        if(i==0){
            carouselInd.className="carouselIndicator active1";
        }else{
            carouselInd.className="carouselIndicator";
        }
        carouselInd.setAttribute("id","indicator"+(i+1));
        carouselIndicator.appendChild(carouselInd);
    }
    let slides = document.querySelectorAll(".slide");
    let counter = 0 ;
    let carouselIndicators = document.querySelectorAll(".carouselIndicator");
    slides.forEach(
        (slide,index) => {
            slide.style.left= index*100+"%";
    });
    document.getElementById("next").addEventListener('click',()=>{
        for(let i of carouselIndicators){
            if(i.className == "carouselIndicator active1"){
                i.className = "carouselIndicator";
            }
        }
        if(counter == slides.length-1){
            counter = 0;
            document.getElementById("indicator"+(counter+1)).setAttribute("class","carouselIndicator active1");
            slides.forEach((slide)=>{
                slide.style.transition="none";
                slide.style.transform = `translateX(${counter*100}%)`;
            });
        }else{
            counter = counter+1;
            document.getElementById("indicator"+(counter+1)).setAttribute("class","carouselIndicator active1");
            slides.forEach((slide)=>{
                slide.style.transition="transform 0.4s ease-in-out";
                slide.style.transform = `translateX(-${counter*100}%)`;
            });
        }
    });
    document.getElementById("prev").addEventListener('click',()=>{
        for(let i of carouselIndicators){
            i.className ="carouselIndicator";
        }
        if(counter == 0){
            counter = slides.length - 1;
            document.getElementById("indicator"+(counter+1)).setAttribute("class","carouselIndicator active1");
            slides.forEach((slide)=>{
            slide.style.transition="none";
            slide.style.transform = `translateX(-${counter*100}%)`;
        });
        }else{
            counter = counter - 1;
            document.getElementById("indicator"+(counter+1)).setAttribute("class","carouselIndicator active1");
            slides.forEach((slide)=>{
            slide.style.transition="transform 0.8s ease-in-out";
            slide.style.transform = `translateX(-${counter*100}%)`;
            });
        }
    });

    for(let i of carouselIndicators){
        
        i.addEventListener('click',(e)=>{
            let num = e.target.getAttribute("id").charAt(i.getAttribute("id").length-1);
            for(let i of carouselIndicators){
                if(i.className == "carouselIndicator active1"){
                    i.className = "carouselIndicator";
                }
            }
            e.target.className="carouselIndicator active1";
            if(num-1 == 0){
                slides.forEach((slide)=>{
                slide.style.transition="none";
                slide.style.transform = `translateX(${num-1*100}%)`;
                });
            }
            else{
                slides.forEach((slide)=>{
                slide.style.transition="transform 0.8s ease-in-out";
                slide.style.transform = `translateX(-${(num-1)*100}%)`;
                });
            }
        });
    }

    setInterval(()=>{
        counter++;
        
        if(counter == slides.length){
            counter = 0;
            for(let i of document.querySelectorAll(".carouselIndicator.active1")){
                i.className = "carouselIndicator";
             }
            document.getElementById("indicator"+(counter+1)).setAttribute("class","carouselIndicator active1");
            slides.forEach((slide)=>{
                slide.style.transition="none";
                slide.style.transform = `translateX(${counter*100}%)`;
            });
        }else{
            if(counter+1<slides.length+1){
                for(let i of document.querySelectorAll(".carouselIndicator.active1")){
                    i.className = "carouselIndicator";
                 }
                document.getElementById("indicator"+(counter+1)).setAttribute("class","carouselIndicator active1");
            }
            slides.forEach((slide)=>{
                slide.style.transition="transform 0.4s ease-in-out";
                slide.style.transform = `translateX(-${counter*100}%)`;
            });
        }

    },5000);
    document.getElementById("modal-row").children[1].innerHTML="";
    let box1 = document.createElement("div");
    box1.className="box mt-5 pt-3";
    document.getElementById("modal-row").children[1].appendChild(box1);
    let header = document.createElement("div");
    header.className="header";
    header.setAttribute("style","display:flex;justify-content: space-between;align-items:center;")
    box1.appendChild(header);
    let deviceNamePrice = document.createElement("div");
    deviceNamePrice.className="product-name-price";
    deviceNamePrice.setAttribute("style","display:flex;flex-direction:column;justify-content:center;")
    header.appendChild(deviceNamePrice);
    let productName = document.createElement("div");
    productName.className="product-name h3";
    productName.innerHTML= title;
    deviceNamePrice.appendChild(productName);
    let productPrice = document.createElement("div");
    productPrice.className="product-price h5"
    productPrice.innerHTML="$ : "+"<strong>" + price + "</strong>";
    deviceNamePrice.appendChild(productPrice);
    let productBrand = document.createElement("div");
    productBrand.className ="brand-name fs-5";
    productBrand.innerHTML="Brand Name: "+"<strong>"+brand+"</strong>";
    header.appendChild(productBrand);
    let hr = document.createElement("hr");
    box1.appendChild(hr);
    let productDescription = document.createElement("div");
    productDescription.className = "product-description mt-3 mb-3";
    productDescription.setAttribute("style","color: #808080;font-size:18px;");
    productDescription.innerHTML = description;
    box1.appendChild(productDescription);
    let hr1 = document.createElement("hr");
    box1.appendChild(hr1);
    let productDetail = document.createElement("div");
    productDetail.className = "product-detail mt-4 mb-4";
    productDetail.setAttribute("style","display:flex;flex-direction:column;");
    box1.appendChild(productDetail);
    let cartDetail = document.createElement("div");
    cartDetail.setAttribute("style","display:flex;gap:25px;")
    cartDetail.className="cart-detail";
    productDetail.appendChild(cartDetail);
    let productQuantity = document.createElement("div");
    productQuantity.setAttribute("style","display:flex;height:100%");
    productQuantity.className = "product-quantity";
    cartDetail.appendChild(productQuantity);
    let quantityDisplay = document.createElement("div");
    quantityDisplay.setAttribute("id","quant-display");
    quantityDisplay.className = "quantity-display";
    quantityDisplay.innerHTML = "1";
    quantityDisplay.setAttribute("style","border:1px solid grey;padding:6px 15px;display:flex;justify-content: center;align-items:center;border-right:none;font-weight: 500;");
    productQuantity.appendChild(quantityDisplay);
    let quantityCounter = document.createElement("div");
    quantityCounter.className = "quantity-counter";
    quantityCounter.setAttribute("style","display:flex;flex-direction:column;");
    productQuantity.appendChild(quantityCounter);
    let quantityDecrement = document.createElement("div");
    quantityDecrement.setAttribute("onclick","quantityChange(this)");
    quantityDecrement.setAttribute("id","decrement");
    quantityDecrement.className = "quantity-decrement";
    quantityDecrement.setAttribute("style","display:flex;justify-content: center;align-items:center;border:1px solid grey;padding:3px;cursor:pointer");
    quantityCounter.appendChild(quantityDecrement);
    let minus = document.createElement("i");
    minus.className = "fa fa-minus";
    quantityDecrement.appendChild(minus);
    let quantityIncrement = document.createElement("div");
    quantityIncrement.setAttribute("onclick","quantityChange(this)");
    quantityIncrement.setAttribute("id","increment");
    quantityIncrement.className = "quantity-increment";
    quantityIncrement.setAttribute("style","display:flex;justify-content: center;align-items:center;border:1px solid grey;padding:3px;cursor:pointer");
    quantityCounter.appendChild(quantityIncrement);
    let plus = document.createElement("i");
    plus.className = "fa fa-plus";
    plus.setAttribute("id","increment");
    quantityIncrement.appendChild(plus);
    let addToCartBtn = document.createElement("div");
    addToCartBtn.className = "add-to-cart";
    addToCartBtn.innerHTML = "ADD TO CART";
    addToCartBtn.onclick = function(){
        addToCartModalValue(imgSrcArr[0],title,price,document.getElementById("quant-display").innerHTML);
    }
    addToCartBtn.setAttribute("style","width:140px;border:none;display:flex;justify-content: center;align-items:center;background-color:black;color:white;font-weight: 500;cursor:pointer;");
    cartDetail.appendChild(addToCartBtn);
    let listVal = document.createElement("div");
    listVal.setAttribute("style","display:flex;gap:20px;height:100%");
    listVal.className="list-val mt-3";
    productDetail.appendChild(listVal);
    let addToWhishList = document.createElement("div");
    addToWhishList.className = "add-to-whishlist";
    addToWhishList.setAttribute("style","display:flex;justify-content: center;align-items:center;gap:8px;");
    addToWhishList.onclick = function(){
        addToWishtList(imgSrcArr[0],title,price,stock);
    }
    listVal.appendChild(addToWhishList);
    let heartIcon = document.createElement("i");
    heartIcon.className =  "fa fa-heart-o";
    addToWhishList.appendChild(heartIcon);
    let whishlistPara = document.createElement("span");
    whishlistPara.innerHTML = "ADD TO WHISHLIST";
    whishlistPara.className = "text-muted";
    addToWhishList.appendChild(whishlistPara);
    let hr2 = document.createElement("hr");
    box1.appendChild(hr2);
    let categorySocial = document.createElement("div");
    categorySocial.className = "category-social mt-4";
    categorySocial.setAttribute("style","display:flex;flex-direction:column;justify-content-space-between;");
    box1.appendChild(categorySocial);
    let category1 = document.createElement("div");
    category1.className = "category";
    category1.innerHTML = "<strong class='h5'>" + "Category : " +"</strong>" + category.toUpperCase();
    categorySocial.appendChild(category1);
    let social =  document.createElement("div");
    social.className = "social mt-4";
    social.style="display:flex;gap:10px;align-items:center;";
    categorySocial.appendChild(social);
    let socialPara = document.createElement("span");
    socialPara.className = "social-para";
    socialPara.innerHTML = "SHARE : ";
    social.appendChild(socialPara);
    let fb = document.createElement("i");
    fb.setAttribute("id","facebook");
    fb.className = "fa fa-facebook-f";
    social.appendChild(fb);
    let tw = document.createElement("i");
    tw.setAttribute("id","twitter");
    tw.className = "fa fa-twitter";
    social.appendChild(tw);
    let linkIn = document.createElement("i");
    linkIn.setAttribute("id","linkedin");
    linkIn.className = "fa fa-linkedin";
    social.appendChild(linkIn);
    let pinterest = document.createElement("i");
    pinterest.setAttribute("id","pinterest");
    pinterest.className = "fa fa-pinterest";
    social.appendChild(pinterest);
 }
 let qCount = 1;
 function quantityChange(e){
    let display = document.getElementById("quant-display");
    if(e.getAttribute("id") == "increment"){
        qCount++;
        display.innerHTML = qCount;
    }
    if(e.getAttribute("id") == "decrement"){
        qCount --;
        if(qCount == 0){
            qCount = 0;
            display.innerHTML = qCount;
        }
        if(qCount>0){
            display.innerHTML = qCount;
        }
    }
 }
document.getElementById("modal-close").addEventListener('click',(e)=>{
    document.getElementById("modal").style="visibility:hidden";
});

document.getElementById("sorted").addEventListener("mouseenter",()=>{
    document.getElementById("sorting-options").style.display = "inline-block";
    document.getElementById("sorting-options").className ="sorting-scale";
    document.getElementById("arrow-pointer").className = "fa fa-caret-up";
});

document.getElementById("sorted").addEventListener("mouseleave",()=>{
    document.getElementById("sorting-options").style.display="none";
    document.getElementById("sorting-options").className ="";
    document.getElementById("arrow-pointer").className = "fa fa-caret-down";
});

function addToWishtList(imgSrc,title,price,stock){
    let whishListArr = [];
    whishListArr.push(imgSrc,title,price,stock);
    sessionStorage.setItem("whishListValues",whishListArr);
    sessionStorage.removeItem("whishListValues[]");
}

let filterApplied = [];
for(let i of document.querySelectorAll("#offcanvas-filter-body input")){
    i.addEventListener('click',(e)=>{
        if(e.target.checked == true){
            if(!filterApplied.includes(e.target.parentNode.children[1].innerHTML) && e.target.getAttribute("value") != "Clear Filters"){
                filterApplied.push(e.target.getAttribute("value"));
                let filterDiv = document.createElement("div");
                filterDiv.className="filter-applied d-flex justify-content-between align-items-center ps-3 pe-3 pt-2";
                document.getElementById("filter-list").appendChild(filterDiv);
                let filterName = document.createElement("div");
                filterName.className="filter-name";
                filterName.innerHTML = e.target.parentNode.children[1].innerHTML;
                filterDiv.appendChild(filterName);
                let closeFilter = document.createElement("i");
                closeFilter.className = "fa fa-times";
                closeFilter.setAttribute("onclick","closeFilter(this);");
                filterDiv.appendChild(closeFilter);
                applyFilter("filter-option",e.target.getAttribute("name"),e.target.getAttribute("value"),e.target);
                e.target.checked = false;
            }else{
                e.target.checked = false;
            }
        }
    });
}

function closeFilter(e){
    let filterName;
    e.parentNode.remove();
    for(let i of document.querySelectorAll("#offcanvas-filter-body input")){
        if(e.previousSibling.innerHTML.toLowerCase() == i.value.toLowerCase()){
            i.checked = false;
            filterName = filterApplied.splice(filterApplied.indexOf(e.previousSibling.innerHTML),1);
            break;
        }
    }
    filterName = filterName[0];
    let allColms = document.querySelectorAll("#products .col");
    if(filterApplied.length > 0){
        if(filterName == "Skin Care" || filterName == "Fragrances"){
            if(filterName == "Skin Care"){
                if(filterApplied.includes("Fragrances")){
                    Array.from(allColms).filter((a)=>{
                        return a.className == "col skincare";
                    }).map((b)=>{
                        b.style.display = "none";
                    });
                    filterApplied.filter((a)=>{
                        return a == "Fragrances";
                    }).map((b)=>{
                        filterApplied.filter((c)=>{
                            return c!=b;
                        }).map((d)=>{
                            Array.from(allColms).filter((e)=>{
                                return e.getAttribute("name") == d && a.getAttribute("class").split(" ").splice(-1)[0] == b.replace(/\s/g,'').toLowerCase();
                            }).map((f)=>{
                                f.style.display = "block";
                            })
                        })
                    });
                    let finalCount = Array.from(allColms).filter((d)=>{
                        return d.style.display!="none";
                    })
                    document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                }else{
                    filterApplied.map((a)=>{
                        Array.from(allColms).filter((b)=>{
                            return b.getAttribute("name") == a;
                        }).map((c)=>{
                            c.style.display = "block";
                        })
                    });
                    let finalCount = Array.from(allColms).filter((d)=>{
                        return d.style.display!="none";
                    })
                    document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                }
            }else{
                if(filterApplied.includes("Skin Care")){
                    Array.from(allColms).filter((a)=>{
                        return a.className == "col fragrances";
                    }).map((b)=>{
                        b.style.display = "none";
                    });
                    filterApplied.filter((a)=>{
                        return a == "Skin Care";
                    }).map((b)=>{
                        filterApplied.filter((c)=>{
                            return c!=b;
                        }).map((d)=>{
                            Array.from(allColms).filter((e)=>{
                                return e.getAttribute("name") == d && a.getAttribute("class").split(" ").splice(-1)[0] == b.replace(/\s/g,'').toLowerCase();
                            }).map((f)=>{
                                f.style.display = "block";
                            })
                        })
                    });
                    let finalCount = Array.from(allColms).filter((d)=>{
                        return d.style.display!="none";
                    })
                    document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                }else{
                    filterApplied.map((a)=>{
                        Array.from(allColms).filter((b)=>{
                            return b.getAttribute("name") == a;
                        }).map((c)=>{
                            console.log()
                            c.style.display = "block";
                        })
                    });
                    let finalCount = Array.from(allCols).filter((d)=>{
                        return d.style.display!="none";
                    })
                    document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                }
            }
        }else{
            Array.from(allColms).filter((a)=>{
                return a.getAttribute("name") == filterName;
            }).map((a)=>{
                a.style.display = "none";
            });
            filterApplied.map((a)=>{
                Array.from(allColms).filter((b)=>{
                    return b.getAttribute("class").split(" ").splice(-1)[0] == a.toLowerCase();
                }).map((c)=>{
                    c.style.display ="block";
                });
            });
            filterApplied.map((a)=>{
                Array.from(allColms).filter((b)=>{
                    return b.getAttribute("name") == a;
                }).map((c)=>{
                    c.style.display ="block";
                });
            });
            let finalCount = Array.from(allCols).filter((d)=>{
                return d.style.display!="none";
            });
            document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
        }
    }
}

function closeAllFilter(e){
    document.getElementById("filter-list").innerHTML = ""
    products.innerHTML = "";
    if (!products.hasChildNodes()) {
        for(let i in productData){
            for(let j = 10;j<20;j++){
                let col = document.createElement("div");
                col.className = "col"+" "+ productData[i][j]["category"];
                col.setAttribute("custom","rating:"+productData[i][j]["rating"]);
                col.setAttribute("name",productData[i][j]["brand"]);
                products.appendChild(col);
                let box = document.createElement("div");
                box.className = "box";
                box.setAttribute("style", "position:relative;transition:all 0.8s;");
                col.appendChild(box);
                let image = document.createElement("img");
                box.appendChild(image);
                let div = document.createElement("div");
                div.className = "img-box";
                div.setAttribute("style", "position:absolute;top:0;left:0;opacity:0;");
                box.appendChild(div);
                let image1 = document.createElement("img");
                div.appendChild(image1);
                let div1 = document.createElement("div");
                div1.setAttribute(
                    "style",
                    "position:absolute;top:40%;left:35%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;"
                );
                div.appendChild(div1);
                let icon1 = document.createElement("i");
                icon1.className = "fa fa-shopping-cart icon";
                icon1.onclick = function(){
                    addToCart(productData[i][j]["images"][0],productData[i][j]["title"],productData[i][j]["price"]);
                }
                icon1.setAttribute("id", "icon" + ++count);
                icon1.style =
                    "font-size: 15px; color: grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                div1.appendChild(icon1);
                let icon2 = document.createElement("i");
                icon2.className = "fa fa-eye icon";
                icon2.setAttribute("id", "icon" + ++count);
                icon2.onclick=function() {  
                    openModal(productData[i][j]["images"],productData[i][j]["title"],productData[i][j]["price"],productData[i][j]["brand"],productData[i][j]["description"],productData[i][j]["category"],productData[i][j]["stock"]);
                    };
                icon2.style = "font-size: 15px; color: grey;height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                div1.appendChild(icon2);
                let icon3 = document.createElement("i");
                icon3.className = "fa fa-heart icon";
                icon3.setAttribute("id", "icon" + ++count);
                icon3.onclick = function(){
                    addToWishtList(productData[i][j]["images"][0],productData[i][j]["title"],productData[i][j]["price"],productData[i][j]["stock"]);
                }
                icon3.style =
                    "font-size: 15px;color:grey;height:100%;padding:8px;cursor:pointer;";
                div1.appendChild(icon3);
                let div2 = document.createElement("div");
                div2.setAttribute(
                    "style",
                    "position:absolute;top:70%;left:30%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;"
                );
                div.appendChild(div2);
                ++count1;
                let iconDiv1 = document.createElement("div");
                iconDiv1.setAttribute("id", "text" + count1);
                iconDiv1.style =
                    "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:18%;opacity:0;";
                iconDiv1.innerHTML = "Add to Cart";
                div.appendChild(iconDiv1);
                let divTraingle1 = document.createElement("div");
                divTraingle1.setAttribute("id", "t" + count1);
                divTraingle1.style =
                    "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:38%;opacity:0;";
                div.appendChild(divTraingle1);
                ++count1;
                let iconDiv2 = document.createElement("div");
                iconDiv2.setAttribute("id", "text" + count1);
                iconDiv2.style =
                    "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:29%;opacity:0;";
                iconDiv2.innerHTML = "Quick View";
                div.appendChild(iconDiv2);
                let divTraingle2 = document.createElement("div");
                divTraingle2.setAttribute("id", "t" + count1);
                divTraingle2.style =
                    "width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:47%;opacity:0;";
                div.appendChild(divTraingle2);
                ++count1;
                let iconDiv3 = document.createElement("div");
                iconDiv3.setAttribute("id", "text" + count1);
                iconDiv3.style =
                    "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:40%;opacity: 0 ;";
                iconDiv3.innerHTML = "Add to WishList";
                div.appendChild(iconDiv3);
                let divTraingle3 = document.createElement("div");
                divTraingle3.setAttribute("id", "t" + count1);
                divTraingle3.style =
                    "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:58%;opacity:0;";
                div.appendChild(divTraingle3);
                for (let k in productData[i][j]) {
                    if (k == "images") {
                        for (let l = 0; l < productData[i][j][k].length; l++) {
                            if (productData[i][j][k].length == 1) {
                                image.src = productData[i][j][k][l];
                                image1.src = productData[i][j][k][l];
                            } else if (productData[i][j][k].length == 3) {
                                image.src = productData[i][j][k][2];
                                image1.src = productData[i][j][k][1];
                            } else {
                                if (l == 3) {
                                    image.src = productData[i][j][k][l];
                                } else if (l == 2) {
                                    image1.src = productData[i][j][k][l];
                                }
                            }
                        }
                    } else if (k == "price") {
                        let div2Child1 = document.createElement("div");
                        div2Child1.innerHTML ="Beauty Items";
                        div2.appendChild(div2Child1);
                        let div2Child2 = document.createElement("div");
                        div2Child2.setAttribute("id","products-price");
                        div2Child2.innerHTML = "Price : $" +"<span class='product-price'>"+productData[i][j][k]+"</span>"; 
                        div2.appendChild(div2Child2);
                    }else if(k == "title"){
                        col.setAttribute("id",productData[i][j][k]);
                    }
                }
            }
        }
    }
    if (products.hasChildNodes()) {
        for (let i of products.children) {
            i.children[0].addEventListener("mouseenter", (e) => {
                e.target.children[0].style = "opacity:0;transition: all 0.8s;";
                e.target.children[1].children[2].className = "product-anim";
                e.target.children[1].style =
                    "position:absolute;top:0;left:0;opacity:1;transition: all 0.8s;";
            });
        }
        for (let i of products.children) {
            i.children[0].addEventListener("mouseleave", (e) => {
                e.target.children[0].style = "opacity:1;transition: all 0.8s;";
                e.target.children[1].children[2].className = "";
                e.target.children[1].style =
                    "position:absolute;top:0;left:0;opacity:0;transition: all 0.8s;";
            });
        }
    }
    
    let icons = document.getElementsByClassName("icon");
    for (let i of icons) {
        i.addEventListener("mouseenter", (e) => {
            let num = 0;
            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                num = e.target.id.charAt(e.target.id.length - 1);
                if (e.target.className == "fa fa-heart icon") {
                    e.target.style =
                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                    document.getElementById("text" + num).style =
                        document.getElementById("text" + num).getAttribute("style") +
                        "opacity:1;transition:0.2s ease;";
                    document.getElementById("t" + num).style =
                        document.getElementById("t" + num).getAttribute("style") +
                        "opacity:1;";
                } else {
                    e.target.style =
                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                    if (e.target.className != "fa fa-heart icon") {
                        document.getElementById("text" + num).style =
                            document.getElementById("text" + num).getAttribute("style") +
                            "opacity:1;transition:0.2s ease;";
                        document.getElementById("t" + num).style =
                            document.getElementById("t" + num).getAttribute("style") +
                            "opacity:1;transition:0.2s ease;";
                    }
                }
            } else {
                num =
                    e.target.id.charAt(e.target.id.length - 2) +
                    e.target.id.charAt(e.target.id.length - 1);
                if (e.target.className == "fa fa-heart icon") {
                    e.target.style =
                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                    document.getElementById("text" + num).style =
                        document.getElementById("text" + num).getAttribute("style") +"opacity:1;transition:0.2s ease;";
                    document.getElementById("t" + num).style =
                        document.getElementById("t" + num).getAttribute("style") + "opacity:1;";
                } else {
                    e.target.style =
                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                    if (e.target.className != "fa fa-heart icon") {
                        document.getElementById("text" + num).style =
                            document.getElementById("text" + num).getAttribute("style") +
                            "opacity:1;transition:0.2s ease;";
                        document.getElementById("t" + num).style =
                            document.getElementById("t" + num).getAttribute("style") +
                            "opacity:1;transition:0.2s ease;";
                    }
                }
            }
        });
        i.addEventListener("mouseleave", (e) => {
            let num = 0;
            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                num = e.target.id.charAt(e.target.id.length - 1);
                if (e.target.className == "fa fa-heart icon") {
                    e.target.style =
                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                    document.getElementById("text" + num).style =
                        document.getElementById("text" + num).getAttribute("style") +
                        "opacity:0;transition:0.2s ease;";
                    document.getElementById("t" + num).style =
                        document.getElementById("t" + num).getAttribute("style") +
                        "opacity:0;transition:0.2s ease;";
                } else {
                    e.target.style =
                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                    if (e.target.id == "icon" + num) {
                        document.getElementById("text" + num).style =
                            document.getElementById("text" + num).getAttribute("style") +
                            "opacity:0;transition:0.2s ease;";
                        document.getElementById("t" + num).style =
                            document.getElementById("t" + num).getAttribute("style") +
                            "opacity:0;transition:0.2s ease;";
                    }
                }
            } else {
                num =
                    e.target.id.charAt(e.target.id.length - 2) +
                    e.target.id.charAt(e.target.id.length - 1);
                if (e.target.className == "fa fa-heart icon") {
                    e.target.style =
                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                    document.getElementById("text" + num).style =
                        document.getElementById("text" + num).getAttribute("style") +
                        "opacity:0;transition:0.2s ease;";
                    document.getElementById("t" + num).style =
                        document.getElementById("t" + num).getAttribute("style") +
                        "opacity:0;transition:0.2s ease;";
                } else {
                    e.target.style =
                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                    if (e.target.id == "icon" + num) {
                        document.getElementById("text" + num).style =
                            document.getElementById("text" + num).getAttribute("style") +
                            "opacity:0;transition:0.2s ease;";
                        document.getElementById("t" + num).style =
                            document.getElementById("t" + num).getAttribute("style") +
                            "opacity:0;transition:0.2s ease;";
                    }
                }
            }
        });
    }        
    document.getElementById("result-count").innerHTML = "Showing 11-20 of 30 results";

}

for(let j of document.querySelectorAll(".sorting-option")){
    let optionName = j.getAttribute("name");
    let optionValue = j.getAttribute("value");
    j.onclick = function(){
        applyFilter("sorting-option",optionName,optionValue,this);
    }
}
    let options = document.querySelectorAll("#sorting-options .sorting-option");
    let arr ;
    let selectCount = 0;
    let popCount = 1;
    function applyFilter(optionType,optionName,optionValue,e){
        if(optionType == "sorting-option"){
            if(!document.getElementById("filter-list").hasChildNodes()){
                for(let i of options){
                    i.style = "background-color:white!important;color: black!important";
                }
                if(optionName == "price" && optionValue == "hightolow"){
                    e.style = "background-color: black!important;color: white!important;";
                    e.title = "Select Next Option To Remove Current Filter";
                    document.getElementById("select").innerHTML = e.innerHTML;   
                    document.getElementById("sorting-options").setAttribute("selected",true);
                    let allCols = document.querySelectorAll("#products .col");
                    for(let i in productData){
                        arr = productData[i].slice(10,20).sort((a,b)=>{
                            return b["price"] - a["price"];
                        });
                    }
                    products.innerHTML = "";
                    for(let j = 0; j<10 ;j++){
                        let col = document.createElement("div");
                        col.className = "col"+" "+arr[j]["category"];
                        col.setAttribute("custom","rating:"+arr[j]["rating"]);
                        col.setAttribute("name",arr[j]["brand"]);
                        products.appendChild(col);
                        let box = document.createElement("div");
                        box.className = "box";
                        box.setAttribute("style", "position:relative;transition:all 0.8s;");
                        col.appendChild(box);
                        let image = document.createElement("img");
                        box.appendChild(image);
                        let div = document.createElement("div");
                        div.className = "img-box";
                        div.setAttribute("style", "position:absolute;top:0;left:0;opacity:0;");
                        box.appendChild(div);
                        let image1 = document.createElement("img");
                        div.appendChild(image1);
                        let div1 = document.createElement("div");
                        div1.setAttribute(
                            "style",
                            "position:absolute;top:40%;left:35%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;"
                        );
                        div.appendChild(div1);
                        let icon1 = document.createElement("i");
                        icon1.className = "fa fa-shopping-cart icon";
                        icon1.onclick = function(){
                            addToCart(arr[j]["images"][0],arr[j]["title"],arr[j]["price"]);
                        }
                        icon1.setAttribute("id", "icon" + ++count);
                        icon1.style =
                            "font-size: 15px; color: grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                        div1.appendChild(icon1);
                        let icon2 = document.createElement("i");
                        icon2.className = "fa fa-eye icon";
                        icon2.setAttribute("id", "icon" + ++count);
                        icon2.onclick=function() {  
                            openModal(arr[j]["images"],arr[j]["title"],arr[j]["price"],arr[j]["brand"],arr[j]["description"],arr[j]["category"],arr[j]["stock"]);
                            };
                        icon2.style = "font-size: 15px; color: grey;height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                        div1.appendChild(icon2);
                        let icon3 = document.createElement("i");
                        icon3.className = "fa fa-heart icon";
                        icon3.setAttribute("id", "icon" + ++count);
                        icon3.onclick = function(){
                            addToWishtList(arr[j]["images"][0],arr[j]["title"],arr[j]["price"],arr[j]["stock"]);
                        }
                        icon3.style =
                            "font-size: 15px;color:grey;height:100%;padding:8px;cursor:pointer;";
                        div1.appendChild(icon3);
                        let div2 = document.createElement("div");
                        div2.setAttribute(
                            "style",
                            "position:absolute;top:70%;left:30%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;"
                        );
                        div.appendChild(div2);
                        ++count1;
                        let iconDiv1 = document.createElement("div");
                        iconDiv1.setAttribute("id", "text" + count1);
                        iconDiv1.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:18%;opacity:0;";
                        iconDiv1.innerHTML = "Add to Cart";
                        div.appendChild(iconDiv1);
                        let divTraingle1 = document.createElement("div");
                        divTraingle1.setAttribute("id", "t" + count1);
                        divTraingle1.style =
                            "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:38%;opacity:0;";
                        div.appendChild(divTraingle1);
                        ++count1;
                        let iconDiv2 = document.createElement("div");
                        iconDiv2.setAttribute("id", "text" + count1);
                        iconDiv2.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:29%;opacity:0;";
                        iconDiv2.innerHTML = "Quick View";
                        div.appendChild(iconDiv2);
                        let divTraingle2 = document.createElement("div");
                        divTraingle2.setAttribute("id", "t" + count1);
                        divTraingle2.style =
                            "width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:47%;opacity:0;";
                        div.appendChild(divTraingle2);
                        ++count1;
                        let iconDiv3 = document.createElement("div");
                        iconDiv3.setAttribute("id", "text" + count1);
                        iconDiv3.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:40%;opacity: 0 ;";
                        iconDiv3.innerHTML = "Add to WishList";
                        div.appendChild(iconDiv3);
                        let divTraingle3 = document.createElement("div");
                        divTraingle3.setAttribute("id", "t" + count1);
                        divTraingle3.style =
                            "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:58%;opacity:0;";
                        div.appendChild(divTraingle3);
                        for (let k in arr[j]) {
                            if (k == "images") {
                                for (let l = 0; l < arr[j][k].length; l++) {
                                    if (arr[j][k].length == 1) {
                                        image.src = arr[j][k][0];
                                        image1.src = arr[j][k][0];
                                    } else if (arr[j][k].length == 3) {
                                        image.src = arr[j][k][2];
                                        image1.src = arr[j][k][1];
                                    } else {
                                        if (l == 3) {
                                            image.src = arr[j][k][l];
                                        } else if (l == 2) {
                                            image1.src = arr[j][k][l];
                                        }
                                    }
                                }
                            } else if (k == "price") {
                                let div2Child1 = document.createElement("div");
                                div2Child1.innerHTML ="Beauty Items";
                                div2.appendChild(div2Child1);
                                let div2Child2 = document.createElement("div");
                                div2Child2.setAttribute("id","products-price");
                                div2Child2.innerHTML = "Price : $" +"<span class='product-price'>"+arr[j][k]+"</span>"; 
                                div2.appendChild(div2Child2);
                            }else if(k == "title"){
                                col.setAttribute("id",arr[j][k]);
                            }
                        }
                    }
                    if (products.hasChildNodes()) {
                        for (let i of products.children) {
                            i.children[0].addEventListener("mouseenter", (e) => {
                                e.target.children[0].style = "opacity:0;transition: all 0.8s;";
                                e.target.children[1].children[2].className = "product-anim";
                                e.target.children[1].style =
                                    "position:absolute;top:0;left:0;opacity:1;transition: all 0.8s;";
                            });
                        }
                        for (let i of products.children) {
                            i.children[0].addEventListener("mouseleave", (e) => {
                                e.target.children[0].style = "opacity:1;transition: all 0.8s;";
                                e.target.children[1].children[2].className = "";
                                e.target.children[1].style =
                                    "position:absolute;top:0;left:0;opacity:0;transition: all 0.8s;";
                            });
                        }
                    }
                    
                    let icons = document.getElementsByClassName("icon");
                    for (let i of icons) {
                        i.addEventListener("mouseenter", (e) => {
                            let num = 0;
                            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                                num = e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:1;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:1;";
                                } else {
                                    e.target.style =
                                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.className != "fa fa-heart icon") {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                    }
                                }
                            } else {
                                num =
                                    e.target.id.charAt(e.target.id.length - 2) +
                                    e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +"opacity:1;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") + "opacity:1;";
                                } else {
                                    e.target.style =
                                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.className != "fa fa-heart icon") {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                    }
                                }
                            }
                        });
                        i.addEventListener("mouseleave", (e) => {
                            let num = 0;
                            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                                num = e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                } else {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.id == "icon" + num) {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                    }
                                }
                            } else {
                                num =
                                    e.target.id.charAt(e.target.id.length - 2) +
                                    e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                } else {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.id == "icon" + num) {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                    }
                                }
                            }
                        });
                    }
                }else if(optionName == "price" && optionValue == "lowtohigh"){
                    e.style = "background-color: black!important;color: white!important;";
                    e.title = "Select Next Option To Remove Current Filter";
                    document.getElementById("select").innerHTML = e.innerHTML;   
                    document.getElementById("sorting-options").setAttribute("selected",true);
                    for(let i in productData){
                        arr = productData[i].slice(10,20).sort((a,b)=>{
                            return a["price"] - b["price"];
                        
                        });
                    }
                    products.innerHTML = "";
                    for(let j = 0; j<10 ;j++){
                        let col = document.createElement("div");
                        col.className = "col"+" "+arr[j]["category"];
                        col.setAttribute("custom","rating:"+arr[j]["rating"]);
                        col.setAttribute("name",arr[j]["brand"]);
                        products.appendChild(col);
                        let box = document.createElement("div");
                        box.className = "box";
                        box.setAttribute("style", "position:relative;transition:all 0.8s;");
                        col.appendChild(box);
                        let image = document.createElement("img");
                        box.appendChild(image);
                        let div = document.createElement("div");
                        div.className = "img-box";
                        div.setAttribute("style", "position:absolute;top:0;left:0;opacity:0;");
                        box.appendChild(div);
                        let image1 = document.createElement("img");
                        div.appendChild(image1);
                        let div1 = document.createElement("div");
                        div1.setAttribute(
                            "style",
                            "position:absolute;top:40%;left:35%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;"
                        );
                        div.appendChild(div1);
                        let icon1 = document.createElement("i");
                        icon1.className = "fa fa-shopping-cart icon";
                        icon1.onclick = function(){
                            addToCart(arr[j]["images"][0],arr[j]["title"],arr[j]["price"]);
                        }
                        icon1.setAttribute("id", "icon" + ++count);
                        icon1.style =
                            "font-size: 15px; color: grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                        div1.appendChild(icon1);
                        let icon2 = document.createElement("i");
                        icon2.className = "fa fa-eye icon";
                        icon2.setAttribute("id", "icon" + ++count);
                        icon2.onclick=function() {  
                            openModal(arr[j]["images"],arr[j]["title"],arr[j]["price"],arr[j]["brand"],arr[j]["description"],arr[j]["category"],arr[j]["stock"]);
                            };
                        icon2.style = "font-size: 15px; color: grey;height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                        div1.appendChild(icon2);
                        let icon3 = document.createElement("i");
                        icon3.className = "fa fa-heart icon";
                        icon3.setAttribute("id", "icon" + ++count);
                        icon3.onclick = function(){
                            addToWishtList(arr[j]["images"][0],arr[j]["title"],arr[j]["price"],arr[j]["stock"]);
                        }
                        icon3.style =
                            "font-size: 15px;color:grey;height:100%;padding:8px;cursor:pointer;";
                        div1.appendChild(icon3);
                        let div2 = document.createElement("div");
                        div2.setAttribute(
                            "style",
                            "position:absolute;top:70%;left:30%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;"
                        );
                        div.appendChild(div2);
                        ++count1;
                        let iconDiv1 = document.createElement("div");
                        iconDiv1.setAttribute("id", "text" + count1);
                        iconDiv1.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:18%;opacity:0;";
                        iconDiv1.innerHTML = "Add to Cart";
                        div.appendChild(iconDiv1);
                        let divTraingle1 = document.createElement("div");
                        divTraingle1.setAttribute("id", "t" + count1);
                        divTraingle1.style =
                            "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:38%;opacity:0;";
                        div.appendChild(divTraingle1);
                        ++count1;
                        let iconDiv2 = document.createElement("div");
                        iconDiv2.setAttribute("id", "text" + count1);
                        iconDiv2.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:29%;opacity:0;";
                        iconDiv2.innerHTML = "Quick View";
                        div.appendChild(iconDiv2);
                        let divTraingle2 = document.createElement("div");
                        divTraingle2.setAttribute("id", "t" + count1);
                        divTraingle2.style =
                            "width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:47%;opacity:0;";
                        div.appendChild(divTraingle2);
                        ++count1;
                        let iconDiv3 = document.createElement("div");
                        iconDiv3.setAttribute("id", "text" + count1);
                        iconDiv3.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:40%;opacity: 0 ;";
                        iconDiv3.innerHTML = "Add to WishList";
                        div.appendChild(iconDiv3);
                        let divTraingle3 = document.createElement("div");
                        divTraingle3.setAttribute("id", "t" + count1);
                        divTraingle3.style =
                            "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:58%;opacity:0;";
                        div.appendChild(divTraingle3);
                        for (let k in arr[j]) {
                            if (k == "images") {
                                for (let l = 0; l < arr[j][k].length; l++) {
                                    if (arr[j][k].length == 1) {
                                        image.src = arr[j][k][0];
                                        image1.src = arr[j][k][0];
                                    } else if (arr[j][k].length == 3) {
                                        image.src = arr[j][k][2];
                                        image1.src = arr[j][k][1];
                                    } else {
                                        if (l == 3) {
                                            image.src = arr[j][k][l];
                                        } else if (l == 2) {
                                            image1.src = arr[j][k][l];
                                        }
                                    }
                                }
                            } else if (k == "price") {
                                let div2Child1 = document.createElement("div");
                                div2Child1.innerHTML ="Beauty Items";
                                div2.appendChild(div2Child1);
                                let div2Child2 = document.createElement("div");
                                div2Child2.setAttribute("id","products-price");
                                div2Child2.innerHTML = "Price : $" +"<span class='product-price'>"+arr[j][k]+"</span>"; 
                                div2.appendChild(div2Child2);
                            }else if(k == "title"){
                                col.setAttribute("id",arr[j][k]);
                            }
                        }
                    }
                    if (products.hasChildNodes()) {
                        for (let i of products.children) {
                            i.children[0].addEventListener("mouseenter", (e) => {
                                e.target.children[0].style = "opacity:0;transition: all 0.8s;";
                                e.target.children[1].children[2].className = "product-anim";
                                e.target.children[1].style =
                                    "position:absolute;top:0;left:0;opacity:1;transition: all 0.8s;";
                            });
                        }
                        for (let i of products.children) {
                            i.children[0].addEventListener("mouseleave", (e) => {
                                e.target.children[0].style = "opacity:1;transition: all 0.8s;";
                                e.target.children[1].children[2].className = "";
                                e.target.children[1].style =
                                    "position:absolute;top:0;left:0;opacity:0;transition: all 0.8s;";
                            });
                        }
                    }
                    
                    let icons = document.getElementsByClassName("icon");
                    for (let i of icons) {
                        i.addEventListener("mouseenter", (e) => {
                            let num = 0;
                            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                                num = e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:1;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:1;";
                                } else {
                                    e.target.style =
                                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.className != "fa fa-heart icon") {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                    }
                                }
                            } else {
                                num =
                                    e.target.id.charAt(e.target.id.length - 2) +
                                    e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +"opacity:1;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") + "opacity:1;";
                                } else {
                                    e.target.style =
                                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.className != "fa fa-heart icon") {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                    }
                                }
                            }
                        });
                        i.addEventListener("mouseleave", (e) => {
                            let num = 0;
                            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                                num = e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                } else {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.id == "icon" + num) {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                    }
                                }
                            } else {
                                num =
                                    e.target.id.charAt(e.target.id.length - 2) +
                                    e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                } else {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.id == "icon" + num) {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                    }
                                }
                            }
                        });
                    }
                }else if(optionName == "rating" && optionValue == "hightolow"){
                    e.style = "background-color: black!important;color: white!important;";
                    e.title = "Select Next Option To Remove Current Filter";
                    document.getElementById("select").innerHTML = e.innerHTML;   
                    document.getElementById("sorting-options").setAttribute("selected",true);
                    for(let i in productData){
                        for(let j = 0;j< 10;j++){
                            arr = productData[i].slice(10,20).sort((a,b)=>{
                                return b["rating"] - a["rating"];
                            });
                        }
                    }
                    products.innerHTML = "";
                    for(let j = 0; j<10 ;j++){
                        let col = document.createElement("div");
                        col.className = "col"+" "+arr[j]["category"];
                        col.setAttribute("name",arr[j]["brand"]);
                        products.appendChild(col);
                        let box = document.createElement("div");
                        box.className = "box";
                        box.setAttribute("style", "position:relative;transition:all 0.8s;");
                        col.appendChild(box);
                        let image = document.createElement("img");
                        box.appendChild(image);
                        let div = document.createElement("div");
                        div.className = "img-box";
                        div.setAttribute("style", "position:absolute;top:0;left:0;opacity:0;");
                        box.appendChild(div);
                        let image1 = document.createElement("img");
                        div.appendChild(image1);
                        let div1 = document.createElement("div");
                        div1.setAttribute(
                            "style",
                            "position:absolute;top:40%;left:35%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;"
                        );
                        div.appendChild(div1);
                        let icon1 = document.createElement("i");
                        icon1.className = "fa fa-shopping-cart icon";
                        icon1.setAttribute("id", "icon" + ++count);
                        icon1.onclick = function(){
                            addToCart(arr[j]["images"][0],arr[j]["title"],arr[j]["price"]);
                        }
                        icon1.style =
                            "font-size: 15px; color: grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                        div1.appendChild(icon1);
                        let icon2 = document.createElement("i");
                        icon2.className = "fa fa-eye icon";
                        icon2.setAttribute("id", "icon" + ++count);
                        icon2.onclick=function() {  
                            openModal(arr[j]["images"],arr[j]["title"],arr[j]["price"],arr[j]["brand"],arr[j]["description"],arr[j]["category"],arr[j]["stock"]);
                            };
                        icon2.style = "font-size: 15px; color: grey;height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                        div1.appendChild(icon2);
                        let icon3 = document.createElement("i");
                        icon3.className = "fa fa-heart icon";
                        icon3.setAttribute("id", "icon" + ++count);
                        icon3.onclick = function(){
                            addToWishtList(arr[j]["images"][0],arr[j]["title"],arr[j]["price"],arr[j]["stock"]);
                        }
                        icon3.style =
                            "font-size: 15px;color:grey;height:100%;padding:8px;cursor:pointer;";
                        div1.appendChild(icon3);
                        let div2 = document.createElement("div");
                        div2.setAttribute(
                            "style",
                            "position:absolute;top:70%;left:30%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;"
                        );
                        div.appendChild(div2);
                        ++count1;
                        let iconDiv1 = document.createElement("div");
                        iconDiv1.setAttribute("id", "text" + count1);
                        iconDiv1.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:18%;opacity:0;";
                        iconDiv1.innerHTML = "Add to Cart";
                        div.appendChild(iconDiv1);
                        let divTraingle1 = document.createElement("div");
                        divTraingle1.setAttribute("id", "t" + count1);
                        divTraingle1.style =
                            "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:38%;opacity:0;";
                        div.appendChild(divTraingle1);
                        ++count1;
                        let iconDiv2 = document.createElement("div");
                        iconDiv2.setAttribute("id", "text" + count1);
                        iconDiv2.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:29%;opacity:0;";
                        iconDiv2.innerHTML = "Quick View";
                        div.appendChild(iconDiv2);
                        let divTraingle2 = document.createElement("div");
                        divTraingle2.setAttribute("id", "t" + count1);
                        divTraingle2.style =
                            "width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:47%;opacity:0;";
                        div.appendChild(divTraingle2);
                        ++count1;
                        let iconDiv3 = document.createElement("div");
                        iconDiv3.setAttribute("id", "text" + count1);
                        iconDiv3.style =
                            "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:40%;opacity: 0 ;";
                        iconDiv3.innerHTML = "Add to WishList";
                        div.appendChild(iconDiv3);
                        let divTraingle3 = document.createElement("div");
                        divTraingle3.setAttribute("id", "t" + count1);
                        divTraingle3.style =
                            "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:58%;opacity:0;";
                        div.appendChild(divTraingle3);
                        for (let k in arr[j]) {
                            if (k == "images") {
                                for (let l = 0; l < arr[j][k].length; l++) {
                                    if (arr[j][k].length == 1) {
                                        image.src = arr[j][k][0];
                                        image1.src = arr[j][k][0];
                                    } else if (arr[j][k].length == 3) {
                                        image.src = arr[j][k][2];
                                        image1.src = arr[j][k][1];
                                    } else {
                                        if (l == 3) {
                                            image.src = arr[j][k][l];
                                        } else if (l == 2) {
                                            image1.src = arr[j][k][l];
                                        }
                                    }
                                }
                            } else if (k == "price") {
                                let div2Child1 = document.createElement("div");
                                div2Child1.innerHTML ="Beauty Items";
                                div2.appendChild(div2Child1);
                                let div2Child2 = document.createElement("div");
                                div2Child2.setAttribute("id","products-price");
                                div2Child2.innerHTML = "Price : $" +"<span class='product-price'>"+arr[j][k]+"</span>"; 
                                div2.appendChild(div2Child2);
                            }else if(k == "title"){
                                col.setAttribute("id",arr[j][k]);
                            }
                        }
                    }
                    if (products.hasChildNodes()) {
                        for (let i of products.children) {
                            i.children[0].addEventListener("mouseenter", (e) => {
                                e.target.children[0].style = "opacity:0;transition: all 0.8s;";
                                e.target.children[1].children[2].className = "product-anim";
                                e.target.children[1].style =
                                    "position:absolute;top:0;left:0;opacity:1;transition: all 0.8s;";
                            });
                        }
                        for (let i of products.children) {
                            i.children[0].addEventListener("mouseleave", (e) => {
                                e.target.children[0].style = "opacity:1;transition: all 0.8s;";
                                e.target.children[1].children[2].className = "";
                                e.target.children[1].style =
                                    "position:absolute;top:0;left:0;opacity:0;transition: all 0.8s;";
                            });
                        }
                    }
                    
                    let icons = document.getElementsByClassName("icon");
                    for (let i of icons) {
                        i.addEventListener("mouseenter", (e) => {
                            let num = 0;
                            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                                num = e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:1;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:1;";
                                } else {
                                    e.target.style =
                                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.className != "fa fa-heart icon") {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                    }
                                }
                            } else {
                                num =
                                    e.target.id.charAt(e.target.id.length - 2) +
                                    e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +"opacity:1;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") + "opacity:1;";
                                } else {
                                    e.target.style =
                                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.className != "fa fa-heart icon") {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                    }
                                }
                            }
                        });
                        i.addEventListener("mouseleave", (e) => {
                            let num = 0;
                            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                                num = e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                } else {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.id == "icon" + num) {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                    }
                                }
                            } else {
                                num =
                                    e.target.id.charAt(e.target.id.length - 2) +
                                    e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                } else {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.id == "icon" + num) {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                    }
                                }
                            }
                        });
                    }
                }else{
                    for(let i of options){
                        i.title = "Select Option To Add Filter";
                    }
                    e.style = "background-color:white!important;color:black !important";
                    document.getElementById("select").innerHTML = "Default Sorting";   
                    document.getElementById("sorting-options").setAttribute("selected",false);
                    products.innerHTML="";
                    for(let i in productData){
                        for(let j = 10;j<20;j++){
                            let col = document.createElement("div");
                            col.className = "col"+" "+productData[i][j]["category"];
                            col.setAttribute("custom","rating:"+productData[i][j]["rating"]);
                            col.setAttribute("name",productData[i][j]["brand"]);
                            products.appendChild(col);
                            let box = document.createElement("div");
                            box.className = "box";
                            box.setAttribute("style", "position:relative;transition:all 0.8s;");
                            col.appendChild(box);
                            let image = document.createElement("img");
                            box.appendChild(image);
                            let div = document.createElement("div");
                            div.className = "img-box";
                            div.setAttribute("style", "position:absolute;top:0;left:0;opacity:0;");
                            box.appendChild(div);
                            let image1 = document.createElement("img");
                            div.appendChild(image1);
                            let div1 = document.createElement("div");
                            div1.setAttribute(
                                "style",
                                "position:absolute;top:40%;left:35%;background-color:white;box-shadow:0px 0px 25px 4px black;display:flex;justify-content:center;align-items:center;"
                            );
                            div.appendChild(div1);
                            let icon1 = document.createElement("i");
                            icon1.className = "fa fa-shopping-cart icon";
                            icon1.setAttribute("id", "icon" + ++count);
                            icon1.onclick = function(){
                                addToCart(productData[i][j]["images"][0],productData[i][j]["title"],productData[i][j]["price"]);
                            }
                            icon1.style =
                                "font-size: 15px; color: grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                            div1.appendChild(icon1);
                            let icon2 = document.createElement("i");
                            icon2.className = "fa fa-eye icon";
                            icon2.setAttribute("id", "icon" + ++count);
                            icon2.onclick=function() {  
                                openModal(productData[i][j]["images"],productData[i][j]["title"],productData[i][j]["price"],productData[i][j]["brand"],productData[i][j]["description"],productData[i][j]["category"],productData[i][j]["stock"]);
                                };
                            icon2.style = "font-size: 15px; color: grey;height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;";
                            div1.appendChild(icon2);
                            let icon3 = document.createElement("i");
                            icon3.className = "fa fa-heart icon";
                            icon3.setAttribute("id", "icon" + ++count);
                            icon3.onclick = function(){
                                addToWishtList(productData[i][j]["images"][0],productData[i][j]["title"],productData[i][j]["price"],productData[i][j]["stock"]);
                            }
                            icon3.style =
                                "font-size: 15px;color:grey;height:100%;padding:8px;cursor:pointer;";
                            div1.appendChild(icon3);
                            let div2 = document.createElement("div");
                            div2.setAttribute(
                                "style",
                                "position:absolute;top:70%;left:30%;background-color:white;color:black;font-weight:700;display:flex;flex-direction:column;justify-content:center;align-items:center;"
                            );
                            div.appendChild(div2);
                            ++count1;
                            let iconDiv1 = document.createElement("div");
                            iconDiv1.setAttribute("id", "text" + count1);
                            iconDiv1.style =
                                "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:18%;opacity:0;";
                            iconDiv1.innerHTML = "Add to Cart";
                            div.appendChild(iconDiv1);
                            let divTraingle1 = document.createElement("div");
                            divTraingle1.setAttribute("id", "t" + count1);
                            divTraingle1.style =
                                "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:38%;opacity:0;";
                            div.appendChild(divTraingle1);
                            ++count1;
                            let iconDiv2 = document.createElement("div");
                            iconDiv2.setAttribute("id", "text" + count1);
                            iconDiv2.style =
                                "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:29%;opacity:0;";
                            iconDiv2.innerHTML = "Quick View";
                            div.appendChild(iconDiv2);
                            let divTraingle2 = document.createElement("div");
                            divTraingle2.setAttribute("id", "t" + count1);
                            divTraingle2.style =
                                "width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:47%;opacity:0;";
                            div.appendChild(divTraingle2);
                            ++count1;
                            let iconDiv3 = document.createElement("div");
                            iconDiv3.setAttribute("id", "text" + count1);
                            iconDiv3.style =
                                "width:40%;background-color:black;font-size: 15px; color: grey;padding:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;top:23%;left:40%;opacity: 0 ;";
                            iconDiv3.innerHTML = "Add to WishList";
                            div.appendChild(iconDiv3);
                            let divTraingle3 = document.createElement("div");
                            divTraingle3.setAttribute("id", "t" + count1);
                            divTraingle3.style =
                                "width: 0;  height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid black;position:absolute;top:35%;left:58%;opacity:0;";
                            div.appendChild(divTraingle3);
                            for (let k in productData[i][j]) {
                                if (k == "images") {
                                    for (let l = 0; l < productData[i][j][k].length; l++) {
                                        if (productData[i][j][k].length == 1) {
                                            image.src = productData[i][j][k][l];
                                            image1.src = productData[i][j][k][l];
                                        } else if (productData[i][j][k].length == 3) {
                                            image.src = productData[i][j][k][2];
                                            image1.src = productData[i][j][k][1];
                                        } else {
                                            if (l == 3) {
                                                image.src = productData[i][j][k][l];
                                            } else if (l == 2) {
                                                image1.src = productData[i][j][k][l];
                                            }
                                        }
                                    }
                                } else if (k == "price") {
                                    let div2Child1 = document.createElement("div");
                                    div2Child1.innerHTML ="Beauty Items";
                                    div2.appendChild(div2Child1);
                                    let div2Child2 = document.createElement("div");
                                    div2Child2.setAttribute("id","products-price");
                                    div2Child2.innerHTML = "Price : $" +"<span class='product-price'>"+productData[i][j][k]+"</span>"; 
                                    div2.appendChild(div2Child2);
                                }else if(k == "title"){
                                    col.setAttribute("id",productData[i][j][k]);
                                }
                            }
                        }
                    }
                    if (products.hasChildNodes()) {
                            for (let i of products.children) {
                                i.children[0].addEventListener("mouseenter", (e) => {
                                    e.target.children[0].style = "opacity:0;transition: all 0.8s;";
                                    e.target.children[1].children[2].className = "product-anim";
                                    e.target.children[1].style =
                                        "position:absolute;top:0;left:0;opacity:1;transition: all 0.8s;";
                                });
                            }
                            for (let i of products.children) {
                                i.children[0].addEventListener("mouseleave", (e) => {
                                    e.target.children[0].style = "opacity:1;transition: all 0.8s;";
                                    e.target.children[1].children[2].className = "";
                                    e.target.children[1].style =
                                        "position:absolute;top:0;left:0;opacity:0;transition: all 0.8s;";
                                });
                            }
                    }
                    let icons = document.getElementsByClassName("icon");
                    for (let i of icons) {
                        i.addEventListener("mouseenter", (e) => {
                            let num = 0;
                            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                                num = e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:1;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:1;";
                                } else {
                                    e.target.style =
                                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.className != "fa fa-heart icon") {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                    }
                                }
                            } else {
                                num =
                                    e.target.id.charAt(e.target.id.length - 2) +
                                    e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:black;font-size: 15px;color:white; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +"opacity:1;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") + "opacity:1;";
                                } else {
                                    e.target.style =
                                        "background-color:black;font-size: 15px; color:white; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.className != "fa fa-heart icon") {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:1;transition:0.2s ease;";
                                    }
                                }
                            }
                        });
                        i.addEventListener("mouseleave", (e) => {
                            let num = 0;
                            if (isNaN(e.target.id.charAt(e.target.id.length - 2))) {
                                num = e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                } else {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.id == "icon" + num) {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                    }
                                }
                            } else {
                                num =
                                    e.target.id.charAt(e.target.id.length - 2) +
                                    e.target.id.charAt(e.target.id.length - 1);
                                if (e.target.className == "fa fa-heart icon") {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    document.getElementById("text" + num).style =
                                        document.getElementById("text" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                    document.getElementById("t" + num).style =
                                        document.getElementById("t" + num).getAttribute("style") +
                                        "opacity:0;transition:0.2s ease;";
                                } else {
                                    e.target.style =
                                        "background-color:white;font-size: 15px; color:grey; height:100%;border-right:1px solid grey;padding:8px;cursor:pointer;transition:0.2s ease;";
                                    if (e.target.id == "icon" + num) {
                                        document.getElementById("text" + num).style =
                                            document.getElementById("text" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                        document.getElementById("t" + num).style =
                                            document.getElementById("t" + num).getAttribute("style") +
                                            "opacity:0;transition:0.2s ease;";
                                    }
                                }
                            }
                        });
                    }
                } 
            }else{
                if(optionName == "price" && optionValue == "lowtohigh"){
                    for(let i of options){
                        i.style = "background-color:white!important;color: black!important";
                    }
                    e.style = "background-color: black!important;color: white!important;";
                    e.title = "Unselect Option To Remove Filter";
                    document.getElementById("select").innerHTML = e.innerHTML;   
                    document.getElementById("sorting-options").setAttribute("selected",true);
                    let allCols = document.querySelectorAll("#products .col");
                    let arr3 = [];
                    if(selectCount == 0){
                        sessionStorage.setItem("tempArr",products.innerHTML);
                        selectCount++;
                    }
                    for(let i of Array.from(allCols)){
                        if(i.style.display != "none"){
                            arr3.push(i);
                        }
                    }
                    let arr1 = arr3.sort((a,b)=>{
                        return parseFloat(a.children[0].children[1].children[2].children[1].children[0].innerHTML) - parseFloat(b.children[0].children[1].children[2].children[1].children[0].innerHTML);
                    });
                    
                    products.innerHTML = "";
                    for(let j of arr1){
                        products.appendChild(j);
                    }
                    
                }else if(optionName == "price" && optionValue == "hightolow"){
                    for(let i of options){
                        i.style = "background-color:white!important;color: black!important";
                    }
                    e.style = "background-color: black!important;color: white!important;";
                    e.title = "Select Next Option To Remove Filter";
                    document.getElementById("select").innerHTML = e.innerHTML;   
                    document.getElementById("sorting-options").setAttribute("selected",true);
                    let allCols = document.querySelectorAll("#products .col");
                    let arr3 = [];
                    if(selectCount == 0){
                        sessionStorage.setItem("tempArr",products.innerHTML);
                        selectCount++;
                    }
                    for(let i of Array.from(allCols)){
                        if(i.style.display != "none"){
                            arr3.push(i);
                        }
                    }
                    let arr1 = arr3.sort((a,b)=>{
                        return parseFloat(b.children[0].children[1].children[2].children[1].children[0].innerHTML) - parseFloat(a.children[0].children[1].children[2].children[1].children[0].innerHTML);
                    });
                    
                    products.innerHTML = "";
                    for(let j of arr1){
                        products.appendChild(j);
                    }
                    
                }else if(optionName == "rating" && optionValue == "hightolow"){
                    e.style = "background-color: black!important;color: white!important;";
                    e.title = "Unselect Option To Remove Filter";
                    document.getElementById("select").innerHTML = e.innerHTML;   
                    document.getElementById("sorting-options").setAttribute("selected",true);
                    for(let i of options){
                        i.style = "background-color:white!important;color: black!important";
                    }
                    let allCols = document.querySelectorAll("#products .col");
                    let arr3 = [];
                    if(selectCount == 0){
                        sessionStorage.setItem("tempArr",products.innerHTML);
                        selectCount++;
                    }
                    for(let i of Array.from(allCols)){
                        if(i.style.display != "none"){
                            arr3.push(i);
                        }
                    }
                    let arr1 = arr3.sort((a,b)=>{
                        return parseFloat(b.getAttribute("custom").match(/[.0-9]+/)[0]) - parseFloat(a.getAttribute("custom").match(/[.0-9]+/)[0]);
                    });  
                    products.innerHTML = "";
                    for(let j of arr1){
                        products.appendChild(j);
                    } 
                }else{
                    for(let i of options){
                        i.style = "background-color:white!important;color: black!important";
                        i.title = "Select Option To Add Filter";
                    }
                    e.style = "background-color:black;important;color: !important";
                    document.getElementById("select").innerHTML = "Default Sorting";   
                    document.getElementById("sorting-options").setAttribute("selected",false);
                    products.innerHTML = "";
                    
                    products.innerHTML = sessionStorage.getItem("tempArr");
                    selectCount = 0;
                }
            }
        }else if(optionType == "filter-option"){
            if(filterApplied[filterApplied.length-1] == "Skin Care"){
                if(filterApplied.length == 1){
                    let allCols = document.querySelectorAll("#products .col");
                    let arr1 = Array.from(allCols).filter((a)=>{
                        return a.getAttribute("class") != "col skincare";
                    }).map((b)=>{
                        return b.style.display = "none";
                    });
                    document.getElementById("result-count").innerHTML = "Showing  "+ (10-arr1.length) +" of 30 results";
                }else{
                    if(filterApplied.includes("fragrances")){
                        if(filterApplied.length == 2){
                            let allCols = document.querySelectorAll("#products .col");
                            Array.from(allCols).map((b)=>{
                                return b.style.display = "block";
                            });
                            document.getElementById("result-count").innerHTML = "Showing  1-10 of 30 results";
                        }else{
                            let allCols = document.querySelectorAll("#products .col");
                            filterApplied.filter((a)=>{
                                return a != "Skin Care" || a != "Fragrances";
                            }).map((b)=>{
                                Array.from(allCols).filter((a)=>{
                                    return a.getAttribute("name") == b;
                                }).map((c)=>{
                                    c.style.display = "block";
                                })
                            });
                            let finalCount = Array.from(allCols).filter((d)=>{
                                return d.style.display!="none";
                            })
                            document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                        }
                    }else{
                        let allCols = document.querySelectorAll("#products .col");
                        filterApplied.filter((a)=>{
                            return a!="Skin Care";
                        }).map((a)=>{
                            Array.from(allCols).filter((b)=>{
                                return b.getAttribute("name") == a  && b.className == "col fragrances";
                            }).map((c)=>{
                                return c.style.display ="none";
                            });
                        });
                        let finalCount = Array.from(allCols).filter((d)=>{
                            return d.style.display!="none";
                        });
                        document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                    }
                }
            }else if(filterApplied[filterApplied.length-1] == "Fragrances"){
                if(filterApplied.length == 1){
                    let allCols = document.querySelectorAll("#products .col");
                    let arr1 = Array.from(allCols).filter((a)=>{
                        return a.getAttribute("class") != "col fragrances";
                    }).map((b)=>{
                        return b.style.display = "none";
                    });
                    document.getElementById("result-count").innerHTML = "Showing  "+ (10-arr1.length) +" of 30 results";
                }else{
                    if(filterApplied.includes("Skin Care")){
                        if(filterApplied.length == 2){
                            let allCols = document.querySelectorAll("#products .col");
                            Array.from(allCols).map((b)=>{
                                b.style.display = "block";
                            });
                            document.getElementById("result-count").innerHTML = "Showing  1-10 of 30 results";
                        }else{
                            let allCols = document.querySelectorAll("#products .col");
                            filterApplied.filter((a)=>{
                                return a != "Skin Care" || a != "Fragrances";
                            }).map((b)=>{
                                Array.from(allCols).filter((a)=>{
                                    return a.getAttribute("name") == b;
                                }).map((c)=>{
                                    c.style.display = "block";
                                })
                            });
                            let finalCount = Array.from(allCols).filter((d)=>{
                                return d.style.display!="none";
                            })
                            document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                        }    
                    }else{
                        let allCols = document.querySelectorAll("#products .col");
                        filterApplied.filter((a)=>{
                            return a!="Fragrances";
                        }).map((b)=>{
                            Array.from(allCols).filter((a)=>{
                            return a.getAttribute("name") == b && a.className == "col skincare";
                            }).map((b)=>{
                                return b.style.display = "none";
                            })
                        });
                        let finalCount = Array.from(allCols).filter((d)=>{
                            return d.style.display!="none";
                        })
                        document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                    }
                }
            }else{
                if(filterApplied.length == 1){
                let allCol = document.querySelectorAll("#products .col");
                Array.from(allCol).filter((a)=>{
                    return a.getAttribute("name") != filterApplied[filterApplied.length-1];
                }).map((b)=>{
                    b.style.display = "none";
                });
                let finalCount = Array.from(allCol).filter((d)=>{
                    return d.style.display!="none";
                })
                document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                }else if(filterApplied.includes("Smart Phones") || filterApplied.includes("Laptops")){
                    if(filterApplied.includes("Smart Phones") && filterApplied.includes("Laptops")){
                        let allCols = document.querySelectorAll("#products .col");
                        filterApplied.filter((a)=>{
                            return a == "Skin Care";
                        }).map((b)=>{
                            filterApplied.filter((c)=>{
                                return c == "Fragrances";
                            }).map((d)=>{
                                filterApplied.filter((e)=>{
                                    return e!=b && e!=d;
                                }).map((f)=>{
                                    Array.from(allCols).filter((g)=>{
                                        return g.getAttribute("name") != f;
                                    }).map((h)=>{
                                        console.log(h);
                                        h.style.display="none";
                                    })
                                })
                            })
                        })
                        let finalCount = Array.from(allCols).filter((d)=>{
                            return d.style.display!="none";
                        })
                        document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                    }else{
                            let allCols = document.querySelectorAll("#products .col");
                            filterApplied.filter((a)=>{
                                return a == "Skin Care" || a == "Fragrances";
                            }).map((b)=>{
                                filterApplied.filter((c)=>{
                                    return c != b;
                                }).map((d)=>{
                                Array.from(allCols).filter((e)=>{
                                    console.log(b);
                                    return e.getAttribute("class").split(" ").splice(-1)[0] == b.replace(/\s/g,'').toLowerCase() && e.getAttribute("name") != d;
                                }).map((f)=>{
                                    f.style.display = "none";
                                })
                            });
                        });
                        let finalCount = Array.from(allCols).filter((d)=>{
                            return d.style.display!="none";
                        })
                        document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                    }
                }else{
                    let allCols = document.querySelectorAll("#products .col");
                    filterApplied.map((a)=>{
                        Array.from(allCols).filter((b)=>{
                            return b.getAttribute("name") == a;
                        }).map((c)=>{
                            c.style.display = "block";
                        })
                    })
                    
                    let finalCount = Array.from(allCols).filter((d)=>{
                        return d.style.display!="none";
                    })
                    document.getElementById("result-count").innerHTML = "Showing  "+ finalCount.length +" of 30 results";
                }
            }  
        }
    }
    let productCount = 0;
    function addToCart(imgSrc,title,price){
        let user = document.getElementById("user");
        if(user.style.background == ""){
            window.location.href ="e-commerceLoginForm.html";
        }
        else{
            let cart = document.getElementById("offcanvas-body");
            let productCoun = document.getElementById("count");
            let totalAmount = document.getElementById("total-amount");
            if(productCount == 0){
                alert("Product Added in Cart Successfully");
                productCount++;
                document.getElementById("cart-check").remove();
                let mainDiv = document.createElement("div");
                mainDiv.className="d-flex justify-content-between align-items-center mt-2";
                mainDiv.setAttribute("id","product-"+title);
                mainDiv.setAttribute("style","padding:18px");
                cart.appendChild(mainDiv);
                let productDetail = document.createElement("div");
                productDetail.className="product-detail d-flex";
                productDetail.setAttribute("style","gap:10px;");
                mainDiv.appendChild(productDetail);
                let productImg = document.createElement("img");
                productImg.setAttribute("src",imgSrc);
                productImg.setAttribute("style","width:50px;height:50px");
                productDetail.appendChild(productImg);
                let productTitlePrice = document.createElement("div");
                productTitlePrice.className = "product-title-price d-flex flex-column";
                productDetail.appendChild(productTitlePrice);
                let productTitle = document.createElement("div");
                productTitle.className = "product-name";
                productTitle.innerHTML = title;
                productTitlePrice.appendChild(productTitle);
                let productQuantityPrice = document.createElement("div");
                productQuantityPrice.className="d-flex align-items-center";
                productQuantityPrice.setAttribute("style","gap:8px");
                productTitlePrice.appendChild(productQuantityPrice);
                let productQuant = document.createElement("div");
                productQuant.className = "product-quantity text-muted";
                productQuant.setAttribute("id","product-count-"+title);
                productQuant.innerHTML = "1";
                productQuantityPrice.appendChild(productQuant);
                let multiplyIcon = document.createElement("span");
                multiplyIcon.className = "material-symbols-outlined text-muted";
                multiplyIcon.innerHTML = "close";
                multiplyIcon.style.height ="10px!important";
                productQuantityPrice.appendChild(multiplyIcon);
                let productPrice = document.createElement("div");
                productPrice.className = "product-price text-muted";
                productPrice.innerHTML = "$ " + `<span class="text-muted" id=product-price-${title}>${price}<span>`;
                productQuantityPrice.appendChild(productPrice);
                let productRemove = document.createElement("i");
                productRemove.className = "fa fa-times";
                productRemove.onclick = function(){
                    removeProduct(this,price);
                }
                productRemove.setAttribute("style","cursor:pointer");
                mainDiv.appendChild(productRemove);
                productCoun.innerHTML = productCount;
            }else{
                if(document.getElementById("product-"+title)){
                    alert("Product Added in Cart Successfully");
                    document.getElementById("product-count-"+title).innerHTML = Number(document.getElementById("product-count-"+title).innerHTML)+1;
                }else{
                    alert("Product Added in Cart Successfully");
                    productCount++;
                    let mainDiv = document.createElement("div");
                    mainDiv.className="d-flex justify-content-between align-items-center mt-2";
                    mainDiv.setAttribute("id","product-"+ title);
                    mainDiv.setAttribute("style","padding:18px");
                    cart.appendChild(mainDiv);
                    let productDetail = document.createElement("div");
                    productDetail.className="product-detail d-flex";
                    productDetail.setAttribute("style","gap:10px;");
                    mainDiv.appendChild(productDetail);
                    let productImg = document.createElement("img");
                    productImg.setAttribute("src",imgSrc);
                    productImg.setAttribute("style","width:50px;height:50px");
                    productDetail.appendChild(productImg);
                    let productTitlePrice = document.createElement("div");
                    productTitlePrice.className = "product-title-price d-flex flex-column";
                    productDetail.appendChild(productTitlePrice);
                    let productTitle = document.createElement("div");
                    productTitle.className = "product-name";
                    productTitle.innerHTML = title;
                    productTitlePrice.appendChild(productTitle);
                    let productQuantityPrice = document.createElement("div");
                    productQuantityPrice.className="d-flex align-items-center";
                    productQuantityPrice.setAttribute("style","gap:8px");
                    productTitlePrice.appendChild(productQuantityPrice);
                    let productQuant = document.createElement("div");
                    productQuant.className = "product-quantity text-muted";
                    productQuant.setAttribute("id","product-count-"+title);
                    productQuant.innerHTML = "1";
                    productQuantityPrice.appendChild(productQuant);
                    let multiplyIcon = document.createElement("span");
                    multiplyIcon.style.height="20px!important";
                    multiplyIcon.innerHTML = "X";
                    multiplyIcon.style.height ="10px!important";
                    productQuantityPrice.appendChild(multiplyIcon);
                    let productPrice = document.createElement("div");
                    productPrice.className = "product-price text-muted";
                    productPrice.innerHTML = "$ " + `<span class="text-muted" id=product-price-${title}>${price}<span>`;
                    productQuantityPrice.appendChild(productPrice);
                    let productRemove = document.createElement("i");
                    productRemove.className = "fa fa-times";
                    productRemove.onclick = function(){
                        removeProduct(this,price);
                    }
                    productRemove.setAttribute("style","cursor:pointer");
                    mainDiv.appendChild(productRemove);
                    productCoun.innerHTML=productCount;
                }
            }
            totalAmount.innerHTML = (Number(totalAmount.innerHTML) + Number(document.getElementById("product-count-"+title).innerHTML) * price);
            document.getElementById("total-section").style.visibility = "visible";
        }
    }

    function addToCartModalValue(imgSrc,title,price,quantity){
        let user = document.getElementById("user");
        if(user.style.background == ""){
            window.location.href ="e-commerceLoginForm.html";
        }else{
            let cart = document.getElementById("offcanvas-body");
            let productCoun = document.getElementById("count");
            let totalAmount = document.getElementById("total-amount");
            if(productCount == 0){
                alert("Product Added in Cart Successfully");
                productCount++;
                document.getElementById("cart-check").remove();
                let mainDiv = document.createElement("div");
                mainDiv.className="d-flex justify-content-between align-items-center mt-2";
                mainDiv.setAttribute("id","product-"+title);
                mainDiv.setAttribute("style","padding:18px");
                cart.appendChild(mainDiv);
                let productDetail = document.createElement("div");
                productDetail.className="product-detail d-flex";
                productDetail.setAttribute("style","gap:10px;");
                mainDiv.appendChild(productDetail);
                let productImg = document.createElement("img");
                productImg.setAttribute("src",imgSrc);
                productImg.setAttribute("style","width:50px;height:50px");
                productDetail.appendChild(productImg);
                let productTitlePrice = document.createElement("div");
                productTitlePrice.className = "product-title-price d-flex flex-column";
                productDetail.appendChild(productTitlePrice);
                let productTitle = document.createElement("div");
                productTitle.className = "product-name";
                productTitle.innerHTML = title;
                productTitlePrice.appendChild(productTitle);
                let productQuantityPrice = document.createElement("div");
                productQuantityPrice.className="d-flex align-items-center";
                productQuantityPrice.setAttribute("style","gap:8px");
                productTitlePrice.appendChild(productQuantityPrice);
                let productQuant = document.createElement("div");
                productQuant.className = "product-quantity text-muted";
                productQuant.setAttribute("id","product-count-"+title);
                productQuant.innerHTML = quantity;
                productQuantityPrice.appendChild(productQuant);
                let multiplyIcon = document.createElement("span");
                multiplyIcon.className = "material-symbols-outlined text-muted";
                multiplyIcon.innerHTML = "close";
                multiplyIcon.style.height ="10px!important";
                productQuantityPrice.appendChild(multiplyIcon);
                let productPrice = document.createElement("div");
                productPrice.className = "product-price text-muted";
                productPrice.innerHTML = "$ " + `<span class="text-muted" id=product-price-${title}>${price}<span>`;
                productQuantityPrice.appendChild(productPrice);
                let productRemove = document.createElement("i");
                productRemove.className = "fa fa-times";
                productRemove.onclick = function(){
                    removeProduct(this,price);
                }
                productRemove.setAttribute("style","cursor:pointer");
                mainDiv.appendChild(productRemove);
                productCoun.innerHTML=productCount;
            }else{
                if(document.getElementById("product-"+title)){
                    alert("Product Added in Cart Successfully");
                    console.log("hi");
                    document.getElementById("product-count-"+title).innerHTML = Number(Number(document.getElementById("product-count-"+title).innerHTML) + Number(quantity));
                }else{
                    alert("Product Added in Cart Successfully");
                    productCount++;
                    let mainDiv = document.createElement("div");
                    mainDiv.className="d-flex justify-content-between align-items-center mt-2";
                    mainDiv.setAttribute("id","product-"+ title);
                    mainDiv.setAttribute("style","padding:18px");
                    cart.appendChild(mainDiv);
                    let productDetail = document.createElement("div");
                    productDetail.className="product-detail d-flex";
                    productDetail.setAttribute("style","gap:10px;");
                    mainDiv.appendChild(productDetail);
                    let productImg = document.createElement("img");
                    productImg.setAttribute("src",imgSrc);
                    productImg.setAttribute("style","width:50px;height:50px");
                    productDetail.appendChild(productImg);
                    let productTitlePrice = document.createElement("div");
                    productTitlePrice.className = "product-title-price d-flex flex-column";
                    productDetail.appendChild(productTitlePrice);
                    let productTitle = document.createElement("div");
                    productTitle.className = "product-name";
                    productTitle.innerHTML = title;
                    productTitlePrice.appendChild(productTitle);
                    let productQuantityPrice = document.createElement("div");
                    productQuantityPrice.className="d-flex align-items-center";
                    productQuantityPrice.setAttribute("style","gap:8px");
                    productTitlePrice.appendChild(productQuantityPrice);
                    let productQuant = document.createElement("div");
                    productQuant.className = "product-quantity text-muted";
                    productQuant.setAttribute("id","product-count-"+title);
                    productQuant.innerHTML = quantity;
                    productQuantityPrice.appendChild(productQuant);
                    let multiplyIcon = document.createElement("span");
                    multiplyIcon.innerHTML = "X";
                    multiplyIcon.style.height ="10px!important";
                    productQuantityPrice.appendChild(multiplyIcon);
                    let productPrice = document.createElement("div");
                    productPrice.className = "product-price text-muted";
                    productPrice.innerHTML = "$ " + `<span class="text-muted" id=product-price-${title}>${price}<span>`;
                    productQuantityPrice.appendChild(productPrice);
                    let productRemove = document.createElement("i");
                    productRemove.className = "fa fa-times";
                    productRemove.onclick = function(){
                        removeProduct(this,price);
                    }
                    productRemove.setAttribute("style","cursor:pointer");
                    mainDiv.appendChild(productRemove);
                    productCoun.innerHTML=productCount;
                }
            }
            totalAmount.innerHTML = (Number(totalAmount.innerHTML) + Number(document.getElementById("product-count-"+title).innerHTML) * price);
            document.getElementById("total-section").style.visibility = "visible";
        }
    }

    function removeProduct(e,price){
        let totalAmount = document.getElementById("total-amount");
        totalAmount.innerHTML = (Number(totalAmount.innerHTML) - Number(e.previousSibling.children[1].children[1].children[0].innerHTML) * price);
        console.log(e.previousSibling.children[1].children[1].children[0]);
        e.parentNode.remove();
        productCount--;
        let productCoun = document.getElementById("count");
        productCoun.innerHTML = productCount;
        if(document.getElementById("offcanvas-body").children.length == 2){
            productCount = 0;
            document.getElementById("total-section").style.visibility ="hidden";
            totalAmount.innerHTML = productCount;
            let div1 = document.createElement("div");
            div1.className = "d-flex flex-column align-items-center";
            div1.setAttribute("style","margin: 70% 20%;");
            div1.setAttribute("id","cart-check");
            document.getElementById("offcanvas-body").appendChild(div1);
            let icon = document.createElement("i");
            icon.className = "fa fa-shopping-cart";
            icon.style = "font-size: 40px; color: grey;";
            div1.appendChild(icon);
            let para = document.createElement("p");
            para.className = "text-muted h6";
            para.innerHTML = "No Products in the cart";
            div1.appendChild(para);
            productCoun = productCount;
        }
    }

    function func1(a){
        var accoBody = document.querySelectorAll(".acco-body");
        var body = document.getElementById("abody"+a);
        a= a.toString();
        if(a.length == 2){
            if(body.className == "acco-body animation"){
                for(var m of accoBody){
                m.className = "acco-body animation";
                }
            document.getElementById("abody" + a[0]).className="acco-body acco-active";
            body.className = "acco-body acco-active";
            document.getElementById("icon"+a).className ="material-symbols-outlined rotate-down";
            document.getElementById("navbar-offcanvas-body").style.height = "";
            document.getElementById("navbar-offcanvas-body").style.overflowY="scroll";
            }
            else{
                document.getElementById("navbar-offcanvas-body").style.height = "100vh";
                document.getElementById("navbar-offcanvas-body").style.overflowY="hidden";
                document.getElementById("abody" + a).className="acco-body animation";
                body.className = "acco-body animation";
                document.getElementById("icon" +a).className = "material-symbols-outlined rotate";
            }
        }
        else{
            if(body.className == "acco-body animation"){
                for(var m of accoBody){
                m.className = "acco-body animation";
                }
                body.className = "acco-body acco-active";
                document.getElementById("icon" + a).className ="material-symbols-outlined rotate-down";
                document.getElementById("navbar-offcanvas-body").style.height = "";
                document.getElementById("navbar-offcanvas-body").style.overflowY="scroll";
            }
            else{
                body.className = "acco-body animation";
                document.getElementById("navbar-offcanvas-body").style.height = "100vh";
                document.getElementById("navbar-offcanvas-body").style.overflowY="hidden";
                document.getElementById("icon" + a).className = "material-symbols-outlined rotate";
            }
        }
            
    }
    function openOffCanvas(){
        document.getElementById("navbar-offcanvas").style.display ="block";
        document.getElementById("navbar-offcanvas-body").className =
            "filter-anim-start"; 
    }
    
    document.getElementById("navbar-close").addEventListener("click", () => {
        document.getElementById("navbar-offcanvas-body").className =
            "filter-anim-end";
        setTimeout(() => {
            document.getElementById("navbar-offcanvas").style.display = "none";
        }, 300);
    });

    if(document.getElementById("offcanvas-body").children.length > 2){
       sessionStorage.setItem("cart-item",document.getElementById("offcanvas-body").innerHTML);
    }