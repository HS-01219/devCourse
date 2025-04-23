import {render, screen} from '@testing-library/react';
import BookItem from './BookItem';
import { BookStoreThemeProvider } from '../../context/themeContext';
import { Book } from '../../model/book.model';

const dummyBook : Book = {
    id : 1,
    title : "Dummy Book",
    img : 5,
    categoryId : 1,
    form : "Dummy",
    isbn : "Dummy",
    summary : "Dummy",
    detail : "Dummy",
    author : "Dummy",
    pages : 10,
    contents : "Dummy",
    price : 10000,
    likes : 1,
    pubDate : "2021-01-01",
};


describe("BookItem 컴포넌트 테스트", () => {
    it("렌더를 확인", () => {
       const { getByText, getByAltText } =render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook} />
            </BookStoreThemeProvider>
        )

        expect(getByText(dummyBook.title)).toBeInTheDocument();
        expect(getByText(dummyBook.summary)).toBeInTheDocument();
        expect(getByText(dummyBook.author)).toBeInTheDocument();
        expect(getByText("10,000원")).toBeInTheDocument();
        expect(getByText(dummyBook.likes)).toBeInTheDocument();
        expect(getByAltText(dummyBook.title)).toHaveAttribute("src", `https://picsum.photos/id${dummyBook.img}/600/600`);
    });
});