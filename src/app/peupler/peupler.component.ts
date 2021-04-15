import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-peupler',
  templateUrl: './peupler.component.html',
  styleUrls: ['./peupler.component.css']
})
export class PeuplerComponent implements OnInit {
  show = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private assignmentsService: AssignmentsService
  ) { }

  ngOnInit(): void {
  }


  peuplerBD() {
    this.show = true;
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      this.show = false;
      this.snackBar.open('La base de donnée a été peuplée');
      console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
      // this.router.navigate(["/home"]);
    });
  }

}
