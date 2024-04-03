
//获得主界面
var gameDiv=document.getElementById("gameDiv");


//获得开始界面
var mysteryHomeDiv=document.getElementById("mysteryHomeDiv");


//获得游戏中分数显示界面
var scoreDiv=document.getElementById("scoreDiv");


//获得分数界面
var scorelabel=document.getElementById("initialScore");


//获得暂停界面
var pauseDiv=document.getElementById("pauseDiv");


//获得游戏结束界面
var endDiv=document.getElementById("endDiv");


//获得游戏结束后分数统计界面
var mysteryPlanScoreText=document.getElementById("mysteryPlanScoreText");


//初始化分数
var scores = 0;

// 飞机
function mysteryPlan(hp,X,Y,sizeX,sizeY,score,endTime,speed,trunkImage,imageUrl){
	
    this.mysteryPlanX=X;
	
    this.mysteryPlanY=Y;
	
    this.mysteryImageNode=null;
	
    this.mysteryPlanhp=hp;
	
    this.mysteryPlanScoreText=score;
	
    this.mysteryPlansizeX=sizeX;
	
    this.mysteryPlansizeY=sizeY;
	
    this.mysteryPlantrunkImage=trunkImage;
	
    this.mysteryPlanisDie=false;
	
    this.mysterymysteryPlanEndTimes=0;
	
    this.mysteryPlanEndTime=endTime;
	
    this.mysteryPlanSpeed=speed;

	//飞机移动
    this.mysteryPlanMove=function(){
		
        if(scores<=50000){
			
            this.mysteryImageNode.style.top=this.mysteryImageNode.offsetTop+this.mysteryPlanSpeed+"px";
        }
		
        else if(scores>50000&&scores<=100000){
			
            this.mysteryImageNode.style.top=this.mysteryImageNode.offsetTop+this.mysteryPlanSpeed+1+"px";
        }
		
        else if(scores>100000&&scores<=150000){
			
            this.mysteryImageNode.style.top=this.mysteryImageNode.offsetTop+this.mysteryPlanSpeed+2+"px";
			
        }
        else if(scores>150000&&scores<=200000){
            this.mysteryImageNode.style.top=this.mysteryImageNode.offsetTop+this.mysteryPlanSpeed+3+"px";
        }
		
        else if(scores>200000&&scores<=300000){
			
            this.mysteryImageNode.style.top=this.mysteryImageNode.offsetTop+this.mysteryPlanSpeed+4+"px";
        }
		
        else{
			
            this.mysteryImageNode.style.top=this.mysteryImageNode.offsetTop+this.mysteryPlanSpeed+5+"px";
        }
    }
	
    this.init=function(){
		
        this.mysteryImageNode=document.createElement("img");
		
        this.mysteryImageNode.style.left=this.mysteryPlanX+"px";
		
        this.mysteryImageNode.style.top=this.mysteryPlanY+"px";
		
        this.mysteryImageNode.src=imageUrl;
		
        gameDiv.appendChild(this.mysteryImageNode);
    }
	
    this.init();
}


// 子弹
function mysteryBullet(X,Y,sizeX,sizeY,imageUrl){
	
    this.mysteryBulletX=X;
	
    this.mysteryBulletY=Y;
	
    this.mysteryBulletimage=null;
	
    this.mysteryBulletAttach=1;
	
    this.mysterymysteryBulletsizeX=sizeX;
	
    this.mysterymysteryBulletsizeY=sizeY;
	
	//  子弹移动
    this.mysteryBulletMove=function(){
		
        this.mysteryBulletimage.style.top=this.mysteryBulletimage.offsetTop-20+"px";
    }
    this.init=function(){
		
        this.mysteryBulletimage=document.createElement("img");
		
        this.mysteryBulletimage.style.left= this.mysteryBulletX+"px";
		
        this.mysteryBulletimage.style.top= this.mysteryBulletY+"px";
		
        this.mysteryBulletimage.src=imageUrl;
		
        gameDiv.appendChild(this.mysteryBulletimage);
    }
	
    this.init();
}

// 单行子弹
function mysteryOddBullet(X,Y){
	
    mysteryBullet.call(this,X,Y,6,14,"image/bullet1.png");
	
}

// 敌机
function mysteryEnemyPlan(hp,a,b,sizeX,sizeY,score,endTime,speed,trunkImage,imageUrl){
	
    mysteryPlan.call(this,hp,random(a,b),-100,sizeX,sizeY,score,endTime,speed,trunkImage,imageUrl);
	
}
// 创建随机数
function random(min,max){
	
    return Math.floor(min+Math.random()*(max-min));
	
}

// 本方飞机
function mysteryOurPlan(X,Y){
	
    var imageUrl="image/我的飞机.gif";
	
    mysteryPlan.call(this,1,X,Y,66,80,0,660,0,"image/本方飞机爆炸.gif",imageUrl);
	
    this.mysteryImageNode.setAttribute('id','mysteryOurPlan');
	
}

// 创建本方飞机
var mysterySelfPlan=new mysteryOurPlan(120,485);

// 移动事件
var mysteryOurPlan=document.getElementById('mysteryOurPlan');

var mysteryShift=function(){
	
    var mysteryOevent=window.event||arguments[0];
	
    var mysteryStart=mysteryOevent.srcElement||mysteryOevent.target;
	
    var selfmysteryPlanX=mysteryOevent.clientX-500;
	
    var selfmysteryPlanY=mysteryOevent.clientY;
	
    mysteryOurPlan.style.left=selfmysteryPlanX-mysterySelfPlan.mysteryPlansizeX/2+"px";
	
    mysteryOurPlan.style.top=selfmysteryPlanY-mysterySelfPlan.mysteryPlansizeY/2+"px";
	
}
// 暂停事件
var mysteryNumber=0;

var mysterySuspend=function(){
	
    if(mysteryNumber==0){
		
        pauseDiv.style.display="block";
		
        if(document.removeEventListener){
			
            gameDiv.removeEventListener("mousemove",mysteryShift,true);
			
            mysteryBodyObj.removeEventListener("mousemove",mysteryBoundary,true);
			
        }
		
        else if(document.detachEvent){
			
            gameDiv.detachEvent("onmousemove",mysteryShift);
			
            mysteryBodyObj.detachEvent("onmousemove",mysteryBoundary);
			
        }
		
        clearInterval(set);
		
        mysteryNumber=1;
    }
	
    else{
		
        pauseDiv.style.display="none";
		
        if(document.addEventListener){
			
            gameDiv.addEventListener("mousemove",mysteryShift,true);
			
            mysteryBodyObj.addEventListener("mousemove",mysteryBoundary,true);
			
        }
		
        else if(document.attachEvent){
			
            gameDiv.attachEvent("onmousemove",mysteryShift);
			
            mysteryBodyObj.attachEvent("onmousemove",mysteryBoundary);
			
        }
		
        set=setInterval(beginGame,20);
		
        mysteryNumber=0;
		
    }
}
//判断本方飞机是否移出边界,如果移出边界,则取消mousemove事件,反之加上mousemove事件
var mysteryBoundary=function(){
	
    var mysteryOevent=window.event||arguments[0];
	
    var mysteryBodyObjX=mysteryOevent.clientX;
	
    var mysteryBodyObjY=mysteryOevent.clientY;
	
    if(mysteryBodyObjX<505||mysteryBodyObjX>815||mysteryBodyObjY<0||mysteryBodyObjY>568){
		
        if(document.removeEventListener){
			
            gameDiv.removeEventListener("mousemove",mysteryShift,true);
			
        }
		
        else if(document.detachEvent){
			
            gameDiv.detachEvent("onmousemove",mysteryShift);
        }
    }
	
    else{
		
        if(document.addEventListener){
			
            gameDiv.addEventListener("mousemove",mysteryShift,true);
			
        }
		
        else if(document.attachEvent){
			
            gameDiv.attachEvent("nomousemove",mysteryShift);
			
        }
    }
}

var mysteryBodyObj=document.getElementsByTagName("body")[0];

if(document.addEventListener){
	
    //为本方飞机添加移动和暂停
    gameDiv.addEventListener("mousemove",mysteryShift,true);
	
    //为本方飞机添加暂停事件
    mysterySelfPlan.mysteryImageNode.addEventListener("click",mysterySuspend,true);
	
    //为body添加判断本方飞机移出边界事件
    mysteryBodyObj.addEventListener("mousemove",mysteryBoundary,true);
	
    //为暂停界面的继续按钮添加暂停事件
    pauseDiv.getElementsByTagName("button")[0].addEventListener("click",mysterySuspend,true);
	
    //为暂停界面的返回主页按钮添加事件
    pauseDiv.getElementsByTagName("button")[1].addEventListener("click",tryAgain,true);
}

else if(document.attachEvent){
	
    //为本方飞机添加移动
    gameDiv.attachEvent("onmousemove",mysteryShift);
	
    //为本方飞机添加暂停事件
    mysterySelfPlan.mysteryImageNode.attachEvent("onclick",mysterySuspend);
	
    //为body添加判断本方飞机移出边界事件
    mysteryBodyObj.attachEvent("onmousemove",mysteryBoundary);
	
    //为暂停界面的继续按钮添加暂停事件
    pauseDiv.getElementsByTagName("button")[0].attachEvent("onclick",mysterySuspend);
	
    //为暂停界面的返回主页按钮添加事件
    pauseDiv.getElementsByTagName("button")[1].attachEvent("click",tryAgain,true);
	
}

//初始化隐藏本方飞机
mysterySelfPlan.mysteryImageNode.style.display="none";


// 敌机对象数组
var mysteryEnemyPlans=[];

// 子弹对象数组
var mysteryBullets=[];

var mark=0;

var mark1=0;

var backgroundPositionY=0;

// 开始函数
function beginGame(){
	
    gameDiv.style.backgroundPositionY=backgroundPositionY+"px";
	
    backgroundPositionY+=0.5;
	
    if(backgroundPositionY==568){
		
        backgroundPositionY=0;
    }
	
    mark++;
	
    // 创建敌方飞机
    if(mark==20){
		
        mark1++;
		
        //中飞机
        if(mark1%5==0){
			
            mysteryEnemyPlans.push(new mysteryEnemyPlan(6,25,274,46,60,5000,360,random(1,3),"image/中飞机爆炸.gif","image/enemy3_fly_1.png"));
			
        }
		
        //大飞机
        if(mark1==20){
			
            mysteryEnemyPlans.push(new mysteryEnemyPlan(12,57,210,110,164,30000,540,1,"image/大飞机爆炸.gif","image/enemy2_fly_1.png"));
			
            mark1=0;
			
        }
        //小飞机
        else{
			
            mysteryEnemyPlans.push(new mysteryEnemyPlan(1,19,286,34,24,1000,360,random(1,4),"image/小飞机爆炸.gif","image/enemy1_fly_1.png"));
			
        }
		
        mark=0;
    }

// 移动敌方飞机
    var mysteryEnemyPlanslen=mysteryEnemyPlans.length;
	
    for(var i=0;i<mysteryEnemyPlanslen;i++){
		
        if(mysteryEnemyPlans[i].mysteryPlanisDie!=true){
			
            mysteryEnemyPlans[i].mysteryPlanMove();
			
        }
//  如果敌机超出边界,删除敌机
        if(mysteryEnemyPlans[i].mysteryImageNode.offsetTop>568){
			
            gameDiv.removeChild(mysteryEnemyPlans[i].mysteryImageNode);
			
            mysteryEnemyPlans.splice(i,1);
			
            mysteryEnemyPlanslen--;
			
        }
		
        //当敌机死亡标记为true时，经过一段时间后清除敌机
        if(mysteryEnemyPlans[i].mysteryPlanisDie==true){
			
            mysteryEnemyPlans[i].mysterymysteryPlanEndTimes+=20;
			
            if(mysteryEnemyPlans[i].mysterymysteryPlanEndTimes==mysteryEnemyPlans[i].mysteryPlanEndTime){
				
                gameDiv.removeChild(mysteryEnemyPlans[i].mysteryImageNode);
				
                mysteryEnemyPlans.splice(i,1);
				
                mysteryEnemyPlanslen--;
				
            }
        }
    }

// 创建子弹
    if(mark%5==0){
		
            mysteryBullets.push(new mysteryOddBullet(parseInt(mysterySelfPlan.mysteryImageNode.style.left)+31,parseInt(mysterySelfPlan.mysteryImageNode.style.top)-10));
			
    }

// 移动子弹
    var mysteryBulletslen=mysteryBullets.length;
	
    for(var i=0;i<mysteryBulletslen;i++){
		
        mysteryBullets[i].mysteryBulletMove();
		
// 如果子弹超出边界,删除子弹
        if(mysteryBullets[i].mysteryBulletimage.offsetTop<0){
			
            gameDiv.removeChild(mysteryBullets[i].mysteryBulletimage);
			
            mysteryBullets.splice(i,1);
			
            mysteryBulletslen--;
			
        }
    }

// 碰撞判断
    for(var k=0;k<mysteryBulletslen;k++){
		
        for(var j=0;j<mysteryEnemyPlanslen;j++){
			
            //判断碰撞本方飞机
            if(mysteryEnemyPlans[j].mysteryPlanisDie==false){
				
                if(mysteryEnemyPlans[j].mysteryImageNode.offsetLeft+mysteryEnemyPlans[j].mysteryPlansizeX>=mysterySelfPlan.mysteryImageNode.offsetLeft&&mysteryEnemyPlans[j].mysteryImageNode.offsetLeft<=mysterySelfPlan.mysteryImageNode.offsetLeft+mysterySelfPlan.mysteryPlansizeX){
                 
				 if(mysteryEnemyPlans[j].mysteryImageNode.offsetTop+mysteryEnemyPlans[j].mysteryPlansizeY>=mysterySelfPlan.mysteryImageNode.offsetTop+40&&mysteryEnemyPlans[j].mysteryImageNode.offsetTop<=mysterySelfPlan.mysteryImageNode.offsetTop-20+mysterySelfPlan.mysteryPlansizeY){
                      
					  //碰撞本方飞机，游戏结束，统计分数
                      mysterySelfPlan.mysteryImageNode.src="image/本方飞机爆炸.gif";
                      
					  endDiv.style.display="block";
                     
					 mysteryPlanScoreText.innerHTML=scores;
                     
					 if(document.removeEventListener){
                         
						 gameDiv.removeEventListener("mousemove",mysteryShift,true);
                         
						 mysteryBodyObj.removeEventListener("mousemove",mysteryBoundary,true);
                      }
                      
					  else if(document.detachEvent){
                         
						 gameDiv.detachEvent("onmousemove",mysteryShift);
                        
						mysteryBodyObj.removeEventListener("mousemove",mysteryBoundary,true);
                     
					 }
                     
					 clearInterval(set);
                  
				  }
                }
                
				//判断子弹与敌机碰撞
                if((mysteryBullets[k].mysteryBulletimage.offsetLeft+mysteryBullets[k].mysterymysteryBulletsizeX>mysteryEnemyPlans[j].mysteryImageNode.offsetLeft)&&(mysteryBullets[k].mysteryBulletimage.offsetLeft<mysteryEnemyPlans[j].mysteryImageNode.offsetLeft+mysteryEnemyPlans[j].mysteryPlansizeX)){
                   
				   if(mysteryBullets[k].mysteryBulletimage.offsetTop<=mysteryEnemyPlans[j].mysteryImageNode.offsetTop+mysteryEnemyPlans[j].mysteryPlansizeY&&mysteryBullets[k].mysteryBulletimage.offsetTop+mysteryBullets[k].mysterymysteryBulletsizeY>=mysteryEnemyPlans[j].mysteryImageNode.offsetTop){
                        //敌机血量减子弹攻击力
                     
					 mysteryEnemyPlans[j].mysteryPlanhp=mysteryEnemyPlans[j].mysteryPlanhp-mysteryBullets[k].mysteryBulletAttach;
                     
					 //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
                    
					if(mysteryEnemyPlans[j].mysteryPlanhp==0){
						
                            scores=scores+mysteryEnemyPlans[j].mysteryPlanScoreText;
							
                            scorelabel.innerHTML=scores;
							
                            mysteryEnemyPlans[j].mysteryImageNode.src=mysteryEnemyPlans[j].mysteryPlantrunkImage;
							
                            mysteryEnemyPlans[j].mysteryPlanisDie=true;
                        }
						
                        //删除子弹
                        gameDiv.removeChild(mysteryBullets[k].mysteryBulletimage);
						
                            mysteryBullets.splice(k,1);
							
                            mysteryBulletslen--;
							
                            break;
                    }
                }
            }
        }
    }
}

// 开始游戏按钮点击事件
var set;

function startGame(){

    mysteryHomeDiv.style.display="none";
	
    gameDiv.style.display="block";
	
    mysterySelfPlan.mysteryImageNode.style.display="block";
	
    scoreDiv.style.display="block";
   // 调用开始函数
    set=setInterval(beginGame,20);
	
}

//游戏结束后点击继续按钮事件
function tryAgain(){
	
    location.reload(true);
}
