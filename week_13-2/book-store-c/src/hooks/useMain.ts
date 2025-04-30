import { fetchBanners } from "@/api/banner.api";
import { fetchBestBooks, fetchBooks } from "@/api/books.api";
import { fetchReviewAll } from "@/api/review.api";
import { Banner } from "@/model/banner.model";
import { Book, BookReviewItem } from "@/model/book.model";
import { useEffect, useState } from "react"

export const useMain = () => {
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [bestBooks, setBestBooks] = useState<Book[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);

    useEffect(() => {
        fetchReviewAll().then((reviews) => {
            setReviews(reviews);
        });

        fetchBooks({
            category_id: undefined,
            news: true,
            currentPage : 1,
            limit : 4,
        }).then(({books}) => {
            setNewBooks(books);
        });

        fetchBestBooks().then((books) => {
            setBestBooks(books);
        });

        fetchBanners().then((banners) => {
            setBanners(banners);
        })
    }, []);

    return { reviews, newBooks, bestBooks, banners };
}