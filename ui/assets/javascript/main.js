var divUserAct = document.querySelector(".header__user-act--list");
var imageBox = document.querySelector(".header__user--image-box");

imageBox.addEventListener("click", () => {
  if (divUserAct.style.display === "") {
    divUserAct.style.display = "block";
  } else {
    divUserAct.style.display = "";
  }
});

window.addEventListener("click", (e) => {
  if (
    divUserAct.style.display === "block" &&
    !imageBox.contains(e.target) &&
    !divUserAct.contains(e.target)
  ) {
    divUserAct.style.display = "";
  }
});

// Xử lý tăng giảm like của bài viết
var allLiked = document.querySelectorAll(".interact-liked");
allLiked.forEach((liked) => {
  liked.addEventListener("click", () => {
    var svgLiked = document.querySelectorAll(".fa-heart");
    var countLiked = document.querySelectorAll(".count-like");

    if (svgLiked[0].style.color === "rgb(237, 43, 72)") {
      svgLiked.forEach((svg) => {
        svg.style.color = "#000";
        svg.style.color = "50%";
      });

      countLiked.forEach((count) => {
        count.innerText = count.innerText * 1 - 1;
      });
    } else {
      svgLiked.forEach((svg) => {
        svg.style.color = "#ed2b48";
        svg.style.color = "100%";
      });

      countLiked.forEach((count) => {
        count.innerText = count.innerText * 1 + 1;
      });
    }
  });
});

// Xử lý xem comment của bài viết
var allComment = document.querySelectorAll(".interact-comment");
allComment.forEach((comment) => {
  comment.addEventListener("click", () => {
    var boxComment = document.querySelector(".box-comment");
    if (boxComment.style.display === "") {
      boxComment.style.display = "flex";
      // Không cho thao tác trên body nữa
      var body = document.getElementsByTagName("BODY")[0];
      body.style.overflow = "hidden";
      body.style.background = "rgba(0,0,0,0.1)";
    }
  });
});

var btn__closeComment = document
  .querySelector(".comment")
  .querySelector(".btn-close");
btn__closeComment.addEventListener("click", () => {
  var boxComment = document.querySelector(".box-comment");
  if (boxComment.style.display === "flex") {
    boxComment.style.display = "";

    // Mở lại thao tác trên body nữa
    var body = document.getElementsByTagName("BODY")[0];
    body.style.overflow = "scroll";
    body.style.background = "";
  }
});

// Check điều kiện click trong hoặc ngoài box
var boxComment = document.querySelector(".box-comment");
boxComment.addEventListener("click", function (e) {
  if (boxComment.style.display === "flex") {
    if (document.querySelector(".comment").contains(e.target)) {
      // No handle
    } else {
      var divComment = document.querySelector(".box-comment");
      if (divComment.style.display === "flex") {
        divComment.style.display = "";

        // Mở lại thao tác trên body nữa
        var body = document.getElementsByTagName("BODY")[0];
        body.style.overflow = "scroll";
        body.style.background = "";
      }
    }
  }
});
