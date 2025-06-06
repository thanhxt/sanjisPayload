'use client'
export default function ArrowUpButton() {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
                onClick={handleScrollToTop}
                style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 200,
                    background: '#222',
                    color: '#fff',
                    border: '2px solid #888',
                    borderRadius: '50%',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                    transition: 'background 0.2s',
                }}
                aria-label="Scroll to top"
            >
                ↑
        </button>
    )
}