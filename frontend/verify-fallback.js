// Quick verification script for fallback tenders
// Run this in browser console to check if fallback data is loaded

console.log('%c=== Tender Dashboard Verification ===', 'color: blue; font-size: 16px; font-weight: bold');

// Check if fallback data module exists
try {
    const checkFallback = async () => {
        const module = await import('./src/utils/fallbackData.js');
        console.log('✅ Fallback data module loaded successfully');
        console.log('📊 Number of fallback tenders:', module.FALLBACK_TENDERS.length);
        console.table(module.FALLBACK_TENDERS.map(t => ({
            ID: t.id,
            Title: t.title.substring(0, 50) + '...',
            Department: t.department,
            Amount: t.amount,
            Status: t.status,
            Temperature: t.temperature
        })));
        return module.FALLBACK_TENDERS;
    };

    checkFallback().then(tenders => {
        console.log('%c✅ All systems operational!', 'color: green; font-weight: bold');
    });
} catch (error) {
    console.error('❌ Error loading fallback data:', error);
}

// Check DOM for tender cards
setTimeout(() => {
    const tenderCards = document.querySelectorAll('.tender-card');
    console.log(`🎴 Tender cards in DOM: ${tenderCards.length}`);

    if (tenderCards.length > 0) {
        console.log('%c✅ Tender cards are rendering!', 'color: green; font-weight: bold');
    } else {
        console.warn('⚠️ No tender cards found in DOM');
    }

    // Check for offline banner
    const offlineBanner = document.querySelector('[style*="fff3cd"]');
    if (offlineBanner) {
        console.log('📢 Offline mode banner is visible');
    } else {
        console.log('🌐 Connected to backend (no offline banner)');
    }
}, 2000);
