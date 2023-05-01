import { TestBed } from '@angular/core/testing';

import { DataDownloaderService } from './data-downloader.service';

describe('DataDownloaderService', () => {
  let service: DataDownloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDownloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
