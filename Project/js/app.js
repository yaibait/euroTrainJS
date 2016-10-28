// (function(){
    //':-)',':o',':-o',':-]',':-D','X-D',';-p',':-@',':-(',":'-(",":-*",";-)",":-/",":-s",":-|",":-$",":-x",'<3',":+1:",":-1:",
    var listSmile = [
        ':bowtie:',':smile:',':laughing:',':blush:',':smiley:',':relaxed:',':smirk:',':heart_eyes:',':kissing_heart:',':kissing_closed_eyes:',':flushed:',':relieved:',':satisfied:',':grin:',':wink:',':stuck_out_tongue_winking_eye:',':stuck_out_tongue_closed_eyes:',':grinning:',':kissing:',':kissing_smiling_eyes:',':stuck_out_tongue:',':sleeping:',':worried:',':frowning:',':anguished:',':open_mouth:',':grimacing:',':confused:',':hushed:',':expressionless:',':unamused:',':sweat_smile:',':sweat:',':weary:',':pensive:',':disappointed:',':confounded:',':fearful:',':cold_sweat:',':persevere:',':cry:',':sob:',':joy:',':astonished:',':scream:',':neckbeard:',':tired_face:',':angry:',':rage:',':triumph:',':sleepy:',':yum:',':mask:',':sunglasses:',':dizzy_face:',':imp:',':smiling_imp:',':neutral_face:',':no_mouth:',':innocent:'
    ]
    
    class RandomChatApp{
        constructor () {
                this.user = undefined;
                this.friend = undefined;
                this.exit = false;
                this.inRoom = false;
                this.roomStatusRef = {};
                this.haveFriend = false;
                this.emojiIcon = false;
                this.roomRef = {};
                this.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
                // firebase
                this.storage = firebase.storage();
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
                    if(this.outDialog.open)
                        this.outDialog.close();
                });

                this.outDialog.querySelector('.acceptBtn').addEventListener('click', () =>  {
                    this.exitRoom();
                    if(this.outDialog.open)    
                        this.outDialog.close();

                });
                // login dialog 

                
                this.loginDialog = document.querySelector('#loginDialog');
                if (! this.loginDialog.showModal) {
                    dialogPolyfill.registerDialog(this.loginDialog);
                }
                // loginDialog.showModal();

                // friend info

                this.friendInfoDialog = document.querySelector('#friendInfoDialog');
                if (! this.friendInfoDialog.showModal) {
                    dialogPolyfill.registerDialog(this.friendInfoDialog);
                }
                this.friendInfoDialog.querySelector('.closeBtn').addEventListener('click', () =>  { 
                    if(this.friendInfoDialog.open) 
                        this.friendInfoDialog.close();

                });
                // find friend

                this.findFriendDialog = document.querySelector('#findFriendDialog');
                if (! this.findFriendDialog.showModal) {
                dialogPolyfill.registerDialog(this.findFriendDialog);
                }
                this.findFriendDialog.querySelector('.searchPopupBtn').addEventListener('click', () =>  {
                    this.findFriend();
                });
                
                this.findFriendDialog.querySelector('#findFriendDialogClose').addEventListener('click', () =>  {
                    if(this.findFriendDialog.open)
                            this.findFriendDialog.close();
                });
                // findFriendDialog.showModal();

                // loading 

                // this.loadingDialog = document.querySelector('#loadingDialog');
                // if (! this.loadingDialog.showModal) {
                // dialogPolyfill.registerDialog(this.loadingDialog);
                // }
                this.loadingDialog = {
                    showModal : () => {
                        showLoading();
                    },
                    close : () => {
                        
                    }
                }
                // loadingDialog.showModal();

                // user options
                this.userOptionDialog = document.querySelector('#userOptionDialog');
                if (! this.userOptionDialog.showModal) {
                dialogPolyfill.registerDialog(this.userOptionDialog);
                }

                this.userOptionDialog.querySelector('.closeBtn').addEventListener('click', () =>  {
                    if(this.userOptionDialog.open)
                        this.userOptionDialog.close();
                });
                this.userOptionDialog.querySelector('.saveBtn').addEventListener('click', () =>  {
                    showLoading();
                    this.updateUserInfo().then(() => {
                            hideLoading();
                        if(this.userOptionDialog.open)
                            this.userOptionDialog.close();
                    }).catch(() => {
                            hideLoading();
                        if(this.userOptionDialog.open)
                            this.userOptionDialog.close();
                    });
                    
                });
                showLoading();
                this.checkLogin();
                this.initEvent();
                this.createEmoji();
        }
        createEmoji(){
            var listSmileEl = $("#listEmoji");
                listSmile.forEach(function(text){
                    var temp = '<li class="emojiIcon">'+text+'</li>';
                    var emojiIconEl = $(temp);
                    listSmileEl.append($(temp));
                });
                emojify.run(listSmileEl[0]);
                listSmileEl.hide();
              $(document).on("click","#listEmoji > li",function(){
                  var em = $(this).find(".emoji").attr("alt");
                  var  text = $("#chat-input").val() +" "+ em;
                  $("#chat-input").parent().addClass('is-dirty')
                  $("#chat-input").val(text);
                  
              });                  
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
                $("#user-avatar").attr("src",profilePicUrl);
                this.createUserInfo(this.user);
            }
            
                            hideLoading();
            if(this.loginDialog.open)
                            this.loginDialog.close();
            
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
                
                    hideLoading();
            });
        }
        facebookLogin(){
            console.log("facebookLogin");
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.setCustomParameters({
            'display': 'popup'
            });
            firebase.auth().signInWithPopup(provider).then((result) => {
                
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            
            this.user = result.user;
            console.log(result);
            console.log(this.user);

            if (this.user) { // User is signed in!
                var profilePicUrl = this.user.photoURL; // Only change these two lines!
                $("#user-avatar").attr("src",profilePicUrl);
                this.createUserInfo(this.user);
            }
            
            hideLoading();
            if(this.loginDialog.open)
                            this.loginDialog.close();

            }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            hideLoading();
            });


        }
        updateUserInfo(){
            let displayName = $("#optionName").val() || this.user.displayName;
            let gender = $('#sex-selectOption input[name="sex"]:checked').val();
            let userInfo = {
                'name' : displayName,
                'sex' : gender
            }
            console.log(userInfo);
            return firebase.database().ref('Users/' + this.user.uid).update(userInfo);
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
                    
                    this.user = user;
                    this.getUserInfoById(this.user.uid).then((snapshot) =>{
                        
                        let user = snapshot.val();
                        console.log(user);
                        this.user["name"] = user.name;
                        this.user["sex"] = user.sex;
                        this.initUserView(this.user);
                        
                            hideLoading();
                    });
                    
                } else {
                    // No user is signed in.
                    
                        hideLoading();
                    this.loginDialog.showModal();
                }
            });
        }
        
        initUserView(_user){
            let userId = _user.uid;
            // firebase.database().ref('User/' + userId).set(userInfo).then(() => {
                
            // });
            // User is signed in.
            var profilePicUrl = _user.photoURL; // Only change these two lines!
            var userName = _user.name;   // Only change these two lines!
            var sex = _user.sex;
            $("#user-avatar").attr("src",profilePicUrl);
            // firebase.database().ref('User/' + userId).set(userInfo).then(() => {
                
            // });

            $("#optionName").val(userName);
            
            // console.log(document.querySelector('#sex-selectOption input[value="'+ sex +'"]').parentNode);
            $('#sex-selectOption input[value="'+ sex +'"]').parent()[0].MaterialRadio.check();
            // console.log($('#sex-selectOption input[value="'+ sex +'"]').parent()[0].MaterialCheckbox);
        }

        initEvent(){
            $("#googleLoginBtn").on("click",(event) => {
                event.preventDefault();
                showLoading();
                this.googleLogin();
            });

            $("#facebookLoginBtn").on("click",(event) => {
                event.preventDefault();
                this.facebookLogin();
            });

            $("#sendBtn").on("click",(event) => {
                event.preventDefault();
                this.addAMessenger("me");
                return false;
            });

            $("#chat-input").keydown((e) => {
               
                if((e.keyCode || e.which) == 13) { //Enter keycode
                    this.addAMessenger("me");
                }
            });

            // go out chat 
            $("#exitBtn").on("click",(event) => {
                event.preventDefault();
                this.outDialog.showModal();
                return false;
            });

            $("#user-avatar").on("click",(event) => {
                event.preventDefault();
                this.userOptionDialog.showModal();
                return false;
            });

            $("#searchBtn").on("click",(event) => {
                event.preventDefault();
                this.findFriendDialog.showModal();
                // this.findFriend();
                return false;
            });

            $("#friend-avatar").on("click",(event) => {
                event.preventDefault();

            });

            $("#submitImage").on("click",(event) => {
                event.preventDefault();
                $("#mediaCapture").click();
            });
            $("#mediaCapture").on("change",(event) => {
                event.preventDefault();
                var file = event.target.files[0];
                console.log(file);
                this.addAImageMessenger(file);
                
            });

            $("#friend-info-wrap").on("click",(event) => {
                event.preventDefault();
                friendInfoDialog.showModal();
            });

            $("#emojiBtn").on("click",(event) => {
                event.preventDefault();
                this.showHideEmoji();
                return false;
            });
            $("#chat-input").focus((event) => {
                event.preventDefault();
                this.emojiIcon = true;
                this.showHideEmoji();
                return false;
            })
        }
        showHideEmoji(){
            var tempHeight = 122;
                $("#listEmoji").show();
                var height = $("#listEmoji").height() + tempHeight + 20;
                if(this.emojiIcon){
                    $("#listEmoji").hide();
                    $("#chat-content-wrap").css("height","calc(100% - "+tempHeight+"px)");
                    this.emojiIcon = false;
                    
                }else{
                    $("#listEmoji").show();
                    $("#chat-content-wrap").css("height","calc(100% - "+height+"px)");
                    this.emojiIcon = true;
                    
                }
        }
        findFriend(){
            // let findSex = document.querySelector(".sex-select input[name='findSex']:checked").value;
            showLoading();
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
                        this.inRoom = true;
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
                        this.haveFriend = true;
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
            $("#friendInfoDialog_avatar").attr("src",userData.avatar);
            $("#friendInfoDialog_name").text(userData.name);
            var sexInfo = $("#friendInfoDialog_sex .fa");
            var sexInfoText = $("#friendInfoDialog_sex_text");
            
            switch (userData.sex){
                case "1":
                    sexInfo.addClass("fa-male");
                    sexInfoText.html("Nam");
                break;
                case "2":
                    sexInfo.addClass("fa-female");
                    sexInfoText.html("Nữ");
                break;
                default:
                    sexInfo.addClass("fa-snapchat-ghost");
                    sexInfoText.html("Ẩn danh");
            }
            
            var text = userData.name + " đã tham gia cuộc hội thoại cùng bạn";
            this.aMessengeView(text,"join");

        }
        getUserInfoById(_id){
            return firebase.database().ref('Users/'+_id).once("value");
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
            if(this.room.id){
                this.roomStatusRef = firebase.database().ref('rooms/'+this.room.id+"/status");
                this.roomStatusRef.onDisconnect().set(3);
            };
            if(!this.haveFriend){
                //this.roomRef.onDisconnect().remove();
            }
            
        }
        exitRoom(){
            var updates = {
                'status'   : 3
            };
            this.exit = true;
            firebase.database().ref('rooms/'+this.room.id).update(updates).then(() => {
                this.inRoom = false;
                console.log("success exit to room");
            }).catch(() => {
                console.log("Cannot exit to room");
            });
        }
        loadMessager(){
            this.messagesRef = firebase.database().ref("rooms/"+this.room.id+"/messages");
            var imageEl = "";
            var setMessage = function(data){
                // console.log();
                var mess = data.val();
                var sender = "me";
                if(this.user.uid != mess.userId){
                    sender = "you";
                }
                switch(mess.type){
                    case "text":
                        this.aMessengeView(mess.content,sender);
                    break;
                    case "image":
                        console.log(mess.imageUrl);
                        
                        if (mess.imageUrl.startsWith('gs://')) {
                            
                            this.storage.refFromURL(mess.imageUrl).getMetadata().then((metadata) => {
                                console.log(imageEl);
                                imageEl.attr("src",metadata.downloadURLs[0]);

                            });
                        } else {
                            imageEl = this.aMessengeImageView(mess.imageUrl,sender);
                        }
                    break;
                }
                
                
            }.bind(this);
            this.messagesRef.limitToLast(12).on('child_added', setMessage);
            this.messagesRef.limitToLast(12).on('child_changed', setMessage);

            
        }
        startConversationAction(){
            // show exit button 
            $("#exitBtn").show();
            $("#searchBtn").hide();
            $("#friend-info-wrap").show();
            $("#sendBtn").removeAttr("disabled");
            $("#chat-input").removeAttr("disabled");
            $("#emojiBtn").removeAttr("disabled");
            
            
            this.inRoom = true;
            this.haveFriend = true;
            if(this.findFriendDialog.open)
                this.findFriendDialog.close();
            
                hideLoading();
        }
        stopConversationAction(){
            $("#exitBtn").hide();
            $("#searchBtn").show();
            $("#friend-info-wrap").hide();
            $("#sendBtn").attr('disabled', 'disabled');
            $("#chat-input").attr('disabled', 'disabled');
            $("#emojiBtn").attr('disabled', 'disabled');
            this.emojiIcon = true;
            this.showHideEmoji();
            if(this.inRoom)
                firebase.database().ref("rooms/"+this.room.id).remove();
            this.inRoom = false;
            this.haveFriend = false;
            console.log("cancel");
            this.roomStatusRef.onDisconnect().cancel();
            if(this.haveFriend) this.roomRef.onDisconnect().cancel();
        }
        addAMessenger(_sender){
            let mess = this.chatInputEl.val();
            if(mess == "") return;
            let messObj = {
                userId : this.user.uid,
                content : mess,
                type : "text"
            }
            firebase.database().ref("rooms/"+this.room.id+"/messages").push(messObj).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.error('Error writing new message to Firebase Database', error);
            });
            
            this.chatInputEl.val("");
            // scroll to bottom
            //this.chatPlace[0].scrollTop = this.chatPlace[0].scrollHeight;
        }
        addAImageMessenger(file){
            console.log(file);
            let messObj = {
                userId : this.user.uid,
                imageUrl : this.LOADING_IMAGE_URL,
                type : "image"
            }
            firebase.database().ref("rooms/"+this.room.id+"/messages").push(messObj).then((data) => {
                console.log(this.user.uid + '/' + Date.now() + '/' + file.name);
                this.storage.ref(this.user.uid + '/' + Date.now() + '/' + file.name)
                    .put(file, {contentType: file.type}).then((snapshot) => {
                        var filePath = snapshot.metadata.fullPath;
                        console.log(filePath);
                        data.update({imageUrl: this.storage.ref(filePath).toString()});
                    }).catch((error) => {
                        console.error('There was an error uploading a file to Firebase Storage:', error);
                    });
            }).catch((error) => {
                console.error('Error writing new message to Firebase Database', error);
            });
            // scroll to bottom
            this.chatPlace[0].scrollTop = this.chatPlace[0].scrollHeight;
        }
        aMessengeImageView(_photo,_sender){

            var temp = '<li class="image-mess mess '+ _sender+'">'+
                            '<p><img src="'+ _photo +'" ></p>'+
                        '</li>';
            
            this.chatPlace.append(temp);
            return $(temp).find("img");            
        }
        aMessengeView(_mess,_sender){
            var temp = '<li class="mess '+ _sender+'">'+
                            '<p>'+ _mess +'</p>'+
                        '</li>';
            var objEl = $(temp);
            this.chatPlace.append(objEl);
            emojify.run(objEl[0]);
            // scroll to bottom
            this.chatPlace[0].scrollTop = this.chatPlace[0].scrollHeight;
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

