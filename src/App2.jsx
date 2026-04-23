import { useState, useEffect, useRef } from "react";
import codFatherLogo from "./assets/cod-father-logo.jpg"
import UKFlag from "./assets/UKFlag.png"


// ─── Data ────────────────────────────────────────────────────────────────────

const MENU = [
  {
    category: "The Classics",
    emoji: "🐟",
    items: [
      {
        name: "Battered Cod",
        price: 14.99,
        desc: "Our signature dish — wild-caught Atlantic cod in our secret-recipe real-ale batter, fried to golden perfection. Served with chips, mushy peas & tartar sauce.",
        popular: true,
      },
      {
        name: "Battered Haddock",
        price: 13.99,
        desc: "MSC-certified North Sea haddock in crispy golden batter. A northern classic, done properly.",
        popular: false,
      },
      {
        name: "Battered Catfish",
        price: 15.99,
        desc: "Delicate whole plaice fillet, lightly battered and fried until just crisp. Served with hand-cut chips & a wedge of lemon.",
        popular: false,
      },
      {
        name: "Vegan Option",
        price: 13.49,
        desc: "An organic and Vegan safe alternative",
        popular: false,
      },
    ],
  },
  {
    category: "Sides",
    emoji: "🥧",
    items: [
      {
        name: "Bread Cake",
        price: 5.99,
        desc: "Thick-cut chips piled into a soft white bap with lashings of butter. Simple, brilliant, British.",
        popular: false,
      },
      {
        name: "Mushy Peas",
        price: 3.49,
        desc: "Slow-cooked marrowfat peas, seasoned with mint. The essential companion to any chippy meal.",
        popular: false,
      },
      {
        name: "Curry Sauce",
        price: 2.99,
        desc: "A mild, golden British chip-shop curry sauce — not your Indian restaurant curry, this is chippy gold.",
        popular: true,
      },
      {
        name: "Gravy",
        price: 2.49,
        desc: "Rich, thick, proper brown gravy. Pour it over your chips and thank us later.",
        popular: false,
      },
    ],
  },
  {
    category: "Favorites",
    emoji: "🥪",
    items: [
       {
        name: "Battered Sausage",
        price: 4.49,
        desc: "A thick, juicy British-style sausage dunked in our real-ale batter and fried golden. A chippy staple.",
        popular: false,
      },
      {
        name: "Homemade Clam Chowder",
        price: 10.99,
        // desc: "Plump Atlantic prawns tossed in classic Marie Rose sauce, wrapped in a soft flour tortilla with crisp gem lettuce.",
        popular: false,
      },
      {
        name: "Handcut Chips",
        price: 7.49,
        desc: "Basket of Chips.",
        popular: false,
      },
       {
        name: "Veggie Sausage",
        price: 4.49,
        // desc: "A thick, juicy British-style sausage dunked in our real-ale batter and fried golden. A chippy staple.",
        popular: false,
      },
       {
        name: "The Kevin",
        price: 14.49,
        // desc: "A thick, juicy British-style sausage dunked in our real-ale batter and fried golden. A chippy staple.",
        popular: false,
      },
       {
        name: "Sheffield Fish Cake",
        price: 12.99,
        // desc: "A thick, juicy British-style sausage dunked in our real-ale batter and fried golden. A chippy staple.",
        popular: false,
      },
       {
        name: "Span Fritters",
        price: 9.49,
        // desc: "A thick, juicy British-style sausage dunked in our real-ale batter and fried golden. A chippy staple.",
        popular: false,
      },
       {
        name: "Cod Butty",
        price: 14.49,
        // desc: "A thick, juicy British-style sausage dunked in our real-ale batter and fried golden. A chippy staple.",
        popular: false,
      },
       {
        name: "Mushy Pea Fritters",
        price: 12.49,
        // desc: "A thick, juicy British-style sausage dunked in our real-ale batter and fried golden. A chippy staple.",
        popular: false,
      },
    ],
  },
  {
    category: "Drinks",
    emoji: "🍺",
    items: [
      {
        name: "Housemade Tea",
        price: 7.99,
        desc: "Fresh Housemade Tea. Served Hot or Cold",
        popular: false,
      },
      {
        name: "Lemonade",
        price: 2.99,
        desc: "Old-fashioned cloudy British lemonade, sharp and refreshing.",
        popular: false,
      },
       {
        name: "Foutain Drink",
        price: 4.49,
        desc: "Coke Products",
        popular: false,
      },
    ],
  },
];

const CART_ITEMS_INIT = [];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Components ──────────────────────────────────────────────────────────────

function Nav({ cartCount, onCartClick }) {
  const y = useScrollY();
  const solid = y > 60;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavLink = (id) => {
    setMobileOpen(false);
    scrollTo(id);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid || mobileOpen ? "rgba(0,20,90,0.97)" : "transparent",
        backdropFilter: solid ? "blur(8px)" : "none",
        borderBottom: solid ? "1px solid rgba(207,20,43,0.28)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavLink("hero")}
        >
          <div className="w-14 h-14 flex items-center justify-center">
            <img src={codFatherLogo} alt="Cod Father Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <p className="font-bold tracking-wide leading-none" style={{ color: "#CF142B", fontFamily: "'Playfair Display', serif", fontSize: 16 }}>
              The Cod Father
            </p>
            <p style={{ color: "rgba(207,20,43,0.65)", fontFamily: "'Playfair Display', serif", fontSize: 10, letterSpacing: "0.12em" }}>
              LAS VEGAS · EST. 2019
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[["menu", "Menu"], ["order", "Order Online"], ["about", "About"]].map(([id, label]) => (
            <button
              key={id}
              onClick={() => handleNavLink(id)}
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'EB Garamond', serif", fontSize: 15, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => (e.target.style.color = "#FFFFFF")}
              onMouseLeave={e => (e.target.style.color = "rgba(255,255,255,0.65)")}
            >
              {label}
            </button>
          ))}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2 rounded"
            style={{ background: "#CF142B", color: "#FFFFFF", fontFamily: "'EB Garamond', serif", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer" }}
          >
            🛒 Basket
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#00247D", color: "white" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile right side: cart icon + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-1 px-3 py-2 rounded"
            style={{ background: "#CF142B", color: "#FFFFFF", fontFamily: "'EB Garamond', serif", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#00247D", color: "white" }}>
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#F0F4FF", padding: "4px" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{ background: "rgba(0,20,90,0.98)", borderTop: "1px solid rgba(207,20,43,0.2)", padding: "16px 24px 24px" }}>
          {[["menu", "Menu"], ["order", "Order Online"], ["about", "About"]].map(([id, label]) => (
            <button
              key={id}
              onClick={() => handleNavLink(id)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 0", color: "#F0F4FF", fontFamily: "'EB Garamond', serif", fontSize: 18, background: "none", border: "none", borderBottom: "1px solid rgba(207,20,43,0.15)", cursor: "pointer" }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-8"
      style={{ background: "#00145A" }}
    >
      {/* Animated newspaper texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(207,20,43,0.35) 2px, rgba(207,20,43,0.35) 3px)`,
        }}
      />

      {/* Large decorative fish silhouette */}
      <div
        className="absolute right-3 bottom-0 opacity-40 select-none pointer-events-none"
        style={{ fontSize: 400, lineHeight: 1, color: "rgba(207,20,43,0.07)" }}
      >
        <img src={UKFlag} alt="GB Flag" />
      </div>

      {/* Union Jack accent lines */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: "linear-gradient(90deg, #C40000, #FFFFFF, #00247D)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1"
        style={{ background: "linear-gradient(90deg, #00247D, #FFFFFF, #C40000)" }}
      />

      <div className="relative text-center px-4 max-w-4xl mx-auto w-full">
        {/* Crown decoration */}
        <div className="text-4xl mb-4" style={{ filter: "sepia(1) saturate(3) hue-rotate(-10deg)" }}>
          👑
        </div>

        <div
          className="inline-block px-4 py-1 rounded mb-6 text-xs tracking-widest font-semibold uppercase"
          style={{
            background: "rgba(207,20,43,0.18)",
            border: "1px solid rgba(207,20,43,0.45)",
            color: "#CF142B",
            fontFamily: "'EB Garamond', serif",
            letterSpacing: "0.2em",
          }}
        >
          Authentic British Fish &amp; Chips · Las Vegas, Nevada
        </div>

        <h1
          className="mb-6 leading-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(52px, 10vw, 110px)",
            fontWeight: 700,
            color: "#F0F4FF",
            textShadow: "0 0 80px rgba(207,20,43,0.35)",
            letterSpacing: "-1px",
          }}
        >
          The Cod
          <br />
          <span style={{ color: "#CF142B" }}>Father</span>
        </h1>

        <p
          className="max-w-xl mx-auto mb-10 leading-relaxed"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 20,
            color: "rgba(240,244,255,0.75)",
            fontStyle: "italic",
          }}
        >
          Straight from the streets of Sheffield England to the heart of the Nevada desert —
          proper chippy food, done right. No shortcuts, no compromises.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            onClick={() => scrollTo("order")}
            className="px-8 py-4 text-base font-semibold tracking-wide rounded transition-all"
            style={{
              background: "#CF142B",
              color: "#FFFFFF",
              fontFamily: "'EB Garamond', serif",
              fontSize: 17,
              border: "none",
              cursor: "pointer",
              minWidth: 200,
              width: "100%",
              maxWidth: 320,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#E8253C")}
            onMouseLeave={e => (e.currentTarget.style.background = "#CF142B")}
          >
            Order Online →
          </button>
          <button
            onClick={() => scrollTo("menu")}
            className="px-8 py-4 text-base font-semibold tracking-wide rounded transition-all"
            style={{
              background: "transparent",
              color: "#F0F4FF",
              fontFamily: "'EB Garamond', serif",
              fontSize: 17,
              border: "1px solid rgba(240,244,255,0.35)",
              cursor: "pointer",
              minWidth: 200,
              width: "100%",
              maxWidth: 320,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(240,244,255,0.35)";
              e.currentTarget.style.color = "#F0F4FF";
            }}
          >
            View Menu
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[
            ["🏆", "Award-Winning Batter"],
            ["🇬🇧", "Proper British Recipe"],
            ["🐟", "Sustainably Sourced"],
            ["⭐", "4.9 on Google"],
          ].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-2">
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 14,
                  color: "rgba(207,20,43,0.75)",
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnnouncementBanner() {
  return (
    <div
      className="py-4 overflow-hidden"
      style={{ background: "#00247D", borderBottom: "1px solid rgba(207,20,43,0.22)" }}
    >
      <div
        className="flex gap-12 animate-marquee whitespace-nowrap"
        style={{
          animation: "marquee 25s linear infinite",
          display: "flex",
          gap: "3rem",
        }}
      >
        {Array(4)
          .fill([
            "🐟 Fresh cod delivered daily",
            "💻 Order Online Now",
            "🏆 Best Fish & Chips in Nevada 2024",
            "📞 Call 702-462-2280 to Order",
            "⏰ Open Tues–Sat 11am – 8pm",
          ])
          .flat()
          .map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 15,
                color: "rgba(207,20,43,0.85)",
                display: "inline-block",
                padding: "0 1.5rem",
                borderRight: "1px solid rgba(207,20,43,0.22)",
              }}
            >
              {item}
            </span>
          ))}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function MenuSection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="menu"
      className="py-16 px-4"
      style={{ background: "#001A6E" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p
            className="uppercase tracking-widest mb-3 text-sm"
            style={{ color: "#CF142B", fontFamily: "'EB Garamond', serif", letterSpacing: "0.25em" }}
          >
            — Our Menu —
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 6vw, 60px)",
              color: "#F0F4FF",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Proper Chippy Grub
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 18,
              color: "rgba(240,244,255,0.6)",
              fontStyle: "italic",
            }}
          >
            Everything made fresh to order. Never Frozen.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {MENU.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(i)}
              className="px-5 py-2 rounded text-sm transition-all"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 15,
                background: activeCategory === i ? "#CF142B" : "rgba(207,20,43,0.1)",
                color: activeCategory === i ? "#FFFFFF" : "rgba(240,244,255,0.7)",
                border: activeCategory === i ? "1px solid #CF142B" : "1px solid rgba(207,20,43,0.22)",
                cursor: "pointer",
                fontWeight: activeCategory === i ? 600 : 400,
              }}
            >
              {cat.emoji} {cat.category}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {MENU[activeCategory].items.map((item) => (
            <MenuCard key={item.name} item={item} onAdd={() => onAddToCart(item)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuCard({ item, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="rounded-lg p-6 flex flex-col justify-between transition-all"
      style={{
        background: "rgba(240,244,255,0.06)",
        border: "1px solid rgba(207,20,43,0.18)",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(207,20,43,0.45)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(207,20,43,0.18)")}
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                color: "#F0F4FF",
                fontWeight: 600,
              }}
            >
              {item.name}
            </h3>
            {item.popular && (
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold"
                style={{ background: "#00247D", color: "#FFFFFF", fontFamily: "'EB Garamond', serif" }}
              >
                Popular
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              color: "#CF142B",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 15,
            color: "rgba(240,244,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          {item.desc}
        </p>
      </div>

      <button
        onClick={handleAdd}
        className="mt-5 w-full py-2 rounded text-sm font-semibold transition-all"
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 15,
          background: added ? "rgba(74,140,74,0.2)" : "rgba(207,20,43,0.14)",
          color: added ? "#7CBA7C" : "#CF142B",
          border: added ? "1px solid rgba(74,140,74,0.4)" : "1px solid rgba(207,20,43,0.35)",
          cursor: "pointer",
        }}
      >
        {added ? "✓ Added to Basket" : "+ Add to Basket"}
      </button>
    </div>
  );
}

function OrderSection({ cart, onRemove, onClearCart }) {
  const [step, setStep] = useState("cart"); // cart | details | confirm
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "pickup", address: "", notes: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    onClearCart();
    setStep("cart");
    setForm({ name: "", phone: "", email: "", type: "pickup", address: "", notes: "" });
  };

  return (
    <section id="order" className="py-16 px-4" style={{ background: "#000F4A" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="uppercase tracking-widest mb-3 text-sm"
            style={{ color: "#CF142B", fontFamily: "'EB Garamond', serif", letterSpacing: "0.25em" }}
          >
            — Order Online —
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              color: "#F0F4FF",
              fontWeight: 700,
            }}
          >
            Ready to Order?
          </h2>
          <p
            className="mt-3 max-w-md mx-auto"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 17,
              color: "rgba(240,244,255,0.55)",
              fontStyle: "italic",
            }}
          >
            Pickup or delivery — your food is ready when you are.
          </p>
        </div>

        {orderPlaced && (
          <div
            className="mb-10 p-6 rounded-lg text-center"
            style={{ background: "rgba(74,140,74,0.15)", border: "1px solid rgba(74,140,74,0.4)" }}
          >
            <div className="text-4xl mb-3">🎉</div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#7CBA7C", fontWeight: 600 }}
            >
              Order Placed! Brilliant!
            </h3>
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 16,
                color: "rgba(240,244,255,0.65)",
                marginTop: 8,
              }}
            >
              We'll have your order ready in about 20–25 minutes. Cheers!
            </p>
          </div>
        )}

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[["cart", "1", "Basket"], ["details", "2", "Your Details"], ["confirm", "3", "Confirm"]].map(
            ([s, num, label], i) => (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && <div style={{ width: 32, height: 1, background: "rgba(207,20,43,0.28)" }} />}
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: step === s ? "#CF142B" : "rgba(207,20,43,0.12)",
                      color: step === s ? "#00145A" : "rgba(207,20,43,0.55)",
                      border: "1px solid rgba(207,20,43,0.35)",
                      fontFamily: "'EB Garamond', serif",
                    }}
                  >
                    {num}
                  </div>
                  <span
                    className="hidden sm:inline"
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 13,
                      color: step === s ? "#CF142B" : "rgba(207,20,43,0.45)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        <div
          className="rounded-lg p-5 md:p-8"
          style={{ background: "rgba(240,244,255,0.04)", border: "1px solid rgba(207,20,43,0.18)" }}
        >
          {/* STEP 1: Cart */}
          {step === "cart" && (
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  color: "#F0F4FF",
                  marginBottom: 20,
                }}
              >
                Your Basket {itemCount > 0 && `(${itemCount} items)`}
              </h3>
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">🛒</div>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 17, color: "rgba(240,244,255,0.45)", fontStyle: "italic" }}>
                    Your basket is empty. Pop something in from the menu above!
                  </p>
                  <button
                    onClick={() => scrollTo("menu")}
                    className="mt-6 px-6 py-2 rounded"
                    style={{
                      background: "#CF142B",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-3"
                        style={{ borderBottom: "1px solid rgba(207,20,43,0.12)" }}
                      >
                        <div>
                          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: "#F0F4FF" }}>
                            {item.name}
                          </p>
                          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 13, color: "rgba(207,20,43,0.65)" }}>
                            ${item.price.toFixed(2)} × {item.qty}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#CF142B", fontWeight: 600 }}>
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemove(item.name)}
                            style={{ background: "none", border: "none", color: "rgba(240,244,255,0.35)", cursor: "pointer", fontSize: 18 }}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="flex justify-between items-center py-4 mb-6"
                    style={{ borderTop: "1px solid rgba(207,20,43,0.35)" }}
                  >
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#F0F4FF" }}>Total</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#CF142B", fontWeight: 700 }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => setStep("details")}
                    className="w-full py-3 rounded font-semibold"
                    style={{
                      background: "#CF142B",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 17,
                      fontWeight: 600,
                    }}
                  >
                    Continue →
                  </button>
                </>
              )}
            </div>
          )}

          {/* STEP 2: Details */}
          {step === "details" && (
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  color: "#F0F4FF",
                  marginBottom: 20,
                }}
              >
                Your Details
              </h3>
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                {[
                  ["name", "Full Name", "text", "John Smith"],
                  ["phone", "Phone Number", "tel", "702-555-0100"],
                  ["email", "Email Address", "email", "john@example.com"],
                ].map(([field, label, type, placeholder]) => (
                  <div key={field} className={field === "email" ? "md:col-span-2" : ""}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'EB Garamond', serif",
                        fontSize: 13,
                        color: "rgba(207,20,43,0.75)",
                        marginBottom: 6,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      style={{
                        width: "100%",
                        background: "rgba(240,244,255,0.07)",
                        border: "1px solid rgba(207,20,43,0.28)",
                        borderRadius: 6,
                        padding: "10px 14px",
                        color: "#F0F4FF",
                        fontFamily: "'EB Garamond', serif",
                        fontSize: 16,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <label
                  style={{
                    display: "block",
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 13,
                    color: "rgba(207,20,43,0.75)",
                    marginBottom: 8,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Order Type
                </label>
                <div className="flex gap-3">
                  {["pickup", "delivery"].map(t => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: form.type === t ? "rgba(207,20,43,0.22)" : "rgba(240,244,255,0.04)",
                        border: form.type === t ? "1px solid #C49137" : "1px solid rgba(207,20,43,0.22)",
                        borderRadius: 6,
                        color: form.type === t ? "#CF142B" : "rgba(240,244,255,0.45)",
                        fontFamily: "'EB Garamond', serif",
                        fontSize: 16,
                        cursor: "pointer",
                        textTransform: "capitalize",
                      }}
                    >
                      {t === "pickup" ? "🏪 " : "🚗 "}{t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {form.type === "delivery" && (
                <div className="mb-5">
                  <label style={{ display: "block", fontFamily: "'EB Garamond', serif", fontSize: 13, color: "rgba(207,20,43,0.75)", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 The Strip, Las Vegas, NV"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(240,244,255,0.07)",
                      border: "1px solid rgba(207,20,43,0.28)",
                      borderRadius: 6,
                      padding: "10px 14px",
                      color: "#F0F4FF",
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 16,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              )}

              <div className="mb-6">
                <label style={{ display: "block", fontFamily: "'EB Garamond', serif", fontSize: 13, color: "rgba(207,20,43,0.75)", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Special Notes (optional)
                </label>
                <textarea
                  placeholder="Any allergies or special requests..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  style={{
                    width: "100%",
                    background: "rgba(240,244,255,0.07)",
                    border: "1px solid rgba(207,20,43,0.28)",
                    borderRadius: 6,
                    padding: "10px 14px",
                    color: "#F0F4FF",
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 16,
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("cart")}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "transparent",
                    border: "1px solid rgba(207,20,43,0.28)",
                    borderRadius: 6,
                    color: "rgba(240,244,255,0.55)",
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  style={{
                    flex: 2,
                    padding: "12px",
                    background: "#CF142B",
                    border: "none",
                    borderRadius: 6,
                    color: "#FFFFFF",
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 17,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === "confirm" && (
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  color: "#F0F4FF",
                  marginBottom: 20,
                }}
              >
                Confirm Order
              </h3>
              <div
                className="rounded-lg p-5 mb-6"
                style={{ background: "rgba(0,36,125,0.25)", border: "1px solid rgba(207,20,43,0.22)" }}
              >
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 15, color: "rgba(240,244,255,0.65)", marginBottom: 4 }}>
                  Name: <span style={{ color: "#F0F4FF" }}>{form.name || "—"}</span>
                </p>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 15, color: "rgba(240,244,255,0.65)", marginBottom: 4 }}>
                  Phone: <span style={{ color: "#F0F4FF" }}>{form.phone || "—"}</span>
                </p>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 15, color: "rgba(240,244,255,0.65)", marginBottom: 4 }}>
                  Type: <span style={{ color: "#F0F4FF", textTransform: "capitalize" }}>{form.type}</span>
                </p>
                {form.type === "delivery" && (
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 15, color: "rgba(240,244,255,0.65)", marginBottom: 4 }}>
                    Address: <span style={{ color: "#F0F4FF" }}>{form.address || "—"}</span>
                  </p>
                )}
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(207,20,43,0.22)" }}>
                  {cart.map(item => (
                    <div key={item.name} className="flex justify-between" style={{ marginBottom: 4 }}>
                      <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 15, color: "rgba(240,244,255,0.75)" }}>
                        {item.qty}× {item.name}
                      </span>
                      <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 15, color: "#CF142B" }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(207,20,43,0.22)" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#F0F4FF", fontWeight: 600 }}>Total</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#CF142B", fontWeight: 700 }}>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("details")}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "transparent",
                    border: "1px solid rgba(207,20,43,0.28)",
                    borderRadius: 6,
                    color: "rgba(240,244,255,0.55)",
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  style={{
                    flex: 2,
                    padding: "12px",
                    background: "#CF142B",
                    border: "none",
                    borderRadius: 6,
                    color: "#FFFFFF",
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 17,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Place Order 🇬🇧
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 px-4" style={{ background: "#001A6E" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p
              className="uppercase tracking-widest mb-4 text-sm"
              style={{ color: "#CF142B", fontFamily: "'EB Garamond', serif", letterSpacing: "0.25em" }}
            >
              — Our Story —
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 5vw, 48px)",
                color: "#F0F4FF",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 24,
              }}
            >
              In Cod <em style={{ color: "#CF142B" }}>We Trust</em>
            </h2>
            <div
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 18,
                color: "rgba(240,244,255,0.7)",
                lineHeight: 1.8,
              }}
            >
              <p style={{ marginBottom: 16 }}>
                If there is one iconic dish, that the UK is known for around the world, it is fish & chips!
              </p>
              <p style={{ marginBottom: 16 }}>
                There is no denying Brits love this dish with around 382 million portions being sold every year by "Chippys" and being the only thing during WW2 not to be rationed by then Prime Minister Winston Churchill.
              </p>
              <p>
                Now The Codfather brings Britain's favorite food from Sheffield England to Las Vegas, Nevada!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                ["2019", "Year Opened"],
                ["100%", "Fresh Fish"],
                ["4.7★", "Google Rating"],
              ].map(([stat, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 32,
                      color: "#CF142B",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {stat}
                  </div>
                  <div
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 14,
                      color: "rgba(240,244,255,0.5)",
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info card */}
          <div
            className="rounded-lg p-5 md:p-8"
            style={{
              background: "rgba(240,244,255,0.04)",
              border: "1px solid rgba(207,20,43,0.22)",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                color: "#F0F4FF",
                marginBottom: 24,
                fontWeight: 600,
              }}
            >
              Visit Us
            </h3>
            {[
              {
                icon: "📍",
                label: "Address",
                value: "SUNSET RIDGE PLAZA\n2895 North Green Valley Parkway",
              },
              {
                icon: "⏰",
                label: "Hours",
                value: "Tues–Sat: 11am – 8pm",
              },
              {
                icon: "📞",
                label: "Phone",
                value: "(702) 462-2280",
              },
              {
                icon: "✉️",
                label: "Email",
                value: "hello@thecodfather.com",
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex gap-4 mb-6"
                style={{ paddingBottom: 20, borderBottom: "1px solid rgba(207,20,43,0.12)" }}
              >
                <span style={{ fontSize: 22, lineHeight: 1.4 }}>{icon}</span>
                <div>
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 12,
                      color: "#CF142B",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 16,
                      color: "rgba(240,244,255,0.75)",
                      whiteSpace: "pre-line",
                      lineHeight: 1.6,
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => scrollTo("order")}
              className="w-full py-3 rounded font-semibold mt-2"
              style={{
                background: "#CF142B",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                fontFamily: "'EB Garamond', serif",
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              Order Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-12 px-6 text-center"
      style={{
        background: "#00093A",
        borderTop: "1px solid rgba(207,20,43,0.18)",
      }}
    >
      <div
        className="text-3xl mb-2 font-bold"
        style={{ fontFamily: "'Playfair Display', serif", color: "#CF142B" }}
      >
        The Cod Father
      </div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 14, color: "rgba(207,20,43,0.45)", fontStyle: "italic", marginBottom: 16 }}>
        Proper British Fish &amp; Chips · Las Vegas, Nevada
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["Menu", "Order Online", "About", "Contact"].map(link => (
          <button
            key={link}
            onClick={() => scrollTo(link.toLowerCase().replace(" ", ""))}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'EB Garamond', serif",
              fontSize: 14,
              color: "rgba(207,20,43,0.55)",
              cursor: "pointer",
            }}
            onMouseEnter={e => (e.target.style.color = "#CF142B")}
            onMouseLeave={e => (e.target.style.color = "rgba(207,20,43,0.55)")}
          >
            {link}
          </button>
        ))}
      </div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 13, color: "rgba(207,20,43,0.28)" }}>
        © 2025 The Cod Father. All rights reserved. Made with 🇬🇧 pride.
      </p>
    </footer>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

function CartDrawer({ open, onClose, cart, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={onClose}
        />
      )}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          width: "min(340px, 100vw)",
          background: "#00247D",
          borderLeft: "1px solid rgba(207,20,43,0.28)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: "1px solid rgba(207,20,43,0.18)" }}
        >
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#F0F4FF" }}>
            Your Basket
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(240,244,255,0.45)",
              fontSize: 22,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🛒</div>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: "rgba(240,244,255,0.4)", fontStyle: "italic" }}>
                Nothing here yet!
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.name}
                className="flex justify-between items-start mb-5 pb-5"
                style={{ borderBottom: "1px solid rgba(207,20,43,0.12)" }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 16, color: "#F0F4FF", marginBottom: 2 }}>
                    {item.name}
                  </p>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 13, color: "rgba(207,20,43,0.55)" }}>
                    ${item.price.toFixed(2)} × {item.qty}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#CF142B", fontWeight: 600 }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemove(item.name)}
                    style={{ background: "none", border: "none", color: "rgba(240,244,255,0.3)", cursor: "pointer", fontSize: 18 }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6" style={{ borderTop: "1px solid rgba(207,20,43,0.18)" }}>
            <div className="flex justify-between mb-5">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#F0F4FF" }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#CF142B", fontWeight: 700 }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => { onClose(); scrollTo("order"); }}
              style={{
                width: "100%",
                padding: "13px",
                background: "#CF142B",
                border: "none",
                borderRadius: 6,
                color: "#FFFFFF",
                fontFamily: "'EB Garamond', serif",
                fontSize: 17,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(i => i.name !== name));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ background: "#00145A", minHeight: "100vh" }}>
      <Nav cartCount={cartCount} onCartClick={() => setDrawerOpen(true)} />
      <Hero />
      <AnnouncementBanner />
      <MenuSection onAddToCart={addToCart} />
      <OrderSection cart={cart} onRemove={removeFromCart} onClearCart={clearCart} />
      <AboutSection />
      <Footer />
      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
      />
    </div>
  );
}