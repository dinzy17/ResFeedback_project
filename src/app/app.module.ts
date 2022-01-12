import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatOptionSelectionChange } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCommonModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatTreeModule} from '@angular/material/tree';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginModelComponent } from './login-model/login-model.component';
import { FeedbackModelComponent } from './feedback-model/feedback-model.component';
import { RestoDetailsComponent } from './resto-details/resto-details.component';
import {MatSliderModule} from '@angular/material/slider';
import { AdminModule } from './admin/admin.module';
import { HomeComponent } from './home/home.component';
import { RatingModule } from 'ng-starrating';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { APIService } from './api.service'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginModelComponent,
    FeedbackModelComponent,
    RestoDetailsComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
    // AdminLoginComponent,
    // AdminDashboardComponent
    // NgForm
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    BrowserModule,
    MatSliderModule,
    MatSnackBarModule,
    // AdminRoutingModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    MatToolbarModule,
    MatChipsModule,
    CarouselModule,
    

  
  ],
  entryComponents: [LoginModelComponent,FeedbackModelComponent],
  exports: [
  ],
  providers: [UserService, APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
