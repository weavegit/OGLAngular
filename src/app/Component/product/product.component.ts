import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../Service/product.service';
import { ProductDTO } from '../../dto/product.dto'
import { NgFor } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
@Component({
  selector: 'app-product',
  imports: [NgFor],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products?: ProductDTO[] = []

  activate() {
    this.readProducts()
  }

  setUp() {

  }
  readProducts() {
    this.productService.readProducts().subscribe((data) => {
      this.products = data
    })
  }
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
        this.products?.push(data)
        this.productService.saveProduct(data).subscribe((data) => {

        })
      }
    })
  }

  ngOnInit(): void {
    this.activate()
    this.setUp()

  }
  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
  ) {

  }
}
