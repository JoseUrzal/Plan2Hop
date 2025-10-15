import Header from "../components/Header.jsx";
import ContactCard from "../components/cards/ContactCard.jsx";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 px-4 md:px-0">
      <Header />
      <ContactCard />
    </div>
  );
}
