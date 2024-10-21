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
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  books: Book[] = booksData;

  bookCategories: string[] = [
    "All",
    "category Book 1",
    "category Book 2",
    "category Book 3",
    "category Book 4",
    "category Book 5",
    "category Book 6",
    "category Book 7",
    "category Book 8",
    "category Book 9"
  ];

  stars: number[] = [1, 2, 3, 4, 5]; // For looping 5 times to represent stars

  // Method to get the number of full stars based on the book rating
  getFullStars(rating: string): number {
    return Math.floor(Number(rating)); // Convert rating to number and get full stars
  }

  // Method to check if there is a half star
  hasHalfStar(rating: string): boolean {
    return (Number(rating) % 1) >= 0.5; // Check if the decimal part is 0.5 or more
  }
}
