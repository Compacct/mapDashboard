import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
declare const window: any;
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  window!:any;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  title = 'mapDashboard';
  allData:any = 
    [
      {
        "Lat": "22.670713",
        "Long": "88.475155",
        "Distributor": "D1",
        "SalesMan": "S1",
        "Retailer": "R_1_1",
        "Color": "Red",
        "Distributor_color": 1
      },
      {
        "Lat": "22.665011",
        "Long": "88.473095",
        "Distributor": "D1",
        "SalesMan": "S1",
        "Retailer": "R_1_2",
        "Color": "Green",
        "Distributor_color": 1
      },
      {
        "Lat": "22.664061",
        "Long": "88.477730",
        "Distributor": "D1",
        "SalesMan": "S1",
        "Retailer": "R_1_3",
        "Color": "Orange",
        "Distributor_color": 1
      },
      {
        "Lat": "22.666595",
        "Long": "88.483223",
        "Distributor": "D1",
        "SalesMan": "S1",
        "Retailer": "R_1_4",
        "Color": "Red",
        "Distributor_color": 1
      },
      {
        "Lat": "22.676891",
        "Long": "88.478245",
        "Distributor": "D1",
        "SalesMan": "S1",
        "Retailer": "R_1_5",
        "Color": "Green",
        "Distributor_color": 1
      },
      {
        "Lat": "22.655665",
        "Long": "88.494037",
        "Distributor": "D1",
        "SalesMan": "S2",
        "Retailer": "R_2_1",
        "Color": "Green",
        "Distributor_color": 1
      },
      {
        "Lat": "22.651704",
        "Long": "88.482021",
        "Distributor": "D1",
        "SalesMan": "S2",
        "Retailer": "R_2_2",
        "Color": "Green",
        "Distributor_color": 1
      },
      {
        "Lat": "22.657407",
        "Long": "88.494209",
        "Distributor": "D1",
        "SalesMan": "S2",
        "Retailer": "R_2_3",
        "Color": "Red",
        "Distributor_color": 1
      },
      {
        "Lat": "22.642991",
        "Long": "88.482193",
        "Distributor": "D1",
        "SalesMan": "S2",
        "Retailer": "R_2_4",
        "Color": "Green",
        "Distributor_color": 1
      },
      {
        "Lat": "22.647585",
        "Long": "88.493523",
        "Distributor": "D1",
        "SalesMan": "S2",
        "Retailer": "R_2_5",
        "Color": "Orange",
        "Distributor_color": 1
      },
      {
        "Lat": "22.659308",
        "Long": "88.527340",
        "Distributor": "D2",
        "SalesMan": "S3",
        "Retailer": "R_3_1",
        "Color": "Orange",
        "Distributor_color": 2
      },
      {
        "Lat": "22.659150",
        "Long": "88.540386",
        "Distributor": "D2",
        "SalesMan": "S3",
        "Retailer": "R_3_2",
        "Color": "Green",
        "Distributor_color": 2
      },
      {
        "Lat": "22.655506",
        "Long": "88.536953",
        "Distributor": "D2",
        "SalesMan": "S3",
        "Retailer": "R_3_3",
        "Color": "Green",
        "Distributor_color": 2
      },
      {
        "Lat": "22.664061",
        "Long": "88.544334",
        "Distributor": "D2",
        "SalesMan": "S3",
        "Retailer": "R_3_4",
        "Color": "Red",
        "Distributor_color": 2
      },
      {
        "Lat": "22.639664",
        "Long": "88.532146",
        "Distributor": "D2",
        "SalesMan": "S3",
        "Retailer": "R_3_5",
        "Color": "Green",
        "Distributor_color": 2
      }
    ]
    allDataBckUp:any = []
    isVisible:boolean = false
    selectedValue = undefined;
    selectReport:any = undefined
    multipleValue:any = []
    listOfOptionMulti:any = [
      { label: 'R1', value: 'R1' },
      { label: 'R2', value: 'R2' },
    ]
    
    listOfOption = [
      { label: 'Green', value: 'Green' },
      { label: 'Red', value: 'Red' },
      { label: 'Orange', value: 'Orange', },
    ];
  constructor(){
    this.window = window;
    console.log(this.markerOptions)
  }
  ngOnInit(): void {
    // const strokColor = (Distributorcolor:any) =>{
    //   if(Distributorcolor == 1){
    //     return '#0222E9'
    //   }
    //   if(Distributorcolor == 2){
    //     return '#47054D'
    //   }
     
    //   return
    // }
    // this.allData.forEach((ele:any) => {
    //   this.markerPositions.push(
    //     {
    //     "Distributor": ele.Distributor,
    //     "SalesMan": ele.SalesMan,
    //     "Retailer": ele.Retailer,
    //     'lat':Number(ele.Lat),
    //     "lng":Number(ele.Long),
    //     "markerOptions": this.markerOptions = {
    //         icon: {
    //         path: google.maps.SymbolPath.CIRCLE,
    //         scale: 10,
    //         strokeColor: strokColor(ele.Distributor_color),
    //         fillColor: ele.Color,
    //         fillOpacity: 1,
    //         strokeWeight:8
    //       }
    //     } })
    // });
    this.allDataBckUp = [...this.allData]
    this.getmapData(this.allData)
  
  }
  optionObj:any = {}
  getmapData(datalist:[]){
    this.allData = []
    this.markerPositions = []
    const strokColor = (Distributorcolor:any) =>{
      if(Distributorcolor == 1){
        return '#0222E9'
      }
      if(Distributorcolor == 2){
        return '#47054D'
      }
     
      return
    }
    datalist.forEach((ele:any) => {
      this.markerPositions.push(
        {
        "Distributor": ele.Distributor,
        "SalesMan": ele.SalesMan,
        "Retailer": ele.Retailer,
        'lat':Number(ele.Lat),
        "lng":Number(ele.Long),
        "markerOptions": this.markerOptions = {
            icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            strokeColor: strokColor(ele.Distributor_color),
            fillColor: ele.Color,
            fillOpacity: 1,
            strokeWeight:8
          }
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
    if (this.infoWindow != undefined) this.isVisible = true
    this.optionObj = option
  }
  change(value: boolean): void {
    console.log(value);
  }
  colorChange(){
    if(this.selectedValue){
      const fillColor= this.allDataBckUp.filter((el:any)=> el.Color == this.selectedValue)
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
  center: google.maps.LatLngLiteral = {
    lat: 22.670713,
    lng: 88.532146
};
options: google.maps.MapOptions = {
   zoomControl: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  maxZoom: 15,
  minZoom: 3,
};
zoom = 10;

markerOptions: google.maps.MarkerOptions = {};
vertices: google.maps.LatLngLiteral[] = [];
verticesOption:google.maps.PolylineOptions = {
 strokeColor: 'red',
  strokeWeight:100
}
markerPositions: any = [];

}
