import React from 'react'
import { Marker, Popup, TileLayer } from 'react-leaflet';
import 'firebase/database';
import { firebaseConfig } from '..';
import { Map } from 'leaflet';
// import Delayed from './Components/Delayed';

var style ={
    map :{
      height:"850px"
    }
  }
var position;
class SimpleMap extends React.Component {
  constructor (props) {
        super(props);
        this.zoom = 13;
        // this.HelperCood = this.HelperCood.bind(this)
        this.Route = '/WaterWatch/SensorLocation/';
        this.position = [0,0]
    }


    componentWillReceiveProps(nextProps){
      try{
        if( this.props.AQUASENSOR_ID != nextProps.AQUASENSOR_ID){
          console.log("Aquasensor Location Map is on",nextProps.AQUASENSOR_ID)
          var ref = firebaseConfig.database().ref(this.Route + nextProps.AQUASENSOR_ID);
          ref.on('value',(snap) => {
            try{
              this.position  = [snap.val()[0],snap.val()[1]];
            }catch(e){
              console.log(e)
            }
          });
        }
        
      }catch(e){
        console.log('first time log in')
      }
      
      
    }

    UNSAFE_componentWillMount(){
      try{
        var ref = firebaseConfig.database().ref(this.Route +this.props.AQUASENSOR_ID);
      ref.on('value',(snap) => {
        try{
          console.log("map on",snap.val())
          var coordDefault_long = snap.val()[Object.keys(snap.val())[0]]
          var coordDefault_lat = snap.val()[Object.keys(snap.val())[1]]
          this.position= [coordDefault_long,coordDefault_lat]
        }catch(e){
          console.log('no geo coord found')
        }
      
      });

      }catch(e){
        console.log('No Geo Found')
      }
      

    }


  clickHandler (){
   console.log('here')
  }

  render() {
    return (
        <Map style = {style.map} zoom ={this.zoom} center = {this.position} scrollWheelZoom= {false}  onRef={ref => this.MAP = ref}>
        <TileLayer url= 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}' 
                   attribution ='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                   id= 'mapbox/streets-v11' 
                   tileSize = {512}
                   zoomOffset = {-1} 
                   accessToken ="pk.eyJ1IjoiY2hyaXM3MTc1IiwiYSI6ImNrZHh1eHNtcTFtb3UyeG1jY2pnZndsYncifQ.7a4agxLIm-mYYf9DVPp9Gw"/>
        <Marker position = {this.position}><Popup>{this.position}</Popup></Marker>  
        </Map>
    )
  }
}
export default SimpleMap;


// class RenderMarker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.click  = this.props.clickHandler;
//         this.info = this.props.info;
//         this.Get = this.Get.bind(this)
//         this.state = {
//           Bools:0,
//           info:this.props.info,
//         }; 
        
//     }
 

//     Get(){ 
//       var A = [];
//       for (var i = 0 ; i < this.props.Coords.length;i++){
//         A.push(<Marker position = {this.props.Coords[i]} onClick ={this.click}><Popup>{this.info[i]}</Popup></Marker>)
//       }
//       return (A);
//     }

  
//     render () {
//         return (  
//             this.Get()          
//         )
//     }
// }
