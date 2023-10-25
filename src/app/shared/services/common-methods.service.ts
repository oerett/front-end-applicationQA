
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Observable, map, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    private checkRefreshValue = new BehaviorSubject<any>({ refresh: false });

    constructor(
        private firestore: AngularFirestore,
        private http: HttpClient
    ) {
    }

    static emailValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const valid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(control.value);
            return valid ? null : { 'invalidEmail': { value: control.value } };
        };
    }

    async saveUserInFirestore(userId: string, email: string, role: string): Promise<void> {
        try {
            const db = getFirestore();
            const userData = {
                email: email,
                role: role
            };

            await setDoc(doc(db, 'users', userId), userData);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    addMultipleJobs() {
        if (localStorage.getItem('jobsAdded')) {
            return;
        }
        this.http.get('assets/jobs-list.json').subscribe((data: any) => {
            const batch = this.firestore.firestore.batch();
            data.forEach((job: any) => {
                const jobRef = this.firestore.collection('jobs').doc().ref;
                batch.set(jobRef, job);
            });
            batch.commit().then(() => {
                localStorage.setItem('jobsAdded', 'true');
            });
        });
    }

    getJobsApplied(): Observable<any> {
        return this.http.get('assets/jobs-applied.json');
    }

    refreshTable() {
        return this.checkRefreshValue;
    }

    getJobs() {
        return this.firestore.collection('jobs').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as any;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    getJobsByEmail(email: string) {
        return this.firestore.collection('jobs', ref => ref.where('email', '==', email)).valueChanges();
    }

}