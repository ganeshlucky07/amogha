import { SHOP_INFO } from "../data";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: SHOP_INFO.name,
    description: "Best pure ghee sweets, fresh bakery items, pizzas, burgers, snacks, Hyderabadi Osmania biscuits, pastries and cakes",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jodimetla, Pocharam",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.4065",
      longitude: "78.5589",
    },
    url: "https://amogha-sweets.vercel.app",
    telephone: SHOP_INFO.phoneNumber,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "23:00",
    },
    priceRange: "₹",
    servesCuisine: ["Indian Sweets", "Bakery", "Fast Food"],
    image: "https://amogha-sweets.vercel.app/logo.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
