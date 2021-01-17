import { ToastMessage } from '@shared/services/toast-message';
import { RegistriesService } from '@features/registries/service/registries.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// 3rd Party Module
import { JsonConvert } from 'json2typescript';

import { Tenants } from '@features/registries/models/Tenants.model';
import { Messages } from '@utils/data/message';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
})
export class TenantsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'state', 'actions'];
  dataSource = new MatTableDataSource<ITenants>([]);
  messages: any;
  jsonConvert: JsonConvert;
  tenants: any;
  isTableLoading = false;
  selection = new SelectionModel<ITenants>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private RegistriesApis: RegistriesService,
    private toast: ToastMessage
  ) {}

  /**
   * Angular Life Cycle Hook
   */
  ngOnInit(): void {
    this.jsonConvert = new JsonConvert();
    this.messages = Messages.en.tenant;
    this.initTableData([]);
    this.defineFilter();
    this.getTenants();
  }

  /**
   * Angular Life Cycle Hook
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  addTenantDialog() {
    // this.isAddTenantDialogOpen = !this.isAddTenantDialogOpen;
  }

  /**
   * Get Tenants
   */
  getTenants() {
    this.isTableLoading = true;
    this.RegistriesApis.getAllTenants().subscribe(
      (res: any) => {
        this.isTableLoading = false;
        this.tenants = this.jsonConvert.deserialize(res.data, Tenants);
        this.initTableData(this.tenants);
      },
      (err: any) => {
        this.toast.open(this.messages.error.unableToGet, 'error');
        this.isTableLoading = false;
      }
    );
  }

  /**
   * To check if all rows are selected
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Init table
   * @param {any} data
   */
  initTableData(data: any): void {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * To toggle between selections
   */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /**
   * Check box label
   * @param {ITenants} row
   */
  checkboxLabel(row?: ITenants): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  /**
   * Export Excel
   */
  exportExcel() {}

  /**
   * To apply filter on table data
   * @param {Event} event Angular Event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterHead($event: Event) {
    $event.stopPropagation();
  }

  filterTenantState(event: any): void {
    // this.dataSource.filter = event.value.trim().toLowerCase();
  }

  /**
   * Function to define the rules for search
   */
  defineFilter() {
    this.dataSource.filterPredicate = function (
      data: any,
      searchString: string
    ): boolean {
      return (
        data.name.toLowerCase().includes(searchString) ||
        data.email.toLowerCase().includes(searchString) ||
        data.status.toLowerCase().includes(searchString) ||
        data.phoneNumber.toLowerCase().includes(searchString)
      );
    };
  }
}

export interface ITenants {
  id: string;
  name: string;
  state: string;
}
