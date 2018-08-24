import { NgModule } from "../../node_modules/@angular/core";
import {
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatExpansionModule,
  MatGridListModule,
  MatBottomSheetModule,MatListModule
  
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,MatGridListModule,MatBottomSheetModule,MatListModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,MatGridListModule,MatBottomSheetModule,MatListModule
  ]
})
export class MaterialModule {}
