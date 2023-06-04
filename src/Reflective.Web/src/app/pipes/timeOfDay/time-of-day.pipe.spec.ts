import { TimeOfDayPipe } from './time-of-day.pipe';

describe('TimeOfDayPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeOfDayPipe();
    expect(pipe).toBeTruthy();
  });
});
