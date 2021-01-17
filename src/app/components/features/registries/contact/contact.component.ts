import { MatDialog } from '@angular/material/dialog';
import { GetLoggedUserService } from '@shared/services/get-logged-user.service';
// Core Modules
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

// Material Modules
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// AIDA Services
import { RegistriesService } from '@features/registries/service/registries.service';
import { ToastMessage } from '@shared/services/toast-message';

// 3rd Party Module
import { JsonConvert } from "json2typescript";
import { LoggedInUser } from '@shared/models/logged-in-user-data.model';
import { Messages } from '@utils/data/message';
import { Subscription } from 'rxjs';
import { Contacts } from '../models/contact.model';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  contacts: any;
  dataSource: any;
  displayedColumns: string[] = ['select', 'name', 'email', 'phone', 'manager', 'country', 'action'];
  isTableLoading: boolean = false;
  isAddContactDialogOpen = false;
  jsonConvert: JsonConvert;
  messages: any
  selection = new SelectionModel<IContacts>(true, []);
  subscription: Subscription;
  user: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructor
   */
  constructor(
    private registriesApis: RegistriesService,
    private loginInUserData: GetLoggedUserService,
    private toast: ToastMessage,
    private dialog: MatDialog
  ) { }

  /**
   * Lifecycle hooks
   */
  ngOnInit(): void {
    this.jsonConvert = new JsonConvert();
    this.messages = Messages.en.contact;
    this.initTableData([]);
    this.getLoggedInUser()
    this.subscribeRegistriesSubject();
    this.defineFilter();
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
   * subscription to changes in table value
   */
  subscribeRegistriesSubject() {
    this.subscription = this.registriesApis.registriesSubject.subscribe(
      (res: any) => {
        if (res == 'closeContact') {
          this.isAddContactDialogOpen = false;
          this.getAllContactByTenantAndUser(this.user.tenantId, this.user.id)
        }
      }
    );
  }


  /**
   *  To get contacts based on tenant Id and userId of logged In user
   * @param {string} tenantId the logged in user tenant id
   * @param {string} userId the logged in user id
   */
  getAllContactByTenantAndUser(tenantId: string, userId: string) {
    this.isTableLoading = true;
    this.registriesApis.getAllContact(tenantId, userId).subscribe(
      (res: any) => {
        this.isTableLoading = false;
        this.contacts = this.jsonConvert.deserialize(res.data,Contacts);
        this.initTableData(this.contacts);
      }
    );
  }

  /**
   * To take user confirmation to delete the record
   * @param {Object} record Record to be deleted
   */
  deleteDialog(record: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {title: `Delete Company Record ${record.name}`}
    });

    dialogRef.afterClosed().subscribe(
      (res: boolean) => {
        console.log(res);
        if(res) {
          this.deleteContact(record.id);
        }
      }
    );
  }

  /**
   * To delete the Record
   * @param {any} id Id of record to be deleted
   */
  deleteContact(id: any) {
    this.isTableLoading = true
    this.registriesApis.deleteContactById(id).subscribe(
      (res: any) => {
        this.toast.open(this.messages.success.deleted, 'close')
        this.getAllContactByTenantAndUser(this.user.tenantId, this.user.id);
      },
      (err: any) => {
        this.isTableLoading = false;
        this.toast.open(this.messages.error.unableToDelete,'error')
      }
    )
  }

  /**
   * to get logged In user details
   */
  getLoggedInUser() {
    this.loginInUserData.getLoginUserData().subscribe((res) => {
      this.user = this.jsonConvert.deserializeObject(res, LoggedInUser);
      this.registriesApis.getAllAdmin(this.user.tenantId).subscribe(
        (res: any) => {
          this.getAllContactByTenantAndUser(this.user.tenantId, this.user.id);
        },
        (err: any) => {
        }
      );
    });
  }

  /**
   * to Slide contact dialog
   */
  addContactDialog() {
    this.isAddContactDialogOpen = !this.isAddContactDialogOpen;
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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  /**
   * Check box label
   * @param {any} row
   */
  checkboxLabel(row?: IContacts): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /**
   * Export Excel
   */
  exportExcel() {

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
    this.dataSource.filterPredicate = function (data: any, searchString: string): boolean {
      return (
        data.name.toLowerCase().includes(searchString) ||
        data.email.toLowerCase().includes(searchString) ||
        data.country.toLowerCase().includes(searchString) ||
        data.phoneNumber.toLowerCase().includes(searchString)
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

export interface IContacts {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
}
