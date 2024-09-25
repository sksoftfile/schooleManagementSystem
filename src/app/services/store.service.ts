import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  storeInfoUrl =
    'https://angularadmindashboard-d1a76-default-rtdb.firebaseio.com/States/';
  jsonEXT = '.json';

  constructor(public http: HttpClient) {}

  // get employee info
  getStoreEmployeeInfo(state: string): any {
    const url = `${this.storeInfoUrl}${state}/employees${this.jsonEXT}`;
    return this.http.get<Observable<any>>(url);
  }

  // post employee info
  saveStoreEmployeeInfo(state: string, data: any): any {
    const url = `${this.storeInfoUrl}${state}/employees${this.jsonEXT}`;
    return this.http.post(url, data);
  }

  //delete employee info
  deleteStoreEmployeeInfo(state: string, id: string): any {
    const url = `${this.storeInfoUrl}${state}/employees/${id}${this.jsonEXT}`;
    return this.http.delete(url);
  }

  // edit employee info
  editStoreEmployeeInfo(state: string, id: string, data: any): any {
    const url = `${this.storeInfoUrl}${state}/employees/${id}${this.jsonEXT}`;
    return this.http.patch(url, data);
  }

  // get contractor info
  getStoreContractorInfo(state: string): any {
    const url = `${this.storeInfoUrl}${state}/contractors${this.jsonEXT}`;
    return this.http.get<Observable<any>>(url);
  }
}
