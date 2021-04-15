import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../../matieres/matiere.model';

import { MatiereService } from 'src/app/shared/matiere.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;

  // pour le formulaire
  nom = "";
  dateDeRendu = null;
  auteur='';
  idMatiere=null;
  matieres: Matiere[];

  isLinear = true;
  formGroup: FormGroup;
  secondFormGroup: FormGroup;

  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }

  constructor(
    private assignmentsService: AssignmentsService,
    private matiereService: MatiereService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition


  /** Returns a FormArray with the name 'formArray'. */

  this.formGroup = this.formBuilder.group({
    formArray: this.formBuilder.array([
      this.formBuilder.group({
        nom: ['', Validators.required],
        dateDeRendu: ['', Validators.required],
        auteur: ['', Validators.required]

      }),
      this.formBuilder.group({
        idMatiere: ['', Validators.required]
      }),
    ])
  });

  this.matiereService.getMatieres().subscribe(matieres => {
    this.matieres = matieres;
    console.log(matieres);
  })

    this.getAssignmentById();
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.auteur =assignment.auteur;
      this.idMatiere=assignment.matiere.id;



    });
  }


  onSubmit() {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteur=this.auteur;
    let i = this.matieres.findIndex(m => m._id === this.formGroup.value.formArray[1].idMatiere);
    this.assignment.matiere=this.matieres[i];

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.snackBar.open('Assignment modifié');
        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })

  }
}
