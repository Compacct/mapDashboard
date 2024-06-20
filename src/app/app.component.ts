import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {GoogleMap , MapInfoWindow, MapMarker } from '@angular/google-maps';

declare const window: any;
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  window!:any;
  backButton:boolean = false
  
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  title = 'mapDashboard';
  public geocoder: google.maps.Geocoder;

  allData:any =[]
    allDataBckUp:any = []
    isVisible:boolean = false
    selectedValue = undefined;
    selectReport:any = undefined
    selectedMap:any = undefined
    multipleValue:any = []
    listOfOptionMulti:any = [
      { label: 'R1', value: 'R1' },
      { label: 'R2', value: 'R2' },
    ]
    
    listOfOption = [
      { label: 'Green', value: 'Green' },
      { label: 'Red', value: 'Red' },
      { label: 'Blue', value: 'Blue', },
    ];
    listOfOptionMap:any = []
    center: google.maps.LatLngLiteral = {
    lat: 22.5630255,
    lng: 88.39625699999999
      };
options: google.maps.MapOptions = {
  zoomControl: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  styles: [
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ],
  maxZoom: 18,
  minZoom: 3,
};
zoom = 9;
markerOptions: google.maps.MarkerOptions = {};
optionObj:any = {}
markerPositions: any = [];
  constructor(
    private $http : HttpClient
  ){
    this.geocoder = new google.maps.Geocoder();
    this.window = window;
  }
  ngOnInit(): void {
   
  //this.CommonPostApi()
  this.getMapList()
  }

  getMapList(){
    this.listOfOptionMap = []
   const httpOptions = {
      headers: new HttpHeaders({
       'x-functions-key': 'MlAFr2EHtO0l9-RyvYwOdpNXKYiczxmvjyYF3eIs3b6SAzFuRYL_ig==',
       'spc': 'YMHE7AC0TGBWMJCWT5Q0'
      }),
    };
    this.$http.get('https://compaccterptestenv.azurewebsites.net/api/compacctget/nested',httpOptions).subscribe((data:any)=>{
      console.log(data)
      this.listOfOptionMap = data.data.length ? data.data : []
      if(this.listOfOptionMap.length){
        this.listOfOptionMap.forEach((el:any) => {
          el['label'] = el.map_name
          el['value'] = el.sp_code
        });
      }
      
    })

  }
  mapChange(){

  }
  async getmapData(datalist){
    this.allData = []
    this.markerPositions = []
    const selectImg = (colorName:any)=>{
      switch (colorName) {
        case 'Red': return 'assets/img/red-vactor.png'; 
        case 'Green': return 'assets/img/green.png';
        case 'Blue': return 'assets/img/vector-blue.png' 
       default: return 'assets/img/Distribution.png';
      }
    }

   datalist.forEach(async (ele:any , inx) => {
      const latLng = await this.getLatLongFromPincode(String(ele.distributor_pin))
       this.markerPositions.push(
        {
        "distributor": ele.distributor,
        "route_name": ele.route_name,
        'distributor_hash':ele.distributor_hash,
        'route_hash':ele.route_hash,
        'lat':Number(latLng.lat()),
        "lng":Number(latLng.lng()),
        'Distributorcolor':inx + 1,
        "markerOptions": this.markerOptions = {
         icon: {
            url: selectImg(ele.final_color), // Specify the path to your custom icon
            scaledSize: new google.maps.Size(20, 25) // Adjust the size here
          },
         title: ele.distributor
        } })
    });
    this.allData = [...datalist]
  }
  openInfoWindow(marker: MapMarker,option:any) {
    if (this.infoWindow != undefined) {
      this.infoWindow.open(marker);
      this.optionObj = option
    }
    
  }
  closeInfoWindow() {
    if (this.infoWindow != undefined) this.infoWindow.close();
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  openPopup(marker: MapMarker,option:any){
   // 
    this.optionObj = option
    if(option.distributor_hash){
      this.map.googleMap.setOptions(null)
      setTimeout(() => {
        this.map.googleMap.setOptions({
          zoomControl: false,
          scrollwheel: true,
          disableDoubleClickZoom: false,
          maxZoom: 18,
          minZoom: 3,
        })
          this.map.googleMap.setCenter({ lat:  22.5630255, lng: 88.39625699999999 })
          this.map.googleMap.setZoom(10)
       
      }, 0);
      
      this.CommonPostclickApi(option)
      this.backButton = true
    }
    if(option.outlet_id){
      this.isVisible = true
    }
    
  }
  change(value: boolean): void {
    console.log(value);
  }
  colorChange(){
    if(this.selectedValue){
      const fillColor= this.allDataBckUp.filter((el:any)=> el.final_color == this.selectedValue)
      this.getmapData(fillColor)
    }
    else {
      this.getmapData(this.allDataBckUp)
    }
 
  }
  DistributorChange(){
    console.log("multipleValue",this.multipleValue)
    let tempdata:any = []
    if(this.multipleValue.length){
      this.multipleValue.forEach((ele:any) => {
        const fillDis= this.allDataBckUp.filter((el:any)=> el.Distributor == ele)
        tempdata = [...fillDis,...tempdata]
      });
    }
    else {
      tempdata = [...this.allDataBckUp]
    }
    console.log("tempdata",tempdata)
    this.getmapData(tempdata)
  }
  CommonPostApi(){
    this.allData = []
    this.allDataBckUp = []
    if(this.selectedMap){
      const httpOptions = {
        headers: new HttpHeaders({
         'x-functions-key': 'MlAFr2EHtO0l9-RyvYwOdpNXKYiczxmvjyYF3eIs3b6SAzFuRYL_ig==',
         'spc': this.selectedMap
        }),
      };
      const url = `https://compaccterptestenv.azurewebsites.net/api/compacctget/nested`
      this.$http.get(url,httpOptions).subscribe((data:any)=>{
      console.log(data.data)
      this.allData = data.data
      this.allDataBckUp = [...this.allData]
      
      this.getmapData(this.allData)
    })
    }
   
  }

  getLatLongFromPincode(pincode: string): Promise<google.maps.LatLng> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address: pincode }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const location = results[0].geometry.location;
          const latLng = new google.maps.LatLng(location.lat(), location.lng());
          resolve(latLng);
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }

  CommonPostclickApi(option){
    this.allData = []
    this.allDataBckUp = []
    this.markerPositions = []
    const url = `https://compaccterptestenv.azurewebsites.net/api/compacctpost/nested`
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'spc':'BPFIIRYWOC4HFAHIOQR5','x-functions-key':"MlAFr2EHtO0l9-RyvYwOdpNXKYiczxmvjyYF3eIs3b6SAzFuRYL_ig=="}) };
    this.$http.post(url,JSON.stringify({distributor_hash:option.distributor_hash, route_hash : option.route_hash}),httpOptions).subscribe((data:any)=>{
      console.log(data.data)
      this.allData = data.data
    this.allDataBckUp = [...this.allData]
    this.allData.forEach(async (ele:any) => {
      this.markerPositions.push(
        {
        "route_name": ele.route_name,
        'lat':Number(ele.Lat),
        "lng":Number(ele.Long),
        'outlet_id':ele.outlet_id,
        "markerOptions": this.markerOptions = {
            icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeColor: '#57C9EA',
            fillColor: ele.Color,
            fillOpacity: 1,
            strokeWeight:5
          },
          title: ele.retailer
        } 
        
        })
    });
  })
  }

  onMapCenterChanged(e){
    console.log(e)
  }
  clickBack(){
    this.map.googleMap.setOptions({
      zoomControl: false,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      maxZoom: 18,
      minZoom: 3,
    })
    setTimeout(() => {
      // this.map.googleMap = new google.maps.Map(this.map.c, {
      //   center: { lat: 40.730610, lng: -73.935242 }, // Example coordinates
      //   zoom: 12 // Example zoom level
      // });
      this.map.googleMap.setCenter({ lat:  22.5630255, lng: 88.39625699999999 })
      this.map.googleMap.setZoom(10)
    }, 0);
    this.backButton = false
    this.CommonPostApi()
  
  }


}
