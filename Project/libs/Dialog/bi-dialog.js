function DialogPolyfill(){
    this.element = undefined;
}

DialogPolyfill.prototype.registerDialog = function(el){

    this.element = el;
    this.element.showModal = function(){

            this.style.display = "block";
            console.log(this.offsetWidth);
            this.style.marginLeft = - this.offsetWidth/2+"px";
            document.querySelector("body").className += "bodyDialog";
            this.isShow = true;
        };
     this.element.close = function(){
            this.style.display = "none"; 
            document.querySelector("body").className = document.querySelector("body").className.replace("bodyDialog","");
            this.isShow = false;
        };
    this.element.open = function(){
        return this.isShow;
    }
    el = this.element;
};


var dialogPolyfill = new DialogPolyfill();
