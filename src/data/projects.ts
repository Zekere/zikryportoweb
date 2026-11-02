
export type PortfolioCategory =
  | "web"
  | "mobile"
  | "graphic";

export type LocalizedText = {
  id: string;
  en: string;
};

export type ProjectStatus =
  | "completed"
  | "development"
  | "maintenance"
  | "planned"
  | "coursework";


export type ProjectScreenshot = {
  src: string;
  caption: LocalizedText;
};

export type PortfolioProject = {
  id: string;
  category: PortfolioCategory;
  title: LocalizedText;
  description: LocalizedText;
  status?: ProjectStatus;

  // Gambar thumbnail kartu
  image: string;

  technologies: string[];
  githubUrl?: string;

  // false = tombol Preview dinonaktifkan sementara
  previewEnabled?: boolean;

  // Penjelasan lengkap di dalam popup
  details?: LocalizedText;

  // Screenshot dan penjelasannya
  screenshots?: ProjectScreenshot[];

  // Tetap mendukung data galeri lama
  galleryImages?: string[];
};

// =====================================================
// PORTFOLIO PROJECTS
// =====================================================

export const projects: PortfolioProject[] = [
  // ===================================================
  // 01. SISTEM ABSENSI PEGAWAI
  // ===================================================
  {
    id: "absensi",
    category: "web",
    status:"completed",

    title: {
      id: "Sistem Absensi Pegawai",
      en: "Employee Attendance System",
    },

    description: {
      id: "Aplikasi presensi dengan geolocation dan verifikasi wajah.",
      en: "Attendance app with geolocation and facial verification.",
    },

    details: {
      id: "Sistem informasi absensi pegawai berbasis web yang dikembangkan menggunakan Laravel dan MySQL. Sistem ini mendukung proses presensi menggunakan lokasi pengguna dan verifikasi wajah untuk membantu pencatatan kehadiran pegawai.",
      en: "A web-based employee attendance system developed with Laravel and MySQL. It supports attendance recording using user location and facial verification.",
    },

    image: "/images/projects/absensi-web.webp",

    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "Geolocation",
    ],

    githubUrl:
      "https://github.com/Zekere/absen_magang.git",

    screenshots: [
      {
        src: "/images/projects/absensi-web.webp",
        caption: {
          id: "Tampilan utama sistem informasi absensi pegawai.",
          en: "Main interface of the employee attendance system.",
        },
      },

      // Tambahkan screenshot setelah file tersedia:
      
      {
        src: "/images/projects/absensi-login.webp",
        caption: {
          id: "Halaman login pengguna untuk mengakses sistem.",
          en: "User login page for accessing the system.",
        },
      },
      //
      // {
      //   src: "/images/projects/absensi-presensi.webp",
      //   caption: {
      //     id: "Halaman presensi dengan foto dan pengecekan lokasi.",
      //     en: "Attendance page with photo and location verification.",
      //   },
      // },
    ],
  },

  // ===================================================
  // 02. Sistem Monitoring Barang
  // ===================================================
  {
    id: "monitoring-barang",
    category: "web",
    status:"completed",

    title: {
      id: "Monitoring Barang Kantor",
      en: "Inventory Management System",
    },

    description: {
      id: "Aplikasi website untuk mengelola barang dan pelengkapan kantor kantor.",
      en: "Website application for inventory management and warehouse management.",
    },

    details: {
      id: "Sistem monitoring barang berbasis web yang dikembangkan menggunakan Laravel dan MySQL. Sistem ini mendukung proses pendataan serta pengecekan barang kondisi barang untuk memudahkan pengelolaan kantor.",
      en: "A web-based inventory management system developed with Laravel and MySQL. It supports inventory tracking and barcode scanning to streamline warehouse management.",
    },

    image: "/images/projects/1.webp",

    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "JavaScript",
      "Basis Data",
    ],

    githubUrl:
      "https://github.com/Zekere/monitoring_perlengkapan_ruang.git",

    // PREVIEW IMAGES

    screenshots: [
      {
        src: "/images/projects/1.webp",
        caption: {
          id: "Halaman utama yang menampilkan ringkasan informasi dan statistik terkait pengelolaan serta monitoring barang di lingkungan PUPR.",
          en: "Main page that displays an overview of management and inventory information and statistics in the PUPR environment.",
        },
      },

      // Tambahkan screenshot setelah file tersedia:
      
      {
        src: "/images/projects/2.webp",
        caption: {
          id: "Halaman login pengguna untuk mengakses sistem.",
          en: "User login page for accessing the system.",
        },
      },
      
      {
        src: "/images/projects/3.webp",
        caption: {
          id: "Halaman data barang yang menampilkan daftar inventaris beserta informasi terkait untuk memudahkan pengguna dalam mencari dan memantau barang.",
          en: "Inventory page displaying a list of goods and related information to help users search for and monitor inventory items.",
        },
     },

     {
        src: "/images/projects/4.webp",
        caption: {
          id: "Halaman tambah barang yang digunakan untuk memasukkan data inventaris baru ke dalam sistem agar pencatatan barang lebih terstruktur.",
          en: "Add goods page used to enter new inventory records into the system for more structured inventory management.",
        },
      },

     {
        src: "/images/projects/5.webp",
        caption: {
          id: "Halaman detail barang yang menyajikan informasi inventaris secara lengkap sehingga pengguna dapat memeriksa data barang yang telah tercatat.",
          en: "Goods detail page providing comprehensive inventory information so users can review existing item records.",
        },
      },

     {
        src: "/images/projects/6.webp",
        caption: {
          id: "Halaman edit barang yang memungkinkan pengguna memperbarui informasi inventaris apabila terdapat perubahan atau ketidaksesuaian data.",
          en: "Edit goods page that allows users to update inventory information when changes or data discrepancies occur.",
        },
      },

     {
          src: "/images/projects/7.webp",
          caption: {
            id: "Halaman pengecekan barang yang digunakan untuk memantau hasil pemeriksaan dan mengetahui kondisi inventaris sebagai bagian dari proses pengawasan barang.",
            en: "Goods inspection page used to monitor inspection results and review inventory conditions as part of the goods supervision process.",
          },
        },

     {
        src: "/images/projects/8.webp",
    caption: {
      id: "Halaman tambah pengecekan yang digunakan untuk mencatat hasil pemeriksaan barang beserta kondisi dan keterangan pendukung sebagai dokumentasi monitoring.",
      en: "Add inspection page used to record inspection results, item conditions, and supporting notes for monitoring documentation.",
    },
  },
  {
    src: "/images/projects/9.webp",
    caption: {
      id: "Halaman detail pengecekan yang menampilkan catatan pemeriksaan secara terperinci untuk membantu pengguna meninjau kondisi barang dan hasil monitoring.",
      en: "Inspection detail page displaying detailed inspection records to help users review item conditions and monitoring results.",
    },
  },
  {
    src: "/images/projects/10.webp",
    caption: {
      id: "Halaman laporan barang yang menyajikan rekapitulasi data inventaris sebagai bahan pendukung pemantauan, evaluasi, dan pelaporan pengelolaan barang.",
      en: "Goods report page presenting inventory summaries to support monitoring, evaluation, and inventory management reporting.",
    },
  },
  {
    src: "/images/projects/11.webp",
    caption: {
      id: "Halaman manajemen pengguna yang digunakan untuk mengelola data akun dan mengatur akses pengguna dalam sistem monitoring barang PUPR.",
      en: "User management page used to manage account records and control user access within the PUPR inventory monitoring system.",
    },
  },
  
    ],
  },

  // ===================================================
  // 03. ECHOARENA
  // ===================================================
  {
    id: "EchoArena",
    category: "web",
    status:"completed",

    title: {
      id: "EchoArena",
      en: "EchoArena",
    },

    description: {
      id: "Website Quiz via suara,yang dimana para pemain akan menjawab pertanyaan yang disediakan lalu menjawabnya dengan suara,bukan asal klik.",
      en: "A voice-based quiz website where players answer the provided questions by speaking their responses, rather than simply clicking on an option..",
    },

    details: {
      id: "Website Game Quiz yang disusun mengunakan Next.JS,Tailwind dengan database Supabase dan SpeechAPI untuk menampilkan pertanyaan dan menjawab dengan suara.",
      en: "A quiz game website built using Next.js and Tailwind, featuring a Supabase database and the Speech API to present questions and allow for voice-based answers.",
    },

    image: "/images/projects/landingpageecho.webp",

    technologies: [
      "Next.js",
      "Javascript",
      "Supabase",
      "Tailwind",
      "Speech API",
    ],

    githubUrl:
      "https://github.com/iam-allend/EchoArena.git",

    screenshots: [
      {
        src: "/images/projects/landingpageecho.webp",
        caption: {
          id: "Tampilan utama antarmuka sistem peserta EchoArena.",
          en: "Main interface of the EchoArena system.",
        },
      },

      // Tambahkan screenshot setelah file tersedia:
      
      {
        src: "/images/projects/loginecho.webp",
        caption: {
          id: "Halaman login pengguna untuk mengakses permainan EchoArena.",
          en: "User login page for accessing the EchoArena game.",
        },
      },

      {
          src: "/images/projects/dashboardusere.webp",
          caption: {
            id: "Halaman dashboard pengguna untuk mengakses informasi akun EchoArena.",
            en: "User dashboard page for accessing account information.",
          },
        },

        {
        src: "/images/projects/buatroom.webp",
        caption: {
          id: "Halaman room untuk menjadi mastergame house EchoArena dengan beberapa pilihan dan informasi.",
          en: "Room page to become a master game house with various options and information.",
        },
      },

      {
        src: "/images/projects/lobbypermainan.webp",
        caption: {
          id: "Halaman lobby permainan yang dapat diakses menggunakan token dari pemilik room",
          en: "Game lobby page that can be accessed using the token from the owner room",
        },
      },

      {
        src: "/images/projects/roompermainan.webp",
        caption: {
          id: "Halaman permainan quiz,yang dimana diwajibkan menjawab menggunakan suara dan saling bergantian untuk menjawab,JADILAH YANG TERBAIK!.",
          en: "Quiz game page where the answer is required to be spoken and the other player must respond in turn, YOU WIN!.",
        },
      },
    ],
  },

  // ===================================================
  // 04. LapakSiswa
  // ===================================================
  {
    id: "LapakSiswa",
    category: "web",

    title: {
      id: "Lapak Siswa",
      en: "Lapak Siswa",
    },

    description: {
      id: "Aplikasi E-Commerce penjualan barang kerajinan hasil karya tangan anak sekolah.",
      en: "E-Commerce store for selling products made from the blood of students in the school.",
    },

    details: {
      id: "Sistem informasi absensi pegawai berbasis web yang dikembangkan menggunakan Laravel dan MySQL. Sistem ini mendukung proses presensi menggunakan lokasi pengguna dan verifikasi wajah untuk membantu pencatatan kehadiran pegawai.",
      en: "A web-based employee attendance system developed with Laravel and MySQL. It supports attendance recording using user location and facial verification.",
    },

    image: "/images/projects/lapaksiswa.webp",

    technologies: [
      "CodeIgniter 4",
      "PHP",
      "MySQL",
      "JavaScript",
      "Bootstrap",
    ],

    githubUrl:
      "https://github.com/iam-allend/Lapak-Siswa.git",

    screenshots: [
      {
        src: "/images/projects/lapaksiswa.webp",
        caption: {
          id: "Tampilan utama dari website E-Commerce Lapak Siswa.",
          en: "Main interface of the E-Commerce Lapak Siswa website.",
        },
      },

      // Tambahkan screenshot setelah file tersedia:
      
      {
        src: "/images/projects/produklapak.webp",
        caption: {
          id: "Halaman penjualan produk kerajinan tangan yang dibuat oleh anak sekolah.",
          en: "c:\Users\ACER\Pictures\Screenshots\Screenshot 2026-10-27 000734.png",
        },
      },
      //
      // {
      //   src: "/images/projects/absensi-presensi.webp",
      //   caption: {
      //     id: "Halaman presensi dengan foto dan pengecekan lokasi.",
      //     en: "Attendance page with photo and location verification.",
      //   },
      // },
    ],
  },

  // ===================================================
  // Bookparty
  // ===================================================
  {
    id: "Bookparty",
    category: "web",
    status:"development",

    title: {
      id: "PBUN BOOK PARTY",
      en: "PBUN BOOK PARTY",
    },

    description: {
      id: "Website komunitas buku di Kota PangkalanBun,untuk saling mengenal dan saling meminjam buku.",
      en: "A book community website in Pangkalan Bun City, designed for members to get to know one another and borrow books from each other..",
    },

    details: {
      id: "Website yang dikembangkan menggunakan Next.JS dengan supabase,yang membantu pada komunitas buku di daerah untuk saling meminjamkan buku sesama pembaca buku.",
      en: "A website developed using Next.js and Supabase, designed to help local book communities facilitate the lending and borrowing of books among readers.",
    },

    image: "/images/projects/landingpage.webp",

    technologies: [
      "Next.js",
      "Supabase",
      "Vercel",
      "JavaScript",
    ],

    githubUrl:
      "https://github.com/Zekere/Komunitas-Buku.git",

    screenshots: [
      {
        src: "/images/projects/landingpage.webp",
        caption: {
          id: "Tampilan utama dari web komunitas buku.",
          en: "Main view of the book community website.",
        },
      },

      // Tambahkan screenshot setelah file tersedia:
      
      {
        src: "/images/projects/tentangbook.webp",
        caption: {
          id: "Tampilan utama dari web komunitas buku.",
          en: "Main view of the book community website.",
        },
      },

       {
        src: "/images/projects/loginbook.webp",
        caption: {
          id: "Tampilan untuk para pembaca melakukan login,baik sebagai anggota atau penyedia buku.",
          en: "An interface for readers to log in, either as members or as book providers.",
        },
      },
      //
      // {
      //   src: "/images/projects/absensi-presensi.webp",
      //   caption: {
      //     id: "Halaman presensi dengan foto dan pengecekan lokasi.",
      //     en: "Attendance page with photo and location verification.",
      //   },
      // },
    ],
  },

  // ===================================================
  // 02. LAPAK SISWA MOBILE
  // ===================================================
  {
    id: "Lapak Siswa Mobile",
    previewEnabled: false, // Preview belum dipublikasikan
    category: "mobile",
    status:"coursework",

    title: {
      id: "Lapak Siswa Mobile",
      en: "Lapak Siswa Android App",
    },

    description: {
      id: "Aplikasi dan pengembangan dari versi website berisikan katalog, keranjang, dan integrasi API.",
      en: "Application and development based on the website version, featuring a catalog, shopping cart, and API integration.",
    },

    details: {
      id: "Aplikasi E-Commerce berbasis Android yang dikembangkan menggunakan Flutter. Aplikasi ini menyediakan katalog produk, pencarian barang, keranjang belanja, dan komunikasi dengan backend Supabase.",
      en: "An Android-based e-commerce application developed using Flutter. The app features a product catalog, item search, a shopping cart, and communication with a Supabase backend.",
    },

    image: "/images/projects/mobilelapak.webp",

    technologies: [
      "Flutter",
      "Tailwind",
      "Supabase",
    ],

    // Isi jika repository NextToys sudah tersedia
    githubUrl: "",

    screenshots: [
      {
        src: "/images/projects/mobilelapak.webp",
        caption: {
          id: "Tampilan utama aplikasi toko mainan NextToys.",
          en: "Main interface of the NextToys application.",
        },
      },

      // Tambahkan screenshot berikut jika tersedia:
      //
      // {
      //   src: "/images/projects/nexttoys-katalog.webp",
      //   caption: {
      //     id: "Halaman katalog produk mainan.",
      //     en: "Toy product catalog page.",
      //   },
      // },
      //
      // {
      //   src: "/images/projects/nexttoys-keranjang.webp",
      //   caption: {
      //     id: "Halaman keranjang belanja.",
      //     en: "Shopping cart page.",
      //   },
      // },
    ],
  },

   {
    id: "nexttoys",
    previewEnabled: false, // Preview belum dipublikasikan
    category: "mobile",
    status:"coursework",

    title: {
      id: "Aplikasi Toko Mainan",
      en: "Toy Store Android App",
    },

    description: {
      id: "Aplikasi katalog, keranjang, dan integrasi API.",
      en: "Product catalog, cart, and API integration.",
    },

    details: {
      id: "Aplikasi toko mainan berbasis Android yang dikembangkan menggunakan Java. Aplikasi ini menyediakan katalog produk, pencarian barang, keranjang belanja, dan komunikasi dengan backend PHP melalui REST API.",
      en: "An Android toy store application developed with Java. It includes a product catalog, product search, shopping cart, and PHP backend integration through a REST API.",
    },

    image: "/images/projects/nexttoys-mobile.webp",

    technologies: [
      "Android Java",
      "PHP",
      "MySQL",
      "Retrofit",
    ],

    // Isi jika repository NextToys sudah tersedia
    githubUrl: "",

    screenshots: [
      {
        src: "/images/projects/nexttoys-mobile.webp",
        caption: {
          id: "Tampilan utama aplikasi toko mainan NextToys.",
          en: "Main interface of the NextToys application.",
        },
      },

      // Tambahkan screenshot berikut jika tersedia:
      //
      // {
      //   src: "/images/projects/nexttoys-katalog.webp",
      //   caption: {
      //     id: "Halaman katalog produk mainan.",
      //     en: "Toy product catalog page.",
      //   },
      // },
      //
      // {
      //   src: "/images/projects/nexttoys-keranjang.webp",
      //   caption: {
      //     id: "Halaman keranjang belanja.",
      //     en: "Shopping cart page.",
      //   },
      // },
    ],
  },
];
