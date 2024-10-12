import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
	providedIn: 'root',
})
export class AuthGoogleService {
	private oAuthService = inject(OAuthService);
	private router = inject(Router);



	async initConfiguration() {
		const authConfig: AuthConfig = {
			issuer: 'https://accounts.google.com',
			strictDiscoveryDocumentValidation: false,
			clientId: '494085321932-jhlflrptqhmt7ru5blk4040kp2gslu1i.apps.googleusercontent.com',
			redirectUri: window.location.origin + '/dashboard',
			// set the scope for the permissions the client should request
			// The first four are defined by OIDC.
			// Important: Request offline_access to get a refresh token
			// The api scope is a usecase specific one
			scope: 'openid profile email ',
		};

		this.oAuthService.configure(authConfig);
		this.oAuthService.setupAutomaticSilentRefresh();
		await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
	}

	login() {
		this.oAuthService.initImplicitFlow();
	}

	logout() {
		this.oAuthService.revokeTokenAndLogout();
		this.oAuthService.logOut();
	}

	getProfile() {
		this.oAuthService.getAccessToken();
		const profile = this.oAuthService.getIdentityClaims();
		return profile;
	}

	getToken() {
		return this.oAuthService.getAccessToken();
	}
}