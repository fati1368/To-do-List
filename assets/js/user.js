function reviewsFn() {
  var nextBtn = document.getElementById("nextReviwe");
  var prevBtn = document.getElementById("prevReviwe");

  function renderReviwe(reviews) {
    var name = (document.getElementById("name-reviwe").innerHTML =
      reviews.name);
    var job = (document.getElementById("job-reviwe").innerHTML = reviews.job);
    var text = (document.getElementById("text-reviwe").innerHTML =
      reviews.text);
    var img = document
      .getElementById("img-reviwe")
      .setAttribute("src", reviews.img);
  }
  var itemIndex = 0;
  renderReviwe(reviews[itemIndex]);
  nextBtn.addEventListener("click", function () {
    itemIndex++;
    if (itemIndex > reviews.length - 1) {
      itemIndex = 0;
    }
    renderReviwe(reviews[itemIndex]);
  });
  prevBtn.addEventListener("click", function () {
    itemIndex--;
    if (itemIndex < 0) {
      itemIndex = reviews.length - 1;
    }
    renderReviwe(reviews[itemIndex]);
  });
}
