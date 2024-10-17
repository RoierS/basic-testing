import { generateLinkedList } from './index';

const arr = [1, 2, 3];
const testLinkedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: null,
        next: null,
      },
    },
  },
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(arr)).toStrictEqual(testLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(arr)).toMatchSnapshot();
  });
});
