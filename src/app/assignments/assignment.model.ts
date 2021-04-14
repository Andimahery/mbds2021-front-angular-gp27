
import { Matiere } from '../matieres/matiere.model';
import { MatiereService } from '../shared/matiere.service';
export class Assignment {
  _id?:string;
  id:number; 
  idMatiere:string ;
  nom:string;
  dateDeRendu:Date;
  rendu:boolean;
  note:number;
  remarque:string;


  ////code à modifier //////////
  matiereService:MatiereService;

   getMatiere():Matiere{
     let m=null;
    this.matiereService.getMatiere(this.idMatiere).subscribe((matiere) => {
      console.log (matiere);
      m = matiere;
    });
    return m;
  }

  




}


