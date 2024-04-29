import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from './login-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  permitido: number = 0;
  mensagem = "";
  authservice = inject(LoginServiceService);

  constructor(private router: Router) {
    if (this.authservice.isAuthenticated() != false) {
      this.router.navigate(["admin"]);
    }
    var sessao = this.authservice.isAuthenticated();
    console.log(sessao);
  }

  form = inject(FormBuilder).group({
    Utilizador: ['', Validators.required],
    PalavraPasse: ['', [Validators.required]],
  });

  entrar() {

    this.permitido = 0;
    if (this.form.status.toString() !== "VALID") {
      this.permitido = 2;
      this.mensagem = "Os campos (*) são obrigatórios";
    } else {
      this.authservice.login(this.form.value.Utilizador ?? "", this.form.value.PalavraPasse ?? "").subscribe(res => {

        if (res.valido === "Sim") {
          this.authservice.auth(JSON.stringify(res));
          this.permitido = 1;
          this.mensagem = "Seja bem-vindo/a";
          setTimeout(() => {
            this.router.navigate(["admin"]);
          }, 1000)

        } else {
          this.permitido = 2;
          this.mensagem = "Utilizador Inválido";
        }

      });
    }
  }
}

