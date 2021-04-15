import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

/////
import {MatTableModule } from "@angular/material/table";


import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AjoutNoteDialog } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { MatieresComponent } from './matieres/matieres.component';
import { RegisterComponent } from './register/register.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PeuplerComponent } from './peupler/peupler.component';
registerLocaleData(localeFr, 'fr');

const routes: Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
    data:{header:false}
  },
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path: "login",
    component: LoginComponent,
    //redirectTo: "/home",
    data: { title: "Connexion" },
  },
  {
    // idem avec  http://localhost:4200/home
    path: "register",
    component: RegisterComponent,
  },
  {
    // idem avec  http://localhost:4200/home
    path: "home",
    component: AssignmentsComponent,
    data: { title: "Liste des assignments" }
  },
  {
    path: "add",
    component: AddAssignmentComponent,
    data: { title: "Ajout d'un assignment" }
  },
  {
    path: "assignment/:id",
    component: AssignmentDetailComponent,
    data: { title: "Détails d'un assignment" }
  },
  {
    path: "assignment/:id/edit",
    component: EditAssigmentComponent,
    data: { title: "Modification d'un assignment" },
    //canActivate: [AuthGuard]
  },  {
    path: "matieres",
    component: MatieresComponent,
    data: { title: "Listes des matieres" }
  },
  {
    path: "peupler",
    component: PeuplerComponent,
    data: { title: "Peupler BDD" }
  },
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    MatieresComponent,
    RegisterComponent,
    PeuplerComponent,
    RegisterComponent,
    AjoutNoteDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatSidenavModule,
    MatProgressBarModule,
    RouterModule.forRoot(routes), HttpClientModule
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
