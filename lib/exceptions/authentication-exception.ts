import {CredentialsSignin} from "next-auth";
import {AuthenticateErrorCode} from "@/lib/types";

export class UserNotFoundException extends CredentialsSignin {
    code: string = "user_not_found"
}

export class WrongPasswordException extends CredentialsSignin {
    code: AuthenticateErrorCode = "invalid_password"
}