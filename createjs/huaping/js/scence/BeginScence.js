(function(m)
{
	var BeginScence = function()
    {
        //这里定义变量  this.xxx  xxx就是定义的变量
        //一般性的属性设置
        //图片路径
        
        //容器
        this.scence;
        //开始游戏 按钮
        this.beginGameBt;
        //游戏说明 按钮
        this.instructionsBt;
        
       
        //调用函数  
        this.init();
	}

	BeginScence.prototype = 
    {
		constructor:BeginScence,
        
        // 这里定义函数方法  格式 xxx:function()  
        init:function()
        {
            this.scence = new createjs.Container();
            
            //开始游戏
            this.beginGameBt = new Button("开始游戏",240,50);
            this.scence.addChild(this.beginGameBt.button);
            this.beginGameBt.button.x = stageWidth / 2 - this.beginGameBt.width / 2;
            this.beginGameBt.button.y = stageHeight * 0.4;
            
            //说明
            this.instructionsBt = new Button("游戏说明",240,50);
            this.scence.addChild(this.instructionsBt.button);
            this.instructionsBt.button.x = stageWidth / 2 - this.instructionsBt.width / 2;
            this.instructionsBt.button.y = stageHeight * 0.5;
        }
    }
    
    
    

	m.BeginScence = function()
    {
		return new BeginScence()
	};
})(window)






















//