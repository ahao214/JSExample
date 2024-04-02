$(function(){
	var moveUp = function(){
		//向上移动子项目
		var link = $(this),
			dl = link.parents("dl"),
			prev = dl.prev("dl");	
		if(link.is(".up") && prev.length > 0)
			dl.insertBefore(prev);
	};
	
	var addItem = function(){
		//添加一个子项目
		var sortable = $(this).parents(".ui-sortable");
		var options = '<span class="options"><a class="up"><img src="up.gif" border="0"></a></span>';
		var html = '<dl class="sort"><dt>Dynamic name'+options+'</dt><dd>Description</dd></dl>';
		sortable.append(html).sortable("refresh").find("a.up").bind("click", moveUp);
	};
	
	var emptyTrashCan = function(item){
		//回收站
		item.remove();
	};
	
	var sortableChange = function(e, ui){
		//拖拽子项目
		if(ui.sender){
			var w = ui.element.width();
			ui.placeholder.width(w);
			ui.helper.css("width",ui.element.children().width());
		}
	};
	
	var sortableUpdate = function(e, ui){
		//更新模块（用户回收站清空后）
		if(ui.element[0].id == "trashcan"){
			emptyTrashCan(ui.item);
		}
	};
	
	$(function(){
		//引用主页面中的所有块
		var els = ['#header', '#content', '#sidebar', '#footer', '#trashcan'];
		var $els = $(els.toString());
		
		//动态添加“增加子项目”、“向上移动”按钮
		$("h2", $els.slice(0,-1)).append('<span class="options"><a class="add"><img src="add.gif" border="0"></a></span>');
		$("dt", $els).append('<span class="options"><a class="up"><img src="up.gif" border="0"></a></span>');
		
		//绑定相关事件
		$("a.add").bind("click", addItem);
		$("a.up").bind("click", moveUp);
		
		//使用jQuery插件
		$els.sortable({
			items: '> dl',	//拖拽对象
			handle: 'dt',	//可触发该事件的对象
			cursor: 'move',	//鼠标样式
			opacity: 0.8,	//拖拽时透明
			appendTo: 'body',
			connectWith: els,
			start: function(e,ui) {
				ui.helper.css("width", ui.item.width());
			},
			change: sortableChange,
			update: sortableUpdate		//用于回收站
		});
	});
});