export const Bounty = `
    type Bounty {
        externalUuid: String
        amount: Float
        currencyType(type: CurrencyType = USD): String
    }
`;
