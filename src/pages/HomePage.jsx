import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Utensils,
  Phone,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ChefHat,
  Star,
  Flame,
  CheckCircle2,
  Bike,
  BadgeCheck,
  ShoppingBag
} from 'lucide-react';
import { fetchRestaurants, fetchHeroSlides, resolveAssetUrl } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import { RestaurantSkeleton } from '../components/LoadingSkeleton';

const CATEGORIES = [
  { name: 'All Cuisines', filter: '' },
  { name: 'Biryani', filter: 'Biryani' },
  { name: 'Chettinad', filter: 'Chettinad' },
  { name: 'Pure Veg', filter: 'Pure Veg' },
  { name: 'Chinese', filter: 'Chinese' },
  { name: 'Cafe & Bakes', filter: 'Cafe' }
];

const POPULAR_TAGS = ['Biryani', 'Chicken Tikka', 'Chettinad', 'Parotta', 'Paneer Butter Masala', 'Burgers'];

const FEATURED_SHOWCASES = [
  {
    id: 1,
    tag: 'Biryani Special',
    title: 'Royal Chicken Dum Biryani',
    restaurant: 'Royal Biryani House',
    slug: 'royal-biryani-house',
    price: 240,
    originalPrice: 280,
    rating: 4.9,
    deliveryTime: '30-40 mins',
    desc: 'Slow cooked fragrant basmati rice with royal saffron, tender marinated chicken, served with mirchi salan.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    tag: 'Clay Oven Fresh',
    title: 'Tandoori Murgh (Half)',
    restaurant: 'The Tandoor Trail',
    slug: 'the-tandoor-trail',
    price: 260,
    originalPrice: 300,
    rating: 4.8,
    deliveryTime: '25-35 mins',
    desc: 'Juicy bone-in chicken slow roasted in authentic charcoal tandoor with aromatic Kashmiri spices.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    tag: 'Pure Vegetarian',
    title: 'Paneer Butter Masala & Naan',
    restaurant: 'Annapoorna Pure Veg',
    slug: 'annapoorna-pure-veg',
    price: 190,
    originalPrice: 220,
    rating: 4.9,
    deliveryTime: '20-30 mins',
    desc: 'Soft fresh cottage cheese simmered in rich creamy tomato cashew gravy with hand-churned butter.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80'
  }
];

const DEFAULT_TOP_SLIDES = [
  {
    eyebrow: 'Find your next favourite',
    title: 'Good food, from kitchens around you.',
    description: 'Explore local menus and discover a new favourite for lunch, dinner or a little treat.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&auto=format&fit=crop&q=85',
    alt: 'A table filled with freshly prepared food',
    action: 'Explore restaurants',
    href: '/restaurants'
  },
  {
    eyebrow: 'Local menus, made fresh',
    title: 'Your next delicious meal is one search away.',
    description: 'Browse biryani, Chettinad favourites, vegetarian plates and more from nearby restaurants.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1800&auto=format&fit=crop&q=85',
    alt: 'Fresh dishes arranged for a shared meal',
    action: 'Browse the menu',
    href: '/restaurants'
  },
  {
    eyebrow: 'A little something for everyone',
    title: 'Bring local flavour to your table.',
    description: 'Choose a restaurant, send your order request and our team will help coordinate the details.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&auto=format&fit=crop&q=85',
    alt: 'A freshly plated meal served at a restaurant',
    action: 'Find your food',
    href: '/search'
  }
];

function HomeTopSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[activeIndex] || slides[0];

  useEffect(() => setActiveIndex(0), [slides.length]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => {
      setActiveIndex(index => (index + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const showSlide = (direction) => {
    setActiveIndex(index => (index + direction + slides.length) % slides.length);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#211b17]"
      aria-label="FoodRaja featured restaurants"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <img
        key={slide.image}
        src={resolveAssetUrl(slide.image)}
        alt={slide.alt}
        className="slider-image-enter absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/15" />

      <div className="mx-auto flex min-h-[340px] max-w-7xl items-center px-12 py-12 sm:min-h-[400px] sm:px-20 sm:py-16 lg:min-h-[460px] lg:px-24">
        <div className="max-w-2xl text-white" aria-live="polite" aria-atomic="true">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-orange-300 sm:text-sm">{slide.eyebrow}</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">{slide.title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">{slide.description}</p>
          <Link
            to={slide.href}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF5722] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-black/20 transition hover:bg-[#E64A19]"
          >
            {slide.action}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => showSlide(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition hover:bg-black/55 sm:left-6 sm:h-12 sm:w-12"
      >
        <ArrowRight className="h-5 w-5 rotate-180" />
      </button>
      <button
        type="button"
        onClick={() => showSlide(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur transition hover:bg-black/55 sm:right-6 sm:h-12 sm:w-12"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2" aria-label="Choose a slide">
        {slides.map((item, index) => (
          <button
            key={item.eyebrow}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}: ${item.eyebrow}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all ${activeIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/60 hover:bg-white'}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [heroSlides, setHeroSlides] = useState(DEFAULT_TOP_SLIDES);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);
  const navigate = useNavigate();

  const currentDish = FEATURED_SHOWCASES[activeShowcaseIdx];

  useEffect(() => {
    loadRestaurants();
  }, [selectedCategory]);

  useEffect(() => {
    fetchHeroSlides()
      .then(res => {
        if (Array.isArray(res.data) && res.data.length) setHeroSlides(res.data);
      })
      .catch(err => console.error('Failed to load homepage slides', err));
  }, []);

  // Subtle auto-rotate featured showcase every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShowcaseIdx(prev => (prev + 1) % FEATURED_SHOWCASES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const res = await fetchRestaurants({ category: selectedCategory });
      setRestaurants(res.data || []);
    } catch (err) {
      console.error('Failed to load restaurants', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickTagClick = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="space-y-12 pb-20 sm:space-y-16">
      <HomeTopSlider slides={heroSlides} />
      
      {/* ============================================================== */}
      {/* ULTRA-PREMIUM HERO SECTION                                     */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5E5] via-[#FFFDF9] to-white pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-orange-100/70">
        
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-gradient-to-br from-orange-400/20 via-amber-300/15 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute top-1/3 left-4 w-72 h-72 bg-gradient-to-tr from-rose-300/15 via-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge & Live Call Indicator */}
              <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-orange-200/90 px-3.5 py-1.5 rounded-full shadow-sm">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#c2410c] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>Hand-Coordinated Kitchens</span>
                </span>
                <span className="text-[10px] bg-orange-100 text-[#E64A19] font-black px-2 py-0.5 rounded-full hidden sm:inline">
                  Zero Robotic Bots
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E2022] tracking-tight leading-[1.12]">
                Order from the best local restaurants.{' '}
                <span className="bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#E64A19] bg-clip-text text-transparent">
                  We personally confirm
                </span>{' '}
                every dish.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed font-normal">
                Choose authentic delicacies from top kitchens across the city. The FoodRaja manager personally calls the chef to verify kitchen availability and calls you to coordinate delivery.
              </p>

              {/* Enhanced Hero Search Container */}
              <div className="space-y-3 max-w-xl mx-auto lg:mx-0">
                <form onSubmit={handleSearch}>
                  <div className="bg-white p-2.5 rounded-2xl shadow-xl shadow-orange-500/10 border-2 border-orange-300/80 hover:border-[#FF5722] transition-all flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 flex items-center">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3.5" />
                      <input
                        type="text"
                        placeholder="Search for biryani, parotta, momos, noodles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#FF5722] to-[#E64A19] hover:from-[#E64A19] hover:to-[#D84315] text-white px-6 py-3 rounded-xl font-black text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
                    >
                      <span>Find Food</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Popular Search Suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 justify-center lg:justify-start text-xs pt-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">Trending:</span>
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleQuickTagClick(tag)}
                      className="px-2.5 py-1 bg-white/90 hover:bg-orange-50 text-gray-700 hover:text-[#FF5722] border border-orange-200/80 rounded-lg text-[11px] font-bold transition-all shadow-2xs hover:shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-xl mx-auto lg:mx-0">
                <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-orange-100/90 flex items-center gap-2 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Verified</p>
                    <p className="text-xs font-bold text-gray-800 leading-tight mt-0.5">Real Menus</p>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-orange-100/90 flex items-center gap-2 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#FF5722] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Manual</p>
                    <p className="text-xs font-bold text-gray-800 leading-tight mt-0.5">Call Verify</p>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-orange-100/90 flex items-center gap-2 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Payment</p>
                    <p className="text-xs font-bold text-gray-800 leading-tight mt-0.5">Pay on COD</p>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-orange-100/90 flex items-center gap-2 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Doorstep</p>
                    <p className="text-xs font-bold text-gray-800 leading-tight mt-0.5">Fresh Hot</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Interactive Showcase Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                
                {/* Decorative Background Card Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5722]/20 to-amber-300/30 rounded-3xl transform rotate-2 scale-102 filter blur-sm"></div>

                {/* Main Showcase Food Card */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-all duration-500">
                  
                  {/* Top Image Container */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-gray-900 group">
                    <img
                      src={currentDish.image}
                      alt={currentDish.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Tag & Rating Pills */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-[#FF5722] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>{currentDish.tag}</span>
                      </span>

                      <div className="bg-white/95 backdrop-blur-md text-gray-900 px-2.5 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        <span>{currentDish.rating}</span>
                      </div>
                    </div>

                    {/* Image Footer Details */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-semibold text-orange-200 uppercase tracking-wider">
                        {currentDish.restaurant}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
                        {currentDish.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Description & Action Body */}
                  <div className="p-5 bg-white space-y-3.5">
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {currentDish.desc}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-[#1E2022]">
                            Rs. {currentDish.price}
                          </span>
                          {currentDish.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              Rs. {currentDish.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {currentDish.deliveryTime}
                        </span>
                      </div>

                      <Link
                        to={`/restaurant/${currentDish.slug}`}
                        className="bg-[#1E2022] hover:bg-[#FF5722] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 group"
                      >
                        <span>Order Now</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    {/* Dish Showcase Indicator Dots */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                      {FEATURED_SHOWCASES.map((d, idx) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setActiveShowcaseIdx(idx)}
                          className={`h-2 rounded-full transition-all ${
                            activeShowcaseIdx === idx
                              ? 'w-6 bg-[#FF5722]'
                              : 'w-2 bg-gray-200 hover:bg-gray-300'
                          }`}
                          aria-label={`Show dish ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Badge: Manual Call Confirmation (Bottom Left) */}
                <div className="absolute -bottom-6 -left-3 sm:-left-6 bg-[#1E2022]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl max-w-xs border border-gray-700 hidden sm:block animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5722] to-[#FF7043] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Phone className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-white">Manual Call Desk</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                      <p className="text-gray-400 text-[11px] leading-tight mt-0.5">
                        We speak with the chef to guarantee hot availability
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge: 100% Satisfaction (Top Right) */}
                <div className="absolute -top-4 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md p-2.5 px-3 rounded-2xl shadow-lg border border-orange-100 hidden sm:flex items-center gap-2 animate-fadeIn">
                  <div className="w-6 h-6 rounded-lg bg-orange-100 text-[#FF5722] flex items-center justify-center font-bold text-xs">
                    🍛
                  </div>
                  <div className="text-left text-xs">
                    <span className="font-extrabold text-gray-900 block leading-none">Fresh Kitchen</span>
                    <span className="text-[10px] text-gray-500 font-medium">Prepared on Order</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* HOW FOODRAJA WORKS (Care Model)                                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF5722]">The FoodRaja Care Model</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E2022]">How Your Order Is Handled</h2>
          <p className="text-sm text-gray-500">No robotic cancellations. A real coordinator oversees your meal from kitchen to doorstep.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-orange-100 shadow-sm hover:shadow-md transition-all relative space-y-3">
            <span className="text-4xl font-black text-orange-200">01</span>
            <h3 className="font-black text-lg text-[#1E2022]">Select Your Restaurant</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore authentic menus from verified local restaurants and pick your favorite dishes without paying inflated hidden platform fees.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-orange-100 shadow-sm hover:shadow-md transition-all relative space-y-3">
            <span className="text-4xl font-black text-orange-200">02</span>
            <h3 className="font-black text-lg text-[#1E2022]">Owner Calls Restaurant</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              The FoodRaja owner receives your order immediately and calls the restaurant to verify fresh availability, preparation time, and correct pricing.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-orange-100 shadow-sm hover:shadow-md transition-all relative space-y-3">
            <span className="text-4xl font-black text-orange-200">03</span>
            <h3 className="font-black text-lg text-[#1E2022]">Owner Calls You & Delivers</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We ring your phone to confirm your delivery address and instructions, keep you updated, and ensure your hot food arrives safely.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* RESTAURANTS & CATEGORY FILTERS                                 */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#1E2022]">Partner Restaurants</h2>
            <p className="text-xs text-gray-500 mt-0.5">Explore menus from top local dining spots</p>
          </div>
          <Link
            to="/restaurants"
            className="text-xs font-bold text-[#FF5722] hover:text-[#E64A19] flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat.filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat.filter
                  ? 'bg-[#FF5722] text-white shadow-md shadow-orange-500/20'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {[1, 2, 3].map(i => (
              <RestaurantSkeleton key={i} />
            ))}
          </div>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {restaurants.map(rest => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
            <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-700">No restaurants found in this category</h3>
            <p className="text-xs text-gray-500 mt-1">Try selecting "All Cuisines" or search for dishes above.</p>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* PROMOTIONAL CALLOUT BANNER                                     */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1A1C1E] via-[#2A2D30] to-[#1A1C1E] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-gray-800">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043] bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800/40">
              Cash On Delivery Supported
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Order with complete confidence. Pay only after your order is confirmed.
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              No mandatory upfront card payments. We manually confirm every detail with the kitchen before your order is prepared.
            </p>
            <div className="pt-2">
              <Link
                to="/restaurants"
                className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all"
              >
                <span>Browse Local Menus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
