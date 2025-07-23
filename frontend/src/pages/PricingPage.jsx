import React, { useEffect, useState } from "react";
import {
  Check,
  Zap,
  Crown,
  Star,
  Bot,
  Target,
  Users,
  TrendingUp,
  StarsIcon,
} from "lucide-react";
import Particles from "../templates/Particles";
import Divider from "../templates/Divider";

const PricingPage = () => {
  const plans = [
    {
      name: "Freemium",
      price: "₹0",
      originalPrice: null,
      period: "One-time purchase",
      description: "Perfect for getting started",
      features: [
        "Access to 100 curated problems",
        "Create custom playlists",
        "One All-Rounder DSA Playlist",
        "Limited NeetBot requests per day",
      ],
      buttonText: "Current Plan",
      buttonStyle:
        "border-2 border-neet-neutral/30 bg-neet-neutral/60 text-neet-primary cursor-not-allowed",
      cardStyle: "border-2 border-neet-success/20 bg-white/20 backdrop-blur-sm",
      badge: "Free",
      badgeStyle: "bg-neet-success text-white",
      icon: Target,
      popular: false,
      isCurrent: true,
    },
    {
      name: "Pro",
      price: "₹1,499",
      originalPrice: "₹3,000",
      period: "One-time purchase",
      description: "Best for serious learners",
      features: [
        "Access to 500 problems",
        "Company Tags (Amazon, Google, etc.)",
        "Premium Playlists and Roadmaps",
        "Full access to NeetBot for AI guidance",
      ],
      buttonText: "Upgrade to Pro",
      buttonStyle:
        "bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-primary-focus hover:to-neet-secondary-focus hover:text-neet-neutral text-white shadow-lg hover:shadow-xl transition-colors duration-300 ease-in-out",
      cardStyle:
        "border-2 border-neet-primary/30 bg-white shadow-2xl shadow-neet-primary/10 backdrop-blur-sm transform transition-transform duration-500 ease-in-out hover:scale-105",
      badge: "Most Popular",
      badgeStyle:
        "bg-gradient-to-r from-neet-primary to-neet-secondary text-white",
      icon: Zap,
      popular: true,
      isCurrent: false,
    },
    {
      name: "Advanced",
      price: "₹2,999",
      originalPrice: "₹5,000",
      period: "One-time purchase",
      description: "For interview preparation",
      features: [
        "All Pro features",
        "Interview Warmup Problems",
        "Topic-wise Analytics Dashboard",
        "Early Access to new features",
        "1-on-1 Resume Feedback",
      ],
      buttonText: "Go Advanced",
      buttonStyle:
        "border-2 border-neet-neutral/30 bg-white hover:bg-neet-primary/80 text-neet-neutral",
      cardStyle: "border-2 border-neet-neutral/20 bg-white/20 backdrop-blur-sm",
      badge: "Enterprise",
      badgeStyle: "bg-neet-neutral text-neet-accent",
      icon: Crown,
      popular: false,
      isCurrent: false,
    },
  ];

  // Animation state for fade-in and scale-up
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation after mount
    const timeout = setTimeout(() => setCardsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen font-inter bg-gradient-to-br from-neet-neutral via-neet-primary to-neet-neutral flex flex-col overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#FFFFFF", "#F5F5F5"]}
          particleCount={150}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neet-accent-200 backdrop-blur-sm rounded-full border border-neet-accent/20 mb-6">
            <StarsIcon className="w-4 h-4 text-neet-primary" />
            <span className="text-neet-accent font-medium text-sm">
              Pricing
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neet-neutral mb-6">
            Choose your Coding Journey
          </h1>

          <p className="text-md text-neet-neutral/70 max-w-2xl mx-auto leading-relaxed">
            Simple pricing with no hidden fees. It's free to start — no trial,
            no contract, no risk.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            // For staggered animation, add a delay per card
            const transitionDelay = `${100 + index * 100}ms`;
            return (
              <div
                key={index}
                className={`
                  relative rounded-2xl p-8 transition-all duration-700 ease-out
                  hover:shadow-2xl hover:scale-[1.02] transform flex flex-col
                  ${plan.cardStyle}
                  ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}
                  ${
                    cardsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }
                `}
                style={{
                  minHeight: "540px",
                  transitionDelay,
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className={`
                    absolute -top-3 left-1/2 transform -translate-x-1/2
                    px-4 py-1 rounded-full text-sm font-semibold
                    ${plan.badgeStyle}
                  `}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-extrabold font-limelight text-neet-neutral mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-neet-neutral/60 text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-neet-neutral">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-neet-neutral/40 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-neet-accent bg-neet-neutral/60 px-3 py-1 rounded-full inline-block">
                    {plan.period}
                  </p>
                </div>

                <div className="w-full mx-auto mb-8  border-t-2 border-neet-neutral/30"></div>

                {/* Features */}
                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neet-neutral/80 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-neet-primary" />
                      </div>
                      <span className="text-neet-neutral/80 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {plan.isCurrent ? (
                  <button
                    className={`
                      w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200
                      ${plan.buttonStyle}
                    `}
                    disabled
                  >
                    {plan.buttonText}
                  </button>
                ) : (
                  <button
                    className={`
                      w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200
                      ${plan.buttonStyle}
                    `}
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
