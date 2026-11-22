import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ExternalLink,
  ShieldCheck,
  Users,
  Utensils,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HandHeart,
  Building2,
  Gift
} from 'lucide-react';

const HELPBANK_URL = 'https://www.helpbank.in/campaigns';

const CAUSES = [
  {
    id: 'hunger-relief',
    icon: Utensils,
    title: 'Daily Food & Hunger Relief',
    tag: 'Emergency Food Aid',
    color: 'from-orange-500 to-amber-500',
    description:
      'Provide warm, nutritious meals and monthly dry ration kits to daily wage workers, homeless individuals, and struggling families across India.',
    impact: '₹500 can sponsor 10 warm meals for hungry individuals.'
  },
  {
    id: 'child-nutrition',
    icon: Heart,
    title: 'Child Nutrition & Health',
    tag: 'Save Little Lives',
    color: 'from-rose-500 to-pink-500',
    description:
      'Support malnutrition eradication initiatives for infants and young children in impoverished communities, providing milk, nutrition bars, and vital vitamins.',
    impact: '₹1,000 provides a month of essential nutrition for a child.'
  },
  {
    id: 'education-meals',
    icon: Sparkles,
    title: 'School Mid-Day Meals',
    tag: 'Education & Food',
    color: 'from-emerald-500 to-teal-500',
    description:
      'Keep underprivileged children in school by ensuring they receive wholesome mid-day meals and clean drinking water throughout the school year.',
    impact: 'Helps children learn with full stomachs and happy smiles.'
  },
  {
    id: 'medical-relief',
    icon: HandHeart,
    title: 'Emergency Medical & Ration Kits',
    tag: 'Critical Care',
    color: 'from-blue-500 to-indigo-500',
    description:
      'Crowdfund urgent medical expenses and emergency relief kits for families facing unexpected health crises and poverty.',
    impact: 'Direct life-saving support for verified urgent cases.'
  }
];

export default function DonatePage() {
  return (
    <div className="space-y-12 pb-24">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5E5] via-[#FFFDF9] to-white pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-orange-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-white/95 border border-rose-200 px-4 py-1.5 rounded-full shadow-xs">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-rose-700">
              FoodRaja Social Impact Initiative
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1E2022] tracking-tight leading-tight">
            Share the Joy of Food.{' '}
            <span className="bg-gradient-to-r from-rose-500 via-[#FF5722] to-amber-500 bg-clip-text text-transparent">
              Feed Someone in Need.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            While you relish delicious food from top local restaurants, millions of people struggle for a single daily meal.
            Through our partnership with <strong>HelpBank Crowdfunding Platform</strong>, you can directly support verified hunger relief and charity campaigns.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={HELPBANK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-500 to-[#FF5722] hover:from-rose-600 hover:to-[#E64A19] text-white px-8 py-4 rounded-2xl font-black text-sm sm:text-base shadow-xl shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Donate on HelpBank Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              to="/restaurants"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50 text-gray-800 border border-orange-200 px-6 py-4 rounded-2xl font-bold text-sm transition-all"
            >
              <span>Explore Restaurants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-gray-500 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Verified Campaigns
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FF5722]" /> Direct NGO Impact
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-500" /> Powered by HelpBank.in
            </span>
          </div>

        </div>
      </section>

      {/* Featured Partner Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                Official Crowdfunding Partner
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                HelpBank — Premium Crowdfunding NGO Platform
              </h2>
              <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
                HelpBank connects generous donors with verified NGOs, social workers, and grassroots causes across India.
                Every rupee you contribute directly reaches verified beneficiaries.
              </p>
            </div>
            <a
              href={HELPBANK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-6 py-3.5 rounded-xl font-black text-sm shadow-lg transition-all"
            >
              <span>View Active Campaigns</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Impact Causes Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF5722]">
            Ways You Can Help
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E2022]">
            Active Causes Supported on HelpBank
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Choose a cause close to your heart. Whether small or large, your contribution makes an immediate difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAUSES.map((cause) => {
            const Icon = cause.icon;
            return (
              <div
                key={cause.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-orange-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cause.color} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-orange-50 text-[#E64A19] px-3 py-1 rounded-full border border-orange-100">
                      {cause.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#1E2022]">{cause.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1.5">
                      {cause.description}
                    </p>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-xs text-amber-900 font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{cause.impact}</span>
                  </div>
                </div>

                <a
                  href={HELPBANK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1E2022] hover:bg-[#FF5722] text-white py-3 rounded-xl font-bold text-xs shadow-sm transition-all group"
                >
                  <span>Support this Cause on HelpBank</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works & Transparency */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-orange-50/60 to-white rounded-3xl p-8 sm:p-10 border border-orange-100 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#1E2022]">
              How the Donation Process Works
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Simple, transparent, and direct to verified beneficiaries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-2xs space-y-2">
              <span className="text-2xl font-black text-orange-300">01</span>
              <h4 className="font-bold text-sm text-[#1E2022]">Choose a Campaign</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Visit HelpBank's verified campaigns page and select the food relief or NGO cause you wish to support.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-2xs space-y-2">
              <span className="text-2xl font-black text-orange-300">02</span>
              <h4 className="font-bold text-sm text-[#1E2022]">Secure Payment</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Contribute safely via UPI, Google Pay, PhonePe, Paytm, Debit/Credit Card or NetBanking.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-2xs space-y-2">
              <span className="text-2xl font-black text-orange-300">03</span>
              <h4 className="font-bold text-sm text-[#1E2022]">Direct Impact</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your donation directly funds food preparation, ration kits, and support for those in urgent need.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <a
              href={HELPBANK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-[#FF5722] hover:from-rose-600 hover:to-[#E64A19] text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-md transition-all"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Visit HelpBank.in/campaigns</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
