import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  newBookTitle: string = '';
  newBookAuthor: string = '';

  bookArray: Book[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let savedBooks = localStorage.getItem('books');
      this.bookArray = savedBooks ? JSON.parse(savedBooks) : [];
    }
  }

  addBook() {
    if (this.newBookTitle.trim().length && this.newBookAuthor.trim().length) {
      let newBook: Book = {
        id: Date.now(),
        title: this.newBookTitle,
        author: this.newBookAuthor
      }
      this.bookArray.push(newBook)
      localStorage.setItem('books', JSON.stringify(this.bookArray))
      this.newBookTitle = '';
      this.newBookAuthor = '';
    } else {
      alert('Please enter the title and author of the book')
    }
  }

  deleteBook(bookID: number) {
    let confirmDelete = confirm('Are you sure you want to delete this book?')
    if (confirmDelete) {
      this.bookArray = this.bookArray.filter(book => book.id !== bookID)
      localStorage.setItem('books', JSON.stringify(this.bookArray))
    }
  }

}
