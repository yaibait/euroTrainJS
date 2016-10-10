var userData = [
    {
    "name" : "Emmett Massey",
    "age"  : 30,
    "email": "Emmett.Massey@gmail.com"
    },
    {
    "name" : "Perry Wheeler",
    "age"  : 29,
    "email": "Perry.Wheeler@gmail.com"
    },
    {
    "name" : "Benjamin Phillips",
    "age"  : 18,
    "email": "Benjamin.Phillips@gmail.com"
    }     
]
function drawTable(id){
  var tbEl = document.getElementById(id);
  this.tableEl = document.createElement("table");
  this.tableEl.className = "table table-bordered";
  tbEl.appendChild(this.tableEl);
}
drawTable.prototype.addCol = function(data){
  var trTag = document.createElement('tr');
  var col = "";
  data.forEach(function(item){
     col += '<td>'+ item +'</td>';
  });
  trTag.innerHTML = col;
  this.tableEl.appendChild(trTag);
}

function randomData(){
    var nameArr = [
        "Allen","Bob","Carlton",
        "David","Ernie","Foster",
        "George","Howard","Ian",
        "Jeffery","Kenneth","Lawrence",
        "Michael","Nathen","Orson",
        "Peter","Quinten","Reginald",
        "Stephen","Thomas","Morris",
        "Victor","Walter","Xavier",
        "Charles","Anthony","Gordon",
        "Percy","Conrad","Quincey",
        "Armand","Jamal","Andrew",
        "Matthew","Mark","Gerald"
    ];

    var lastnameArr = [
            "Adams","Bowden","Conway",
            "Darden","Edwards","Flynn",
            "Gilliam","Holiday","Ingram",
            "Johnson","Kraemer","Hunter",
            "McDonald","Nichols","Pierce",
            "Sawyer","Saunders","Schmidt",
            "Schroeder","Smith","Douglas",
            "Ward","Watson","Williams",
            "Winters","Yeager","Ford",
            "Forman","Dixon","Clark",
            "Churchill","Brown","Blum",
            "Anderson","Black","Cavenaugh",
            "Hampton","Jenkins","Prichard"
        ];
    var domainArr = ["gmail.com","live.com","hotmail.com","yahoo.com","zing.com","vietcomic.net"];

     var firstname = nameArr[Math.floor(Math.random() * nameArr.length)];
     var lastname  = lastnameArr[Math.floor(Math.random() * lastnameArr.length)];
     var domain = domainArr[Math.floor(Math.random() * domainArr.length)];
     var name = firstname+" "+lastname;
     var email = firstname+"."+lastname+"@"+domain;
     var age = Math.floor(Math.random() * 100) + 10;
     return {
            "name" : name,
            "age"  : age,
            "email": email
            }
}

document.getElementById("addColBtn").addEventListener("click",function(){
    for(var i = 0; i < 3; i++){
        var ranUser = randomData();
        myTable.addCol([ranUser.name,ranUser.age,ranUser.email]);
    }
});


var myTable = new drawTable("wrap-table");
myTable.addCol(["Name","Age","Email"]);
userData.forEach(function(obj){
    myTable.addCol([obj.name,obj.age,obj.email]);
});