/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

const posts = [
  {
    slug: 'my-new-post',
    title: 'My New Post',
    excerpt: 'Post resume',
    updatedAt: '10 de Abril',
  },
];

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('should render correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
  });

  it('should load initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                {
                  type: 'heading',
                  text: 'Post title',
                },
              ],
              content: [
                {
                  type: 'paragraph',
                  text: 'First paragraph',
                },
              ],
            },
            last_publication_date: '04-01-2021',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'Post title',
              excerpt: 'First paragraph',
              updatedAt: '01 de abril de 2021',
            },
          ],
        },
      }),
    );
  });
});
