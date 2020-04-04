console.log("this is a note taking app in Vanilla JavaScript");
showNotes();

// if user takes a note, stored in local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";

    // how notes
    showNotes();


});

//show notes function
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
notesObj.forEach(function(element, index){
    html += `
        <div class="card mt-3 mx-3 noteCard" style="width: 20rem;">
            <div class="card-body">
            <h5 class="card-title text-success">Note ${index + 1}</h5>
            <p class="card-text" id="txtNotes">${element}.</p>
            <button class="btn btn-outline-danger" id="${index}" onclick="deleteNote(this.id)">Delete</button>
            </div>
        </div>
    `;
});
let notesElm = document.getElementById("notes");
if(notesObj.length != 0){
    notesElm.innerHTML = html;
}
else{
    notesElm.innerHTML = "It looks you have not taken any notes!"
}
}

// function to delete note
function deleteNote(index){
    console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}



// search funtionality

let search = document.getElementById("searchText");
search.addEventListener("input", function(e){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if(cardText.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
});


