import { useEffect, useRef, useState } from "react";
import {
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  Flame,
  Heart,
  Home,
  Hotel,
  KeyRound,
  Lock,
  MapPin,
  MessageCircle,
  Minus,
  PawPrint,
  Plus,
  ShieldCheck,
  Star,
  Waves,
  Wallet,
} from "lucide-react";
// @ts-expect-error CSS side-effect imports are handled by the application bundler.
import "../../styles/book-with-escrow.css";
import GlassSurface from "../GlassSurface/GlassSurface.jsx";

type Kind = "Apartment" | "House" | "Hotel" | "Beach house";

interface Listing {
  id: string;
  title: string;
  address: string;
  kind: Kind;
  image: string;
  nightly: number;
  beds: number;
  baths: number;
  extra: { label: string; icon: "pet" | "no-pet" | "pool" };
  rating: number;
  promoted?: boolean;
}

const LISTINGS: Listing[] = [
  {
    id: "casa-nispero",
    title: "Casa Níspero, Barrio Escalante",
    address: "Calle 33, Barrio Escalante, San José",
    kind: "Apartment",
    image: "/rentals/casa-nispero.jpg",
    nightly: 86,
    beds: 2,
    baths: 1,
    extra: { label: "pet friendly", icon: "pet" },
    rating: 4.8,
    promoted: true,
  },
  {
    id: "jardin-heredia",
    title: "Jardín de Heredia House",
    address: "Calle 8, Mercedes, Heredia",
    kind: "House",
    image: "/rentals/jardin-heredia.jpg",
    nightly: 112,
    beds: 3,
    baths: 2,
    extra: { label: "pet friendly", icon: "pet" },
    rating: 4.9,
    promoted: true,
  },
  {
    id: "hotel-tamarindo",
    title: "Hotel Playa Tamarindo",
    address: "Playa Tamarindo, Guanacaste",
    kind: "Hotel",
    image: "/rentals/hotel-tamarindo.jpg",
    nightly: 148,
    beds: 1,
    baths: 1,
    extra: { label: "pool access", icon: "pool" },
    rating: 4.7,
  },
  {
    id: "brisa-del-puerto",
    title: "Brisa del Puerto",
    address: "Calle 3, Barrio El Carmen, Puntarenas",
    kind: "Beach house",
    image: "/rentals/brisa-del-puerto.jpg",
    nightly: 91,
    beds: 1,
    baths: 1,
    extra: { label: "no pets", icon: "no-pet" },
    rating: 4.6,
  },
];

const KIND_ICON = {
  Apartment: Building2,
  House: Home,
  Hotel: Hotel,
  "Beach house": Waves,
} as const;

/** 0 = not booked, 1 = funds locked, 2 = check-in confirmed, 3 = released */
type Stage = 0 | 1 | 2 | 3;

const STAGES = [
  { icon: Lock, title: "Funds locked in escrow", sub: "Rent + deposit held by a Soroban contract" },
  { icon: KeyRound, title: "Guest confirms check-in", sub: "Host can't touch funds before this" },
  { icon: Wallet, title: "Released to host", sub: "Deposit returned after check-out" },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function BookingShowcase() {
  const [selectedId, setSelectedId] = useState(LISTINGS[0].id);
  const [nights, setNights] = useState(3);
  const [stage, setStage] = useState<Stage>(0);
  const [running, setRunning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set(["jardin-heredia"]));
  const timers = useRef<number[]>([]);
  const summaryRef = useRef<HTMLElement>(null);

  const listing = LISTINGS.find((l) => l.id === selectedId) ?? LISTINGS[0];
  const rent = listing.nightly * nights;
  const deposit = listing.nightly * 2;
  const total = rent + deposit;

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const resetFlow = () => {
    clearTimers();
    setRunning(false);
    setStage(0);
  };

  const select = (id: string, scrollToSummary = false) => {
    if (id !== selectedId) {
      setSelectedId(id);
      resetFlow();
      setShowMessage(false);
    }
    if (scrollToSummary && window.matchMedia("(max-width: 1023px)").matches) {
      summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const changeNights = (delta: number) => {
    setNights((n) => Math.min(14, Math.max(1, n + delta)));
    resetFlow();
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const book = () => {
    if (running) return;
    if (stage === 3) {
      resetFlow();
      return;
    }
    clearTimers();
    setRunning(true);
    setStage(0);
    ([1, 2, 3] as Stage[]).forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setStage(s);
          if (s === 3) setRunning(false);
        }, 900 + i * 1300),
      );
    });
  };

  const bookLabel = running
    ? stage === 0
      ? "Locking funds…"
      : "Escrow in progress…"
    : stage === 3
      ? "Booked · try another stay"
      : "Book with Escrow";

  return (
    <div className="bwe-layout">
      <div className="bwe-listings" role="list" aria-label="Example stays">
        {LISTINGS.map((l) => {
          const KindIcon = KIND_ICON[l.kind];
          const isSelected = l.id === selectedId;
          const isFav = favorites.has(l.id);
          return (
            <article
              key={l.id}
              role="listitem"
              className={`bwe-card glass-card${isSelected ? " is-selected" : ""}`}
              onClick={() => select(l.id)}
            >
              <div className="bwe-card-media">
                <img src={l.image} alt={`${l.kind} – ${l.title}`} loading="lazy" width={720} height={480} />
                <span className="bwe-kind">
                  <KindIcon size={13} aria-hidden="true" />
                  {l.kind}
                </span>
                {l.promoted && (
                  <span className="bwe-promoted">
                    <Flame size={13} aria-hidden="true" />
                    Promoted
                  </span>
                )}
              </div>

              <div className="bwe-card-body">
                <div className="bwe-card-price-row">
                  <p className="bwe-price">
                    {usd(l.nightly)} <span>/ night</span>
                  </p>
                  <button
                    type="button"
                    className={`bwe-fav${isFav ? " is-on" : ""}`}
                    aria-pressed={isFav}
                    aria-label={isFav ? `Remove ${l.title} from favorites` : `Save ${l.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(l.id);
                    }}
                  >
                    <Heart size={18} />
                  </button>
                </div>

                <h3 className="bwe-title">{l.title}</h3>
                <p className="bwe-address">
                  <MapPin size={13} aria-hidden="true" />
                  {l.address}
                </p>

                <ul className="bwe-amenities">
                  <li>
                    <BedDouble size={14} aria-hidden="true" /> {l.beds} bd.
                  </li>
                  <li>
                    <Bath size={14} aria-hidden="true" /> {l.baths} ba.
                  </li>
                  <li>
                    {l.extra.icon === "pool" ? (
                      <Waves size={14} aria-hidden="true" />
                    ) : (
                      <PawPrint size={14} aria-hidden="true" />
                    )}{" "}
                    {l.extra.label}
                  </li>
                  <li className="bwe-rating">
                    <Star size={13} aria-hidden="true" /> {l.rating}
                  </li>
                </ul>

                <button
                  type="button"
                  className="bwe-btn bwe-btn--primary bwe-card-book"
                  aria-pressed={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    select(l.id, true);
                  }}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 size={16} aria-hidden="true" /> Selected
                    </>
                  ) : (
                    "Book"
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <aside className="bwe-summary-shell" ref={summaryRef} aria-live="polite">
        <GlassSurface
          className="bwe-summary-glass"
          width="100%"
          height="auto"
          borderRadius={20}
          backgroundOpacity={0.45}
          brightness={55}
          opacity={0.9}
          blur={10}
          displace={0.4}
          distortionScale={-120}
          saturation={1.4}
        >
        <div className="bwe-summary">
        <div className="bwe-summary-head">
          <img src={listing.image} alt="" aria-hidden="true" />
          <div>
            <p className="bwe-summary-kind">{listing.kind}</p>
            <p className="bwe-summary-title">{listing.title}</p>
          </div>
        </div>

        <p className="bwe-summary-price">
          {usd(listing.nightly)} <span>/ night</span>
        </p>

        <div className="bwe-nights">
          <span>Nights</span>
          <div className="bwe-stepper">
            <button type="button" aria-label="Fewer nights" onClick={() => changeNights(-1)} disabled={nights <= 1 || running}>
              <Minus size={14} />
            </button>
            <output aria-label="Nights">{nights}</output>
            <button type="button" aria-label="More nights" onClick={() => changeNights(1)} disabled={nights >= 14 || running}>
              <Plus size={14} />
            </button>
          </div>
        </div>

        <dl className="bwe-lines">
          <div>
            <dt>
              {usd(listing.nightly)} × {nights} night{nights > 1 ? "s" : ""}
            </dt>
            <dd>{usd(rent)}</dd>
          </div>
          <div>
            <dt>Security deposit</dt>
            <dd>{usd(deposit)}</dd>
          </div>
          <div>
            <dt>Smart escrow protection</dt>
            <dd className="bwe-included">Included</dd>
          </div>
          <div className="bwe-total">
            <dt>Locked in escrow</dt>
            <dd>{usd(total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          className={`bwe-btn bwe-btn--primary bwe-btn--block${running ? " is-running" : ""}${stage === 3 ? " is-done" : ""}`}
          onClick={book}
          disabled={running}
        >
          {stage === 3 ? <CheckCircle2 size={17} aria-hidden="true" /> : <ShieldCheck size={17} aria-hidden="true" />}
          {bookLabel}
        </button>

        <button
          type="button"
          className="bwe-btn bwe-btn--outline bwe-btn--block"
          aria-expanded={showMessage}
          onClick={() => setShowMessage((v) => !v)}
        >
          <MessageCircle size={16} aria-hidden="true" />
          Message host
        </button>

        {showMessage && (
          <p className="bwe-note">
            Chat with the host inside the SafeTrust app. Your money stays in escrow while you talk. Nothing
            is paid until you both confirm.
          </p>
        )}

        <div className="bwe-flow" data-stage={stage}>
          <p className="bwe-flow-label">Escrow status</p>
          <ol>
            {STAGES.map((s, i) => {
              const state = stage > i ? "done" : running && stage === i ? "active" : "idle";
              const Icon = state === "done" ? CheckCircle2 : s.icon;
              return (
                <li key={s.title} className={`bwe-flow-step is-${state}`}>
                  <span className="bwe-flow-icon">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <div>
                    <p>{s.title}</p>
                    <span>
                      {i === 2 && stage === 3
                        ? `Host receives ${usd(rent)} · ${usd(deposit)} back to you`
                        : s.sub}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        </div>
        </GlassSurface>
      </aside>
    </div>
  );
}
