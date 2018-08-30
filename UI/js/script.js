       let clicked = true;
       const showHiddenField = () =>{
           document.getElementById("hiddenField").className = "shown";
       }
       const hideHiddenField = () =>{
           document.getElementById("hiddenField").className = "hidden";
       }
       const signupClick = () =>{
           
           if(clicked){
           document.getElementById("signup-modal").className = "shown";
            clicked = false;
            return
           }
           document.getElementById("signup-modal").className = "hidden";
           clicked = true;
           return; 
       }