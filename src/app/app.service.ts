import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}

  postToSheets(email, name, message) {
    let params = new HttpParams();

    params = params.append("email", email);
    params = params.append("name", name);
    params = params.append("message", message);
    return this.http.get(
      "https://script.google.com/macros/s/AKfycbwRikXOpcXlSrnghy16XBC3LFtPm88cdJISJQLH_PPcI4llOxw/exec",
      { params: params }
    );
  }
}
