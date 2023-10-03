

window.addEventListener("load", function(){
    window.setTimeout(main,500)
});

function main(){
    //HTMLの準備
    const checkboxhtml = '<span class="tw-popup-menu-trap"><div class="twicaskey-setting"><div class="close"><button clsss="close">x</button></div><h2>設定</h2><div class=warningtext>トークン設定がありません<br>misskeyに投稿する場合は設定してください</div><div class="twicaskey-setting-body"><h3>投稿したいMisskeyのサーバー名</h3><input id="server" type="text"><h3>アクセストークン</h3><input id="token" type="password"><h3>URLを投稿の最後に添付する</h3><input id="addurl" type="checkbox"><h3>公開範囲</h3><select id="visibility" name="example">    <option>パブリック</option>    <option>ホーム</option>    <option>フォロワー</option></select></div><button class="savebtn">保存</button></div></form></div><input type="checkbox" name="misskeypost" id="misskeypost" checked=""><label for="misskeypost">Misskeyにも投稿</label></span>';
    const settinghtml = '<button id="twicaskey-settingbtn">Misskey設定</button>';
    const bloadcasthtml = '<label class="twicaskey-connect"><span class="tw-popup-menu-trap"><input type="checkbox" name="misskeypost2" id="misskeypost2" checked=""> Misskeyにも投稿</span></label><button id="twicaskey-settingbtn2">Misskey設定</button>';
    const popuphtml = '<div id="twicaskey-notice">投稿中...</div>';
    const stylehtml =  '<style>@import  url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css");  .twicaskey-setting  {  background:  #FDFBF7;  padding:  1em  1em  1.5em;  position:  absolute;  z-index:  99999;  border-radius:  7px;  box-shadow:  0  0  10px  0  rgba(0,0,0,0.3);  width:  220px;  top:  30px;  opacity:  0;  transform:  scale(0.4);  transition:  ease-in-out  0.6s;  &  input  {  background:  #FFFFFF;  border:  solid  1px  rgba(160,160,160,0.3)  !important;  }  &  input[type="checkbox"]{  transform:  translateX(20%)  scale(1.2);  }  &  .warningtext{  position:  static;  margin-top:  0.6em;  color:  #cf2929;  white-space:  normal;  overflow-wrap:  normal;  word-break:  break-all;  }  &  input  {  border:  solid  1px  rgb(200,200,200);  border-radius:  4px;  }  &  h2  {  margin-top:  0.3em;  color:  #444;  font-size:  18px;  }  &  h2:before{  content:"\\eb20";  font-family:  "tabler-icons";  font-weight:  300;  margin-right:  0.3em;  }  &  h3  {  font-size:  12px;  margin-top:  0.8em;  font-weight:  500;  color:  #444;  }  &  .close  {  opacity:  1;  }  &  .close  button{  background:  none;  font-family:  "tabler-icons";  font-weight:  800;  opacity:  0.8;  }  &  button{  color:  #ff0000;  }  &  .savebtn{  background:  #136273;  color:  var(--color-text-white-1);  padding:  0.4em  1.2em;  border-radius:  3px;  transition:  0.4s;  }  &  .savebtn:hover{  transform:  scale(1.05);  box-shadow:  0px  0  10px  0  rgba(0,0,0,0.3);  transition:  0.2s;  }  &  .savebtn:active{  transform:  scale(0.9);  transition:  0.1s;  }  &  button  {  border:  none;  }  &  .twicaskey-setting-body{  margin:  1.5em  0  1em;  }  }  .twicaskey-setting.show{  opacity:  1;  transform:  scale(1)  ;  transition:  ease-out  0.3s;  }  #twicaskey-settingbtn  {  border:  none;  background:  #F0F0F0;  padding:  0.3em  1em;  border-radius:  4px;  transition:  0.4s;  }  #twicaskey-settingbtn:hover{  transition:  0.2s;  box-shadow:  0  0  10px  0  rgba(0,0,0,0.2);  background:  #4380bf;  color:  #ffffff;  }  #twicaskey-settingbtn:active{  transition:  0.1s;  background:  #F4ECDC;  transform:  scale(0.93);  opacity:  0.8;  }  #twicaskey-settingbtn:before{  content:  "\\eb20";  font-family:  "tabler-icons";  font-size:  1.3em;  margin-right:  0.3em;  }  .twicaskey-setting  .warningtext  {  display:none;  }  .twicaskey-setting  .warningtext.show  {  display:block;  }  #twicaskey-notice  {  position:  fixed;  right:  10px;  top:  10px;  pointer-events:  none;  z-index:  9999;  background:  white;  padding:  1em  2em;  border-radius:  5px;  box-shadow:  0  0  20px  0  rgba(0,0,0,0.4);  transition:  0.3s;  opacity:  1;  display:flex;  opacity:0;  align-items:  center;  }  #twicaskey-notice:before  {  font-family:  "tabler-icons";  content:  "\\eac5";  margin-right:  0.3em;  font-size:  1.6em;  }  .twicaskey-help:has(span:hover)  .twicaskey-helppop{  opacity:  1  !important;  }  .twicaskey-helppop{  opacity:  0.4;  position:  absolute;  display:flex;  margin:  10px  auto;  }  .twicaskey-helppop{  background:  white;  transition:  0.4s;  }  .savebtn[disabled]{  opacity:  0.3;  }  #twicaskey-notice.show{  display:  flex;  animation-name:  popup;  animation-duration:  4s;  animation-iteration-count:  1;  }  @keyframes  popup  {  0%{  transform:  translateY(10px)  scale(0.6);  opacity:  0;  }  10%,90%  {  transform:  none;  opacity:1;  }  100%{  transform:  translateY(10px)  scale(0.6);  opacity:0;  }  }</style>';
    const setting_target= document.querySelector('.tw-comment-post-operations-secondary');
    const setting_target2 = document.querySelector('#broadcastNotificationDialog .modal-body');
    const style_target = document.querySelector('body');

    setting_target.insertAdjacentHTML('afterbegin',checkboxhtml);
    setting_target.insertAdjacentHTML('beforeend',settinghtml);
    if(setting_target2 != null) setting_target2.insertAdjacentHTML('beforeend', bloadcasthtml);
    style_target.insertAdjacentHTML('afterbegin',stylehtml);
    style_target.insertAdjacentHTML('afterbegin',popuphtml);

    const visibilitymap = ["public","home","followers"];
    let h2 = document.querySelector("#misskeypost");
    h2.checked = false;
    h2 = document.querySelector("#misskeypost2");
    if(h2 != null) h2.checked = false;
    const username = document.querySelector('#comment-list-app');

    //初回起動時の設定値の初期化
    if(localStorage.getItem(username.dataset.audienceId + 'server') == null){
        localStorage.setItem(username.dataset.audienceId + 'server', "");
    }
    if(localStorage.getItem(username.dataset.audienceId + 'token') == null){
        localStorage.setItem(username.dataset.audienceId + 'token', "");
    }
    if(localStorage.getItem(username.dataset.audienceId + 'addurl') == null){
        localStorage.setItem(username.dataset.audienceId + 'addurl', "1");
    }
    if(localStorage.getItem(username.dataset.audienceId + 'visibility') == null){
        localStorage.setItem(username.dataset.audienceId + 'visibility', "0");
    }


    //保存ボタン,閉じるボタン,投稿チェックボックスの設定
    const savebutton = document.querySelector(".twicaskey-setting .savebtn");
    savebutton.addEventListener("click", function(){
        localStorage.setItem(username.dataset.audienceId + 'token', document.querySelector('.twicaskey-setting #token').value);
        localStorage.setItem(username.dataset.audienceId + 'server', document.querySelector('.twicaskey-setting #server').value);
        localStorage.setItem(username.dataset.audienceId + 'addurl', (document.querySelector('.twicaskey-setting #addurl').checked? "1" : "0"));
        localStorage.setItem(username.dataset.audienceId + 'visibility', document.querySelector('.twicaskey-setting #visibility').options.selectedIndex.toString());
        document.querySelector(".twicaskey-setting").classList.remove("show");
        document.querySelector('#twicaskey-notice').innerHTML = '<span style="color: #6da65e;">設定を保存しました</span>';
        document.querySelector('#twicaskey-notice').className = '';
        window.setTimeout(function(){document.querySelector('#twicaskey-notice').className = 'show';}, 100);
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
    const settingbutton2 = document.querySelector("#twicaskey-settingbtn2");
    if(settingbutton2 != null) {
        settingbutton2.addEventListener("click", function(){
            settinginit();
            document.querySelector(".twicaskey-setting").classList.add("show");
        });
    }


    const postcheck = document.querySelector("#misskeypost");
    postcheck.addEventListener("click", function(){
        if(localStorage.getItem(username.dataset.audienceId + 'token') != null && localStorage.getItem(username.dataset.audienceId + 'token') != ""){
          //console.log('なにもしない');
        } else {
          this.checked = false;
          settinginit();
          document.querySelector(".twicaskey-setting").classList.add("show");
        }
    });

    const postcheck2 = document.querySelector("#misskeypost2");
    if(postcheck2 != null){
        postcheck2.addEventListener("click", function(){
            if(localStorage.getItem(username.dataset.audienceId + 'token') != null && localStorage.getItem(username.dataset.audienceId + 'token') != ""){
            //console.log('なにもしない');
            } else {
            this.checked = false;
            settinginit();
            document.querySelector(".twicaskey-setting").classList.add("show");
            }
        });
    }


    //コメント投稿ボタンが押されたら
    document.querySelector(".tw-comment-post .tw-button-primary").addEventListener("click", function(){
        let text = document.querySelector(".tw-textarea").value;
        if(localStorage.getItem(username.dataset.audienceId + 'addurl')=="1"){
            text += '\\nhttps://twitcasting.tv/' + username.dataset.audienceId  + '/';
        }
        if(document.querySelector('#misskeypost').checked){
        fetch("https://" + localStorage.getItem(username.dataset.audienceId + 'server') + "/api/notes/create", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/json",
        },
        "body": "{\"visibility\":\"" + visibilitymap[document.querySelector('.twicaskey-setting #visibility').options.selectedIndex] + "\",\"text\":\"" +  text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.audienceId + 'token') + "\"}",
        "method": "POST",
        "credentials": "omit"
        }).then(response => {
            //console.log(response.status);
            if (!response.ok) {
              document.querySelector('#twicaskey-notice').innerHTML = '<span style="color: #b52515;">エラー: Misskeyに投稿できませんでした</span>';
              document.querySelector('#twicaskey-notice').className = '';
              window.setTimeout(function(){document.querySelector('#twicaskey-notice').className = 'show';}, 100);
            } else {
                document.querySelector('#twicaskey-notice').innerHTML = '<span style="color: #6da65e;">Misskeyに投稿しました</span>';
                document.querySelector('#twicaskey-notice').className = '';
                window.setTimeout(function(){document.querySelector('#twicaskey-notice').className = 'show';}, 100);
            }
          })
          .catch(error => {
            document.querySelector('#twicaskey-notice').innerHTML = '<span style="color: #b52515;">エラー: Misskeyに投稿できませんでした</span>';
            document.querySelector('#twicaskey-notice').className = '';
            window.setTimeout(function(){document.querySelector('#twicaskey-notice').className = 'show';}, 100);
          });
        //console.log("{\"visibility\":\"" + visibilitymap[document.querySelector('.twicaskey-setting #visibility').options.selectedIndex] + "\",\"text\":\"" + text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.audienceId + 'token') + "\"}");
        }
    });

    //配信開始時のボタンが押されたら
    const postbtn2 = document.querySelector("#broadcastNotificationDialog .tw-button-primary");
    if(postbtn2 != null) {
        postbtn2.addEventListener("click", function(){
            let text = document.querySelector(".message-textarea").value;
            if(localStorage.getItem(username.dataset.audienceId + 'addurl')=="1"){
                text += '\\nhttps://twitcasting.tv/' + username.dataset.audienceId  + '/';
            }
            if(document.querySelector('#misskeypost2').checked){
            fetch("https://" + localStorage.getItem(username.dataset.audienceId + 'server') + "/api/notes/create", {
            "headers": {
                "accept": "*/*",
                "content-type": "application/json",
            },
            "body": "{\"visibility\":\"" + visibilitymap[document.querySelector('.twicaskey-setting #visibility').options.selectedIndex] + "\",\"text\":\"" +  text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.audienceId + 'token') + "\"}",
            "method": "POST",
            "credentials": "omit"
            }).then(response => {
                //console.log(response.status);
                if (!response.ok) {
                document.querySelector('#twicaskey-notice').innerHTML = '<span style="color: #b52515;">エラー: Misskeyに投稿できませんでした</span>';
                document.querySelector('#twicaskey-notice').className = '';
                document.querySelector('#twicaskey-notice').className = 'show';
                } else {
                    document.querySelector('#twicaskey-notice').innerHTML = '<span style="color: #6da65e;">Misskeyに投稿しました</span>';
                    document.querySelector('#twicaskey-notice').className = '';
                    document.querySelector('#twicaskey-notice').className = 'show';
                }
            })
            .catch(error => {
                document.querySelector('#twicaskey-notice').innerHTML = '<span style="color: #b52515;">エラー: Misskeyに投稿できませんでした</span>';
                document.querySelector('#twicaskey-notice').className = '';
                document.querySelector('#twicaskey-notice').className = 'show';
            });
            //console.log("{\"visibility\":\"" + visibilitymap[document.querySelector('.twicaskey-setting #visibility').options.selectedIndex] + "\",\"text\":\"" + text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.audienceId + 'token') + "\"}");
            }
        });
    }

    //コメントをポップアップ→ポップアップを消したときにイベントリスナと要素を再設定する
    document.querySelectorAll('.tw-comment-post-operations-secondary>a')[1].addEventListener("click", function(){
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

//設定画面開いたときに値を読み込んだりする
function settinginit(){
    let flag=false;
    const username = document.querySelector('#comment-list-app');
    if(localStorage.getItem(username.dataset.audienceId + 'token') != null && localStorage.getItem(username.dataset.audienceId + 'token') != ""){
        document.querySelector(".twicaskey-setting #token").value = localStorage.getItem(username.dataset.audienceId + 'token');
    } else {
        document.querySelector(".twicaskey-setting #token").value = "";
        flag=true;
    }
    if(localStorage.getItem(username.dataset.audienceId + 'server') != null && localStorage.getItem(username.dataset.audienceId + 'server') != ""){
        document.querySelector(".twicaskey-setting #server").value = localStorage.getItem(username.dataset.audienceId + 'server');
    } else {
        document.querySelector(".twicaskey-setting #server").value = "";
        flag=true;
    }

    document.querySelector(".twicaskey-setting #addurl").checked = Number(localStorage.getItem(username.dataset.audienceId + 'addurl'));
    document.querySelector(".twicaskey-setting #visibility").options.selectedIndex = Number(localStorage.getItem(username.dataset.audienceId + 'visibility'));

    if(flag==true){
        document.querySelector('.twicaskey-setting .warningtext').classList.add("show");
    } else {
        document.querySelector('.twicaskey-setting .warningtext').classList.remove("show");
    }

}

