import React, {Component} from 'react';
import {json as requestJson} from 'd3-request';
import LAYER_CONFIGS from './layer-configs.js';
import AirportMap from './AirportMap.js';
import MapLayer from './MapLayer.js';

import t1 from './data/01_teren_lotniska.js';
import t2 from './data/02_nawierzchnia_utwardzona.js';
import t3 from './data/03_stanowiska_postojowe.js';
import t4 from './data/04_pas_startowy.js';

import t5 from './data/05_poziome_oznaczenia_pasa.js';
import t6 from './data/06_linie_przerywane_pasa.js';

import t7 from './data/07_drogi_poza_obszarem_kolowania.js';
import t8 from './data/08_drogi_w_obszarze_kolowania.js';

import t9 from './data/09_oznakowanie_poziome_drogowe_przerywane.js';
import t9a from './data/09a_oznakowanie_poziome_drogowe_przerywane_drobne.js';

import t10 from './data/10_oznakowanie_poziome_drogowe_podwojne_linie.js';
import t11 from './data/11_oznakowanie_poziome_drogowe_gruba_linia.js';
import t12 from './data/12_oznakowanie_poziome_drogowe_ciagle.js';
import t13 from './data/13_linie_bezpieczenstwa.js';
import t14 from './data/14_oznakowanie_poziome_ciemne.js';
import t15 from './data/15_oznakowanie_poziome_czarne_bez_ramki.js';
import t16 from './data/16_oznakowanie_poziome_zolte.js';

import t17 from './data/17_tory_dla_pieszych.js';
import t18 from './data/18_budynki.js';

import t19 from './data/19_miejsca_oczekiwania_linie_przerywane.js';
import t20 from './data/20_miejsca_oczekiwania_linie_ciagle.js';
import t21 from './data/21_krawedz_drogi_kolowania.js';
import t22 from './data/22_os_drogi_kolowania.js';
import t23 from './data/23_os_drogi_kolowania_stanowiska_uzupelniajacego.js';

import t24 from './data/24_pola_techniczne.js';
import t25 from './data/25_strefy_zakazu_parkowania.js';

import t26 from './data/26_strefy_stanowisk_postojowych.js';
import t27 from './data/27_miejsca_parkingowe.js';

// import zona from './data/zona_dozwolonego_ruchu_pojazdow.js';

let geoJSONS = {
  "01_teren_lotniska.geojson" : t1,
  "02_nawierzchnia_utwardzona.geojson" : t2,
  "03_stanowiska_postojowe.geojson" : t3,
  "04_pas_startowy.geojson" : t4,
  "05_poziome_oznaczenia_pasa.geojson" : t5,
  "06_linie_przerywane_pasa.geojson" : t6,
  "07_drogi_poza_obszarem_kolowania.geojson" : t7,
  "08_drogi_w_obszarze_kolowania.geojson" : t8,
  "09a_oznakowanie_poziome_drogowe_przerywane_drobne.geojson" : t9,
  "09_oznakowanie_poziome_drogowe_przerywane.geojson" : t9a,
  "10_oznakowanie_poziome_drogowe_podwojne_linie.geojson" : t10,
  "11_oznakowanie_poziome_drogowe_gruba_linia.geojson" : t11,
  "12_oznakowanie_poziome_drogowe_ciagle.geojson" : t12,
  "13_linie_bezpieczenstwa.geojson" : t13,
  "14_oznakowanie_poziome_ciemne.geojson" : t14,
  "15_oznakowanie_poziome_czarne_bez_ramki.geojson" : t15,
  "16_oznakowanie_poziome_zolte.geojson" : t16,
  "17_tory_dla_pieszych.geojson" : t17,
  "18_budynki.geojson" : t18,
  "19_miejsca_oczekiwania_linie_przerywane.geojson" : t19,
  "20_miejsca_oczekiwania_linie_ciagle.geojson" : t20,
  "21_krawedz_drogi_kolowania.geojson" : t21,
  "22_os_drogi_kolowania.geojson" : t22,
  "23_os_drogi_kolowania_stanowiska_uzupelniajacego.geojson" : t23,
  "24_pola_techniczne.geojson" : t24,
  "25_strefy_zakazu_parkowania.geojson" : t25,
  "26_strefy_stanowisk_postojowych.geojson" : t26,
  "27_miejsca_parkingowe.geojson" : t27,
};

console.log('airport.js start');
console.log(geoJSONS);

const DATA_PREFIX = './data/';
//const DATA_PREFIX = 'http://students.mimuw.edu.pl/~pw347276/build/data/';

const LIGHT_SETTINGS = {
  lightsPosition: [18, 54, 5000, 19, 55, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};

export default class Airport extends Component {
	constructor(props) {
    super(props);

    let newData = [];
    LAYER_CONFIGS.forEach((layer, index) => {
      console.log(index);
      console.log(layer);
      console.log(layer.file);
      console.log(geoJSONS[layer.file]);
      newData[index] = {
        ...layer,
        data: geoJSONS[layer.file]
      }

      /*
      this.setState(prevState => {
        console.log('woah');
        let newData = prevState.data;

        console.log('woah');
        console.log(newData);
        return {
          data: newData
        }
      });*/
      console.log('wololo');
    });

    this.state = {
      data: newData
    };


    /*
      requestJson(DATA_PREFIX + layer.file, (error, response) => {
        if (!error) {
          this.setState(prevState => {
            let newData = prevState.data;
            newData[index] = {
              ...layer,
              data: response
            }
            return {
              data: newData
            }
          });
        }
      }), this);*/
  }

  render() {
    //console.log(this.state.data);
    let layers = this.state.data.filter(layer => layer != null).map(layer => new MapLayer({...layer, lightSettings: LIGHT_SETTINGS}));
    //console.log('layers');
    //console.log(layers);
    //
    return (
    <AirportMap layers={layers} />

    );
  }
}
