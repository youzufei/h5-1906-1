function mainContent(){
    this.init();
}
mainContent.prototype={
    init:function(){
        this.getdata();
    },
    getdata:function(){
        axios({
            method:"get",
            url:"json/content.json"
            }).then(this.getdatasucessCb.bind(this))
    },
    getdatasucessCb:function(data){
        // console.log(data);
        this.aUl=document.getElementsByClassName("main-content");
        var str="";
        for(var i=0; i<data.content.length ;i++){
            str=`<li>
            <div class="resiger" data-id="${data.content[i].id}">
                <img src="${data.content[i].img}">
                <p class="title"><a href="##">${data.content[i].title}</a></p>
                <span>${data.content[i].nav}</span>
                <p>新人价 ￥<span class="price">${data.content[i].price}</span><span>立即购买</span></p>
                
            </div>
        </li> `
            this.aUl[0].innerHTML+=str;
        }
            this.resiger=document.getElementsByClassName("resiger");
            this.mainContent=document.getElementsByClassName("main-content");
            console.log(this.resiger);
            for(var i=0;i<this.resiger.length;i++){
                this.resiger[i].addEventListener("click",this.resigerCb)
            }
            // this.mainContent[0].addEventListener("click",this.resigerCb)
    },
    resigerCb:function(){
        // console.log(e)
        // var e=e||event;
        // var target=e.target||e.srcElement;
        // if(target.tagName == "IMG"){
        //     var id=target.parentNode.getAttribute("data-id");
        //     location.href="html/resiger.html?id="+id;
        // }
        var id=this.getAttribute("data-id");
        location.href="html/xiangqing.html?id="+id;

    }
}
new mainContent();