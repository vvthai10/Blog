import {
  updateData,
  createData,
  removeBlog,
  recycleBlog,
  deleteBlog,
} from "./login";

export function handleUser() {
  // Các thẻ liên quan đến việc thả cảm xúc
  const divIdUser = document.querySelector(".idUser");
  var divLikes = document.querySelectorAll(".interact-liked");
  var svgLikes = document.querySelectorAll(".fa-heart");
  var countLikes = document.querySelectorAll(".count-like");

  // 1. VIỆC THÍCH BÀI VIẾT
  // 1.1 Khi render ra
  const divCheck = document.querySelector(".active-heart");
  if (divCheck) {
    svgLikes.forEach((svg) => {
      svg.style.color = "#ed2b48";
      svg.style.opacity = "100%";
      svg.classList.remove("active-heart");
    });
  }

  // 1.2 Khi thực hiện tương tác
  if (divLikes) {
    divLikes.forEach((like) => {
      like.addEventListener("click", () => {
        // Nếu đăng nhập thì mới cho thực hiện thao tác
        if (divIdUser) {
          var liked = false;

          // Cập nhật trên giao diện
          if (svgLikes[0].style.color === "rgb(237, 43, 72)") {
            svgLikes.forEach((svg) => {
              svg.style.color = "#000";
              svg.style.opacity = "50%";
            });

            countLikes.forEach((count) => {
              count.innerText = count.innerText * 1 - 1;
            });
          } else {
            liked = true;

            svgLikes.forEach((svg) => {
              svg.style.color = "#ed2b48";
              svg.style.opacity = "100%";
              svg.classList.add("active-heart");
            });

            countLikes.forEach((count) => {
              count.innerText = count.innerText * 1 + 1;
            });
          }

          const id = divIdUser.innerText;
          const blog = document.querySelector(".idBlog").innerText;

          // Kiểm tra đã tồn tại nó trong cơ sở dữ liệu hay chưa
          var hasInData = !liked;
          // Xem thử có bình luận không
          const allCommend = document.querySelectorAll(
            ".comment__detail--title"
          );
          allCommend.forEach((comment) => {
            console.log(comment.getAttribute("id"));
            if (comment.getAttribute("id") === id) {
              console.log("It is exist");
              hasInData = true;
            }
          });

          // Cập nhật trên cơ sở dữ liệu
          if (hasInData) {
            updateData({ id, blog, liked });
          } else {
            createData({ id, blog, liked });
          }
        }
      });
    });
  }
}

export function handleWriteReview() {
  // Lấy các thẻ phục vụ trong việc xử lý viết bình luận
  var inputComment = document.querySelector(".comment__input");
  const btnDelComment = document.querySelector(".comment__btn--del");
  const btnSendComment = document.querySelector(".comment__btn--take");

  if (inputComment && btnDelComment && btnSendComment) {
    btnDelComment.addEventListener("click", () => {
      if (inputComment.value.trim() !== "") {
        inputComment.value = "";
      }
    });

    btnSendComment.addEventListener("click", () => {
      if (inputComment.value.trim() !== "") {
        const divIdUser = document.querySelector(".idUser");
        const id = divIdUser.innerText;
        const blog = document.querySelector(".idBlog").innerText;
        var svgLike = document.querySelector(".fa-heart");

        var comment = inputComment.value.trim();

        if (svgLike.style.color === "rgb(237, 43, 72)") {
          updateData({ id, blog, comment });
        } else {
          createData({ id, blog, comment });
        }
      }
    });
  }
}

export function handleBlog() {
  const btnRemove = document.querySelectorAll("#btn-remove-blog");
  const btnRecycle = document.querySelectorAll("#btn-recycle-blog");
  const btnDeleted = document.querySelectorAll("#btn-deleted-blog");

  if (btnRemove) {
    btnRemove.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        removeBlog(e.target.getAttribute("slug"));
      });
    });
  }

  if (btnRecycle) {
    btnRecycle.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        recycleBlog(e.target.getAttribute("slug"));
      });
    });
  }

  if (btnDeleted) {
    btnDeleted.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteBlog(e.target.getAttribute("slug"));
      });
    });
  }
}
