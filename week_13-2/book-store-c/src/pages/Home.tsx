import React from 'react';
import Header from '../components/common/Header';
import { formatNumber } from '../utils/format';

function Home() {
    return (
        <>
            <Header />
            <div>
                Home body
            </div>
            <div>count : {formatNumber(5000)}</div>
        </>
    )
}

export default Home;