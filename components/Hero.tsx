import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
        Transform Your Images with Ease
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Convert, resize, and optimize your images in seconds. No signup
        required.
      </p>
      <Link href="/convert">
        <Button size="lg" className="font-semibold">
          Start Converting <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
