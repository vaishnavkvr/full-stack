function addReview() {
    var reviewInput = document.getElementById('reviewInput');
    var reviewsContainer = document.getElementById('reviews-container');

    if (reviewInput.value.trim() !== '') {
        // Create a new review element
        var reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.textContent = reviewInput.value;

        // Append the review to the reviews container
        reviewsContainer.appendChild(reviewElement);

        // Clear the input field
        reviewInput.value = '';
    }
}
