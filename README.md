# Project Name

## Description

This project is a mobile application built with React Native. It allows users to make payments with their credit cards. The application uses the Omise API for payment processing. I only test this app on ios.

Flow: 
 - When user add credit card info, it is store in keychain, which is not recommended for security reason. Ideally we would store only card token on the backend but Omise only return one-time use token. So instead of storing card details on BE, I decided to use keychain instead. If we want to increase security, we can consider encrypt it.
 - When card is added, and user pay with a certain amount. We send token and the amount to BE to process, which is recommended method [https://docs.opn.ooo/collecting-card-information/thailand]
 - Receive status and render status from BE

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/username/project.git`
2. Install the dependencies: `npm install`
3. `npx expo run:ios`
3. `cd ios && pod install`
4. Start the project: `npm start`
5. Start BE project: See on BE 

## Features

- Users can enter their credit card information.
- Users can enter the amount they want to pay.
- Users can make a payment.
- Users can see a confirmation message after a successful payment.

## Technologies Used

- React Native
- TypeScript
- Axios
- Omise API

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)