import { useToast } from './useToast';
import { useEffect, useState } from "react"
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../model/book.model";
import { fetchBook, likeBook, unLikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";

export const useBook = (bookId : string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const [cartAdded, setCartAdded] = useState(false);
    const { isLoggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const { showToast } = useToast();

    const likeToggle = () => {
        // 권한 확인
        if(!isLoggedIn) {
            showAlert("로그인이 필요합니다.");
            return;
        }
        
        if(!book) return;
        
        if(book.liked) {
            // 라이크 > 언라이크
            unLikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked : false,
                    likes : book.likes - 1
                });
                showToast("좋아요가 취소되었습니다.", "info");
            });
        } else {
            // 언라이크 > 라이크
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked : true,
                    likes : book.likes + 1 // 낙관적 업데이트
                });
                showToast("좋아요가 표시되었습니다.", "info");
            });
        }
    }

    const addToCart = (quantity : number) => {
        if(!book) return;

        addCart({
            book_id : book.id,
            quantity : quantity
        }).then(() => {
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
    }

    useEffect(() => {
        if(!bookId) return;
        
        fetchBook(bookId).then((bookDeail) => {
            setBook(bookDeail as BookDetail);
        });

        fetchBookReview(bookId).then((reviews) => {
            setReviews(reviews);
        });
    }, [bookId]);

    const addReview = (data : BookReviewItemWrite) => {
        if(!book) return;

        addBookReview(book.id.toString(), data).then((res) => {
            fetchBookReview(book.id.toString()).then((reviews) => {
                showAlert(res.message);
                setReviews(reviews);
            });
        });
    }

    return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};

