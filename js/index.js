//画布
var canvas
//舞台
var stage
//大转盘
var zhuanPan
//大转盘与"针"之间的连线
var lines
// 存放所有"针"的数组
var ballArr = [];

//游戏结束 面板
var gameOverBan;

//游戏胜利 面板
var gameWinBan;

//剩余球的数量
var ballNumText;

//颜色数组
var colorArr = ["#FD6862", "#FECB32", "#3796CE", "#676597", "#D42FA5", "#9ACC2D"];

$(document).ready(function()
{
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    
    zhuanPan = new createjs.Container();
    stage.addChild(zhuanPan);
    zhuanPan.x = 300;
    zhuanPan.y = 150;
    
    ballNumText = new createjs.Text("0","50px Arial","#ffffff")
    var bounds = ballNumText.getBounds();
    ballNumText.x = 300 - bounds.width * 0.5;
    ballNumText.y = 150 - bounds.height * 0.5;
    stage.addChild(ballNumText);
    
    gameOverBan = makeGameOverBan();
    gameWinBan = makeGameWinBan();
    gameOverBan.addEventListener("click",onNewGame);
    gameWinBan.addEventListener("click",onNewGame);
    stage.addChild(gameOverBan);
    stage.addChild(gameWinBan);
    
    createjs.Ticker.addEventListener("tick",onTick);
    
    newGame();
    
    
})

function onNewGame()
{
    newGame();
}


//新游戏
function newGame()
{
    //隐藏 胜利 失败面板
    gameOverBan.visible = false;
    gameWinBan.visible = false;
    
    //清空数据
    var i = 0;
    for(i = 0;i<outBallArr.length;i++)
    {
        stage.removeChild(outBallArr[i]);
    }
    
    zhuanPan.removeAllChildren();
    
    ballArr = [];
    outBallArr = [];
    
    initZhuanPan();
    makeBall();
    
    //刷新剩余"针"的数量
    ballNumText.text = outBallArr.length;
    var bounds = ballNumText.getBounds();
    ballNumText.x = 300 - bounds.width * 0.5;
    ballNumText.y = 150 - bounds.height * 0.5;
    
    stage.addEventListener("stagemousedown",onStageClick);
    zhuanPan.addEventListener("tick",onRotation);
}


//实时刷新舞台
function onTick()
{
    stage.update();
}

//舞台点击  为转盘添加"针"
function onStageClick()
{
    var color = outBallArr[0].obj.color;
    var num = outBallArr[0].obj.listNum;
    
    console.log( );
    var c = new ball(color,num);
    
    ballArr.push(c.getChildByName("ball"));
    
    zhuanPan.addChild(c);
    
    var xx = Math.sin(Math.PI/180*zhuanPan.rotation) * 100;
    var yy = Math.cos(Math.PI/180*zhuanPan.rotation) * 100;
    c.x = xx;
    c.y = yy;
    
    lines.graphics.beginStroke("#000000");
    lines.graphics.moveTo(0,0);
    lines.graphics.lineTo(xx,yy);
    
    
    stage.removeChild(outBallArr[0]);
    outBallArr.splice(0,1);
    
    //提升剩下的"针"的y值
    for(var i = 0;i<outBallArr.length;i++)
    {
        outBallArr[i].y -= 30;
    }
    
    //刷新剩余"针"的数量
    ballNumText.text = outBallArr.length;
    var bounds = ballNumText.getBounds();
    ballNumText.x = 300 - bounds.width * 0.5;
    ballNumText.y = 150 - bounds.height * 0.5;
    
    //检测游戏是否结束
    testHit();
  
}

//转盘转动
function onRotation()
{
    zhuanPan.rotation += 1;
}

//"针"  color : "针"颜色  num : "针"上面数字 
function ball(color,num)
{
    var contain = new createjs.Container();
    var shape = new createjs.Shape();
    shape.graphics.beginFill(color);
    shape.graphics.drawCircle(0,0,10);
    shape.graphics.endFill();
    shape.rotation = -zhuanPan.rotation
    shape.name = "ball";
    contain.addChild(shape);
    
    if(num)
    {
         var text = new createjs.Text(num);
        contain.addChild(text);
        var bounds = text.getBounds();

        text.regX = bounds.width * 0.5;
        text.regY = bounds.height * 0.5;
        text.rotation = -zhuanPan.rotation
    }
   return contain;
}

//初始化转盘   游戏一开始会有几个"针"在上面
function initZhuanPan()
{
    //添加连接线
    lines = new createjs.Shape();
    zhuanPan.addChild(lines);
    
    //添加转盘 中心 圆
    var zhuan = new createjs.Shape();
    zhuan.graphics.beginFill("#ff0000");
    zhuan.graphics.drawCircle(0,0,50);
    zhuan.graphics.endFill();
    zhuanPan.addChild(zhuan);
    
    
    
    for(var i = 0;i<4;i++)
    {
        var c = new ball("#cccccc");
    
        ballArr.push(c.getChildByName("ball"));

        zhuanPan.addChild(c);

        var xx = Math.sin(Math.PI/180*90*i) * 100;
        var yy = Math.cos(Math.PI/180*90*i) * 100;
        c.x = xx;
        c.y = yy;

        lines.graphics.beginStroke("#000000");
        lines.graphics.moveTo(0,0);
        lines.graphics.lineTo(xx,yy);
    }
    
}

//还未插的 "针"  的数组
var outBallArr = [];

//创建所需要的  插 的  所有"针"
function makeBall()
{
    var ballNum = Math.floor(Math.random()*4 + 8);
    
    var listNum = ballNum;
    
    
    
    for(var i = 0;i<ballNum;i++)
    {
        var color = colorArr[Math.floor(Math.random() * colorArr.length)];
        var ball = outBall(color,listNum);
        stage.addChild(ball);
        ball.x = 300;
        ball.y = 300 + i* 30;
        
        ball.obj = 
        {
            color:color,
            listNum:listNum
        }
        
        outBallArr.push(ball)
        
        listNum --;
    }
}

//还未插的 "针"    color : "针"颜色  num : "针"上面数字 
function outBall(color,num)
{
    var contain = new createjs.Container();
    var shape = new createjs.Shape();
    shape.graphics.beginFill(color);
    shape.graphics.drawCircle(0,0,10);
    shape.graphics.endFill();
    shape.name = "ball";
    contain.addChild(shape);
    
         var text = new createjs.Text(num);
        contain.addChild(text);
        var bounds = text.getBounds();

        text.regX = bounds.width * 0.5;
        text.regY = bounds.height * 0.5;
    
   return contain;
}


//创建游戏结束 面板
function makeGameOverBan()
{
    var ban = new createjs.Container();
    var back = new createjs.Shape();
    back.graphics.beginFill("#cccccc");
    back.graphics.drawRect(0,0,600,800);
    back.graphics.endFill();
    back.alpha = 0.7;
    ban.addChild(back);
    
    var text = new createjs.Text("Game Over","50px Arial","#000000");
    var bounds = text.getBounds();
    text.x = 300 - bounds.width*0.5
    text.y = 300;
    ban.addChild(text);
    
    var text1 = new createjs.Text("Try Again","20px Arial","#000000");
    var bounds1 = text1.getBounds();
    text1.x = 300 - bounds1.width*0.5
    text1.y = 400;
    ban.addChild(text1);
    
    return ban;
    
}



//创建游戏胜利 面板
function makeGameWinBan()
{
    var ban = new createjs.Container();
    var back = new createjs.Shape();
    back.graphics.beginFill("#cccccc");
    back.graphics.drawRect(0,0,600,800);
    back.graphics.endFill();
    back.alpha = 0.7;
    ban.addChild(back);
    
    var text = new createjs.Text("You Win","50px Arial","#000000");
    var bounds = text.getBounds();
    text.x = 300 - bounds.width*0.5
    text.y = 300;
    ban.addChild(text);
    
    var text1 = new createjs.Text("Play Again","20px Arial","#000000");
    var bounds1 = text1.getBounds();
    text1.x = 300 - bounds1.width*0.5
    text1.y = 400;
    ban.addChild(text1);
    
    return ban;
    
}



//检测是否碰撞
function testHit()
{
    if(outBallArr.length <= 0)
    {
        console.log("游戏胜利")
        gameWinBan.visible = true;
        stage.addChild(gameWinBan);
        
        zhuanPan.removeEventListener("tick",onRotation);
        stage.removeEventListener("stagemousedown",onStageClick);
        return;
    }
    
    for(var i = 0;i<ballArr.length;i++)
    {
        
        //console.log(ballArr[i].localToGlobal(ballArr[i].x,ballArr[i].y));
        for(var j = i+1;j<ballArr.length;j++)
        {
            var xx1 = ballArr[i].localToGlobal(ballArr[i].x,ballArr[i].y).x;
            var yy1 = ballArr[i].localToGlobal(ballArr[i].x,ballArr[i].y).y;
            
            var xx2 = ballArr[j].localToGlobal(ballArr[j].x,ballArr[j].y).x;
            var yy2 = ballArr[j].localToGlobal(ballArr[j].x,ballArr[j].y).y;
            
            //console.log(disPoints(xx1,yy1,xx2,yy2));
            
            if(disPoints(xx1,yy1,xx2,yy2)<= 20)
            {
                //alert("游戏结束")
                
                gameOverBan.visible = true;
                stage.addChild(gameOverBan);
                
                zhuanPan.removeEventListener("tick",onRotation);
                stage.removeEventListener("stagemousedown",onStageClick);
            }
        }
    }
}



//检测两个点之间的距离 xx1 yy1 点1的坐标   xx2  yy2  点2的坐标
function disPoints(xx1,yy1,xx2,yy2)
{
    return Math.sqrt(Math.pow(xx1 - xx2,2) + Math.pow(yy1 - yy2,2));
}



















//