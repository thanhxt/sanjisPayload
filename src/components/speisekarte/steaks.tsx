'use client'
import SteakSectionStripe from "../steakSectionStripe";
import Steakcuts from "./steakcuts";
import Sharing from "./sharing";
import Sides from "./sides";
import BackMenuButton from "./backMenuButton";
import ArrowUpButton from "../arrowUpButton";

export default function Steaks() {
    const sections = [
        { id: 'steaks-section', label: 'Steaks' },
        { id: 'sharing-section', label: 'Sharing' },
        { id: 'sides-section', label: 'Sides' },
    ];

    return (
        <>
            <SteakSectionStripe sections={sections} />
            <div id="steaks-section">
                <Steakcuts />
            </div>
            <div id="sharing-section">
                <Sharing />
            </div>
            <div id="sides-section">
                <Sides />
            </div>
            <BackMenuButton />
            <ArrowUpButton />       
        </>
    )
}