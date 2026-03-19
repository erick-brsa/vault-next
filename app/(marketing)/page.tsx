import { Features, Hero, Navbar } from "@/components/ui";
import { Footer } from "@/components/ui/footer";
import { HowItWorks } from "@/components/ui/how-it-works";

export default function HomePage() {
    return (
        <div id="home">
            <Navbar />
            <main className="flex flex-col justify-center">
                <Hero />
                <Features />
                <HowItWorks />
                <Footer />
            </main>
        </div>
    );
}