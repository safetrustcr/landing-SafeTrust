# SafeTrust - Landing Page

SafeTrust is a landing page built with the latest web technologies, designed to provide users with a clean and interactive interface. The project leverages the power of Next.js for server-side rendering and React for a seamless, component-driven user experience.

## Preview

**[View Live Preview](#)** _(pending to add a picture)_

## Technology Stack

SafeTrust is built using the following technologies:

- **Next.js**: ^14.2.15
- **React**: ^18.3.1
- **Tailwind CSS**: ^3.4.14 for styling
- **Web3.js**: Integration with web3-react for Ethereum wallet connection
- **Ethers.js**:  for blockchain interaction
- **TypeScript**: ^5.6.3 for type safety and better developer experience

## Download and Installation

To begin using this project, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/safetrust.git
cd safetrust
npm install
```

#### npm Scripts

* `npm run build` builds the project - this builds assets, HTML, JS, and CSS into `dist`
* `npm run build:assets` copies the files in the `src/assets/` directory into `dist`
* `npm run build:pug` compiles the Pug located in the `src/pug/` directory into `dist`
* `npm run build:scripts` brings the `src/js/scripts.js` file into `dist`
* `npm run build:scss` compiles the SCSS files located in the `src/scss/` directory into `dist`
* `npm run clean` deletes the `dist` directory to prepare for rebuilding the project
* `npm run start:debug` runs the project in debug mode
* `npm start` or `npm run start` runs the project, launches a live preview in your default browser, and watches for changes made to files in `src`

You must have npm installed in order to use this build environment.

## About
About SafeTrust
SafeTrust is a Web3-powered application designed to ensure secure and trustworthy transactions in rental agreements, with a focus on protecting both the renter and the property or asset owner. Utilizing blockchain technology, SafeTrust provides a transparent, efficient, and decentralized platform to manage deposits, transactions, and confirmations, ensuring fairness for all parties involved.

### How It Works
SafeTrust acts as a smart contract intermediary between renters and property or asset owners, ensuring that all terms and conditions are met before any funds are released. A common use case for SafeTrust is in rental agreements, such as renting a house or a car. Here’s how it works:

Rental Agreement Setup: When renting a house, the renter pays a deposit, which is securely held in a smart contract. This ensures that the property owner is protected in case of any damage or breach of terms.

Transaction Safety: The application helps both the renter and the property owner by managing the deposit. If everything is returned in good condition ( for example no damage, no terms breached), the renter’s deposit is released back to them once all conditions are confirmed through SafeTrust's transparent process.

Dispute Resolution: In case of any disputes, the SafeTrust platform provides an automated and transparent process to determine whether the deposit should be refunded, held, or forfeited, based on predefined terms agreed by both parties.

Renting Cars: SafeTrust can also will be applied to rental car agreements. Just like with rental properties, a deposit can be held in the smart contract, and once the car is returned in good condition and all terms are confirmed, the deposit is automatically refunded to the renter.

### Why SafeTrust?
Security: Blockchain technology ensures that funds are securely held and cannot be tampered with, providing peace of mind to both renters and owners.
Transparency: All actions on the platform are recorded on the blockchain, providing a transparent view of the process from start to finish.
Decentralized Trust: SafeTrust removes the need for intermediaries, providing a decentralized and trustless environment for managing rental agreements.
Automated Process: The platform automates the entire process, from deposit collection to refunding the renter, minimizing human error and inefficiencies.
SafeTrust is the future of secure transactions for rental agreements, whether it’s for a house, car, or any other rental asset. By leveraging the power of blockchain, SafeTrust ensures both parties in the transaction are protected and treated fairly, fostering trust and reliability in an otherwise uncertain space.

## Copyright and License

Copyright 2024 SafeTrust. Code released under the [MIT](https://github.com/safetrustcr) license.
