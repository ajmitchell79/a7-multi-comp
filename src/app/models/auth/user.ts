
import { environment } from '../../../environments/environment';

export class User {

    userName: string;
    userGuid: string;
    roles: string[];
    email: string;
    locality: string;
    login: string;
 
    constructor( ) {
    }

    public userHasRole(role: string) : boolean
    {
      return  (this.roles.length > 0  && this.roles.indexOf(role) > -1);
    }

    public userPropertyHasValue(property: string, value: string) : boolean
    {
      return  (this[property] == value);
    }

    public userIsAdmin(): boolean
    {
      return this.userHasRole(environment.ADMIN_ROLE_NAME);
    }
}
