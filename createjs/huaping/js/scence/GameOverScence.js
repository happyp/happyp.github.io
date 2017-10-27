(function(m)
{
	var GameOverScence = function()
    {
        //这里定义变量  this.xxx  xxx就是定义的变量
        //一般性的属性设置
        //图片路径
        
        //容器
        this.scence;
        //返回 按钮
        this.backBt;
        //重新开始
        this.reStartBt;
        
        //为 游戏界面整体蒙上一层灰色
        this.blackShape;
        
        //调用函数  
        this.init();
	}

	GameOverScence.prototype = 
    {
		constructor:GameOverScence,
        
        // 这里定义函数方法  格式 xxx:function()  
        init:function()
        {
            this.scence = new createjs.Container();
            
            
            
            //为 游戏界面整体蒙上一层灰色
            this.blackShape = new createjs.Shape();
            this.blackShape.graphics.beginFill("rgba(0,0,0,0.5)");
            this.blackShape.graphics.drawRect(0,0,stageWidth,stageHeight);
            this.blackShape.graphics.endFill();
            this.scence.addChild(this.blackShape);
            
            //返回 回到游戏开始界面 功能和 GameScreen里的 exitBt功能一样
            this.backBt = new Button("返     回",240,50);
            this.scence.addChild(this.backBt.button);
            this.backBt.button.x = stageWidth / 2 - this.backBt.width / 2;
            this.backBt.button.y = stageHeight * 0.4;
            
            //重新开始
            this.reStartBt = new Button("重新开始",240,50);
            this.scence.addChild(this.reStartBt.button);
            this.reStartBt.button.x = stageWidth / 2 - this.reStartBt.width / 2;
            this.reStartBt.button.y = stageHeight * 0.5;
        }
    }
    
    
    

	m.GameOverScence = function()
    {
		return new GameOverScence()
	};
})(window)






















//