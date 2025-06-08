import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../Service/product.service';
import { ProductDTO } from '../../dto/product.dto'
import { NgFor, DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
@Component({
  selector: 'app-product',
  imports: [NgFor, DecimalPipe],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products?: ProductDTO[] = []
  //
  //  Called from ngOnInit - set up page data
  //
  activate() {
    this.readProducts()
  }

  // setUp() {

  // }

  //
  //  FORM Call Product services
  //
  readProducts() {
    this.productService.readProducts().subscribe((data) => {
      this.products = data
    })
  }
    // new Product via dialog
  editProduct(existing?: ProductDTO) {
    let modalConfig = {
      animation: true,
      backdrop: false,
      size: "lg"
    }

    let modalInstance = this.modalService.open(ProductDialogComponent, modalConfig)
    modalInstance.componentInstance.existingProduct = existing
    modalInstance.componentInstance.mode = "Edit"
    modalInstance.result.then((data) => {
      if (data != undefined) {
        let edited = data
        if (data != undefined) {
          this.productService.saveProduct(data).subscribe((data) => {
            for (let i = 0; i < this.products!.length; i++) {
              if (this.products![i].id == edited.id) {
                this.products![i] = edited
              }
            }
          })
        }
      }
    })
  }

  // new Product via dialog
  addNew() {

    let modalConfig = {
      animation: true,
      backdrop: false,
      size: "lg"
    }

    let modalInstance = this.modalService.open(ProductDialogComponent, modalConfig)
    modalInstance.componentInstance.existingProduct = undefined
    modalInstance.componentInstance.mode = "Add"
    modalInstance.result.then((data) => {
      if (data != undefined) {
        let newProduct = data
        this.productService.saveProduct(newProduct).subscribe((data) => {
          this.products?.push(newProduct)
        })
      }
    })
  }

  ngOnInit(): void {
    this.activate()
    //this.setUp()    // no form to set up

  }
  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
  ) {

  }
}
