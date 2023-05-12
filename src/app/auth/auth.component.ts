import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "./auth.service";

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html'
})
export class AuthComponent {
	isLoginMode = false
	isLoading = false
	isError: string | null = null

	constructor(private authService: AuthService) {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return null
		}
		const email = form.value.email
		const password = form.value.password

		this.isLoading = true
		if (this.isLoginMode) {
			//
		} else {
			this.authService.signup(email, password).subscribe(
				(resData) => {
					console.log(resData)
					this.isLoading = false
				}, errorMessage => {
					console.log('Authentication error: ', errorMessage)
					this.isError = errorMessage//'An error is occurred!'
					this.isLoading = false
				}
			)
		}

		form.reset()	
	}
}