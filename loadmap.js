var loader;
var stage;
var isostage;
var mapMaze;
var background;


window.onload = function()
{
	// json map data at the end of this file for ease of understanding (created on Tiled map editor)
	//mapData = mapData0;

	// creating EaselJS stage
	stage = new createjs.Stage("canvas");
    mapMaze = new tylngin.TileMap(mapData0)
	stage.addChild(mapMaze);
	//background = mapMaze.getLayer("background");
    
    // creating EaselJS stage
	isostage = new createjs.Stage("isocanvas");
    var mapIso = new tylngin.TileMap(mapData1)
	isostage.addChild(mapIso);
    var layer = mapIso.getLayer("ground00");
    layer.offset(300,0);
    layer = mapIso.getLayer("ground01");
    layer.offset(300,0);
    
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);
    
}
        
function tick(event) {
    stage.update();
    isostage.update();
}

var mapData0 = { "height":10,
 "layers":[
        {
         "height":10,
         "image":"background.jpg",
         "name":"background",
         "opacity":0.6,
         "transparentcolor":"#8ea424",
         "type":"imagelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 1, 2, 2, 2, 9, 7, 2, 2, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 0, 1, 2, 2, 2, 2, 3, 0, 6, 4, 0, 4, 0, 0, 0, 0, 6, 0, 6, 4, 0, 4, 0, 0, 0, 0, 6, 0, 6, 4, 0, 7, 2, 2, 2, 2, 9, 0, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 8, 8, 8, 3, 1, 8, 8, 8, 9, 0, 0, 0, 0, 7, 9, 0, 0, 0, 0],
         "height":10,
         "name":"maze",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "tileheight":128,
 "tilesets":[
        {
         "firstgid":1,
         "image":"tiles.png",
         "imageheight":384,
         "imagewidth":384,
         "margin":0,
         "name":"outer",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":128,
         "tilewidth":128
        }],
 "tilewidth":128,
 "version":1,
 "width":10
}






// Map data created on Tiled map editor (mapeditor.org). Use export for JSON format
var mapData1 = { "height":10,
 "layers":[
        {
         "data":[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 39, 38, 36, 3, 4, 4, 4, 3, 3, 3, 37, 35, 33, 3, 4, 4, 4, 3, 3, 3, 34, 32, 31, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
         "height":10,
         "name":"ground00",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 131, 0, 0, 0, 0, 60, 59, 71, 0, 0, 0, 0, 0, 0, 0, 58, 64, 53, 0, 0, 0, 0, 141, 0, 0, 58, 61, 53, 0, 0, 0, 0, 0, 0, 0, 54, 52, 52, 0, 0, 0, 0, 0, 0, 151, 0, 0, 0, 90, 89, 87, 0, 126, 0, 119, 118, 116, 0, 88, 101, 83, 0, 125, 0, 117, 115, 113, 0, 84, 82, 81, 0, 130, 122, 114, 112, 111, 0, 0, 0, 0, 0, 0, 128, 121, 0, 0, 0],
         "height":10,
         "name":"ground01",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "orientation":"isometric",
 "properties":
    {

    },
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "image":"forest.png",
         "imageheight":1024,
         "imagewidth":640,
         "margin":0,
         "name":"forest",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":64,
         "tilewidth":64
        }],
 "tilewidth":64,
 "version":1,
 "width":10
};

