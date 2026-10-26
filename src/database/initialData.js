/**
 * Initial dataset for Onushilon Academy
 * Used by seed.js and initial store setup
 */

export const INITIAL_SETTINGS = {
  id: "general",
  phone: "+880 1700-000000",
  phone_href: "tel:+8801700000000",
  whatsapp_number: "+8801700000000",
  whatsapp_message: "Hello Onushilon Academy, I would like to know more about your courses.",
  email: "hello@onushilon.example",
  location: "Dhaka, Bangladesh",
  facebook_url: "https://facebook.com",
  youtube_url: "https://youtube.com",
  linkedin_url: "https://linkedin.com",
  instagram_url: "https://instagram.com",
  support_hours: "9 AM – 10 PM",
  logo_url: null,
  updated_at: new Date().toISOString()
};

export const INITIAL_COURSES = [
  {
    id: "robotic",
    title_en: "Robotics & STEM Automation",
    title_bn: "রোবোটিক্স ও স্টেম অটোমেশন",
    category_en: "Robotics & Tech",
    category_bn: "রোবোটিক্স ও প্রযুক্তি",
    duration_en: "4 months",
    duration_bn: "৪ মাস",
    level_en: "Hands-on Lab",
    level_bn: "হ্যান্ডস-অন ল্যাব",
    price: "৳5,500",
    discount_price: "৳4,800",
    image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/robotic_class1.webp",
    mentor_name: "Engr. Nayeem Siddique (Robotics Specialist)",
    schedule_en: "Fri & Sat • 4:00 PM",
    schedule_bn: "শুক্র ও শনি • বিকাল ৪:০০",
    seats_en: "6 seats left",
    seats_bn: "৬টি আসন বাকি",
    topics_en: [
      "Microcontroller Architecture & Arduino",
      "Sensor Integration & Motor Drivers",
      "Autonomous Line & Maze Following Bots",
      "Final Exhibition Hardware Capstone"
    ],
    topics_bn: [
      "মাইক্রোকন্ট্রোলার আর্কিটেকচার ও আরডুইনো",
      "সেন্সর ইন্টিগ্রেশন ও মোটর ড্রাইভার",
      "অটোনোমাস লাইন ও মেজ ফলোয়ার রোবট",
      "চূড়ান্ত এক্সিবিশন হার্ডওয়্যার ক্যাপস্টোন"
    ],
    description_en: "Master hands-on robotics, microcontroller programming, and circuit building from ground up.",
    description_bn: "বাস্তব অভিজ্ঞতাভিত্তিক রোবোটিক্স, প্রোগ্রামিং ও সার্কিট ডিজাইনিং শিখুন সরাসরি ল্যাবে।",
    is_active: true,
    display_order: 1
  },
  {
    id: "art",
    title_en: "Creative Arts & Painting Studio",
    title_bn: "চারুকলা ও পেইন্টিং স্টুডিও",
    category_en: "Arts & Sports",
    category_bn: "চারুকলা ও খেলাধুলা",
    duration_en: "3 months",
    duration_bn: "৩ মাস",
    level_en: "Studio sessions",
    level_bn: "স্টুডিও সেশন",
    price: "৳3,600",
    discount_price: "৳3,200",
    image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/art_class1.webp",
    mentor_name: "Shabnam Mustari (Fine Arts Master)",
    schedule_en: "Sun & Wed • 4:30 PM",
    schedule_bn: "রবি ও বুধ • বিকাল ৪:৩০",
    seats_en: "8 seats left",
    seats_bn: "৮টি আসন বাকি",
    topics_en: [
      "Graphite Shading & Perspective Rules",
      "Acrylic & Watercolor Color Theory",
      "Composition & Landscape Painting",
      "Annual Academy Exhibition Showcase"
    ],
    topics_bn: [
      "গ্রাফাইট শেডিং ও পার্সপেক্টিভ নিয়ম",
      "অ্যাক্রিলিক ও ওয়াটারকালার কালার থিওরি",
      "কম্পোজিশন ও ল্যান্ডস্কেপ পেইন্টিং",
      "বার্ষিক একাডেমি এক্সিবিশন শোকেস"
    ],
    description_en: "Explore your artistic imagination with structured painting and drawing techniques.",
    description_bn: "প্রফেশনাল শিল্পীদের নির্দেশনায় চারুকলা ও পেইন্টিংয়ে আপনার সৃজনশীলতাকে পূর্ণতা দিন।",
    is_active: true,
    display_order: 2
  },
  {
    id: "hsc",
    title_en: "HSC Physics & Chemistry",
    title_bn: "এইচএসসি পদার্থ ও রসায়ন",
    category_en: "Academic",
    category_bn: "একাডেমিক",
    duration_en: "6 months",
    duration_bn: "৬ মাস",
    level_en: "Live + recorded",
    level_bn: "লাইভ + রেকর্ড",
    price: "৳4,500",
    discount_price: "৳4,000",
    image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/classroom2.webp",
    mentor_name: "Engr. Tanvir Ahmed (BUET)",
    schedule_en: "Sun, Tue & Thu • 8:00 PM",
    schedule_bn: "রবি, মঙ্গল ও বৃহস্পতি • রাত ৮:০০",
    seats_en: "14 seats left",
    seats_bn: "১৪টি আসন বাকি",
    topics_en: [
      "Kinematics & Dynamics",
      "Thermodynamics & Waves",
      "Periodic Properties & Bonding",
      "Board Question Solve & Mock Exams"
    ],
    topics_bn: [
      "গতিবিদ্যা ও নিউটনিয়ান বলবিদ্যা",
      "তাপগতিবিদ্যা ও তরঙ্গ",
      "পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন",
      "বোর্ড প্রশ্ন সমাধান ও মক টেস্ট"
    ],
    description_en: "Complete concept mastery and board exam question solving with top engineering mentors.",
    description_bn: "বুয়েটিয়ান মেন্টরদের সাথে পদার্থ ও রসায়নের কঠিন কনসেপ্টগুলোর সহজ ও গভীর সমাধান।",
    is_active: true,
    display_order: 3
  },
  {
    id: "webdev",
    title_en: "Web Development & Coding",
    title_bn: "ওয়েব ডেভেলপমেন্ট ও কোডিং",
    category_en: "Skills",
    category_bn: "স্কিলস",
    duration_en: "5 months",
    duration_bn: "৫ মাস",
    level_en: "Project-based",
    level_bn: "প্রজেক্ট ভিত্তিক",
    price: "৳6,000",
    discount_price: "৳5,200",
    image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/computer_learning.webp",
    mentor_name: "Asif Zaman (Full Stack Lead)",
    schedule_en: "Mon & Thu • 7:30 PM",
    schedule_bn: "সোম ও বৃহস্পতি • সন্ধ্যা ৭:৩০",
    seats_en: "10 seats left",
    seats_bn: "১০টি আসন বাকি",
    topics_en: [
      "HTML5, Modern CSS & Tailwind",
      "JavaScript ES6+ & Async Patterns",
      "React.js & State Management",
      "Node.js Backend & Supabase Database"
    ],
    topics_bn: [
      "এইচটিএমএল৫, আধুনিক সিএসএস ও টেলউইন্ড",
      "জাভাস্ক্রিপ্ট ইএস৬+ ও অ্যাসিনক্রোনাস প্রোগ্রামিং",
      "রিয়্যাক্ট.জেএস ও স্টেট ম্যানেজমেন্ট",
      "নোড.জেএস ব্যাকএন্ড ও সুপাবেস ডাটাবেজ"
    ],
    description_en: "Build modern, responsive full-stack applications with industry best practices.",
    description_bn: "বাস্তব প্রজেক্ট তৈরির মাধ্যমে আধুনিক ওয়েব ডেভেলপমেন্ট ও ব্যাকএন্ড ডেভেলপমেন্ট শিখুন।",
    is_active: true,
    display_order: 4
  },
  {
    id: "spoken",
    title_en: "Interactive Spoken English",
    title_bn: "ইন্টারঅ্যাক্টিভ স্পোকেন ইংলিশ",
    category_en: "Language",
    category_bn: "ভাষা",
    duration_en: "2.5 months",
    duration_bn: "২.৫ মাস",
    level_en: "Daily practice sessions",
    level_bn: "প্রতিদিনের প্র্যাকটিস সেশন",
    price: "৳2,800",
    discount_price: "৳2,500",
    image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/learn_with_fun.webp",
    mentor_name: "Sadia Rahman (IELTS 8.5)",
    schedule_en: "Sat, Mon & Wed • 6:30 PM",
    schedule_bn: "শনি, সোম ও বুধ • সন্ধ্যা ৬:৩০",
    seats_en: "12 seats left",
    seats_bn: "১২টি আসন বাকি",
    topics_en: [
      "Fluency Building & Pronunciation Drills",
      "Everyday Conversational Scenarios",
      "Public Speaking & Presentation Skills",
      "Interview Readiness & Debating"
    ],
    topics_bn: [
      "কথা বলার সাবলীলতা ও উচ্চারণ অনুশীলন",
      "দৈনন্দিন কথোপকথনের পরিস্থিতি",
      "পাবলিক স্পিকিং ও প্রেজেন্টেশন স্কিল",
      "ইন্টারভিউ প্রস্তুতি ও বিতর্ক"
    ],
    description_en: "Gain confidence and overcome stage fright through fun, conversational practice.",
    description_bn: "ভয় কাটিয়ে সবার সামনে আত্মবিশ্বাসের সাথে সাবলীলভাবে ইংরেজিতে কথা বলা শিখুন।",
    is_active: true,
    display_order: 5
  },
  {
    id: "karate",
    title_en: "Karate & Martial Arts Academy",
    title_bn: "কারাতে ও মার্শাল আর্ট একাডেমি",
    category_en: "Arts & Sports",
    category_bn: "চারুকলা ও খেলাধুলা",
    duration_en: "6 months",
    duration_bn: "৬ মাস",
    level_en: "Physical dojo",
    level_bn: "ফিজিক্যাল ডোজো",
    price: "৳3,500",
    discount_price: "৳3,000",
    image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/karate_class1.webp",
    mentor_name: "Sensei Farhan Chowdhury (Black Belt 3rd Dan)",
    schedule_en: "Fri & Sat • 8:00 AM",
    schedule_bn: "শুক্র ও শনি • সকাল ৮:০০",
    seats_en: "5 seats left",
    seats_bn: "৫টি আসন বাকি",
    topics_en: [
      "Physical Conditioning & Core Strength",
      "Basic Stances, Blocks & Punches (Kihon)",
      "Kata Forms & Precision",
      "Self-Defense Techniques & Sparring"
    ],
    topics_bn: [
      "শারীরিক সক্ষমতা ও কোর স্ট্রেন্থ",
      "মৌলিক অবস্থান, ব্লক ও পাঞ্চ (কিহন)",
      "কাতা ফর্ম ও নিখুঁত টেকনিক",
      "আত্মরক্ষা কৌশল ও স্পারিং"
    ],
    description_en: "Build physical discipline, mental resilience, and certified martial arts mastery.",
    description_bn: "শরীরচর্চা, মানসিক একাগ্রতা এবং আত্মরক্ষার কৌশল শিখুন অভিজ্ঞ ব্ল্যাক বেল্ট ট্রেনারের কাছে।",
    is_active: true,
    display_order: 6
  }
];

export const INITIAL_SECTIONS = [
  {
    section_id: "hero",
    name: "Hero Section",
    data_en: {
      headline_words: ["Learn", "by", "practice."],
      headline_scale: 100,
      subtitle_scale: 100,
      subtitle: "Onushilon Academy gives you expert mentors, live interactive classes and daily exercises, from SSC to job-ready tech skills.",
      primary_cta_text: "Browse courses",
      secondary_cta_text: "Explore class moments",
      call_now_text: "📞 Call now"
    },
    data_bn: {
      headline_words: ["চর্চায়", "শিখি,", "অনুশীলনে।"],
      headline_scale: 100,
      subtitle_scale: 100,
      subtitle: "অনলাইন ও অফলাইনে অভিজ্ঞ মেন্টরদের নিবিড় দিকনির্দেশনা, সরাসরি ইন্টারঅ্যাক্টিভ ক্লাস এবং প্রতিদিনের অনুশীলনের মাধ্যমে নিজেকে গড়ে তুলুন।",
      primary_cta_text: "কোর্সসমূহ দেখুন",
      secondary_cta_text: "ক্লাসের মুহূর্ত দেখুন",
      call_now_text: "📞 কল করুন"
    },
    media: {
      floating_cards: [
        { src: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/robotic_class1.webp", title: "Robotics & Microcontroller STEM", badge: "🤖 Robotics Lab" },
        { src: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/art_class1.webp", title: "Creative Art & Canvas Drawing", badge: "🎨 Art Studio" },
        { src: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/classroom1.webp", title: "Interactive Concept Lecture", badge: "📚 Smart Classroom" },
        { src: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/karate_class1.webp", title: "Physical Dojo & Martial Arts", badge: "🥋 Karate Dojo" }
      ]
    }
  },
  {
    section_id: "story",
    name: "Our Story Section",
    data_en: {
      heading: "Onushilon means practice. We took it literally.",
      lead: "We started because lectures alone never made anyone truly confident. Every course here is built around doing the work, getting detailed mentor feedback, and mastering the concept.",
      timeline: [
        { year: "2014", text: "Five students, one rented room, and a rule: every lesson ends with practice." },
        { year: "2018", text: "We opened a second branch and began recording every class for revision." },
        { year: "2022", text: "Onushilon went online. Students from 40 districts joined live." },
        { year: "Today", text: "Over 12,000 learners practise with us every week." }
      ]
    },
    data_bn: {
      heading: "অনুশীলন মানেই চর্চা। আমরা একে বাস্তবে রূপ দিয়েছি।",
      lead: "শুধু লেকচার শুনে কেউ কোনো বিষয়ে দক্ষ হতে পারে না। আমাদের প্রতিটি কোর্স সাজানো হয়েছে কাজ করার মাধ্যমে শেখা, মেন্টরের নিবিড় মূল্যায়ন এবং মূল বিষয়বস্তু গভীরভাবে আয়ত্ত করার ওপর ভিত্তি করে।",
      timeline: [
        { year: "২০১৪", text: "পাঁচজন শিক্ষার্থী, একটি ভাড়া করা কক্ষ এবং একটিই মূলমন্ত্র: প্রতিটি ক্লাসের শেষেই নিয়মিত অনুশীলন।" },
        { year: "২০১৮", text: "দ্বিতীয় শাখার যাত্রা এবং ক্লাসের পর রিভিশন নিশ্চিত করতে প্রতিটি সেশনের রেকর্ডিং শুরু।" },
        { year: "২০২২", text: "অনুশীলন অনলাইন প্ল্যাটফর্মে রূপান্তরিত হয়। দেশের ৪০টিরও বেশি জেলা থেকে শিক্ষার্থীরা অংশ নেয়।" },
        { year: "বর্তমান", text: "প্রতি সপ্তাহে ১২,০০০-এর বেশি শিক্ষার্থী আমাদের সাথে নিয়মিত চর্চায় অংশ নিচ্ছে।" }
      ]
    },
    media: {
      image_story: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/classroom1.webp",
      image_story2: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/project_building.webp"
    }
  },
  {
    section_id: "why",
    name: "Why Us Section",
    data_en: {
      kicker: "The Onushilon Difference",
      heading: "Why learning here feels different",
      lead: "We replaced three-hour passive monologues with short interactive concept modules, immediate hands-on practice, and direct feedback from experienced mentors.",
      features: [
        { title: "Daily Practice Sets", desc: "Short, targeted tasks after every class to lock in concepts before you move on." },
        { title: "Personal Mentor Feedback", desc: "Never get stuck on an error. Mentors review your calculations and code step-by-step." },
        { title: "Learn at your pace", desc: "Every live class is recorded in HD and posted with notes, formula sheets, and practice sets." },
        { title: "Exams that feel real", desc: "Monthly timed mock tests under board/exam conditions, with comprehensive score breakdowns." }
      ]
    },
    data_bn: {
      kicker: "অনুশীলনের অনন্য বৈশিষ্ট্য",
      heading: "আমাদের এখানে শেখার অভিজ্ঞতা কেন অন্যরকম",
      lead: "একটানা দীর্ঘ লেকচারের পরিবর্তে আমরা নিয়ে এসেছি ইন্টারঅ্যাক্টিভ কনসেপ্ট সেশন, তাৎক্ষণিক প্র্যাকটিস এবং অভিজ্ঞ মেন্টরদের নিবিড় তত্ত্বাবধান।",
      features: [
        { title: "প্রতিদিনের অনুশীলন সেট", desc: "প্রতিটি ক্লাসের পরেই বিশেষ প্র্যাকটিস টাস্ক, যা আপনার ধারণাকে মজবুত করবে।" },
        { title: "ব্যক্তিগত মেন্টর ফিডব্যাক", desc: "সমস্যায় আটকে থাকার ভয় নেই। মেন্টররা আপনার প্রতিটি ভুল শুধরে দেবেন ব্যক্তিগতভাবে।" },
        { title: "নিজের সুবিধামতো শেখা", desc: "প্রতিটি ক্লাসের এইচডি রেকর্ডিং, ক্লাস নোট ও প্র্যাকটিস শিট থাকছে আজীবন অ্যাক্সেসযোগ্য।" },
        { title: "বাস্তবসম্মত মক টেস্ট", desc: "বোর্ড ও স্ট্যান্ডার্ড পরীক্ষার আদলে নিয়মিত টাইমড মক টেস্ট এবং বিস্তারিত ফলাফল বিশ্লেষণ।" }
      ]
    },
    media: {}
  },
  {
    section_id: "voices",
    name: "Student Voices / Testimonials",
    data_en: {
      heading: "Students say it better",
      testimonials: [
        {
          quote: "The art mentors here don't just teach techniques; they helped me discover my own painting style. Seeing my artwork on exhibition was a dream come true!",
          name: "Tasnim Akter",
          role: "Creative Arts & Design graduate",
          image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/art_class3.webp"
        },
        {
          quote: "Building and programming an autonomous robot with my own hands was unforgettable. The robotics lab mentors guided us through every sensor and circuit.",
          name: "Sadman Sakib",
          role: "Robotics & STEM batch 2024",
          image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/robotic_class4.webp"
        },
        {
          quote: "Practice every single day finally made physics equations click for me. My mentor reviewed every step of my solution, not just the final number.",
          name: "Nusrat Jahan",
          role: "HSC Science achiever, Dhaka",
          image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/classroom2.webp"
        },
        {
          quote: "I was terrified of speaking English in public. The interactive fun sessions and 1-on-1 speaking drills completely transformed my fluency and confidence.",
          name: "Rafiul Islam",
          role: "Spoken English graduate",
          image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/learn_with_fun.webp"
        }
      ]
    },
    data_bn: {
      heading: "শিক্ষার্থীদের অভিজ্ঞতা",
      testimonials: [
        {
          quote: "এখানে আর্ট মেন্টররা শুধু কৌশল শেখান না; তারা আমার নিজস্ব চিত্রশৈলী খুঁজে পেতে সাহায্য করেছেন। এক্সিবিশনে আমার আঁকা ছবি দেখে নিজের স্বপ্ন পূরণ হয়েছে!",
          name: "তাসনিম আক্তার",
          role: "চারুকলা ও ডিজাইন ব্যাচ",
          image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/art_class3.webp"
        },
        {
          quote: "নিজের হাতে রোবট তৈরি করে প্রোগ্রামিং করা আমার জীবনের সবচেয়ে রোমাঞ্চকর অভিজ্ঞতা ছিল। ল্যাবের মেন্টররা প্রতিটি ধাপে আমাদের সাহায্য করেছেন।",
          name: "সাদমান সাকিব",
          role: "রোবোটিক্স ও স্টেম শিক্ষার্থী",
          image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/robotic_class4.webp"
        },
        {
          quote: "প্রতিদিনের নিয়মিত অনুশীলন আমাকে পদার্থবিজ্ঞানের কঠিন কনসেপ্টগুলো সহজে বুঝতে সাহায্য করেছে। মেন্টররা শুধু উত্তর নয়, সমাধানের প্রতিটি ধাপ বুঝিয়ে দিতেন।",
          name: "নুসরাত জাহান",
          role: "এইচএসসি বিজ্ঞান বিভাগ, ঢাকা",
          image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/classroom2.webp"
        },
        {
          quote: "ইংরেজিতে কথা বলতে আমার ভীষণ জড়তা কাজ করত। অনুশীলন একাডেমির ফ্রেন্ডলি সেশনগুলো আমার আত্মবিশ্বাস পুরোপুরি বদলে দিয়েছে।",
          name: "রাফিউল ইসলাম",
          role: "স্পোকেন ইংলিশ ব্যাচ",
          image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/learn_with_fun.webp"
        }
      ]
    },
    media: {}
  },
  {
    section_id: "faq",
    name: "FAQ Section",
    data_en: {
      heading: "Frequently asked questions",
      lead: "Got questions before enrolling? Here is everything you need to know about our batches, mentors, and policies.",
      items: [
        {
          q: "What happens if I miss a live class?",
          a: "Every live class is recorded in HD and posted on your student portal within 2 hours. You get lifetime access to all recordings and practice sets."
        },
        {
          q: "How does the 24-hour mentor feedback work?",
          a: "After each lesson, you solve and submit your practice task. Your assigned mentor reviews your steps and leaves detailed guidance within 24 hours."
        },
        {
          q: "What payment methods are accepted?",
          a: "We accept bKash, Nagad, Rocket, all major bank cards, and bank transfers. Convenient installments are available for long courses."
        },
        {
          q: "Will I receive a verified certificate upon completion?",
          a: "Yes! Students who submit at least 80% of practice tasks and pass the final mock exam receive a verified digital certificate."
        }
      ]
    },
    data_bn: {
      heading: "সাধারণ জিজ্ঞাসা",
      lead: "ভর্তি হওয়ার আগে কোনো প্রশ্ন আছে? আমাদের ব্যাচ, মেন্টর এবং কোর্স সংক্রান্ত প্রয়োজনীয় তথ্য জেনে নিন।",
      items: [
        {
          q: "কোনো লাইভ ক্লাস মিস হলে কী হবে?",
          a: "প্রতিটি লাইভ ক্লাস ২ ঘণ্টার মধ্যে ফুল এইচডি কোয়ালিটিতে রেকর্ডিং আকারে স্টুডেন্ট পোর্টালে যুক্ত হয়ে যায়। আপনি আজীবন এগুলোর অ্যাক্সেস পাবেন।"
        },
        {
          q: "২৪ ঘণ্টার মেন্টর ফিডব্যাক কীভাবে কাজ করে?",
          a: "প্রতিটি ক্লাসের পর অনুশীলন টাস্ক জমা দেওয়ার পর সংশ্লিষ্ট বিষয়ের মেন্টর আপনার প্রতিটি সমাধান পর্যবেক্ষণ করে অডিও ও লিখিত পরামর্শ প্রদান করেন।"
        },
        {
          q: "ভর্তির ফি কীভাবে পরিশোধ করা যাবে?",
          a: "বিকাশ, নগদ, রকেট, যেকোনো ডেবিট/ক্রেডিট কার্ড এবং ব্যাংক ট্রান্সফারের মাধ্যমে সহজেই ফি পরিশোধ করা যায়।"
        },
        {
          q: "কোর্স শেষে কি সার্টিফিকেট প্রদান করা হয়?",
          a: "হ্যাঁ! নিয়মিত অনুশীলন সম্পন্নকারী এবং চূড়ান্ত মূল্যায়নে উত্তীর্ণ শিক্ষার্থীদের ভেরিফায়েড ডিজিটাল সার্টিফিকেট প্রদান করা হয়।"
        }
      ]
    },
    media: {}
  },
  {
    section_id: "cta",
    name: "Call To Action Banner",
    data_en: {
      heading: "Your next batch starts this week",
      lead: "Reserve your seat now. A dedicated academic counsellor will connect with you to complete your batch onboarding.",
      submit_btn: "Confirm Seat Reservation →"
    },
    data_bn: {
      heading: "আপনার পছন্দের নতুন ব্যাচ শুরু হচ্ছে এ সপ্তাহেই",
      lead: "আজই আপনার আসন নিশ্চিত করুন। আমাদের অ্যাকাডেমিক কাউন্সেলর দ্রুত আপনার সাথে যোগাযোগ করে অনবোর্ডিং সম্পন্ন করবেন।",
      submit_btn: "আসন সংরক্ষণ নিশ্চিত করুন →"
    },
    media: {
      background_image: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/Fun_and_learning.webp"
    }
  }
];

export const INITIAL_MENTORS = [
  {
    id: "m-nayeem",
    name_en: "Engr. Nayeem Siddique",
    name_bn: "প্রকো. নাঈম সিদ্দিকী",
    designation_en: "Robotics & Automation Specialist",
    designation_bn: "রোবোটিক্স ও অটোমেশন বিশেষজ্ঞ",
    specialty_en: "Microcontrollers & Embedded IoT",
    specialty_bn: "মাইক্রোকন্ট্রোলার ও এমবেডেড আইওটি",
    category: "Robotics & Tech",
    avatar_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/robotic_class1.webp",
    display_order: 1,
    is_active: true
  },
  {
    id: "m-shabnam",
    name_en: "Shabnam Mustari",
    name_bn: "শবনম মুস্তারি",
    designation_en: "Fine Arts & Visual Expressionist",
    designation_bn: "চারুকলা ও ভিজ্যুয়াল এক্সপ্রেশনিস্ট",
    specialty_en: "Acrylics, Oil Painting & Drawing",
    specialty_bn: "অ্যাক্রিলিক, অয়েল পেইন্টিং ও ড্রয়িং",
    category: "Arts & Sports",
    avatar_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/art_class1.webp",
    display_order: 2,
    is_active: true
  },
  {
    id: "m-tanvir",
    name_en: "Engr. Tanvir Ahmed",
    name_bn: "প্রকো. তানভীর আহমেদ",
    designation_en: "Senior Physics Faculty (BUET)",
    designation_bn: "সিনিয়র পদার্থবিজ্ঞান প্রশিক্ষক (বুয়েট)",
    specialty_en: "HSC & Admission Physics",
    specialty_bn: "এইচএসসি ও ভর্তি প্রস্তুতি পদার্থবিজ্ঞান",
    category: "Academic",
    avatar_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/classroom2.webp",
    display_order: 3,
    is_active: true
  },
  {
    id: "m-sadia",
    name_en: "Sadia Rahman",
    name_bn: "সাদিয়া রহমান",
    designation_en: "Lead Language Coach (IELTS 8.5)",
    designation_bn: "প্রধান ভাষা প্রশিক্ষক (আইইএলটিএস ৮.৫)",
    specialty_en: "Interactive English & Phonetics",
    specialty_bn: "ইন্টারঅ্যাক্টিভ ইংলিশ ও ফোনেটিক্স",
    category: "Language",
    avatar_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/learn_with_fun.webp",
    display_order: 4,
    is_active: true
  }
];

export const INITIAL_MOMENTS = [
  { id: "m1", title_en: "Robotics Lab Hands-On", title_bn: "রোবোটিক্স ল্যাব অনুশীলন", badge_en: "🤖 Tech", badge_bn: "রোবোটিক্স", image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/robotic_class3.webp", category: "Robotics", display_order: 1 },
  { id: "m2", title_en: "Canvas Painting Studio", title_bn: "ক্যানভাস পেইন্টিং স্টুডিও", badge_en: "🎨 Fine Arts", badge_bn: "চারুকলা", image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/art_class4.webp", category: "Arts", display_order: 2 },
  { id: "m3", title_en: "Interactive Concept Lecture", title_bn: "ইন্টারঅ্যাক্টিভ লেকচার সেশন", badge_en: "📚 Academic", badge_bn: "একাডেমিক", image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/classroom1.webp", category: "Classroom", display_order: 3 },
  { id: "m4", title_en: "Karate Dojo Practice", title_bn: "কারাতে ডোজো অনুশীলন", badge_en: "🥋 Sports", badge_bn: "খেলাধুলা", image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/karate_class1.webp", category: "Sports", display_order: 4 },
  { id: "m5", title_en: "Computer Lab Coding", title_bn: "কম্পিউটার ল্যাব কোডিং", badge_en: "💻 Skills", badge_bn: "স্কিলস", image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/computer_learning.webp", category: "Tech", display_order: 5 },
  { id: "m6", title_en: "Hardware & Circuit Fixing", title_bn: "হার্ডওয়্যার ও সার্কিট ল্যাব", badge_en: "⚙️ Electronics", badge_bn: "ইলেকট্রনিক্স", image_url: "https://okhqtcykqdkivxsghyrv.supabase.co/storage/v1/object/public/onushilon/photos/harware_fix_learning.webp", category: "Electronics", display_order: 6 }
];
