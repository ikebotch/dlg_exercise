import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DataService],
    });
    service = TestBed.inject<DataService>(DataService);
  });

  it('should get faq data', async () => {
    const response = await service.getFaqData();
    expect(response.length).toBeGreaterThan(0);
  });
});
