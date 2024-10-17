import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const data = {
  id: '1',
  title: 'text',
  description: 'description',
};
const baseURL = 'https://jsonplaceholder.typicode.com';
const testURL = '/testURL/1';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });

    await throttledGetDataFromApi(testURL);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });

    await throttledGetDataFromApi(testURL);

    jest.runAllTimers();

    expect(axios.create().get).toHaveBeenCalledWith(testURL);
  });

  test('should return response data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });

    const resultData = await throttledGetDataFromApi(testURL);
    jest.runAllTimers();

    expect(resultData).toEqual(data);
  });
});
