// Core Modules
import { Component, OnInit } from '@angular/core';

// Material Modules
import { MatDialog } from '@angular/material/dialog';

// AIDA Components
import { AddWidgetsDialogComponent } from './../../../../../common/widgets-shared/add-widgets-dialog/add-widgets-dialog.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  /**
   * Angualar Life Cycle Hook
   */
  ngOnInit(): void {
  }

  /**
   * Open Widget Dialog
   */
  openAddWidgetDialog() {
    const dialogRef = this.dialog.open(AddWidgetsDialogComponent, {
      width: '600px',
      height: '200px'
    });
    dialogRef.afterClosed().subscribe(
      (res: any) => {
      },
      (err: any) => {
      }
    );
  }

}
