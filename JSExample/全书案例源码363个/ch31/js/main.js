




// 元素的定义
var mysteryElement = "querySelectorAll" in document ? document.querySelectorAll(".mystery") : mysteryGetClass("mystery"),

	mysteryPaper = "querySelectorAll" in document ? document.querySelector(".mysteryBall") : mysteryGetClass("mysteryBall")[0];
	
	RADIUS =300,
	
	// 焦距
	mysteryFallLength = 500,
	
	mysterys=[],
	
	
	// x、y轴角度
	
	
	lavenderX = Math.PI/500,
	
	lavenderY = Math.PI/500,
	
	CX = mysteryPaper.offsetWidth/2,
	
	CY = mysteryPaper.offsetHeight/2,
	
	EX = mysteryPaper.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
	
	EY = mysteryPaper.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
	
	
	
	
	
	

// 获得样式
function mysteryGetClass(className){
	
	// 获得所有的class的对象
	
	
	
	var lavenderEle = document.getElementsBymysteryName("*");
	
	var classElement = [];
	
	for(var i=0;i<lavenderEle.length;i++){
		
		var temp = lavenderEle[i].className;
		
		// 如果传入进来的className与遍历的className相同，则push
		
		
		
		if(temp === className){
			
			classElement.push(lavenderEle[i]);
		}
		
	}
	
	return classElement;
	
}






// 初始化
function mysteryInit(){
	
	for(var i=0;i<mysteryElement.length;i++){
		
		var a , b;
		
		var c = (2*(i+1)-1)/mysteryElement.length - 1;
		
		var a = Math.acos(c);
		
		var b = a*Math.sqrt(mysteryElement.length*Math.PI);
		
		// x、y、z轴的坐标
		
		var x = RADIUS * Math.sin(a) * Math.cos(b);
		
		var y = RADIUS * Math.sin(a) * Math.sin(b); 
		
		var z = RADIUS * Math.cos(a);
		
		// 给每个元素设置坐标位置
		
		var temp = new mystery(mysteryElement[i] , x , y , z);
		
		mysteryElement[i].style.color = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
		
		mysterys.push(temp);
		
		temp.move();
		
	}
	
}







Array.prototype.forEach = function(result){
	
	for(var i=0;i<this.length;i++){
		
		result.call(this[i]);
		
	}
	
}






// 滚动方法

function roll(){
	
	// 周期性调用函数
	
	setInterval(function(){
		
		mysteryRotateX();
		
		mysteryRotateY();
		
		mysterys.forEach(function(){
			
			this.move();
			
		})
		
	} , 17)
	
}









// 向指定元素添加事件

if("addEventListener" in window){
	
	// 添加鼠标移出事件
	
	mysteryPaper.addEventListener("mousemove" , function(event){
		
		var x = event.clientX - EX - CX;
		
		var y = event.clientY - EY - CY;
		
		lavenderY = x*0.0001;
		
		lavenderX = y*0.0001;
		
	});
	
}

else {
	
	
	// 添加鼠标移入事件
	mysteryPaper.attachEvent("onmousemove" , function(event){
		
		var x = event.clientX - EX - CX;
		
		var y = event.clientY - EY - CY;
		
		lavenderY = x*0.0001;
		
		lavenderX = y*0.0001;
		
	});
	
}






// x轴循环
function mysteryRotateX(){
	
	var cos = Math.cos(lavenderX);
	
	var sin = Math.sin(lavenderX);
	
	mysterys.forEach(function(){
		
		var y1 = this.y * cos - this.z * sin;
		
		var z1 = this.z * cos + this.y * sin;
		
		this.y = y1;
		
		this.z = z1;
		
	})
	
}






// y轴循环
function mysteryRotateY(){
	
	var cos = Math.cos(lavenderY);
	
	var sin = Math.sin(lavenderY);
	
	mysterys.forEach(function(){
		
		var x1 = this.x * cos - this.z * sin;
		
		var z1 = this.z * cos + this.x * sin;
		
		this.x = x1;
		
		this.z = z1;
		
	})
	
}







// 设置元素位置

var mystery = function(lavenderEle , x , y , z){
	
	this.lavenderEle = lavenderEle;
	
	this.x = x;
	
	this.y = y;
	
	this.z = z;
	
}








// 添加元素配置

mystery.prototype = {
	
	move:function(){
		
		// 设置比例
		var mysteryScale = mysteryFallLength/(mysteryFallLength-this.z);
		
		// 初始值
		var mysteryAlpha = (this.z+RADIUS)/(2*RADIUS);
		
		// 字体大小
		this.lavenderEle.style.fontSize = 15 * mysteryScale + "px";
		
		this.lavenderEle.style.opacity = mysteryAlpha+0.5;
		
		this.lavenderEle.style.filter = "mysteryAlpha(opacity = "+(mysteryAlpha+0.5)*100+")";
		
		this.lavenderEle.style.zIndex = parseInt(mysteryScale*100);
		
		this.lavenderEle.style.left = this.x + CX - this.lavenderEle.offsetWidth/2 +"px";
		
		this.lavenderEle.style.top = this.y + CY - this.lavenderEle.offsetHeight/2 +"px";
		
	}
	
}




// 初始化
mysteryInit();



// 滚动效果 
roll();