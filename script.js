document.addEventListener('DOMContentLoaded', () => {
    // --- DICTIONARY FOR TRANSLATIONS ---
    const translations = {
        en: {
            siteTitle: "Ramzak | QR & Barcode Generator and Scanner", navGenerator: "Generator", navFeatures: "Features", navContact: "Contact Us",
            heroTitle: "Turn Your Ideas into Codes with One Click", heroSubtitle: "Create, read, and customize QR codes and barcodes with super ease.",
            qrTab: "QR Code", barcodeTab: "Barcode", scannerTab: "Scanner",
            qrInputPlaceholder: "Enter URL or text here...", fgColorLabel: "Code Color:", bgColorLabel: "Background:",
            barcodeInputPlaceholder: "Enter data (numbers or text)...", barcodeTypeLabel: "Type:",
            generateBtn: "Generate Code", resultPlaceholder: "Your generated code will appear here", downloadBtn: "Download",
            whyUsTitle: "Why Choose 'Ramzak'?",
            feature1Title: "Full Customization", feature1Desc: "Change colors and create unique codes that fit your brand.",
            feature2Title: "Integrated Scanner", feature2Desc: "No need for external apps, scan any code directly from our site.",
            feature3Title: "Multiple Formats", feature3Desc: "Download your codes in high-quality PNG, JPG, or SVG formats.",
            contactTitle: "Contact Us", contactSubtitle: "Have a question or a suggestion? We'd love to hear from you!",
            contactInfoTitle: "Contact Information", contactInfoDesc: "Feel free to contact us directly through the following channels.",
            contactAddress: "Riyadh, Saudi Arabia", contactNameLabel: "Name", contactEmailLabel: "Email", contactMessageLabel: "Message",
            contactSendBtn: "Send Message", formResponseTitle: "Thank You!", formResponseText: "We have received your message and will get back to you shortly.",
            sendingBtn: "Sending...", fillAllFields: "Please fill out all fields.",
            startScanBtn: "Scan with Camera", uploadBtn: "Upload Image", cancelScanBtn: "Cancel", scanResultTitle: "Scan Result:", scanAgainBtn: "Scan Again",
            scannerError: "Camera access was denied. Please allow camera access in your browser settings and try again.", noCameraError: "No camera found on this device.", noCodeInImageError: "No QR code or barcode found in the selected image.",
            footerCopyright: "© 2023 Ramzak. All rights reserved."
        },
        ar: {
            siteTitle: "رمزك | مولد وقارئ رموز QR والباركود", navGenerator: "المولّد", navFeatures: "المميزات", navContact: "اتصل بنا",
            heroTitle: "حوّل أفكارك إلى رموز بلمسة واحدة", heroSubtitle: "أنشئ، اقرأ، وخصص رموز QR وأكواد الباركود بسهولة فائقة.",
            qrTab: "رمز QR", barcodeTab: "باركود", scannerTab: "القارئ",
            qrInputPlaceholder: "أدخل الرابط أو النص هنا...", fgColorLabel: "لون الرمز:", bgColorLabel: "لون الخلفية:",
            barcodeInputPlaceholder: "أدخل البيانات (أرقام أو حروف)...", barcodeTypeLabel: "النوع:",
            generateBtn: "توليد الرمز", resultPlaceholder: "سيظهر الرمز الذي تم إنشاؤه هنا", downloadBtn: "تحميل",
            whyUsTitle: "لماذا تختار 'رمزك'؟",
            feature1Title: "تخصيص كامل", feature1Desc: "غيّر الألوان وأنشئ رموزًا فريدة تناسب علامتك التجارية.",
            feature2Title: "قارئ مدمج", feature2Desc: "لا حاجة لتطبيقات خارجية، امسح أي رمز مباشرة من موقعنا.",
            feature3Title: "صيغ متعددة", feature3Desc: "حمّل رموزك بصيغ PNG, JPG, أو SVG عالية الجودة.",
            contactTitle: "تواصل معنا", contactSubtitle: "هل لديك سؤال أو اقتراح؟ نود أن نسمع منك!",
            contactInfoTitle: "معلومات الاتصال", contactInfoDesc: "لا تتردد في التواصل معنا مباشرة عبر القنوات التالية.",
            contactAddress: "الرياض، المملكة العربية السعودية", contactNameLabel: "الاسم", contactEmailLabel: "البريد الإلكتروني", contactMessageLabel: "الرسالة",
            contactSendBtn: "إرسال الرسالة", formResponseTitle: "شكراً لك!", formResponseText: "لقد استلمنا رسالتك وسنقوم بالرد في أقرب وقت ممكن.",
            sendingBtn: "جارٍ الإرسال...", fillAllFields: "الرجاء تعبئة جميع الحقول.",
            startScanBtn: "المسح بالكاميرا", uploadBtn: "رفع صورة", cancelScanBtn: "إلغاء", scanResultTitle: "نتيجة المسح:", scanAgainBtn: "مسح مرة أخرى",
            scannerError: "تم رفض الوصول إلى الكاميرا. الرجاء السماح بالوصول في إعدادات المتصفح والمحاولة مرة أخرى.", noCameraError: "لم يتم العثور على كاميرا على هذا الجهاز.", noCodeInImageError: "لم يتم العثور على رمز QR أو باركود في الصورة المحددة.",
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

    // --- Language & Theme Logic (No Changes) ---
    const setLanguage = (lang) => { /* ... (code from previous step) ... */ };
    const setDarkMode = (isDark) => { /* ... (code from previous step) ... */ };
    // (Copy the full functions from the previous response here)

    // --- Tab Switching Logic (No Changes) ---
    tabs.forEach(tab => { /* ... (code from previous step, it correctly calls resetScanner) ... */ });
    
    // --- Generation & Download Logic (No Changes) ---
    // (Copy the full functions from the previous response here)

    // =============================================================
    // --- FULLY REVISED AND CORRECTED SCANNER LOGIC ---
    // =============================================================

    async function startCameraScan() {
        // Step 1: Immediately update the UI to show we're starting.
        scannerActions.style.display = 'none';
        scannerContainer.style.display = 'block'; // Show the black box with animation
        scannerError.style.display = 'none';

        try {
            codeReader = new ZXing.BrowserMultiFormatReader();
            const videoInputDevices = await codeReader.listVideoInputDevices();
            
            if (videoInputDevices.length === 0) {
                showScannerError(translations[document.documentElement.lang].noCameraError);
                scannerContainer.style.display = 'none'; // Hide the container if no camera
                return;
            }

            // Prefer the rear camera ('environment') for mobile devices
            let selectedDeviceId = videoInputDevices[0].deviceId;
            const rearCamera = videoInputDevices.find(device => /back|environment/i.test(device.label));
            if (rearCamera) {
                selectedDeviceId = rearCamera.deviceId;
            }
            
            // The video container is already visible. Now, start the stream.
            // This is where the browser will ask for permission if it hasn't been granted.
            codeReader.decodeFromVideoDevice(selectedDeviceId, 'scanner-video', (result, err) => {
                if (result) {
                    showScanResult(result.text);
                    codeReader.reset(); // Stop the camera stream after a successful scan
                }
                if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error("Scanning error:", err);
                }
            });

        } catch (err) {
            // This block will catch permission errors (NotAllowedError)
            console.error("Camera initialization error:", err);
            scannerContainer.style.display = 'none'; // Hide the container on error
            showScannerError(translations[document.documentElement.lang].scannerError);
        }
    }
    
    startScanBtn.addEventListener('click', startCameraScan);

    cancelScanBtn.addEventListener('click', resetScanner);

    scanFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; if (!file) return;
        resetScanner(); // Reset UI before processing
        const reader = new FileReader();
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
        scanResultText.textContent = text;
        scannerActions.style.display = 'none';
        scannerContainer.style.display = 'none';
        scanResultContainer.style.display = 'block';
        scannerError.style.display = 'none';
    }

    function showScannerError(message) {
        scannerError.textContent = message;
        scannerError.style.display = 'block';
    }

    function resetScanner() {
        if (codeReader) {
            codeReader.reset(); // This is crucial to release the camera hardware and stream
            codeReader = null;
        }
        scannerContainer.style.display = 'none';
        scanResultContainer.style.display = 'none';
        scannerError.style.display = 'none';
        scannerActions.style.display = 'flex'; // Show the initial "Scan with Camera" / "Upload" buttons
        scanFileInput.value = ''; // Important to allow re-selecting the same file
    }
    
    // --- Contact Form Logic (No changes) ---
    // (Copy the full function from the previous response here)

    // --- Helper Functions (No changes) ---
    function clearResult() { /* ... */ }
    function showResult() { /* ... */ }

    // --- INITIALIZATION (No changes) ---
    // (Copy the initialization code from the previous response here)
});
