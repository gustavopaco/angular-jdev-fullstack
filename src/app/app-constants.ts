export class AppConstants {

  public static getSERVERURL() : string {
    return "http://localhost:8080/microservicos";
  }

  public static baseLogin() : string {
    return this.getSERVERURL() + "/login";
  }

  public static baseUsuario() : string {
    return this.getSERVERURL() + "/usuario";
  }

}
