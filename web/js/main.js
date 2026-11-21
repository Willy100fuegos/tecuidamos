document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate toggle button
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 3. Clone marquee items for infinite effect
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const items = Array.from(marqueeContent.children);
        // Duplicate items to ensure seamless loop
        items.forEach(item => {
            const clone = item.cloneNode(true);
            marqueeContent.appendChild(clone);
        });
    }

    // 4. Stats counter animation
    const stats = document.querySelectorAll('.stat-num');
    if (stats.length > 0) {
        const animateStats = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'), 10);
                    let startValue = 0;
                    const duration = 2000;
                    const stepTime = Math.abs(Math.floor(duration / endValue));
                    
                    const timer = setInterval(() => {
                        startValue += 1;
                        target.textContent = startValue;
                        if (startValue >= endValue) {
                            target.textContent = endValue + (target.getAttribute('data-suffix') || '');
                            clearInterval(timer);
                        }
                    }, stepTime);
                    
                    observer.unobserve(target);
                }
            });
        };

        const observerOptions = {
            threshold: 0.5
        };

        const statsObserver = new IntersectionObserver(animateStats, observerOptions);
        stats.forEach(stat => statsObserver.observe(stat));
    }

    // 5. Contact Form handling (Redirect to WhatsApp)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
            const originalText = submitBtn ? (submitBtn.textContent || submitBtn.value) : 'Enviar';
            
            if (submitBtn) {
                if (submitBtn.tagName.toLowerCase() === 'input') {
                    submitBtn.value = 'Abriendo WhatsApp...';
                } else {
                    submitBtn.textContent = 'Abriendo WhatsApp...';
                }
                submitBtn.disabled = true;
            }

            // Get form values using FormData to be robust against any form structure
            const formData = new FormData(form);
            let name = formData.get('name') || formData.get('your-name') || '';
            let phone = formData.get('phone') || formData.get('tel') || formData.get('your-phone') || '';
            let email = formData.get('email') || formData.get('your-email') || '';
            let service = formData.get('service') || formData.get('menu-456') || ''; 
            let message = formData.get('message') || formData.get('your-message') || '';

            // Fallback for my HTML since I didn't add name attributes, only id's
            if (!name) {
                const nameEl = form.querySelector('#name');
                if (nameEl) name = nameEl.value;
            }
            if (!phone) {
                const phoneEl = form.querySelector('#phone');
                if (phoneEl) phone = phoneEl.value;
            }
            if (!email) {
                const emailEl = form.querySelector('#email');
                if (emailEl) email = emailEl.value;
            }
            if (!service) {
                const serviceEl = form.querySelector('#service');
                if (serviceEl && serviceEl.options) {
                    service = serviceEl.options[serviceEl.selectedIndex].text;
                } else if (serviceEl) {
                    service = serviceEl.value;
                }
            }
            if (!message) {
                const messageEl = form.querySelector('#message');
                if (messageEl) message = messageEl.value;
            }

            // Construct WhatsApp Message with formatting
            const whatsappText = `🌟 *Nueva Solicitud de Contacto* 🌟\n\n` +
                                 `👤 *Nombre:* ${name.trim() || 'No especificado'}\n` +
                                 `📱 *Teléfono:* ${phone.trim() || 'No especificado'}\n` +
                                 `📧 *Correo:* ${email.trim() || 'No especificado'}\n` +
                                 `🏢 *Servicio:* ${service.trim() || 'No especificado'}\n\n` +
                                 `📝 *Mensaje:*\n_${message.trim() || 'No especificado'}_`;

            // Target number: 529212674190 (which is 921 267 4190 in MX)
            const whatsappUrl = `https://wa.me/529212674190?text=${encodeURIComponent(whatsappText)}`;

            // Use location.href instead of window.open to prevent popup blockers
            window.location.href = whatsappUrl;

            // Reset UI state
            setTimeout(() => {
                form.reset();
                if (submitBtn) {
                    if (submitBtn.tagName.toLowerCase() === 'input') {
                        submitBtn.value = originalText;
                    } else {
                        submitBtn.textContent = originalText;
                    }
                    submitBtn.disabled = false;
                }
            }, 2000);
        });
    });
});
