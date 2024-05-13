import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user data from the API via GET', () => {
    const mockUser = {
      login: 'venkatesh7975',
      avatar_url: 'https://avatars.githubusercontent.com/u/65925600?v=4',
      location: 'India',
      html_url: 'https://github.com/venkatesh7975',
    };

    service.getUser('venkatesh7975').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('https://api.github.com/users/venkatesh7975');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should retrieve user repositories from the API via GET', () => {
    const mockRepos = [
      { name: 'Code-Editor', html_url: 'https://github.com/venkatesh7975/Code-Editor' },
      { name: 'Code_Editor_Backend', html_url: 'https://github.com/venkatesh7975/Code_Editor_Backend' }
    ];

    service.getRepos('venkatesh7975', 1, 10).subscribe(repos => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne('https://api.github.com/users/venkatesh7975/repos?page=1&per_page=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });
});
