function biCalendar(elId){
    this.wrapIdEl = elId;
    var date = new Date();
    this.pickedDate = date;
    this.startTargetDate = date;
    this.wrapEl = document.getElementById(elId);
    this.weekdaysTemplate = ["Mon","Tu","We","Th","Fr","Sa","Su"];
    this.monthTemplate = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    // header render
    var headerCalEl = document.createElement("div");
    headerCalEl.className = "month";
    var headerChild = '<ul>'+
                        '<li class="prev">&#10094;</li>' +
                        '<li class="next">&#10095;</li>' +
                            '<li class="headerText"><p class="currentMonthTxt">'+ this.monthTemplate[date.getMonth()] +'</p>'+
                            '<p class="currentYearTxt">'+ date.getFullYear() +'</p>'+
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

    this.currentMonthTxt = document.querySelector("#"+elId +" .currentMonthTxt");
    this.currentYearTxt  = document.querySelector("#"+elId +" .currentYearTxt");
    // console.log(this.currentMonthTxt,this.currentYearTxt);
    this.currentMonthTxt.innerHTML = this.monthTemplate[date.getMonth()];
    this.currentYearTxt.innerHTML = date.getFullYear();

    this.renderDay(date);
    var prevBtn = document.querySelector("#"+elId +" .prev");
    prevBtn.addEventListener("click",function(){
        this.prevMonth();
    }.bind(this));

    var nextBtn = document.querySelector("#"+elId +" .next");
    nextBtn.addEventListener("click",function(){
        this.nextMonth();
    }.bind(this));

}
biCalendar.prototype.nextMonth = function(){
    this.startTargetDate = new Date(this.startTargetDate.getFullYear(),this.startTargetDate.getMonth() + 1, 1);
    this.renderDay(this.startTargetDate);
};
biCalendar.prototype.prevMonth = function(){
    this.startTargetDate = new Date(this.startTargetDate.getFullYear(),this.startTargetDate.getMonth() - 1, 1);
    this.renderDay(this.startTargetDate);
};
biCalendar.prototype.renderDay = function(date){
    var that = this;
   // days render 
   this.currentMonthTxt.innerHTML = this.monthTemplate[date.getMonth()];
    this.currentYearTxt.innerHTML = date.getFullYear();
   if(this.daysCalEl != undefined)
        this.daysCalEl.parentNode.removeChild(this.daysCalEl);
    var currentDate = new Date().getDate();
    var startDayOfMonth = startMonthDay(date.getMonth(),date.getFullYear(),1);
    
    var daysInCurrentMonth = daysInMonth(date.getMonth(),date.getFullYear());
    console.log(daysInCurrentMonth,startDayOfMonth);
    // console.log(daysInCurrentMonth);
    this.daysCalEl = document.createElement("ul");
    this.daysCalEl.className = "days";
    var temp = "";
    var now = new Date();
    let tempDay = 0;
    for(var i= 1;i <= (daysInCurrentMonth + startDayOfMonth - 1) ; i++){
        if(i > startDayOfMonth - 1 ){
            tempDay++;
            if((i - startDayOfMonth) == currentDate && date.getMonth() == now.getMonth()){
                temp += '<li><span class="current">'+ tempDay  +'</span></li>';
            }else{
                temp += '<li><span>'+ tempDay +'</span></li>';
            }
        }else{
            temp += "<li></li>";
        }
    }

    this.daysCalEl.innerHTML = temp;    
    this.wrapEl.appendChild(this.daysCalEl);

    // set click event for day
    var listDayEl = document.querySelectorAll("#"+this.wrapIdEl + " .days li span");
    listDayEl.forEach(function(liEl){
        liEl.addEventListener("click",function(){
            var temp = document.querySelector("#"+that.wrapIdEl + " .days li span.active");
            
            if(temp){
                if(temp.className.indexOf("current") != -1){
                    temp.className = "current";
                }else{
                    temp.className = "";
                }
                
            }

            this.className += " active";
            that.pickedDate = new Date(that.startTargetDate.getFullYear(),that.startTargetDate.getMonth(),this.innerHTML);
            if(typeof that.pickEventCall === "function"){
                that.pickEventCall();
            }
        });
    });

}

biCalendar.prototype.getDatePicked = function(){
    return this.pickedDate;
};

biCalendar.prototype.pickEvent = function(call){
    this.pickEventCall  = call;
};

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
};

function startMonthDay(month,year,day){
    return new Date(year, month, day).getDay();
}

var testCal = new biCalendar("wrap-calendar");
testCal.pickEvent(function(){
    console.log(this.getDatePicked());
});