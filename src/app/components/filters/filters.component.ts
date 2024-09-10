import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  selectedCat = "all";
  selectedStatus = "all";
  selectedSorting = "date";
  selectedOrder = "des";

  @Input() tasksData: any;
  @Input() categories: any;

  @Output() filterString = new EventEmitter<{
    filter : string,
    sort : string,
    status : string,
    order : string
  }>();

  doFilter() {
    this.filterString.emit({
      filter : this.selectedCat,
      sort : this.selectedSorting,
      status : this.selectedStatus,
      order : this.selectedOrder
    });
  }

}
