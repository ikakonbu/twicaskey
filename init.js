

/*
.twicaskey-setting .warningtext {
  display:none;
}

.twicaskey-setting .warningtext.show {
  display:block;
}

#twicaskey-notice {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 9999;
  background: white;
  padding: 1em 2em;
  border-radius: 5px;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.4);
  transition: 0.3s;
  opacity: 1;
  display:flex;
  align-items: center;
}

#twicaskey-notice:before {
  font-family: "tabler-icons";
  content: "\eac5";
  margin-right: 0.3em;
  font-size: 1.6em;
}

*/

window.addEventListener("load", function(){
    main();
});

function main(){
    //HTMLの準備
    const checkboxhtml = '<span class="tw-popup-menu-trap"><div class="twicaskey-setting"><div class="close"><button clsss="close">x</button></div><h2>設定</h2><div class=warningtext>トークン設定がありません<br>misskeyに投稿する場合は設定してください</div><div class="twicaskey-setting-body"><h3>投稿したいMisskeyのサーバー名</h3><input id="server" type="text"><h3>アクセストークン</h3><input id="token" type="password"><h3>URLを投稿の最後に添付する</h3><input id="addurl" type="checkbox"><h3>公開範囲</h3><select id="visibility" name="example">    <option>パブリック</option>    <option>ホーム</option>    <option>フォロワー</option></select></div><button class="savebtn">保存</button></div></form></div><input type="checkbox" name="misskeypost" id="misskeypost" checked=""><label for="misskeypost">Misskeyにも投稿</label></span>';
    const settinghtml = '<button id="twicaskey-settingbtn">Misskey設定</button>';
    const bloadcasthtml = '<label class="twicaskey-connect"><span class="tw-popup-menu-trap"><input type="checkbox" name="misskeypost2" id="misskeypost2" checked=""> Misskeyにも投稿</span></label><button id="twicaskey-settingbtn2">Misskey設定</button>';
    const popuphtml = '<div id="twicaskey-notice">投稿中...</div>';
    const stylehtml =  '<style>@import  url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css");  .twicaskey-setting  {  background:  rgba(250,250,250,1);  padding:  1em;  position:  absolute;  z-index:  99999;  border-radius:  7px;  box-shadow:  0  0  10px  0  rgba(0,0,0,0.3);  width:  220px;  top:  30px;  opacity:  0;  transform:  scale(0.4);  transition:  ease-in-out  0.6s;  &  .warningtext{  position:  static;  margin-top:  0.6em;  color:  #cf2929;  white-space:  normal;  overflow-wrap:  normal;  word-break:  break-all;  }  &  input  {  border:  solid  1px  rgb(200,200,200);  border-radius:  4px;  }  &  h2  {  margin-top:  0.3em;  color:  #444;  font-size:  18px;  }  &  h2:before{  content:"\eb20";  font-family:  "tabler-icons";  font-weight:  300;  margin-right:  0.3em;  }  &  h3  {  font-size:  12px;  margin-top:  0.8em;  font-weight:  500;  color:  #444;  }  &  .close  {  opacity:  1;  }  &  .close  button{  background:  none;  font-family:  "tabler-icons";  font-weight:  800;  opacity:  0.8;  }  &  button{  color:  #ff0000;  }  &  .savebtn{  background:  var(--color-primary);  color:  var(--color-text-white-1);  padding:  0.4em  0.8em;  border-radius:  3px;  }  &  button  {  border:  none;  }  &  .twicaskey-setting-body{  margin:  1em  0;  }  }  .twicaskey-setting.show{  opacity:  1;  transform:  scale(1)  ;  transition:  ease-out  0.3s;  } #twicaskey-settingbtn { border: solid 1px #aaa; border-radius: 4px;}.twicaskey-setting .warningtext {     display:none;   }      .twicaskey-setting .warningtext.show {     display:block;   }      #twicaskey-notice {     position: absolute;     right: 10px;     top: 10px;     z-index: 9999;     background: white;     padding: 1em 2em;     border-radius: 5px;     box-shadow: 0 0 20px 0 rgba(0,0,0,0.4);     transition: 0.3s;     opacity: 1;     display:flex;  opacity:0;   align-items: center;   }      #twicaskey-notice:before {     font-family: "tabler-icons";     content: "\\eac5";     margin-right: 0.3em;     font-size: 1.6em;   }</style>';
    const setting_target= this.document.querySelector('.tw-comment-post-operations-secondary');
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
    if(localStorage.getItem(username.dataset.broadcasterId + 'server') == null){
        localStorage.setItem(username.dataset.broadcasterId + 'server', "");
    }
    if(localStorage.getItem(username.dataset.broadcasterId + 'token') == null){
        localStorage.setItem(username.dataset.broadcasterId + 'token', "");
    }
    if(localStorage.getItem(username.dataset.broadcasterId + 'addurl') == null){
        localStorage.setItem(username.dataset.broadcasterId + 'addurl', "1");
    }
    if(localStorage.getItem(username.dataset.broadcasterId + 'visibility') == null){
        localStorage.setItem(username.dataset.broadcasterId + 'visibility', "0");
    }


    //保存ボタン,閉じるボタン,投稿チェックボックスの設定
    const savebutton = document.querySelector(".twicaskey-setting .savebtn");
    savebutton.addEventListener("click", function(){
        localStorage.setItem(username.dataset.broadcasterId + 'token', document.querySelector('.twicaskey-setting #token').value);
        localStorage.setItem(username.dataset.broadcasterId + 'server', document.querySelector('.twicaskey-setting #server').value);
        localStorage.setItem(username.dataset.broadcasterId + 'addurl', (document.querySelector('.twicaskey-setting #addurl').checked? "1" : "0"));
        localStorage.setItem(username.dataset.broadcasterId + 'visibility', document.querySelector('.twicaskey-setting #visibility').options.selectedIndex.toString());
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
    const settingbutton2 = document.querySelector("#twicaskey-settingbtn2");
    if(settingbutton2 != null) {
        settingbutton2.addEventListener("click", function(){
            settinginit();
            document.querySelector(".twicaskey-setting").classList.add("show");
        });
    }


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

    const postcheck2 = document.querySelector("#misskeypost2");
    if(postcheck2 != null){
        postcheck2.addEventListener("click", function(){
            if(localStorage.getItem(username.dataset.broadcasterId + 'token') != null && localStorage.getItem(username.dataset.broadcasterId + 'token') != ""){
            console.log('なにもしない');
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
        if(localStorage.getItem(username.dataset.broadcasterId + 'addurl')=="1"){
            text += '\\nhttps://twitcasting.tv/' + username.dataset.broadcasterId  + '/';
        }
        if(document.querySelector('#misskeypost').checked){
        fetch("https://" + localStorage.getItem(username.dataset.broadcasterId + 'server') + "/api/notes/create", {
        "headers": {
            "accept": "*/*",
            "content-type": "application/json",
        },
        "body": "{\"visibility\":\"" + visibilitymap[document.querySelector('.twicaskey-setting #visibility').options.selectedIndex] + "\",\"text\":\"" +  text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.broadcasterId + 'token') + "\"}",
        "method": "POST",
        "credentials": "omit"
        }).then(response => {
            console.log(response.status);
            if (!response.ok) {
              document.querySelector('#twicaskey-notice').innerHTML = '投稿時にエラーが発生しました';
              document.querySelector('#twicaskey-notice').className = '';
              document.querySelector('#twicaskey-notice').className = 'show';
            }
            document.querySelector('#twicaskey-notice').innerHTML = 'Misskeyに投稿しました';
            document.querySelector('#twicaskey-notice').className = '';
            document.querySelector('#twicaskey-notice').className = 'show';
          })
          .catch(error => {
            document.querySelector('#twicaskey-notice').innerHTML = '投稿時にエラーが発生しました';
            document.querySelector('#twicaskey-notice').className = '';
            document.querySelector('#twicaskey-notice').className = 'show';
          });
        console.log("{\"visibility\":\"" + visibilitymap[document.querySelector('.twicaskey-setting #visibility').options.selectedIndex] + "\",\"text\":\"" + text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.broadcasterId + 'token') + "\"}");
        }
    });

    //配信開始時のボタンが押されたら
    const postbtn2 = document.querySelector("#broadcastNotificationDialog .tw-button-primary");
    if(postbtn2 != null) {
        postbtn2.addEventListener("click", function(){
            let text = document.querySelector(".message-textarea").value;
            if(localStorage.getItem(username.dataset.broadcasterId + 'addurl')=="1"){
                text += '\\nhttps://twitcasting.tv/' + username.dataset.broadcasterId  + '/';
            }
            if(document.querySelector('#misskeypost2').checked){
            fetch("https://" + localStorage.getItem(username.dataset.broadcasterId + 'server') + "/api/notes/create", {
            "headers": {
                "accept": "*/*",
                "content-type": "application/json",
            },
            "body": "{\"visibility\":\"" + visibilitymap[document.querySelector('.twicaskey-setting #visibility').options.selectedIndex] + "\",\"text\":\"" +  text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.broadcasterId + 'token') + "\"}",
            "method": "POST",
            "credentials": "omit"
            }).then(response => {
                console.log(response.status);
                if (!response.ok) {
                document.querySelector('#twicaskey-notice').innerHTML = '投稿時にエラーが発生しました';
                document.querySelector('#twicaskey-notice').className = '';
                document.querySelector('#twicaskey-notice').className = 'show';
                }
                document.querySelector('#twicaskey-notice').innerHTML = 'Misskeyに投稿しました';
                document.querySelector('#twicaskey-notice').className = '';
                document.querySelector('#twicaskey-notice').className = 'show';
            })
            .catch(error => {
                document.querySelector('#twicaskey-notice').innerHTML = '投稿時にエラーが発生しました';
                document.querySelector('#twicaskey-notice').className = '';
                document.querySelector('#twicaskey-notice').className = 'show';
            });
            console.log("{\"visibility\":\"" + visibilitymap[document.querySelector('.twicaskey-setting #visibility').options.selectedIndex] + "\",\"text\":\"" + text.replace( /\r?\n/g , "\\n") + "\",\"localOnly\":false,\"i\":\"" + localStorage.getItem(username.dataset.broadcasterId + 'token') + "\"}");
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

    document.querySelector(".twicaskey-setting #addurl").checked = Number(localStorage.getItem(username.dataset.broadcasterId + 'addurl'));
    document.querySelector(".twicaskey-setting #visibility").options.selectedIndex = Number(localStorage.getItem(username.dataset.broadcasterId + 'visibility'));

    if(flag==true){
        document.querySelector('.twicaskey-setting .warningtext').classList.add("show");
    } else {
        document.querySelector('.twicaskey-setting .warningtext').classList.remove("show");
    }

}

