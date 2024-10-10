import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthGoogleService} from "./auth-google.service";

export const authGuard: CanActivateFn = async (route, state) => {

  const service = inject(AuthGoogleService);
  const router = inject(Router)
  const auth = inject(AuthGoogleService);
  const hasAccess = service.getToken();
  console.log("test",hasAccess)

  if (!hasAccess) {
    // If the record doesn't allow access, redirect to another route (e.g., login or access denied page)
    auth.login()
    return false;
  }
console.log("test")
  // Allow access if the record allows it
  return true;
};
