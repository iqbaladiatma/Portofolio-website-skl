// Blog functionality for Iqbal Adiatma's Personal Journal
class BlogManager {
    constructor() {
        this.isAdmin = false;
        this.adminPassword = 'admin'; // Change this to a secure password
        this.currentPage = 1;
        this.entriesPerPage = 5;
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.editingEntryId = null;
        
        // Load entries from localStorage or use default
        this.entries = this.loadEntriesFromStorage() || [
            {
                id: 1,
                title: "Memulai Perjalanan Sebagai Developer",
                category: "teknologi",
                content: "Hari ini saya memutuskan untuk serius mendalami dunia programming. Perjalanan yang panjang dimulai dari langkah pertama ini. Saya mulai dengan mempelajari HTML, CSS, dan JavaScript. Setiap baris kode yang saya tulis adalah investasi untuk masa depan yang lebih baik.",
                tags: ["programming", "journey", "learning"],
                date: "2024-01-15",
                excerpt: "Perjalanan seribu mil dimulai dari langkah pertama...",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: 2,
                title: "Refleksi Kehidupan di Usia 25",
                category: "pemikiran",
                content: "Memasuki usia 25 tahun, banyak hal yang berubah dalam hidup saya. Perspektif tentang kehidupan, karir, dan hubungan mulai berbeda. Saya belajar bahwa hidup bukan tentang mencapai tujuan secepat mungkin, tetapi tentang menikmati prosesnya.",
                tags: ["reflection", "life", "growth"],
                date: "2024-02-10",
                excerpt: "Hidup adalah tentang perjalanan, bukan tujuan...",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: 3,
                title: "Petualangan ke Yogyakarta",
                category: "perjalanan",
                content: "Liburan ke Yogyakarta memberikan saya banyak inspirasi. Dari Malioboro yang ramai hingga ketenangan Candi Borobudur, setiap sudut kota ini menyimpan cerita. Saya belajar bahwa traveling bukan hanya tentang mengunjungi tempat baru, tetapi juga tentang menemukan diri sendiri.",
                tags: ["travel", "yogyakarta", "culture"],
                date: "2024-03-05",
                excerpt: "Setiap perjalanan adalah kesempatan untuk tumbuh...",
                image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: 4,
                title: "Belajar dari Kegagalan",
                category: "kehidupan",
                content: "Proyek pertama saya gagal total. Aplikasi yang saya buat tidak sesuai ekspektasi klien dan saya harus memulai dari awal. Namun, dari kegagalan ini saya belajar pentingnya komunikasi yang baik dan memahami kebutuhan pengguna dengan benar.",
                tags: ["failure", "learning", "growth"],
                date: "2024-03-20",
                excerpt: "Kegagalan adalah guru terbaik dalam hidup...",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: 5,
                title: "Menguasai React.js",
                category: "teknologi",
                content: "Setelah berbulan-bulan belajar, akhirnya saya mulai nyaman dengan React.js. Library ini benar-benar mengubah cara saya membangun aplikasi web. Konsep component-based development membuat kode lebih terorganisir dan mudah di-maintain.",
                tags: ["react", "javascript", "frontend"],
                date: "2024-04-12",
                excerpt: "React.js membuka dunia baru dalam pengembangan web...",
                image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            }
        ];
        
        this.init();
    }
    
    loadEntriesFromStorage() {
        const stored = localStorage.getItem('blogEntries');
        return stored ? JSON.parse(stored) : null;
    }
    
    saveEntriesToStorage() {
        localStorage.setItem('blogEntries', JSON.stringify(this.entries));
    }
    
    checkAdminStatus() {
        if (localStorage.getItem('isAdmin') === 'true') {
            this.isAdmin = true;
            document.getElementById('add-entry-btn').classList.remove('hidden');
            setTimeout(() => this.showAdminControls(), 100);
        }
    }
    
    init() {
        this.setupEventListeners();
        this.loadEntries();
        this.initializeAOS();
        this.setupNavbar();
        this.hideLoader();
        this.checkAdminStatus();
    }
    
    setupEventListeners() {
        // Admin login
        document.getElementById('admin-login-btn').addEventListener('click', () => {
            document.getElementById('admin-modal').classList.remove('hidden');
        });
        
        document.getElementById('close-admin-modal').addEventListener('click', () => {
            document.getElementById('admin-modal').classList.add('hidden');
        });
        
        document.getElementById('admin-login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAdminLogin();
        });
        
        // Entry management
        document.getElementById('add-entry-btn').addEventListener('click', () => {
            this.openEntryModal();
        });
        
        document.getElementById('close-entry-modal').addEventListener('click', () => {
            this.closeEntryModal();
        });
        
        document.getElementById('cancel-entry').addEventListener('click', () => {
            this.closeEntryModal();
        });
        
        document.getElementById('entry-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEntrySave();
        });
        
        // Filter and search
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.dataset.filter);
            });
        });
        
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.handleFilter(category);
                this.scrollToSection('journal-entries');
            });
        });
        
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // Load more
        document.getElementById('load-more-btn').addEventListener('click', () => {
            this.loadMoreEntries();
        });
    }
    
    handleAdminLogin() {
        const password = document.getElementById('admin-password').value;
        if (password === this.adminPassword) {
            this.isAdmin = true;
            localStorage.setItem('isAdmin', 'true');
            document.getElementById('admin-modal').classList.add('hidden');
            document.getElementById('add-entry-btn').classList.remove('hidden');
            this.showAdminControls();
            this.showNotification('Login berhasil! Selamat datang, Admin.', 'success');
        } else {
            this.showNotification('Password salah!', 'error');
        }
        document.getElementById('admin-password').value = '';
    }
    
    showAdminControls() {
        // Add edit and delete buttons to existing entries
        document.querySelectorAll('.journal-entry').forEach(entry => {
            if (!entry.querySelector('.admin-controls')) {
                const entryId = entry.dataset.entryId;
                const adminControls = document.createElement('div');
                adminControls.className = 'admin-controls flex gap-2 mt-4';
                adminControls.innerHTML = `
                    <button onclick="blogManager.editEntry(${entryId})" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300">
                        ✏️ Edit
                    </button>
                    <button onclick="blogManager.deleteEntry(${entryId})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300">
                        🗑️ Hapus
                    </button>
                `;
                entry.appendChild(adminControls);
            }
        });
    }
    
    openEntryModal(entry = null) {
        this.editingEntryId = entry ? entry.id : null;
        const modal = document.getElementById('entry-modal');
        const title = document.getElementById('entry-modal-title');
        
        if (entry) {
            title.textContent = 'Edit Entri';
            document.getElementById('entry-title').value = entry.title;
            document.getElementById('entry-category').value = entry.category;
            document.getElementById('entry-content').value = entry.content;
            document.getElementById('entry-tags').value = entry.tags.join(', ');
        } else {
            title.textContent = 'Tambah Entri Baru';
            document.getElementById('entry-form').reset();
        }
        
        modal.classList.remove('hidden');
    }
    
    closeEntryModal() {
        document.getElementById('entry-modal').classList.add('hidden');
        this.editingEntryId = null;
        document.getElementById('entry-form').reset();
    }
    
    handleEntrySave() {
        const title = document.getElementById('entry-title').value;
        const category = document.getElementById('entry-category').value;
        const content = document.getElementById('entry-content').value;
        const tags = document.getElementById('entry-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        const entry = {
            id: this.editingEntryId || Date.now(),
            title,
            category,
            content,
            tags,
            date: new Date().toISOString().split('T')[0],
            excerpt: content.substring(0, 100) + '...'
        };
        
        if (this.editingEntryId) {
            const index = this.entries.findIndex(e => e.id === this.editingEntryId);
            this.entries[index] = entry;
            this.showNotification('Entri berhasil diperbarui!', 'success');
        } else {
            this.entries.unshift(entry);
            this.showNotification('Entri baru berhasil ditambahkan!', 'success');
        }
        
        this.saveEntriesToStorage();
        this.closeEntryModal();
        this.loadEntries();
    }
    
    editEntry(id) {
        const entry = this.entries.find(e => e.id === id);
        if (entry) {
            this.openEntryModal(entry);
        }
    }
    
    deleteEntry(id) {
        if (confirm('Apakah Anda yakin ingin menghapus entri ini?')) {
            this.entries = this.entries.filter(e => e.id !== id);
            this.saveEntriesToStorage();
            this.loadEntries();
            this.showNotification('Entri berhasil dihapus!', 'success');
        }
    }
    
    handleFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-gray-200', 'text-gray-700');
            activeBtn.classList.add('active', 'bg-blue-600', 'text-white');
        }
        
        this.loadEntries();
    }
    
    handleSearch(query) {
        this.currentSearch = query.toLowerCase();
        this.currentPage = 1;
        this.loadEntries();
    }
    
    getFilteredEntries() {
        let filtered = this.entries;
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(entry => entry.category === this.currentFilter);
        }
        
        // Apply search filter
        if (this.currentSearch) {
            filtered = filtered.filter(entry => 
                entry.title.toLowerCase().includes(this.currentSearch) ||
                entry.content.toLowerCase().includes(this.currentSearch) ||
                entry.tags.some(tag => tag.toLowerCase().includes(this.currentSearch))
            );
        }
        
        return filtered;
    }
    
    loadEntries() {
        const container = document.getElementById('entries-container');
        const filtered = this.getFilteredEntries();
        const start = 0;
        const end = this.currentPage * this.entriesPerPage;
        const entries = filtered.slice(start, end);
        
        container.innerHTML = '';
        
        if (entries.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">Tidak ada entri ditemukan</h3>
                    <p class="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
                </div>
            `;
            return;
        }
        
        entries.forEach((entry, index) => {
            const entryElement = this.createEntryElement(entry, index);
            container.appendChild(entryElement);
        });
        
        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (end >= filtered.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        // Show admin controls if logged in
        if (this.isAdmin) {
            setTimeout(() => this.showAdminControls(), 100);
        }
    }
    
    createEntryElement(entry, index) {
        const categoryIcons = {
            pemikiran: '💭',
            perjalanan: '✈️',
            teknologi: '💻',
            kehidupan: '🌱'
        };
        
        const categoryColors = {
            pemikiran: 'bg-blue-100 text-blue-800',
            perjalanan: 'bg-green-100 text-green-800',
            teknologi: 'bg-orange-100 text-orange-800',
            kehidupan: 'bg-pink-100 text-pink-800'
        };
        
        const entryDiv = document.createElement('div');
        entryDiv.className = 'journal-entry bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group cursor-pointer';
        entryDiv.dataset.entryId = entry.id;
        entryDiv.setAttribute('data-aos', 'fade-up');
        entryDiv.setAttribute('data-aos-delay', (index * 100).toString());
        
        // Add click handler to entire card
        entryDiv.addEventListener('click', () => {
            this.readMore(entry.id);
        });
        
        entryDiv.innerHTML = `
            <!-- Article Image -->
            <div class="relative h-64 overflow-hidden">
                <img src="${entry.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}" 
                     alt="${entry.title}" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     onerror="this.src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'">
                
                <!-- Category Badge -->
                <div class="absolute top-4 left-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[entry.category]} backdrop-blur-sm bg-white/90">
                        ${categoryIcons[entry.category]} ${entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}
                    </span>
                </div>
                
                <!-- Date Badge -->
                <div class="absolute top-4 right-4">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black/50 text-white backdrop-blur-sm">
                        ${this.formatDate(entry.date)}
                    </span>
                </div>
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Article Content -->
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    ${entry.title}
                </h3>
                
                <p class="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    ${entry.excerpt}
                </p>
                
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                    ${entry.tags.slice(0, 3).map(tag => `
                        <span class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            #${tag}
                        </span>
                    `).join('')}
                    ${entry.tags.length > 3 ? `<span class="text-gray-500 text-xs">+${entry.tags.length - 3} lainnya</span>` : ''}
                </div>
                
                <!-- Read More Button -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>${this.getReadingTime(entry.content)} min baca</span>
                    </div>
                    
                    <button onclick="event.stopPropagation(); blogManager.readMore(${entry.id})" class="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 flex items-center space-x-1 group-hover:translate-x-1">
                        <span>Baca</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        return entryDiv;
    }
    
    readMore(id) {
        // Navigate to detail page
        window.location.href = `blog-detail.html?id=${id}`;
    }
    
    loadMoreEntries() {
        this.currentPage++;
        this.loadEntries();
    }
    
    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Asia/Jakarta'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }
    
    getReadingTime(content) {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / wordsPerMinute);
        return readingTime;
    }
    
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-blue-500 text-white'
        };
        
        notification.classList.add(...colors[type].split(' '));
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    setupNavbar() {
        const navbar = document.getElementById('navbar');
        const burger = document.getElementById('burger');
        const navLinks = document.querySelector('.nav-links');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }
    
    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }
    }
    
    hideLoader() {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 1000);
    }
}

// Scroll to section function (global)
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogManager = new BlogManager();
});
