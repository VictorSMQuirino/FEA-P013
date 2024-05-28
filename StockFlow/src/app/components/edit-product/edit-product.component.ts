import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database/database.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productForm!: FormGroup;
  private productId: string = '';
  categories: string[] = ['Eletrônicos', 'Roupas e acessórios', 'Alimentação', 'Móveis e decoração'];

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required, this.productQuantityValidator.bind(this)]],
      category: [null, [Validators.required]],
      entryDate: [null, [Validators.required]],
      exitDate: [null]
    });

    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.dbService.getProductById(this.productId).subscribe(product => {
      this.productForm.get('name')?.setValue(product.name);
      this.productForm.get('description')?.setValue(product.description);
      this.productForm.get('quantity')?.setValue(product.quantity);
      this.productForm.get('category')?.setValue(product.category);
      this.productForm.get('entryDate')?.setValue(product.entryDate);
      if(product.exitDate !== null)
        this.productForm.get('exitDate')?.setValue(product.exitDate);
    });

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
      id: this.productId,
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      quantity: this.productForm.get('quantity')?.value,
      category: this.productForm.get('category')?.value,
      entryDate: this.productForm.get('entryDate')?.value,
      exitDate: this.productForm.get('exitDate')?.value
    };

    if(this.productForm.valid) {
      this.dbService.putProduct(product).subscribe(response => {
        if(response.status == 200) {
          setTimeout(() => {
            alert('As alterações foram salvas!');
            this.router.navigate(['stockflow/produtos/listar']);
          })
        }
      })
    }
    else {
      return;
    }
  }
}
