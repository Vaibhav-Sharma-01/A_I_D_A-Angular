import { Component, OnInit } from '@angular/core';

// AIDA Service
import { SideSlideService } from '../../services/side-slide.service';

@Component({
  selector: 'app-side-slide',
  templateUrl: './side-slide.component.html',
  styleUrls: ['./side-slide.component.scss']
})
export class SideSlideComponent implements OnInit {
  isOpen: boolean = false;

  constructor(
    private sideSlide: SideSlideService
  ) { }

  ngOnInit(): void {
    this.sideSlide.isSideSlideOpen = true;
  }

}
