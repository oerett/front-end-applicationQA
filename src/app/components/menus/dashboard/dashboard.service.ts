
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {

    constructor(
        private firestore: AngularFirestore
    ) {
    }

    getUserData(uid: string) {
        return this.firestore.collection('users').doc(uid).valueChanges();
    }
}