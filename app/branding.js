import {Apis} from "bitsharesjs-ws";

/** This file centralized customization and branding efforts throughout the whole wallet and is meant to facilitate
 *  the process.
 *
 *  @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

/**
 * Determine if we are running on testnet or mainnet
 * @private
 */
function _isTestnet() {
    const chainId = (Apis.instance().chain_id || "4018d784").substr(0, 8);
    if (chainId === "4018d784") {
        return false;
    } else {
        // treat every other chain as testnet, exact would be chainId === "39f5e2ed"
        return true;
    }
}

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
        url: "https://faucet.bitshares.eu/onboarding", // 2017-12-infrastructure worker proposal
        show: true,
        editable: false
    };
}

/**
 * Logo that is used throughout the UI
 * @returns {*}
 */
export function getLogo() {
    return require("assets/logo-ico-blue.png");
}

export function getLogoSmall() {
    return require("assets/logo-small.png");
}

export function getLogoDark() {
    return require("assets/icon-dark.png");
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
export function getUnits() {
    if (_isTestnet()) {
        return ["TEST"];
    } else {
        return [
            "BTS",
            "XBTSX.BTC",
            "XBTSX.ETH",
            "XBTSX.STH",
            "USD",
            "CNY",
            "EUR",
            "GBP",
            "RUBLE"
        ];
    }
}

/**
 * These are the highlighted bases in "My Markets" of the exchange
 *
 * @returns {[string]}
 */

export function getMyMarketsBases() {
    return ["BTS", "XBTSX.BTC", "XBTSX.ETH", "XBTSX.STH", "USD", "CNY"];
}

/**
 * These are the default quotes that are shown after selecting a base
 *
 * @returns {[string]}
 */
export function getMyMarketsQuotes() {
    let tokens = {
        nativeTokens: [
            //"BTC",
            "BTS",
            "CNY",
            "EUR",
            "GOLD",
            "KRW",
            "JPY",
            "RUBLE",
            "SILVER",
            "USD",
            "AUD",
            "MXN"
        ],
        bridgeTokens: ["BRIDGE.BCO"],
        gdexTokens: ["GDEX.EOS", "GDEX.NEO"],
        openledgerTokens: ["OBITS"],
        rudexTokens: [],
        sparkTokens: ["ZEPH"],
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
            // "XBTSX.DCNT",
            "XBTSX.VRM",
            "XBTSX.MDL",
            "XBTSX.SKY",
            "XBTSX.SLB",
            "XBTSX.GRS",
            // "XBTSX.MNX",
            "XBTSX.XSM",
            "XBTSX.XBB",
            "XBTSX.NOBT",
            "XBTSX.EXR",
            // "XBTSX.LCRT",
            "XBTSX.PAISA",
            "XBTSX.BCCX",
            "XBTSX.GUAP"
            //"XBTSX.BNB"
        ],
        otherTokens: ["CVCOIN", "ICOO", "STEALTH", "YOYOW", "EVRAZ"]
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
        ["USD", "XBTSX.STH"],
        ["USD", "XBTSX.BTC"],
        ["USD", "XBTSX.ETH"],
        ["USD", "XBTSX.DASH"],
        ["USD", "XBTSX.DOGE"],
        ["USD", "XBTSX.LTC"],
        ["USD", "OPEN.BTC"],
        ["USD", "OPEN.USDT"],
        ["USD", "OPEN.ETH"],
        ["USD", "OPEN.DASH"],
        ["USD", "GOLD"],
        ["USD", "HERO"],
        ["USD", "GDEX.BTC"],
        ["USD", "GDEX.ETH"],
        ["USD", "GDEX.EOS"],
        ["USD", "GDEX.BTO"],
        ["USD", "OPEN.EOSDAC"],
        ["USD", "OPEN.STEEM"],
        ["USD", "OPEN.MAID"],
        ["CNY", "BTS"],
        ["CNY", "XBTSX.STH"],
        ["CNY", "XBTSX.BTC"],
        ["CNY", "XBTSX.ETH"],
        ["CNY", "XBTSX.DASH"],
        ["CNY", "XBTSX.DOGE"],
        ["CNY", "XBTSX.LTC"],
        ["CNY", "OPEN.BTC"],
        ["CNY", "USD"],
        ["CNY", "OPEN.ETH"],
        ["CNY", "YOYOW"],
        ["CNY", "OCT"],
        ["CNY", "GDEX.BTC"],
        ["CNY", "GDEX.ETH"],
        ["CNY", "GDEX.EOS"],
        ["CNY", "GDEX.BTO"],
        ["CNY", "GDEX.BTM"],
        ["CNY", "GDEX.SEER"],
        ["CNY", "GDEX.BKBT"],
        ["CNY", "GDEX.USDT"],
        ["CNY", "GDEX.GXC"],
        ["XBTSX.BTC", "XBTSX.STH"],
        ["XBTSX.BTC", "XBTSX.ETH"],
        ["XBTSX.BTC", "XBTSX.DASH"],
        ["XBTSX.BTC", "XBTSX.DOGE"],
        ["XBTSX.BTC", "XBTSX.LTC"],
        ["XBTSX.BTC", "OPEN.BTC"],
        ["OPEN.BTC", "BTS"],
        ["OPEN.BTC", "OPEN.DGD"],
        ["OPEN.BTC", "OPEN.STEEM"],
        ["OPEN.BTC", "XBTSX.STH"],
        ["BTS", "OPEN.ETH"],
        ["BTS", "OPEN.EOS"],
        ["BTS", "PPY"],
        ["BTS", "OPEN.STEEM"],
        ["BTS", "OBITS"],
        ["BTS", "RUBLE"],
        ["BTS", "HERO"],
        ["BTS", "OCT"],
        ["BTS", "SILVER"],
        ["BTS", "GOLD"],
        ["BTS", "BTWTY"],
        ["BTS", "SMOKE"],
        ["BTS", "GDEX.BTC"],
        ["BTS", "GDEX.ETH"],
        ["BTS", "GDEX.EOS"],
        ["BTS", "GDEX.BTO"],
        ["BTS", "GDEX.USDT"],
        ["BTS", "OPEN.EOSDAC"],
        ["OPEN.USDT", "OPEN.BTC"],
        ["OPEN.BTC", "OPEN.MAID"],
        ["BTS", "OPEN.MAID"],
        ["BTS", "OPEN.HEAT"],
        ["BTS", "OPEN.INCENT"],
        ["BTS", "XBTSX.STH"],
        ["BTS", "XBTSX.POST"],
        ["BTS", "XBTSX.WAVES"],
        ["BTS", "XBTSX.ETH"],
        ["BTS", "XBTSX.MDL"],
        ["BTS", "XBTSX.NVC"],
        ["BTS", "XBTSX.NMC"],
        ["BTS", "XBTSX.DOGE"],
        ["BTS", "XBTSX.BTC"],
        ["BTS", "XBTSX.UNI"],
        ["BTS", "XBTSX.STEEP"],
        ["BTS", "XBTSX.COF"],
        ["BTS", "XBTSX.SLB"],
        ["BTS", "XBTSX.SKY"],
        ["XBTSX.STH", "XBTSX.POST"],
        ["XBTSX.STH", "XBTSX.WAVES"],
        ["XBTSX.STH", "XBTSX.ETH"],
        ["XBTSX.STH", "XBTSX.MDL"],
        ["XBTSX.STH", "XBTSX.NVC"],
        ["XBTSX.STH", "XBTSX.NMC"],
        ["XBTSX.STH", "XBTSX.DOGE"],
        ["XBTSX.STH", "XBTSX.BTC"],
        ["XBTSX.STH", "XBTSX.UNI"],
        ["XBTSX.STH", "XBTSX.STEEP"],
        ["XBTSX.STH", "XBTSX.COF"],
        ["XBTSX.STH", "XBTSX.SLB"],
        ["XBTSX.STH", "XBTSX.SKY"],
        ["XBTSX.STH", "RUBLE"],
        ["BTS", "ZEPH"],
        ["BTS", "HERTZ"]
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
        // "RUDEX.",
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
            // "RUDEX",
            // "BRIDGE",
            "GDEX",
            "XBTSX",
            "SPARKDEX"
            //"CITADEL"
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

export function getConfigurationAsset() {
    let assetSymbol = null;
    if (_isTestnet()) {
        assetSymbol = "NOTIFICATIONS";
    } else {
        assetSymbol = "TEST";
    }
    // explanation will be parsed out of the asset description (via split)
    return {
        symbol: assetSymbol,
        explanation:
            "This asset is used for decentralized configuration of the BitShares UI placed under bitshares.org."
    };
}
