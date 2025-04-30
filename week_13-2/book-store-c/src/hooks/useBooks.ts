import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Book } from "../model/book.model";
import { Pagination } from "../model/pagenation.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/queryString";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    // location.search가 변할때마다 콜백함수 실행 (fetch하여 동적으로 books를 가져옴)
    const { data : booksData, isLoading : isBooksLoading } = useQuery({
        queryKey : ["books", location.search],
        queryFn : () => {
            return fetchBooks({
                category_id : params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
                news : params.get(QUERYSTRING.NEWS) ? true : undefined,
                currentPage : params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
                limit : LIMIT
            });
        }
    });

    // react-query를 사용하면서 필요 없어짐, data
    // const [books, setBooks] = useState<Book[]>([]);
    // const [pagination, setPagination] = useState<Pagination>({ totalCount : 0, currentPage : 1});
    // const [isEmpty, setIsEmpty] = useState(true);

    // useEffect(() => {
        

    //     .then(({books, pagination}) => {
    //         setBooks(books);
    //         setPagination(pagination);
    //         setIsEmpty(books.length === 0);
    //     });

    // }, [location.search]);

    // return { books, pagination, isEmpty };
    return { 
        books : booksData?.books, 
        pagination : booksData?.pagination, 
        isEmpty : booksData?.books.length === 0,
        isBooksLoading
    };
}