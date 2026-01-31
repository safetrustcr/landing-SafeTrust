export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  quote: string;
  rating: number;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Property Owner",
    company: "Mitchell Real Estate",
    avatar: "/avatars/sarah.jpg",
    quote:
      "SafeTrust transformed how I handle security deposits. The blockchain-based escrow gives both me and my tenants complete peace of mind. No more disputes or uncertainty!",
    rating: 5,
    date: "Jan 2025",
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    role: "Tenant",
    avatar: "/avatars/carlos.jpg",
    quote:
      "As a renter, I always worried about getting my deposit back. With SafeTrust, the process is transparent and automated. I got my full deposit returned within 24 hours of moving out.",
    rating: 5,
    date: "Dec 2024",
  },
  {
    id: "3",
    name: "Emma Thompson",
    role: "Freelance Designer",
    company: "Creative Studios",
    avatar: "/avatars/emma.jpg",
    quote:
      "I use SafeTrust for all my freelance contracts now. The escrow system protects both parties, and clients love the professionalism it adds to our agreements.",
    rating: 5,
    date: "Jan 2025",
  },
  {
    id: "4",
    name: "Michael Chen",
    role: "Small Business Owner",
    company: "Chen Electronics",
    avatar: "/avatars/michael.jpg",
    quote:
      "We handle dozens of B2B transactions monthly. SafeTrust has reduced our payment disputes by 95% and saved countless hours in administrative work.",
    rating: 5,
    date: "Nov 2024",
  },
  {
    id: "5",
    name: "Aisha Patel",
    role: "Property Manager",
    company: "Urban Living Properties",
    avatar: "/avatars/aisha.jpg",
    quote:
      "Managing 50+ rental units means handling a lot of deposits. SafeTrust streamlined everything - from collection to return. My tenants appreciate the transparency.",
    rating: 4,
    date: "Dec 2024",
  },
  {
    id: "6",
    name: "James Wilson",
    role: "Software Developer",
    avatar: "/avatars/james.jpg",
    quote:
      "The smart contract technology behind SafeTrust is impressive. As a developer, I appreciate the security measures. As a user, I love how simple it makes transactions.",
    rating: 5,
    date: "Jan 2025",
  },
  {
    id: "7",
    name: "Lisa Nakamura",
    role: "Airbnb Host",
    company: "Sakura Stays",
    avatar: "/avatars/lisa.jpg",
    quote:
      "Short-term rentals require quick deposit handling. SafeTrust automates the entire process, letting me focus on providing great guest experiences instead of chasing payments.",
    rating: 5,
    date: "Oct 2024",
  },
  {
    id: "8",
    name: "David Okonkwo",
    role: "Real Estate Agent",
    company: "Premier Realty",
    avatar: "/avatars/david.jpg",
    quote:
      "I recommend SafeTrust to all my clients. It builds trust between buyers and sellers, and the transparent escrow process has helped close deals faster.",
    rating: 4,
    date: "Nov 2024",
  },
  {
    id: "9",
    name: "Sophie Laurent",
    role: "E-commerce Seller",
    company: "Vintage Finds",
    avatar: "/avatars/sophie.jpg",
    quote:
      "High-value vintage items need secure transactions. SafeTrust protects both me and my buyers, reducing fraud concerns and boosting customer confidence.",
    rating: 5,
    date: "Dec 2024",
  },
  {
    id: "10",
    name: "Marcus Johnson",
    role: "Contractor",
    company: "Johnson Construction",
    avatar: "/avatars/marcus.jpg",
    quote:
      "Client trust is everything in construction. SafeTrust's milestone-based escrow lets clients pay with confidence, and I get paid on time. Win-win for everyone.",
    rating: 5,
    date: "Jan 2025",
  },
];

export default testimonials;
