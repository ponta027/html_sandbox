(function() {
  "use strict"

  joint.shapes.composition = {};

  joint.shapes.composition.folder = joint.shapes.basic.Generic.extend({
  
        markup: '<g class="rotatable"><image/><text/></g>',
  
      defaults: joint.util.deepSupplement({
      
            type: 'basic.Rect',
            attrs: {
                    'text': {
                                      'font-size': 14,
                                      'ref-x': .45,
                                      'ref-y': .55,
                                      ref: 'image',
                                      'y-alignment': 'middle',
                                      'x-alignment': 'middle'
                                    },
                    'image':{
                                      'xlink:href': './img/'+ "folder.png",
                                      width: 60,
                                      height: 40,
                                    }
                  }
          }, joint.shapes.basic.Generic.prototype.defaults)
    });

  joint.shapes.composition.file = joint.shapes.basic.Generic.extend({
  
        markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
  
      defaults: joint.util.deepSupplement({
      
            type: 'basic.Rect',
            attrs: {
                    'rect': { fill: 'white', stroke: 'black', 'follow-scale': true, width: 100, height: 40 },
                    'text': { 'font-size': 14, 'ref-x': 10, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'left' }
                  }
          }, joint.shapes.basic.Generic.prototype.defaults)
    });

} )();


