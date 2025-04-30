import { Banner as IBanner } from '@/model/banner.model';
import { styled } from 'styled-components';
import BannerItem from './BannerItem';
import { useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
    banners : IBanner[];
}

function Banner({banners} : Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // currentIndex가 바뀔 때 
    const transFormValue = useMemo(() => {
        return currentIndex * -100;
    }, [currentIndex]);

    const handlePrev = () => {
        if(currentIndex === 0) setCurrentIndex(banners.length - 1);
        setCurrentIndex(currentIndex - 1);
    };
    const handleNext = () => {
        if(currentIndex === banners.length - 1) setCurrentIndex(0);
        setCurrentIndex(currentIndex + 1);
    };

    const handleIndicatorClick = (index : number) => {
        setCurrentIndex(index);
    }

    return (
        <BannerStyle>
            <BannerContainerStyle $transFormValue={transFormValue}>
                {
                    banners.map((banner, index) => (
                        <BannerItem banner={banner} />
                    ))
                }
            </BannerContainerStyle>
            <BannerButtonStyle>
                <button onClick={handlePrev} className='prev'>
                    <FaAngleLeft />
                </button>
                <button onClick={handleNext} className='next'>
                    <FaAngleRight />
                </button>
            </BannerButtonStyle>
            <BannerIndicatorStyle>
                {/* 배너의 수만큼 점으로 표시 */}
                {
                    banners.map((banner, index) => (
                        <span onClick={() => handleIndicatorClick(index)}
                              className={index === currentIndex ? 'active' : ''}></span>
                    ))
                }
            </BannerIndicatorStyle>
        </BannerStyle>
    );
}

const BannerStyle = styled.div`
    overflow: hidden;
    position: relative;
`;

interface BannerContainerStyleProps {
    $transFormValue : number;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
    display: flex;
    transform: translateX(${(props) => props.$transFormValue}%); // X좌표를 변경
    transition: transform 0.5s ease-in-out; // transform에 대한 애니메이션 설정
`;

const BannerButtonStyle =styled.div`
    button {
        border: 0;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 500px;
        font-size: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        svg {
            fill: #fff;
        }

        &.next {
            right: 10px;
        }

        &.prev {
            left: 10px;
        }

        @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
            width: 28px;
            height: 28px;
            font-size: 1.5rem;

            &.prev {
                left: 0;
            }

            &.next {
                right: 0;
            }
        }
    }
`;

const BannerIndicatorStyle = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);

    span {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 100px;
        background: #fff;
        margin: 0 4px;
        cursor: pointer;

        &.active {
            background: ${({theme}) => theme.color.primary};
        }
    }

    @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
        bottom: 0;
        span {
            width: 12px;
            height: 12px;

            &.active {
                width: 24px;
            }
        }

}
`;

export default Banner;