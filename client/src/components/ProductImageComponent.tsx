import React, { FC } from 'react';
import ReactImageMagnify from 'react-image-magnify';

interface ProductImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

const ProductImageComponent: FC<ProductImageProps> = ({ src, alt, width, height }) => {
    return (
        <div className={`relative w-${width} h-${height}`}>
            <ReactImageMagnify
                {...{
                    smallImage: {
                        alt: alt,
                        isFluidWidth: true,
                        src: src,
                    },
                    largeImage: {
                        src: src,
                        width: 800, 
                        height: 800, 
                    },
                }}
            />
        </div>
    );
};

export default ProductImageComponent;
