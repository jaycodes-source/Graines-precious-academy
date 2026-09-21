const defaultSettings = {
    whatsapp: "",
    phone: "",
    email: "school@example.com"
};

function getSettings() {
    const saved = localStorage.getItem("schoolSettings");

    if (saved) {
        return JSON.parse(saved);
    }

    return defaultSettings;
}

function updateContactDetails() {
    const settings = getSettings();

    const phone = document.getElementById("schoolPhone");
    const email = document.getElementById("schoolEmail");
    const whatsapp = document.getElementById("whatsappLink");

    if (phone && settings.phone) {
        phone.textContent = settings.phone;
    }

    if (email && settings.email) {
        email.textContent = settings.email;
    }

    if (whatsapp && settings.whatsapp) {
        whatsapp.href =
            "https://wa.me/" +
            settings.whatsapp.replace(/\D/g, "") +
            "?text=Hello%20Graines%20Precious%20Academy,%20I%20want%20to%20register%20a%20student.";
    }
}

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const student = {
            id: "GPA-" + Date.now(),
            name: document.getElementById("studentName").value,
            className: document.getElementById("studentClass").value,
            parent: document.getElementById("parentName").value,
            phone: document.getElementById("parentPhone").value,
            date: new Date().toLocaleDateString()
        };

        const students =
            JSON.parse(localStorage.getItem("registeredStudents")) || [];

        students.push(student);

        localStorage.setItem(
            "registeredStudents",
            JSON.stringify(students)
        );

        document.getElementById("registrationMessage").textContent =
            "Registration submitted successfully!";

        registrationForm.reset();
    });
}

updateContactDetails();