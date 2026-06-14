'use client';

import { useState } from 'react';
import clsx from 'clsx';
import type { StrapiGalleryTab } from '@/lib/template-detail/types';

type Props = {
    tabs: StrapiGalleryTab[];
};

export default function Gallery({ tabs }: Props) {
    const [activeKey, setActiveKey] = useState(tabs[0]?.key);

    return (
        <div className="gallery">
            <div className="gallery-main">
                {tabs.map((tab) => {
                    return !!tab.image?.url && (
                        <img
                            key={tab.key}
                            className="gallery-image"
                            src={tab.image.url}
                            alt={tab.ariaLabel}
                            width={500}
                            height={500}
                            style={{ display: activeKey === tab.key ? 'block' : 'none' }}
                        />
                    )

                })}
            </div>

            <div className="gallery-thumb-row">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        aria-label={tab.ariaLabel}
                        className={clsx(
                            'gallery-thumb',
                            activeKey === tab.key && 'active'
                        )}
                        onClick={() => {
                            setActiveKey(tab.key)
                        }}
                    >
                        <div className="gallery-thumb-inner">

                            {
                                !!tab.image?.url && (<img
                                    className="gallery-image"
                                    src={tab.image.url}
                                    alt={tab.ariaLabel}
                                    width={200}
                                    height={200}
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