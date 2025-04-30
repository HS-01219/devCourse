import { useLocation } from "react-router-dom"
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBooksInfinite = () => {
    const location = useLocation();

    const getBooks = ({ pageParam } : {pageParam : number}) => {
        const params = new URLSearchParams(location.search);
        const category_id = params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined;
        const news = params.get(QUERYSTRING.NEWS) ? true : undefined;
        const limit = LIMIT;
        const currentPage = pageParam;

        return fetchBooks({
            category_id,
            news,
            limit,
            currentPage,
        });
    }

    const {data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey : ["books", location.search],
        queryFn : ({ pageParam = 1 }) => getBooks({ pageParam }),
        initialPageParam : 1,
        getNextPageParam : (lastPage, allPages) => {
            const isLastPage = Math.ceil(lastPage.pagination.totalCount / LIMIT) === lastPage.pagination.currentPage;
            return isLastPage ? null : lastPage.pagination.currentPage + 1;
        }
    });
    
    /* infiniteQuery를 사용하면서 바뀐 data 구조
        기존 return
        결과 = {
            books, pagination, isEmpty
        }

        변경
        결과 = [
            pages : [
                { books, pagination },
                { books, pagination },
                { books, pagination },
            ]
        ]

        flatMap을 사용하여 books만 배열로 새로 만들어서 반환
    */

    const books = data ? data.pages.flatMap((page) => page.books) : [];
    const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
    const isEmpty = books.length === 0;

    return { 
        books, pagination, isEmpty, isBooksLoading : isFetching, fetchNextPage, hasNextPage
    };
}