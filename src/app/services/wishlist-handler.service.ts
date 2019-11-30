import { Injectable } from "@angular/core";
import { ToolkitService } from "./toolkit.service";
const storage_key = "brewwishlist";
@Injectable({
  providedIn: "root"
})
export class WishlistHandlerService {
  constructor(private _toolkit: ToolkitService) {}

  public AddRemoveToWishlist(id: number): boolean {
    let currWishlist = localStorage.getItem(storage_key);
    if (!this._toolkit.IsNullOrEmptyObject(currWishlist)) {
      if (currWishlist.split("|").indexOf(id.toString()) == -1) {
        currWishlist = this._toolkit.IsNullOrEmptyObject(currWishlist)
          ? id.toString()
          : (currWishlist += `|${id}`);
        this.setResetWishlistDatabase(currWishlist);
        return true;
      } else {
        let wishlistCollection = currWishlist.split("|");
        let i = 0;
        wishlistCollection.forEach(element => {
          if (element == id.toString()) {
            wishlistCollection.splice(i, 1);
            this.setResetWishlistDatabase(wishlistCollection);
            return false;
          }
          i++;
        });
      }
    } else {
      currWishlist = id.toString();
      this.setResetWishlistDatabase(currWishlist);
      return true;
    }
  }
  public checkIsWishlisted(id: number) {
    let currWishlist = localStorage.getItem(storage_key);
    if (currWishlist.split("|").indexOf(id.toString()) > -1) return true;
    else return false;
  }
  setResetWishlistDatabase(collection: any) {
    if (typeof collection == "object") {
      let input = "";
      for (let iter = 0; iter < collection.length; iter++) {
        if (iter > 0) input += "|" + collection[iter];
        else input = collection[iter];
      }
      localStorage.setItem(storage_key, input);
    } else if (typeof collection == "string") {
      localStorage.setItem(storage_key, collection);
    }
  }
}
