import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTooltipModule, MatPaginatorModule, MatTableModule,  
  MatButtonModule, MatCheckboxModule, MatToolbarModule,
  MatChipsModule,MatOptionModule,MatProgressBarModule, 
  MatSliderModule,MatSlideToggleModule,MatMenuModule, MatDialogModule,
  MatSnackBarModule,MatInputModule, MatSidenavModule, MatCardModule,
  MatIconModule,MatRadioModule, MatProgressSpinnerModule, MatTabsModule,
  MatListModule,MatFormFieldModule,MatSelectModule,MatGridListModule,
  MatAutocompleteModule,MatExpansionModule
} from '@angular/material';

@NgModule({
  imports: [MatTooltipModule,MatAutocompleteModule, CommonModule,
    MatPaginatorModule,MatTableModule,MatFormFieldModule, MatExpansionModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule,
    MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule,
    MatSlideToggleModule, MatMenuModule, MatDialogModule,
    MatSnackBarModule, MatSelectModule, MatInputModule,
    MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule,
    MatProgressSpinnerModule, MatTabsModule, MatListModule
  ],
  exports: [MatTooltipModule,MatAutocompleteModule, MatTableModule,
    MatPaginatorModule, MatExpansionModule,MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatChipsModule,MatOptionModule,  MatProgressBarModule,
    MatSliderModule, MatSlideToggleModule,MatMenuModule, MatDialogModule,
    MatSnackBarModule, MatSelectModule,MatInputModule, MatSidenavModule,
    MatIconModule, MatRadioModule,MatProgressSpinnerModule, MatTabsModule,
    MatListModule, MatGridListModule,MatFormFieldModule, MatCardModule],
  })
  export class MaterialModule { }
  