import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  dateDeRendu = null;
  isLinear = true;
  formGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          nom: ['', Validators.required]
        }),
        this.formBuilder.group({
          dateDeRendu: ['', Validators.required]
        })
      ])
    });

    // this.firstFormGroup = this.formBuilder.group({
    //   nom: ['', Validators.required]
    // });
    // this.secondFormGroup = this.formBuilder.group({
    //   dateDeRendu: ['', Validators.required]
    // });
  }

  onSubmit() {
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.formGroup.value.formArray[0].nom;
    nouvelAssignment.dateDeRendu = this.formGroup.value.formArray[1].dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
        this.snackBar.open('Nouvel assignment ajouté');
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(["/home"]);
      });
  }

}
