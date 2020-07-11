# AR.js

[AR.js](https://github.com/jeromeetienne/AR.js)

WEB上AR用軽量ライブラリ

* Marker-Base AR
* Location Base AR

の機能を持っている。

* Web-base機能
    * three.js + jsartoolkit5 を使っている。
* WebGL , WebRTCを使っている。



* [A-FRAME](https://aframe.io/docs/0.9.0/introduction/)
    * A-FrameはVR構築用フレームワーク
    * コア機能はentiy-component frameworkである。
    * declarative , extensibleなもの

    
## Sample 


### MultiMarker


https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

でMarkerを作成する。

```
    <a-scene embedded arjs>
      <a-marker preset="hiro">
          <a-box position='0 0.5 0' material='color: yellow;'></a-box>
      </a-marker>
      <a-entity camera></a-entity>
  <a-marker type='pattern' url='./marker/pattern-marker.patt'>
    <a-sphere scale=".25 .25 .25" position="0 .5 0" color="#f00">
      <a-animation attribute="position" to="0 1 0" direction="alternate" dur="2000" repeat="indefinite">
      </a-animation>
    </a-sphere>
  </a-marker>
</a-scene>
```


## ImageTracking 

https://ar-js-org.github.io/AR.js-Docs/image-tracking/
にImageTrackingの説明がある。



### サンプルプログラムからTracking Imageの変更

https://ar-js-org.github.io/AR.js-Docs/image-tracking/ は恐竜の画像をかざしたらtrexのgltfを表示する。

トラッキング画像を恐竜からlennaに変更する。


1. https://carnaux.github.io/NFT-Marker-Creator/ にlennaの画像をアップロードする。
2. lenna.fset , lenna.fset3 , lenna.iset の３ファイルを生成しダウンロード
3. 3ファイルをアップロードし、サンプルのHTMLのa-nftのurlを変更する。    
    変更する場合、url="https://arjs-cors-proxy.herokuapp.com/[URL]"     
    とする必要がある。

これでOK。ベースの修正方法は以上のようにし、それ以降は各種カスタマイズしていけばよし。






