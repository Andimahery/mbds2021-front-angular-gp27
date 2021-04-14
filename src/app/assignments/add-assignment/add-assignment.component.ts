import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
////Matiere
import { MatiereService } from 'src/app/shared/matiere.service';
import { Matiere } from '../../matieres/matiere.model';

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

  idMatiere='';
  matieres:Matiere[];

  isLinear = true;
  formGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }

  constructor(
    private assignmentsService: AssignmentsService,
    private matiereService:MatiereService,
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
        }),
        this.formBuilder.group({
          idMatiere: ['', Validators.required]
        })
      ])
    });

    this.matiereService.getMatieres().subscribe(matieres=>{
      this.matieres=matieres;
      console.log(matieres);
    })

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
    nouvelAssignment.idMatiere=this.formGroup.value.formArray[2].idMatiere;
    nouvelAssignment.note=null;
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
