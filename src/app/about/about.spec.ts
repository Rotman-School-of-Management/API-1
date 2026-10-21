import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About as ImportedAbout} from './about';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportedAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportedAbout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

interface About {
  // other existing properties
  csvData: any; // Or a more specific type if known (e.g., string | MyCsvDataType[])
}
