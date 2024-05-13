import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values for properties', () => {
    expect(component.loading).toBeFalse();
    expect(component.user).toBeNull();
    expect(component.repositories).toEqual([]);
    expect(component.page).toEqual(1);
    expect(component.pageSize).toEqual(10);
    expect(component.totalRepos).toEqual(0);
    expect(component.totalPages).toEqual(0);
    expect(component.pageNumbers).toEqual([]);
    expect(component.displayPageNumbers).toEqual([]);
    expect(component.validuser).toBeTrue();
  });

  it('should call fetchUserAndRepos method when search is called', () => {
    spyOn(component, 'fetchUserAndRepos');
    component.search();
    expect(component.fetchUserAndRepos).toHaveBeenCalled();
  });

  // Add more specific tests based on your component's functionality
});

