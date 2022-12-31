import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Shoe } from '../interfaces/shoe';
import { ShoeService } from '../services/shoe.service';
import { Account } from '../interfaces/account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-shoe-detail',
  templateUrl: './shoe-detail.component.html',
  styleUrls: ['./shoe-detail.component.css']
})
export class ShoeProductPageComponent implements OnInit {
  @Input() shoe?: Shoe | undefined;

  constructor(private route: ActivatedRoute, private shoeService: ShoeService,
    private location: Location,
    private accountService: AccountService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.shoeService.getShoe(id).subscribe(shoe => this.shoe = shoe);
  }

  getAccountService(): AccountService {
    return this.accountService;
  }

  getRoute(): ActivatedRoute {
    return this.route;
  }

  getLocation(): Location {
    return this.location;
  }

  goBack(): void {
    this.location.back();
  }

  current(): void {
    this.location.getState();
  }

  save(): void {
    if (this.shoe) {
      this.shoeService.updateShoe(this.shoe).subscribe();
    }
  }

  adminLoggedIn(): boolean {
    const userJson = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const accountObject = <Account>userJson;
    if ((accountObject.displayName != undefined) && (accountObject.isAdmin)) {
      return true;
    } else {
      return false;
    }
  }

  isAccountDefined(): boolean {
    const userJson = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const accountObject = <Account>userJson;
    if (accountObject.displayName == undefined) {
      return false;
    } else {
      return true;
    }
  }

  getUsername(): string {
    const userJson = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const accountObject = <Account>userJson;
    return accountObject.userName;
  }

  addToCart(shoe: Shoe): void {
    this.accountService.addToCart(this.getUsername(), shoe).subscribe(() => this.current());
    this.goBack();
    this.reloadPage();
  }

  addToWishlist(shoe: Shoe): void {
    this.accountService.addToWishlist(this.getUsername(), shoe).subscribe(() => this.current());
    this.goBack();
    this.reloadPage();
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }
}
