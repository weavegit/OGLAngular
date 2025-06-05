import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../Service/customer.service';
import { CustomerDTO } from '../../dto/customer.dto'
import { CommonModule, NgFor } from '@angular/common';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CityDTO } from '../../dto/cities.dto';


@Component({
  selector: 'app-customer',
  imports: [NgFor, GoogleMapsModule, ReactiveFormsModule],
  providers: [CustomerService],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  anySelect = "All"
  customers: CustomerDTO[] = []
  groupedCities: CityDTO[] = []
  filteredCustomers: CustomerDTO[] = []
  postcodes: String[] = [this.anySelect]
  customerForm!: FormGroup



  activate() {
    this.readCustomers()
  }

  setUp() {
    this.customerForm = new FormGroup({
      postcodeSelect: new FormControl({ value: '', disabled: false })
    })

    this.postcodeSelect?.valueChanges.subscribe(((value) => {
      this.filteredCustomers = []
      for (let i = 0; i < this.customers.length; i++) {
        if (this.customers[i].postcode.startsWith(value) || value == this.anySelect)
          this.filteredCustomers.push(this.customers[i])
      }
    }))
  }

  readCustomers() {
    this.customerService.groupCities().subscribe((data) => {
      this.groupedCities = data
    })
    this.customerService.readCustomers().subscribe((data) => {
      this.customers = data
      this.filteredCustomers = this.customers
      var prefix: string = ""
      for (let i = 0; i < this.customers.length; i++) {
        prefix = this.customers[i].postcode.split(" ")[0]
        if (!this.postcodes.includes(prefix)) {
          this.postcodes.push(prefix)
        }
      }
    })
  }

  //-------------------------------
  // Form - GETTERS
  //-------------------------------
  get postcodeSelect() {
    return this.customerForm.get('postcodeSelect')
  }

  addNew() {

    let modalConfig = {
      animation: true,
      backdrop: false,
      size: "lg"
    }

    let modalInstance = this.modalService.open(CustomerDialogComponent, modalConfig)
    modalInstance.componentInstance.existingProduct = undefined
    modalInstance.componentInstance.mode = "Add"
    modalInstance.result.then((data) => {
      if (data != undefined) {
        this.customers?.push(data)
      }
    })
  }
  editCustomer(customer: CustomerDTO) {

    let modalConfig = {
      animation: true,
      backdrop: false,
      size: "lg"
    }

    let modalInstance = this.modalService.open(CustomerDialogComponent, modalConfig)
    modalInstance.componentInstance.existingCustomer = customer
    modalInstance.componentInstance.mode = "Edit"
    modalInstance.result.then((data) => {
      if (data != undefined) {
        let edited = data
        this.customerService.saveCustomer(data).subscribe((data) => {
          for (let i = 0; i < this.customers!.length; i++) {
            if (this.customers![i].id == edited.id) {
              this.customers![i] = edited
            }
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.activate()
    this.setUp()

  }

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {

  }
}
