import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Shoe } from '../interfaces/shoe';
import { Transaction } from '../interfaces/transaction';
import { ShoeService } from '../services/shoe.service';
import { Account } from '../interfaces/account';
import { AccountService } from '../services/account.service';
import { MessageService } from '../services/message.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private accountService: AccountService,
    private messageService: MessageService,
    private shoeService: ShoeService,
    private location: Location) { }

  ngOnInit(): void {
    this.getPurchaseHistory();
  }

  getUsername(): string {
    const userJson = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const accountObject = <Account>userJson;
    return accountObject.userName;
  }

  isAdmin(): boolean {
    const userJson = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const accountObject = <Account>userJson;
    if (accountObject.displayName == undefined) {
      return false;
    } else {
      return accountObject.isAdmin;
    }
  }


  getPurchaseHistory(): void {
    this.accountService.getPurchaseHistory(this.getUsername()).subscribe(transactions =>
      this.transactions = transactions)
  }

}
