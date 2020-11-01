import { Injectable } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { EventManager } from 'app/core/event-manager/event-manager.service';

@Injectable({
  providedIn: 'root',
})
class SpyService {
  called = false;
}

function callback(spyService: SpyService): void {
  spyService.called = true;
}

describe('Event Manager test', () => {
  describe('Event Manager Test', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [EventManager, SpyService],
      });
    });

    it('should not fail when nosubscriber and broadcasting', inject([EventManager], (eventManager: EventManager) => {
      expect(eventManager.observer).toBeUndefined();
      eventManager.broadcast({ name: 'modifier', content: 'modified something' });
    }));

    it('should create an observable and callback when broadcasted', inject(
      [EventManager, SpyService],
      (eventManager: EventManager, spyService: SpyService) => {
        expect(spyService.called).toBeFalsy();
        eventManager.subscribe('modifier', () => callback(spyService));
        eventManager.broadcast({ name: 'modifier', content: 'modified something' });
        expect(spyService.called).toBeTruthy();
      }
    ));
  });
});
