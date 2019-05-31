function Xuanran() {
    this.oXuanlan = document.querySelector(".xuanlan");
    this.title = document.querySelector(".title");
    this.maxpic = document.querySelector(".maxpic");
    this.maxpic1 = document.querySelector(".maxpic1");
    this.bigbig = document.querySelector(".Bigbig");
    this.country = document.querySelector(".country");
    this.Title = document.querySelector(".Title");
    this.Tit = document.querySelector(".Tit");
    this.price = document.querySelector(".price");
    this.smallpic = document.querySelector(".smallpic");
    // console.log(this.smallpic);
   
    this.last1 = document.querySelector(".last1");
    this.aaa = document.querySelector(".aaa");
    this.bbb = document.querySelector(".bbb");
    this.ccc = document.querySelector(".ccc");
    this.oReduce = document.querySelector(".reduce");
    this.oInput = document.querySelector(".inputValue");
    this.oAdd = document.querySelector(".add");
    this.init();

}
Xuanran.prototype = {
    init: function () {
        this.getdata();
        this.buyclick();
        this.addClick();
        this.reduceClick();
    },
    getdata: function () {
        axios({
            method: "get",
            url: "../json/xiangqing.json"
        }).then(this.getsucessCb.bind(this));
    },
    getsucessCb: function (data) {

        // console.log(data);

        var local = location.href;
        var arr = local.split("?");
        var newarr = arr[1].split("=");
        this.id = newarr[1];
        // console.log(id);

        for (var i = 0; i < data.detail.length; i++) {
            if (this.id == data.detail[i].id) {
                var zifu = "";
                for (var j = 0; j < data.detail[i].label1.length; j++) {
                    data.detail[i].label1[j];

                    zifu += `
                <a href="##">${data.detail[i].label1[j]}</a>
                `
                };
                // console.log(zifu);
                var zifu1 = "";
                for (var j = 0; j < data.detail[i].label2.length; j++) {
                    data.detail[i].label2[j];

                    zifu1 += `
                <a href="##">${data.detail[i].label2[j]}</a>
                `
                };
                var zifu2 = "";
                for (var j = 0; j < data.detail[i].label3.length; j++) {
                    data.detail[i].label3[j];

                    zifu2 += `
                <a href="##">${data.detail[i].label3[j]}</a>
                `
                };
                var Img = "";
                for (var j = 0; j < data.detail[i].img1.length; j++) {

                    Img += `
                <span>
                <img src="${data.detail[i].img1[j]}" data-src="${data.detail[i].img[j]}">
                </span>
                `
                };
                // console.log(Img)
                this.aaa.innerHTML = `
                        <div>
                        <a class="x1 xxx" href="##">
                            ${data.detail[i].first[0]}
                            <span></span>
                        </a>
                        <div class="you you1">
                            ${zifu}
                        </div>
                        </div>
                        `;

                this.bbb.innerHTML =
                    `<a class="xxx x2" href="##">
                            ${data.detail[i].first[1]}
                            <span></span>
                        </a>
                        <div class="you you2">
                            ${zifu1}
                        </div>`;
                this.ccc.innerHTML =
                    `<a class="xxx x3" href="##">
                            ${data.detail[i].first[2]}
                            <span></span>
                        </a>
                        <div class="you you3">
                            ${zifu2}
                        </div>`;

                this.last1.innerHTML =
                    `<span>${data.detail[i].last}</span>`;
                this.maxpic.src = data.detail[i].img[0]
                //      console.log(data.detail[i].img[0]);
                // console.log( this.maxpic.innerHTML )
                this.smallpic.innerHTML = `
                        
                    <div class="smallpic">
                        <a href="##">&lt;</a>
                        ${Img}

                        <a href="##">&gt;</a>
                    </div>
                    
                    `;

                this.maxpic1.src = data.detail[i].img[0];

                this.country.innerHTML = `
                    <span>${data.detail[i].country} | </span>
                    
                    `
                this.Title.innerHTML = `
                    <p>${data.detail[i].title}</p>
                    
                    `
                this.Tit.innerHTML = `
                    p>${data.detail[i].tit}</p>
                    
                    `
                this.price.innerHTML = `
                    <span>${data.detail[i].price}</span>
                    
                    `
            }
        }
        new Xiangqing();


    },
    addClick: function () {
        this.oAdd.addEventListener("click", this.oAddclickCb.bind(this));
    },
    oAddclickCb: function () {
        this.oInput.value++;
    },
    reduceClick: function () {
        this.oReduce.addEventListener("click", this.reduceClickCb.bind(this));
    },
    reduceClickCb: function () {
        if (this.oInput.value <= 1) {
            this.oInput.value = 1;
        } else {
            this.oInput.value--;
        }
    },
    buyclick: function () {
        this.buy = document.querySelector(".buy");
        this.buy.addEventListener("click", this.buyclickCb.bind(this));
    },
    buyclickCb: function () {
        if (!localStorage["goods"]) {
            localStorage["goods"] = JSON.stringify([{
                id: this.id,
                num: this.oInput.value
            }])
        } else {
            var obj = JSON.parse(localStorage["goods"]);
            var Bstop = true;
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].id == this.id) {
                    Bstop = false;
                    alert("该商品已加入购物车");
                    break;
                }
            }
            if (Bstop) {
                obj.push({
                    id: this.id,
                    num: this.oInput.value
                });
                localStorage["goods"] = JSON.stringify(obj);
            }
        }
    }

}
new Xuanran();
