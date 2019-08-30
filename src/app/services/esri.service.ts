import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { loadModules } from 'esri-loader';
//import esri = __esri;

@Injectable({
  providedIn: 'root'
})
export class EsriService {

  private mapInitialisedSource = new Subject<void>();
  public mapInitialised$ = this.mapInitialisedSource.asObservable();

  private locateCompleteSource = new Subject<void>();
  public locateComplete$ = this.locateCompleteSource.asObservable();

  _polygonSymbol3D: any;
  _extrudeSymbol3DLayer: any;
  _objectSymbol3DLayer: any;
  _lineSymbol3D: any;
  _pathSymbol3DLayer : any;
  _graphic: any; //esri.Graphic;
  _graphicsLayer: any; //esri.GraphicsLayer;
  _mesh: any;
  _polygon: any; //esri.Geometry.Polygon;
  _point: any; //esri.Geometry.Point;
  _map: any; //esri.Map;
  _mapView: any; //esri.MapView;
  _sceneView: any; //esri.SceneView; 

  constructor() { }

  public create3DMap(mapElement :any)
  {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/views/SceneView',
      'esri/layers/GraphicsLayer',
      'esri/Graphic',
      "esri/geometry/Polygon",
      'esri/geometry/Point',
      'esri/symbols/PolygonSymbol3D',
      'esri/symbols/ExtrudeSymbol3DLayer',
      'esri/symbols/ObjectSymbol3DLayer',
      'esri/symbols/LineSymbol3D',
      'esri/symbols/PathSymbol3DLayer',
      'esri/geometry/Mesh'
    ])
      .then(([EsriMap, EsriMapView, EsriSceneView, EsriGraphicsLayer, EsriGraphic, EsriPolygon,EsriPoint, 
        EsriPolygonSymbol3D, EsriExtrudeSymbol3DLayer, EsriObjectSymbol3DLayer, EsriLineSymbol3D, EsriPathSymbol3DLayer, EsriMesh]) => {

        this._extrudeSymbol3DLayer = EsriExtrudeSymbol3DLayer;
        this._polygonSymbol3D = EsriPolygonSymbol3D;
        this._objectSymbol3DLayer = EsriObjectSymbol3DLayer;
        this._lineSymbol3D = EsriLineSymbol3D;
        this._pathSymbol3DLayer = EsriPathSymbol3DLayer;
        
        this._graphic = EsriGraphic;

        this._mesh = EsriMesh;

        this._graphicsLayer = EsriGraphicsLayer;

        this._polygon = EsriPolygon;
        this._point = EsriPoint;

        this._map = new EsriMap({
           basemap: "streets-night-vector",
           //basemap: "gray",
          //  basemap: "streets",
           // basemap: "hybrid",
            ground: "world-elevation"
       });

        this._sceneView = new EsriSceneView({
          container:mapElement,     
          map: this._map,   

         // var view = new SceneView({
            camera: 
            //  {
            //   position: {
            //     x: -0.08156023780775738, // lon
            //     y:  51.495, //508,   // lat, up and down
            //     z: 650 // elevation in meters
            //   },
          
            //   tilt: 65
            // }
            
            {
              position: {
                x: -74, // lon
                y: 40.42,   // lat
                z: 22654 // elevation in meters
              },
          
              tilt: 65
            }
       
         
      });

     
      this._sceneView.when(() => {
          // All the resources in the MapView and the map have loaded. Now execute additional processes
          this.mapInitialisedSource.next();

        // this.addCityGraphics();
        this.addGraphic3D(40.71427, -74.00597);

        }, err => {
          console.error(err);
        });

      })
      .catch(err => {
        console.error(err);
      });
  }

  public goTo(lat: any, lon: any)
  {
    let that = this;

    let location:any;

    if (lat == 51.509865)
    {
     location =  {
      position: {
        x: -0.08156023780775738, // lon
        y:  51.495, //508,   // lat, up and down
        z: 650 // elevation in meters
      },
  
      tilt: 65
    };
        }
        else if (lat == -33.865143) //sydney
        {
          location =  { //151.209900,-33.865143
            position: {
              x: 151.209900, // lon
              y:  -34.15, //508,   // lat, up and down
              z: 22650 // elevation in meters
            },
        
            tilt: 65
          };
        }
        else
        {
          location = [lon,lat];
        }

    this._sceneView.goTo(location).then(function () {
      //this._sceneView.goTo(sv).then(function () {
      //that._mapView.zoom = that._mapView.zoom - 1;
      debugger;
      that.addGraphic3D(lat, lon);
      that.locateCompleteSource.next();


     
    });
  }

  public addGraphic3D(lat: any, lon: any) // IEvent)
  {
    //this._sceneView.graphics.clear();
    //this._sceneView.graphics.removeAll();

    var point = new this._point(
      {
       latitude: lat,
       longitude: lon
      });

      var pointGraphic = new this._graphic({
        geometry: point,
        //symbol: this.generateCylinderSymbol2((Math.floor(Math.random() * 32) + 10) *10000)
        symbol: this.generateCylinderSymbol2(6000)
      }); 

      this.addCityGraphics();

      this._sceneView.graphics.add(pointGraphic);

      
  }

  private generateCylinderSymbol2(height :number)
  {
    var res =  {
     type: "point-3d",  // autocasts as new PointSymbol3D()
     symbolLayers: [{
       type: "object",  // autocasts as new ObjectSymbol3DLayer()
       width: 1500,  // diameter of the object from east to west in meters
       height:height,
     //  height: 320000,  // height of the object in meters
       depth: 1500,  // diameter of the object from north to south in meters
      resource: { primitive: "cylinder" },
       material: { color: "orangered" }
     }]
   };
 
   return res;
 
  }


  private addCityGraphics()
  {
    let layer = new this._graphicsLayer();
    this._map.add(layer);
 
    //willis 
    var willisPolygon1 = new this._polygon(
      {
            rings: [
         [[-0.08175,51.51317],
           [-0.08154,51.51308],//
           [-0.08184,51.51264],
             [-0.08206,51.51267],
           [-0.08184,51.51288],
          [-0.08175,51.51317]
            ],
          ]}) ; //,
 
  var willisPolygon2 = new this._polygon(
      {
            rings: [
         [
              [-0.08154,51.51308],
              [-0.08132,51.51299],
              [-0.08161,51.51262],
               [-0.08184,51.51264],
                [-0.08160,51.51284],
              [-0.08154,51.51308]
            ]
          ]}) ; //,
 
 var willisPolygon3 = new this._polygon(
      {
            rings: [
               [
              [-0.08132,51.51299],
              [-0.08112,51.51286],
            [-0.08116,51.51272],
              [-0.08128,51.51263],
                [-0.08161,51.51262],
              [-0.08137,51.51278],
              [-0.08132,51.51299]
            ]
          ]}) ; //,
 
          var willisPolygon4 = new this._polygon(
            {
                  rings: [
                     [
                    [-0.081062,51.512905],
                    [-0.080488,51.512988],
                  [-0.080370,51.512631],
                    [-0.080826,51.512588],
                      [-0.080992,51.512711],
                    [-0.081062,51.512905],
                  ]
                ]})
 
    var willisGraphic1 = new this._graphic({
      geometry: willisPolygon1,
      symbol: this.generateExtrudeSymbol("#9E559C",75)
    }); 
      
    layer.add(willisGraphic1);
 
      var willisGraphic2 = new this._graphic({
      geometry: willisPolygon2,
      symbol: this.generateExtrudeSymbol("#9E559C",105)
    }); 
      
    layer.add(willisGraphic2);
 
      var willisGraphic3 = new this._graphic({
      geometry: willisPolygon3,
      symbol: this.generateExtrudeSymbol("#9E559C",130)
    }); 
      
    layer.add(willisGraphic3);
 
     var willisGraphic4 = new this._graphic({
      geometry: willisPolygon4,
      symbol: this.generateExtrudeSymbol("#9E559C",50)
    }); 
      
    layer.add(willisGraphic4);
 
 
    //aviva
    var avivaPolygon = new this._polygon(
      {
        rings: [
           [
          [-0.081866,51.514461],
          [-0.081330,51.514457],
        [-0.081335,51.514117],
          [-0.081872,51.514133],
            [-0.081866,51.514461],
        ]
      ]});
 
      var avivaGraphic = new this._graphic({
        geometry: avivaPolygon,
        symbol: this.generateExtrudeSymbol("#00F",170)
      }); 
 
      layer.add(avivaGraphic);
 
    //-- gherkin
    var gherkinPoint = new this._point(
      {
       latitude: 51.514495,
       longitude: -0.080311
      });
 
    var gherkinGraphic = new this._graphic({
      geometry: gherkinPoint,
      symbol: this.generateCylinderSymbol()
    }); 
      
     layer.add(gherkinGraphic);
 
    //--  cheesegrater
    var cheesegraterPolygon = new this._polygon(
      {
        rings: [
           [
          [-0.082679,51.513983],
          [-0.081947,51.513990],
        [-0.081931,51.513613],
          [-0.082628,51.513593],
            [-0.082679,51.513983],
        ]
      ]});
 
    var cheesegraterGraphic = new this._graphic({
      geometry: cheesegraterPolygon,
      //symbol: this.generateExtrudeSymbol("#FF0",150)
      symbol: this.generateTetrahedronSymbol2()
    }); 
      
    layer.add(cheesegraterGraphic);
 
    //-- shard
    var shardPolygon = new this._point(
      {
       latitude: 51.504509,
       longitude: -0.086517
      });
 
 
    var shardGraphic = new this._graphic({
      geometry: shardPolygon,
      symbol: this.generateTetrahedronSymbol()
    }); 
    
    layer.add(shardGraphic);
 
    //---------- walkie ----------------
    var walkiePolygon = new this._polygon(
      {
        rings: [
          [
          [-0.083862,51.511599],
          [-0.083116,51.511496],
          [-0.083266,51.510915],
          [-0.084044,51.511005],
          [-0.083862,51.511599],
        ]
      ]}
    );
 
    var walkieGraphic = new this._graphic({
      geometry: walkiePolygon,
      symbol: this.generateExtrudeSymbol("#00FF00",170)
    });   
 
    layer.add(walkieGraphic);
    
   
  }
 
  private generateTetrahedronSymbol2()
   {
     var res =  {
      type: "point-3d",  // autocasts as new PointSymbol3D()
      symbolLayers: [{
        type: "object",  // autocasts as new ObjectSymbol3DLayer()
        width: 65,  // diameter of the object from east to west in meters
        height: 220,  // height of the object in meters
        depth: 65,  // diameter of the object from north to south in meters
       resource: { primitive: "tetrahedron" },
        material: { color: "yellow" }
      }]
    };
  
    return res;
  
   }
 
   private generateCylinderSymbol()
   {
     var res =  {
      type: "point-3d",  // autocasts as new PointSymbol3D()
      symbolLayers: [{
        type: "object",  // autocasts as new ObjectSymbol3DLayer()
        width: 55,  // diameter of the object from east to west in meters
        height: 250,  // height of the object in meters
        depth: 55,  // diameter of the object from north to south in meters
       resource: { primitive: "sphere" },
        material: { color: "red" }
      }]
    };
  
    return res;
  
   }
 
   private generateExtrudeSymbol(color, size){
     return new this._polygonSymbol3D({
       symbolLayers: [new this._extrudeSymbol3DLayer({
         size: size,
         material: { color: color }
       })]
     }); 
   }
 
   private generateTetrahedronSymbol()
   {
     var res =  {
      type: "point-3d",  // autocasts as new PointSymbol3D()
      symbolLayers: [{
        type: "object",  // autocasts as new ObjectSymbol3DLayer()
        width: 75,  // diameter of the object from east to west in meters
        height: 350,  // height of the object in meters
        depth: 75,  // diameter of the object from north to south in meters
       resource: { primitive: "tetrahedron" },
        material: { color: "dodgerblue" }
      }]
    };
  
    return res;
  
   }
  
  
}
