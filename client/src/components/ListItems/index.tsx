/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination"

import './index.scss';
import Img1 from "../../assets/img/component-img-1.jpg";
import Img2 from "../../assets/img/component-img-2.jpg";
import Img3 from "../../assets/img/component-img-3.jpg";
import Img4 from "../../assets/img/component-img-4.jpg";
import { GET_POSTS } from "../../graphql/queries";

interface Post {
  id: number;
  title: string;
  description: string;
}
interface Posts {
  posts: Post[];
}

interface Images {
  [key: string]: string;
}

const images: Images = {
  Img1,
  Img2,
  Img3,
  Img4,
};

const getImageByKey = (): string => {
  const random = Math.floor(Math.random() * 4) + 1;
  return images[`Img${random}`];
};

const ListItems: React.FC<{}> = () => {
  const navigate = useNavigate();
  const {
    data: { getPostsList: posts } = {},
    loading,
    error,
    fetchMore,
  } = usePagination(GET_POSTS);
  const [items, setItems] = useState<Posts>();
  const [page, setPage] = useState(1);
  const hasToken = localStorage.getItem("auth-token");

  useEffect(() => {
    setItems(posts);
    console.log(items);
    if (!hasToken) {
      navigate("/login");
    }
  }, [posts]);

  const fetchMoreData = () => {
    console.log("Fetch more data");
    setPage((prevPage) => prevPage + 1);

    fetchMore({
      variables: {
        page,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult.getPostsList.posts;
        const {total} = fetchMoreResult.getPostsList;

        return newPosts.length
          ? {
              getPostsList: {
                // eslint-disable-next-line no-underscore-dangle
                __typename: previousResult.getPostsList.__typename,
                posts: [...previousResult.getPostsList.posts, ...newPosts],
                total,
              },
            }
          : previousResult;
      },
    });
  };

  return (
    posts && (
      <InfiniteScroll
        dataLength={posts.posts.length}
        next={fetchMoreData}
        hasMore
        loader={<>Loading</>}
      >
        <ul className="list-items">
          {loading && <p>Loading</p>}
          {error && <p>Something went wrong...</p>}
          {items &&
            items.posts.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  style={{
                    background: `url(${getImageByKey()}) center / cover no-repeat`,
                  }}
                >
                  <h3 className="title">{item.title}</h3>
                  <h4 className="content">{item.description}</h4>
                </a>
              </li>
            ))}
        </ul>
      </InfiniteScroll>
    )
  );
};
export default ListItems;
