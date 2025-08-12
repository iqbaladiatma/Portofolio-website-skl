// Blog Detail functionality for Iqbal Adiatma's Personal Journal
class BlogDetailManager {
    constructor() {
        this.isAdmin = false;
        this.adminPassword = 'admin';
        this.currentArticleId = null;
        this.entries = this.loadEntriesFromStorage();
        
        this.init();
    }
    
    init() {
        this.currentArticleId = this.getArticleIdFromURL();
        this.setupEventListeners();
        this.loadArticle();
        this.initializeAOS();
        this.setupNavbar();
        this.hideLoader();
        this.checkAdminStatus();
    }
    
    loadEntriesFromStorage() {
        // Load from localStorage or use default entries
        const stored = localStorage.getItem('blogEntries');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Default entries if none stored
        return [
            {
                id: 1,
                title: "Memulai Perjalanan Sebagai Developer",
                category: "teknologi",
                content: "Hari ini saya memutuskan untuk serius mendalami dunia programming. Perjalanan yang panjang dimulai dari langkah pertama ini. Saya mulai dengan mempelajari HTML, CSS, dan JavaScript. Setiap baris kode yang saya tulis adalah investasi untuk masa depan yang lebih baik.\n\nMenjalani hari-hari sebagai seorang pemula dalam dunia programming tidaklah mudah. Banyak konsep yang harus dipahami, syntax yang harus dihapal, dan logika yang harus diasah. Namun, setiap tantangan yang saya hadapi membuat saya semakin termotivasi untuk terus belajar.\n\nSaya ingat ketika pertama kali berhasil membuat website sederhana dengan HTML dan CSS. Perasaan bangga dan puas yang luar biasa memenuhi hati. Itulah momen ketika saya yakin bahwa programming adalah passion saya.\n\nSekarang, setelah beberapa bulan belajar, saya mulai memahami JavaScript dan berbagai framework modern. Perjalanan ini masih panjang, tetapi saya yakin dengan konsistensi dan dedikasi, saya akan mencapai tujuan menjadi seorang full-stack developer yang handal.",
                tags: ["programming", "journey", "learning"],
                date: "2024-01-15",
                excerpt: "Perjalanan seribu mil dimulai dari langkah pertama..."
            },
            {
                id: 2,
                title: "Refleksi Kehidupan di Usia 25",
                category: "pemikiran",
                content: "Memasuki usia 25 tahun, banyak hal yang berubah dalam hidup saya. Perspektif tentang kehidupan, karir, dan hubungan mulai berbeda. Saya belajar bahwa hidup bukan tentang mencapai tujuan secepat mungkin, tetapi tentang menikmati prosesnya.\n\nDi usia ini, saya mulai memahami pentingnya keseimbangan hidup. Tidak hanya fokus pada karir, tetapi juga kesehatan mental, hubungan dengan keluarga dan teman, serta pengembangan diri secara holistik.\n\nSaya juga belajar untuk lebih menghargai waktu. Setiap detik yang berlalu tidak akan pernah kembali, oleh karena itu penting untuk menggunakan waktu dengan bijak. Bukan berarti harus produktif setiap saat, tetapi memastikan bahwa apa yang kita lakukan memberikan makna.\n\nRefleksi ini mengajarkan saya untuk lebih bersyukur dengan apa yang sudah saya miliki, sambil terus berusaha menjadi versi terbaik dari diri saya.",
                tags: ["reflection", "life", "growth"],
                date: "2024-02-10",
                excerpt: "Hidup adalah tentang perjalanan, bukan tujuan..."
            },
            {
                id: 3,
                title: "Petualangan ke Yogyakarta",
                category: "perjalanan",
                content: "Liburan ke Yogyakarta memberikan saya banyak inspirasi. Dari Malioboro yang ramai hingga ketenangan Candi Borobudur, setiap sudut kota ini menyimpan cerita. Saya belajar bahwa traveling bukan hanya tentang mengunjungi tempat baru, tetapi juga tentang menemukan diri sendiri.\n\nPagi hari di Borobudur memberikan pengalaman spiritual yang mendalam. Melihat matahari terbit dari balik candi sambil merasakan angin pagi yang sejuk, membuat saya merenungkan betapa kecilnya kita di hadapan alam semesta.\n\nBerjalan-jalan di Malioboro di malam hari juga memberikan pengalaman yang berbeda. Hiruk pikuk pedagang, aroma gudeg yang menggoda, dan kehangatan masyarakat Yogya membuat saya merasa seperti di rumah sendiri.\n\nPerjalanan ini mengajarkan saya untuk lebih menghargai keberagaman budaya Indonesia dan pentingnya melestarikan warisan leluhur kita.",
                tags: ["travel", "yogyakarta", "culture"],
                date: "2024-03-05",
                excerpt: "Setiap perjalanan adalah kesempatan untuk tumbuh..."
            },
            {
                id: 4,
                title: "Belajar dari Kegagalan",
                category: "kehidupan",
                content: "Proyek pertama saya gagal total. Aplikasi yang saya buat tidak sesuai ekspektasi klien dan saya harus memulai dari awal. Namun, dari kegagalan ini saya belajar pentingnya komunikasi yang baik dan memahami kebutuhan pengguna dengan benar.\n\nKegagalan ini awalnya membuat saya down dan mempertanyakan kemampuan diri sendiri. Apakah saya benar-benar cocok menjadi seorang developer? Apakah saya memiliki skill yang cukup?\n\nNamun, setelah merenung dan mendapat dukungan dari mentor dan teman-teman, saya menyadari bahwa kegagalan adalah bagian dari proses belajar. Tidak ada developer yang tidak pernah gagal. Yang penting adalah bagaimana kita bangkit dan belajar dari kegagalan tersebut.\n\nDari pengalaman ini, saya belajar untuk selalu melakukan requirement gathering yang detail, membuat prototype sebelum development, dan melakukan testing yang menyeluruh. Kegagalan ini justru membuat saya menjadi developer yang lebih baik.",
                tags: ["failure", "learning", "growth"],
                date: "2024-03-20",
                excerpt: "Kegagalan adalah guru terbaik dalam hidup..."
            },
            {
                id: 5,
                title: "Menguasai React.js",
                category: "teknologi",
                content: "Setelah berbulan-bulan belajar, akhirnya saya mulai nyaman dengan React.js. Library ini benar-benar mengubah cara saya membangun aplikasi web. Konsep component-based development membuat kode lebih terorganisir dan mudah di-maintain.\n\nAwalnya, konsep JSX terasa aneh bagi saya. Mencampur HTML dengan JavaScript dalam satu file? Tapi setelah memahami filosofi di baliknya, saya menyadari betapa powerful-nya pendekatan ini.\n\nHooks juga menjadi game-changer. useState, useEffect, dan custom hooks membuat functional component menjadi sangat powerful. Saya tidak perlu lagi menggunakan class component untuk state management yang kompleks.\n\nSekarang saya sedang mempelajari Next.js untuk server-side rendering dan static site generation. Ekosistem React yang luas membuat saya semakin excited untuk terus belajar dan mengembangkan skill saya.",
                tags: ["react", "javascript", "frontend"],
                date: "2024-04-12",
                excerpt: "React.js membuka dunia baru dalam pengembangan web..."
            }
        ];
    }
    
    saveEntriesToStorage() {
        localStorage.setItem('blogEntries', JSON.stringify(this.entries));
    }
    
    getArticleIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')) || 1;
    }
    
    setupEventListeners() {
        // Admin login
        const adminLoginBtn = document.createElement('button');
        adminLoginBtn.innerHTML = '🔐 Admin';
        adminLoginBtn.className = 'fixed top-20 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 z-40';
        adminLoginBtn.addEventListener('click', () => {
            document.getElementById('admin-modal').classList.remove('hidden');
        });
        document.body.appendChild(adminLoginBtn);
        
        document.getElementById('close-admin-modal').addEventListener('click', () => {
            document.getElementById('admin-modal').classList.add('hidden');
        });
        
        document.getElementById('admin-login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAdminLogin();
        });
        
        // Article management
        document.getElementById('edit-article-btn').addEventListener('click', () => {
            this.openEditModal();
        });
        
        document.getElementById('delete-article-btn').addEventListener('click', () => {
            this.deleteArticle();
        });
        
        // Entry modal
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
    }
    
    handleAdminLogin() {
        const password = document.getElementById('admin-password').value;
        if (password === this.adminPassword) {
            this.isAdmin = true;
            localStorage.setItem('isAdmin', 'true');
            document.getElementById('admin-modal').classList.add('hidden');
            document.getElementById('admin-controls').classList.remove('hidden');
            this.showNotification('Login berhasil! Panel admin aktif.', 'success');
        } else {
            this.showNotification('Password salah!', 'error');
        }
        document.getElementById('admin-password').value = '';
    }
    
    checkAdminStatus() {
        if (localStorage.getItem('isAdmin') === 'true') {
            this.isAdmin = true;
            document.getElementById('admin-controls').classList.remove('hidden');
        }
    }
    
    loadArticle() {
        const article = this.entries.find(entry => entry.id === this.currentArticleId);
        
        if (!article) {
            document.getElementById('article-title').textContent = 'Artikel tidak ditemukan';
            document.getElementById('article-content').textContent = 'Artikel yang Anda cari tidak dapat ditemukan.';
            return;
        }
        
        // Update page title
        document.getElementById('page-title').textContent = `${article.title} - Iqbal Adiatma`;
        
        // Update article content
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-content').textContent = article.content;
        document.getElementById('article-date').textContent = this.formatDate(article.date);
        
        // Update article image
        const articleImage = document.getElementById('article-image');
        const articleImageContainer = document.getElementById('article-image-container');
        if (article.image) {
            articleImage.src = article.image;
            articleImage.alt = article.title;
            articleImageContainer.style.display = 'block';
        } else {
            // Use default image if no image is provided
            articleImage.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
            articleImage.alt = article.title;
            articleImageContainer.style.display = 'block';
        }
        
        // Update category
        const categoryColors = {
            pemikiran: 'bg-blue-100 text-blue-800',
            perjalanan: 'bg-green-100 text-green-800',
            teknologi: 'bg-orange-100 text-orange-800',
            kehidupan: 'bg-pink-100 text-pink-800'
        };
        
        const categoryIcons = {
            pemikiran: '💭',
            perjalanan: '✈️',
            teknologi: '💻',
            kehidupan: '🌱'
        };
        
        const categoryElement = document.getElementById('article-category');
        categoryElement.className = `inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${categoryColors[article.category]}`;
        categoryElement.textContent = `${categoryIcons[article.category]} ${article.category.charAt(0).toUpperCase() + article.category.slice(1)}`;
        
        // Update tags
        const tagsContainer = document.getElementById('article-tags');
        tagsContainer.innerHTML = article.tags.map(tag => 
            `<span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">#${tag}</span>`
        ).join('');
        
        this.loadRelatedArticles(article);
        this.initializeComments();
    }
    
    loadRelatedArticles(currentArticle) {
        const related = this.entries
            .filter(entry => entry.id !== currentArticle.id && entry.category === currentArticle.category)
            .slice(0, 2);
        
        const container = document.getElementById('related-articles');
        
        if (related.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center col-span-2">Tidak ada artikel terkait.</p>';
            return;
        }
        
        container.innerHTML = related.map(article => `
            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer" onclick="window.location.href='blog-detail.html?id=${article.id}'">
                <div class="p-6">
                    <div class="flex items-center space-x-2 mb-3">
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            ${article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                        </span>
                        <span class="text-gray-500 text-sm">${this.formatDate(article.date)}</span>
                    </div>
                    
                    <h4 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        ${article.title}
                    </h4>
                    
                    <p class="text-gray-600 text-sm leading-relaxed">
                        ${article.excerpt}
                    </p>
                    
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex flex-wrap gap-1">
                            ${article.tags.slice(0, 2).map(tag => 
                                `<span class="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">#${tag}</span>`
                            ).join('')}
                        </div>
                        
                        <span class="text-blue-600 font-medium text-sm group-hover:text-blue-800 transition-colors duration-300">
                            Baca →
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    setupNavigation(currentArticle) {
        const currentIndex = this.entries.findIndex(entry => entry.id === currentArticle.id);
        const prevArticle = this.entries[currentIndex + 1];
        const nextArticle = this.entries[currentIndex - 1];
        
        if (prevArticle) {
            const prevContainer = document.getElementById('prev-article');
            prevContainer.classList.remove('hidden');
            prevContainer.innerHTML = `
                <a href="blog-detail.html?id=${prevArticle.id}" class="group flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    <div>
                        <p class="text-sm text-gray-500">Artikel Sebelumnya</p>
                        <p class="font-medium">${prevArticle.title}</p>
                    </div>
                </a>
            `;
        }
        
        if (nextArticle) {
            const nextContainer = document.getElementById('next-article');
            nextContainer.classList.remove('hidden');
            nextContainer.innerHTML = `
                <a href="blog-detail.html?id=${nextArticle.id}" class="group flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <div class="text-right">
                        <p class="text-sm text-gray-500">Artikel Selanjutnya</p>
                        <p class="font-medium">${nextArticle.title}</p>
                    </div>
                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </a>
            `;
        }
    }
    
    openEditModal() {
        const article = this.entries.find(entry => entry.id === this.currentArticleId);
        if (!article) return;
        
        document.getElementById('entry-title').value = article.title;
        document.getElementById('entry-category').value = article.category;
        document.getElementById('entry-content').value = article.content;
        document.getElementById('entry-tags').value = article.tags.join(', ');
        
        document.getElementById('entry-modal').classList.remove('hidden');
    }
    
    closeEntryModal() {
        document.getElementById('entry-modal').classList.add('hidden');
        document.getElementById('entry-form').reset();
    }
    
    handleEntrySave() {
        const title = document.getElementById('entry-title').value;
        const category = document.getElementById('entry-category').value;
        const content = document.getElementById('entry-content').value;
        const tags = document.getElementById('entry-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        const articleIndex = this.entries.findIndex(entry => entry.id === this.currentArticleId);
        if (articleIndex !== -1) {
            this.entries[articleIndex] = {
                ...this.entries[articleIndex],
                title,
                category,
                content,
                tags,
                excerpt: content.substring(0, 100) + '...'
            };
            
            this.saveEntriesToStorage();
            this.closeEntryModal();
            this.loadArticle(); // Reload the article with updated content
            this.showNotification('Artikel berhasil diperbarui!', 'success');
        }
    }
    
    deleteArticle() {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.')) {
            this.entries = this.entries.filter(entry => entry.id !== this.currentArticleId);
            this.saveEntriesToStorage();
            this.showNotification('Artikel berhasil dihapus!', 'success');
            
            setTimeout(() => {
                window.location.href = 'blog.html';
            }, 1500);
        }
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

    initializeComments() {
        const commentForm = document.getElementById('comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitComment();
            });
        }
    }

    submitComment() {
        const name = document.getElementById('comment-name').value;
        const email = document.getElementById('comment-email').value;
        const message = document.getElementById('comment-message').value;

        if (!name || !email || !message) {
            alert('Mohon lengkapi semua field!');
            return;
        }

        // Create new comment object
        const newComment = {
            id: Date.now(),
            articleId: this.currentArticleId,
            name: name,
            email: email,
            message: message,
            date: new Date().toISOString(),
            likes: 0
        };

        // Save comment to localStorage
        this.saveComment(newComment);

        // Add comment to UI
        this.addCommentToUI(newComment);

        // Clear form
        document.getElementById('comment-form').reset();

        // Show success message
        this.showNotification('Komentar berhasil ditambahkan!', 'success');
    }

    saveComment(comment) {
        let comments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
        comments.unshift(comment); // Add to beginning of array
        localStorage.setItem('blog_comments', JSON.stringify(comments));
    }

    addCommentToUI(comment) {
        const commentsList = document.getElementById('comments-list');
        const initials = comment.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const colors = ['from-blue-500 to-purple-500', 'from-green-500 to-teal-500', 'from-pink-500 to-red-500', 'from-orange-500 to-yellow-500'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const commentElement = document.createElement('div');
        commentElement.className = 'bg-white rounded-xl p-6 shadow-sm border border-gray-100';
        commentElement.innerHTML = `
            <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r ${randomColor} rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-lg">${initials}</span>
                </div>
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                        <h5 class="font-semibold text-gray-800">${comment.name}</h5>
                        <span class="text-sm text-gray-500">Baru saja</span>
                    </div>
                    <p class="text-gray-700 leading-relaxed">${comment.message}</p>
                    <div class="flex items-center space-x-4 mt-3">
                        <button class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300">
                            👍 Suka (${comment.likes})
                        </button>
                        <button class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-300">
                            💬 Balas
                        </button>
                    </div>
                </div>
            </div>
        `;

        commentsList.insertBefore(commentElement, commentsList.firstChild);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        if (type === 'success') {
            notification.className += ' bg-green-500 text-white';
        } else if (type === 'error') {
            notification.className += ' bg-red-500 text-white';
        } else {
            notification.className += ' bg-blue-500 text-white';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
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

// Initialize blog detail manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogDetailManager = new BlogDetailManager();
});
