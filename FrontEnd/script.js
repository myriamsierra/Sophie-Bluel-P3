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


const editModeBanner = document.querySelector(".admin-banner")
const editModeBtn = document.querySelector(".admin-btn-modifier")
const userlogin = document.querySelector(".admin-login")
const userlogout = document.querySelector(".admin-logout")



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

//10 SUPPRIMER LES IMG AVEC UN BOUTTON///////////////////////////////////////////////////

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
//11 OPEN MODALE ADD/////////////////////////////////////////////////////////////// 
  const BtnOpenModaleAdd = document.querySelector(".modale-add-btn") 
  const ModaleAdd = document.querySelector(".modale-add") 
    
  BtnOpenModaleAdd.addEventListener('click',() => {
    deleteModale.style.display= "none";
    background.style.display = "block";
    ModaleAdd.style.display = "block"
}) 
        
//11 OPEN MODALE ADD/////////////////////////////////////////////////////////////// 
const BtnCloseModaleAdd = document.querySelector(".modaleAdd-close-btn") 

BtnCloseModaleAdd.addEventListener('click',() => {
    deleteModale.style.display= "none";
    background.style.display = "none";
    ModaleAdd.style.display = "none"
}) 

//11 RETURN MODALE ADD/////////////////////////////////////////////////////////////// 
const BtnreturnModaleAdd = document.querySelector(".modaleAdd-return-btn") 

BtnreturnModaleAdd.addEventListener('click',() => {
    deleteModale.style.display= "block";
    background.style.display = "block";
    ModaleAdd.style.display = "none"
}) 
//12 CLICK EN DEHORS DE LA MODALE
background.addEventListener('click',()=>{
    deleteModale.style.display= "none";
    ModaleAdd.style.display = "none";
    background.style.display = "none";
})






//12 RECUPER L IMAGE AJOUTER ET LA METTRE DANS NOTRE MODALE///////////////////////////
const imageUpload = document.getElementById('imageUpload');
const imageUploadBox = document.querySelector('.image-added');
const imageIcon = document.querySelector('.icone-img')
const btnForAddImage = document.querySelector(".image-btn")
const modalePara = document.querySelector(".para-modale")

imageUpload.addEventListener('change', function () {
       if (this.files.length > 0) {
           const selectedFile = this.files[0];
           const imageUrL = URL.createObjectURL(selectedFile);
           const imageAdded = document.createElement('img');
           imageAdded.src = imageUrL;
           imageUploadBox.innerHTML = '';
           imageUploadBox.appendChild(imageAdded);
           imageIcon.style.display="none";
           btnForAddImage.style.display= "none";
           modalePara.style.display= "none";
       }
   });

//CHANGER LA COULEUR DU BOUTTON//////////////////////////////////////////////////////////
const inputFile = document.querySelector("#imageUpload")
const inputTitle = document.querySelector('#modale-add-title')

function SubmitBtnColor() {
    if (inputFile.files[0] && inputTitle.value !== "") {
        submitBtn.style.background="#1D6154"
    }else{
        submitBtn.style.background=""
    }
}

inputFile.addEventListener("input",SubmitBtnColor);
inputTitle.addEventListener("input",SubmitBtnColor);






//13 IMPORTER LES CATEGORIE DANS LE FORMULAIRE
const selectForm = document.getElementById("categorie-form")
const SubmitForm = document.querySelector(".modale-add-submit")

function createSelectGategorie(Allcategory){
    Allcategory.forEach(category => {
        const optionGategorie = document.createElement('option');
        optionGategorie.innerText= category.name;
        optionGategorie.value = category.id;
        selectForm.appendChild(optionGategorie);    
    });  
}

fetch("http://localhost:5678/api/categories")
.then(reponse => reponse.json()) 
.then(Allcategory => { 
    createSelectGategorie(Allcategory);
}) 

//14 si on a toute nos infos le btn est vert sinon on a un prompt d'alert

const submitBtn = document.querySelector('.modale-add-submit');
const modaleAddForm = document.querySelector('.modale-add-form');



  
    // }
///////////////////////////////////////////////////////////////////////////////////////
  



modaleAddForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const title = document.querySelector('#modale-add-title').value;
    const category =  document.getElementById('categorie-form').value;      
    const imageFile = document.getElementById('imageUpload').files[0];
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", imageFile);
    
    
    console.log('title:', title);
    console.log('category:', category);
    console.log('image File:', imageFile);
    
    
    if (!title || !category || !imageFile) {
        console.error("Les éléments du formulaire n'ont pas été trouvés.");
      } else {
       submitBtn.style.background="red"
      }


    
  fetch('http://localhost:5678/api/works', {
        method: "POST",    
        headers: {
            
            'Authorization': `Bearer ${userToken}` 
        },
        body: formData,
    })
    
    .then((response) => {
      if (response.ok) {
        window.location.href = 'index.html';
        return response.json();
      } else {
        // La requête a échoué, vous pouvez gérer les erreurs ici.
        throw new Error("Erreur lors de l'envoi des données.");
      }
    })
    
    .then((data) => {
      
      console.log("Réponse de l'API :", data);
   
    })
    
    .catch((error) => {
      
      console.error("Erreur :", error);
    });

})












// const title = document.querySelector('#modale-add-title').value;
// const category = document.getElementById('categorie-form').value;
// const imageFile = document.getElementById('imageUpload').files[0];

// const formData = new FormData();
// formData.append("title", title);
// formData.append("category", category);

// // Créez un objet FileReader pour lire le fichier en tant que blob
// const reader = new FileReader();

// // Configurez une fonction de rappel pour gérer la lecture du fichier
// reader.onload = function () {
//   const imageBlob = new Blob([reader.result], { type: imageFile.type });
//   formData.append("image", imageBlob, imageFile.name);

//   // Maintenant, vous pouvez envoyer formData avec l'image en tant que blob à votre API
//   fetch('http://localhost:5678/api/works', {
//     method: "POST",
//     headers: {
//       'Authorization': `Bearer ${userToken}`
//     },
//     body: formData,
//   })
//   .then((response) => {
//     if (response.ok) {
//       // La requête a réussi, vous pouvez gérer la réponse ici.
//       return response.json();
//     } else {
//       // La requête a échoué, vous pouvez gérer les erreurs ici.
//       throw new Error("Erreur lors de l'envoi des données.");
//     }
//   })
//   .then((data) => {
//     console.log("Réponse de l'API :", data);
//   })
//   .catch((error) => {
//     console.error("Erreur :", error);
//   });
// };

// // Lisez le contenu du fichier en tant que blob


























//14 RECUPER LES DONNES DE NOTRE FORM///////////////////////////
// const newtitle = document.getElementById('modale-add-title');
// const FormNewTitle = newtitle.value;
// console.log(FormNewTitle);

// const data = { email: email, password: password};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// const formulaire = document.getElementById('monFormulaire');

// formulaire.addEventListener('submit', function (e) {
//     e.preventDefault(); // Empêche le comportement par défaut du formulaire

//     const nom = document.getElementById('nom').value;
//     const email = document.getElementById('email').value;

//     // Vous pouvez maintenant utiliser les valeurs nom et email comme vous le souhaitez
//     console.log('Nom :', nom);
//     console.log('Email :', email);

//     // Si vous souhaitez envoyer ces données à un serveur, vous pouvez utiliser fetch ou une autre méthode d'envoi de données.
// });








// function addNewImage(formData) {
//     fetch('http://localhost:5678/api/works', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${userToken}` // Assurez-vous que userToken est défini correctement
//         },
//         body: formData
//     })
    
//     .then(response => {
//         if (response.ok) {
//             console.log("Image ajoutée avec succès !");
//             // Ajoutez ici toute logique supplémentaire après l'ajout réussi de l'image.
//         } else {
//             console.error("Échec de l'ajout de l'image.");
//             // Gérez l'échec de l'ajout d'image ici, affichez un message d'erreur, etc.
//         }
//     })
//     .catch(error => {
//         console.error("Erreur lors de la requête fetch :", error);
//         // Gérez les erreurs
//     })
// }
// addNewImage()

// function addNewImage(formData) {
//     const jsonData = {
//         title: "test", // Remplacez par la valeur appropriée
//         imageUrl: "test", // Remplacez par la valeur appropriée
//         categoryId: "test" // Remplacez par la valeur appropriée
//     };

    // fetch('http://localhost:5678/api/works', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${userToken}`,
    //         'Content type': 'application/json'
    //     },
    //     body: JSON.stringify(jsonData)
    // })
    // .then(response => {
    //     if (response.status === 201) {
    //         console.log("Image ajoutée avec succès !");
    //         // Ajoutez ici toute logique supplémentaire après l'ajout réussi de l'image.
    //     } else if (response.status === 400) {
    //         console.error("Requête incorrecte. Vérifiez les données envoyées.");
    //         // Gérez le cas où la requête est incorrecte.
    //     } else if (response.status === 401) {
    //         console.error("Non autorisé. Assurez-vous que vous avez un token d'authentification valide.");
    //         // Gérez le cas où l'authentification échoue.
    //     } else {
    //         console.error("Erreur inattendue :", response.status);
    //         // Gérez d'autres erreurs ici.
    //     }
    // })
    // .catch(error => {
    //     console.error("Erreur lors de la requête fetch :", error);
    //     // Gérez les erreurs de requête fetch ici.
    // });


// Assurez-vous d'appeler addNewImage avec les données appropriées lorsque vous l'utilisez.
















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