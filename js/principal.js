document.addEventListener('DOMContentLoaded', function(){
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const siteHeader = document.getElementById('siteHeader');
  const logo = document.getElementById('logo');
  const toTop = document.getElementById('toTop');
  const subToggle = document.querySelectorAll('.sub-toggle');

  function openMobile(){
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobile(){
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMobile);
  mobileClose.addEventListener('click', closeMobile);

  // close mobile when clicking a link
  mobileMenu.addEventListener('click', function(e){
    if(e.target.tagName === 'A') closeMobile();
  });

  // close mobile on outside click
  document.addEventListener('click', function(e){
    if(mobileMenu.classList.contains('open')){
      const inside = mobileMenu.contains(e.target) || hamburger.contains(e.target);
      if(!inside) closeMobile();
    }
  });

  // mobile submenu toggles
  document.querySelectorAll('.sub-mobile-toggle').forEach(btn=>{
    btn.addEventListener('click', function(){
      const li = this.closest('.has-sub-mobile');
      li.classList.toggle('open');
    });
  });

  // desktop submenu toggle for keyboards/clicks
  subToggle.forEach(btn=>{
    btn.addEventListener('click', function(e){
      const li = this.closest('.has-sub');
      const isOpen = li.classList.contains('show');
      document.querySelectorAll('.has-sub').forEach(x=>x.classList.remove('show'));
      if(!isOpen) li.classList.add('show');
      e.stopPropagation();
    });
  });

  document.addEventListener('click', function(){
    document.querySelectorAll('.has-sub').forEach(x=>x.classList.remove('show'));
  });

  // header scroll
  function onScroll(){
    if(window.scrollY > 30){
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    if(window.scrollY > 300){
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  toTop.addEventListener('click', function(){
    window.scrollTo({top:0,behavior:'smooth'});
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const el = document.querySelector(href);
        if(el){
          e.preventDefault();
          closeMobile();
          el.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });

  //formulario de contato
    (function() {
      const form = document.getElementById('contactForm');
      const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
      };
      const errs = {
        name: document.getElementById('err-name'),
        email: document.getElementById('err-email'),
        phone: document.getElementById('err-phone'),
        subject: document.getElementById('err-subject'),
        message: document.getElementById('err-message')
      };
      const successMsg = document.getElementById('successMsg');
      const clearBtn = document.getElementById('clearBtn');

      function showError(key, text) {
        errs[key].textContent = text;
        errs[key].style.display = 'block';
      }
      function hideError(key) {
        errs[key].style.display = 'none';
      }
      function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      function validateAll() {
        let ok = true;
        // Nome
        if (!fields.name.value.trim()) { showError('name','Preencha o campo Nome.'); ok = false; } else hideError('name');
        // Email
        if (!fields.email.value.trim()) { showError('email','Preencha o campo E-mail.'); ok = false; }
        else if (!validateEmail(fields.email.value.trim())) { showError('email','Digite um E-mail válido.'); ok = false; }
        else hideError('email');
        // Phone
        if (!fields.phone.value.trim()) { showError('phone','Preencha o campo Telefone.'); ok = false; } else hideError('phone');
        // Subject
        if (!fields.subject.value.trim()) { showError('subject','Preencha o campo Assunto.'); ok = false; } else hideError('subject');
        // Message
        if (!fields.message.value.trim()) { showError('message','Preencha o campo Mensagem.'); ok = false; } else hideError('message');

        return ok;
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        successMsg.style.display = 'none';

        if (!validateAll()) return;

        const to = 'tiago.freitas.sp@hotmail.com';
        const subject = fields.subject.value.trim();
        const bodyLines = [
          'Nome: ' + fields.name.value.trim(),
          'E-mail: ' + fields.email.value.trim(),
          'Telefone: ' + fields.phone.value.trim(),
          '',
          'Mensagem:',
          fields.message.value.trim()
        ];
        const body = bodyLines.join('\n');

        const mailto = 'mailto:' + encodeURIComponent(to) +
                       '?subject=' + encodeURIComponent(subject) +
                       '&body=' + encodeURIComponent(body);

        // Tenta abrir o cliente de e-mail do usuário
        window.location.href = mailto;

        // Exibe a mensagem de sucesso abaixo do formulário
        successMsg.style.display = 'block';
      });

      clearBtn.addEventListener('click', function() {
        form.reset();
        Object.keys(errs).forEach(k => hideError(k));
        successMsg.style.display = 'none';
      });

      // Esconder erro ao digitar
      Object.values(fields).forEach(field => {
        field.addEventListener('input', function() {
          const id = field.id;
          if (errs[id]) hideError(id);
        });
      });
    })();
});