function Denglu() {
    this.aSpan = document.querySelectorAll(".btn>a>span");
    console.log(this.aSpan);
    this.aA = document.querySelectorAll(".btn>a")
    this.oblock = document.querySelector(".block");
    console.log(this.oblock);
    this.oqiehuan = document.querySelector(".qiehuan");
    // this.odenglu = document.querySelector(".dengslu");
    // console.log(this.odenglu)
    // this.okuaijiezhuce = document.querySelector(".kuaijiezhuce");
    // this.oresiger = document.querySelector(".resiger");
    // this.ozhuce = document.querySelector(".zhuce");
    this.username=document.querySelector(".emailname");
    this.password=document.querySelectorAll(".emailword");
    this.Denglu=document.querySelector(".denglu")
    console.log("this.Denglu")

    this.init();

}
Denglu.prototype = {
    init: function () {
        this.aSpanclick();
        this.dengluClick();
    },
    aSpanclick: function () {
        this.aSpan[0].addEventListener("click", this.aSpanclickCb.bind(this));
        this.aSpan[1].addEventListener("click", this.aSpanclickCB.bind(this));
        // window.onload=function(){
            
        // }
        // this.odenglu.addEventListener("click", this.odengluclickCB.bind(this));
        // this.okuaijiezhuce.addEventListener("click", this.ozhuceCb.bind(this));


    },
    aSpanclickCb: function () {
        this.oblock.style = "display:none";
        this.oqiehuan.style = "display:block";
        this.aA[0].style.color = "#e31436";
        this.aA[1].style.color = "#000";
    },
    aSpanclickCB: function () {
        this.oblock.style = "display:block";
        this.oqiehuan.style = "display:none";
        this.aA[1].style.color = "#e31436";
        this.aA[0].style.color = "#000";
    },
    // odengluclickCB:function(){
    //     this.oresiger.style.display="block";
    //     this.ozhuce.style.display="none";
        
    // },
    // ozhuceCb:function(){
    //     this.oresiger.style.display="none";
    //     this.ozhuce.style.display="block";
    // },
    dengluClick:function(){
        this.Denglu.addEventListener("click",this.dengluClickCb.bind(this));
    },
    dengluClickCb:function(e){
        e.preventDefault();
        axios({
            method:"post",
            url:"http://localhost/wykaola1/php/denglu.php",
            data:{
                username:this.username.value,
                password:this.password.value

            }
        }).then(this.denglusucessCb.bind(this));
    },
    denglusucessCb:function(data){
        if(data.status){
            alert("登陆成功")
            location.href="../list.html"
        }
    }

}
new Denglu();