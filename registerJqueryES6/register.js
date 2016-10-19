$(document).ready(function(){
    $('select').material_select();
    let nameInputEl = $("#name");
    let mailInputEl = $("#mail");
    let passInputEl = $("#pass");
    let rePassInputEl = $("#repass");
    let submitBtn = $("#submit");
    var isGenPass = false;
    var errorMess = {
        "name" : "Name (required, at least 6 characters)",
        "mail" : "Email (required ) ",
        "pass" : "Password not correct format",
        "repass" : "Password not match"
    }
    $("#submit").on("click",(event) => {
        event.preventDefault();

        
        let name = nameInputEl.val();
        let mail = mailInputEl.val();
        let pass = passInputEl.val();
        let repass = rePassInputEl.val();
        
        // check name
        let namePattern = /^[\w\s]{6,}$/;
        if(!namePattern.test(name)){
            showError(nameInputEl,errorMess.name);
            return;
        }else{
            removeError(nameInputEl);
        }

        // check mail
        let mailPatern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!mailPatern.test(mail)){
            showError(mailInputEl,errorMess.mail);
            return;
        }else{
            removeError(mailInputEl);
        }
        
        // check pass 
        let passPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
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
        let gender = $('input[name="gender"]:checked').val();
        
        let nationalEl = document.getElementById("national");
        let national = $( "#national option:selected").text();

        let user = {
            "name" : name,
            "mail" : mail,
            "pass" : pass,
            "gender" : gender,
            "national" : national
        }
        // save data 
        localStorage.setItem("user",JSON.stringify(user));
        let userInfo = {
            "name" : name,
            "gender" : gender,
            "national" : national
        }
        submitBtn.text("Saving...");
        $(this).removeClass("waves-effect waves-light").addClass('disabled');
        // setTimeout(() => {
            
        // },5000);
        
        // save data to firebase 
        // firebase.database().ref('users/' + userId).set({
        //     username: name,
        //     email: email,
        //     profile_picture : imageUrl
        // });
        firebase.auth().createUserWithEmailAndPassword(mail, pass).then((user) => {
            let userId = user.uid;
            firebase.database().ref('User/' + userId).set(userInfo).then(() => {
                submitBtn.text("Register");
                submitBtn.removeClass("disabled");
            });
            
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
            alert(errorMessage);
            submitBtn.text("Register");
            submitBtn.removeClass("disabled");
        // ...
        });

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
    $("#autoGenPass").on("click",() => {
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