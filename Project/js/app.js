// (function(){
    
    class RandomChatApp{
        constructor () {
                this.user = undefined;
                this.friend = undefined;
                this.exit = false;
                this.room = {
                    'id' : ''
                };
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
                    this.exitRoom();    
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
            provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
            firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            this.user = result.user;
            if (this.user) { // User is signed in!
                var profilePicUrl = this.user.photoURL; // Only change these two lines!
                console.log(this.user);
                $("#user-avatar").attr("src",profilePicUrl);
                this.createUserInfo(this.user);
            }
            this.loadingDialog.close();
            this.loginDialog.close()
            // ...
            }).catch((error) => {
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
        createUserInfo(user){
            var userInfo = {
                'name' : user.displayName,
                'avatar' : user.photoURL,
                'sex' : 3
            }
            firebase.database().ref('Users/' + user.uid).set(userInfo).then(() => {
                console.log("add user data to database");
            });
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
            // firebase.database().ref('User/' + userId).set(userInfo).then(() => {
                
            // });
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

            $("#searchBtn").on("click",(event) => {
                event.preventDefault();
                this.findFriend();
            });

            $("#friend-avatar").on("click",(event) => {
                event.preventDefault();

            })
        }
        findFriend(){
            var waitingRoom = {
                user_one : this.user.uid,
                user_two : "",
                status  : 0
            }
            
            firebase.database().ref("rooms").orderByChild("status").equalTo(0).once("value").then((dataSnapshot) => {
                    
                if(dataSnapshot.val() !== null){
                    // join to room
                    //this.room.id = dataSnapshot.getKey();
                    // console.log(dataSnapshot.getKey());
                    this.joinToRoom(dataSnapshot);
                }else{
                    // create a room 

                    firebase.database().ref("rooms").push(waitingRoom).then((data) => {
                        // console.log(data);
                        this.room.id = data.getKey();
                        this.loadMessager();
                        this.listenRoomState();
                        this.disconnectRoom();
                    }).catch((error) => {
                        console.error('Error join to room Firebase Database', error);
                    });
                }
                
            });
        }
        listenRoomState(){
            this.roomRef = firebase.database().ref("rooms/"+this.room.id);
            var peopleJoin = function(data){
                console.log(data.val());
                
                switch (data.val()) {
                    case 1:
                        console.log("a people join to room");
                        this.createFriendInfo("user_two");
                        this.startConversationAction();
                        break;
                    case 3:
                        let text = "Bạn đã thoát cuộc trò chuyện";
                        if(!this.exit){
                            text = this.friend.name + " đã thoát cuộc trò chuyện";
                        }
                        this.aMessengeView(text,"out");
                        this.exit = false;
                        console.log("a people exit to room");
                        this.stopConversationAction();
                        break;
                }
            }.bind(this);
            // this.roomRef.once('child_added', peopleJoin);
            this.roomRef.on('child_changed', peopleJoin);
        }
        createFriendInfo(userType){
            firebase.database().ref('rooms/'+this.room.id).once("value").then((roomSnapshot) =>{
                var room = roomSnapshot.val();
                var id = room[userType];
                firebase.database().ref('Users/'+id).once("value").then((userSnapshot) =>{
                    console.log(userSnapshot.val());
                    var userData = userSnapshot.val();
                    this.createFriendInfoView(userData);
                });
            } );
            
        }
        createFriendInfoView(userData){
            this.friend = userData;
            $("#friend-avatar").attr("src",userData.avatar);
            $("#friend-name").text(userData.name);
            var text = userData.name + " đã tham gia cuộc hội thoại cùng bạn";
            this.aMessengeView(text,"join");

        }
        getUserInfoById(_id){
            firebase.database().ref('Users/'+_id).once("value").then((snapshot) =>{
                
            });
        }
        joinToRoom(dataSnapshot){
            this.room.id = Object.keys(dataSnapshot.val())[0];
            

            var updates = {
                'user_two' : this.user.uid,
                'status'   : 1
            };
            // updates['/rooms/' + romId + '/user_two'] = this.user.uid;
            // updates['/rooms/' + romId + '/status'] = 1;
            firebase.database().ref('rooms/'+this.room.id).update(updates).then(() => {
                this.loadMessager();
                this.listenRoomState();
                this.startConversationAction();
                this.disconnectRoom();
                console.log("success join to room");
                this.createFriendInfo("user_one");
            }).catch(() => {
                console.log("Cannot join to room");
            });
            
        }
        disconnectRoom(){
            var roomRef = firebase.database().ref('rooms/'+this.room.id+"/status");
            roomRef.onDisconnect().set(3);
        }
        exitRoom(){
            var updates = {
                'status'   : 3
            };
            this.exit = true;
            firebase.database().ref('rooms/'+this.room.id).update(updates).then(() => {
                
                console.log("success exit to room");
            }).catch(() => {
                console.log("Cannot exit to room");
            });
        }
        loadMessager(){
            this.messagesRef = firebase.database().ref("rooms/"+this.room.id+"/messages");

            var setMessage = function(data){
                // console.log();
                var mess = data.val();
                var sender = "me";
                if(this.user.uid != mess.userId){
                    sender = "you";
                }
                this.aMessengeView(mess.content,sender);
                
            }.bind(this);
            this.messagesRef.limitToLast(12).on('child_added', setMessage);
            this.messagesRef.limitToLast(12).on('child_changed', setMessage);

            
        }
        startConversationAction(){
            // show exit button 
            $("#exitBtn").show();
            $("#searchBtn").hide();
            $("#friend-info-top").css("visibility","visible");
            $("#sendBtn").removeAttr("disabled");
            $("#chat-input").removeAttr("disabled");
        }
        stopConversationAction(){
            $("#exitBtn").hide();
            $("#searchBtn").show();
            $("#friend-info-top").css("visibility","hidden");
            $("#sendBtn").attr('disabled', 'disabled');
            $("#chat-input").attr('disabled', 'disabled');
        }
        addAMessenger(_sender){
            let mess = this.chatInputEl.val();
            if(mess == "") return;
            let messObj = {
                userId : this.user.uid,
                content : mess
            }
            firebase.database().ref("rooms/"+this.room.id+"/messages").push(messObj).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.error('Error writing new message to Firebase Database', error);
            });
            
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

