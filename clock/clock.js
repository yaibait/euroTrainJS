var d,h,m,s,clock;
var clockPlaceEl = document.getElementById("clock");
function countTime(){
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    if(h <= 9) h = "0" + h;
    if(m <= 9) m = "0" + m;
    if(s <= 9) s = "0" + s;
    clock = h +" : "+ m +" : "+ s;
    clockPlaceEl.innerHTML = clock;
};

setInterval(countTime,1000);