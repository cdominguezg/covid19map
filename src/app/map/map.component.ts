import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {CaseService} from '../services/case.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map;

  constructor(private caseService: CaseService) {
  }

  icon = L.Icon.extend({
    options: {
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    }
  });


  ngOnInit(): void {
    this.initMap();
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // marker.bindPopup(popup)

    this.caseService.getCases()
      .subscribe(response => {
        response.forEach(element => {
          const popup = L.popup().setLatLng([element.lat, element.lon]).setContent(
            `<p><strong>${element.city_name}</strong><br/><strong>Confirmed</strong>:
            ${element.confirmed}<br />Dead: ${element.dead}<br />Recovered: ${element.recovered}</p>`);
          L.marker([element.lat, element.lon], this.icon).addTo(this.map).bindPopup(popup);
        });
      });

    tiles.addTo(this.map);
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [40.2085, -3.7130],
      zoom: 5.2
    });
  }
}
