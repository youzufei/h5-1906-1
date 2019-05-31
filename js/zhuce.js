function Zhuce(){
    this.username=document.querySelector(".users");
    this.password=document.querySelector(".passes");
    this.zhuce=document.querySelector(".zhucees");
    this.odenglu = document.querySelector(".dengslu");
    console.log(this.odenglu)
    this.okuaijiezhuce = document.querySelector(".kuaijiezhuce");
    this.oresiger = document.querySelector(".resiger");
    this.ozhuce = document.querySelector(".zhuce");
    this.init();

}
Zhuce.prototype={
    init:function(){
        this.qiehuanclick();
        this.zhuceClick();

    },
    qiehuanclick:function(){
        this.odenglu.addEventListener("click", this.odengluclickCB.bind(this));
        this.okuaijiezhuce.addEventListener("click", this.ozhuceCb.bind(this));
    },
    odengluclickCB:function(){
        this.oresiger.style.display="block";
        this.ozhuce.style.display="none";
        
    },
    ozhuceCb:function(){
        this.oresiger.style.display="none";
        this.ozhuce.style.display="block";
    },
    zhuceClick:function(){
        this.zhuce.addEventListener("click",this.zhuceClickCb.bind(this));
    },
    zhuceClickCb:function(e){
        e.preventDefault();
        axios({
            method:"post",
            url:"http://localhost/wykaola1/php/zhuce.php",
            data:{
                username:this.username.value,
                password:this.password.value
            }
        }).then(this.zhucesucessCb.bind(this))
    },
    zhucesucessCb:function(data){
        if(data.status){
            alert("成功注册");
            location.href="denglu.html";
            
        }
    }

}


new Zhuce();