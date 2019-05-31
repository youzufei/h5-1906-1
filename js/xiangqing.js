
function Xiangqing(){
    this.oAll=document.querySelector(".all");
    this.oList=document.querySelector(".list");
   
    this.oMaxpic=document.querySelector(".maxpic");
    this.oMaxpic1=document.querySelector(".maxpic1");
    this.aSmallpic=document.querySelectorAll(".smallpic img");
    // console.log( this.aSmallpic[0]);
    this.oMengban=document.querySelector(".mengban");
    this.oBigbig=document.querySelector(".Bigbig");
    this.oBigpic=document.querySelector(".bigpic");



    this.init();
}
Xiangqing.prototype={
    init:function(){
        this.mouseMove();
        // this.addClick();
        // this.reduceClick();
        this.picmoveover();
        this.mengban();
        this.tuozhuai();
    },
    mouseMove:function(){
        this.oAll.addEventListener("mouseover",this.mouseMoveCb.bind(this));
        this.oList.addEventListener("mouseleave",this.mouseleaveCb.bind(this));
        

    },
    mouseMoveCb:function(){
        
        this.oList.style.display="block";
    },
    mouseleaveCb:function(){
        this.oList.style.display="none";
    },
   
    picmoveover:function(){
        console.log(this.aSmallpic[0])
        for(var i=0;i<this.aSmallpic.length;i++){
            this.aSmallpic[i].addEventListener("mouseover",this.picmoveoverCb.bind(this,this.aSmallpic[i]));
        }
    },
    picmoveoverCb:function(that){
        var src=that.getAttribute("data-src");//获取data-src属性的值;
        console.log(that);
        this.oMaxpic.src=src;
        this.oMaxpic1.src=src;
    },
    mengban:function(){
        this.oBigpic.addEventListener("mouseover",this.mengbanoverCb.bind(this));
        // this.oBigpic.addEventListener("mouseover",this.maximgCb.bind(this));
        this.oBigpic.addEventListener("mouseout",this.mengbanoutCb.bind(this));
        // this.oBigpic.addEventListener("mouseout",this.maximgoutCb.bind(this));
    },
    mengbanoverCb:function(){
        this.oMengban.style.display="block";
        this.oBigbig.style.display="block";
    },
    
    tuozhuai:function(){
        this.oBigpic.addEventListener("mousemove",this.tuozhuaiCb.bind(this));
    },
    tuozhuaiCb:function(e){
        var x = e.clientX-offset(this.oBigpic).l - this.oMengban.offsetWidth/2;
        var y = e.clientY-offset(this.oBigpic).t - this.oMengban.offsetHeight/2;
        if(x>=this.oMaxpic.offsetWidth-this.oMengban.offsetWidth){
            x=this.oMaxpic.offsetWidth-this.oMengban.offsetWidth;
        };
        if(y>=this.oMaxpic.offsetHeight-this.oMengban.offsetHeight){
            y=this.oMaxpic.offsetHeight-this.oMengban.offsetHeight;
        };
        if(x<=0){
            x=0;
        }
        if(y<=0){
            y=0;
        }

        this.oMengban.style.left=x+"px";
        this.oMengban.style.top=y+"px";
        this.oMaxpic1.style.left=-x*2+"px";
        this.oMaxpic1.style.top=-y*2+"px";
        // console.log(offset(this.oBigpic).l);
        // console.log(offset(this.oBigpic).t);

    },
    mengbanoutCb:function(){
        this.oMengban.style.display="none";
        this.oBigbig.style.display="none";
    }
}






