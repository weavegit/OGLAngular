import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDTO } from '../../../dto/product.dto';
@Component({
  selector: 'app-product-dialog',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent implements OnInit {
  addForm!: FormGroup
  product?: ProductDTO = new ProductDTO
  existingProduct?: ProductDTO
  mode: string = ""
  activate() {
    if (this.existingProduct != undefined)
      this.product = structuredClone(this.existingProduct)
  }

  setUp() {

    this.addForm = new FormGroup({
      skuInput: new FormControl({ value: this.product?.sku, disabled: false },[Validators.required, Validators.minLength(3),Validators.maxLength(100)]),
      descInput: new FormControl({ value: this.product?.description, disabled: false },[Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
      priceInput: new FormControl({ value: this.product?.price, disabled: false },[Validators.required, Validators.min(.01),Validators.max(1000000),Validators.pattern(/^(?:99|\d{1,2})(?:\.\d{1,2})?$/)])
    })

  }

  //-------------------------------
  // Public Getters
  //-------------------------------
  get skuInput() {
    return this.addForm.get('skuInput')
  }
  get descInput() {
    return this.addForm.get('descInput')
  }
  get priceInput() {
    return this.addForm.get('priceInput')
  }
  NotSavable() {
    return !this.addForm.valid
  }
  Cancel() {
    this.activeModal.close()
  }
  Save() {
    //this.product!.id = 0
    this.product!.description = this.descInput!.value
    this.product!.sku = this.skuInput!.value
    this.product!.price = this.priceInput!.value

    this.activeModal.close(this.product)
  }
  //-------------------------------
  // System
  //-------------------------------
  ngOnInit(): void {
    this.activate()
    this.setUp()
  }
  constructor(private activeModal: NgbActiveModal) {

  }
}
