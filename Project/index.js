// (function(){
    
    class RandomChatApp{
        constructor () {
                this.user = undefined;
                this.chatPlace = $("#chat-content-render");
                this.outDialog = document.querySelector('#outDialog');
                this.chatInputEl = $("#chat-input");
                if (! this.outDialog.showModal) {
                    dialogPolyfill.registerDialog(this.outDialog);
                }
                
                this.outDialog.querySelector('.closeBtn').addEventListener('click', () =>  {
                    this.outDialog.close();
                });

                this.outDialog.querySelector('.acceptBtn').addEventListener('click', () =>  {
                    this.outDialog.close();
                });
                // login dialog 

                
                this.loginDialog = document.querySelector('#loginDialog');
                if (! this.loginDialog.showModal) {
                    dialogPolyfill.registerDialog(this.loginDialog);
                }
                // loginDialog.showModal();

                // find friend

                this.findFriendDialog = document.querySelector('#findFriendDialog');
                if (! this.findFriendDialog.showModal) {
                dialogPolyfill.registerDialog(this.findFriendDialog);
                }
                // findFriendDialog.showModal();

                // loading 

                this.loadingDialog = document.querySelector('#loadingDialog');
                if (! this.loadingDialog.showModal) {
                dialogPolyfill.registerDialog(this.loadingDialog);
                }
                // loadingDialog.showModal();

                // user options
                this.userOptionDialog = document.querySelector('#userOptionDialog');
                if (! this.userOptionDialog.showModal) {
                dialogPolyfill.registerDialog(this.userOptionDialog);
                }

                this.loadingDialog.showModal();
                this.checkLogin();
                this.initEvent();

                

        }
        googleLogin(){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            this.user = result.user;
            if (this.user) { // User is signed in!
                var profilePicUrl = this.user.photoURL; // Only change these two lines!

                $("#user-avatar").attr("src",profilePicUrl);
            }
            this.loadingDialog.close();
            // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                this.loadingDialog.close();
            });
        }
        facebookLogin(){
            var provider = new firebase.auth.FacebookAuthProvider();
        }
        checkLogin(){
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    var profilePicUrl = user.photoURL; // Only change these two lines!
                    var userName = user.displayName;   // Only change these two lines!
                    this.user = user;
                    $("#user-avatar").attr("src",profilePicUrl);
                    this.loadingDialog.close();
                    
                } else {
                    // No user is signed in.
                    this.loadingDialog.close();
                    this.loginDialog.showModal();
                }
            });
        }
        initUser(_user){
            let userId = _user.uid;
            firebase.database().ref('User/' + userId).set(userInfo).then(() => {
                
            });
        }

        initEvent(){
            $("#googleLoginBtn").on("click",(event) => {
                event.preventDefault();
                this.loadingDialog.showModal();
                this.googleLogin();
            });

            $("#facebookLoginBtn").on("click",(event) => {
                event.preventDefault();
                this.facebookLogin();
            });

            $("#sendBtn").on("click",(event) => {
                event.preventDefault();
                this.addAMessenger("me");
            });

            // go out chat 
            $("#exitBtn").on("click",(event) => {
                event.preventDefault();
                this.outDialog.showModal();
            });

            $("#user-avatar").on("click",(event) => {
                event.preventDefault();
                this.userOptionDialog.showModal();
            });


        }
        addAMessenger(_sender){
            let mess = this.chatInputEl.val();
            this.aMessengeView(mess,_sender);
            this.chatInputEl.val("");
            // scroll to bottom
            this.chatPlace[0].scrollTop = this.chatPlace[0].scrollHeight;
        }
        aMessengeView(_mess,_sender){
            var temp = '<li class="mess '+ _sender+'">'+
                            '<p>'+ _mess +'</p>'+
                        '</li>';
            this.chatPlace.append(temp);
        }
        messageRender(_messView){
            
        }
    }



    var chatApp = new RandomChatApp();

    $("#loginBtn").on("click",function(){
        // firebase.auth().signInWithPopup(provider).then(function(result) {
        // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        // var user = result.user;
        // // ...
        // }).catch(function(error) {
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...
        // });
    });

    


    

    // go out chat 
    // $("#exitBtn").on("click",function(){
    //     outDialog.showModal();
    // });



    // firebase google login

    function googleLogin(){
        
    }

    // check login

    // function checkLogin(){
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             // User is signed in.
    //             var profilePicUrl = user.photoURL; // Only change these two lines!
    //             var userName = user.displayName;   // Only change these two lines!
    //             console.log(user);
    //             $("#user-avatar").attr("src",profilePicUrl);
    //         } else {
    //             // No user is signed in.
    //         }
    //     });
    // };

    //checkLogin();

// })();

