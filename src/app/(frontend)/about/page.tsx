import AboutComponent from '@/components/about/about';

export const metadata = {
    title: "Über uns | Sanji's",
    description: "Über uns von Sanji's – Geschichte, Team, Mission, Werte, Kontakt",
    openGraph: {
        url: "https://sanjiskitchen.de/about",
        title: "Über uns | Sanji's",
        description: "Über uns von Sanji's – Geschichte, Team, Mission, Werte, Kontakt",
    },
};

export default function About() {
    return (
        <>
            <AboutComponent />
        </>
    );
}
