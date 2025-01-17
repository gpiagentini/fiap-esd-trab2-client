import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { HttpService } from '../../services/http.service';
import { LoginResponseModel } from '../../models/responses/login-response-model';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, MatButton, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private snackBar = inject(MatSnackBar);
  username: string = "";
  password: string = "";

  constructor(private httpService: HttpService) { }

  public doLogin() {
    this.httpService.doLogin(this.username, this.password).subscribe({
      next: (response: LoginResponseModel) => {
        localStorage.setItem("auth-token", response.token);
        window.location.href = '/asset-list';
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 403)
          this.snackBar.open('Usuário ou senha inválidos', 'Fechar', { duration: 2000 });
        else
          this.snackBar.open('Erro durante processo de Login', 'Fechar', { duration: 2000 });
      }
    });
  }

}
