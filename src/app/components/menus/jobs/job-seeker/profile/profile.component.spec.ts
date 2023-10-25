import { TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { DialogService } from 'src/app/services/dialog/dialogs.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SharedService } from 'src/app/shared/services/common-methods.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockStore {
  select(selector: any) {
    return of([]);
  }

  dispatch(action: any) { }
}

describe('ProfileComponent', () => {
  let mockDialogService: any;
  let mockAuthService: any;
  let getSomeData: any;

  beforeEach(() => {
    getSomeData = jasmine.createSpy('getSomeData').and.returnValue(of({ someData: 'mockedData' }))

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatInputModule,
        FlexLayoutModule,
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatSortModule
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: DialogService, useValue: mockDialogService },
        { provide: AngularFireAuth, useValue: mockAuthService },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        { provide: SharedService, useValue: getSomeData },
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProfileComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
