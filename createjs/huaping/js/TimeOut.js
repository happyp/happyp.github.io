(function(m)
{
	var TimeOut = function(times)
    {
        //这里定义变量  this.xxx  xxx就是定义的变量
        //一般性的属性设置
        //图片路径
        
        //倒计时 总时间  单位 秒
        this.times = times;
        //倒计时文字
        this.timeText;
        //倒计时  分
        this.minutes;
        //倒计时  秒
        this.seconds;
        //计步器
        this.stpe = 0;
        this.width = 130;
        this.height = 50;
        //匿名函数 用于注销事件
        this.fun;
        
        //调用函数  
        this.init();
	}

	TimeOut.prototype = 
    {
		constructor:TimeOut,
        
        // 这里定义函数方法  格式 xxx:function()  
        init:function()
        {
            this.timeText = new createjs.Text("00:00","45px Arial","#ffffff");   
            this.timeText.lineWidth = this.width;
            this.timeText.lineHeight = this.height;
            this.timeText.textAlign = "center";
            this.timeText.textBaseline = "middle";
            this.makeTime();
            
            var _this = this;
            this.fun = function(){_this.onTimeOut()}
        },
        
        startTime:function()
        {
            this.timeText.addEventListener("tick",this.fun)   
        },
        
        stopTime: function()
        {
            
            this.timeText.removeEventListener("tick",this.fun)
            console.log("暂停")
        },
        
        //倒计时
        onTimeOut:function()
        {
            this.stpe ++;
            if(this.stpe > createjs.Ticker.framerate)
            {
                this.stpe = 0;
                this.times--;
                this.makeTime();
                
                if(this.times == 0)
                {
                    this.stopTime();
                    //主函数 的游戏失败方法
                    gameOver();
                    
                }
            }
            
            //console.log(createjs.Ticker.framerate)
            //if(this.stpe > c)
        },
        
        
        
        //将总时间 化分成分 秒
        makeTime:function()
        {
            
            
            var minutes = String(Math.floor(this.times/60));
            var seconds = String(this.times%60);
            
            if(minutes.length == 1)
            {
                this.minutes = "0" + minutes;
            }
            else
            {
                this.minutes = minutes;
            }
            
            if(seconds.length == 1)
            {
                this.seconds = "0" + seconds;
            }
            else
            {
                this.seconds = seconds
            }
            
           this.timeText.text = this.minutes + ":" + this.seconds
        }
    }
    
    
    

	m.TimeOut = function(times)
    {
		return new TimeOut(times)
	};
})(window)






















//