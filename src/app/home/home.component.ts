import { Component, OnInit,HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LoginModelComponent } from 'src/app/login-model/login-model.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FeedbackModelComponent } from 'src/app/feedback-model/feedback-model.component';
import { Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public searchResults :boolean = false;
  public isShow:boolean = false;
  topPosToStartShowing = 100;
  userId: any = localStorage.getItem("userId")
  userDetails: any = localStorage.getItem("userDetails")
  
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModelComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogFeedback(): void {
    const dialogRef = this.dialog.open(FeedbackModelComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplayHoverPause : true,
    autoplay:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(private router: Router,public dialog: MatDialog) { }

  foods: Food[] = [
    {value: 'veg-3', viewValue: 'Veg Restaurents'},
    {value: 'non-veg-4', viewValue: 'Non-Veg Restaurents'},
    {value: 'Indian-0', viewValue: 'Indian'},
    {value: 'Thai-1', viewValue: 'Thai'},
    {value: 'British-2', viewValue: 'British'}
  ];

  ngOnInit(): void {
    if(this.userDetails && typeof(this.userDetails) == "string") {
      this.userDetails = JSON.parse(this.userDetails)
    }
  }


  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  togglesearchResults() {
    this.searchResults = !this.searchResults;
  }
}
