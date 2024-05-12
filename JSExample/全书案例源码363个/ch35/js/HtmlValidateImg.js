
/*
表单验证类
i@lishilin.cc
最后修改：2010-07-09
*/

//图标定义
var ERROR_MSG_ICON = "<img src='/Images/System/cha.jpg' align='absmiddle' width='16' height='16' border='0' />&nbsp;";
var LOADING_ICON="<img src='/Images/System/smallloading.gif' align='absmiddle' width='16' height='16' border='0' />&nbsp;";
var SUCCESS_MSG_ICON="<img src='/Images/System/dui.jpg' align='absmiddle' width='16' height='16' border='0' />&nbsp;";
//构造函数可传递的参数：
//1:要触发验证的按钮ID；2:按钮触发的验证成功后的回调函数；
function HtmlValidate() {
	this.SubmitBtn = "";
	this.BtnCallback = null;
	if(arguments[0] != undefined && arguments[0] != "")
	{
		this.SubmitBtn = $("#" + arguments[0]);
	}
	if(arguments[1] != undefined && arguments[1] != "" && typeof arguments[1] == "function" && this.SubmitBtn != undefined && this.SubmitBtn != null && this.SubmitBtn != "" && this.SubmitBtn.length > 0)
	{
		//绑定按钮触发
		this.BtnCallback = arguments[1];
	}
	//验证不能为空，可加长度限制
	this.AddTextBoxRequired=function(objID,msgObjID,msgTitle,maxLength,minLength) {
		this.ObjCollect.push({ type: "required",o: objID,m: msgObjID,mt: msgTitle,xl: maxLength,il: minLength });
	};
	//验证数字字符串不能为空，只能输入数字，并带有数字范围验证
	this.AddTextBoxNumberRequired=function(objID,msgObjID,msgTitle,maxValue,minValue) {
		this.ObjCollect.push({ type: "required-num",o: objID,m: msgObjID,mt: msgTitle,xv: maxValue,iv: minValue });
	};
	//验证字符串格式
	//参数：reg:要匹配的正则模式
	this.AddTextBoxRegular=function(objID,msgObjID,msgTitle,reg) {
		this.ObjCollect.push({ type: "regular",o: objID,m: msgObjID,mt: msgTitle,rule: reg });
	};
	//验证两个对象的值相等或不相等，仅在Obj2的Blur事件触发
	//isEqules：1表示比较两个对象的值是否相等，0表示比较两个对象的值是否不相等。
	this.AddCompare=function(obj1id,obj2id,msgObjID,message,isEqules) {
		this.ObjCollect.push({ type: "compare",equles: isEqules,o1: obj1id,o2: obj2id,m: msgObjID,msg: message });
	};
	//验证select是否选中了有效值
	//selector:select控件ID;disaValue：无效值
	this.AddSelected = function(selector,disaValue,msgObjID,message)
	{
		var sourceMsg = $("#" + msgObjID).html();
		this.ObjCollect.push({type:"selected",sel:selector,v:disaValue,m:msgObjID,msg:message,sm:sourceMsg});
	};
	//验证一组checkbox或radio至少选中了一个
	//objseltor:要验证的这组控件的选择器，不要加“:checked”
	//isradio:1表示要验证的控件组是radio控件组，0表示checkbox控件组
	this.AddChecked=function(objseltor,msgObjID,msgTitle,isradio) {
		var sourceMsg = $("#" + msgObjID).html();
		this.ObjCollect.push({ type: "checked",o: objseltor,m: msgObjID,mt: msgTitle,sm:sourceMsg,radio: isradio });
	};
	//验证一组输入控件至少要填写一个
	//msgObjID参数为消息显示的元素ID，msgTitle参数为提示信息的名词部分，第三个参数为要验证的输入控件ID数组
	this.AddTextBoxAlternative=function(msgObjID,msgTitle,objList) {
		var sourceMsg = $("#" + msgObjID).html();
		this.ObjCollect.push({ type: "alternative",m: msgObjID,mt: msgTitle,sm:sourceMsg,list: objList });
    };
    //身份证验证
    this.AddIDCardValidate = function(objID, msgObjID) {
        this.ObjCollect.push({type:"idcard",o:objID,m:msgObjID});
    }
	
	//自定义验证
	//func为自定义验证的匿名函数，必须返回true或false。message为错误信息内容
	this.AddCustomValidate=function(objID,msgObjID,message,func) {
		var sourceMsg = $("#" + msgObjID).html();
		this.ObjCollect.push({ type: "custom",o: objID,m: msgObjID,msg: message,sm:sourceMsg,fun: func });
	};
	//开始验证
	this.Run = function() {
	    if (this.ObjCollect.length <= 0) {
	        //没有任何控件
	        HtmlValidate.prototype.Result = true;
	        //所有表单都不需要验证
	        $("body form").each(function() { $(this).submit(function() { return true; }); });
	        return;
	    }
	    else {
	        if (this.SubmitBtn == undefined || this.SubmitBtn == null || this.SubmitBtn == "" || this.SubmitBtn.length == 0) {
	            var fobj;
	            if (this.ObjCollect[0].o)
	                fobj = $("#" + this.ObjCollect[0].o);
	            else if (this.ObjCollect[0].o1)
	                fobj = $("#" + this.ObjCollect[0].o1);
	            else if (this.ObjCollect[0].list[0])
	                fobj = $("#" + this.ObjCollect[0].list[0]);
	            else
	                fobj = $("#" + this.ObjCollect[0].m);
	            var forms = fobj.parents("form");
	            for (var j = 0; j < forms.length; j++) {
	                forms[j].onsubmit = function() {
	                    var ObjC = HtmlValidate.prototype.ObjCollect;
	                    if (ObjC.length <= 0)
	                        return true;
	                    var r = true;
	                    for (var i = 0; i < ObjC.length; i++) {
	                        if (ObjC[i].type == "required") {
	                            r = Required(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "required-num") {
	                            r = Required_Num(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "regular") {
	                            r = Regular(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "compare") {
	                            r = Compare(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "checked") {
	                            r = Checked(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "alternative") {
	                            r = Alternative(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "custom") {
	                            r = Custom(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "selected") {
	                            r = Selected(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "idcard") {
	                            r = Card(ObjC[i]) && r;
	                        }
	                    }
	                    return r;
	                };
	            }
	        }
	        else {
	            if (typeof this.SubmitBtn == "string") {
	                this.SubmitBtn = $("#" + this.SubmitBtn);
	            }
	            this.SubmitBtn[0].onclick = (function(func) {
	                return function() {
	                    var ObjC = HtmlValidate.prototype.ObjCollect;
	                    if (ObjC.length <= 0)
	                        return true;
	                    var r = true;
	                    for (var i = 0; i < ObjC.length; i++) {
	                        if (!r)
	                            break;
	                        if (ObjC[i].type == "required") {
	                            r = Required(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "required-num") {
	                            r = Required_Num(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "regular") {
	                            r = Regular(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "compare") {
	                            r = Compare(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "checked") {
	                            r = Checked(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "alternative") {
	                            r = Alternative(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "custom") {
	                            r = Custom(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "selected") {
	                            r = Selected(ObjC[i]) && r;
	                        }
	                        else if (ObjC[i].type == "idcard") {
	                            r = Card(ObjC[i]) && r;
	                        }
	                    }
	                    if (r)
	                        func();
	                };
	            })(this.BtnCallback);
	        }
	    }
	    //循环绑定控件事件
	    for (var i = 0; i < this.ObjCollect.length; i++) {
	        var x = this.ObjCollect[i];
	        switch (x.type) {
	            case "required":
	                {
	                    $("#" + x.o).blur((function(jsond) {
	                        var jd = jsond;
	                        var sm = $("#" + jd.m).text();
	                        return function() {
	                            var o = $("#" + jd.o);
	                            if (o.val().Trim() == "") {
	                                HtmlValidate.prototype.Result = false;
	                                $("#" + jd.m).html(ERROR_MSG_ICON );
	                                return;
	                            }
	                            else if (jd.xl > 0 && jd.il > 0) {
	                                var v = o.val();
	                                if (v.length > jd.xl || v.length < jd.il) {
	                                    $("#" + jd.m).html(ERROR_MSG_ICON );
	                                    HtmlValidate.prototype.Result = false;
	                                    return;
	                                }
	                            }
	                            $("#" + jd.m).html(SUCCESS_MSG_ICON);
	                            HtmlValidate.prototype.Result = true && HtmlValidate.prototype.Result;
	                        }
	                    })(x));
	                }
	                break;
	            case "required-num":
	                {
	                    $("#" + x.o).blur((function(jsond) {
	                        var jd = jsond;
	                        var sm = $("#" + jd.m).text();
	                        return function() {
	                            var o = $("#" + jd.o);
	                            if (o.val().Trim() == "") {
	                                HtmlValidate.prototype.Result = false;
	                                $("#" + jd.m).html(ERROR_MSG_ICON );
	                                return;
	                            }
	                            else if (isNaN(o.val().Trim())) {
	                                HtmlValidate.prototype.Result = false;
	                                $("#" + jd.m).html(ERROR_MSG_ICON );
	                                return;
	                            }
	                            else {
	                                var w = parseInt(o.val().Trim(), 10);
	                                if (w < jd.iv || w > jd.xv) {
	                                    HtmlValidate.prototype.Result = false;
	                                    $("#" + jd.m).html(ERROR_MSG_ICON );
	                                    return;
	                                }
	                            }
	                            $("#" + jd.m).html(SUCCESS_MSG_ICON);
	                            HtmlValidate.prototype.Result = true && HtmlValidate.prototype.Result;
	                        }
	                    })(x));
	                }
	                break;
	            case "regular":
	                {
	                    $("#" + x.o).blur((function(jsond) {
	                        var jd = jsond;
	                        var sm = $("#" + jd.m).text();
	                        return function() {
	                            var o = $("#" + jd.o);
	                            if (o.val().Trim() == "") {
	                                HtmlValidate.prototype.Result = true;
	                                return;
	                            }
	                            if (o.val().match(jd.rule) == null) {
	                                HtmlValidate.prototype.Result = false;
	                                $("#" + jd.m).html(ERROR_MSG_ICON );
	                                return;
	                            }
	                            $("#" + jd.m).html(SUCCESS_MSG_ICON);
	                            HtmlValidate.prototype.Result = true && HtmlValidate.prototype.Result;
	                        }
	                    }
						)(x));
	                }
	                break;
	            case "compare":
	                {
	                    $("#" + x.o1 + ",#" + x.o2).blur((function(jd) {
	                        var sm = $("#" + jd.m).text();
	                        return function() {
	                            var o2 = $("#" + jd.o2);
	                            var o1 = $("#" + jd.o1);

	                            if (jd.equles) {
	                                if (o1.val() != o2.val()) {
	                                    HtmlValidate.prototype.Result = false;
	                                    $("#" + jd.m).html(ERROR_MSG_ICON );
	                                    return;
	                                }
	                            }
	                            else {
	                                if (o1.val() == o2.val()) {
	                                    HtmlValidate.prototype.Result = false;
	                                    $("#" + jd.m).html(ERROR_MSG_ICON );
	                                    return;
	                                }
	                            }
	                            $("#" + jd.m).html(SUCCESS_MSG_ICON);
	                            HtmlValidate.prototype.Result = true && HtmlValidate.prototype.Result;
	                        }
	                    })(x));
	                }
	                break;
	            case "checked":
	                //无控件触发条件
	                break;
	            case "alternative":
	                //无控件触发条件
	                break;
	            case "custom":
	                {
	                    $("#" + x.o).blur((function(jd) {
	                        var sm = jd.sm;
	                        return function() {
	                            if (!jd.fun()) {
	                                HtmlValidate.prototype.Result = false;
	                                $("#" + jd.m).html(ERROR_MSG_ICON );
	                                return;
	                            }
	                            $("#" + jd.m).html(SUCCESS_MSG_ICON);
	                            HtmlValidate.prototype.Result = true && HtmlValidate.prototype.Result;
	                        };
	                    })(x));
	                }
	                break;
	            case "selected":
	                {
	                    $("#" + x.sel).blur(
							(function(jd) {
							    return function() {
							        v1 = $("#" + jd.sel + " option:selected").val();
							        if (v1 == jd.v) {
							            HtmlValidate.prototype.Result = false;
							            $("#" + jd.m).html(ERROR_MSG_ICON );
							            return;
							        }
							        $("#" + jd.m).html(SUCCESS_MSG_ICON);
							        HtmlValidate.prototype.Result = true && HtmlValidate.prototype.Result;
							    }
							})(x));
	                }
	                break;
	            case "idcard":
	                {
	                    $("#" + x.o).blur((function(jsond) {
	                        var jd = jsond;
	                        var sm = $("#" + jd.o).text();
	                        return function() {
	                            var o = $("#" + jd.o);
	                            var result = idcard(o.val().Trim());
	                            if (o.val().Trim() == "") {
	                                HtmlValidate.prototype.Result = false;
	                                $("#" + jd.m).html(ERROR_MSG_ICON );
	                                return;
	                            }
	                            else if (result == "-1") {
	                                HtmlValidate.prototype.Result = false;
	                                $("#" + jd.m).html(ERROR_MSG_ICON );
	                                return;
	                            } else if (result == "-2") {
	                                HtmlValidate.prototype.Result = false;
	                                $("#" + jd.m).html(ERROR_MSG_ICON );
	                                return;
	                            }
	                            $("#" + jd.m).html(SUCCESS_MSG_ICON);
	                            HtmlValidate.prototype.Result = true && HtmlValidate.prototype.Result;
	                        }
	                    })(x));
	                }
	        }
	    }
	};
	
	function Required(json)
	{
		if(json == null || json == {})
			return false;
		var o = $("#" + json.o);
		if(o.val().Trim()=="") {
			$("#"+json.m).html(ERROR_MSG_ICON);
			return false;
		}
		else {
			var v=o.val();
			if( (json.xl > 0 && json.il > 0) && (v.length>json.xl||v.length<json.il)) {
				$("#"+json.m).html(ERROR_MSG_ICON);
				return false;
			}
		}
		return true;
	}
	
	function Required_Num(jd)
	{
		if(jd == null || jd == {})
			return false;
		var o=$("#" + jd.o);
		if(o.val().Trim()=="") {
			$("#"+jd.m).html(ERROR_MSG_ICON);
			return false;
		}
		else if(isNaN(o.val().Trim())) {
			$("#"+jd.m).html(ERROR_MSG_ICON);
			return false;
		}
		else {
			var w=parseInt(o.val().Trim(),10);
			if(w<jd.iv||w>jd.xv) {
				$("#"+jd.m).html(ERROR_MSG_ICON);
				return false;
			}
		}
		return true;
	}
	
	function Regular(jd)
	{
		if(jd == null || jd == {})
			return false;
		var o=$("#" + jd.o);
		if(o.val().Trim() == "")
			return true;
		if(o.val().match(jd.rule) == null) {
			$("#"+jd.m).html(ERROR_MSG_ICON);
			return false;
		}
		return true;
	}
	
	function Compare(jd)
	{
		var o2=$("#" + jd.o2);
		var o1=$("#"+jd.o1);
							
		if(jd.equles) {
			if(o1.val()!=o2.val()) {
				$("#"+jd.m).html(ERROR_MSG_ICON);
				return false;
			}
		}
		else {
			if(o1.val()==o2.val()) {
				$("#"+jd.m).html(ERROR_MSG_ICON);
				return false;
			}
		}
		return true;
	}
	
	function Checked(jd)
	{
		var list = $(jd.o+":checked")
		if(list.length<=0) {
			if(jd.radio)
				$("#"+jd.m).html(ERROR_MSG_ICON);
			else
				$("#"+jd.m).html(ERROR_MSG_ICON);
			return false;
		}
		$("#" + jd.m).html(SUCCESS_MSG_ICON);
		return true;
	}
	
	function Alternative(jd)
	{
		if(jd.list.length<=0) {
		    $("#" + jd.m).html(SUCCESS_MSG_ICON);
			return true;
		}
		var count=0;
		for(var j=0;j<jd.list.length;j++) {
			if($("#"+jd.list[j]).val().Trim()!="")
				count++;
		}
		if(count<=0) {
			$("#"+jd.m).html(ERROR_MSG_ICON);
			return false;
		}
		$("#" + jd.m).html(SUCCESS_MSG_ICON);
		return true;
	}
	
	function Custom(jd)
	{
		var r=jd.fun;
		if(!r()) {
			$("#"+jd.m).html(ERROR_MSG_ICON);
			return false;
		}
		$("#" + jd.m).html(SUCCESS_MSG_ICON);
		return true;
	}
	
	function Selected(jd)
	{
		v1 = $("#" + jd.sel + " option:selected").val();
		if(v1 == jd.v)
		{
			$("#"+jd.m).html(ERROR_MSG_ICON);
			return false;
		}
		$("#" + jd.m).html(SUCCESS_MSG_ICON);
		return true;
    }
	
	function Card(jd) { 
        var sm = $("#" + jd.o).text();
        var o = $("#" + jd.o);
        var result = idcard(o.val().Trim());
        if (o.val().Trim() == "") {
            $("#" + jd.m).html(ERROR_MSG_ICON);
            return false;
        }
        else if (result == "-1") {
            $("#" + jd.m).html(ERROR_MSG_ICON);
            return false;
        } else if (result == "-2") {
            $("#" + jd.m).html(ERROR_MSG_ICON);
            return false;
        }
        $("#" + jd.m).html(SUCCESS_MSG_ICON);
        return true;
	}
}
HtmlValidate.prototype.Result=false;
HtmlValidate.prototype.ObjCollect = new Array();