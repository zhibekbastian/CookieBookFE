import { Material } from './material';

describe('Material', () => {
  it('should create an instance', () => {
    expect(new Material(2, "test")).toBeTruthy();
  });
});
