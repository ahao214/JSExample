if (pusername != '') {
    $("#txtPromoter").val(pusername).attr("readonly", "readonly");
}
var id = function(o) { return document.getElementById(o) }
var scroll = function(o) {
    // var space=id(o).offsetTop;
    var space = 307;
    id(o).style.top = space + 'px';
    void function() {
        var goTo = 0;
        var roll = setInterval(function() {
            var height = document.documentElement.scrollTop + document.body.scrollTop + space;
            var top = parseInt(id(o).style.top);
            if (height != top) {
                goTo = height - parseInt((height - top) * 0.9);
                id(o).style.top = goTo + 'px';
            }
            //else{if(roll) clearInterval(roll);}
        }, 50);
    } ()
}
scroll('qucikRegDiv');
scroll('qucikRegDiv1');

var vali = new HtmlValidate("btnSubmit", OnSubmit);
vali.AddTextBoxRequired("txtUserName","spanUserName","游戏帐号",12,6);
vali.AddTextBoxRegular("txtUserName", "spanUserName", "游戏帐号", "[0-9a-zA-Z]{6,12}");
vali.AddTextBoxRequired("txtNickName","spanNickName","昵称",10,2);
vali.AddTextBoxRequired("txtPassword", "spanPassword", "登录密码", 16, 6);
vali.AddTextBoxRequired("txtValidate", "spanValidate", "验证码", 4, 4);
vali.Run();

//提交按钮事件
function OnSubmit() {
	$("#btnSubmit").css("display", "none");
	$("#btnSubmit").after("<li id='spanLoading'>" + LOADING_ICON + "正在提交，请稍候..." + "</li>");

	$.post(
		"/Members/MembersHandler.ashx?action=reg&x=" + Math.random(),
		{
			username:	$("#txtUserName").val().Trim(),
			nickname:	$("#txtNickName").val().Trim(),
			password:	$("#txtPassword").val().Trim(),
			sex: $("input[name=sex]:checked").val().Trim(),
			truename: "",
			idc: "",
			validate:	$("#txtValidate").val().Trim(),
			domailname: domialname,
			//以下为非必填项
			promoter:	$("#txtPromoter").val().Trim()		
		},
		function(data) {
			if (data == "success") {
				alert("注册成功！");
				location.href = "/Down.aspx";
			}
			else {
				$("#spanLoading").remove();
				$("#btnSubmit").css("display", "inline");
				//Msg("注册发生错误，错误信息：\r\n" + data, 300);
				document.getElementById("errormsg").innerHTML = data
				$("#imgValidate").attr("src", '/Public/Validate.ashx?x=' + Math.random());
			}
		}
	);
}
function IsEtis() {
    $.post(
		"/Members/MembersHandler.ashx?action=isusername&x=" + Math.random(),
		{
		    username: $("#txtUserName").val().Trim(),
		    type: "1"
		},
		function(data) {
		    if (data == "success") {
		        document.getElementById("spanUserName").innerHTML = "<img src='/Images/System/dui.jpg' align='absmiddle' width='16' height='16' border='0' />";
		    } else {
		    document.getElementById("spanUserName").innerHTML = "<img src='/Images/System/cha.jpg' align='absmiddle' width='16' height='16' border='0' />";
		    }
		}
	);
}
