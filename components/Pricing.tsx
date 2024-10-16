import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["5 conversions per day", "Basic formats", "Max 5MB file size"],
    cta: "Start Free",
    href: "/convert",
  },
  {
    name: "Pro",
    price: "$9.99",
    features: [
      "Unlimited conversions",
      "All formats",
      "Max 50MB file size",
      "Priority support",
    ],
    cta: "Go Pro",
    href: "/pricing",
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited everything",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Us",
    href: "/contact",
  },
];

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Simple, Transparent Pricing
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className={index === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <p className="text-3xl font-bold">{plan.price}</p>
              {index === 1 && (
                <p className="text-sm text-primary">Most Popular</p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={index === 1 ? "default" : "outline"}
                asChild
              >
                <a href={plan.href}>{plan.cta}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
