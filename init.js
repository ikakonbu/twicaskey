
function seteventlister(){
    alert("ちんちん");
}

window.addEventListener("load", function(){
    //create misskey setting html
    
    const checkboxhtml = '<span class="tw-popup-menu-trap"><input type="checkbox" name="misskeypost" id="misskeypost" checked=""><label for="misskeypost">Misskeyにも投稿</label></span>';
    const settinghtml =  '<div class="twicaskey-setting"><button clsss="close">x</button><h2>設定</h2><form><h3>投稿したいMisskeyのサーバー名</h3><input id="server" type="text"><h3>アクセストークン</h3><input id="token" type="text"><div><button class="savebtn">保存</button></div></form></div>'

    const setting_target= this.document.querySelector('.tw-comment-post-operations-secondary');
    setting_target.insertAdjacentHTML('afterbegin',checkboxhtml);

    const h2 = document.querySelector("#misskeypost");
    h2.checked = false;
    h2.addEventListener("click", function(){
        alert('ちんちん');
    });
});
