import React, {Component} from 'react';
import './App.css';
import {Map, MouseTool} from 'react-amap';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    const self = this;
    this.state = {
      what: '点击下方按键开始拾取坐标点',
      aqi: ''
    };
    this.toolEvents = {
      created: (tool) => {
        console.log(tool);
        self.tool = tool;
      },
      draw({obj}) {
        self.drawWhat(obj);
      }
    };
    this.mapPlugins = ['ToolBar'];
    this.mapCenter = {longitude: 116.404, latitude: 39.914};
  }

  drawWhat(obj) {
    let text = '';
    switch (obj.CLASS_NAME) {
      case 'AMap.Marker':
        text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
        let lng = obj.getPosition().lng;
        let lat = obj.getPosition().lat;
        let that = this
        $.ajax({
          url: `http://saweather.market.alicloudapi.com/gps-to-weather?from=3&lat=${lat}&lng=${lng}`,
          dataType: 'json',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'APPCODE 2329c133d00a458593de35693a976923');
          },
          success: function(result) {
            that.setState({
              aqi: '该点空气指数为：' + result.showapi_res_body.now.aqi
            })
          }
        });
        break;
      case 'AMap.Polygon':
        text = `你绘制了一个多边形，有${obj.getPath().length}个端点`;
        break;
      case 'AMap.Circle':
        text = `你绘制了一个圆形，圆心位置为{${obj.getCenter()}}`;
        break;
      default:
        text = '';
    }
    this.setState({
      what: text
    });
  }

  drawMarker() {
    if (this.tool) {
      this.tool.marker();
      this.setState({
        what: '准备绘制坐标点'
      })
    }
  }

  render() {
    return (
      <div id="map-container">
        <Map
          amapkey={"618154dbc06576969b45f06f35174eff"}
          plugins={this.mapPlugins}
          center={this.mapCenter}>
          <MouseTool events={this.toolEvents}/>
          <div className="layerStyle">{this.state.what}&nbsp;{this.state.aqi}</div>
        </Map>
        <button onClick={() => {
          this.drawMarker()
        }}>绘制坐标点
        </button>
      </div>
    );
  }
}

export default App;
