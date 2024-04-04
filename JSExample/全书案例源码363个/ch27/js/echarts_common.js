	/**
     * @param chartName 图名
	 * @param data数据
	 * @param type图表类型
	 * @param 文本
     * */
    function drawBarChart(chartName,data,type,titleText) {
        var mapOptions = createBarChartOptions(data,type,titleText);		
		chartName.clear();
        chartName.setOption(mapOptions, true); //画图
    }
    /**@desc 柱状图配置数据 公共方法
     * @param data 柱状图数据
     */
    function createBarChartOptions(data,type,titleText) {
		var series = setSeriesData(data,type);  
        var xObj = {
            type: 'category',
            data: data.legend,
			boundaryGap: false,
			splitLine:{show: true},//去除网格线
           // splitArea : {show : true},//保留网格区域	
            axisLabel: {
                interval: 0,
                rotate: 25,
            },
            axisLine: {
				lineStyle: {
					type: 'solid',
					color: '#000',//左边线的颜色
					width:'2'//坐标线的宽度
				}
            }
            //splitLine: {show: true},
            //axisLabel: {textStyle: {color: '#ddd'}}
        };
        var yObj = {
        		type: 'value',			
				//splitLine:{show: true},//去除网格线
				//splitArea : {show : true},//保留网格区域
				 axisLabel : {
					formatter: '{value}'
				},
				axisLine: {					
					lineStyle: {
						type: 'solid',
						color: '#000',//左边线的颜色
						width:'2'//坐标线的宽度
					}
				}
			};
        var option = {
        		title : {
					text: titleText,
					//subtext: '',
					x:'center'
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [xObj],
				yAxis: [yObj],
				legend: {
					/*x : 'right',//设置title位置 right 右边，默认 top
					y : 'center',*/
					x : 'center',
					y : 'bottom',
					orient : 'horizontal',//平铺
					/*textStyle: {
						fontSize: 12
					},*/
					data: data.gtitle
				},
				grid:{
			      x:50			//设置图形偏离
			      //right:'30%' //图空间距离右边
			    },
				series:series
			};
			return option;
    }	
	/***
	 *设置seriesData数据
	 ***/
	function setSeriesData(data,type){
		var series=[];
		for(var serieskey in data.seriesData){
			var key = serieskey;
			var titleName = serieskey;
			var seriesData = data.seriesData[key];
			console.log("key:"+key+"--seriesData:"+JSON.stringify(seriesData));	
			series.push({
				name: titleName,
				type: 'line',
				//smooth: true,//是否曲线
				label: {
					normal: {
						show: true,
						position: 'top'	//显示数据内容在折线上方
					}
				},
				barCategoryGap: '50%',
				clickable: false,				
				data: seriesData
			});
		}
		return series;
	}