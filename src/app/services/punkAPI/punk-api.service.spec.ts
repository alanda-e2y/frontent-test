import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { PunkAPIService } from './punk-api.service';

import { HttpClientModule } from '@angular/common/http';

describe('PunkAPIService', () => {
  let service: PunkAPIService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }).compileComponents();
    service = TestBed.inject(PunkAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the API URL', () => {
    expect(service.getApiUrl()).toEqual('https://api.punkapi.com/v2');
  })

  it('should return a list of 25 beers on application start', waitForAsync(inject([PunkAPIService], (service: PunkAPIService) => {
    service.getBeers().subscribe( 
      value => {
        expect(value.length).toBeLessThanOrEqual(25);
      }
    );
  })));

  it('should return a list of 10 beers if we perform a partial search with term "lager"', waitForAsync(inject([PunkAPIService], (service: PunkAPIService) => {
    service.getBeersByName("lager").subscribe( 
      value  => {
        expect(value.length).toBeLessThanOrEqual(10);
      }
    );
  })));

  it('should return a list of 1 beer if we perform a exact search with term "Buzz"', waitForAsync(inject([PunkAPIService], (service: PunkAPIService) => {
    service.getBeersByName("Buzz").subscribe( 
      value  => {
        expect(value.length).toEqual(1);
        expect(value[0].name).toEqual("Buzz");
      }
    );
  })));

  it('should return a list of 25 beers if the search term is empty', waitForAsync(inject([PunkAPIService], (service: PunkAPIService) => {
    service.getBeersByName("").subscribe( 
      value  => {
        expect(value.length).toBeLessThanOrEqual(25);
      }
    );
  })));
});
