document.addEventListener('DOMContentLoaded', () => {
    // --- DICTIONARY FOR TRANSLATIONS ---
    const translations = {
        en: {
            siteTitle: "Ramzak | QR & Barcode Generator and Scanner", navGenerator: "Generator", navFeatures: "Features", navContact: "Contact Us",
            heroTitle: "Turn Your Ideas into Codes with One Click", heroSubtitle: "Create, read, and customize QR codes and barcodes with super ease.",
            qrTab: "QR Code", barcodeTab: "Barcode", scannerTab: "Scanner",
            qrInputPlaceholder: "Enter URL or text here...", fgColorLabel: "Code Color:", bgColorLabel: "Background:",
            barcodeInputPlaceholder: "Enter data (numbers or text)...", barcodeTypeLabel: "Type:",
            generateBtn: "Generate Code", downloadBtn: "Download",
            whyUsTitle: "Why Choose 'Ramzak'?",
            feature1Title: "Full Customization", feature1Desc: "Change colors and create unique codes that fit your brand.",
            feature2Title: "Integrated Scanner", feature2Desc: "No need for external apps, scan any code directly from our site.",
            feature3Title: "Multiple Formats", feature3Desc: "Download your codes in high-quality PNG, JPG, or SVG formats.",
            contactTitle: "Contact Us", contactSubtitle: "Have a question or a suggestion? We'd love to hear from you!",
            contactInfoTitle: "Contact Information", contactInfoDesc: "Feel free to contact us directly through the following channels.",
            contactAddress: "Riyadh, Saudi Arabia", contactNameLabel: "Name", contactEmailLabel: "Email", contactMessageLabel: "Message",
            contactSendBtn: "Send Message", formResponseTitle: "Thank You!", formResponseText: "We have received your message and will get back to you shortly.",
            sendingBtn: "Sending...",
            startScanBtn: "Scan with Camera", uploadBtn: "Upload Image", cancelScanBtn: "Cancel", scanResultTitle: "Scan Result:", scanAgainBtn: "Scan Again",
            scannerError: "Camera access was denied. Please allow camera access in your browser settings and try again.", noCameraError: "No camera found on this device.", noCodeInImageError: "No QR code or barcode found in the selected image.",
            invalidEmailError: "Please enter a valid email address.", requiredFieldError: "This field is required.",
            footerCopyright: "© 2023 Ramzak. All rights reserved."
        },
        ar: {
            siteTitle: "رمزك | مولد وقارئ رموز QR والباركود", navGenerator: "المولّد", navFeatures: "المميزات", navContact: "اتصل بنا",
            heroTitle: "حوّل أفكارك إلى رموز بلمسة واحدة", heroSubtitle: "أنشئ، اقرأ، وخصص رموز QR وأكواد الباركود بسهولة فائقة.",
            qrTab: "رمز QR", barcodeTab: "باركود", scannerTab: "القارئ",
            qrInputPlaceholder: "أدخل الرابط أو النص هنا...", fgColorLabel: "لون الرمز:", bgColorLabel: "لون الخلفية:",
            barcodeInputPlaceholder: "أدخل البيانات (أرقام أو حروف)...", barcodeTypeLabel: "النوع:",
            generateBtn: "توليد الرمز", downloadBtn: "تحميل",
            whyUsTitle: "لماذا تختار 'رمزك'؟",
            feature1Title: "تخصيص كامل", feature1Desc: "غيّر الألوان وأنشئ رموزًا فريدة تناسب علامتك التجارية.",
            feature2Title: "قارئ مدمج", feature2Desc: "لا حاجة لتطبيقات خارجية، امسح أي رمز مباشرة من موقعنا.",
            feature3Title: "صيغ متعددة", feature3Desc: "حمّل رموزك بصيغ PNG, JPG, أو SVG عالية الجودة.",
            contactTitle: "تواصل معنا", contactSubtitle: "هل لديك سؤال أو اقتراح؟ نود أن نسمع منك!",
            contactInfoTitle: "معلومات الاتصال", contactInfoDesc: "لا تتردد في التواصل معنا مباشرة عبر القنوات التالية.",
            contactAddress: "الرياض، المملكة العربية السعودية", contactNameLabel: "الاسم", contactEmailLabel: "البريد الإلكتروني", contactMessageLabel: "الرسالة",
            contactSendBtn: "إرسال الرسالة", formResponseTitle: "شكراً لك!", formResponseText: "لقد استلمنا رسالتك وسنقوم بالرد في أقرب وقت ممكن.",
            sendingBtn: "جارٍ الإرسال...",
            startScanBtn: "المسح بالكاميرا", uploadBtn: "رفع صورة", cancelScanBtn: "إلغاء", scanResultTitle: "نتيجة المسح:", scanAgainBtn: "مسح مرة أخرى",
            scannerError: "تم رفض الوصول إلى الكاميرا. الرجاء السماح بالوصول في إعدادات المتصفح والمحاولة مرة أخرى.", noCameraError: "لم يتم العثور على كاميرا على هذا الجهاز.", noCodeInImageError: "لم يتم العثور على رمز QR أو باركود في الصورة المحددة.",
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
          scannerContainer = document.getElementById('scanner-container'), startScanBtn = document.getElementById('start-scan-btn'),
          cancelScanBtn = document.getElementById('cancel-scan-btn'), scanFileInput = document.getElementById('scan-file-input'),
          scannerActions = document.getElementById('scanner-actions'), scanResultContainer = document.getElementById('scan-result-container'),
          scanResultText = document.getElementById('scan-result-text'), scanAgainBtn = document.getElementById('scan-again-btn'),
          scannerError = document.getElementById('scanner-error');
    
    let activeTab = 'qr', generatedCode = null, codeReader = null;

    // --- Language & Theme Logic ---
    const setLanguage = (lang) => {
        document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey, translation = translations[lang][key];
            if (translation) {
                if (el.placeholder) el.placeholder = translation;
                else {
                    const icon = el.querySelector('i'), span = el.querySelector('span');
                    if (span) span.textContent = translation; else if (el.tagName !== 'TITLE') el.textContent = translation; else document.title = translation;
                    if (icon && el.tagName !== 'TITLE') el.prepend(icon, ' ');
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
    langArBtn.addEventListener('click', () => setLanguage('ar')); langEnBtn.addEventListener('click', () => setLanguage('en'));
    darkModeToggle.addEventListener('change', (e) => setDarkMode(e.target.checked));

    // --- Tab Switching Logic ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            resetScanner();
            tabs.forEach(t => t.classList.remove('active')); tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active'); activeTab = tab.dataset.tab;
            document.getElementById(`${activeTab}-tab`).classList.add('active');
            const isGeneratorTab = activeTab === 'qr' || activeTab === 'barcode';
            generateBtn.style.display = isGeneratorTab ? 'block' : 'none';
            if (isGeneratorTab) { if (generatedCode) showResult(); else resultContainer.style.display = 'none'; }
            else resultContainer.style.display = 'none';
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
        if(activeTab === 'qr') {
            canvas = codeOutput.querySelector('canvas');
        } else {
            const svg = codeOutput.querySelector('svg');
            if (svg) canvas = await convertSvgToCanvas(svg);
        }
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
                ctx.drawImage(img, 0, 0);
                resolve(canvas);
            };
            img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
        });
    }
    downloadPngBtn.addEventListener('click', (e) => { e.preventDefault(); downloadCanvas('png'); });
    downloadJpgBtn.addEventListener('click', (e) => { e.preventDefault(); downloadCanvas('jpeg'); });
    downloadSvgBtn.addEventListener('click', (e) => {
        e.preventDefault(); if (activeTab !== 'barcode' || !generatedCode) return;
        const source = new XMLSerializer().serializeToString(generatedCode), url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        const link = document.createElement('a'); link.href = url; link.download = 'barcode.svg'; link.click();
    });

    // --- REVISED SCANNER LOGIC ---
    async function startCameraScan() {
        scannerActions.style.display = 'none';
        scannerContainer.style.display = 'block';
        scannerError.style.display = 'none';
        try {
            codeReader = new ZXing.BrowserMultiFormatReader();
            const videoInputDevices = await codeReader.listVideoInputDevices();
            if (videoInputDevices.length === 0) {
                showScannerError(translations[document.documentElement.lang].noCameraError);
                scannerContainer.style.display = 'none';
                return;
            }
            let selectedDeviceId = videoInputDevices[0].deviceId;
            const rearCamera = videoInputDevices.find(device => /back|environment/i.test(device.label));
            if (rearCamera) selectedDeviceId = rearCamera.deviceId;
            
            codeReader.decodeFromVideoDevice(selectedDeviceId, 'scanner-video', (result, err) => {
                if (result) { showScanResult(result.text); codeReader.reset(); }
                if (err && !(err instanceof ZXing.NotFoundException)) console.error("Scanning error:", err);
            });
        } catch (err) {
            console.error("Camera initialization error:", err);
            scannerContainer.style.display = 'none';
            showScannerError(translations[document.documentElement.lang].scannerError);
        }
    }
    startScanBtn.addEventListener('click', startCameraScan);
    cancelScanBtn.addEventListener('click', resetScanner);
    scanFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; if (!file) return;
        resetScanner(); const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image(); image.src = e.target.result;
            image.onload = () => {
                const localCodeReader = new ZXing.BrowserMultiFormatReader();
                localCodeReader.decodeFromImageElement(image)
                    .then(result => showScanResult(result.text))
                    .catch(() => showScannerError(translations[document.documentElement.lang].noCodeInImageError));
            };
        }; reader.readAsDataURL(file);
    });
    scanAgainBtn.addEventListener('click', resetScanner);
    function showScanResult(text) {
        scanResultText.textContent = text; scannerActions.style.display = 'none';
        scannerContainer.style.display = 'none'; scanResultContainer.style.display = 'block';
        scannerError.style.display = 'none';
    }
    function showScannerError(message) {
        scannerError.textContent = message; scannerError.style.display = 'block';
    }
    function resetScanner() {
        if (codeReader) { codeReader.reset(); codeReader = null; }
        scannerContainer.style.display = 'none'; scanResultContainer.style.display = 'none';
        scannerError.style.display = 'none'; scannerActions.style.display = 'flex';
        scanFileInput.value = '';
    }
    
    // --- PROFESSIONAL CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
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
            const submitBtn = document.getElementById('contact-submit-btn'), originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true; submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${translations[currentLang].sendingBtn}`;
            setTimeout(() => {
                contactForm.style.display = 'none'; document.getElementById('form-response').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('form-response').style.display = 'none'; contactForm.style.display = 'flex';
                    contactForm.reset(); submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText;
                }, 4000);
            }, 1500);
        });
    }
    
    // --- Helper Functions ---
    function clearResult() { codeOutput.innerHTML = ''; resultContainer.style.display = 'none'; generatedCode = null; }
    function showResult() {
        resultContainer.style.display = 'flex'; downloadDropdown.style.display = 'inline-block';
        downloadSvgBtn.style.display = (activeTab === 'barcode') ? 'block' : 'none';
    }

    // --- INITIALIZATION ---
    setDarkMode(localStorage.getItem('theme') === 'dark');
    setLanguage(localStorage.getItem('language') || 'ar');
    document.getElementById('qr-tab').classList.add('active');
});
