import React from "react";
import {connect} from "alt-react";

import LoadingIndicator from "../LoadingIndicator";
import LoginSelector from "../LoginSelector";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";

import {Tabs, Tab} from "../Utility/Tabs";
import {StarredMarkets, FeaturedMarkets} from "./Markets";
import {getPossibleGatewayPrefixes} from "common/gateways";

class DashboardPage extends React.Component {
    render() {
        let {
            myActiveAccounts,
            myHiddenAccounts,
            accountsReady,
            passwordAccount,
            preferredBases
        } = this.props;
        if (!accountsReady) {
            return <LoadingIndicator />;
        }

        let accountCount =
            myActiveAccounts.size +
            myHiddenAccounts.size +
            (passwordAccount ? 1 : 0);
        if (!accountCount) {
            return <LoginSelector />;
        }

        let twitterLink = (
            <a
                style={{color: "#fff"}}
                href="https://twitter.com/xbts_exchange"
                target="_blank"
            >
                Follow on XBTS DEX Exchange Twitter News
            </a>
        );

        return (
            <div className="grid-block page-layout">
                <div className="grid-block no-padding">
                    <div
                        className="grid-content app-tables no-padding"
                        ref="appTables"
                    >
                        <div className="content-block small-12">
                            <div className="showcases-grid--wrapper">
                                <div
                                    className="showcases-grid--wrapper--item--wrapper xbts-top top-item-1"
                                    tabIndex="0"
                                >
                                    <h2 className="no-margin">XBTS News</h2>
                                    <div className="showcases-grid--wrapper--item--wrapper--content">
                                        Available SmartHolder - DEX Staking! Up
                                        to 50%
                                    </div>
                                </div>

                                <div
                                    className="showcases-grid--wrapper--item--wrapper xbts-top top-item-2"
                                    tabIndex="1"
                                >
                                    <h2 className="no-margin">XBTS Lotto</h2>
                                    <div className="showcases-grid--wrapper--item--wrapper--content">
                                        Blockchain Based Lottery STH & BTS
                                        [Coming Soon]
                                    </div>
                                </div>

                                <div
                                    className="showcases-grid--wrapper--item--wrapper xbts-top top-item-3"
                                    tabIndex="2"
                                >
                                    <h2 className="no-margin">Twitter</h2>
                                    <div className="showcases-grid--wrapper--item--wrapper--content">
                                        {twitterLink}
                                    </div>
                                </div>
                            </div>
                            <div className="tabs-container generic-bordered-box">
                                <Tabs
                                    defaultActiveTab={1}
                                    segmented={false}
                                    setting="dashboardTab"
                                    className="account-tabs"
                                    tabsClass="account-overview no-padding bordered-header content-block"
                                >
                                    <Tab title="dashboard.starred_markets">
                                        <StarredMarkets />
                                    </Tab>
                                    {preferredBases.sort().map(q => {
                                        let title = (
                                            <span>
                                                <img
                                                    className="column-hide-small"
                                                    style={{
                                                        maxWidth: 30,
                                                        marginRight: 5
                                                    }}
                                                    src={`${__BASE_URL__}asset-symbols/${q
                                                        .replace(
                                                            /^BTC/,
                                                            "OPEN.BTC"
                                                        )
                                                        .toLowerCase()}.png`}
                                                />
                                                &nbsp;
                                                {q.replace("XBTSX.", "")}
                                            </span>
                                        );

                                        return (
                                            <Tab key={q} title={title}>
                                                <FeaturedMarkets
                                                    quotes={[q].concat(
                                                        getPossibleGatewayPrefixes(
                                                            [q]
                                                        )
                                                    )}
                                                />
                                            </Tab>
                                        );
                                    })}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    DashboardPage,
    {
        listenTo() {
            return [AccountStore, SettingsStore];
        },
        getProps() {
            let {
                myActiveAccounts,
                myHiddenAccounts,
                passwordAccount,
                accountsLoaded,
                refsLoaded
            } = AccountStore.getState();

            return {
                myActiveAccounts,
                myHiddenAccounts,
                passwordAccount,
                accountsReady: accountsLoaded && refsLoaded,
                preferredBases: SettingsStore.getState().preferredBases
            };
        }
    }
);
