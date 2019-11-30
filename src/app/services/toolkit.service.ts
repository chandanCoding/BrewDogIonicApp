import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class ToolkitService {
  constructor(private toastController: ToastController) {}
  /**
   * Check whether the item is null or empty. Returns true if the string is null or empty
   * @param {any} item the string
   */
  public IsNullOrEmptyObject(item: any) {
    if (
      typeof item == "object" ||
      typeof item == "undefined" ||
      typeof item == "function"
    ) {
      if (item != null && item != undefined) return false;
      return true;
    } else if (typeof item == "string") {
      if (item != null && item.trim() != "" && item != undefined) return false;
      return true;
    }
  }

  async presentToast(_message: string, type: string = "I") {
    let _type = "";
    if (type === "I") _type = "success";
    else if (type === "W") _type = "warning";
    else if (type === "E") _type = "danger";
    const toast = await this.toastController.create({
      message: _message,
      duration: 2000,
      color: _type
    });
    toast.present();
  }
}
