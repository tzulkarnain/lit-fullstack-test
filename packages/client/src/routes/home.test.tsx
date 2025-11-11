import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router';
import Home from './home';
import { GET_POSTS } from '../apollo/queries';

const mocks = [
  {
    request: {
      query: GET_POSTS,
      variables: { offset: 0, limit: 10 }
    },
    result: {
      data: {
        posts: []
      }
    }
  }
];

const renderHome = () => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </MockedProvider>
  );
};

describe('Home', () => {
  it('should render without crashing', () => {
    const { container } = renderHome();
    expect(container).toBeTruthy();
  });
});