'use client';

import { useState } from 'react';
import clsx from 'clsx';
import type { StrapiGalleryTab } from '@/lib/template-detail/types';

type Props = {
    tabs: StrapiGalleryTab[];
};

export default function Gallery({ tabs }: Props) {
    const [activeKey, setActiveKey] = useState(0);

    return (
        <div className="gallery">
            <div className="gallery-main">
                {tabs.map((tab, index) => {
                    return !!tab.url && (
                        <img
                            key={index}
                            className="gallery-image"
                            src={tab.url}
                            alt={tab.ariaLabel}
                            width={tab.width}
                            height={tab.width}
                            style={{ display: activeKey === index ? 'block' : 'none' }}
                        />
                    )

                })}
            </div>

            <div className="gallery-thumb-row">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        type="button"
                        aria-label={tab.ariaLabel}
                        className={clsx(
                            'gallery-thumb',
                            activeKey === index && 'active'
                        )}
                        onClick={() => {
                            setActiveKey(index)
                        }}
                    >
                        <div className="gallery-thumb-inner">

                            {
                                !!tab.url && (<img
                                    className="gallery-image"
                                    src={tab.url}
                                    alt={tab.ariaLabel}
                                    width={tab.width}
                                    height={tab.width}
                                />
                                )
                            }
                        </div>
                    </button>
                ))}
            </div>

            <p className="gallery-more">
                Want to see more?{' '}
                <a href="contact">
                    Request additional screenshots
                </a>
            </p>
        </div>
    );
}