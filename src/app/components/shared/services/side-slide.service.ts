import { Injectable } from '@angular/core';

@Injectable()
export class SideSlideService {
  isSideSlideOpen: boolean = false;

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Open Side Slide
   */
  public open(component: any, data: any) {
    this.isSideSlideOpen = true;
  }

  /**
   * Closed Side Slide
   */
  public close() {
    this.isSideSlideOpen = false;
  }
}
