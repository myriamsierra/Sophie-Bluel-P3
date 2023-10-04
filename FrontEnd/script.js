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

//6 LOGIN INTERFACE//////////////////////////////////////////////////////////////////
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

//7 CREATION DE LA GALLERIE D'IMAGE AVEC LES ICONES ///////////////////////////////////////
const modaleImg = document.querySelector(".modale-img")
const deleteModale =document.querySelector(".modale-delete")

function createGalleryModale(Allworks){
    Allworks.forEach(works => {
        const imageBox = document.createElement('figure');
        const image = document.createElement('img');
        const descriptionImg = document.createElement('figcaption');
        const iconeTrash = document.createElement('i');
        image.src = works.imageUrl;
        iconeTrash.classList.add("fa-solid","fa-trash-can");
        iconeTrash.dataset.workId = works.id;
        imageBox.append(image, descriptionImg); 
        modaleImg.appendChild(imageBox);
        descriptionImg.appendChild(iconeTrash);

        
        //Supprimer images dans la gallery sur le click des bouttons
        iconeTrash.addEventListener("click",()=>{
            imageBox.remove
            deleteImg(works.id);
        })
    });   
}
//8 AJOUTS DES IMAGES API //////////////////////////////////////////////////////////////
fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json()) 
    .then(Allworks => { 
        createGalleryModale(Allworks);
    }) 

//9 OPEN MODALE-DELETE//////////////////////////////////////////////////////////////////

const background = document.querySelector(".background")

editModeBtn.addEventListener('click',() => {
    deleteModale.style.display= "block";
    background.style.display = "block";
})

//9 CLOSE MODALE-DELETE//////////////////////////////////////////////////////////////////

const closeModaleBtn = document.querySelector(".modale-close-btn")

closeModaleBtn.addEventListener('click',() => {
    deleteModale.style.display= "none";
    background.style.display = "none";
}) 

//10 SUPPRIMER LES IMG AVEC UN BOUTTON 

function deleteImg(workId){
    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${userToken}` 
        },
    })
    .then(response => {
        if (response.ok) {
            createNewnewGallery(workId);
        }   
    })
}
          
function createNewGallery(deletedWorkId) {
    const galleryAllImg = gallery.querySelectorAll('figure');
    galleryAllImg.forEach(image => {
          const imageID = image.querySelector('img').dataset.workId;
           if (imageID == deletedWorkId) {
               image.remove();
           }
    });
}    

    
    
    
        





























//petit details a changer demain ds le html
//le hover vert foncé sur les btn 
// la barre de navigation projet contact qui renvoie a projet et contact
//creer une nouvelle branche et push mon projet 
//dans ma page login.html je n arrive pas a faire mon lien index.html#contact

////////////IMPORTER NOS IMG DANS LA GALLERIE DE LA MODALE ///////////////////////////




























//***************************************OPEN/CLOSE MODALE**************************/
// const modale = document.querySelector(".modale")
// const closeModale =document.querySelector(".close-btn")


// btnUser.addEventListener("click",()=>{
//     modale.style.display="block";    
// })

// closeModale.addEventListener("click",()=>{
//     modale.style.display="none"
// })

//*****************************************OPACITY BEHIND MODALE*********************** */

// modale.classList.add("active")
//BAH FCK THAT SHIT

//*******************AJOUTER LA GALLERY DYNAMIQUEMENT******************************** */
// const modaleGallery =document.querySelector(".modale-gallery")

// function createModaleGallery(work) {
//     const figure = document.createElement("figure");
//     const img = document.createElement("img");
//     const figcaption = document.createElement("figcaption");
//     const icon = document.createElement("i"); 
//     icon.classList.add("fa-solid", "fa-trash-can");
//     img.src = work.imageUrl;
//     icon.dataset.workId = work.id;
//     figcaption.appendChild(icon);
//     figure.appendChild(img);
//     figure.appendChild(figcaption);
//     modaleGallery.appendChild(figure);
//     //****SUPPRESSION DES TRAVAUX******* */ 
//     icon.addEventListener("click", () => {
//         deleteImageFromAPI(work.id);
//         figure.remove();
//     }); 
// }

// fetch('http://localhost:5678/api/works')
//     .then(reponse => reponse.json()) 
//     .then(reponse2 => {
//         reponse2.forEach((work) => {
//             createModaleGallery(work);           
//         });
//     });
        
// //*****************SUPPRESION DE LA GALERY DANS LE DOM */

    

// function deleteImageFromAPI(workId) {
  
//     fetch(`http://localhost:5678/api/works/${workId}`, {
//         method: 'DELETE',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${userToken}` 
//         },
//     })
//     .then(response => {
//         if (response.ok) {
            
//             updateGalleryAfterDeletion(workId);
//         }
//     })
// }


// function updateGalleryAfterDeletion(deletedWorkId) {
//     // Parcourez la galerie principale et supprimez l'élément correspondant à l'ID supprimé
//     const galleryFigures = gallery.querySelectorAll('figure');
//     galleryFigures.forEach(figure => {
//         const workId = figure.querySelector('img').dataset.workId;
//         if (workId == deletedWorkId) {
//             figure.remove(); // Supprimez l'élément correspondant
//         }
//     });
// }