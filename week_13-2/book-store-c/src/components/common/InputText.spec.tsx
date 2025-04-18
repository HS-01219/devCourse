import {render, screen} from '@testing-library/react';

import InputText from './InputText';
import { BookStoreThemeProvider } from '../../context/themeContext';
import React from 'react';

describe("InputText 컴포넌트 테스트", () => {
    it("렌더를 확인", () => {
        render(
            <BookStoreThemeProvider>
                <InputText placeholder='여기에 입력하세요' />
            </BookStoreThemeProvider>
        );

        expect(screen.getByPlaceholderText('여기에 입력하세요')).toBeInTheDocument();
    });

    it("forwordRef 테스트", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
                <InputText placeholder='여기에 입력하세요' ref={ref} />
            </BookStoreThemeProvider>
        );

        // 전달된 ref가 inputElement인지 확인
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});