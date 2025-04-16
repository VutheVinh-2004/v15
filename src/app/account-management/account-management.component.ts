import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Account {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  accounts: Account[] = [];
  filteredAccounts: Account[] = [];
  searchTerm: string = '';
  defaultAvatar: string = 'https://via.placeholder.com/30';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.http.get<Account[]>('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      this.accounts = data;
      this.filteredAccounts = data;
    });
  }

  searchAccounts() {
    const term = this.searchTerm.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account =>
      account.username.toLowerCase().includes(term) ||
      account.email.toLowerCase().includes(term)
    );
  }

  addAccount() {
    console.log('Add account');
  }

  editAccount(account: Account) {
    console.log('Edit account', account);
  }

  deleteAccount(id: number) {
    this.accounts = this.accounts.filter(a => a.id !== id);
    this.searchAccounts();
  }

  viewDetails(account: Account) {
    console.log('View details', account);
  }
}