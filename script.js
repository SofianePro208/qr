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
            scannerError: "Camera access was denied. Please allow camera access in your browser settings and try again.", noCameraError: "No camera found on this device.", noCodeInImageError: "No QR code or barcode found in the selected image.", cameraInUseError: "Camera is already in use by another application.",
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
            scannerError: "تم رفض الوصول إلى الكاميرا. الرجاء السماح بالوصول في إعدادات المتصفح والمحاولة مرة أخرى.", noCameraError: "لم يتم العثور على كاميرا على هذا الجهاز.", noCodeInImageError: "لم يتم العثور على رمز QR أو باركود في الصورة المحددة.", cameraInUseError: "الكاميرا مستخدمة بالفعل من قبل تطبيق آخر.",
            invalidEmailError: "الرجاء إدخال عنوان بريد إلكتروني صالح.", requiredFieldError: "هذا الحقل مطلوب.",
            footerCopyright: "© 2023 رمزك. جميع الحقوق محفوظة."
        }
    };

    // --- DOM Elements ---
    const allElements = {
        generateBtn: document.getElementById('generate-btn'), resultContainer: document.getElementById('result-container'),
        downloadDropdown: document.getElementById('download-dropdown'), downloadPngBtn: document.getElementById('download-png'),
        downloadJpgBtn: document.getElementById('download-jpg'), downloadSvgBtn: document.getElementById('download-svg'),
        codeOutput: document.getElementById('code-output'), tabs: document.querySelectorAll('.tab-link'),
        tabContents: document.querySelectorAll('.tab-content'), darkModeToggle: document.getElementById('dark-mode-toggle'),
        langArBtn: document.getElementById('lang-ar'), langEnBtn: document.getElementById('lang-en'),
        scannerContainer: document.getElementById('scanner-container'), startScanBtn: document.getElementById('start-scan-btn'),
        cancelScanBtn: document.getElementById('cancel-scan-btn'), scanFileInput: document.getElementById('scan-file-input'),
        scannerActions: document.getElementById('scanner-actions'), scanResultContainer: document.getElementById('scan-result-container'),
        scanResultText: document.getElementById('scan-result-text'), scanAgainBtn: document.getElementById('scan-again-btn'),
        scannerError: document.getElementById('scanner-error'), contactForm: document.getElementById('contact-form'),
        nameInput: document.getElementById('name'), emailInput: document.getElementById('email'), messageInput: document.getElementById('message')
    };
    
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
                    if (el.tagName === 'TITLE') { document.title = translation; return; }
                    if (span) span.textContent = translation; else el.textContent = translation;
                    if (icon) el.prepend(icon, ' ');
                }
            }
        });
        allElements.langArBtn.classList.toggle('active', lang === 'ar'); allElements.langEnBtn.classList.toggle('active', lang === 'en');
        localStorage.setItem('language', lang);
    };
    const setDarkMode = (isDark) => {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        allElements.darkModeToggle.checked = isDark;
    };
    allElements.langArBtn.addEventListener('click', () => setLanguage('ar'));
    allElements.langEnBtn.addEventListener('click', () => setLanguage('en'));
    allElements.darkModeToggle.addEventListener('change', (e) => setDarkMode(e.target.checked));

    // --- Tab Switching Logic ---
    allElements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            resetScanner();
            allElements.tabs.forEach(t => t.classList.remove('active'));
            allElements.tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            activeTab = tab.dataset.tab;
            document.getElementById(`${activeTab}-tab`).classList.add('active');
            const isGeneratorTab = activeTab === 'qr' || activeTab === 'barcode';
            allElements.generateBtn.style.display = isGeneratorTab ? 'block' : 'none';
            if (isGeneratorTab) { if (generatedCode) showResult(); else allElements.resultContainer.style.display = 'none'; }
            else { allElements.resultContainer.style.display = 'none'; }
        });
    });

    // --- Generation & Download Logic ---
    allElements.generateBtn.addEventListener('click', () => { clearResult(); activeTab === 'qr' ? generateQRCode() : generateBarcode(); });
    function generateQRCode() {
        const text = document.getElementById('qr-text').value; if (!text) return;
        allElements.codeOutput.innerHTML = '';
        generatedCode = new QRCode(allElements.codeOutput, { text, width: 256, height: 256, colorDark: document.getElementById('qr-fg-color').value, colorLight: document.getElementById('qr-bg-color').value, correctLevel: QRCode.CorrectLevel.H });
        showResult();
    }
    function generateBarcode() {
        const text = document.getElementById('barcode-text').value; if (!text) return;
        allElements.codeOutput.innerHTML = '';
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.id = 'barcode';
        allElements.codeOutput.appendChild(svg);
        try { JsBarcode(svg, text, { format: document.getElementById('barcode-format').value, displayValue: true, fontSize: 18, textMargin: 10, background: '#ffffff' }); generatedCode = svg; showResult(); }
        catch (e) { console.error(e); clearResult(); }
    }
    async function downloadCanvas(format) {
        let canvas;
        if(activeTab === 'qr') canvas = allElements.codeOutput.querySelector('canvas');
        else { const svg = allElements.codeOutput.querySelector('svg'); if (svg) canvas = await convertSvgToCanvas(svg); }
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
            img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
        });
    }
    allElements.downloadPngBtn.addEventListener('click', (e) => { e.preventDefault(); downloadCanvas('png'); });
    allElements.downloadJpgBtn.addEventListener('click', (e) => { e.preventDefault(); downloadCanvas('jpeg'); });
    allElements.downloadSvgBtn.addEventListener('click', (e) => {
        e.preventDefault(); if (activeTab !== 'barcode' || !generatedCode) return;
        const source = new XMLSerializer().serializeToString(generatedCode), url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        const link = document.createElement('a'); link.href = url; link.download = 'barcode.svg'; link.click();
    });

    // --- ROBUST SCANNER LOGIC ---
    async function startCameraScan() {
        allElements.scannerActions.style.display = 'none';
        allElements.scannerContainer.style.display = 'block';
        allElements.scannerError.style.display = 'none';
        try {
            codeReader = new ZXing.BrowserMultiFormatReader();
            const videoInputDevices = await codeReader.listVideoInputDevices();
            if (videoInputDevices.length === 0) {
                handleScannerError({ name: 'NotFoundError' }); return;
            }
            let selectedDeviceId = videoInputDevices[0].deviceId;
            const rearCamera = videoInputDevices.find(device => /back|environment/i.test(device.label));
            if (rearCamera) selectedDeviceId = rearCamera.deviceId;
            
            codeReader.decodeFromVideoDevice(selectedDeviceId, 'scanner-video', (result, err) => {
                if (result) { showScanResult(result.text); codeReader.reset(); }
                if (err && !(err instanceof ZXing.NotFoundException)) console.error("Scanning error:", err);
            });
        } catch (err) {
            handleScannerError(err);
        }
    }
    function handleScannerError(err) {
        console.error("Scanner Error:", err.name, err.message);
        let messageKey;
        switch (err.name) {
            case 'NotAllowedError': messageKey = 'scannerError'; break;
            case 'NotFoundError': messageKey = 'noCameraError'; break;
            case 'NotReadableError': messageKey = 'cameraInUseError'; break;
            default: messageKey = 'scannerError'; break;
        }
        allElements.scannerError.textContent = translations[document.documentElement.lang][messageKey];
        allElements.scannerError.style.display = 'block';
        allElements.scannerContainer.style.display = 'none';
    }
    allElements.startScanBtn.addEventListener('click', startCameraScan);
    allElements.cancelScanBtn.addEventListener('click', resetScanner);
    allElements.scanFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; if (!file) return;
        resetScanner(); const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image(); image.src = e.target.result;
            image.onload = () => {
                const localCodeReader = new ZXing.BrowserMultiFormatReader();
                localCodeReader.decodeFromImageElement(image)
                    .then(result => showScanResult(result.text))
                    .catch(() => handleScannerError({ name: 'NoCodeInImage' })); // Custom error for this case
            };
        }; reader.readAsDataURL(file);
    });
    allElements.scanAgainBtn.addEventListener('click', resetScanner);
    function showScanResult(text) {
        allElements.scanResultText.textContent = text;
        allElements.scannerActions.style.display = 'none';
        allElements.scannerContainer.style.display = 'none';
        allElements.scanResultContainer.style.display = 'block';
        allElements.scannerError.style.display = 'none';
    }
    function resetScanner() {
        if (codeReader) { codeReader.reset(); codeReader = null; }
        allElements.scannerContainer.style.display = 'none';
        allElements.scanResultContainer.style.display = 'none';
        allElements.scannerError.style.display = 'none';
        allElements.scannerActions.style.display = 'flex';
        allElements.scanFileInput.value = '';
    }
    
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
    if(allElements.contactForm) {
        [allElements.nameInput, allElements.emailInput, allElements.messageInput].forEach(input => input.addEventListener('input', () => clearError(input)));
        allElements.contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); let isValid = true;
            const currentLang = document.documentElement.lang, requiredMsg = translations[currentLang].requiredFieldError, invalidEmailMsg = translations[currentLang].invalidEmailError;
            [allElements.nameInput, allElements.emailInput, allElements.messageInput].forEach(input => clearError(input));
            if (allElements.nameInput.value.trim() === '') { showError(allElements.nameInput, requiredMsg); isValid = false; }
            const emailValue = allElements.emailInput.value.trim();
            if (emailValue === '') { showError(allElements.emailInput, requiredMsg); isValid = false; } else if (!validateEmail(emailValue)) { showError(allElements.emailInput, invalidEmailMsg); isValid = false; }
            if (allElements.messageInput.value.trim() === '') { showError(allElements.messageInput, requiredMsg); isValid = false; }
            if (!isValid) return;
            const submitBtn = document.getElementById('contact-submit-btn'), originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true; submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${translations[currentLang].sendingBtn}`;
            setTimeout(() => {
                allElements.contactForm.style.display = 'none'; document.getElementById('form-response').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('form-response').style.display = 'none'; allElements.contactForm.style.display = 'flex';
                    allElements.contactForm.reset(); submitBtn.disabled = false; submitBtn.innerHTML = originalBtnHTML;
                }, 4000);
            }, 1500);
        });
    }
    
    // --- Helper Functions ---
    function clearResult() { allElements.codeOutput.innerHTML = ''; allElements.resultContainer.style.display = 'none'; generatedCode = null; }
    function showResult() {
        allElements.resultContainer.style.display = 'flex';
        allElements.downloadDropdown.style.display = 'inline-block';
        allElements.downloadSvgBtn.style.display = (activeTab === 'barcode') ? 'block' : 'none';
    }

    // --- INITIALIZATION ---
    setDarkMode(localStorage.getItem('theme') === 'dark');
    setLanguage(localStorage.getItem('language') || 'ar');
    document.getElementById('qr-tab').classList.add('active');
});
