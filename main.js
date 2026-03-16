/* ============================================================
   Clearsite — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Smooth nav highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));


  /* ── FAQ accordion ── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    const toggle   = item.querySelector('.faq-toggle');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        const t = i.querySelector('.faq-toggle');
        if (a) { a.style.maxHeight = null; a.style.opacity = '0'; }
        if (t) t.textContent = '+';
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity   = '1';
        if (toggle) toggle.textContent = '×';
      }
    });

    // Initial state
    answer.style.maxHeight = '0';
    answer.style.overflow  = 'hidden';
    answer.style.opacity   = '0';
    answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    answer.style.display   = 'block';
  });


  /* ── Scroll-triggered fade-in for sections ── */
  const fadeEls = document.querySelectorAll(
    '.service-card, .process-step, .portfolio-item, .pricing-card, .testimonial-card, .faq-item'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${(i % 3) * 0.08}s, transform 0.5s ease ${(i % 3) * 0.08}s`;
    fadeObserver.observe(el);
  });


  /* ── Duplicate marquee track for seamless loop ── */
  const track = document.querySelector('.marquee-track');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

});
