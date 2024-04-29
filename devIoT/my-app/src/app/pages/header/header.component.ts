import { Component, inject } from '@angular/core';
import { LoginServiceService } from '../login/login-service.service';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private serviceAuth = inject(LoginServiceService);
  private router = inject(Router);

  logout() {
    this.serviceAuth.logout();
    this.router.navigate(["login"]);
  }
}
