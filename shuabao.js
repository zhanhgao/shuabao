"ui";


ui.layout(
    <vertical>
    
        <appbar>
            <toolbar title="翻页吧！"/>
        </appbar>
        
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
        
        <frame height="200" gravity="center">
            <text text="相关配置如下👇" gravity="center"/>
        </frame>
        
        <vertical>
            <button id="shuab" text="刷宝短视频" />
            <button id="kuais" text="快手极速版" />
            <button id="huos" text="火山极速版" />
            <button id="weis" text="微视" />
            <button id="douy" text="抖音极速版" />
        </vertical>
    </vertical>
);


ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

// 事件绑定
ui.kuais.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    toast("权限不足！");
});
ui.huos.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    toast("权限不足！");
});
ui.weis.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    toast("权限不足！");
});
ui.douy.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    toast("权限不足！");
});
ui.shuab.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    runShuaBao();
});




// 启动刷宝
function runShuaBao(){
    threads.start(function() {
        launchApp("刷宝短视频");
        sleep(2000);
        setScreenMetrics(1080,1920);
        waitForActivity("com.jm.video.ui.main.MainActivity");
        toastLog("starting");
        sleep(1000);
        var current = 0,
            maxNum = 20000;//滑动次数


        // 上滑操作
        function huaping(){
            
            //随机等待时间random（最小值，最大值）根据需要更改数值（单位秒）
            var time_random=random(5,10)*1000;

            // 点击
            try {
                click("首页");    
            } catch (error) {
                console.log(error)
            }
            

            // 20000次 返回home页
            if(current > 20000){
                toastLog("退出中...");
                exit();
                home();
            }

            //提示等待时间。
            toastLog(time_random+'毫秒后刷新');
            sleep(time_random);
            current+=1;
        }

        // 开始循环上滑
        while(current<maxNum){
            huaping();
        }
    })
}