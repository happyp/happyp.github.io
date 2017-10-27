var canvas;
var stage;
var stageWidth;
var stageHeight;
//拼图宽度
var picWidth = 550;
//拼图高度
var picHeight = 550;
var picX = 45;
var picY = 100;

//横向 纵向分成几份
var col = 4;
//外部图片路径
var picSourceArr = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg"]
//大图片
var pic;
//小图宽
var smallWidth = 250;
//小图高
var smallHeight = 250;
//小图坐标 X
var smallX = 195;
//小图坐标 y
var smallY = 700;
//游戏纵时间数组  单位 秒
var gameTimeArr = [200,240,140];
//游戏总时间
var gameTimer
//随机一张图片
var randomPicInt

//加载图片
var loader
//开始游戏 界面
var beginScence;
//选择阶数 界面
var orderScence;
//游戏说明 界面
var instructionsScene;
//游戏界面
var gameScence;
//游戏失败 界面
var gameOverScence;

//游戏主体
var pic
//是暂停还是继续 (暂停按钮)  boolean 
var isPause = false;
//倒计时
var timeOut;

//加载图片的进度 文字
var progressText;
var internalText
$(document).ready(function()
{
    init();    
})

function init()
{
    canvas = document.getElementById("GameView");


    stage = new createjs.Stage("GameView");
    stage.enableMouseOver(10);
    createjs.Ticker.addEventListener("tick",onTick);

    stageWidth = canvas.width;
    stageHeight = canvas.height;
    
    progressText = new createjs.Text("progressText","30px Arial","#000");
    progressText.x = stageWidth / 2;
    progressText.y = 350;
    progressText.textAlign="center";
    stage.addChild(progressText);
    
    
    //说明:
    internalText = new createjs.Text("自己之前制作的一个小游戏,修改了自适应(还不算完美,\n能够手机满屏显示),网速慢的情况下,资源加载方面\n可能会出现问题(还是学艺不精啊)","30px Arial","#000");
    internalText.x = 0;
    internalText.y = 0;
    internalText.maxWidth = stageWidth;
    
    stage.addChild(internalText)
    
    loadImages();
    
    //--------------------------开始游戏 界面--------------------------------------
    
    beginScence = new BeginScence();
    stage.addChild(beginScence.scence)
    
   
    //--------------------------选择阶数 界面--------------------------------------
    
    orderScence = new OrderScence();
    stage.addChild(orderScence.scence)
    
    
    //--------------------------游戏说明 界面--------------------------------------
    
    instructionsScene = new InstructionsScene();
    stage.addChild(instructionsScene.scence)
    
   
    //--------------------------主游戏 界面--------------------------------------
    gameScence = new GameScence();
    stage.addChild(gameScence.scence)
    
    //--------------------------主游戏 界面--------------------------------------
    gameOverScence = new GameOverScence();
    stage.addChild(gameOverScence.scence)
    
    gameStart();
    
    
}

function loadImages()
{
    "images/1.jpg"
    
    var manifest = 
    [
        {src:"images/1.jpg" , id:"pic1"},
        {src:"images/2.jpg" , id:"pic2"},
        {src:"images/3.jpg" , id:"pic3"},
        {src:"images/4.jpg" , id:"pic4"},
        {src:"images/5.jpg" , id:"pic5"},
        {src:"images/6.jpg" , id:"pic6"},
        {src:"images/7.jpg" , id:"pic7"},
        {src:"images/8.jpg" , id:"pic8"},
        {src:"images/9.jpg" , id:"pic9"},
        {src:"images/10.jpg" , id:"pic10"}
    ]
    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete" , handleComplete);
    loader.addEventListener("progress",onProgress);
    loader.loadManifest(manifest);
    
    
}

function onProgress(e)
{
    console.log(e.progress)
    
    progressText.text = "拼命加载中:" + e.progress * 100 + "%";
}

function handleComplete()
{
    stage.removeChild(progressText);
    eventInit();
    
}

function eventInit()
{
    beginScence.beginGameBt.button.addEventListener("click",orderChange);
    beginScence.instructionsBt.button.addEventListener("click",onInstructions);
    
    instructionsScene.backBt.button.addEventListener("click",onBack);
    
    orderScence.orderThreeBt.button.addEventListener("click",function(e){newGame(3)});
    orderScence.orderFourBt.button.addEventListener("click",function(e){newGame(4)});
    orderScence.orderFiveBt.button.addEventListener("click",function(e){newGame(5)});
    
    gameScence.pauseBt.button.addEventListener("click",onPause);
    gameScence.exitBt.button.addEventListener("click",onExit);
    gameScence.sureBt.button.addEventListener("click",onExit);
    
    gameOverScence.backBt.button.addEventListener("click",onExit);
    gameOverScence.reStartBt.button.addEventListener("click",onRestGame);
}



//选择阶数  三 四 五阶  界面
function orderChange()
{
    
    beginScence.scence.visible = false;
    orderScence.scence.visible = true;
    instructionsScene.scence.visible = false;
    gameScence.scence.visible = false;
    gameOverScence.scence.visible = false;
    
    //定一下  图片 
    randomPicInt = Math.floor(Math.random()*10) + 1;
}

//选择开始游戏界面
function gameStart()
{
    
    beginScence.scence.visible = true;
    orderScence.scence.visible = false;
    instructionsScene.scence.visible = false;
    gameScence.scence.visible = false;
    gameOverScence.scence.visible = false;
}

//游戏说明 界面
function onInstructions()
{
    beginScence.scence.visible = false;
    orderScence.scence.visible = false;
    instructionsScene.scence.visible = true;
    gameScence.scence.visible = false;
    gameOverScence.scence.visible = false;
}

//返回   到 游戏开始界面
function onBack()
{
    gameStart();
}

// 暂停 / 继续 
function onPause()
{
    if(!isPause)
    {
        pic.pause();
        gameScence.timeOut.stopTime();
        gameScence.pauseBt.text.text = "继续"
    }
    else
    {
        pic.continue();
        gameScence.timeOut.startTime();
        gameScence.pauseBt.text.text = "暂停"
    }
    isPause = !isPause;
}

//退出
function onExit()
{
    pic.clear();
    gameStart();
}

//新游戏 参数 orders 表示阶数
function newGame(orders)
{
    beginScence.scence.visible = false;
    orderScence.scence.visible = false;
    instructionsScene.scence.visible = false;
    gameScence.scence.visible = true;
    gameOverScence.scence.visible = false;
    
    gameScence.pauseBt.button.visible = true;
    gameScence.exitBt.button.visible = true;
    
    gameTimer = gameTimeArr[orders-3];
    
    col = orders;
    
    
    
    pic = new Pic(col,loader.getResult("pic" + randomPicInt ));
    pic.stage = stage;
    pic.init();
    gameScence.timeOut.times = gameTimer;
    gameScence.timeOut.makeTime();
    gameScence.timeOut.startTime();
    
    internalText.alpha = 0;
}

//重新开始  使用当前的 阶数  和 图片  再玩一次
function onRestGame()
{
    pic.gameOver();
    pic.clear();
    newGame(col);
}

//游戏胜利
function gameWin()
{
    gameScence.timeOut.stopTime();
    gameScence.pauseBt.button.visible = false;
    gameScence.exitBt.button.visible = false;
    gameScence.sureBt.button.visible = true;
}

//游戏失败
function gameOver()
{
    gameScence.pauseBt.button.visible = false;
    gameScence.exitBt.button.visible = false;
    pic.gameOver();
    
    stage.addChild(gameOverScence.scence);
    gameOverScence.scence.visible = true;
}

//每帧刷新
function onTick(e)
{
    stage.update();
}


















//