/** This file centralized customization and branding efforts throughout the whole wallet and is meant to facilitate
 *  the process.
 *
 *  @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

/**
 * Wallet name that is used throughout the UI and also in translations
 * @returns {string}
 */
export function getWalletName() {
    return "XBTS";
}

/**
 * URL of this wallet
 * @returns {string}
 */
export function getWalletURL() {
    return "https://ex.xbts.io";
}

/**
 * Returns faucet information
 *
 * @returns {{url: string, show: boolean}}
 */
export function getFaucet() {
    return {
        url: "https://faucet.bitshares.eu/onboarding", // https://faucet.rudex.org //"https://faucet.bitshares.eu/onboarding", // 2017-12-infrastructure worker proposal
        show: false,
        editable: false
    };
}

/**
 * Logo that is used throughout the UI
 * @returns {*}
 */
export function getLogo() {
    return require("assets/logo-xbts.png");
}

/**
 * Default set theme for the UI
 * @returns {string}
 */
export function getDefaultTheme() {
    // possible ["darkTheme", "lightTheme", "midnightTheme"]
    return "midnightTheme";
}

/**
 * Default login method. Either "password" (for cloud login mode) or "wallet" (for local wallet mode)
 * @returns {string}
 */
export function getDefaultLogin() {
    // possible: one of "password", "wallet"
    return "password";
}

/**
 * Default units used by the UI
 *
 * @returns {[string,string,string,string,string,string]}
 */
export function getUnits(chainId = "4018d784") {
    if (chainId === "4018d784")
        return ["BTS", "USD", "CNY", "BTC", "EUR", "GBP", "RUBLE"];
    else if (chainId === "39f5e2ed") return ["TEST"];
    // unknown chain id: (need to return at least one unit)
    else return ["BTS"];
}

/**
 * These are the highlighted bases in "My Markets" of the exchange
 *
 * @returns {[string]}
 */

export function getMyMarketsBases() {
    return [
        "BTS",
        "XBTSX.BTC",
        "XBTSX.STH",
        "XBTSX.ETH",
        "USD",
        "CNY",
        "RUBLE"
    ];
}

/**
 * These are the default quotes that are shown after selecting a base
 *
 * @returns {[string]}
 */
export function getMyMarketsQuotes() {
    let tokens = {
        nativeTokens: [
            // "BTC",
            "BTS",
            "CNY",
            "EUR",
            "GOLD",
            "RUBLE",
            "SILVER",
            "USD",
            "KRW",
            "MXN",
            "JPY"
        ],
        bridgeTokens: ["BRIDGE.BCO"],
        gdexTokens: [],
        openledgerTokens: [],
        rudexTokens: [],
        sparkTokens: [],
        winTokens: [],
        xbtsxTokens: [
            "XBTSX.STH",
            "XBTSX.POST",
            "XBTSX.DOGE",
            "XBTSX.BTC",
            "XBTSX.LTC",
            "XBTSX.DASH",
            "XBTSX.KEC",
            "XBTSX.BTG",
            "XBTSX.XSPEC",
            "XBTSX.NVC",
            "XBTSX.42",
            "XBTSX.UNI",
            "XBTSX.NMC",
            "XBTSX.WAVES",
            "XBTSX.COF",
            "XBTSX.XRUP",
            "XBTSX.P2P",
            "XBTSX.STEEP",
            "XBTSX.BBI",
            "XBTSX.ETH",
            "XBTSX.AHT",
            "XBTSX.WIX",
            "XBTSX.ONION",
            "XBTSX.EGC",
            "XBTSX.BCH",
            "XBTSX.VRC",
            "XBTSX.MAG",
            "XBTSX.DCNT",
            "XBTSX.VRM",
            "XBTSX.MDL",
            "XBTSX.SKY",
            "XBTSX.SLB",
            "XBTSX.GRS",
            "XBTSX.MNX",
            "XBTSX.XSM"
        ],
        otherTokens: [
            "EVRAZ",
            // "CVCOIN",
            "YOYOW",
            "INTFREE"
        ]
    };

    let allTokens = [];
    for (let type in tokens) {
        allTokens = allTokens.concat(tokens[type]);
    }
    return allTokens;
}

/**
 * The featured markets displayed on the landing page of the UI
 *
 * @returns {list of string tuples}
 */
export function getFeaturedMarkets(quotes = []) {
    return [
        ["USD", "BTS"],
        ["USD", "GOLD"],
        ["CNY", "BTS"],
        ["CNY", "USD"],
        ["BTS", "RUBLE"],
        ["BTS", "SILVER"],
        ["BTS", "GOLD"],
        ["BTS", "XBTSX.STH"],
        ["BTS", "XBTSX.ETH"],
        ["BTS", "XBTSX.BTC"],
        ["BTS", "XBTSX.WAVES"],
        ["BTS", "XBTSX.COF"],
        ["BTS", "XBTSX.XRUP"],
        ["BTS", "XBTSX.EGC"]
    ].filter(a => {
        if (!quotes.length) return true;
        return quotes.indexOf(a[0]) !== -1;
    });
}

/**
 * Recognized namespaces of assets
 *
 * @returns {[string,string,string,string,string,string,string]}
 */
export function getAssetNamespaces() {
    return [
        "OPEN.",
        "RUDEX.",
        "BRIDGE.",
        "GDEX.",
        "XBTSX.",
        "SPARKDEX.",
        "CITADEL."
    ];
}

/**
 * These namespaces will be hidden to the user, this may include "bit" for BitAssets
 * @returns {[string,string]}
 */
export function getAssetHideNamespaces() {
    // e..g "OPEN.", "bit"
    return ["XBTSX."];
}

/**
 * Allowed gateways that the user will be able to choose from in Deposit Withdraw modal
 * @param gateway
 * @returns {boolean}
 */
export function allowedGateway(gateway) {
    return (
        [
            "OPEN",
            "RUDEX",
            "BRIDGE",
            "GDEX",
            "XBTSX",
            "SPARKDEX",
            "CITADEL"
        ].indexOf(gateway) >= 0
    );
}

export function getSupportedLanguages() {
    // not yet supported
}

export function getAllowedLogins() {
    // possible: list containing any combination of ["password", "wallet"]
    return ["password", "wallet"];
}
