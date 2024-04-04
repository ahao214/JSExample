/*
* 该js模拟银行核心系统对个人信息及产品信息的校验和用户核心信息的修改
* */
/*
 * 模拟银行核心系统做金额密码校验及金额修改
 * */
var idcard = window.localStorage.getItem("id_card");//身份id
var prdCode = window.localStorage.getItem("prd_code");//产品id
var sessionData = strToJson(window.localStorage.getItem("sessionData"));//缓存数据
/*
 * 用户余额校验
 * */
function checkSelfMoney(buyMoney) {
    var checkFlag = false;
    $.each(sessionData.users, function (i, value) {
        console.log("id" + value.id)
        console.log("idcard" + idcard)
        if (idcard == value.id) {
            console.log("校验余额" + (parseFloat(value.balance) > parseFloat(buyMoney)))
            if (parseFloat(value.balance) > parseFloat(buyMoney)) {
                checkFlag = true;
            }
        }
    });
    return checkFlag
}
/*
 * 认购限额校验
 * */
function checkRGXE(buyMoney) {
    var checkFlag = false;
    var prd_rgxe = null;
    $.each(sessionData.finances, function (i, value) {
        if (prdCode == value.prd_code) {
            prd_rgxe = parseFloat(value.prd_rgsx);
        }
    });
    $.each(sessionData.users, function (i, value) {
        if (idcard == value.id) {
            $.each(sessionData.users[i], function (i1, value1) {
                if (sessionData.users[i].haveFinances == null) {
                    if (prd_rgxe >= parseFloat(buyMoney)) {
                        checkFlag = true;
                    }
                } else {
                    $.each(sessionData.users[i].haveFinances, function (i2, value2) {
                        if (value2.finance.prd_code == prdCode) {
                            if ((parseFloat(value2.finance.hasNum) + parseFloat(buyMoney)) <= prd_rgxe) {
                                checkFlag = true
                            }
                        } else {
                            if (prd_rgxe >= parseFloat(buyMoney)) {
                                checkFlag = true;
                            }
                        }
                    });
                }
            })
        }
    });


    return checkFlag;
}
/*
 * 产品余额校验
 * */
function checkPrdBalance(buyMoney) {
    var checkFlag = false;
    $.each(sessionData.finances, function (i, value) {
        if (prdCode == value.prd_code) {
            console.log("产品余额校验" + (parseFloat(value.prd_AMT) > parseFloat(buyMoney)))
            if (parseFloat(value.prd_AMT) > parseFloat(buyMoney)) {
                checkFlag = true;
            }
        }
    });
    return checkFlag;
}
/*
 * 交易密码校验
 * */
function checkTranPwd(pwd) {
    var checkFlag = false;
    $.each(sessionData.users, function (i, value) {
        if (idcard == value.id) {
            console.log("id" + value.id);
            console.log("pwd" + pwd);
            if (value.tran_pwd == pwd) {
                checkFlag = true;
            }
        }
    });
    return checkFlag;
}
/*
 * 购买并修改数据
 * */
    function doTran(buyMoney) {
    if (deductPrdMoney(buyMoney) && decuctUserBalance(buyMoney) && addPrdToUser(buyMoney)) {
        var b = confirm("交易成功，是否继续购买？");
        if (b == true) {
            window.location.href = "financeList.html";
        } else {
            window.location.href = "menuMain.html";
        }
    }
}
/*
 * 扣除产品剩余额度
 * */
function deductPrdMoney(buyMoney) {
    var checkFlag = false;
    $.each(sessionData.finances, function (i, value) {
        if (prdCode == value.prd_code) {
            sessionData.finances[i].prd_AMT = (parseFloat(value.prd_AMT) - parseFloat(buyMoney));
            checkFlag = true;
        }
    });
    return checkFlag;
}
/*
 * 扣除用户余额
 * */
function decuctUserBalance(buyMoney) {
    var checkFlag = false;
    $.each(sessionData.users, function (i, value) {
        if (idcard == value.id) {
            sessionData.users[i].balance = (parseFloat(value.balance) - parseFloat(buyMoney));
            checkFlag = true;
        }
    });
    return checkFlag;
}
/*
 * 添加或修改用户持有理财产品信息
 * */
function addPrdToUser(buyMoney) {
    var checkFlag = false;
    $.each(sessionData.users, function (i, value) {
        if (idcard == value.id) {
            if (value.haveFinances == null) {
                sessionData.users[i].haveFinances = [
                    {
                        "finance": {
                            "prd_code": prdCode,
                            "hasNum": buyMoney
                        }
                    }]
            } else {
                var num = 0;
                $.each(value.haveFinances, function (i1, value1) {
                    if (value1.finance.prd_code == prdCode) {
                        num += 1;
                        sessionData.users[i].haveFinances[i1].finance.hasNum = parseFloat(sessionData.users[i].haveFinances[i1].finance.hasNum) +
                            parseFloat(buyMoney);
                    }
                });
                if (num == 0) {
                    var finance = {
                        "finance": {
                            "prd_code": prdCode,
                            "hasNum": buyMoney
                        }
                    };
                    sessionData.users[i].haveFinances[sessionData.users[i].haveFinances.length] = finance;
                }
            }
            checkFlag = true;
        }
    });
    window.localStorage.setItem("sessionData", jsonToStr(sessionData));
    return checkFlag;
}
/*
 * 校验账户类型
 * */
function checkAccountType(accountType) {
    var checkFlag = false;
    accountType = accountType.substr(0, 2);
    $.each(sessionData.finances, function (i, value) {
        if (value.prd_code == prdCode) {
            if ((value.prd_tzlb).indexOf(accountType) > 0) {
                checkFlag = true
            }
        }
    });
    return checkFlag;
}
/*
 * 校验起购限额
 * */
function checkQGJE(buyMoney) {
    var checkFlag = false;
    $.each(sessionData.finances, function (i, value) {
        if (prdCode == value.prd_code) {
            if (parseFloat(buyMoney) > parseFloat(value.prd_qgje)) {
                checkFlag = true;
            }
        }
    });
    return checkFlag;
}
/*
 * 风险等级校验
 * */
function checkRiskLevel() {
    var checkFlag = false;
    var prdRiskLevel = null;
    var userRiskLevel=null;
    $.each(sessionData.finances, function (i, value) {
        if (prdCode == value.prd_code) {
            prdRiskLevel = value.prd_riskLevel;
        }
    });
    $.each(sessionData.users, function (i, value) {
        if (idcard == value.id) {
            userRiskLevel=value.riskLevel
        }
    });
    if(parseFloat(userRiskLevel)>=parseFloat(prdRiskLevel)){
        checkFlag=true
    }
    return checkFlag;
}

/*
* 风险评估
* */
function getRiskRes(obj){
    var cfg = $(obj).closest("body").find(".checked");
    var score=null;
    $.each(cfg,function(i,dom){
        var a = $(dom).attr("data-value");
        console.log($(dom).attr("data-value"));
        score = parseInt(a) + score;
        if(cfg.length-1 == i){
            if(score>15){
                $.each(sessionData.users, function (i, value) {
                    if(idcard==value.id){
                        console.log("本次评级分数为："+score);
                        sessionData.users[i].riskLevel="3";
                        var b = confirm("风险评估成功，您的风险等级为三级增长型，是否重新进行评估？")
                        if(b==true){
                            window.location.href = "riskAssessment.html";
                        }else{
                            window.location.href = "menuMain.html";
                        }
                    }
                })
            }
            if(10<score && score<=15){
                $.each(sessionData.users, function (i, value) {
                    if(idcard==value.id){
                        console.log("本次评级分数为："+score);
                        sessionData.users[i].riskLevel="2";
                        var b = confirm("风险评估成功，您的风险等级为二级平衡型，是否重新进行评估？");
                        if(b==true){
                            window.location.href = "riskAssessment.html";
                        }else{
                            window.location.href = "menuMain.html";
                        }
                    }
                })
            }
            if(score<=10){
                $.each(sessionData.users, function (i, value) {
                    if(idcard==value.id){
                        console.log("本次评级分数为："+score);
                        sessionData.users[i].riskLevel="1";
                        var b = confirm("风险评估成功，您的风险等级为一级稳健型，是否重新进行评估？");
                        if(b==true){
                            window.location.href = "riskAssessment.html";
                        }else{
                            window.location.href = "menuMain.html";
                        }
                    }
                })
            }
        }
    })
}