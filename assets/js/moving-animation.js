// floating-item js here

$(document).ready(function ($) {
	"use strict";
});

// Banner Moving JS Start
var floatingX = 0,
	floatingY = 0,
	x = 0,
	y = 0,
	friction = 1 / 30;

function floatingBg() {
	x += (floatingX - x) * friction;
	y += (floatingY - y) * friction;

	//  translate = 'translateX(' + x + 'px, ' + y + 'px)';
	translate = 'translateX(' + x + 'px) translateY(' + y + 'px)';

	$('.floating-item').css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});

	window.requestAnimationFrame(floatingBg);
}

$(window).on('mousemove click', function (e) {

	var isHovered = $('.floating-item:hover').length > 0;

	if (!isHovered) {
		var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX)),
			lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));

		floatingX = (20 * lMouseX) / 100;
		floatingY = (10 * lMouseY) / 100;
	}
});

floatingBg();

// scripts.js
// document.getElementById('uploadForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const fileInput = document.getElementById('fileInput');
//     const commentInput = document.getElementById('commentInput');
//     const gallery = document.getElementById('gallery');
    
//     const files = fileInput.files;
//     const comment = commentInput.value.trim();

//     if (files.length === 0) {
//         alert('Please select at least one image to upload.');
//         return;
//     }

//     if (comment === '') {
//         alert('Please write a comment.');
//         return;
//     }

//     for (const file of files) {
//         if (!file.type.startsWith('image/')) {
//             alert('Please upload only image files.');
//             continue;
//         }

//         const reader = new FileReader();
        
//         reader.onload = function(e) {
//             const galleryItem = document.createElement('div');
//             galleryItem.classList.add('gallery-item');
            
//             const img = document.createElement('img');
//             img.src = e.target.result;

//             const commentDiv = document.createElement('div');
//             commentDiv.classList.add('comment');
//             commentDiv.textContent = comment;

//             galleryItem.appendChild(img);
//             galleryItem.appendChild(commentDiv);

//             gallery.appendChild(galleryItem);
//         };
        
//         reader.readAsDataURL(file);
//     }

//     // Clear the form
//     fileInput.value = '';
//     commentInput.value = '';
// });
// scripts.js

// Function to render images and comments from localStorage
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear previous images and comments

    const storedData = JSON.parse(localStorage.getItem('galleryData')) || [];
    
    for (const item of storedData) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        
        const img = document.createElement('img');
        img.src = item.image;

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.textContent = item.comment;

        galleryItem.appendChild(img);
        galleryItem.appendChild(commentDiv);

        gallery.appendChild(galleryItem);
    }
}

// Event listener for the form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const commentInput = document.getElementById('commentInput');
    const files = fileInput.files;
    const comment = commentInput.value.trim();

    if (files.length === 0) {
        // alert('Please select at least one image to upload.');
        return;
    }

    if (comment === '') {
        alert('Please write a comment.');
        return;
    }

    const storedData = JSON.parse(localStorage.getItem('galleryData')) || [];
    
    for (const file of files) {
        if (!file.type.startsWith('image/')) {
            // alert('Please upload only image files.');
            continue;
        }

        const reader = new FileReader();
        
        reader.onload = function(e) {
            const newItem = {
                image: e.target.result,
                comment: comment
            };

            storedData.push(newItem);
            localStorage.setItem('galleryData', JSON.stringify(storedData));
            renderGallery();
        };
        
        reader.readAsDataURL(file);
    }

    // Clear the form
    fileInput.value = '';
    commentInput.value = '';
});

// Initial render of gallery on page load
window.onload = function() {
    renderGallery();
};



// scripts.js

// Function to render images and comments from localStorage
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear previous images and comments

    const storedData = JSON.parse(localStorage.getItem('galleryData')) || [];
    
    for (let i = 0; i < storedData.length; i++) {
        const item = storedData[i];
        
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        
        const img = document.createElement('img');
        img.src = item.image;

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.textContent = item.comment;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = () => {
            deleteItem(i);
        };

        galleryItem.appendChild(img);
        galleryItem.appendChild(commentDiv);
        galleryItem.appendChild(deleteBtn);

        gallery.appendChild(galleryItem);
    }
}

// Function to delete an item from localStorage
function deleteItem(index) {
    const storedData = JSON.parse(localStorage.getItem('galleryData')) || [];
    storedData.splice(index, 1); // Remove item at the specified index
    localStorage.setItem('galleryData', JSON.stringify(storedData));
    renderGallery(); // Re-render gallery
}

// Event listener for the form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const commentInput = document.getElementById('commentInput');
    const files = fileInput.files;
    const comment = commentInput.value.trim();

    if (files.length === 0) {
        // alert('Please select at least one image to upload.');
        return;
    }

    if (comment === '') {
        // alert('Please write a comment.');
        return;
    }

    const storedData = JSON.parse(localStorage.getItem('galleryData')) || [];
    
    for (const file of files) {
        if (!file.type.startsWith('image/')) {
            // alert('Please upload only image files.');
            continue;
        }

        const reader = new FileReader();
        
        reader.onload = function(e) {
            const newItem = {
                image: e.target.result,
                comment: comment
            };

            storedData.push(newItem);
            localStorage.setItem('galleryData', JSON.stringify(storedData));
            renderGallery();
        };
        
        reader.readAsDataURL(file);
    }

    // Clear the form
    fileInput.value = '';
    commentInput.value = '';
});

// Initial render of gallery on page load
window.onload = function() {
    renderGallery();
};

