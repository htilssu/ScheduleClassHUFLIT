import {CredentialsSignin} from "next-auth";

export class UserNotFoundException extends CredentialsSignin {
    code: string = "user-not-found"
}

export class WrongPasswordException extends CredentialsSignin {
    code: string = "wrong-password"
}