import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.css'
})
export class ProductRegisterComponent implements OnInit {
  productForm: FormGroup;

  categories: string[] = ['Eletrônicos', 'Roupas e acessórios', 'Alimentação', 'Móveis e decoração'];

  constructor(private dbService: DatabaseService, private formBuilder: FormBuilder, private router: Router) {
    this.productForm = this.formBuilder.group({
      productName: [null, [Validators.required]],
      productDescription: [null, [Validators.required]],
      productQuantity: [null, [Validators.required, this.productQuantityValidator.bind(this)]],
      productCategory: [null, [Validators.required]],
      entryDate: [null, [Validators.required]],
      exitDate: [null]
    })
   }

   ngOnInit(): void {
    const entryDateControl = this.productForm.get('entryDate');
    const exitDateControl = this.productForm.get('exitDate');
  
    if (entryDateControl && exitDateControl) {
      exitDateControl.setValidators([
        this.compareDatesValidator(entryDateControl)
      ]);
      exitDateControl.updateValueAndValidity();
    }
  }

  productQuantityValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    
    if(value !== null && value !== undefined && value <= 0)
      return { invalidQuantity: true };

    return null;
  }

  compareDatesValidator(entryDateControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const exitDate = control.value;
      const entryDate = entryDateControl.value;

      if (exitDate && entryDate && new Date(exitDate) <= new Date(entryDate)) {
        return { 'invalidDateComparison': true };
      }
      return null;
    };
  }

  onSubmit() {
    const product: Product = {
      name: this.productForm.get('productName')?.value,
      description: this.productForm.get('productDescription')?.value,
      quantity: this.productForm.get('productQuantity')?.value,
      category: this.productForm.get('productCategory')?.value,
      entryDate: this.productForm.get('entryDate')?.value,
      exitDate: this.productForm.get('exitDate')?.value
    }

    if(this.productForm.valid){
      this.dbService.postProduct(product);
      this.productForm.reset();
      this.router.navigate(['/stockflow/produtos/listar']);
    }
  }
}
