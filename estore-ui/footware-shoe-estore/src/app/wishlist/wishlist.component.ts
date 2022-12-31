import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Shoe } from '../interfaces/shoe';
import { ShoeService } from '../services/shoe.service';
import { Account } from '../interfaces/account';
import { AccountService } from '../services/account.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  shoes: Shoe[] = [];

  constructor(private accountService: AccountService,
    private messageService: MessageService,
    private shoeService: ShoeService,
    private location: Location) { }

  ngOnInit(): void {
    this.getWishlist();
  }


  getUsername(): string {
    const userJson = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const accountObject = <Account>userJson;
    return accountObject.userName;
  }

  getWishlist(): void {
    this.accountService.getWishlist(this.getUsername()).subscribe(shoes => this.shoes = shoes);
  }

  deleteShoe(shoe: Shoe): void {
    this.shoes = this.shoes.filter(s => s !== shoe);
    this.accountService.removeShoeFromWishlist(this.getUsername(), shoe.id).subscribe();
  }
}
