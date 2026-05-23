import { ItemProps } from "@/components/MovieCard";

export const SERIES_DATA = {
    id: "gilani",
    title: "Gilani Series",
    tagline: "The Spiritual Journey of Sultan al-Awliya",
    description:
        "An epic historical and spiritual drama depicting the profound life, teachings, and timeless legacy of Sheikh Abdul Qadir Gilani. Follow his journey from the quiet landscapes of Jilan to the bustling academic hubs of Baghdad.",
    coverPoster:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    thumbnailPoster:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    rating: "9.8",
    quality: "4K ULTRA HD",
    releaseDate: "2025",
    genres: ["Historical", "Spiritual", "Biography"],
    totalEpisodes: 24,
    episodes: Array.from({ length: 24 }, (_, index) => ({
        id: `gilani-ep-${index + 1}`,
        title: `Episode ${index + 1}: The Awakening`,
        description: `Sheikh Abdul Qadir's profound realization and deep spiritual struggles in chapter ${index + 1}.`,
        poster:
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
        quality: "4K",
        rating: (9.5 + Math.random() * 0.4).toFixed(1),
        releaseDate: `May ${1 + index}, 2025`,
    })) as ItemProps[],
};



export interface Episode {
  id: string;
  title: string;
  description: string;
  episodeNumber: number;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  releaseDate: Date;
  views: number;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  poster: string;
  banner: string;
  rating: number;
  genre: string[];
  country: string;
  language: string;
  cast: string[];
  episodes: Episode[];
}

export const DEMO_SERIES: Series[] = [
  {
    id: "1",
    title: "আল-কুরআনের গল্প",
    description:
      "কুরআনের প্রতিটি সূরার অনন্য বার্তা এবং শিক্ষা সহজভাবে উপস্থাপন করা হয়েছে।",
    poster:
      "https://images.unsplash.com/photo-1578926078328-123456789012?w=400",
    banner:
      "https://images.unsplash.com/photo-1578926078328-123456789012?w=1200",
    rating: 4.8,
    genre: ["Islamic", "Educational", "Quran"],
    country: "Bangladesh",
    language: "Bangla",
    cast: ["ইসলামিক স্কলার", "কুরআন বিশেষজ্ঞ"],
    episodes: [
      {
        id: "ep1",
        title: "সূরা ফাতিহা - পবিত্র পথের শুরু",
        description:
          "সূরা ফাতিহার অর্থ, উপদেশ এবং আধ্যাত্মিক তাৎপর্য। এই সূরা কুরআনের সূচনা এবং প্রতিটি নামাজের মূল অংশ।",
        episodeNumber: 1,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1606933248051-5ce1befce97f?w=300",
        duration: 1800,
        releaseDate: new Date("2024-01-15"),
        views: 5200,
      },
      {
        id: "ep2",
        title: "সূরা আল-বাকারা - সবচেয়ে দীর্ঘ সূরা",
        description:
          "সূরা আল-বাকারার মূল শিক্ষা এবং জীবনের প্রয়োগ। এই সূরায় রয়েছে আইন, নৈতিকতা এবং জীবন যাপনের নির্দেশনা।",
        episodeNumber: 2,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=300",
        duration: 2400,
        releaseDate: new Date("2024-01-22"),
        views: 4100,
      },
      {
        id: "ep3",
        title: "সূরা আলে-ইমরান - পরিবার এবং বিশ্বাস",
        description:
          "পরিবারের গুরুত্ব এবং ঈমানের শক্তি সম্পর্কে জানুন। মারিয়াম ও ঈসার গল্প এবং জীবনের প্রজ্ঞা।",
        episodeNumber: 3,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1565042666747-338fabc2f76e?w=300",
        duration: 2100,
        releaseDate: new Date("2024-01-29"),
        views: 3800,
      },
      {
        id: "ep4",
        title: "সূরা আন-নিসা - নারী এবং সমাজ",
        description:
          "নারীর অধিকার এবং সামাজিক দায়বদ্ধতা সম্পর্কে গভীর আলোচনা। ইসলামে নারীর মর্যাদা এবং ভূমিকা।",
        episodeNumber: 4,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerEscapes.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
        duration: 2300,
        releaseDate: new Date("2024-02-05"),
        views: 4500,
      },
      {
        id: "ep5",
        title: "সূরা আল-মায়েদা - খাদ্য এবং শরীয়াহ",
        description:
          "হালাল, হারাম এবং ইসলামিক আইন সম্পর্কে শিক্ষা। খাদ্য সংক্রান্ত নিয়ম এবং সামাজিক চুক্তি।",
        episodeNumber: 5,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerFun.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300",
        duration: 2000,
        releaseDate: new Date("2024-02-12"),
        views: 3600,
      },
    ],
  },
  {
    id: "2",
    title: "হাদীসের শিক্ষা",
    description:
      "সহীহ হাদীস থেকে শিখুন জীবনের প্রজ্ঞা এবং দিকনির্দেশনা।",
    poster:
      "https://images.unsplash.com/photo-1507842931343-583b46cbc68d?w=400",
    banner:
      "https://images.unsplash.com/photo-1507842931343-583b46cbc68d?w=1200",
    rating: 4.7,
    genre: ["Islamic", "Hadith", "Educational"],
    country: "Bangladesh",
    language: "Bangla",
    cast: ["হাদীস বিশেষজ্ঞ"],
    episodes: [
      {
        id: "hadith-1",
        title: "নিয়ত সম্পর্কে হাদীস",
        description: "নিয়তের গুরুত্ব এবং আমলের মূল ভিত্তি।",
        episodeNumber: 1,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1606933248051-5ce1befce97f?w=300",
        duration: 1500,
        releaseDate: new Date("2024-02-01"),
        views: 3400,
      },
      {
        id: "hadith-2",
        title: "পিতামাতার সেবা সম্পর্কে হাদীস",
        description: "পিতামাতার প্রতি সন্তানের দায়িত্ব এবং অধিকার।",
        episodeNumber: 2,
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=300",
        duration: 1800,
        releaseDate: new Date("2024-02-08"),
        views: 2900,
      },
    ],
  },
];