import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Router } from '@angular/router';
import { FeedbackModelComponent } from '../feedback-model/feedback-model.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginModelComponent } from '../login-model/login-model.component';

// import { StarRatingComponent } from 'ng-starrating';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  // {
  //   name: 'Fruit',
  //   children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  // },
  {
    name: 'Menu',
    children: [
      {
        name: 'Veg',
        children: [{name: 'Aloo tikka'}, {name: 'Bhendi ki bhaji'}, {name: 'Kofte'}, {name: 'Palak panner'}],
      },
      {
        name: 'Non-veg',
        children: [{name: 'Chicken tikka massala'},
         {name: 'Chicken Kemaa masala '},
         {name: 'Butter chicken '},
         {name: 'Chicken egg Kemaa masala '}
        ],
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-resto-details',
  templateUrl: './resto-details.component.html',
  styleUrls: ['./resto-details.component.scss']
})
export class RestoDetailsComponent implements OnInit {
  rating = 0;
  starCount = 5;
  ratingArr : boolean[] = []; // true = solid star; false = empty star

  snackBarDuration = 1500;
  response = [
    'You broke my heart!',
    'Really?',
    'We will do better next time.',
    'Glad you like it!',
    'Thank you so much!'
  ]


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(private router: Router,public dialog: MatDialog, private _snackBar: MatSnackBar) { 

    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(): void {
  }

  openDialogFeedback(): void {
    const dialogRef = this.dialog.open(FeedbackModelComponent, {
      maxWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginModelComponent, {
      maxWidth: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
