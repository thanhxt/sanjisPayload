'use client'
import { useRouter } from 'next/navigation'
import { useContext } from "react"
import { MenuContext, type MenuContextType } from "../menu-context"

export default function BackMenuButton() {
    const router = useRouter();
    const { menuOpen } = useContext(MenuContext) as MenuContextType;
    if (menuOpen) return null;
    return (
            <div>
                {/* Arrow Left Button */}
                <button
                onClick={() => router.push('/speisekarte')}
                style={{
                    position: 'fixed',
                    top: '6rem',
                    left: '4rem',
                    zIndex: 200,
                    background: '#222',
                    color: '#fff',
                    border: '2px solid #888',
                    borderRadius: '50%',
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    transform: 'scale(1)',
                    opacity: 0.9
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#333';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#222';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
                }}
                aria-label="Back to menu"
            >
                ←
            </button>
            <style jsx>{`
                @media (max-width: 768px) {
                    button {
                        top: 5rem !important;
                        left: 1rem !important;
                        width: 48px !important;
                        height: 48px !important;
                        font-size: 1.8rem !important;
                    }
                }
            `}</style>
        </div>
    )
}