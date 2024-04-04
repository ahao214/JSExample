/*
* 该js是该项目的工具方法的集合
* */

function replacer(key, value) {
    if (typeof value === 'number' && !isFinite(value)) {
        return String(value);
    }
    return value;
}
/*
* @param jsonData json类型数据
* */
function jsonToStr(jsonData) {
    var myJSONText = JSON.stringify(jsonData, replacer);
    return myJSONText;
}
/*
 * @param jsonStr json格式字符串
 * */
function strToJson(jsonStr) {
    var myData = JSON.parse(jsonStr, function(key, value) {
        return key.indexOf('date') >= 0 ? new Date(value) : value;
    });
    return myData;
}
/**
 * 格式化金额
 * @param v 原始金额
 * @param c 小数点后保留为数（默认为2）
 * @param d 小数点
 * @param t 整数区千位分割（默认为逗号）
 * @returns {string}
 */
function fmtMoney(v, c, d, t) {
    v = v + "";
    v = v.replace(/,/g, "");
    v *= 1;
    var p = v < 0 ? '-' : '';
    c = c || 2;
    v = v.toFixed(c);
    c = Math.abs(c) + 1 ? c : 2;
    d = d || '.';
    t = t || ',';
    var m = (/(\d+)(?:(\.\d+)|)/.exec(v + ''));
    x = m[1].length > 3 ? m[1].length % 3 : 0;
    return p + (x ? m[1].substr(0, x) + t : '')
        + m[1].substr(x).replace(/(\d{3})(?=\d)/g, '$1' + t)
        + (c ? d + (+m[2] || 0).toFixed(c).substr(2) : '');
}
/*
* 获取某月的前n个月
* */
function getMonth(month,n){
    month= month-n<=0?(month+12-n):month-n;
    return (month<10 ? "0"+month:month)+"月"
}