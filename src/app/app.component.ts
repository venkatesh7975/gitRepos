import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username: string = '';
  loading: boolean = false;
  user: any = null;
  repositories: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalRepos: number = 0;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  displayPageNumbers: (number | string)[] = [];
  validuser:boolean=true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.generatePageNumbers();
  }

  search() {
    
    this.fetchUserAndRepos();
  }

  fetchUserAndRepos() {
    this.loading = true;
    this.apiService.getUser(this.username).subscribe(
      (user: any) => {
        this.user = user;
        this.totalRepos = user.public_repos;
        this.totalPages = Math.ceil(this.totalRepos / this.pageSize);
        this.generatePageNumbers();
        this.apiService.getRepos(user.login, this.page, this.pageSize).subscribe(
          (repos: any[]) => {
            this.repositories = repos;
            this.loading = false;
            this.validuser=true;
          },
          (error: any) => {
            console.error('Error fetching repositories:', error);
            this.loading = false;
            this.repositories = [];
          }
        );
      },
      (error: any) => {
        console.error('User not found:', error);
        this.loading = false;
        this.user = null;
        this.validuser=false;
        this.repositories = [];
      }
    );
  }

  generatePageNumbers() {
    this.displayPageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      if (this.totalPages <= 9 || Math.abs(this.page - i) < 3 || i === 1 || i === this.totalPages) {
        this.displayPageNumbers.push(i);
      } else if (this.displayPageNumbers[this.displayPageNumbers.length - 1] !== '...') {
        this.displayPageNumbers.push('...');
      }
    }
  }

  setPage(pageNumber: number | string) {
    if (typeof pageNumber === 'number') {
      this.page = pageNumber;
      this.loading = true;
      this.fetchUserAndRepos();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loading = true;
      this.fetchUserAndRepos();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loading = true;
      this.fetchUserAndRepos();
    }
  }

  changePageSize(event: any) {
    const selectedPageSize = parseInt(event.target.value, 10);
    if (!isNaN(selectedPageSize)) {
      this.pageSize = selectedPageSize;
      this.page = 1; // Reset to first page when changing page size
      this.loading = true;
      this.fetchUserAndRepos();
    }
  }
}

