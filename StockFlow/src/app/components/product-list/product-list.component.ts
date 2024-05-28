import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'description', 'quantity', 'category', 'entryDate', 'exitDate', 'actions'];

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.dbService.getProducts().subscribe(response => {
      this.products = response;
      console.log(this.products);
    });
  }

  deleteProduct(id: string) {
    //this.dbService.deleteProduct(id);
  }
}
