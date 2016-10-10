var keyList = "qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*";
function generatePass(length){
    var pass = "";
    for(var i = 0; i < length; i++){
        pass += keyList.charAt(Math.floor(Math.random()* keyList.length));
    }
    document.passGen.passOutput.value = pass;
    return pass;
}