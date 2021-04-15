import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAssignmentById();
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
      console.log(this.assignmentTransmis);
    });
  }

  /* onAssignmentRendu() {
     this.assignmentTransmis.rendu = true;
 
     this.assignmentsService
       .updateAssignment(this.assignmentTransmis)
       .subscribe((reponse) => {
         console.log(reponse.message);
         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(['/home']);
       });
 
     //this.assignmentTransmis = null;
   }*/

  /* openDialog() {
     this.dialog.open(DialogElementsExampleDialog);
   }*/


  openDialog(): void {
    const idAssignment: number = +this.route.snapshot.params.id;
    this.dialog.open(AjoutNoteDialog, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { id: idAssignment }
    });
  }

  onDelete() {
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // on cache l'affichage du détail
        this.assignmentTransmis = null;

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      queryParams: {
        nom: 'Michel Buffa',
        metier: "Professeur",
        responsable: "MIAGE"
      },
      fragment: "edition"
    });
  }

  isAdmin() {
    return this.authService.admin;
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'ajout-note.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AjoutNoteDialog {
  id: number = null;
  assignmentTransmis: Assignment;
  remarque = "";
  note = null;
  public noteForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AjoutNoteDialog>,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;
    this.noteForm = this.formBuilder.group({
      note: ['', [Validators.required]],
      remarque: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.getAssignmentById();

  }
  getAssignmentById() {
    this.assignmentsService.getAssignment(this.id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  onSubmit() {

    this.assignmentTransmis.rendu = true;
    this.assignmentTransmis.note = this.note;
    this.assignmentTransmis.remarque = this.remarque;

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.snackBar.open('Le devoir a été noté');
        this.dialogRef.close({ event: 'close' });
        this.redirectTo('/assignment/' + this.id);
      });

  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}