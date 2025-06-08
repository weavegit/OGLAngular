import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../Service/customer.service';
import { CustomerDTO } from '../../dto/customer.dto'
import { NgFor } from '@angular/common';
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
  postcodes: String[] = [this.anySelect]
  customerForm!: FormGroup
  readonly FilterCodeAll = "All"
  filterCode = this.FilterCodeAll

  //
  //  Just Google Map Test data - ignore
  //
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: -31, lng: 147 },
    zoom: 4,
  }
  center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 };
  zoom = 12;
  markers = [
    { lat: 40.73061, lng: -73.935242 },
    { lat: 40.74988, lng: -73.968285 }
  ]
  //
  //  Just Google Map Test data - ignore
  //

  //
  //  Called from ngOnInit - set up page data
  //
  activate() {
    this.readCustomers()
  }

  //
  //  Called from ngOnInit - set up form
  //
  setUp() {
    this.customerForm = new FormGroup({
      postcodeSelect: new FormControl({ value: '', disabled: false })
    })

    this.postcodeSelect?.valueChanges.subscribe(((value) => {
      this.filterCode = value
      this.customers = []
      if (this.filterCode == this.FilterCodeAll) {
        this.readCustomers()
      } else {
        this.readFilteredCustomers(this.filterCode)
      }

    }))
  }

  //-------------------------------
  // Form - GETTERS
  //-------------------------------
  get postcodeSelect() {
    return this.customerForm.get('postcodeSelect')
  }

  //
  //  FORM Call Customer services - no filter, but arms the postcode picker (not filtered)
  //
  readCustomers() {
    this.customerService.readCustomers().subscribe((data) => {
      this.customers = data
      var prefix: string = ""
      for (let i = 0; i < this.customers.length; i++) {
        prefix = this.customers[i].postcode.split(" ")[0]
        if (!this.postcodes.includes(prefix)) {
          this.postcodes.push(prefix)
        }
      }
    })
    this.groupCities()
  }
  //
  //  Update view of the grouped cities
  //
  groupCities() {
    this.customerService.groupCities().subscribe((data) => {
      this.groupedCities = data
    })
  }
  //
  //  Call Customer services and Filter
  //
  readFilteredCustomers(filter: string) {
    this.customerService.readCustomers().subscribe((data) => {
      var customersLcl: CustomerDTO[] = data
      var filteredCustomersLcl: CustomerDTO[] = []

      var postCodePrefix: string = ""
      for (let i = 0; i < customersLcl.length; i++) {
        if (customersLcl[i].postcode.startsWith(filter)) {
          filteredCustomersLcl.push(customersLcl[i])
        }
      }
      this.customers = filteredCustomersLcl
      this.groupCities()
    })
  }

  // new cusomer via dialog
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
        var newCustomer = data
        this.customerService.saveCustomer(data).subscribe((data) => {
          this.customers?.push(newCustomer)
          this.groupCities()
          this.updatePostcodes(newCustomer)
        })
      }
    })
  }
    // Edit cusomer via dialog
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
        let editedCustomer = data
        this.customerService.saveCustomer(data).subscribe((data) => {
          for (let i = 0; i < this.customers!.length; i++) {
            if (this.customers![i].id == editedCustomer.id) {
              this.customers![i] = editedCustomer
            }
          }
          this.groupCities()
          this.updatePostcodes(editedCustomer)
        })
      }
    })
  }
    // update postcodes on add/edit of customer
  updatePostcodes(customer: CustomerDTO) {
    var prefix = customer.postcode.split(" ")[0]
    if (!this.postcodes.includes(prefix)) {
      this.postcodes.push(prefix)
    }
  }
  //
  //  FORM Call Customer services - over
  //
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
