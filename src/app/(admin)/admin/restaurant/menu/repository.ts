import { collection, orderBy, query, where } from "firebase/firestore";
import { MenuItem } from "./MenuItem";
import { db } from "@/lib/config/firebase";
import { FirebaseRepository } from "@/app/(admin)/admin-core";

class MenuItemRepository extends FirebaseRepository<MenuItem> {
  constructor() {
    super("menuitems");
  }
}

export const menuitemRepository = new MenuItemRepository();
