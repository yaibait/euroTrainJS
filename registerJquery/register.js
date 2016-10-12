$(document).ready(function(){
    $('select').material_select();
    var nameInputEl = $("#name");
    var mailInputEl = $("#mail");
    var passInputEl = $("#pass");
    var rePassInputEl = $("#repass");
    var submitBtn = $("#submit");
    var isGenPass = false;
    var errorMess = {
        "name" : "Name (required, at least 6 characters)",
        "mail" : "Email (required ) ",
        "pass" : "Password not correct format",
        "repass" : "Password not match"
    }
    $("#submit").on("click",function(event){
        event.preventDefault();

        
        var name = nameInputEl.val();
        var mail = mailInputEl.val();
        var pass = passInputEl.val();
        var repass = rePassInputEl.val();
        
        // check name
        var namePattern = /^[\w\s]{6,}$/;
        if(!namePattern.test(name)){
            showError(nameInputEl,errorMess.name);
            return;
        }else{
            removeError(nameInputEl);
        }

        // check mail
        var mailPatern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!mailPatern.test(mail)){
            showError(mailInputEl,errorMess.mail);
            return;
        }else{
            removeError(mailInputEl);
        }
        
        // check pass 
        var passPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
        if(!passPattern.test(pass)){
            showError(passInputEl,errorMess.pass);
            return;
        }else{
            removeError(passInputEl);
        }

        if(!isGenPass){
            if(pass !== repass){
                showError(rePassInputEl,errorMess.repass);
            }else{
                removeError(rePassInputEl);
            }
        }
        var gender = $('input[name="gender"]:checked').val();
        
        var nationalEl = document.getElementById("national");
        var national = $( "#national option:selected").text();

        var user = {
            "name" : name,
            "mail" : mail,
            "pass" : pass,
            "gender" : gender,
            "national" : national
        }
        // save data 
        localStorage.setItem("user",JSON.stringify(user));

        submitBtn.text("Saving...");
        $(this).removeClass("waves-effect waves-light").addClass('disabled');
        setTimeout(function(){
            submitBtn.text("Register");
            submitBtn.removeClass("disabled");
        },5000);

        function showError(el,mess){
            var wrap = el.parent();
            var checkErr = wrap.find(".error").length;
            if(checkErr >= 1){
                wrap.find(".error").remove();
            }
            var mess = '<p class="error">'+ mess +'</p>';
            wrap.append(mess);
        }

        function removeError(el){
            var wrap = el.parent();
            var checkErr = wrap.find(".error").length;
            if(checkErr >= 1){
                wrap.find(".error").remove();
            }
        }

    });

    // auto gen password event
    $("#autoGenPass").on("click",function(){
        isGenPass = true;
        var listDown = "qwertyuiopasdfghjklzxcvbnm";
        var listUp = "QWERTYUIOPASDFGHJKLZXCVBNM";
        var listNum = "1234567890";
        var listSymbol = "!@$%&*";
        
        var pass = "";
        for(var i = 0; i < 3; i++){
            pass += listDown.charAt(Math.floor(Math.random()* listDown.length));
            pass += listUp.charAt(Math.floor(Math.random()* listUp.length));
            pass += listNum.charAt(Math.floor(Math.random()* listNum.length));
            pass += listSymbol.charAt(Math.floor(Math.random()* listSymbol.length));
        }
        passInputEl.attr("type","text");
        passInputEl.val(pass);
        rePassInputEl.attr("disabled","true");
    });

});