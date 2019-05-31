function ShoppingCar() {
    this.goods = document.querySelector(".goods");

    this.init();
}
ShoppingCar.prototype = {
    init: function () {
        this.getdata();

    },
    getdata: function () {
        axios({
            method: "get",
            url: "./../json/car.json",

        }).then(this.getdataCb.bind(this));
    },
    getdataCb: function (data) {
        console.log(data);
        if (localStorage["goods"]) {
            this.obj = JSON.parse(localStorage["goods"]);
            var str = "";
            for (var i = 0; i < this.obj.length; i++) {
                for (var j = 0; j < data.car.length; j++) {
                    if (this.obj[i].id == data.car[j].id) {
                        var nps = Number(data.car[j].price);
                        var xmoney = Number(this.obj[i].num * Number(data.car[j].price));
                        str += `
                    <li>
                        <span class="check-box" aria-checked="false">√</span>
                        <img class="car-icon" src="${data.car[j].img}">
                        <p class="car-title">${data.car[j].tit}</p>
                        <span class="color">${data.car[j].nav}</span>
                        <span class="price">${nps}</span>
                        <div class="number">
                            <span class="car-reduce">-</span>
                            <input class="amount" type="text" value="${this.obj[i].num}">
                            <span class="car-add">+</span>
                        </div>
                        <span class="total">${xmoney}</span>
                        <span class="car-del" data-id="${this.obj[i].id}">删除</span>
                    </li>
                        `
                    }
                }
            }
            this.goods.innerHTML = str;
        }
        this.clickEvent();
    },
    clickEvent: function () {
        this.check = document.getElementsByClassName("check");
        this.checkBox = document.getElementsByClassName("check-box");
        this.carReduce = document.getElementsByClassName("car-reduce");
        this.carAdd = document.getElementsByClassName("car-add");
        this.value = document.getElementsByClassName("amount");
        this.carDel = document.getElementsByClassName("car-del");
        this.carLast = document.querySelector(".car-last");
        this.allDel = document.querySelector(".all-del");
        this.shoppingAmount = document.querySelector(".shopping-amount");
        this.shoppingPrice = document.querySelector(".shopping-price");
        for (var i = 0; i < this.check.length; i++) {
            this.check[i].addEventListener("click", this.checkCb.bind(this, this.check[i]));
        }
        for (var i = 0; i < this.checkBox.length; i++) {
            this.checkBox[i].addEventListener("click", this.checkBoxCb.bind(this, this.checkBox[i]));
        }
        for (var i = 0; i < this.carAdd.length; i++) {
            this.carAdd[i].addEventListener("click", this.carAddCb.bind(this, this.carAdd[i]));
        }
        for (var i = 0; i < this.carReduce.length; i++) {
            this.carReduce[i].addEventListener("click", this.carReduceCb.bind(this, this.carReduce[i]));
        }
        for (var i = 0; i < this.carDel.length; i++) {
            this.carDel[i].addEventListener("click", this.carDelCb.bind(this, this.carDel[i]));
        }
    },
    checkCb: function (that) {
        if (that.getAttribute('aria-checked') == "false") {
            for (var i = 0; i < this.check.length; i++) {
                this.check[i].setAttribute("aria-checked", "true");
                this.check[i].style.color = "red";
                this.carLast.style.background = "red";
            }
            for (var i = 0; i < this.checkBox.length; i++) {
                this.checkBox[i].setAttribute("aria-checked", "true");
                this.checkBox[i].style.color = "red";
            }
        } else if (that.getAttribute('aria-checked') == "true") {
            for (var i = 0; i < this.check.length; i++) {
                this.check[i].setAttribute("aria-checked", "false");
                this.check[i].style.color = "#fff";
                this.carLast.style.background = "#ccc";
            }
            for (var i = 0; i < this.checkBox.length; i++) {
                this.checkBox[i].setAttribute("aria-checked", "false");
                this.checkBox[i].style.color = "#fff";
            }
        }
        this.zongjia();
    },
    checkBoxCb: function (that) {
        if (that.getAttribute('aria-checked') == "false") {
            that.setAttribute("aria-checked", "true");
            that.style.color = "red";
            this.carLast.style.color = "#fff";
            this.carLast.style.background = "red";
        } else if (that.getAttribute('aria-checked') == "true") {
            that.setAttribute("aria-checked", "false");
            that.style.color = "#fff";
            // this.carLast.style.color="#fff";
            // this.carLast.style.background="#ccc";
        }
        for (var i = 0; i < this.checkBox.length; i++) {
            var n = true;
            if (this.checkBox[i].getAttribute('aria-checked') == "false") {
                n = false;
                break;
            }
        }
        if (n) {
            for (var i = 0; i < this.check.length; i++) {
                this.check[i].setAttribute("aria-checked", "true");
                this.check[i].style.color = "red";
            }
        } else {
            for (var i = 0; i < this.check.length; i++) {
                this.check[i].setAttribute("aria-checked", "false");
                this.check[i].style.color = "#fff";
            }
        }
        this.zongjia();
    },
    carAddCb: function (that) {
        var count = that.previousElementSibling.value
        // Number(that.previousElementSibling.value);
        // console.log(count);
        count++;
        that.previousElementSibling.value = count;
        // console.log(count);
        var xiaoji = Number(that.parentNode.previousElementSibling.innerText) * count;
        that.parentNode.nextElementSibling.innerText = xiaoji;
        this.zongjia();

    },
    carReduceCb: function (that) {
        var count = that.nextElementSibling.value;
        count--;
        if (count < 2) {
            count = 1;
        }

        that.nextElementSibling.value = count;
        var xiaoji = Number(that.parentNode.previousElementSibling.innerText) * count;
        that.parentNode.nextElementSibling.innerText = xiaoji;
        this.zongjia();
    },
    carDelCb: function (that) {
        that.parentNode.remove();
        var ID = that.getAttribute("data-id");
        for (var i = 0; i < this.obj.length; i++) {
            if (this.obj[i].id == ID) {
                this.obj.splice(i, 1);
            }
        }
        localStorage.goods = JSON.stringify(this.obj);
        this.zongjia();
    },
    zongjia: function () {
        // var allshop=this.checkBox.length;
        var T1 = 0;
        var money = 0;
        for (var i = 0; i < this.checkBox.length; i++) {
            if (this.checkBox[i].getAttribute('aria-checked') == "true") {
                T1 += Number(this.checkBox[i].parentNode.children[5].children[1].value);
                money += Number(this.checkBox[i].parentNode.children[4].innerText) * Number(this.checkBox[i].parentNode.children[5].children[1].value);
                console.log(T1);
                console.log(money);
            }
        }
        this.shoppingAmount.innerText = T1;
        this.shoppingPrice.innerText = money.toFixed(2);
    }
}

new ShoppingCar();