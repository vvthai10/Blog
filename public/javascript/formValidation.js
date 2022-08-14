import {
  login,
  signup,
  postBlog,
  changeInfoUser,
  changePhotoUser,
  changePassword,
} from "./login";

export function Validator(formSelector, type) {
  var _this = this;

  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var formRules = {}; // name | rules

  //Quy ước tạo rule:
  // - Nếu có lỗi thì return error message
  // - Nếu không có lỗi thì return undefined
  var validatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập trường này";
    },
    email: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui lòng nhập email";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui lòng nhập ít nhất ${min} kí tự`;
      };
    },
    max: function (max) {
      return function (value) {
        return value.length <= max
          ? undefined
          : `Vui lòng nhập tối đa ${max} kí tự`;
      };
    },
  };
  //Lấy ra form element theo id
  var formElement = document.querySelector(formSelector);

  //Kiểm tra xem form có tồn tại không rồi mới cho phép xử lý
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");
    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");

      for (var rule of rules) {
        var rulesInfo;
        var isRuleHasValue = rule.includes(":");
        if (isRuleHasValue) {
          rulesInfo = rule.split(":");

          rule = rulesInfo[0];
        }

        var ruleFunc = validatorRules[rule];

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(rulesInfo[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }

      //Lắng nghe các sự kiện để validator

      input.onblur = handleValidate;
      input.oninput = handleClearValidate;
    }
  }

  //Hàm thực hiện validate
  function handleValidate(event) {
    var rules = formRules[event.target.name];
    var errorMessage;
    for (var rule of rules) {
      errorMessage = rule(event.target.value);
      if (errorMessage) break;
    }

    //Nếu có lỗi thì hiện thị message lỗi ra ui
    if (errorMessage) {
      var formGroup = getParent(event.target, ".form-group");
      if (formGroup) {
        formGroup.classList.add("invalid");

        var formMessage = formGroup.querySelector(".form-message");
        if (formMessage) {
          formMessage.innerText = errorMessage;
        }
      }
    }
    return !errorMessage;
  }

  function handleClearValidate(event) {
    var formGroup = getParent(event.target, ".form-group");
    if (formGroup.classList.contains("invalid")) {
      formGroup.classList.remove("invalid");
      var formMessage = formGroup.querySelector(".form-message");
      if (formMessage) {
        formMessage.innerText = "";
      }
    }
  }

  //Xử lý hành vi submit
  formElement.onsubmit = function (event) {
    event.preventDefault();
    var inputs = formElement.querySelectorAll("[name][rules]");
    var isValid = true;
    for (var input of inputs) {
      isValid = handleValidate({ target: input });
    }
    //Khi không có lỗi thì submit form
    if (isValid) {
      // Đăng nhập tài khoản mới
      if (type === "login") {
        login(inputs[0].value, inputs[1].value);
      }
      // Đăng kí tài khoản mới
      else if (type === "signup") {
        signup(
          inputs[0].value,
          inputs[1].value,
          inputs[2].value,
          inputs[3].value
        );
      }
      // Tạo blog mới
      else if (type === "postBlog") {
        const divIdUser = document.querySelector(".idUser");
        const id = divIdUser.innerText;
        // console.log(inputs[0].value, inputs[1].value, inputs[2].value, id);
        postBlog(inputs[0].value, inputs[1].value, inputs[2].value, id);
      }
      // Thay đổi các thông tin của user
      else if (type === "changeInfoUser") {
        const divIdUser = document.querySelector(".idUser");
        const id = divIdUser.innerText;

        const nameCurrent = document.querySelector(".nameUserHidden").innerText;
        const emailCurrent =
          document.querySelector(".emailUserHidden").innerText;

        const inputPath = document.querySelector("#photo.form__upload");

        if (nameCurrent != inputs[0].value || emailCurrent != inputs[1].value) {
          console.log("Chỉnh sửa bài viết");
          changeInfoUser(inputs[0].value, inputs[1].value, id);
        } else if (inputPath.value) {
          console.log("Cập nhật hình ảnh...");
          // formElement.submit();
          changePhotoUser(formElement, id);
        }
      }
      // Thay đổi mật khẩu của user
      else if (type === "changePassword") {
        const divIdUser = document.querySelector(".idUser");
        const id = divIdUser.innerText;

        changePassword(inputs[0].value, inputs[1].value, inputs[2].value, id);
      }
    }
  };
}
