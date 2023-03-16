import { Component, Input, OnChanges } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {

  @Input() center?: LngLatLike;
  @Input() marks?: LngLatLike[];

  coordinates: LngLatLike = [-99.1331785, 19.4326296]; // Coordinadas del Zócalo de la CDMX
  zoom: [number] = [16];


  constructor() {
    this.getCoordinates();
  }

  ngOnChanges(): void {
    this.getCoordinates();
  }

  private getCurrentLocation(): Promise<LngLatLike> {
    return new Promise((resolve, _) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => resolve([longitude, latitude])
      );
    });
  }

  private getCoordinates(): void {
    !this.center
      ? this.getCurrentLocation().then(coordinates => this.coordinates = coordinates)
      : this.coordinates = this.center;
  }

}
