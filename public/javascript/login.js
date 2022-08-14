import axios from "axios";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      // url: "/cookies-test",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      console.log("Logged in successfully!");
      location.assign("/");
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      // url: "/cookies-test",
      url: "http://127.0.0.1:3000/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      console.log("Sign up in successfully!");
      location.assign("/");
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });
    if ((res.data.status = "success")) location.assign("/");
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const createData = async ({ id, blog, liked, comment }) => {
  console.log("Create interactive....");
  try {
    if (liked === undefined) {
      liked = false;
    }
    if (comment === undefined) {
      comment = "";
    }
    console.log(id, blog, liked, comment);
    const res = await axios({
      method: "POST",
      url: `http://127.0.0.1:3000/api/v1/interactive`,
      data: {
        user: id,
        blog: blog,
        liked: liked,
        comment: comment,
      },
    });

    if (res.data.status === "success") {
      console.log("Create successfully!");
      console.log(res);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const updateData = async ({ id, blog, liked, comment }) => {
  console.log("Update interactive....");
  try {
    var valData;
    if (liked) {
      valData = {
        liked: liked,
      };
    }
    if (comment) {
      valData = {
        comment: comment,
      };
    }
    console.log(id, blog, liked, comment);
    console.log(valData);
    const res = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:3000/api/v1/interactive/${id}/${blog}`,
      data: valData,
    });

    if (res.data.status === "success") {
      console.log("Update successfully!");
      console.log(res);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const postBlog = async (name, description, mainContent, author) => {
  console.log(name, description, mainContent, author);
  const timeRead = 7;
  try {
    const res = await axios({
      method: "POST",
      // url: "/cookies-test",
      url: "http://127.0.0.1:3000/api/v1/blogs",
      data: {
        name,
        description,
        mainContent,
        timeRead,
        author,
      },
    });

    if (res.data.status === "success") {
      console.log("Post blog is successfully!");
      location.assign(`/blog/${res.data.data.newBlog.slug}`);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const removeBlog = async (slug) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:3000/api/v1/blogs/slug/${slug}`,
      data: {
        deleted: true,
      },
    });

    if (res.data.status === "success") {
      console.log("Remove blog is successfully!");
      location.assign(`/me`);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const recycleBlog = async (slug) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:3000/api/v1/blogs/slug/${slug}`,
      data: {
        deleted: false,
      },
    });

    if (res.data.status === "success") {
      console.log("Recycle blog is successfully!");
      location.assign(`/me?recycleBin`);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const deleteBlog = async (slug) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:3000/api/v1/blogs/slug/${slug}`,
      data: {},
    });

    if (res.data.status === "success") {
      console.log("Delete blog is successfully!");
      location.assign(`/me?recycleBin`);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const changeInfoUser = async (name, email, id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:3000/api/v1/users/${id}`,
      data: {
        name,
        email,
      },
    });

    if (res.data.status === "success") {
      console.log("Update user is successfully!");
      location.assign(`/me?setting`);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const changePhotoUser = async (formElement, id) => {
  try {
    var formData = new FormData(formElement);
    var res = await axios.post(
      "http://127.0.0.1:3000/api/v1/uploads/photoUser",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Sau khi cập nhập ảnh vào csdl, tiếp tục cập nhật cho csdl user
    res = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:3000/api/v1/users/${id}`,
      data: {
        photo: res.data.photoNew,
      },
    });

    if (res.data.status === "success") {
      console.log("Update photo is successfully!");
      location.assign(`/me?setting`);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const changePassword = async (currentPass, newPass, confirmPass, id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3000/api/v1/users/updatePassword",
      data: {
        passwordCurrent: currentPass,
        password: newPass,
        passwordConfirm: confirmPass,
        id: id,
      },
    });

    if (res.data.status === "success") {
      console.log("Change password successfully!");
      location.assign(`/me?setting`);
    } else {
      console.log(res.data.message);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};
