import Joi from "joi";

const userSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).trim().required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must be at most 50 characters long",
  }),

  last_name: Joi.string().min(2).max(50).trim().optional().messages({
    "string.base": "Last name must be a string",
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must be at most 50 characters long",
  }),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .max(128)
    .trim()
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "string.max": "Email must be at most 128 characters long",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/) // Enforce numeric phone number with exactly 10 digits
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits long",
      "string.empty": "Phone number is required",
    }),
});

const passwordSchema = Joi.string()
  .min(8)
  .max(20)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$"))
  .trim()
  .optional()
  .messages({
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be at most 20 characters long",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    "string.empty": "Password is required",
  });

export const validateUser = (user) => {
  const { error } = userSchema.validate(user, { abortEarly: false });
  if (error) {
    error.errors = [{ message: error.details[0].message }];
    console.log(error.errors[0].message);
    throw error;
  }
};

export const validatePassword = (password) => {
  const { error } = passwordSchema.validate(password, { abortEarly: false });
  if (error) {
    error.errors = [{ message: error.details[0].message }];
    console.log(error);
    throw error;
  }
};
