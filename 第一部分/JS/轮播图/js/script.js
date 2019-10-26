
//声明全局变量
var timer=null,//放定时器呢
    index=0,
    main=byId("main"),
    prev=byId("prev"),//上一张
    next=byId("next"),//下一张
    pics=byId("banner").getElementsByTagName("div"),
    dots=byId("dots").getElementsByTagName("span"),
    banner=byId("banner"),
    menuContent=byId("menu-content"),
    menuItems=byId(menuContent.getElementsByClassName("menu-item")),
    sumMenu=byId("sub-menu"),
    innerBox=sumMenu.getElementsByClassName("inner-box"),
    size=pics.length;
//当前显示图片的索引，默认值为0；

//封装getElementById()
function byId(id){
    return typeof (id)=="string"?document.getElementById(id):id;
}
/*封装通用时间绑定方法
element绑定实践的DOM元素
事件名
事件处理程序
 */
function addHandler(element,type,handler) {
    //针对非IE浏览器
    if(element.addEventListener){
        element.addEventListener(type,handler,true);
        //IE浏览器支持DOM2级
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
        //IE浏览器不支持DOM2级
    }else{
        element["on"+type]=handler;
    }
}
//清除定时器，停止自动播放
function stopAutoPlay() {
    if(timer){
        clearInterval(timer);
    }
}
//图片自动播放
function startAutoPlay(){
    timer=setInterval(function () {
        index++;
        if(index>=size){
            index=0;
        }
        changeImg();
    },3000)
}
//切换图片
function changeImg(){
    //遍历所有图片，将图片隐藏，将圆点上的类清除
    for(var i=0,len=dots.length;i<len;i++){
        pics[i].style.display="none";//下一张符号
        dots[i].className="none";//圆点
    }
    //显示当前图片
    pics[index].style.display="block";
    //当前圆点高亮显示
    dots[index].className="active";
}
//点击圆点索引切换图片
for(var i=0,len=dots.length;i<len;i++){
    dots[i].id = i;
    addHandler(dots[i],"click",function(){
        index = this.id;
        changeImg();
    })
}
// 鼠标滑过主菜单
for(var m=0,mlen=menuItems.length;m<len;m++){
    //给所有主菜单定义属性,标明它的索引
    menuItems[m].setAttribute("data-index",m);
    addHandler(menuItems[m],"mouseover",function(){
        //显示主菜单所在的背景
        sumMenu.className="sub-menu";
        //获取当前主菜单的索引
       var  idx=this.getAttribute("data-index");
        for (var j=0,jlen=innerBox.length;j<jlen;j++){
            //隐藏所有的子菜单
            innerBox[j].style.display="none";
            //所有的主菜单取消背景
            menuItems[j].style.background="none";
        }
        //找到当前子菜单，将其显示出来
        innerBox[idx].style.display="block";
        menuItems[idx].style.background="rgba(0,0,0.1)";
    })
}
//点击下一张
addHandler(next,"click",function (){
   index++;
   if(index>=size)index=0;
  changeImg();
})
//点击上一张
addHandler(prev,"click",function (){
    index--;
    if(index<0)index=size-1;
    changeImg();
})
//鼠标滑入子菜单时，子菜单显示
addHandler(sumMenu,"mouseover",function () {
    this.className="sub-menu";
})
//鼠标离开子菜单时，子菜单隐藏
addHandler(sumMenu,"mouseout",function () {
    this.className="sub-menu hide";
})
//鼠标离开banner，隐藏子菜单
addHandler(banner,"mouseout",function(){
    sumMenu.className = "sub-menu hide";
});
addHandler(menuContent,"mouseout",function(){
    sumMenu.className = "sub-menu hide";
});

//鼠标滑入main，停止轮播
addHandler(main,"mouseover",stopAutoPlay);
//鼠标离开main，继续轮播
addHandler(main,"mouseout",startAutoPlay);
//自动开启轮播
startAutoPlay();


