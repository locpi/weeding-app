import {APP_INITIALIZER, ApplicationConfig, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import {provideOAuthClient} from "angular-oauth2-oidc";
import {AuthGoogleService} from "./guards/auth-google.service";
import {provideAnimations} from "@angular/platform-browser/animations";

// Provider for Keycloak Initialization
const keycloakInitializerProvider: Provider = {
	provide: APP_INITIALIZER,
	useFactory: initializeKeycloak,
	multi: true,
	deps: [AuthGoogleService],
};

function initializeKeycloak(keycloak: AuthGoogleService) {
	return async () => {
		return await keycloak.initConfiguration()
	}
}

export const appConfig: ApplicationConfig = {
	providers: [provideAnimations(), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideOAuthClient(), keycloakInitializerProvider],
};
