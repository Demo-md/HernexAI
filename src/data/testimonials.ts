export type Testimonial = {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  businessName?: string;
  quote: string;
  rating: 5;
  source: "Google Review";
  sourceImage?: string;
  serviceType: string;
  featured: boolean;
  displayOrder: number;
};

// Review wording below is supplied by the client. Source screenshots are not
// currently available in the repository, so sourceImage remains undefined.
export const testimonials: Testimonial[] = [
  {
    id: "namdev-koyale",
    reviewerName: "Namdev Koyale",
    reviewerInitials: "NK",
    businessName: "Design Elementz",
    quote: "Extremely happy with the social media management services provided by the team. Their creativity, consistency, and strategic approach have significantly improved our online presence and engagement. They understand brand perfectly and create high quality content that resonates with our audience. Communication is always prompt, and they continuously bring fresh ideas to help grow our business. Highly recommended for anyone looking for a reliable and results driven social media marketing company.",
    rating: 5 as const,
    source: "Google Review" as const,
    sourceImage: undefined,
    serviceType: "Social Media Management",
    featured: true,
    displayOrder: 1,
  },
  {
    id: "sandip-patil",
    reviewerName: "Sandip Patil",
    reviewerInitials: "SP",
    quote: "In one sentence: HerNex Team understand what the Customer wants and design the webpage so efficiently & professionally that it comes on the screen exactly as you have imagined...",
    rating: 5 as const,
    source: "Google Review" as const,
    sourceImage: undefined,
    serviceType: "Website Design and Development",
    featured: true,
    displayOrder: 2,
  },
  {
    id: "harish-dani",
    reviewerName: "Harish Dani",
    reviewerInitials: "HD",
    businessName: "Hex Solutions",
    quote: "The team at Hernex did an outstanding job with the digital marketing for Hex Solutions. Their strategic approach and dedication made a noticeable impact on our brand reach. Thank you to the entire team for the stellar support!",
    rating: 5 as const,
    source: "Google Review" as const,
    sourceImage: undefined,
    serviceType: "Digital Marketing",
    featured: true,
    displayOrder: 3,
  },
].sort((a, b) => a.displayOrder - b.displayOrder);
