import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface BackendData {
  server: string;
  nickname: string;
  port?: number;
  description?: string;
  documentation?: string;
}

export interface Endpoint {
  url: string;
  key: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  /***
   * Server connection services
   * @private
   * */
  private backend: BackendData[] = [
    {
      server: 'https://api.mapbox.com',
      nickname: 'mapbox',
      description: 'Mapbox API',
      documentation: 'https://docs.mapbox.com/api'
    },
    {
      server: 'http://api.positionstack.com',
      nickname: 'positionStack',
      description: 'Position Stack API',
      documentation: 'https://positionstack.com/documentation'
    },
  ];

  constructor(
    private http: HttpClient,
  ) { }

  /***
   * Return service DELETE
   * @param nickname: string => Server name
   * @param path: string => Specific path to POST
   * @param includeToken: boolean => Include token default?
   * */
  private Delete(
    nickname: string,
    path: string,
    includeToken = false,
  ): Observable<any> {
    const url = `${ this.getBaseURL(nickname) }${ path }`;
    return this.http.delete(url, { withCredentials: includeToken });
  }

  /***
   * Get Base Url
   * @param nickname: string
   * */
  private getBaseURL(nickname: string): string {
    const result: BackendData | undefined = this.backend.find(service => service.nickname === nickname);
    return `${ result?.server }`;
  }

  /***
   * Return service PATCH
   * @param nickname: string => Server name
   * @param path: string => Specific path to POST
   * @param payload: objet | any => Datas and objets to process
   * @param includeToken: boolean => Include token default?
   * */
  private Patch(
    nickname: string,
    path: string,
    payload: any,
    includeToken = false,
  ): Observable<any> {
    const url = `${ this.getBaseURL(nickname) }${ path }`;
    return this.http.patch(url, payload, { withCredentials: includeToken });
  }

  /***
   * Return service PUT
   * @param nickname: string => Server name
   * @param path: string => Specific path to POST
   * @param payload: objet | any => Datas and objets to process
   * @param includeToken: boolean => Include token default?
   * */
  private Put(
    nickname: string,
    path: string,
    payload: any,
    includeToken = false,
  ): Observable<any> {
    const url = `${ this.getBaseURL(nickname) }${ path }`;
    return this.http.put(url, payload, { withCredentials: includeToken });
  }

  /***
   * Return service GET
   * @param nickname: string => Server name
   * @param path: string => Specific path to POST
   * @param includeToken: boolean => Include token default?
   * */
  Get(
    nickname: string,
    path: string,
    includeToken = false,
  ): Observable<any> {
    const url = `${ this.getBaseURL(nickname) }${ path }`;
    return this.http.get(url, { withCredentials: includeToken });
  }

  /***
   * Return second part of URL
   * @param key: string => ID the identity
   * */
  getEndpoint(key: string): string | undefined {
    const result: Endpoint | undefined = this.endpointService.find(service => service.key === key);
    return result?.url;
  }

  /***
   * Return service POST
   * @param nickname: string => Server name
   * @param path: string => Specific path to POST
   * @param payload: objet | any => Datas and objets to process
   * */
  Post(
    nickname: string,
    path: string,
    payload: any,
  ): Observable<any> {
    const url = `${ this.getBaseURL(nickname) }${ path }`;
    return this.http.post(url, payload, { withCredentials: false });
  }



  /***
   * All Endpoints defined
   * */
  protected endpointService: Endpoint[] = [
    // ? Geocoding-API
    {
      url: '/geocoding/v5/mapbox.places/',
      key: 'get-geolocation',
      description: 'Get geocoding service',
    },
    // ? Geocoding-API
    {
      url: '/v1/forward?access_key=8317f448116a6bdc2a56768eefc638f7&query=',
      key: 'get-forward',
      description: 'Get Forward Geocoding',
    },
  ];

}
