//当网页加载完成
window.onload = function()
{
    initGame();
}

//声明舞台
var stage;
//声明圆形显示对象
var circleShape;

//初始化游戏
function initGame()
{
    //创建舞台 这里的 "Game"  对应的是index.html页面中canvase的id
    //也就是告诉网页我的舞台就是你的canvas
    stage = new createjs.Stage("Game");
    
    //Shape类和Flash中的Shape类类似，包含了所有的绘图功能，比如
    //drawRect      绘制矩形
    //drawCircle    绘制圆形
    //drawRoundRest 绘制圆角矩形
    //.....
    circleShape = new createjs.Shape();
    
    //为圆形图像设置填充颜色
    //这里的颜色 是一种CSS中设置的颜色,也就是说CSS中怎么设置颜色 这么就怎么设置 
    // "#ff000"  "rgb(255,0,0)"  "rgba(255,0,0,0.2)"  "red"
    //但需要注意的是 必须要用引号括起来
    circleShape.graphics.beginFill("red");
    //绘制圆形图像  在坐标点(0,0) 绘制半径为50的圆
    circleShape.graphics.drawCircle(0,0,50);
    //结束绘制
    circleShape.graphics.endFill();
    
    //将绘制好的圆形图像添加到舞台中
    stage.addChild(circleShape);
    //设置圆形图像的坐标点
    circleShape.x = 100;
    circleShape.y = 100;
    
    //更新舞台  这一步不能少  不然舞台不会显示任何东西  
    stage.update();
}



























































