const gradePoints = {
    'A*': 10, 'A+': 10, 'A': 9, 'B': 8, 'B-': 7,
    'C': 6, 'C-': 5, 'D': 4, 'F': 0
};

const subjects = [
    { name: 'ICP', credits: 4 },
    { name: 'WebDev 1', credits: 3 },
    { name: 'Discrete Maths', credits: 3 },
    { name: 'English 1', credits: 2 },
    { name: 'DSA 1', credits: 2 },
    { name: 'WebDev 2', credits: 4 },
    { name: 'Linear Algerbera', credits: 3 },
    { name: 'DSA 2', credits: 4 },
    { name: 'Probability & Statistics', credits: 3 },
    { name: 'WebDev 3', credits: 3 },
    { name: 'English 2', credits: 3 }
];

function createGradeOptions() {
    let options = '<option value="">Grade</option>';
    for (let grade in gradePoints) {
        options += `<option value="${grade}">${grade}</option>`;
    }
    return options;
}

function renderSubjects() {
    const container = document.getElementById('subjects');
    container.innerHTML = '';

    subjects.forEach((subject, index) => {
        const div = document.createElement('div');
        div.className = 'subject';
        div.innerHTML = `
            <div class="subject-name">${subject.name} (${subject.credits}cr)</div>
            <select class="grade" id="grade-${index}">
                ${createGradeOptions()}
            </select>
        `;
        container.appendChild(div);
    });
}

function calculateCGR() {
    let weightedGrades = 0;
    let totalCredits = 0;
    let allSelected = true;

    subjects.forEach((subject, index) => {
        const grade = document.getElementById(`grade-${index}`).value;
        if (!grade) allSelected = false;
        if (!grade) return;
        weightedGrades += gradePoints[grade] * subject.credits;
        totalCredits += subject.credits;
    });

    const resultDiv = document.getElementById('result');
    // Remove any previous gif
    const prevGif = document.getElementById('cgr-gif');
    if (prevGif) prevGif.remove();

    if (totalCredits === 0) {
        resultDiv.innerText = "Please enter valid grades.";
        return;
    }

    const cgr = (weightedGrades / totalCredits).toFixed(2);
    let resultText = `Your CGR is: ${cgr}`;
    if (!allSelected) {
        resultText += "\n(Note: Some grades are missing.)";
    }
    resultDiv.innerText = resultText;

    // Show GIF or meme based on CGR
    const cgrValue = parseFloat(cgr);
    let imgSrc = '', imgAlt = '';
    if (cgrValue > 9) {
        imgSrc = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWE3eTd0NnczYzZoODN1amt3MnFveHdsN2oydDRwODlyNTZ1b2hqYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t3sZxY5zS5B0z5zMIz/giphy.gif';
        imgAlt = 'Celebration';
    } else if (cgrValue > 8 && cgrValue <= 9) {
        imgSrc = 'https://a.pinatafarm.com/600x414/4efbad3d34/good-job-1f88a8d26e6fa5efaa7c4ae3cc4b1c85-meme.jpeg';
        imgAlt = 'Good Job';
    } else if (cgrValue > 7.5 && cgrValue <= 8) {
        imgSrc = 'https://pbs.twimg.com/media/GnswF1SXUAEg3dp?format=jpg&name=medium';
        imgAlt = 'Nice Work';
    } else if (cgrValue >= 6 && cgrValue <= 7.5) {
        imgSrc = 'https://i.imgflip.com/941adm.jpg?a485856';
        imgAlt = 'Keep Going';
    } else if (cgrValue < 6) {
        imgSrc = 'https://media.tenor.com/S_XHzK64bpQAAAAe/l-lag-gye-mere-l-lag-gye-l-lag-gye.png';
        imgAlt = 'Try Harder';
    }
    if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = imgAlt;
        img.id = 'cgr-gif';
        img.style.display = 'block';
        img.style.margin = '18px auto 0 auto';
        img.style.maxWidth = '220px';
        img.style.borderRadius = '10px';
        resultDiv.after(img);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderSubjects();
    document.getElementById('subjects').addEventListener('change', () => {
        document.getElementById('result').innerText = '';
    });
});
