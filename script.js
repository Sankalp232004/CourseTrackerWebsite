document.addEventListener('DOMContentLoaded', function() {
    const coursesGrid = document.getElementById('courses-grid');
    const goalsList = document.getElementById('goals-list');
    const filterInput = document.getElementById('filter-input');
    const typewriterElement = document.getElementById('typewriter');

    const textToType = typewriterElement.innerText;
    typewriterElement.innerText = '';
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            typewriterElement.style.borderRight = 'none';
        }
    }
    typeWriter();

    completedCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p class="platform">${course.platform}</p>
            <p class="skills"><strong>Key Skills:</strong> ${course.skills}</p>
            <div class="status">${course.status}</div>
        `;
        coursesGrid.appendChild(card);
    });

    futureGoals.forEach(goal => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div class="topic">${goal.topic}</div>
            <div class="area">${goal.area}</div>
            <div class="target">${goal.target}</div>
        `;
        goalsList.appendChild(item);
    });

    filterInput.addEventListener('keyup', () => {
        const searchTerm = filterInput.value.toLowerCase();
        const allCourses = coursesGrid.querySelectorAll('.card');

        allCourses.forEach(card => {
            const cardText = card.innerText.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.card, .list-item').forEach(el => {
        observer.observe(el);
    });
});
