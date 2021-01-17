// Core Modules
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

// Material Modules
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

// AIDA Services
import { RegistriesService } from '@features/registries/service/registries.service';
import { ToastMessage } from '@shared/services/toast-message';

// 3rd Party Module
import { JsonConvert } from 'json2typescript';

// Models
import { Companies } from '@features/registries/models/companies.model';

// AIDA Components
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';

// Utils
import { Messages } from '@utils/data/message';
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';

// rxjs Operators
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies: any;
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'phone',
    'manager',
    'industry',
    'action',
  ];
  dataSource: any;
  isAddCompanyDialogOpen: boolean = false;
  isTableLoading: boolean = false;
  jsonConvert: JsonConvert;
  messages: any;
  selection = new SelectionModel<any>(true, []);
  subscription: Subscription;
  tenantId: string;
  userId: string;
  user: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructor
   */
  constructor(
    private registriesService: RegistriesService,
    private loginInUserData: GetLoggedUserService,
    private toast: ToastMessage,
    private dialog: MatDialog
  ) {}

  /**
   * Lifecycle hooks
   */
  ngOnInit(): void {
    this.jsonConvert = new JsonConvert();
    this.getLoggedInUser();
    this.initTableData([]);
    this.defineFilter();
    this.messages = Messages.en;
  }

  /**
   * To get CompanyList on slider close
   */
  subscribeRegistriesSubjectChanges() {
    this.isTableLoading = true;
    this.subscription = this.registriesService.registriesSubject.subscribe(
      (res: any) => {
        if (res == 'closeCompany') {
          this.isTableLoading = false;
          this.isAddCompanyDialogOpen = false;
          this.getAllCompanies(this.user.tenantId, this.user.id);
        }
      },
      (error) => {}
    );
  }

  /**
   * Get Logged In User Details;
   */
  getLoggedInUser() {
    this.loginInUserData.getLoginUserData().subscribe((res: any) => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
    });
    this.getAllCompanies(this.user.tenantId, this.user.id);
    this.subscribeRegistriesSubjectChanges();
  }

  /**
   * Open Company slider
   */
  addCompanyDialog() {
    this.isAddCompanyDialogOpen = !this.isAddCompanyDialogOpen;
  }

  /**
   * To take user confirmation to delete the record
   * @param {Object} record Record to be deleted
   */
  deleteDialog(record: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: { title: `Delete Company Record ${record.name}` },
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {
      console.log(res);
      if (res) {
        this.deleteCompany(record.id);
      }
    });
  }

  /**
   * To delete the Record
   * @param {any} id Id of the record
   */
  deleteCompany(id: any) {
    this.isTableLoading = true;
    this.registriesService.deleteCompanyById(id).subscribe(
      (res: any) => {
        this.toast.open(this.messages.company.success.deleted, 'close');
        this.getAllCompanies(this.user.tenantId, this.user.id);
      },
      (err: any) => {
        this.isTableLoading = false;
        this.toast.open(this.messages.company.error.unableToDelete, 'error');
      }
    );
  }

  /**
   * Table row all selected
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Table toggle checkbox
   */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  /**
   * Check box label
   * @param {any} row
   */
  checkboxLabel(row?: any): string {
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
   * Init table
   * @param {any} data
   */
  initTableData(data: any): void {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Get all company (By tenant and User Id)
   * @param {string} tenantId
   * @param {string} userId
   * @returns void
   */
  getAllCompanies(tenantId: string, userId: string): void {
    this.isTableLoading = true;
    this.registriesService.getAllCompanies(tenantId, userId).subscribe(
      (res: any) => {
        this.isTableLoading = false;
        this.companies = this.jsonConvert.deserialize(res.data, Companies);
        this.initTableData(this.companies);
      },
      (err: any) => {
        this.isTableLoading = false;
        this.toast.open(this.messages.company.error.unableToGet, 'error');
      }
    );
  }

  /**
   * Apply filter
   * @param {Event} event
   * @returns void
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        data.typology.toLowerCase().includes(searchString) ||
        data.phoneNumber.toLowerCase().includes(searchString)||
        data.manager.name.toLowerCase().includes(searchString)
      );
    };
  }

  /**
   * Angular lifecycle hook
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
