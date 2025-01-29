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
          
          document.getElementById('fileContenttext').classList.add('hidden')
         
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
          
            
            
          
          suggestionsList.innerHTML = '';// Clear previous suggestions
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
      //add file content
      document.getElementById('fileContenttext').classList.remove('hidden')
      document.getElementById('fileContent').classList.remove('hidden')
      

    }

    function clearcode(){
     document.getElementById('searchInput').value=''
      

      document.getElementById('fileContent').classList.add('hidden')
     
      
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
  


