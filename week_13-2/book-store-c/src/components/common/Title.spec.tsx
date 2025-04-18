import {render, screen} from '@testing-library/react';

import Title from './Title';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe("Title 컴포넌트 테스트", () => {
    it("렌더를 확인", () => {
        // 가상 화면에 렌더
        render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        )

        // 제목이라는 텍스트가 화면상에 있는지 확인
        expect(screen.getByText("제목")).toBeInTheDocument();
    });

    it("size props 적용", () => {
        const { container } = render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        );

        // Title 컴포넌트가 fontSize 2rem 스타일을 가지고 있는지 확인
        // size props를 변경하면 fail
        expect(container?.firstChild).toHaveStyle({fontSize : "2rem"});
    });

    it("color props 적용", () => {
        const { container } = render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        );

        // Title 컴포넌트가 color brown을 가지고 있는지 확인
        expect(container?.firstChild).toHaveStyle({color : "brown"});
    });
});