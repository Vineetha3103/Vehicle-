import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  slides = [
    {image: '/assets/carimg/cars.jpg', text: ''},
    {image: 'assets/bike img/bikes.jpeg', text: ''},
    {image: 'assets/auto img/autos.jpg', text: ''},
    {image: 'assets/lorry img/lorries.jpeg', text: ''},
  ]; currentSlide = 0;
  translateX = 0;
  constructor() { }
  ngOnInit(): void { }
  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.slides.length - 1;
    }
    this.translateX = -this.currentSlide * 100;
  }
  nextSlide(): void {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.translateX = -this.currentSlide * 100;
  }

}
