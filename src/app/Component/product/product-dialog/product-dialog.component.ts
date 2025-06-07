import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDTO } from '../../../dto/product.dto';
@Component({
  selector: 'app-product-dialog',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent implements OnInit {
  addForm!: FormGroup
  product?: ProductDTO = new ProductDTO
  existingProduct?: ProductDTO
  mode: string = ""
  finalised:boolean = false

  //
  //  Called from ngOnInit - set up page data
  //
  activate() {
    if (this.existingProduct != undefined)
      this.product = structuredClone(this.existingProduct)
  }

  //
  //  Called from ngOnInit - set up form
  //
  setUp() {

    this.addForm = new FormGroup({
      skuInput: new FormControl({ value: this.product?.sku, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      descInput: new FormControl({ value: this.product?.description, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      priceInput: new FormControl({ value: this.product?.price, disabled: false }, [Validators.required, Validators.min(.01), Validators.max(1000000), Validators.pattern(/^\d*\.?\d{0,2}$/)])
    })
    this.addForm.markAsPristine()
    this.addForm.markAsUntouched()
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
  Clear(){
    this.addForm.markAsPristine()
  }
  Cancel() {
    this.activeModal.close()
  }

  //
  //  Return back to main page
  //
  Save() {
    //this.product!.id = 0
    this.product!.description = this.descInput!.value
    this.product!.sku = this.skuInput!.value
    this.product!.price = this.priceInput!.value

    this.activeModal.close(this.product)
  }
  //
  //  Private
  //
  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg =  /^\d*\.?\d{0,2}$/;

    if (!reg.test(input)) {
      e.preventDefault();
    }
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
