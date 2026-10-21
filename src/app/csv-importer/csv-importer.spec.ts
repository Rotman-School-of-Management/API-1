import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvImporter } from './csv-importer';

describe('CsvImporter', () => {
  let component: CsvImporter;
  let fixture: ComponentFixture<CsvImporter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvImporter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvImporter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
