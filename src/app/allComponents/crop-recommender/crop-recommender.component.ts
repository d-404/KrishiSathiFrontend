import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/allServices/common.service';
import { Map, Set } from 'typescript';

@Component({
  selector: 'app-crop-recommender',
  templateUrl: './crop-recommender.component.html',
  styleUrls: ['./crop-recommender.component.css']
})
export class CropRecommenderComponent implements OnInit{

  loader = true;

  thankyou: any = false;
  thankyou2: any = false;
  isDisabled: any = true;

  AllCropsData: any;
  records:any;
  states:any;

  stateMap:any;
  stateDistMap : any;
  stateDistSeasonMap : any;

  arr:any;
  arr2:any;
  arr3:any;


  districts: any;
  seasons:any;
  crops: any;
  crop_data: any;

  valState: any;
  valDist: any;
  valSeason:any;

  constructor(private service: CommonService){
 
  this.records=[];
  this.arr = [];
  this.arr2 = [];
  this.arr3 =[];

  this.stateMap = new Map<string, Set<string>>();
  this.stateDistMap = new Map<string, Set<string>>();
  this.stateDistSeasonMap = new Map<string, Set<string>>();

  this.states = [];

  this.districts= new Set<String>();
  this.seasons = new Set<string>();
  this.crops = new Set<string>();
  this.crop_data = new Set<string>();

  
  setTimeout(() => {
    this.isDisabled = false;
  }, 15000);

  }

   ngOnInit(): void {

    

    this.service.getAllCropData().subscribe((data: any) => {
      this.AllCropsData = data; 

      this.records = this.AllCropsData.records;
      
      
    });
    console.log('inside oninit');

  }


  showStates(){
    this.records.forEach((record: any) =>{
      let state = record.state_name;

      if(this.stateMap.has(state)){

        console.log('map contains ' + state);
        this.arr = this.stateMap.get(state);
        this.arr.add(record.district_name);
        this.stateMap.set(state, this.arr);
      }else{ 

        this.stateMap.set(state, new Set([record.district_name]) );

      }


      //stateDist
      let dist = record.district_name;

      if(this.stateDistMap.has(state+dist)){
        this.arr2 = this.stateDistMap.get(state+dist);
        this.arr2.add(record.season);
        this.stateDistMap.set( (state+dist), this.arr2 );
      }else{
        this.stateDistMap.set( (state+dist), new Set([record.season]) );
      }

      //stateDistSeason
      let season = record.season;

      if(this.stateDistSeasonMap.has(state+dist+season)){
        this.arr3 = this.stateDistSeasonMap.get(state+dist+season);
        this.arr3.add(record.crop);
        this.stateDistSeasonMap.set((state+dist+season), this.arr3);
      }else{
        this.stateDistSeasonMap.set( (state+dist+season), new Set([record.crop]));
      }

      console.log(this.stateDistSeasonMap);

    });

    this.states  = Array.from(this.stateMap.keys());

    this.thankyou = true;
    this.thankyou2 = false;
    
  }

  showDistrict(val:any){
    this.valState = val;
    this.districts = this.stateMap.get(this.valState);
  }

  showSeason(val:any){
    this.valDist = val;
     this.seasons = this.stateDistMap.get((this.valState+this.valDist));
   }

   showCrops(val:any){
    this.valSeason =val;
    this.crops = this.stateDistSeasonMap.get((this.valState+this.valDist+this.valSeason));
   }

   submit(){
    this.crop_data = this.crops;
    this.thankyou =false;
    this.thankyou2 = true;
   }

   
  
}


