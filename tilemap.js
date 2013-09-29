var tylngin;

(function (tylngin) {
    'use strict';

    var TileSet = function (tileSetData) {

        this.sheet = undefined;
        this.width = 0;
        this.height = 0;
        this.firstID = 1;
        this.initialize(tileSetData);
    };

    TileSet.prototype.initialize = function (tileSetData) {
        this.width = tileSetData.tilewidth;
        this.height = tileSetData.tileheight;

        var imageData = {
            images: [ tileSetData.image ],
            frames: {
                width: this.width,
                height: this.height
            }
        };
        // Later handle animated tilesets

        this.sheet = new createjs.SpriteSheet(imageData);
    };

    tylngin.TileSet = TileSet;
}(tylngin || (tylngin = {})));




(function (tylngin) {
    'use strict';

    var Layer = function () {
        
    };

    Layer.prototype = new createjs.Container();
    Layer.prototype.Container_initialize = Layer.prototype.initialize;

    Layer.prototype.initialize = function (tileLayerData, map) {
        this.Container_initialize();

         this.data = tileLayerData.data;
        if (!this.data) this.data = new Array(tileLayerData.width*tileLayerData.height);
        this.alpha = tileLayerData.opacity;
        // Offset
        this.x = tileLayerData.x ? tileLayerData.x : 0;
        this.y = tileLayerData.y ? tileLayerData.y : 0;
        // Viewport
        this.viewportWidth = 10;
        this.viewportHeight = 10;
        // Full grid
        this.gridWidth = tileLayerData.width;
        this.gridHeight = tileLayerData.height;
        this.viewCol = 0;
        this.viewRow = 0;
        this.map = map;
        this.name = tileLayerData.name;
        this.dirty = false;
        
        this.fillView();
    };
        
    Layer.prototype.offset = function(x,y) {
        this.x += x;
        this.y += y;
        this.fillView();
    }

    Layer.prototype.offsetViewport = function(x,y) {
        this.viewCol += x;
        this.viewRow += y;
        this.fillView();
    }

    Layer.prototype.fillView = function () {
        
    }

    tylngin.Layer = Layer;
}(tylngin || (tylngin = {})));


(function (tylngin) {
    'use strict';

    var ImageLayer = function (layerData) {
        this.initialize(layerData);
    };
    ImageLayer.prototype = new tylngin.Layer();
    ImageLayer.prototype.Layer_initialize = ImageLayer.prototype.initialize;

    ImageLayer.prototype.initialize = function (layerData) {
        this.Layer_initialize(layerData);
        this.addChild(new createjs.Bitmap(layerData.image));       
    };

    tylngin.ImageLayer = ImageLayer;
}(tylngin || (tylngin = {})));

(function (tylngin) {
    'use strict';

    var IsoLayer = function (tileLayerData, map) {
        this.initialize(tileLayerData,map);
    };

    IsoLayer.prototype = new tylngin.Layer;
    IsoLayer.prototype.Layer_initialize = IsoLayer.prototype.initialize;

    IsoLayer.prototype.initialize = function (tileLayerData, map) {
        this.Layer_initialize(tileLayerData,map);
    };


    IsoLayer.prototype.fillView = function () {
        
        // remove curret state
        this.removeAllChildren();
        for (var y = this.viewRow;
             y < this.viewRow + this.viewportHeight && y < this.gridHeight;
             y++) {
            for (var x = this.viewCol;
                 x < this.viewCol + this.viewportWidth && x < this.gridWidth;
                 x++) {

                // layer data has single dimension array
                var tileID = x + y * this.gridWidth;
                var sheet = this.map.getSheetFor(tileID);
                // put sprite in cell
                var sprite = new createjs.Sprite(sheet.sheet);
                sprite.gotoAndStop(this.data[tileID] - sheet.firstID);
                
                sprite.x =  (x - this.viewCol) * sheet.width / 2 - y * sheet.width / 2;
                sprite.y =  (y - this.viewRow) * sheet.height/2 / 2 + x * sheet.height/2 / 2;
                // Add to this layer
                this.addChild(sprite);
            }
        }
    }

    tylngin.IsoLayer = IsoLayer;
}(tylngin || (tylngin = {})));

(function (tylngin) {
    'use strict';

    var OrthoLayer = function (tileLayerData, map) {
        this.initialize(tileLayerData,map);
    }

    OrthoLayer.prototype = new tylngin.Layer();
    OrthoLayer.prototype.Layer_initialize = OrthoLayer.prototype.initialize;

    OrthoLayer.prototype.initialize = function (tileLayerData,map) {
        this.Layer_initialize(tileLayerData,map);
        this.fillView();
    }


    OrthoLayer.prototype.fillView = function () {
        // remove curret state
        this.removeAllChildren();
        for (var y = this.viewRow;
             y < this.viewRow + this.viewportHeight && y < this.gridHeight;
             y++) {
            for (var x = this.viewCol;
                 x < this.viewCol + this.viewportWidth && x < this.gridWidth;
                 x++) {

                // layer data has single dimension array
                var tileID = x + y * this.gridWidth;
                var sheet = this.map.getSheetFor(tileID);
                // create a new Bitmap for each cell
                var sprite = new createjs.Sprite(sheet.sheet);
                sprite.gotoAndStop(this.data[tileID] - sheet.firstID);
                sprite.x = (x - this.viewCol) * sheet.width;
                sprite.y = (y - this.viewRow) * sheet.height;

                // Add to this layer
                this.addChild(sprite);
            }
        }
    }

    tylngin.OrthoLayer = OrthoLayer;
}(tylngin || (tylngin = {})));


(function (tylngin) {
    'use strict';
    
    
    var TileMap = function (mapData) {
        this.allSets = [];
        this.allLayers = {}
        this.initialize(mapData);
    }
    TileMap.prototype = new createjs.Container();

    TileMap.prototype.Container_initialize = TileMap.prototype.initialize;
    TileMap.prototype.initialize = function (mapData) {
        this.Container_initialize();
        this.loadTileSets(mapData);
        this.loadLayers(mapData);
    }

    TileMap.prototype.loadTileSets = function (mapData) {
        for (var set = 0; set < mapData.tilesets.length; set++) {
            this.allSets.push(new tylngin.TileSet(mapData.tilesets[set], this));
        }
    }
    
    TileMap.prototype.getSheetFor = function (id) {
        var ret = this.allSets[0],
            i = 1;

        for (i = 1; i < this.allSets.length; i++) {
            if (id >= this.allSets[i].firstID) ret = this.allSets[i];
            else break;
        }
        
        return ret;
    }
    
    TileMap.prototype.getLayer = function (name) {
        return this.allLayers[name];
    }

    TileMap.prototype.loadLayers = function (mapData) {
        var isometric = false;
        var layer;
        if (mapData.orientation == "isometric") isometric = true;
        for (var set = 0; set < mapData.layers.length; set++) {
            if (mapData.layers[set].type === 'imagelayer') {
                layer = new tylngin.ImageLayer(mapData.layers[set]);
                this.allLayers[layer.name] = layer;
                this.addChild(layer);
            } else if (mapData.layers[set].type === 'tilelayer' && !isometric) {
                layer = new tylngin.OrthoLayer(mapData.layers[set], this);
                this.allLayers[layer.name] = layer;
                this.addChild(layer);
            } else if (mapData.layers[set].type === 'tilelayer' && isometric) {
                layer = new tylngin.IsoLayer(mapData.layers[set], this)
                this.allLayers[layer.name] = layer;
                this.addChild(layer);
            }
            
        }
    }


    tylngin.TileMap = TileMap;
}(tylngin || (tylngin = {})));