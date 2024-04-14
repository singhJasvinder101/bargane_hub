"use client"
import React, { FC } from 'react';
import { priceHistory, trackProducts } from '../../@types';
import Charts from '@/components/Charts';


const AnalysisComponent: FC<{ tracks: trackProducts, idx: number }> = ({ tracks, idx }) => {
    // console.log(tracks)
    // console.log(typeof tracks.url);
    return (
        <div className='w-full mb-12'>
            <h2 className='md:w-[60%] text-2xl truncate ml-16'>{idx + 1 + ') '}{tracks.title}</h2>
            <Charts currentPrice={tracks.current_price} priceHistory={tracks.price_history} priceSymbol={tracks.currency} />
        </div>
    );
};

export default AnalysisComponent;
