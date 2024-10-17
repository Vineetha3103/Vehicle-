import { Component } from '@angular/core';
import booksData from '../../../assets/books.json';
import { CommonModule } from '@angular/common';
interface Book {
  title: string;
  author: string;
  rating: string;
  availability: string;
  image: string;
}

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  books: Book[] = booksData;
}
