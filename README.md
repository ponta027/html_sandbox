
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

https://ponta027.github.io/html_sandbox/ar_js/ar_sample.html

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


## AR.jsのexample

### aframe/example/basic.html


## QR Code Reader

https://ponta027.github.io/html_sandbox/qrcode/index.html

Sample Code 




## face-api.js sample


https://ponta027.github.io/html_sandbox/face-api/webcamFaceDetection.html

