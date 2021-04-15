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
  nomProf;

  idMatiere = '';
  matieres: Matiere[];

  isLinear = true;
  formGroup: FormGroup;
  secondFormGroup: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }

  constructor(
    private assignmentsService: AssignmentsService,
    private matiereService: MatiereService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          nom: ['', Validators.required],
          dateDeRendu: ['', Validators.required],
          auteur: ['', Validators.required]

        }),
        this.formBuilder.group({
          idMatiere: ['', Validators.required]
        })
      ])
    });

    // this.formGroup = this.formBuilder.group({
    //   formArray: this.formBuilder.array([
    //     this.formBuilder.group({
    //       nom: ['', Validators.required]
    //     }),
    //     this.formBuilder.group({
    //       dateDeRendu: ['', Validators.required]
    //     }),
    //     this.formBuilder.group({
    //       idMatiere: ['', Validators.required]
    //     }),
    //     this.formBuilder.group({
    //       auteur: ['', Validators.required]
    //     })
    //   ])
    // });

    this.matiereService.getMatieres().subscribe(matieres => {
      this.matieres = matieres;
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
    nouvelAssignment.dateDeRendu = this.formGroup.value.formArray[0].dateDeRendu;
    console.log("idMatiere" + this.formGroup.value.formArray[1].idMatiere);
    const i = this.matieres.findIndex(m => m._id === this.formGroup.value.formArray[1].idMatiere);
    console.log("index" + i);
    nouvelAssignment.matiere = this.matieres[i];
    nouvelAssignment.auteur = this.formGroup.value.formArray[0].auteur;
    nouvelAssignment.note = null;
    nouvelAssignment.rendu = false;


    console.log("ita le =" + nouvelAssignment.matiere);
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
        console.log("assignment" + nouvelAssignment);
        this.snackBar.open('Nouvel assignment ajouté');
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(["/home"]);
      });
  }

  changeMatiere(val){
    const i = this.matieres.findIndex(m => m._id === val);
    this.nomProf = this.matieres[i].prof.nomProfesseur;
  }

}