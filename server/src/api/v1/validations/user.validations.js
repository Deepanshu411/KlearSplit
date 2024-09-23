import Joi from "joi";

const userSchema = Joi.object({
  first_name: Joi.string()
  .min(2)
  .max(50)
  .trim()
  .when('$isUpdate', {
    is: true,
    then: Joi.optional(),
    otherwise: Joi.required()
  })
  .messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must be at most 50 characters long",
  }),

  last_name: Joi.string()
  .min(2)
  .max(50)
  .trim()
  .optional()
  .messages({
    "string.base": "Last name must be a string",
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must be at most 50 characters long",
  }),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .max(128)
    .trim()
    .when('$isUpdate', {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required()
    })
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "string.max": "Email must be at most 128 characters long",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/) // Enforce numeric phone number with exactly 10 digits
    .when('$isUpdate', {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required()
    })
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits long",
      "string.empty": "Phone number is required",
    }),

  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$"))
    .trim()
    .optional()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 20 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase character, one lowercase character, and one number",
      "string.empty": "Password is required",
    }),

  image_url: Joi.string()
    .uri({ scheme: ['http', 'https'] }) 
    .max(255) 
    .trim()
    .optional()
    .messages({
        'string.uri': 'Image URL must be a valid URL and should start with http or https.',
        'string.max': 'Image URL must be less than or equal to 255 characters.',
    }),

  notification_settings: Joi.number()
    .integer() 
    .min(0) 
    .max(63)
    .optional()
    .messages({
        'number.integer': 'Notification settings must be an integer.',
        'number.min': 'Notification settings must be at least 0.',
        'number.max': 'Notification settings must be at most 63.'
    }), 
});

export const createUserValidation = (user) => {
  const { error } = userSchema.validate(user, { abortEarly: false, context: { isUpdate: false } });
  if (error) {
    error.errors = [{ message: error.details[0].message }];
    console.log(error.errors[0].message);
    throw error;
  }
};

export const updateUserValidation = (user) => {
  const { error } = userSchema.validate(user, { abortEarly: false, context: { isUpdate: true } });
  if (error) {
    error.message = error.details[0].message;
    throw error;
  }
};
