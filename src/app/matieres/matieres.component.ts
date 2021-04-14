import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../shared/matiere.service';
import { Matiere } from '../matieres/matiere.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {

  matieres:Matiere[];
  displayedColumns: string[] = ['matiere','pathImage'];
  dataSource=null;

  constructor(private matiereService:MatiereService) { }

  ngOnInit(): void {

    this.matiereService.getMatieres()
    .subscribe(matieres => {

      this.matieres = matieres;
      this.dataSource = new MatTableDataSource(this.matieres);
      
      console.log(matieres);
    });
  }

  

}
