export const PLANS = [
  {
    name: "Free",
    slug: "free",
    numberOfOrgs: 1,
    numberOfEmployees: 5,
    numberOfProjects: 1,
    numberOfForms: 5,
    numberOfSubmmissions: 100,
    offlineSubmission: true,
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
      },
    },
  },
  {
    name: "Community",
    slug: "community",
    numberOfOrgs: 3,
    numberOfEmployees: 40,
    numberOfProjects: 10,
    numberOfForms: 100,
    numberOfSubmmissions: 1000,
    offlineSubmission: true,
    price: {
      amount: 20,
      priceIds: {
        test: "price_1O5Z5KKbQRs1dkxvC34iDfoS",
        production: "",
      },
    },
  },
  {
    name: "Pro",
    slug: "pro",
    numberOfOrgs: 5,
    numberOfEmployees: 70,
    numberOfProjects: 20,
    numberOfForms: 500,
    numberOfSubmmissions: 10000,
    offlineSubmission: true,
    price: {
      amount: 50,
      priceIds: {
        test: "price_1O5Z6vKbQRs1dkxv49exxLRO",
        production: "",
      },
    },
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    numberOfOrgs: "unlimited",
    numberOfEmployees: "unlimited",
    numberOfProjects: "unlimited",
    numberOfForms: "unlimited",
    numberOfSubmmissions: "unlimited",
    offlineSubmission: true,
    price: {
      amount: 100,
      priceIds: {
        test: "price_1O5Z9TKbQRs1dkxvCDhzfObd",
        production: "",
      },
    },
  },
];
