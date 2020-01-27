// 展开联系方式图：
$(".footer .contact .me .mine .check").mouseover(function(){
    $(".footer .contact .me .hide").show();
}).mouseout(function(){
    $(".footer .contact .me .hide").hide();
})
//留言板
$(".open").click(function(){
    $(".totle").animate({width:"toggle"},1000);
});
if(localStorage.getItem("count") == null)
{
    cleardata();
}
// 存储在浏览器中，查看位置谷歌浏览器，shift + ctrl + i,打开检查窗口，application->Local Storage
// 读取数据
reading();
function reading(){
    // 读取浏览器中的留言合集
    var arr = localStorage.getItem("data");
    // 根据“#”分隔符分成数组
    temp = arr.split("#");
    // 读取浏览器存储的留言总条数
    var count = localStorage.getItem("count");
    // 循环形成li然后插入ul中
    for(i = 1;i <= count;i++)
    {
        var tem = $("<li></li>").text(temp[i]);
        $(".remain .remained").prepend(tem);
    }
}


// 清除数据
function cleardata(){
    // 清除浏览器中存储的所有内容
    localStorage.clear();
    // 初始化
    // 留言数变为0
    var count = 0;
    // 存入浏览器
    localStorage.setItem("count",count);
    // 对内容初始化“#”作为字符串分隔符
    localStorage.setItem("data",1+"#");
    // 清空已经输入在留言框中的内容
    $(".remain ul").empty();
}


// 存储数据
function appendText() {
    // 创建带有输入内容的li
    var text1 = $("<li></li>").text($(".words").val());
    // 将内容添加到留言框中
    $(".remain ul").prepend(text1);
    // 读取浏览器中记录的留言条数
    var count = localStorage.getItem("count")
    // 将字符串转换成整形
    count = parseInt(count);
    // 条数加一
    count += 1;
    // 获取留言总字符串，在其后面加入输入的内容
    var temp = localStorage.getItem("data") + $(".words").val();
    // alert(temp)
    // 保存留言条数和留言内容
    localStorage.setItem("count",count);
    localStorage.setItem("data",temp+"#");
    // 清空输入框
    $(".words").val("");
}


var time = 0;
timeplay = null;
$(".change-a .point-a ul li , .change-b .point-b ul li ,.change-c .point-c ul li,.change-d .point-d ul li").mouseover(function(){
clearInterval(timeplay);//当鼠标放在控制点上时停止定时器的功能
index = $(this).index();//获得当前控制点的索引号
// alert($(this).index());
$(this).addClass("active").siblings().removeClass("active");//给当前的点更换颜色
//选择当前索引号对应的图片并展示
$(".change-a .change-photo-a a").eq(index).show().siblings(".change-a .change-photo-a a").hide();
$(".change-b .change-photo-b a").eq(index).show().siblings(".change-b .change-photo-b a").hide();
$(".change-c .change-photo-c a").eq(index).show().siblings(".change-c .change-photo-c a").hide();
$(".change-d .change-photo-d a").eq(index).show().siblings(".change-d .change-photo-d a").hide();
}).mouseout(function(){
    // 让时间等于当前的索引号再重新进入计时器，防止图片倒退
time = index;
auto();
});
auto();
function auto(){
//设置时钟 
timeplay =setInterval(function(){
    //进入计时器时时间加一，方便进入下一个图片和控制点
    time++;
    //如果当前是第三张图片（索引号2），当再次进入计时器时就会索引号变为3，但是没有这张图片就进入else
    if(time < 3)
    {
        $(".change-a .point-a ul li").eq(time).addClass("active").siblings().removeClass("active");
        $(".change-b .point-b ul li").eq(time).addClass("active").siblings().removeClass("active");
        $(".change-c .point-c ul li").eq(time).addClass("active").siblings().removeClass("active");
        $(".change-d .point-d ul li").eq(time).addClass("active").siblings().removeClass("active");
        // $(".change-a .change-a-photo a").eq(time).show().siblings(".change-a .change-a-photo a").hide();
        $(".change-a .change-photo-a a").eq(time).fadeIn(1000).addClass("top").siblings().fadeOut(1000).removeClass("top")
        $(".change-b .change-photo-b a").eq(time).fadeIn(1000).addClass("top").siblings().fadeOut(1000).removeClass("top")
        $(".change-c .change-photo-c a").eq(time).fadeIn(1000).addClass("top").siblings().fadeOut(1000).removeClass("top")
        $(".change-d .change-photo-d a").eq(time).fadeIn(1000).addClass("top").siblings().fadeOut(1000).removeClass("top")
        // 选择图片，通过索引号确定图片，淡入，置顶（此处用了Z-index，将z-index转移給下一个，防止图片转移了还不能显示），除了当前选中的其他兄弟元素，淡出，移除置顶
    }
    else
    {
        // 将时间值归位为0，并展示第一张图片
        time = 0;
        $(".change-a .point-a ul li").eq(time).addClass("active").siblings().removeClass("active");
        $(".change-b .point-b ul li").eq(time).addClass("active").siblings().removeClass("active");
        $(".change-c .point-c ul li").eq(time).addClass("active").siblings().removeClass("active");
        $(".change-d .point-d ul li").eq(time).addClass("active").siblings().removeClass("active");
        // $(".change-a .change-a-photo a").eq(time).show().siblings(".change-a .change-a-photo a").hide();
        $(".change-a .change-photo-a a").eq(time).fadeIn(1000).addClass("top").siblings().fadeOut(1000).removeClass("top")
        $(".change-b .change-photo-b a").eq(time).fadeIn(1000).addClass("top").siblings().fadeOut(1000).removeClass("top")
        $(".change-c .change-photo-c a").eq(time).fadeIn(1000).addClass("top").siblings().fadeOut(1000).removeClass("top")
        $(".change-d .change-photo-d a").eq(time).fadeIn(1000).addClass("top").siblings().fadeOut(1000).removeClass("top")
        // 选择图片，通过索引号确定图片，淡入，置顶（此处用了Z-index，将z-index转移給下一个，防止图片转移了还不能显示），除了当前选中的其他兄弟元素，淡出，移除置d
    }
},4000);
}
//防止当鼠标要点击箭头时继续轮播
$(".change-a .arrow-a  , .change-b .arrow-b , .change-c .arrow-c,.change-d .arrow-d").mouseover(function(){
clearInterval(timeplay);
}).mouseout(function(){
auto();
});

//左箭头
$(".change-a .arrow-a .left-a , .change-b .arrow-b .left-b , .change-c .arrow-c .left-c,.change-d .arrow-d .left-d").click(function(){
    // 向左移动索引号递减
time--;
// 如果当前索引号为0（第一张图），那么再次进入计时器时索引号变为-1，但是-1不存在，所以进入else
if(time >= 0){
    $(".change-a .point-a ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-b .point-b ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-c .point-c ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-d .point-d ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-a .change-photo-a a").eq(time).show().siblings(".change-a .change-photo-a a").hide();
    $(".change-b .change-photo-b a").eq(time).show().siblings(".change-b .change-photo-b a").hide();
    $(".change-c .change-photo-c a").eq(time).show().siblings(".change-c .change-photo-c a").hide();
    $(".change-d .change-photo-d a").eq(time).show().siblings(".change-d .change-photo-d a").hide();
}
else{
    //时间值回到尾部
    time = 2;
    $(".change-a .point-a ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-b .point-b ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-c .point-c ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-d .point-d ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-a .change-photo-a a").eq(time).show().siblings(".change-a .change-photo-a a").hide();
    $(".change-b .change-photo-b a").eq(time).show().siblings(".change-b .change-photo-b a").hide();
    $(".change-c .change-photo-c a").eq(time).show().siblings(".change-c .change-photo-c a").hide();
    $(".change-d .change-photo-d a").eq(time).show().siblings(".change-d .change-photo-d a").hide();
}
});
//右箭头
$(".change-a .arrow-a .right-a , .change-b .arrow-b .right-b,.change-c .arrow-c .right-c,.change-d .arrow-d .right-d").click(function(){
    // 向右移动索引号递增
time++;
// 如果当前是第二张图片，那么再次进入计时器时索引号为3，但是3不存在，进入else
if(time < 3){
    $(".change-a .point-a ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-b .point-b ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-c .point-c ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-d .point-d ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-a .change-photo-a a").eq(time).show().siblings(".change-a .change-photo-a a").hide();
    $(".change-b .change-photo-b a").eq(time).show().siblings(".change-b .change-photo-b a").hide();
    $(".change-c .change-photo-c a").eq(time).show().siblings(".change-c .change-photo-c a").hide();
    $(".change-d .change-photo-d a").eq(time).show().siblings(".change-d .change-photo-d a").hide();

}
else{
    //时间值返回头部
    time = 0;
    $(".change-a .point-a ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-b .point-b ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-c .point-c ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-d .point-d ul li").eq(time).addClass("active").siblings().removeClass("active");
    $(".change-a .change-photo-a a").eq(time).show().siblings(".change-a .change-photo-a a").hide();
    $(".change-b .change-photo-b a").eq(time).show().siblings(".change-b .change-photo-b a").hide();
    $(".change-c .change-photo-c a").eq(time).show().siblings(".change-c .change-photo-c a").hide();
    $(".change-d .change-photo-d a").eq(time).show().siblings(".change-d .change-photo-d a").hide();
}
});

