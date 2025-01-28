// public/script.js

const { response } = require("express");

//Function to search files and update the suggestion 
function searchfile(){

const query=document.getElementById('searchInput').value
const suggestionsList=document.getElementById("suggestionsList")



  
    if (query.length > 0) {
      fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(files => {
          suggestionsList.innerHTML = '';  // Clear previous suggestions
          files.forEach(file => {
            const li = document.createElement('li');
            li.textContent = file;
            
           li.onclick =function(){
             
            document.getElementById('searchInput').value=file
            suggestionsList.classList.add('hidden')
            
          };  // Attach click event to open file
          suggestionsList.appendChild(li);
         
          });
        });
      } else {
        suggestionsList.innerHTML = '';  // Clear suggestions if search is empty
      }
    }




    function createfile(){
     
      const query=document.getElementById('searchInput').value
     const suggestionsList=document.getElementById("suggestionsList")



  
    if (query.length > 0) {
      fetch(`/search?query=${query}`)
        .then(response => response.json())
        .then(files => {
          suggestionsList.innerHTML = '';  // Clear previous suggestions
          files.forEach(file => {
            if(query===file){
               openFile(file)
            }
            
          });
        });
      } else {
        suggestionsList.innerHTML = '';  // Clear suggestions if search is empty
      }
      suggestionsList.classList.remove('hidden')

    }


    
 
  
  // Function to open the selected file and display its content
  function openFile(filename) {
    fetch(`/open/${filename}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('fileContent').textContent = data.content;
      })
      .catch(error => {
        document.getElementById('fileContent').textContent = `Error: ${error.message}`;
      });
  }
  


