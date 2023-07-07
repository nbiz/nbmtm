function formToJson(form$) {
    var array = form$.serializeArray();
    var json = {};

    jQuery.each(array, function () {
        json[this.name] = this.value || '';
    });

    return JSON.stringify(json);
}

$('#lead-form').on('submit', function (event) {
    event.preventDefault();
    console.log("Form submitted");
    var url = 'https://api.smartmoving.com/api/leads/from-provider/v2?providerKey=';
    var providerKey = 'f379ab14-601f-4852-9a49-afd601456102';

    var formObject = {};

    $(this).serializeArray().forEach(item => {
        formObject[item.name] = item.value;
    });

    console.log("Form data:", formObject);

    $.ajax({
        url: url + providerKey,
        type: "POST",
        data: JSON.stringify(formObject),
        contentType: "application/json",
        success: function (result) {
            console.log("Success response:", result);
            alert('Your information has been received!')
        },
        error: function (xhr, resp, text) {
            console.log("Error:", xhr, resp, text);
            alert('There was a problem submitting your information.')
        }
    });
});

//silly truck emojis
let intervalId = null;
let isMouseDown = false;
let mouseX, mouseY;

document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('mousedown', function (e) {
    isMouseDown = true;
    intervalId = setInterval(() => {
        if (isMouseDown) {
            for (let i = 0; i < 5; i++) {
                createEmoji(mouseX, mouseY);
            }
        }
    }, 50);
});


document.addEventListener('mouseup', function (e) {
    isMouseDown = false;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
});

let touchMove = false;

document.addEventListener('touchstart', function (e) {
    isMouseDown = true;
    touchMove = false;
    intervalId = setInterval(() => {
        if (isMouseDown && !touchMove) {
            for (let i = 0; i < 5; i++) {
                createEmoji(e.touches[0].clientX, e.touches[0].clientY);
            }
        }
    }, 50);
});

document.addEventListener('touchend', function (e) {
    isMouseDown = false;
    touchMove = false;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
});

document.addEventListener('touchmove', function (e) {
    touchMove = true;
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});


// Get all dropdowns
const dropdowns = document.querySelectorAll('select');

// Stop the emoji generation when a dropdown is opened
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('focus', function () {
        isMouseDown = false;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    });

    // Resume the emoji generation when a dropdown is closed
    dropdown.addEventListener('blur', function () {
        isMouseDown = false;
    });
});


function createEmoji(x, y) {
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.innerText = '🚚';
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;

    const xRatio = (Math.random() - 0.5) * 200;
    const yRatio = -(Math.random() * 0.5 + 2.5) * 200;
    const rotateRatio = (Math.random() * 2 - 1) * 25;

    const animationDuration = Math.random() * 1 + 1.5;
    const totalFrames = Math.floor(animationDuration * 60);

    let frameCount = 0;

    function updatePosition() {
        const t = frameCount / totalFrames;
        const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const x = xRatio * easedT;

        const y = yRatio * easedT + 0.5 * 9.8 * Math.pow(easedT * animationDuration, 2) * 100;

        emoji.style.transform = `translate(${x}px, ${y}px) rotate(${rotateRatio}deg)`;

        frameCount++;

        if (frameCount < totalFrames) {
            requestAnimationFrame(updatePosition);
        } else {
            document.body.removeChild(emoji);
        }
    }

    updatePosition();

    document.body.appendChild(emoji);
}
