import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[];
  page: number = 1;
  limit: number = 10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  listePage: number[];
  sizeList: number[] = [5, 10, 15, 20];

  // on injecte le service de gestion des assignments
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('AVANT AFFICHAGE');

    // on utilise le service pour récupérer les
    // assignments à afficher
    this.route.queryParams.subscribe(params => {
      this.page = params.page;
      if (this.limit != params.limit) this.limit = params.limit;
      this.getAssignments();
    })

    // this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
    //   .subscribe(data => {
    //     this.assignments = data.docs;
    //     this.page = data.page;
    //     this.limit = data.limit;
    //     this.totalDocs = data.totalDocs;
    //     this.totalPages = data.totalPages;
    //     this.hasPrevPage = data.hasPrevPage;
    //     this.prevPage = data.prevPage;
    //     this.hasNextPage = data.hasNextPage;
    //     this.nextPage = data.nextPage;
    //     console.log("données reçues");
    //   });

    /*
    this.assignmentsService.getAssignmentsAsPromise().then(assignments => {
      this.assignments = assignments;
      console.log("données reçues avec Promise");

    });
  */
    console.log("getAssignments() du service appelé");
  }

  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      this.listePage = [];
      this.listePage.push(1);
      if (this.page != 1 && this.page != this.totalPages) this.listePage.push(this.page);
      if (this.page < this.totalPages)this.listePage.push(this.page + 1);

      console.log("données reçues");
    });
  }

  redirect(page) {
    this.router.navigate(['/home'], {
      queryParams: {
        page: page,
        limit: this.limit
      }
    });
  }

  plusMoins(val) {
    this.router.navigate(['/home'], {
      queryParams: {
        page: this.page + val,
        limit: this.limit
      }
    });
  }

  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      })
  }
}
