// 提示框
$("#name").focus(function(){
    $("#fl-div").css("display","block");
}).focusout(function(){
    $("#fl-div").css("display","none");
});

$("#pwd").focus(function(){
    $("#fl-pwd").css("display","block");
});