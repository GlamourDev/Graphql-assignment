import "./index.scss";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/img/component-img-1.jpg";
import Img2 from "../../assets/img/component-img-2.jpg";
import Img3 from "../../assets/img/component-img-3.jpg";
import Img4 from "../../assets/img/component-img-4.jpg";

interface Provider {
	posts: [];
}

interface Images {
    [key: string]: string;
}
interface Pagination {
    page: number;
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

const GET_POSTS = gql`
	query ($items: Int!, $page: Int!) {
		getPostsList(pagination: { items: $items, page: $page }) {
			posts {
				title
				id
				description
			}
			total
		}
	}
`;

const usePagination = (page = 1, items = 10) => {
	const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
		variables: { page, items },
		notifyOnNetworkStatusChange: true, // to show loader
	});

	return { data, loading, error, fetchMore }; // returning fetchMore
};

const ListItems: React.FC<{}> = () => {
	const navigate = useNavigate();
	const {
		data: { getPostsList: posts } = {},
		loading,
		error,
		fetchMore,
	} = usePagination();
	const [items, setItems] = useState<Provider[]>([]);
	const [page, setPage] = useState(1);
	const hasToken = localStorage.getItem("auth-token");

	useEffect(() => {
		setItems(posts);
		console.log(items);
		if (!hasToken) {
			navigate("/login");
		}
	}, [posts]);
	//const [items, setItems] = useState<Provider[]>(Array.from({ length: 10 }));

	const fetchMoreData = () => {
		console.log("Fetch more data");
		setPage((prevPage) => prevPage + 1);

		fetchMore({
			variables: {
				page: page,
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				const newPosts = fetchMoreResult.getPostsList.posts;
				const total = fetchMoreResult.getPostsList.total;

				return newPosts.length
					? {
							getPostsList: {
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
				hasMore={true}
				loader={<></>}
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
