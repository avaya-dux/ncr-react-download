import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import {App, appLogger, total} from './app';


import axios from 'axios';

appLogger.disableAll();

vi.mock('axios');

const mockSuccess = () => {
  const str = 'hello world';
  const mockData = new Blob([str], { type: 'plain/text' });
  vi.mocked(axios.get).mockResolvedValue({
    data: mockData,
  });

  global.URL.createObjectURL = vi.fn(() => 'details');

};

describe("interactive tests", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockSuccess();
  });

  afterEach(() => {
    vitest.resetAllMocks();
  });

  it("download one works", async () =>{
    render(<App />);
    const downloadOne= screen.getAllByRole("button")[0]
    await user.click(downloadOne)
    expect(axios.get).toBeCalledTimes(1);
  })

  it("download two works", async () =>{
    render(<App />);
    const downloadTwo= screen.getAllByRole("button")[1]
    await user.click(downloadTwo)
    expect(axios.get).toBeCalledTimes(2);
  })

  it("download many works", async () =>{
    render(<App />);
    const downloadMany= screen.getAllByRole("button")[2]
    await user.click(downloadMany)
    expect(axios.get).toBeCalledTimes(total);
  })
})

describe('basic tests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    render(<App />);
    expect(screen.queryByText(/Welcome react-download/gi)).toBeFalsy();
  });
});
