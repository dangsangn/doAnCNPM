function Validator(options) {
  //object luu cac ham rule voi key la idElemment tuong ung
  let selectorRules = {};

  //lay cha selector cua inputElement
  function isParent(inputElement, selector) {
    while (inputElement.parentElement) {
      if (inputElement.parentElement.matches(selector)) {
        //console.log(this);
        return inputElement.parentElement;
      }
      inputElement = inputElement.parentElement;
    }
  }

  //ham kiem tra input da hop le chua
  function validate(inputElement, rule) {
    let errorMessage;
    let errorElement = isParent(
      inputElement,
      options.formGroupElement
    ).querySelector(options.errorElement);

    //duyet qua cac ham test trong selectorRules co key la idElement
    //tra ve loi cho message
    for (let test of selectorRules[rule.idElement]) {
      switch (inputElement.type) {
        case "checkbox":
          errorMessage = test(
            formElenment.querySelector(rule.idElement + ":checked")
          );
          break;
        case "radio":
          errorMessage = test(
            formElenment.querySelector(rule.idElement + ":checked")
          );
          break;
        default:
          errorMessage = test(inputElement.value);
      }

      if (errorMessage) {
        break;
      }
    }
    if (errorMessage) {
      errorElement.innerHTML = errorMessage;
      isParent(inputElement, options.formGroupElement).classList.add("invalid");
    } else {
      errorElement.innerHTML = "";
      isParent(inputElement, options.formGroupElement).classList.remove(
        "invalid"
      );
    }
    return !errorMessage;
  }

  //lay node form
  let formElenment = document.querySelector(options.form);
  if (formElenment) {
    let rules = options.rules;

    formElenment.onsubmit = function (e) {
      e.preventDefault();

      let isValidForm = true;
      //duyet qua tat ca cac rule
      rules.forEach((rule) => {
        //
        let inputElement = formElenment.querySelector(rule.idElement);
        // console.log(inputElement);
        let isValidate = validate(inputElement, rule);
        //console.log(isValidate);
        if (isValidate === false) {
          // neu co loi
          isValidForm = false;
        }
      });

      if (isValidForm === true) {
        //neu khong co loi
        //truong hop submit bang javascript
        // if (typeof options.onSubmit === "function") {
        //   let enabledInputs = formElenment.querySelectorAll(
        //     "[name]:not([disabled])"
        //   );
        //   //tra ve mot objec co key: name va gia tri la value cua tung element
        //   let formInfo = Array.from(enabledInputs).reduce((values, input) => {
        //     switch (input.type) {
        //       case "checkbox":
        //         // if (!input.matches(':checked')) {
        //         //     values[input.name] = '';
        //         //     return values;
        //         // }
        //         if (!Array.isArray(values[input.name])) {
        //           values[input.name] = [];
        //         }
        //         if (input.matches(":checked")) {
        //           values[input.name].push(input.value);
        //         }
        //         break;
        //       case "radio":
        //         if (input.matches(":checked")) {
        //           values[input.name] = input.value;
        //         }
        //         break;
        //       case "file":
        //         values[input.name] = input.files;
        //         break;
        //       default:
        //         values[input.name] = input.value;
        //     }
        //     console.log(values);
        //     return values;
        //   }, {});
        //   options.onSubmit(formInfo);
        // }
        // //truong hop submit mac dinh html submit
        // else {
        //   formElenment.submit();
        // }
      } else {
        // console.log('loi');
      }
    };

    rules.forEach((rule) => {
      //lap qua cac phan tu rule, neu key object da co thi push vao, con khong thi tao mang
      if (Array.isArray(selectorRules[rule.idElement])) {
        //neu da ton tai key thi push
        selectorRules[rule.idElement].push(rule.test);
      } else {
        // khong thi tao mang de luu
        selectorRules[rule.idElement] = [rule.test];
      }

      let inputElements = formElenment.querySelectorAll(rule.idElement);
      Array.from(inputElements).forEach((inputElement) => {
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        //xu ly moi khi nguoi dung nhap vao input
        inputElement.oninput = function () {
          let errorElement = isParent(
            inputElement,
            options.formGroupElement
          ).querySelector(options.errorElement);
          //console.log(errorElement);
          errorElement.innerHTML = "";
          isParent(inputElement, options.formGroupElement).classList.remove(
            "invalid"
          );
        };
      });
    });

    //console.log(selectorRules);
  } else {
  }
}

Validator.isRequired = function (idElement, message) {
  return {
    idElement: idElement,
    test: function (value) {
      return value ? undefined : message || "Vui long nhap vao!";
    },
  };
};

Validator.isEmail = function (idElement, message) {
  return {
    idElement: idElement,
    test: function (value) {
      let regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(value)
        ? undefined
        : message || "Vui long nhap dinh dang chinh xac!";
    },
  };
};

Validator.isExactNumber = (idElement, number, message) => {
  return {
    idElement: idElement,
    test: (value) => {
      return value.length === number && value[0] === "0" ? undefined : message;
    },
  };
};

Validator.isMinLeng = function (idElement, minLeng, message) {
  return {
    idElement: idElement,
    test: function (value) {
      return value.length >= minLeng
        ? undefined
        : message || `Mat khau be hon ${minLeng}`;
    },
  };
};

Validator.isConfirmate = function (idElement, func, message) {
  return {
    idElement: idElement,
    test: function (value) {
      return value === func()
        ? undefined
        : `${message}` || "Nhap lai khong chinh xac";
    },
  };
};

export default Validator;
