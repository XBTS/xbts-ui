/**
 * Settings storage for all Gateway Services
 * General API Settings are stored in api/apiConfig and should be imported here
 */

import {xbtsxAPIs, wavesAPIs, ethAPIs, bscAPIs, eosAPIs} from "api/apiConfig";
import {allowedGateway} from "branding";
import {isGatewayTemporarilyDisabled} from "../chain/onChainConfig";
import SettingsStore from "stores/SettingsStore";

const _isEnabled = gatewayKey => {
    return async function(options = {}) {
        if (__DEV__) {
            console.log("Checking " + gatewayKey + " gateway ...");
        }
        if (!options.onlyOnChainConfig) {
            // is the gateway configured in branding?
            const setInBranding = allowedGateway(gatewayKey);
            if (!setInBranding) {
                if (__DEV__) {
                    console.log("  ... disabled in branding.js");
                }
                return false;
            } else {
                if (!!options.onlyBranding) {
                    if (__DEV__) {
                        console.log("  ... may be used!");
                    }
                    return true;
                }
            }
        }
        // is it deactivated on-chain?
        const temporarilyDisabled = await isGatewayTemporarilyDisabled(
            gatewayKey
        );
        if (temporarilyDisabled) {
            if (__DEV__) {
                console.log("  ... disabled on-chain");
            }
            return false;
        } else {
            if (!!options.onlyOnChainConfig) {
                if (__DEV__) {
                    console.log("  ... may be used!");
                }
                return true;
            }
        }
        // has the user filtered it out?
        let filteredServiceProviders = SettingsStore.getState().settings.get(
            "filteredServiceProviders",
            []
        );
        if (!filteredServiceProviders) {
            filteredServiceProviders = [];
        }
        let userAllowed = false;
        if (
            filteredServiceProviders.length === 1 &&
            filteredServiceProviders[0] === "all"
        ) {
            userAllowed = true;
        } else {
            userAllowed = filteredServiceProviders.indexOf(gatewayKey) >= 0;
        }
        if (!userAllowed) {
            if (__DEV__) {
                console.log("  ... disabled by user");
            }
            return false;
        }
        if (__DEV__) {
            console.log("  ... may be used!");
        }
        return true;
    };
};

export const availableGateways = {
    XBTSX: {
        id: "XBTSX",
        name: "XBTS Native Chains",
        baseAPI: xbtsxAPIs,
        isEnabled: _isEnabled("XBTSX"),
        isSimple: true,
        selected: false,
        addressValidatorMethod: "POST",
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://xbts.io/",
        wallet: "https://ex.xbts.io/"
    },
    ETH: {
        id: "ETH",
        name: "ETH",
        baseAPI: ethAPIs,
        isEnabled: _isEnabled("ETH"),
        isSimple: true,
        selected: false,
        simpleAssetGateway: false,
        addressValidatorMethod: "POST",
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://xbts.io/",
        wallet: "https://ex.xbts.io/"
    },
    BSC: {
        id: "BSC",
        name: "BSC",
        baseAPI: bscAPIs,
        isEnabled: _isEnabled("BSC"),
        isSimple: true,
        selected: false,
        simpleAssetGateway: false,
        addressValidatorMethod: "POST",
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://xbts.io/",
        wallet: "https://ex.xbts.io/"
    },
    WAVES: {
        id: "WAVES",
        name: "WAVES",
        baseAPI: wavesAPIs,
        isEnabled: _isEnabled("WAVES"),
        isSimple: true,
        selected: false,
        simpleAssetGateway: false,
        addressValidatorMethod: "POST",
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://xbts.io/",
        wallet: "https://ex.xbts.io/"
    },
    EOS: {
        id: "EOS",
        name: "EOS",
        baseAPI: eosAPIs,
        isEnabled: _isEnabled("EOS"),
        isSimple: true,
        selected: false,
        simpleAssetGateway: false,
        addressValidatorMethod: "POST",
        options: {
            enabled: false,
            selected: false
        },
        landing: "https://xbts.io/",
        wallet: "https://ex.xbts.io/"
    }
};

export const availableBridges = {
    TRADE: {
        id: "TRADE",
        name: "Blocktrades",
        isEnabled: _isEnabled("TRADE"),
        landing: "https://blocktrades.us"
    }
};

export const gatewayPrefixes = Object.keys(availableGateways);

export function getPossibleGatewayPrefixes(bases) {
    return gatewayPrefixes.reduce((assets, prefix) => {
        bases.forEach(a => {
            assets.push(`${prefix}.${a}`);
        });
        return assets;
    }, []);
}

export default availableGateways;
