import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-quick-menu',
  templateUrl: './quick-menu.component.html',
  styleUrls: ['./quick-menu.component.scss']
})
export class QuickMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  quickMenus = [
    { id: '1', name: 'Add time', icon: 'more_time' },
    { id: '2', name: 'Quick task', icon: 'add_task' },
    { id: '3', name: 'Meeting', icon: 'meeting_room' },
    { id: '4', name: 'Call', icon: 'call' }
  ];
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.quickMenus, event.previousIndex, event.currentIndex);
  }
}
