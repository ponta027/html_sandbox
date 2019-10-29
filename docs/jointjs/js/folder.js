(function() {
  "use strict"

  var graph;
  var paper;
  var objectSizeX = 30;
  var objectSizeY = 20;

  $(function(){
      graph = new joint.dia.Graph;
      paper = new joint.dia.Paper({
              el: $('#myholder'),
              width: 600,
              height: 400,
              model: graph
          });
  
      var rootDir = makeFolder(80, 50, '/', 'black');
      var jsDir = makeFolder(150, 150, 'js', 'black');
      var libDir = makeFolder(150, 200, 'lib', 'black');
  
      var indexFile = makeFile(150, 100, 'index.html', 'black');
      var mainJsFile = makeFile(250, 150, 'main.js', 'black');
      var jointJsFile = makeFile(250, 200, 'joint.min.js', 'black');
      var jointCssFile = makeFile(250, 250, 'joint.min.css', 'black');
  
      makeLink(rootDir, indexFile);
      makeLink(rootDir, libDir);
      makeLink(rootDir, jsDir);
      makeLink(libDir, jointJsFile);
      makeLink(libDir, jointCssFile);
      makeLink(jsDir, mainJsFile);
  
      /* */
      /* ref: http://jointjs.com/api#joint.dia.Paper:events */
      paper.on('blank:pointerdblclick',function(evt,x,y){
              alert("HOGE")
              var rect = new joint.shapes.basic.Rect({
                    position:{x:100,y:100},
                    size:{width:70,height:30},
                    attrs:{text:{text:'my react'}}
              })
              var rect2= rect.clone()

              graph.addCell( rect )

      })
      /* */

    });

  var makeFolder = function(x, y, text, fill) {
      var rect = new joint.shapes.composition.folder({
            position: { x: x, y: y },
            size: { width: 100, height: 40 },
            attrs: {
                    text: { text: text, fill: fill },
                         }
          });
      graph.addCell(rect);
      return rect;
    }

  var makeFile = function(x, y, text, fill) {
      var rect = new joint.shapes.composition.file({
            position: { x: x, y: y },                                                                                                                                                                                               size: { width: 100, height: 40 },
            attrs: {
                    text: { text: text, fill: fill },
                         }
          });
      graph.addCell(rect);
      return rect;
    }

  var makeLink = function(source, target) {
      var point = [];
      if (source.attributes.position.y !== target.attributes.position.y) {
            point = [{x : source.attributes.position.x + objectSizeX, y : target.attributes.position.y + objectSizeY}];
          }
      var link = new joint.dia.Link({
              source: { id: source.id },
              target: { id: target.id },
              vertices: point
          });
      graph.addCell(link);
      return link;
    }
})();

