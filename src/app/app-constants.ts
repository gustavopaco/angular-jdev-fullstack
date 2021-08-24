export class AppConstants {

  public static getSERVERURL() : string {
    return "http://localhost:8080/microservicos";
    // return "http://localhost:5000/microservicos";
    // return "http://springbootrestmicroservicos-env.eba-w7cy6qjm.us-east-1.elasticbeanstalk.com/microservicos";
  }

  public static baseLogin() : string {
    return this.getSERVERURL() + "/login";
  }

  public static baseUsuario() : string {
    return this.getSERVERURL() + "/usuario";
  }

  public static baseTelefone() : string{
    return `${this.getSERVERURL()}/telefone`
  }

}
