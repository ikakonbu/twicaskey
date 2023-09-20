window.addEventListener("load", function(){
    main();
});

function main(){
    const checkboxhtml = '<span class="tw-popup-menu-trap"><div class="twicaskey-setting"><div class="close"><button clsss="close">x</button></div><h2>設定</h2><div class="twicaskey-setting-body"><h3>投稿したいMisskeyのサーバー名</h3><input id="server" type="text"><h3>アクセストークン</h3><input id="token" type="text"></div><button class="savebtn">保存</button></div></form></div><input type="checkbox" name="misskeypost" id="misskeypost" checked=""><label for="misskeypost">Misskeyにも投稿</label></span>';
    const settinghtml =  '<div class="twicaskey-setting"><button clsss="close">x</button><h2>設定</h2><form><h3>投稿したいMisskeyのサーバー名</h3><input id="server" type="text"><h3>アクセストークン</h3><input id="token" type="password"><div><button class="savebtn">保存</button></div></form></div>'

    const setting_target= this.document.querySelector('.tw-comment-post-operations-secondary');
    setting_target.insertAdjacentHTML('afterbegin',checkboxhtml);

    const h2 = document.querySelector("#misskeypost");
    h2.checked = false;

    const username = document.querySelector('#comment-list-app');

    if(localStorage.getItem(username.dataset.broadcasterId + 'server') != null){
        document.querySelector(".twicaskey-setting #server").value = localStorage.getItem(username.dataset.broadcasterId + 'server');
    }

    if(localStorage.getItem(username.dataset.broadcasterId + 'token') != null){
        document.querySelector(".twicaskey-setting #token").value = localStorage.getItem(username.dataset.broadcasterId + 'token');
    }

    const savebutton = document.querySelector(".twicaskey-setting .savebtn");
    savebutton.addEventListener("click", function(){
        localStorage.setItem(username.dataset.broadcasterId + 'token', document.querySelector('.twicaskey-setting #token').value);
        localStorage.setItem(username.dataset.broadcasterId + 'server', document.querySelector('.twicaskey-setting #server').value);
    });

    document.querySelector(".tw-comment-post .tw-button-primary").addEventListener("click", function(){
        let text = document.querySelector(".tw-textarea").value;
        if(document.querySelector('#misskeypost').checked){
        fetch("https://" + localStorage.getItem(username.dataset.broadcasterId + 'server') + "/api/notes/create", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/json",
        },
        "body": "{\"visibility\":\"public\",\"text\":\"" +  text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.broadcasterId + 'token') + "\"}",
        "method": "POST",
        "credentials": "omit"
        });
        console.log("{\"visibility\":\"public\",\"text\":\"" + text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.broadcasterId + 'token') + "\"}");
        }
    });

    document.querySelector(".tw-comment-post-operations-secondary>a:last-child").addEventListener("click", function(){
        //コメントをポップアップ→ポップアップを消したときにイベントリスナと要素を再設定する
        const options = {
            childList: true,
            subtree: true, 
        }
        const observer = new MutationObserver(records => {
            main();
            observer.disconnect();
        });
        observer.observe(document.querySelector("#comment-list-app"), options);
    });
}