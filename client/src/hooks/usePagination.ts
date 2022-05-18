import { useQuery } from "@apollo/client";

const usePagination = (query:any, page = 1, items = 10) => {
  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: { page, items },
    notifyOnNetworkStatusChange: true, // to show loader
  });

  return { data, loading, error, fetchMore }; // returning fetchMore
};

export default usePagination;