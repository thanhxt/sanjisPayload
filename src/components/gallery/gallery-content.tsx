'use client'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Gallery } from '@/type/galleryType';

/**
 * The gallery videos are ~45 MB each; loading them only when the
 * gallery scrolls into view keeps them off the critical path.
 */
export function LazyVideo({ src, className }: { src: string; className?: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (visible) {
            ref.current?.play().catch(() => {
                // Autoplay can be blocked; the muted loop is decorative anyway.
            });
        }
    }, [visible]);

    return (
        <video
            ref={ref}
            src={visible ? src : undefined}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controls={false}
            preload="none"
            className={className}
            // Positioning is inline because styled-jsx in the parent does not
            // scope into child components.
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
        />
    );
}

export default function GalleryContent({ gallery }: { gallery: Gallery[] }) {

    return (
        <div className="gallery-outer">
            <div className="gallery-inner">
                <div className="side left">
                    <LazyVideo src="/gallery1.mp4" />
                </div>
                <div className="center-grid">
                    {gallery.map((item) => (
                        <div className="grid-item" key={item.id || item.images.id || item.images.filename}>
                            <Image 
                                src={item.images.url}
                                alt={item.images.alt || 'Gallery Image'}
                                width={400} 
                                height={400} 
                                quality={95}
                                loading="eager"
                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </div>
                    ))}
                </div>
                <div className="side right">
                    <LazyVideo src="/gallery2.mp4" />
                </div>
            </div>
            <style jsx>{`
                .gallery-outer {
                    background: black;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem 0;
                }
                .gallery-inner {
                    display: flex;
                    gap: 1vw;
                    width: 95vw;
                    max-width: 1800px;
                    aspect-ratio: 3/1;
                    height: auto;
                }
                .side {
                    flex: 1;
                    aspect-ratio: 1/1;
                    height: auto;
                    position: relative;
                }
                .center-grid {
                    display: grid;
                    flex: 1;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr 1fr;
                    gap: 1vw;
                    height: 100%;
                }
                .grid-item {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    aspect-ratio: 1;
                    overflow: hidden;
                }
                .grid-item img {
                    width: 100%;
                    height: 100%;
                    transition: transform 0.3s ease;
                }
                .side video {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8px;
                }
                @media (max-width: 900px) {
                    .gallery-inner {
                        flex-direction: column;
                        height: auto;
                        max-height: none;
                        gap: 2vw;
                        aspect-ratio: unset;
                    }
                    .side, .center-grid {
                        width: 100%;
                        aspect-ratio: 1/1;
                        height: auto;
                        min-height: unset;
                        max-height: unset;
                    }
                    .center-grid {
                        order: 1;
                    }
                    .side.left {
                        order: 2;
                    }
                    .side.right {
                        order: 3;
                    }
                }
            `}</style>
        </div>
    );
}
