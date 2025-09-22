'use client'
import Image from 'next/image';
import { Gallery } from '@/type/galleryType';

export default function GalleryContent({ gallery }: { gallery: Gallery[] }) {

    return (
        <div className="gallery-outer">
            <div className="gallery-inner">
                <div className="side left">
                    <video src="/gallery1.mp4" autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
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
                                loading="lazy"
                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </div>
                    ))}
                </div>
                <div className="side right">
                    <video src="/gallery2.mp4" autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
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
