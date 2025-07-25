import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CheckCircle,
} from "lucide-react";
import Particles from "../templates/Particles";
import { useAccess } from "../hooks/useAccess";
import useHandlePayment from "../store/usePaymentStore";
import { useAuthStore } from "../store/useAuthStore";

const PricingPage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const { plan: userPlan } = useAccess();
  const [cardsVisible, setCardsVisible] = useState(false);

  const handlePayment = useHandlePayment();

  const plans = [
    {
      name: "Freemium",
      price: "₹0",
      originalPrice: null,
      period: "One-time purchase",
      description: "Perfect for getting started",
      features: [
        "Access to all problems",
        "Create custom playlists",
        "Access free Playlists",
        "Limited NeetBot requests per day",
        "Progress Tracking Dashboard"
      ],
      buttonText: "Get Started",
      buttonStyle: (isCurrent) =>
        isCurrent
          ? "bg-neet-success/20 border-2 border-neet-success/50 text-neet-success cursor-not-allowed"
          : "bg-white/10 border-2 border-neet-neutral/30 hover:border-neet-primary/50 text-neet-neutral hover:bg-neet-primary/10",
      cardStyle: "border-2 border-neet-success/20 bg-white/20 backdrop-blur-sm",
      badge: "Free",
      badgeStyle: "bg-neet-success text-white",
      icon: Target,
      popular: false,
      planKey: "FREE",
    },
    {
      name: "Pro",
      price: `₹${parseInt(import.meta.env.VITE_PRICE_PRO) / 100}`,
      originalPrice: "₹3,000",
      period: "One-time purchase",
      description: "Best for serious learners",
      features: [
        "Access problem explanations & hints",
        "Playlists with Company Tags (Amazon, Google, etc.)",
        "Access Pro Playlists",
        "More NeetBot Requests for AI guidance",
      ],
      buttonText: "Upgrade to Pro",
      buttonStyle: (isCurrent) =>
        isCurrent
          ? "bg-neet-primary/20 border-2 border-neet-primary/50 text-neet-primary cursor-not-allowed"
          : "bg-gradient-to-r from-neet-primary to-neet-secondary hover:from-neet-primary-focus hover:to-neet-secondary-focus text-white shadow-lg hover:shadow-xl",
      cardStyle:
        "border-2 border-neet-primary/30 bg-white shadow-2xl shadow-neet-primary/10 backdrop-blur-sm transform transition-transform duration-500 ease-in-out hover:scale-[1.02]",
      badge: "Most Popular",
      badgeStyle:
        "bg-gradient-to-r from-neet-primary to-neet-secondary text-white",
      icon: Zap,
      popular: true,
      planKey: "PRO",
    },
    {
      name: "Advanced",
      price: `₹${parseInt(import.meta.env.VITE_PRICE_ADVANCED) / 100}`,
      originalPrice: "₹5,000",
      period: "One-time purchase",
      description: "For interview preparation",
      features: [
        "All Pro features",
        "Interview Prep Playlists",
        "Unlimited NeetBot Access",
        "Early Access to new features",
        "1-on-1 Resume Feedback",
      ],
      buttonText: "Go Advanced",
      buttonStyle: (isCurrent) =>
        isCurrent
          ? "bg-neet-secondary/20 border-2 border-neet-secondary/50 text-neet-secondary cursor-not-allowed"
          : "border-2 border-neet-neutral/30 bg-white hover:bg-neet-primary/80 text-neet-neutral hover:text-white",
      cardStyle: "border-2 border-neet-neutral/20 bg-white/20 backdrop-blur-sm",
      badge: "Enterprise",
      badgeStyle: "bg-neet-neutral text-neet-accent",
      icon: Crown,
      popular: false,
      planKey: "ADVANCED",
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setCardsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const getButtonContent = (plan) => {
    const isCurrent = userPlan === plan.planKey;

    if (isCurrent) {
      return (
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>Current Plan</span>
        </div>
      );
    }
    return plan.buttonText;
  };

  const isButtonDisabled = (plan) => {
    return userPlan === plan.planKey;
  };

  const handleClick = (planKey) => {
    if (!authUser) return navigate("/login");
    handlePayment(planKey);
  };

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
            const isCurrentPlan = userPlan === plan.planKey;
            const transitionDelay = `${100 + index * 100}ms`;

            return (
              <div
                key={index}
                className={`
                  relative rounded-2xl p-8 transition-all duration-700 ease-out
                  flex flex-col
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

                <div className="w-full mx-auto mb-8 border-t-2 border-neet-neutral/30"></div>

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
                <button
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200
                    ${plan.buttonStyle(isCurrentPlan)}
                    ${isCurrentPlan ? "" : "hover:scale-105 active:scale-95"}
                  `}
                  disabled={isButtonDisabled(plan)}
                  onClick={() => handleClick(plan.planKey)}
                >
                  {getButtonContent(plan)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
