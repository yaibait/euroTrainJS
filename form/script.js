        var submitBtnEl = document.getElementById("submit");

        submitBtnEl.addEventListener("click",submitEvent,true);

        function submitEvent(event){
        event.preventDefault();
        // 
        var nameInputEl = document.getElementById("name");
        var mailInputEl = document.getElementById("mail");
        var passInputEl = document.getElementById("pass");
        var rePassInputEl = document.getElementById("repass");
        
        var name = nameInputEl.value;
        var mail = mailInputEl.value;
        var pass = passInputEl.value;
        var repass = rePassInputEl.value;
        

        var namePattern = /^[\w\s]{6,}$/;
        if(!namePattern.test(name)){
            nameInputEl.className = "inputError";
            return;
        }else{
            nameInputEl.className = "";
        }
        
        var mailPatern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var passPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        if(!mailPatern.test(mail)){
            mailInputEl.className = "inputError";
            return;
        }else{
            mailInputEl.className = "";
        }
        
        if(!passPattern.test(pass)){
            passInputEl.className = "inputError";
            return;
        }else{
            passInputEl.className = "";
        }
        
        if(pass !== repass){
            rePassInputEl.className = "inputError";
        }else{
            rePassInputEl.className = "";
        }
        var gender = document.querySelector('input[name="gender"]:checked').value;
        var nationalEl = document.getElementById("national");
        var national = nationalEl.options[nationalEl.selectedIndex].text;
        
}       