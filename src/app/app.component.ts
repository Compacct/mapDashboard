import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {GoogleMap , MapInfoWindow, MapMarker } from '@angular/google-maps';
import { DateConvertService } from './date-convert.service';

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
  objmapData:mapData = new mapData()
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  title = 'mapDashboard';
  popupListData = []
  popupListDataHeader = []
  public geocoder: google.maps.Geocoder;
  visible:boolean = false
    allData:any =[]
    allDataBckUp:any = []
    filteredData: any[] = [];
    isVisible:boolean = false
    selectedValue = undefined;
    selectReport:any = undefined
    selectedMap:any = undefined

    finalColors: any[] = [];
    zones: any[] = [];
    districts: any[] = [];
    states: any[] = [];
  
    selectedColor: string = '';
    selectedZone: string = '';
    selectedDistrict: string = '';
    selectedState: string = '';
    stateDistrictMap: any[] = [];
    multipleValue:any = []
    listOfOptionMulti:any = [
      { label: 'R1', value: 'R1' },
      { label: 'R2', value: 'R2' },
    ]
    
    listOfOption = [
      { label: 'Green', value: 'Green' },
      { label: 'Red', value: 'Red' },
      { label: 'Blue', value: 'Blue', },
    ]
    listOfOptionMap:any = []
    center: google.maps.LatLngLiteral = {
    lat: 22.5630255,
    lng: 88.39625699999999
      };
    options: google.maps.MapOptions = {
      zoomControl: false,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      mapTypeControl:false,
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
    zoom = 5;
    markerOptions: google.maps.MarkerOptions = {};
    optionObj:any = {}
    markerPositions: any = [];
    comp_hash_map:any;
  constructor(
    private $http : HttpClient,
    private DateConvert:DateConvertService
  ){
    this.geocoder = new google.maps.Geocoder();
    this.window = window;
  }
  ngOnInit(): void {
   
  //this.CommonPostApi()
  this.getMapList()
  const params = new URLSearchParams(window.location.search);
  this.comp_hash_map = params.get("hash");
  console.log('comp_hash_map_2',this.comp_hash_map)
  }

  getMapList(){
    this.listOfOptionMap = []
   const httpOptions = {
      headers: new HttpHeaders({
       'x-functions-key': 'MlAFr2EHtO0l9-RyvYwOdpNXKYiczxmvjyYF3eIs3b6SAzFuRYL_ig==',
       'spc': 'AOMG1YHHK8XODWV8FU0D'
      }),
    };
    this.$http.get('https://compaccterptestenv.azurewebsites.net/api/compacctget/nested',httpOptions).subscribe((data:any)=>{
      console.log(data)
      this.listOfOptionMap = data.data.length ? data.data : []
      if(this.listOfOptionMap.length){
        this.listOfOptionMap.forEach((el:any) => {
          el['label'] = el.report_name
          el['value'] = el.sp_code
        });
      }
      
    })

  }
  mapChange(){

  }
  async getmapData(datalist){
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
    //  const latLng = await this.getLatLongFromPincode(String(ele.distributor_pin))
       this.markerPositions.push(
        {  
        'lat':Number(ele.lat),
        "lng":Number(ele.long),
        'ZONE' : ele.ZONE,
        'address_hash': ele.address_hash,
        'customer_id': ele.customer_id,
        'customer_order_status_details' : ele.customer_order_status_details,
        'customer_sub_ledger_hash': ele.customer_sub_ledger_hash,
        'customer_sub_ledger_name':ele.customer_sub_ledger_name,
        'final_color':ele.final_color,
        'last_ord_date' : ele.last_ord_date,
        'location': ele.location,
        'order_amount': ele.order_amount,
        'pin': ele.pin,
        "markerOptions": this.markerOptions = {
         icon: {
            url: selectImg(ele.final_color), // Specify the path to your custom icon
            scaledSize: new google.maps.Size(20, 25) // Adjust the size here
          },
         title: ele.customer_sub_ledger_name
        } })
    });
    this.filteredData = [...datalist]
    
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
     this.isVisible = false;
  }
  openPopup(marker: MapMarker,option:any){
    this.popupListData = []
    this.popupListDataHeader = []
    this.optionObj = option
    if(option.customer_sub_ledger_hash && option.address_hash ){
      // this.map.googleMap.setOptions(null)
      // setTimeout(() => {
      //   this.map.googleMap.setOptions({
      //     zoomControl: false,
      //     scrollwheel: true,
      //     disableDoubleClickZoom: false,
      //     maxZoom: 18,
      //     minZoom: 3,
      //   })
      //     this.map.googleMap.setCenter({ lat:  22.5630255, lng: 88.39625699999999 })
      //     this.map.googleMap.setZoom(10)
       
      // }, 0);
      
      // this.CommonPostclickApi(option)
      // this.backButton = true

      const findlistOfOptionMap = this.listOfOptionMap.find(el=> el.value == this.selectedMap)

      const httpOptions = {
        headers: new HttpHeaders({
         'x-functions-key': 'MlAFr2EHtO0l9-RyvYwOdpNXKYiczxmvjyYF3eIs3b6SAzFuRYL_ig==',
         'spc': findlistOfOptionMap.sp_code
        }),
      };
        this.objmapData.fdate = this.objmapData.fdate ? this.DateConvert.date_Convert(this.objmapData.fdate) : this.DateConvert.date_Convert(new Date())
        this.objmapData.tdate = this.objmapData.tdate ? this.DateConvert.date_Convert(this.objmapData.tdate) : this.DateConvert.date_Convert(new Date())

        const tempSendData = {
          "customer_sub_ledger_hash": option.customer_sub_ledger_hash,
          "address_hash": option.address_hash,
          "fdate": this.objmapData.fdate,
          "tdate":this.objmapData.tdate   
        }
        const url = `https://compaccterptestenv.azurewebsites.net/api/compacctpost/nested`
      this.$http.post(url,JSON.stringify(tempSendData),httpOptions).subscribe((data:any)=>{
        this.popupListData = data.data ? data.data : []
        if(this.popupListData.length){
          this.popupListDataHeader = Object.keys(data.data[0])
          this.isVisible = true
        }
        
      })

   
    }
    // if(option.outlet_id){
    //   this.isVisible = true
    // }
    
  }
  change(value: boolean): void {
    console.log(value);
  }
  CommonPostApi(){
    this.allData = []
    this.allDataBckUp = []
    this.markerPositions = []
    this.finalColors = [];
    this.zones = [];
    this.districts = [];
    this.states = [];
  
    this.selectedColor = '';
    this.selectedZone = '';
    this.selectedDistrict = '';
    this.selectedState = '';
    this.stateDistrictMap = [];
    if(this.selectedMap){
      const httpOptions = {
        headers: new HttpHeaders({
         'x-functions-key': 'MlAFr2EHtO0l9-RyvYwOdpNXKYiczxmvjyYF3eIs3b6SAzFuRYL_ig==',
         'spc': this.selectedMap
        }),
      };
        this.objmapData.comp_hash=this.comp_hash_map;
        this.objmapData.fdate = this.objmapData.fdate ? this.DateConvert.date_Convert(this.objmapData.fdate) : this.DateConvert.date_Convert(new Date())
        this.objmapData.tdate = this.objmapData.tdate ? this.DateConvert.date_Convert(this.objmapData.tdate) : this.DateConvert.date_Convert(new Date())
      const url = `https://compaccterptestenv.azurewebsites.net/api/compacctpost/nested`
      this.$http.post(url,JSON.stringify(this.objmapData),httpOptions).subscribe((data:any)=>{
      console.log(data.data)
      this.allData = data.data
      this.allDataBckUp = [...this.allData]
      this.filteredData = [...this.allData];
      this.getmapData(this.allData)
      this.extractFilterOptions()
    })
    }
   
  }
  extractFilterOptions() {
    this.finalColors = this.getUniqueOptions(this.allData.map(item => item.final_color));
    this.zones = this.getUniqueOptions(this.allData.map(item => item.ZONE));
    this.states = this.getUniqueOptions(this.allData.map(item => item.state));
    
    // Create state-district map
    this.stateDistrictMap = this.allData.reduce((acc, item) => {
      const existingState = acc.find(s => s.state === item.state);
      if (existingState) {
        if (!existingState.districts.includes(item.district)) {
          existingState.districts.push(item.district);
        }
      } else {
        acc.push({ state: item.state, districts: [item.district] });
      }
      return acc;
    }, [] as any[]);

    // Sort districts within each state
    this.stateDistrictMap.forEach(state => {
      state.districts.sort();
    });
  }
  applyFilters() {
    this.filteredData = this.allData.filter(item =>
      (!this.selectedColor || item.final_color === this.selectedColor) &&
      (!this.selectedZone || item.ZONE === this.selectedZone) &&
      (!this.selectedState || item.state === this.selectedState) &&
      (!this.selectedDistrict || item.district === this.selectedDistrict)
    );
    this.getmapData(this.filteredData)
  }
  getUniqueOptions(values: string[]): any[] {
    return [...new Set(values)]
      .filter(value => value !== null && value !== undefined && value !== '')
      .sort()
      .map(value => ({ label: value, value: value }));
  }


  onStateChange() {
    this.selectedDistrict = '';
    if (this.selectedState) {
      const selectedStateData = this.stateDistrictMap.find(s => s.state === this.selectedState);
      this.districts = selectedStateData ? this.getUniqueOptions(selectedStateData.districts) : [];
    } else {
      this.districts = [];
    }
    this.applyFilters();
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
  getDateRange(dateRangeObj: any) {
    if (dateRangeObj.length) {
        this.objmapData.fdate = dateRangeObj[0]
        this.objmapData.tdate = dateRangeObj[1]
    }
  }
  close(){
    this.visible = false
  }
  open(){
    this.visible = true
  }
}


class mapData{
  fdate:any
  tdate:any
  comp_hash:any
}