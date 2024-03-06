import * as yup from "yup";

const CardInputValidationSchema = () =>
  yup.object().shape({
    cardNumber: yup
      .string()
      .required("Card number is required")
      .matches(
        /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
        "Card number is not valid"
      ),
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[a-zA-Z\s]*$/, "Name is not valid"),
    expiration: yup
      .string()
      .required("Expiration date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
        "Expiration date is not valid"
      )
      .test("is-expired", "The card has expired", (value) => {
        if (!value || value.length < 5) {
          return false;
        }
        const [month, year] = value.split("/");
        const expiryDate = new Date(
          parseInt(year.length === 2 ? `20${year}` : year),
          parseInt(month)
        );
        // The card is considered expired if the expiry date is before the current date
        return expiryDate >= new Date();
      }),
    cvv: yup
      .string()
      .required("CVV is required")
      .matches(/^[0-9]{3,4}$/, "CVV is not valid"),
  });

export default CardInputValidationSchema;
