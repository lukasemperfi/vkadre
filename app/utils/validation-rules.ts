import * as yup from "yup";

const phoneAllowedCharsRegex = /^[0-9+\s().-]+$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Некорректный email")
    .required("Введите email"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Минимум 6 символов"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Введите имя"),
  phone: yup
    .string()
    .trim()
    .matches(phoneAllowedCharsRegex, "Телефон содержит недопустимые символы")
    .test(
      "min-digits",
      " Телефон должен содержать не менее 10 цифр",
      (value) => {
        const digits = String(value ?? "").replace(/\D/g, "");
        return digits.length >= 10;
      },
    )
    .max(25, "Телефон должен содержать не более 25 символов")
    .required("Телефон обязателен"),
  email: yup
    .string()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Некорректный email")
    .required("Введите email"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Минимум 6 символов"),
  confirmPassword: yup
    .string()
    .required("Подтвердите пароль")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

export const forgotSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Некорректный email")
    .required("Введите email"),
});

export const contactsSchema = yup.object({
  name: yup.string().required("Введите имя"),
  phone: yup
    .string()
    .trim()
    .matches(phoneAllowedCharsRegex, "Phone contains invalid characters")
    .test("min-digits", "Phone must contain at least 10 digits", (value) => {
      const digits = String(value ?? "").replace(/\D/g, "");
      return digits.length >= 10;
    })
    .max(25, "Phone must be at most 25 characters")
    .required("Phone is required"),
  selectedService: yup.string().required("Выберите услугу"),
});

export const profileSchema = yup.object({
  name: yup.string().required("Введите имя"),
  phone: yup
    .string()
    .trim()
    .matches(phoneAllowedCharsRegex, "Phone contains invalid characters")
    .test("min-digits", "Phone must contain at least 10 digits", (value) => {
      const digits = String(value ?? "").replace(/\D/g, "");
      return digits.length >= 10;
    })
    .max(25, "Phone must be at most 25 characters")
    .required("Phone is required"),
  email: yup
    .string()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Некорректный email")
    .required("Введите email"),
});
