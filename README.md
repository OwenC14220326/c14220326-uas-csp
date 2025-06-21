Diperlukan untuk melakukan beberapa command untuk aplikasi ini, dikarenakan saya menggunakan beberapa library dari radix.
Namun sudah dicantumkan semua dalam package-lock.json.

Sama pastikan port untuk json-server adalah 5000 (http://localhost:5000) karena sudah saya setting di lib/api.ts.
Begitu pula di context/AuthContext.tsx (http://localhost:5000/users)
Jadi ada port normal 3000 sama port json-server 5000.

Untuk autentikasi bisa bekerja jadi pengguna tidak bisa masuk halaman dashboard dengan langsung mengetikan localhost:3000/dashboard.
Jika demikian akan langsung diarahkan ke halaman sign in. Karena diperlukan sign in untuk mengakses halaman kedua role.

npm install lucide-react
npm install @radix-ui/react-accordion
npm install @radix-ui/react-alert-dialog
npm install class-variance-authority
npm install @radix-ui/react-aspect-ratio
npm install @radix-ui/react-avatar
npm install react-day-picker
npm install embla-carousel-react
npm install @radix-ui/react-checkbox
npm install cmdk
npm install @radix-ui/react-context-menu
npm install vaul
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-label
npm install react-hook-form
npm install @radix-ui/react-hover-card
npm install input-otp
npm install @radix-ui/react-menubar
npm install @radix-ui/react-navigation-menu
npm install @radix-ui/react-popover
npm install @radix-ui/react-progress
npm install @radix-ui/react-radio-group
npm install react-resizable-panels
npm install @radix-ui/react-scroll-area
npm install @radix-ui/react-select
npm install @radix-ui/react-separator
npm install @radix-ui/react-slider
npm install next-themes
npm install sonner
npm install @radix-ui/react-switch
npm install @radix-ui/react-tabs
npm install @radix-ui/react-toast
npm install @radix-ui/react-toggle-group
npm install @radix-ui/react-tooltip
npm install clsx tailwind-merge
