import { BookReviewItem as IBookReviewItem } from '@/model/book.model';
import { formatDate } from '@/utils/format';
import { styled } from 'styled-components';
import { FaStar } from 'react-icons/fa';

interface Props {
    review : IBookReviewItem;
}

// 간단한 컴포넌트 작성
const Star = (props : Pick<IBookReviewItem, 'score'>) => {
    return (
        <span className='star'>
            {
                Array.from({length : props.score}).map((_, index) => (
                    <FaStar />
                ))
            }
        </span>
    )
}

function BookReviewItem({ review } : Props) {
    return (
        <BookReviewItemStyle>
            <header className="header">
                <div>
                    <span>{review.userName}</span>
                    <span><Star score={review.score} /></span>
                </div>
                <div>{formatDate(review.createdAt)}</div>
            </header>
            <div className="content">
                <p>{review.content}</p>
            </div>
        </BookReviewItemStyle>
    );
}

const BookReviewItemStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    padding: 12px;
    border-radius: ${({theme}) => theme.borderRadius.default};

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        color: ${({theme}) => theme.color.secondary};
        padding: 0;

        .star {
            padding: 0 0 0 8px;
            svg {
                fill: ${({theme}) => theme.color.primary};
            }
        }
    }

    .content {
        p {
            font-size: 1rem;
            line-height: 1.5;
            margin: 0;
        }
    }

`;

export default BookReviewItem;