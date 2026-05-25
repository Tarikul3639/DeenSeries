import HomePage from "./components/HomePage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "DeenSeries - Watch Islamic Series and Movies Online",
  description:
    "Watch Islamic series and movies on DeenSeries. Explore stories of Salahuddin, Ertugrul, and Islamic history in a clean, modern platform.",
  path: "/",
  image: "/og-homepage.png",
  keywords: [
    "watch Islamic series",
    "Islamic streaming platform",
    "Islamic movies online",
    "Ertugrul series",
    "Salahuddin Ayyubi series",
  ],
  ogDescription:
    "Stream high-quality Islamic series and movies including Ertugrul, Salahuddin, and more.",
});

export default function Page() {
  return <HomePage />;
}
