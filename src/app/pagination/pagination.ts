import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor, NgForOf, NgClass } from "../../../node_modules/@angular/common";

@Component({
  selector: 'app-pagination',
  imports: [NgForOf, NgFor, NgClass],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination implements OnInit {
  @Input() totalItems: any;
  @Input() currentPage: any;
  @Input() itemsPerPage: any;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  totalPages=0;
  pages : number[] = [];
  constructor(){
  }
  
  ngOnInit(): void {
    if(this.totalItems){
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
      
  }
  pageClicked(page:number){
    this.onClick.emit(page);
  }
}
