(function(m)
{
	var GameScence = function()
    {
        //这里定义变量  this.xxx  xxx就是定义的变量
        //一般性的属性设置
        //图片路径
        
        //容器
        this.scence;
        //暂停
        this.pauseBt;
        //退出
        this.exitBt;
        //倒计时
        this.timeOut;
        
        
        
        //调用函数  
        this.init();
	}

	GameScence.prototype = 
    {
		constructor:GameScence,
        
        // 这里定义函数方法  格式 xxx:function()  
        init:function()
        {
            this.scence = new createjs.Container();
            
             //暂停
            this.pauseBt = new Button("暂停",120,50);
            this.scence.addChild(this.pauseBt.button);
            this.pauseBt.button.x = stageWidth * 0.25 - this.pauseBt.width / 2;
            this.pauseBt.button.y = stageHeight * 0.85;

            //退出
            this.exitBt = new Button("退出",120,50);
            this.scence.addChild(this.exitBt.button);
            this.exitBt.button.x = stageWidth * 0.75 - this.exitBt.width / 2;
            this.exitBt.button.y = stageHeight * 0.85;
            
            //确定  游戏结束后的 确定按钮
            this.sureBt = new Button("确     定",240,50);
            this.scence.addChild(this.sureBt.button);
            this.sureBt.button.x = stageWidth / 2 - this.sureBt.width / 2;
            this.sureBt.button.y = stageHeight * 0.65;  
            this.sureBt.button.visible = false;
            
            //倒计时
            this.timeOut = new TimeOut(0);
            this.scence.addChild(this.timeOut.timeText);
            //stage.addChild(timeOut.timeText);
            this.timeOut.timeText.x = stageWidth * 0.5;
            this.timeOut.timeText.y = 50 
        }
    }
    
    
    

	m.GameScence = function()
    {
		return new GameScence()
	};
})(window)






















//