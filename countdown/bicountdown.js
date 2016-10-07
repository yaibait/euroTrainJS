/*
 * Function biCountDown
 *
 * init count down
 *
 * @param id(string) render time
 * @param time(float) time count second
 */
function biCountDown(id,time,callback){
  this.id = id;
  this.time = time;
  this.remainTime = time;
  this.wrapCountDownEl = document.getElementById(id);
  var that = this;

  this.timeinterval = setInterval(function(){
    that.remainTime--;
    var seconds = Math.floor( (that.remainTime) % 60 );
    var minutes = Math.floor( (that.remainTime/60) % 60 );
    var hours = Math.floor( (that.remainTime/(60*60)) % 24 );
    var days = Math.floor( that.remainTime/(60*60*24) );
    that.wrapCountDownEl.innerHTML = '<div>' +
                                     '<div class="days"><p>' + days + '</p><p>Ngày</p></div>' +
                                     '<div class="hours"><p>' + hours + '</p><p>Giờ</p></div>' +
                                     '<div class="minutes"><p>' + minutes + '</p><p>Phút</p></div>' +
                                     '<div class="seconds"><p>' + seconds + '</p><p>Giây</p></div>' +
                                     '</div>';  
    if(that.remainTime <=0){
      clearInterval(that.timeinterval);
      if(typeof callback == "function"){
        callback();
      }
    }
  },1000);
}

biCountDown.prototype.destroy = function(){
    clearInterval(this.timeinterval);
}


