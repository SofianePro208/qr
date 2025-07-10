document.addEventListener('DOMContentLoaded', () => {
    // --- DICTIONARY FOR TRANSLATIONS ---
    const translations = {
        en: {
            siteTitle: "Ramzak | Professional QR & Barcode Generator", navGenerator: "Generator", navFeatures: "Features", navContact: "Contact Us",
            heroTitle: "Turn Your Ideas into Codes with One Click", heroSubtitle: "Create custom QR codes and barcodes for free, with super ease.",
            qrTab: "QR Code", barcodeTab: "Barcode",
            qrInputPlaceholder: "Enter URL or text here...", fgColorLabel: "Code Color:", bgColorLabel: "Background:",
            barcodeInputPlaceholder: "Enter data (numbers or text)...", barcodeTypeLabel: "Type:",
            generateBtn: "Generate Code", downloadBtn: "Download",
            whyUsTitle: "Why Choose 'Ramzak'?",
            feature1Title: "Full Customization", feature1Desc: "Change colors and create unique codes that fit your brand.",
            feature2Title: "Multiple Types", feature2Desc: "Create standard QR codes or barcodes used on products.",
            feature3Title: "Multiple Formats", feature3Desc: "Download your codes in high-quality PNG, JPG, or SVG formats.",
            contactTitle: "Contact Us", contactSubtitle: "Have a question or a suggestion? We'd love to hear from you!",
            contactInfoTitle: "Contact Information", contactInfoDesc: "Feel free to contact us directly through the following channels.",
            contactAddress: "Riyadh, Saudi Arabia", contactNameLabel: "Name", contactEmailLabel: "Email", contactMessageLabel: "Message",
            contactSendBtn: "Send Message", formResponseTitle: "Thank You!", formResponseText: "We have received your message and will get back to you shortly.",
            sendingBtn: "Sending...",
            invalidEmailError: "Please enter a valid email address.", requiredFieldError: "This field is required.",
            footerCopyright: "© 2023 Ramzak. All rights reserved."
        },
        ar: {
            siteTitle: "رمزك | مولد رموز QR والباركود الاحترافي", navGenerator: "المولّد", navFeatures: "المميزات", navContact: "اتصل بنا",
            heroTitle: "حوّل أفكارك إلى رموز بلمسة واحدة", heroSubtitle: "أنشئ رموز QR وأكواد باركود مخصصة مجاناً وبسهولة فائقة.",
            qrTab: "رمز QR", barcodeTab: "باركود",
            qrInputPlaceholder: "أدخل الرابط أو النص هنا...", fgColorLabel: "لون الرمز:", bgColorLabel: "لون الخلفية:",
            barcodeInputPlaceholder: "أدخل البيانات (أرقام أو حروف)...", barcodeTypeLabel: "النوع:",
            generateBtn: "توليد الرمز", downloadBtn: "تحميل",
            whyUsTitle: "لماذا تختار 'رمزك'؟",
            feature1Title: "تخصيص كامل", feature1Desc: "غيّر الألوان وأنشئ رموزًا فريدة تناسب علامتك التجارية.",
            feature2Title: "أنواع متعددة", feature2Desc: "أنشئ رموز QR القياسية أو أكواد الباركود المستخدمة في المنتجات.",
            feature3Title: "صيغ متعددة", feature3Desc: "حمّل رموزك بصيغ PNG, JPG, أو SVG عالية الجودة.",
            contactTitle: "تواصل معنا", contactSubtitle: "هل لديك سؤال أو اقتراح؟ نود أن نسمع منك!",
            contactInfoTitle: "معلومات الاتصال", contactInfoDesc: "لا تتردد في التواصل معنا مباشرة عبر القنوات التالية.",
            contactAddress: "الرياض، المملكة العربية السعودية", contactNameLabel: "الاسم", contactEmailLabel: "البريد الإلكتروني", contactMessageLabel: "الرسالة",
            contactSendBtn: "إرسال الرسالة", formResponseTitle: "شكراً لك!", formResponseText: "لقد استلمنا رسالتك وسنقوم بالرد في أقرب وقت ممكن.",
            sendingBtn: "جارٍ الإرسال...",
            invalidEmailError: "الرجاء إدخال عنوان بريد إلكتروني صالح.", requiredFieldError: "هذا الحقل مطلوب.",
            footerCopyright: "© 2023 رمزك. جميع الحقوق محفوظة."
        }
    };

    // --- DOM Elements ---
    const generateBtn = document.getElementById('generate-btn'), resultContainer = document.getElementById('result-container'),
          downloadDropdown = document.getElementById('download-dropdown'), downloadPngBtn = document.getElementById('download-png'),
          downloadJpgBtn = document.getElementById('download-jpg'), downloadSvgBtn = document.getElementById('download-svg'),
          codeOutput = document.getElementById('code-output'), tabs = document.querySelectorAll('.tab-link'),
          tabContents = document.querySelectorAll('.tab-content'), darkModeToggle = document.getElementById('dark-mode-toggle'),
          langArBtn = document.getElementById('lang-ar'), langEnBtn = document.getElementById('lang-en'),
          contactForm = document.getElementById('contact-form'), nameInput = document.getElementById('name'),
          emailInput = document.getElementById('email'), messageInput = document.getElementById('message');
    
    let activeTab = 'qr', generatedCode = null;

    // --- Language & Theme Logic ---
    const setLanguage = (lang) => {
        document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey, translation = translations[lang][key];
            if (translation) {
                if (el.tagName === 'TITLE') { document.title = translation; }
                else if (el.placeholder) { el.placeholder = translation; }
                else {
                    const icon = el.querySelector('i');
                    let textNode = el.querySelector('span') || el;
                    while(textNode.firstChild && textNode.firstChild.nodeType !== 3) { textNode = textNode.firstChild; }
                    textNode.textContent = icon ? ` ${translation}` : translation;
                }
            }
        });
        langArBtn.classList.toggle('active', lang === 'ar'); langEnBtn.classList.toggle('active', lang === 'en');
        localStorage.setItem('language', lang);
    };
    const setDarkMode = (isDark) => {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        darkModeToggle.checked = isDark;
    };
    langArBtn.addEventListener('click', () => setLanguage('ar'));
    langEnBtn.addEventListener('click', () => setLanguage('en'));
    darkModeToggle.addEventListener('change', (e) => setDarkMode(e.target.checked));

    // --- Tab Switching Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active')); tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active'); activeTab = tab.dataset.tab;
            document.getElementById(`${activeTab}-tab`).classList.add('active');
            if (generatedCode) showResult(); else resultContainer.style.display = 'none';
        });
    });

    // --- Generation & Download Logic ---
    generateBtn.addEventListener('click', () => { clearResult(); activeTab === 'qr' ? generateQRCode() : generateBarcode(); });
    function generateQRCode() {
        const text = document.getElementById('qr-text').value; if (!text) return;
        codeOutput.innerHTML = '';
        generatedCode = new QRCode(codeOutput, { text, width: 256, height: 256, colorDark: document.getElementById('qr-fg-color').value, colorLight: document.getElementById('qr-bg-color').value, correctLevel: QRCode.CorrectLevel.H });
        showResult();
    }
    function generateBarcode() {
        const text = document.getElementById('barcode-text').value; if (!text) return;
        codeOutput.innerHTML = '';
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.id = 'barcode';
        codeOutput.appendChild(svg);
        try { JsBarcode(svg, text, { format: document.getElementById('barcode-format').value, displayValue: true, fontSize: 18, textMargin: 10, background: '#ffffff' }); generatedCode = svg; showResult(); }
        catch (e) { console.error(e); clearResult(); }
    }
    async function downloadCanvas(format) {
        let canvas;
        if(activeTab === 'qr') canvas = codeOutput.querySelector('canvas');
        else { const svg = codeOutput.querySelector('svg'); if (svg) canvas = await convertSvgToCanvas(svg); }
        if (!canvas) return;
        const link = document.createElement('a'), fileExtension = format === 'jpeg' ? 'jpg' : 'png';
        link.download = `${activeTab}-code.${fileExtension}`; link.href = canvas.toDataURL(`image/${format}`, 1.0); link.click();
    }
    function convertSvgToCanvas(svgElement) {
        return new Promise((resolve) => {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width; canvas.height = img.height;
                ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0); resolve(canvas);
            };
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            img.src = URL.createObjectURL(svgBlob);
        });
    }
    downloadPngBtn.addEventListener('click', (e) => { e.preventDefault(); downloadCanvas('png'); });
    downloadJpgBtn.addEventListener('click', (e) => { e.preventDefault(); downloadCanvas('jpeg'); });
    downloadSvgBtn.addEventListener('click', (e) => {
        e.preventDefault(); if (activeTab !== 'barcode' || !generatedCode) return;
        const source = new XMLSerializer().serializeToString(generatedCode), url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        const link = document.createElement('a'); link.href = url; link.download = 'barcode.svg'; link.click();
    });

    // --- PROFESSIONAL CONTACT FORM LOGIC ---
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
    const showError = (input, message) => {
        const formGroup = input.parentElement; formGroup.classList.add('error');
        formGroup.querySelector('.error-text').innerText = message;
    };
    const clearError = (input) => {
        const formGroup = input.parentElement; formGroup.classList.remove('error');
        formGroup.querySelector('.error-text').innerText = '';
    };
    if(contactForm) {
        [nameInput, emailInput, messageInput].forEach(input => input.addEventListener('input', () => clearError(input)));
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); let isValid = true;
            const currentLang = document.documentElement.lang, requiredMsg = translations[currentLang].requiredFieldError, invalidEmailMsg = translations[currentLang].invalidEmailError;
            [nameInput, emailInput, messageInput].forEach(input => clearError(input));
            if (nameInput.value.trim() === '') { showError(nameInput, requiredMsg); isValid = false; }
            const emailValue = emailInput.value.trim();
            if (emailValue === '') { showError(emailInput, requiredMsg); isValid = false; } else if (!validateEmail(emailValue)) { showError(emailInput, invalidEmailMsg); isValid = false; }
            if (messageInput.value.trim() === '') { showError(messageInput, requiredMsg); isValid = false; }
            if (!isValid) return;
            const submitBtn = document.getElementById('contact-submit-btn'), originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true; submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${translations[currentLang].sendingBtn}`;
            setTimeout(() => {
                contactForm.style.display = 'none'; document.getElementById('form-response').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('form-response').style.display = 'none'; contactForm.style.display = 'flex';
                    contactForm.reset(); submitBtn.disabled = false; submitBtn.innerHTML = originalBtnHTML;
                }, 4000);
            }, 1500);
        });
    }
    
    // --- Helper Functions ---
    function clearResult() { codeOutput.innerHTML = ''; resultContainer.style.display = 'none'; generatedCode = null; }
    function showResult() {
        resultContainer.style.display = 'flex';
        downloadDropdown.style.display = 'inline-block';
        downloadSvgBtn.style.display = (activeTab === 'barcode') ? 'block' : 'none';
    }

    // --- INITIALIZATION ---
    setDarkMode(localStorage.getItem('theme') === 'dark');
    setLanguage(localStorage.getItem('language') || 'ar');
    document.getElementById('qr-tab').classList.add('active');
});
