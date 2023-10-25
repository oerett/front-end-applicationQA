import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { DialogService } from 'src/app/services/dialog/dialogs.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

const sharedServiceMock = {
    getSomeData: jasmine.createSpy('getSomeData').and.returnValue(of({ someData: 'mockedData' })),
};

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockDialogService: jasmine.SpyObj<DialogService>;
    let mockAuthService: any;
    let router: Router;

    beforeEach(() => {
        mockDialogService = jasmine.createSpyObj('DialogService', ['openErrorDialogV2']);
        mockAuthService = { signInWithEmailAndPassword: jasmine.createSpy().and.returnValue(throwError({ code: 'auth/invalid-login-credentials' })) };

        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                MatDialogModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                MatCardModule,
                MatButtonModule,
                MatCheckboxModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatProgressSpinnerModule,
                RouterTestingModule.withRoutes([
                    { path: 'auth/login', component: LoginComponent }
                ])
            ],
            providers: [
                { provide: DialogService, useValue: mockDialogService },
                { provide: AngularFireAuth, useValue: mockAuthService },
                { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
                { provide: SharedService, useValue: sharedServiceMock },
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.stub();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should show error dialog on login failure', fakeAsync(() => {
        mockAuthService.signInWithEmailAndPassword.and.returnValue(Promise.reject({ code: "auth/invalid-login-credentials" }));
        const mockForm = {
            value: {
                email: 'test@test.com',
                password: 'pass123'
            },
            invalid: false
        };
        component.loginApicall(mockForm as any);
        tick();
        expect(mockDialogService.openErrorDialogV2).toHaveBeenCalledWith('Error', 'Invalid login credentials!', '', '');
    }));

});

