"use strict";$(document).ready(function(){paper.install(window),paper.setup(document.getElementById("mainCanvas")),(new Tool).onMouseDown=function(e){Shape.Circle(200,200,80).fillColor="Blасk ";var n=new PointText(200,200);n.justification="center",n.fillColor="white",n.fontSize=20,n.content="hello world"},paper.view.draw()});