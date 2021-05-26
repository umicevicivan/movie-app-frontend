import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewListModalComponent } from './new-list-modal.component';

describe('NewListModalComponent', () => {
    let component: NewListModalComponent;
    let fixture: ComponentFixture<NewListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewListModalComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(NewListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
