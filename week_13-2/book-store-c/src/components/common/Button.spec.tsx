import {render, screen} from '@testing-library/react';

import Button from './Button';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe("Button 컴포넌트 테스트", () => {
    it("렌더를 확인", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        )

        expect(screen.getByText("버튼")).toBeInTheDocument();
    });

    it("size props 적용", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole("button")).toHaveStyle({fontSize : "1.5rem"});
    });

    it("scheme props 적용", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole("button")).toHaveStyle({color : "white"});
    });
});