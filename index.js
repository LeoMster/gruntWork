$(function(){
    $("#register").click(function(){
        if(!check("#name") || !check("#telephone") || !check("#pwd") || !check("#code")) return;
    });
    
    var msgArr  = [true,true,true];

    function check(para){
        var iptId = para;

        $(iptId+"-msg").html("");
        for(var i = 0;i < msgArr.length;i++){
            $("#sp"+i).html("");
        }

        switch(iptId){
            case "#name":
                nameCheck("用户名",iptId);
                break;
            case "#telephone":
                phoneCheck("手机号",iptId);
                break;
            case "#pwd":
                pwdCheck("密码",iptId,msgArr);
                break;
            case "#code":
                codeCheck("验证码",iptId);
                break;
            default:
                return;
        }
        return true;
    }

    // 用户名要求
    function nameCheck(text,iptId){
        if($(iptId).val() === ""){
            $(iptId+"-msg").html(text+"不能为空");
            return null;
        }else{
            if(!(/^(?!(\d+)$)[\u4e00-\u9fff\w]+$/.test($(iptId).val()))){
                $(iptId+"-msg").html("用户名仅支持中英文、数字和下划线且不能为纯数字");
                return false;
            }else{
                var chNum   = $(iptId).val().match(/[\u4E00-\u9FA5]/g),
                    num     = $(iptId).val().length;

                if(chNum === null){ chNum = 0 }else{ chNum = chNum.length }
                
                if(2*chNum + num - chNum > 14 || chNum > 7){
                    $(iptId+"-msg").html("用户名不能超过7个汉字或14个字符");
                    return false;
                }
            }            
        }
    }

    // 手机号格式
    function phoneCheck(text,iptId){
        if($(iptId).val() === ""){
            $(iptId+"-msg").html(text+"不能为空");
            return null;
        }else{
            if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test($(iptId).val()))){
                $(iptId+"-msg").html("手机号码格式不正确");
                return false;
            }
        }
    }

    // 密码要求
    function pwdCheck(text,iptId){
        if($(iptId).val() === ""){
            $(iptId+"-msg").html(text+"不能为空");
            return null;
        }else{
            var chNum   = $(iptId).val().match(/[\u4E00-\u9FA5]/g),
                num     = $(iptId).val().length,
                isTrue  = undefined;
            
            if(chNum === null){ chNum = 0 }else{ chNum = chNum.length }

            var len = 2*chNum + num - chNum;

            for(var i = 0;i < msgArr.length;i++){
                switch(i){
                    case 0:
                        // 长度为8~14个字符
                        if(len < 8 || len > 14){
                            msgArr[0] = false;
                            $(iptId+"-msg").html("密码设置不符合要求");
                            isTrue = false;
                        }
                        break;
                    case 1:
                        // 字母/数字以及标点符号至少包含2种
                        if(!(/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{1,14}$/.test($(iptId).val().replace(/\s/g,"").replace(/[\u4e00-\u9fa5]/g,"")))){
                            msgArr[1] = false; 
                            $(iptId+"-msg").html("密码设置不符合要求");
                            isTrue = false;
                        }
                        break;
                    case 2:
                        // 不允许有空格、中文
                        if($(iptId).val().indexOf(" ") > -1 || $(iptId).val().match(/[\u4E00-\u9FA5]/g) !== null){
                            msgArr[2] = false;
                            $(iptId+"-msg").html("密码设置不符合要求");
                            isTrue = false;
                        }
                        break;
                    default:
                        return;
                }
            }
            
            // 提示信息
            for(var i = 0;i < msgArr.length;i++){
                if(!msgArr[i]){
                    switch(i){
                        case 0:
                            $("#sp"+i).html("x");
                            break;
                        case 1:
                            $("#sp"+i).html("x");
                            break;
                        case 2:
                            $("#sp"+i).html("x");
                            break;
                        default:
                            return;
                    }
                }else{
                    switch(i){
                        case 0:
                            $("#sp"+i).html("✓");
                            break;
                        case 1:
                            $("#sp"+i).html("✓");
                            break;
                        case 2:
                            $("#sp"+i).html("✓");
                            break;
                        default:
                            return;
                    }
                }
            }
            return isTrue;
        }
    }

    // 验证码要求
    function codeCheck(text,iptId){
        if($(iptId).val() === ""){
            $(iptId+"-msg").html(text+"不能为空");
            return null;
        }
    }

    // 验证码效果
    $("#code-btn").click(function(){
        var num = 25;

        $("#code-msg").html("");
        var timer = setInterval(function(){
            num = num-1;
            $("#code-btn").attr("value",num);
            if(num === 0){
                $("#code-msg").html("请求超时,请稍后再试");
                $("#code-btn").attr("value","获取验证码");
                num = 25;
                clearInterval(timer);
            }
        },1000);     
    });

    // 字段检验
    function focusOutCheck(text,para,fun){
        $(para).focusout(function(){
            if(para === "#pwd"){
                    $("#fl-pwd").css("display","none");
            }
            if($(para).val() !== "" && fun(text,para) === false){
                $(para).select();
            }else{
                $(para+"-msg").html("");
            }
        }); 
    }

    focusOutCheck("用户名","#name",nameCheck);
    focusOutCheck("手机号","#telephone",phoneCheck);
    focusOutCheck("验证码","#code",codeCheck);
    focusOutCheck("密码","#pwd",pwdCheck);

    // 实时监控
    function focusOnCheck(text,para,fun){
        $(para).bind("input propertychange",function(){
            if($(para).val() === ""){
                for(var i = 0;i < msgArr.length;i++){
                    $("#sp"+i).html("");
                }
            }else{
                for(var i = 0;i < msgArr.length;i++){
                    msgArr[i] = true;
                }
                fun(text,para);
            }
        });
    }
    focusOnCheck("密码","#pwd",pwdCheck);
});