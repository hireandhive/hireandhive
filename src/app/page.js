import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Loading from "@/components/Loading/Loading";
import ParticleBackground from "@/components/ParticleBackground";
import Services from "@/components/Services/Services";
import WorkerForm from "@/components/WorkerForm/WorkerForm";

export default function Home() {
  return (
    <main className="home-page">
      <ParticleBackground />
      <Header />
      <Hero />
      <HowItWorks />
      <Services />
      <WorkerForm />
    </main>
  );
}