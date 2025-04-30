import { styled } from 'styled-components';
import Title from '@/components/common/Title';
import BooksFilter from '@/components/books/BooksFilter';
import BooksList from '@/components/books/BooksList';
import BooksEmpty from '@/components/books/BooksEmpty';
import BooksViewSwitcher from '@/components/books/BooksViewSwitcher';
import Loading from '@/components/common/Loading';
import { useBooksInfinite } from '@/hooks/useBooksInfinite';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function Books() {
    // const { books, pagination, isEmpty, isBooksLoading } = useBooks();
    const { books, pagination, isEmpty, isBooksLoading, hasNextPage, fetchNextPage } = useBooksInfinite();

    // 스크롤 보정 처리하면 더 자연스러워질 것
    const moreRef = useIntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    });

    // 기존 IntersectionObserver 사용법, 공통화하면서 위의 코드로 수정
    // const moreRef = useRef(null);
    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         // entries : 관찰하는, 감시하는 요소의 배열
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting && hasNextPage) {
    //                 fetchNextPage();
    //                 observer.unobserve(entry.target); // 관찰 멈춤
    //             }
    //         })
    //     });

    //     if(moreRef.current) {
    //         observer.observe(moreRef.current);
    //     }

    //     return () => observer.disconnect();
    // }, [books, moreRef]);

    // early return으로 return의 조건을 간소화
    if (isEmpty) return <BooksEmpty />;
    if (!books || !pagination || isBooksLoading) return <Loading />;

    return (
        <>
            <Title size='large'>도서 검색 결과</Title>
            <BooksStyle>
                {/* 필터 */}
                <div className="filter">
                    <BooksFilter />
                    <BooksViewSwitcher />
                </div>
                {/* 목록 */}
                <BooksList books={books} />
                <div ref={moreRef}></div>
                {/* <Pagination pagination={pagination} /> 스크롤 페이징으로 바꾸면서 주석*/}
            </BooksStyle>
        </>
    );
}

const BooksStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;

    .filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 9;
    }
`;

export default Books;