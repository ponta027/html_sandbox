# WebRTC

## typescript

```
npm install --dev-save @types/webrtc
```

https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/webrtc/test

に記載されているテストプログラムを参考に記載。


## jsQRの呼び出し

jsqrのd.tsを追加する。
現状以下の方法で動いただけなため、正しい方法は確認中。


```
npm install --save-dev jsqr
cp -pr node_modules/jsqr/dist node_modules/@types/jsqr/
vim node_modules/@types/jsqr/index.d.ts
# fromのパスをjsqr始まりに変更する
```

import jsQR, { QRCode } from 'jsqr';



browser上から起動する場合には、UDMにして、
htmlに以下のようにする。

```
 <script type="text/javascript" data-main="js/index.js"
        src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.22/require.js"></script>
```


## reference
https://qiita.com/jsakamoto/items/82e9dbd66ef4fb417933
