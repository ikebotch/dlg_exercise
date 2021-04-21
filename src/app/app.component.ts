import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FaqModel } from './lib/interfaces/app.interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // states
  // ======
  currentFaqIndex: BehaviorSubject<number> = new BehaviorSubject(null);
  faqData: BehaviorSubject<FaqModel[]> = new BehaviorSubject([]); //  set default

  constructor(private dataService: DataService) {}

  // Lifecycle Methods
  // ==================

  ngOnInit(): void {
    // run initialization
    this.initialize();
  }

  // Methods
  // =======

  /**
   * @name initialize
   * @description Initializes the toogle states based on the length of the FAQ array
   */

  private async initialize(): Promise<void> {
    // get faq data
    const faqData = await this.fetchFaqData();

    // init local state for faq data
    this.faqData.next(faqData);
  }

  private async fetchFaqData(): Promise<FaqModel[]> {
    // declare faq data
    let faqData: FaqModel[];

    try {
      // get data from service
      const data = await this.dataService.getFaqData();

      // init faq data
      faqData = data;
    } catch (error) {
      // log error to console

      // init faq data to empty array
      faqData = [];
    }

    // return faq data
    return faqData;
  }

  public openFaq(index: number) {
    // check if incoming index is the same as current index
    if (this.currentFaqIndex.getValue() === index) {
      // set current index to null
      this.currentFaqIndex.next(null);
    } else {
      // change current state of current faq index
      this.currentFaqIndex.next(index);
    }
  }
}
