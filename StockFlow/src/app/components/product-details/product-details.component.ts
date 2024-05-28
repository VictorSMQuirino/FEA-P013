import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private productId!: string;
  product: any;

  constructor(private dbService: DatabaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.dbService.getProductById(this.productId).subscribe(response => {
      this.product = signal<Product>(response);
    });
  }
}
