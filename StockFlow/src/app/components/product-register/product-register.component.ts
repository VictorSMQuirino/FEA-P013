import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.css'
})
export class ProductRegisterComponent {
  productForm: FormGroup;

  categories: string[] = ['Eletrônicos', 'Roupas e acessórios', 'Alimentação'];

  constructor(private dbService: DatabaseService) {
    this.productForm = new FormGroup({
      'productName': new FormControl(null, [Validators.required]),
      'productDescription': new FormControl(null, [Validators.required]),
      'productQuantity': new FormControl(null, [Validators.required, this.productQuantityValidator.bind(this)]),
      'productCategory': new FormControl(null, [Validators.required]),
      'entryDate': new FormControl(null, [Validators.required]),
      'exitDate': new FormControl(null, [Validators.required])
    });
   }

  productQuantityValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    
    if(value !== null && value !== undefined && value <= 0)
      return { invalidQuantity: true };

    return null;
  }

  onSubmit() {
    
  }
}
