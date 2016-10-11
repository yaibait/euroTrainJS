function biCalendar(elId){
    var date = new Date();

    this.wrapEl = document.getElementById(elId);
    this.weekdaysTemplate = ["Mon","Tu","We","Th","Fr","Sa","Su"];
    this.monthTemplate = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    // header render
    var headerCalEl = document.createElement("div");
    headerCalEl.className = "month";
    var headerChild = '<ul>'+
                        '<li class="prev">&#10094;</li>' +
                        '<li class="next">&#10095;</li>' +
                            '<li>'+ this.monthTemplate[date.getMonth()] +'<br>'+
                            '<span style="font-size:18px">'+ date.getFullYear() +'</span>'+
                            '</li>'+
                        '</ul>';
    headerCalEl.innerHTML = headerChild;

    this.wrapEl.appendChild(headerCalEl);
    // week days render
    var weekDaysCalEl = document.createElement("ul");
    weekDaysCalEl.className = "weekdays";
    var temp = "";
    this.weekdaysTemplate.forEach(function(wd){
        temp += "<li>"+ wd +"</li>";
    });
    weekDaysCalEl.innerHTML = temp;
    this.wrapEl.appendChild(weekDaysCalEl);

    var currentDate = date.getDate();
    

    // days render 
    var startDayOfMonth = startMonthDay(date.getMonth(),date.getFullYear(),1);
    
    var daysInCurrentMonth = daysInMonth(date.getMonth(),date.getFullYear());
    console.log(daysInCurrentMonth);
    var daysCalEl = document.createElement("ul");
    daysCalEl.className = "days";
    var temp = "";
    for(var i= 1;i <= (daysInCurrentMonth + startDayOfMonth) ; i++){
        if(i >= startDayOfMonth){
            if(i == currentDate){
                temp += '<li><span class="active">'+ (i - startDayOfMonth + 1)  +'</span></li>';
            }else{
                temp += "<li>"+ (i - startDayOfMonth + 1) +"</li>";
            }
        }else{
            temp += "<li></li>";
        }
    }

    daysCalEl.innerHTML = temp;    
    this.wrapEl.appendChild(daysCalEl);

}
biCalendar.prototype.nextMonth = function(){
    
};
biCalendar.prototype.prevMonth = function(){

};
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
};

function startMonthDay(month,year,day){
    return new Date(year, month, day).getDay();
}

new biCalendar("wrap-calendar");
