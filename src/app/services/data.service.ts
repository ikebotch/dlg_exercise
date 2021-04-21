import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaqModel } from './../lib/interfaces/app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http?: HttpClient) {}

  private getFaqRequest() {
    return this.http.get('assets/data/faqs.json');
  }

  async getFaqData(): Promise<FaqModel[]> {
    try {
      // call get FAQ request (since its a local call convert to promise instead)
      const response = await this.getFaqRequest().toPromise();

      return response as FaqModel[];
    } catch (error) {
      // return  empty array if any error is encountered
      return [];
    }
  }
}
