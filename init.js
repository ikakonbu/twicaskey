window.addEventListener("load", function(){
    main();
});

function main(){
    const checkboxhtml = '<span class="tw-popup-menu-trap"><div class="twicaskey-setting"><div class="close"><button clsss="close">x</button></div><h2>設定</h2><div class=warningtext>トークン設定がありません<br>misskeyに投稿する場合は設定してください</div><div class="twicaskey-setting-body"><h3>投稿したいMisskeyのサーバー名</h3><input id="server" type="text"><h3>アクセストークン</h3><input id="token" type="password"></div><button class="savebtn">保存</button></div></form></div><input type="checkbox" name="misskeypost" id="misskeypost" checked=""><label for="misskeypost">Misskeyにも投稿</label></span>';
    const settinghtml = '<button id="twicaskey-settingbtn">Misskey設定</button>';
    const stylehtml =  '<style>@import  url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css");  .twicaskey-setting  {  background:  rgba(250,250,250,1);  padding:  1em;  position:  absolute;  z-index:  999;  border-radius:  7px;  box-shadow:  0  0  10px  0  rgba(0,0,0,0.3);  width:  220px;  top:  30px;  opacity:  0;  transform:  scale(0.4);  transition:  ease-in-out  0.6s;  &  .warningtext{  position:  static;  margin-top:  0.6em;  color:  #cf2929;  white-space:  normal;  overflow-wrap:  normal;  word-break:  break-all;  }  &  input  {  border:  solid  1px  rgb(200,200,200);  border-radius:  4px;  }  &  h2  {  margin-top:  0.3em;  color:  #444;  font-size:  18px;  }  &  h2:before{  content:"\eb20";  font-family:  "tabler-icons";  font-weight:  300;  margin-right:  0.3em;  }  &  h3  {  font-size:  12px;  margin-top:  0.8em;  font-weight:  500;  color:  #444;  }  &  .close  {  opacity:  1;  }  &  .close  button{  background:  none;  font-family:  "tabler-icons";  font-weight:  800;  opacity:  0.8;  }  &  button{  color:  #ff0000;  }  &  .savebtn{  background:  var(--color-primary);  color:  var(--color-text-white-1);  padding:  0.4em  0.8em;  border-radius:  3px;  }  &  button  {  border:  none;  }  &  .twicaskey-setting-body{  margin:  1em  0;  }  }  .twicaskey-setting.show{  opacity:  1;  transform:  scale(1)  ;  transition:  ease-out  0.3s;  } #twicaskey-settingbtn { border: solid 1px #aaa; border-radius: 4px;}</style>'
    const setting_target= this.document.querySelector('.tw-comment-post-operations-secondary');
    const style_target = document.querySelector('body');
    setting_target.insertAdjacentHTML('afterbegin',checkboxhtml);
    setting_target.insertAdjacentHTML('beforeend',settinghtml);
    style_target.insertAdjacentHTML('afterbegin',stylehtml);

    const h2 = document.querySelector("#misskeypost");
    h2.checked = false;

    const username = document.querySelector('#comment-list-app');

    const savebutton = document.querySelector(".twicaskey-setting .savebtn");
    savebutton.addEventListener("click", function(){
        localStorage.setItem(username.dataset.broadcasterId + 'token', document.querySelector('.twicaskey-setting #token').value);
        localStorage.setItem(username.dataset.broadcasterId + 'server', document.querySelector('.twicaskey-setting #server').value);
        document.querySelector(".twicaskey-setting").classList.remove("show");
    });

    const closebutton = document.querySelector(".twicaskey-setting .close button");
    closebutton.addEventListener("click", function(){
        document.querySelector(".twicaskey-setting").classList.remove("show");
    });

    const settingbutton = document.querySelector("#twicaskey-settingbtn");
    settingbutton.addEventListener("click", function(){
        settinginit();
        document.querySelector(".twicaskey-setting").classList.add("show");
    });

    const postcheck = document.querySelector("#misskeypost");
    postcheck.addEventListener("click", function(){
        if(localStorage.getItem(username.dataset.broadcasterId + 'token') != null && localStorage.getItem(username.dataset.broadcasterId + 'token') != ""){
          console.log('なにもしない');
        } else {
          this.checked = false;
          settinginit();
          document.querySelector(".twicaskey-setting").classList.add("show");
        }
    });

    document.querySelector(".tw-comment-post .tw-button-primary").addEventListener("click", function(){
        let text = document.querySelector(".tw-textarea").value;
        text += ''
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

    document.querySelectorAll('.tw-comment-post-operations-secondary>a')[1].addEventListener("click", function(){
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

function settinginit(){
    let flag=false;
    const username = document.querySelector('#comment-list-app');
    if(localStorage.getItem(username.dataset.broadcasterId + 'token') != null && localStorage.getItem(username.dataset.broadcasterId + 'token') != ""){
        document.querySelector(".twicaskey-setting #token").value = localStorage.getItem(username.dataset.broadcasterId + 'token');
    } else {
        document.querySelector(".twicaskey-setting #token").value = "";
        flag=true;
    }
    if(localStorage.getItem(username.dataset.broadcasterId + 'server') != null && localStorage.getItem(username.dataset.broadcasterId + 'server') != ""){
        document.querySelector(".twicaskey-setting #server").value = localStorage.getItem(username.dataset.broadcasterId + 'server');
    } else {
        document.querySelector(".twicaskey-setting #server").value = "";
        flag=true;
    }

    if(flag==true){
        document.querySelector('.twicaskey-setting .warningtext').classList.add("show");
    } else {
        document.querySelector('.twicaskey-setting .warningtext').classList.remove("show");
    }
}