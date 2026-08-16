import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";

export default function ProductExplanationPage() {
  return (
    <>
      <Topbar />
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10">
        <PageHeader
          eyebrow="Product Explanation"
          description="A short walkthrough of the operational intelligence, rerouting, alternatives, and hedging workflows."
        />

        <section className="overflow-hidden rounded-md border border-steel/20 bg-abyss2/60 shadow-[0_0_0_1px_rgba(224,147,44,0.06)]">
          <video
            className="aspect-video w-full bg-abyss"
            controls
            preload="metadata"
            aria-label="Hormuz Shield product explanation"
          >
            <source src="/product_explanation.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </section>
      </div>
    </>
  );
}
