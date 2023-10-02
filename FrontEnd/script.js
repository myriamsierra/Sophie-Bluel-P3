/////////////////////////ETAPE 1/////////////////////////////////////////////


//0 LES ELEMENTS DU DOM//////////////////////////////////////////////////////
const gallery = document.querySelector(".gallery");
const filterGallery = document.querySelector(".filter-gallery");



//1 FONCTION QUI CREER UNE GALLERY D'IMG//////////////////////////////////////
function createGallery(Allworks){
    Allworks.forEach(works => {
        const imageBox = document.createElement('figure');
        const image = document.createElement('img');
        const descriptionImg = document.createElement('figcaption');
        image.src = works.imageUrl;
        descriptionImg.textContent = works.title;
        imageBox.append(image, descriptionImg); 
        gallery.appendChild(imageBox);
    });   
}


//2 AVEC LES DONNEE DE NOTRE API ON EXECUTE LA FONCTION pour les img///////////
fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json()) 
    .then(Allworks => { 
        createGallery(Allworks);
    }) 


//3 FONCTION QUI CREER DES BUTTONS//////////////////////////////////////////////
function createFilterBtn(Allcategory){
    Allcategory.forEach(category => {
        const filterBtn = document.createElement('button');
        filterBtn.innerText= category.name;
        filterGallery.appendChild(filterBtn);
        //au click des btn on appelle notre fonction qui filtre
        filterBtn.addEventListener("click", () => {
            createFilterImg(category.name);
        }); 
    });  
}


// 4 AVEC LES DONNEES DE NOTRE API ON EXECUTE LA FONCTION pour les btn///////////   
fetch("http://localhost:5678/api/categories")
.then(reponse => reponse.json()) 
.then(Allcategory => { 
    createFilterBtn(Allcategory);
}) 


//5 FONCTION QUI FILTRE LES IMG///////////////////////////////////////////////////
function createFilterImg(categoryName) {
    fetch("http://localhost:5678/api/works")
        .then(reponse => reponse.json()) 
        .then(Allworks => { 
            const onlyFilterImg = Allworks.filter(works => works.category.name === categoryName);
            gallery.innerHTML = "";
            createGallery(onlyFilterImg);
            //on creer une fonction pour notre boutton "tous" qui va afficher toute la gallery
            const btnForAllwork = document.querySelector(".tous-btn")
            btnForAllwork.addEventListener("click", () => {
                    gallery.innerHTML = "";
                    createGallery(Allworks); 
            })
        })           
}      

/////////////////////////////LOGIN INTERFACE/////////////////////////////////////////
console.log(localStorage.getItem("token"))
const userToken =localStorage.getItem("token")


const editModeBanner = document.querySelector (".admin-banner")
const editModeBtn = document.querySelector (".admin-btn-modifier")
const userlogin = document.querySelector (".admin-login")
const userlogout = document.querySelector (".admin-logout")



if(userToken !== null){
    editModeBanner.style.display = "block";
    editModeBtn .style.display = "inline-block";
    userlogin.style.display = "none";
    userlogout.style.display = "block";
}

//LOGOUT
userlogout.addEventListener("click", () => {
    localStorage.clear();  
})



////////////////////////////////ETAPE 2////////////////////////////////////////////

//petit details a changer demain ds le html
//le hover vert foncé sur les btn 
// la barre de navigation projet contact qui renvoie a projet et contact
//creer une nouvelle branche et push mon projet 
//dans ma page login.html je n arrive pas a faire mon lien index.html#contact
