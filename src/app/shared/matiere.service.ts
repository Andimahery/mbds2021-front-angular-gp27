import { Injectable } from '@angular/core';
import { Matiere } from '../matieres/matiere.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {


  constructor(private http:HttpClient) { }

  uri = "http://localhost:8010/api/matieres";

  getMatieres():Observable<Matiere[]> { 
    console.log("Dans le service de gestion des matieres...")
    //return of(this.assignments);
    return this.http.get<Matiere[]>(this.uri); 
  }

  getMatiere(id:string):Observable<Matiere> { 
    console.log("Dans le service de gestion d'une matiere...")
    return this.http.get<Matiere>(this.uri+"/"+id); 
  }


}
