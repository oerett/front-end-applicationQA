
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { doc, getFirestore, setDoc } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})

export class JobSeekerService {

    constructor(
        private firestore: AngularFirestore,
        private http: HttpClient
    ) {
    }

    getJobs() {
        return this.firestore.collection('jobs').valueChanges();
    }
}