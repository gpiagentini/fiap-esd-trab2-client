import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseModel } from '../models/responses/login-response-model';
import { LoginRequestModel } from '../models/requests/login-request-model';
import { Observable } from 'rxjs';
import { AssetModel } from '../models/asset-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private loginUrl = 'http://localhost/login';
  private apiUrl = 'http://localhost/api/v1';

  constructor(private http: HttpClient) { }

  public doLogin(username: string, password: string): Observable<LoginResponseModel> {
    let loginRequest = new LoginRequestModel(username, password);
    return this.http.post<LoginResponseModel>(this.loginUrl, { login: loginRequest.login, password: loginRequest.password });
  }

  public getMyAssets(): Observable<AssetModel[]> {
    return this.http.get<AssetModel[]>(this.apiUrl + '/asset-list', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth-token') } });
  }

  public removeAssets(asset: string): Observable<any> {
    return this.http.delete<AssetModel[]>(this.apiUrl + '/asset-list/' + asset, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth-token') } });
  }

  public addAsset(asset: string): Observable<any> {
    return this.http.post(this.apiUrl + '/asset-list', { asset: asset }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth-token') } });
  }
}
