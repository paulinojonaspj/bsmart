import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../pages/login/login-service.service';

export const authGuardsGuard: CanActivateFn = (route, state) => {
  var s = inject(LoginServiceService);
  var router = inject(Router);

  if (s.isAuthenticated() == false){
    router.navigate(["login"]);
    return false;
  }

  //router.navigate(["admin"]);
  return true;

};
