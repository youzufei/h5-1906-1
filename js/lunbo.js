function Lunbo(){
    this.Banner=document.querySelector(".banner");
    this.oUl=this.Banner.getElementsByTagName("ul")[0];
    this.aLi=this.oUl.getElementsByTagName("li");
    console.log(this.oUl);
    console.log(this.Banner);
    console.log(this.aLi);
    this.iw=this.aLi[0].offsetWidth;
    this.timer=null;
    this.count=0;
    this.Dir=this.Banner.querySelectorAll('.dir>a');
    console.log(this.Dir)
    this.cirCular=this.Banner.querySelectorAll(".circular>span");
    this.init();
    
}
Lunbo.prototype={
    init:function(){
        var li=this.aLi[0].cloneNode(true);
        // console.log(li)
        this.oUl.appendChild(li);
        this.oUl.style.width=this.aLi.length * this.iw+"px";
        console.log(this.oUl.style.width)
        // this.imgMove();
        this.autoPlay();
        this.bannerMove();
        this.bannerDir();
        this.cirCularevent();
    },
    cirCularevent:function(){
        
        for(var i=0;i<this.cirCular.length;i++){
            this.cirCular[i].index=i;
            this.cirCular[i].addEventListener("mouseover",this.cirCularCb.bind(this,this.cirCular[i]));
            // console.log(this.cirCular[i]);
           
        }
    },
    cirCularCb:function(that){
        for(var j=0;j<this.cirCular.length;j++){
            this.cirCular[j].className='';
        }
        that.className='active';
        // console.log(that.className);
        this.count=that.index;
        console.log(that.index);
        //console.log(this.count);
        this.imgMove();
    },
    bannerDir:function(){
        this.Dir[0].addEventListener("click",this.bannerDirLeftCb.bind(this));
        this.Dir[1].addEventListener("click",this.bannerDirRightCb.bind(this));
    },
    bannerDirLeftCb:function(){
        if(this.count==0){
            this.count=this.aLi.length-2;
            this.oUl.style.left=-this.iw * (this.aLi.length-1)+'px';

        }else{
            this.count--;
        }
        this.imgMove();
    },
    bannerDirRightCb:function(){
        if(this.count==this.aLi.length-1){
            this.count=1;
            this.oUl.style.left=0;

        }else{
            this.count++;
        }
        this.imgMove();
    },
    bannerMove:function(){
        this.Banner.addEventListener("mouseover",this.mouseoverCb.bind(this));
        this.Banner.addEventListener("mouseout",this.mouseoutCb.bind(this));
    },
    mouseoverCb:function(){
        clearInterval(this.timer);
    },
    mouseoutCb:function(){
        this.autoPlay();
    },
    autoPlay:function(){
        this.timer=setInterval(
            this.autoPlayCb.bind(this) ,3000);
            
    },
    autoPlayCb:function(){
        if(this.count>=this.aLi.length-1){
            this.count=1;
            this.oUl.style.left=0;
        }else{
            this.count++;
        }
        this.imgMove();
    },
    imgMove:function(){
            for(var i=0;i<this.cirCular.length;i++){
                this.cirCular[i].className='';
            }
            this.cirCular[this.count > this.aLi.length-2?0:this.count].className='active';
            //console.log(this.cirCular)
            move(this.oUl,{left:-this.iw*this.count});
    }
}
new Lunbo();


function Scroll(){
    this.scrollRight=document.querySelector(".scrollRight");
    this.oUl=this.scrollRight.querySelector(".scrollRight>ul");
    this.aLi=this.oUl.querySelectorAll(".scrollRight>ul>li");
    console.log(this.aLi);
    this.aA=this.oUl.querySelectorAll(".scrollRight>ul>li>a");
    this.cheap=document.querySelector(".cheap");
    this.shopping=document.querySelector(".shopping");
    
    this.init();
}

Scroll.prototype={
    init:function(){
        this.aLiclick();
        this.show();
    },
    show:function(){
        window.onscroll=this.onscrollCb.bind(this);
    },
    onscrollCb:function(){
        this.Top=document.documentElement.scrollTop;
        if(this.Top>=500){
            this.scrollRight.style.display="block";
        }else{
            this.scrollRight.style.display="none";
        }
    },
    aLiclick:function(){
        this.oUl.addEventListener("click",this.aLiclickCb.bind(this));
        this.aLi[10].onclick=function(){
            document.documentElement.scrollTop=0;   
        };
        this.aLi[2].onclick=function(){
            document.documentElement.scrollTop=1600;   
        };
        this.aLi[1].onclick=function(){
            document.documentElement.scrollTop=600;   
        }
    },
    aLiclickCb:function(e){
        var e=e||event;
        var target=e.target||e.srcElement;
        for(var i=0; i<this.aA.length;i++){
            this.aA[i].className="";
        }
        if(target.tagName=="A"){
            target.className="active";
        }
    },
    

}

new Scroll();
