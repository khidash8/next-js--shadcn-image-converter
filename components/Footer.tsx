import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Multiple Formats",
    description:
      "Convert to and from various image formats including JPG, PNG, WebP, and more.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Our advanced algorithms ensure rapid conversions without compromising quality.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your images are processed securely and deleted immediately after conversion.",
  },
];

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <feature.icon className="h-10 w-10 mb-4 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
