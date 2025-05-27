import React from "react";
import {connect} from "alt-react";
import accountUtils from "common/account_utils";
import {updateGatewayBackers} from "common/gatewayUtils";
//import utils from "common/utils";
import Translate from "react-translate-component";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import HelpContent from "../Utility/HelpContent";
import AccountStore from "stores/AccountStore";
import SettingsStore from "stores/SettingsStore";
import SettingsActions from "actions/SettingsActions";
import GatewayStore from "stores/GatewayStore";
import AccountImage from "../Account/AccountImage";
import PropTypes from "prop-types";
//import DepositModal from "../Modal/DepositModal";
//import WithdrawModal from "../Modal/WithdrawModalNew";
//import TranslateWithLinks from "../Utility/TranslateWithLinks";

import XbtsFiat from "../DepositWithdraw/XbtsFiat";
import XbtsxGateway from "../DepositWithdraw/xbtsx/XbtsxGateway";
import BscGateway from "../DepositWithdraw/bsc/BscGateway";
import EthGateway from "../DepositWithdraw/eth/EthGateway";
import EosGateway from "../DepositWithdraw/eos/EosGateway";
import WavesGateway from "../DepositWithdraw/waves/WavesGateway";

class AccountDepositWithdraw extends React.Component {
    static propTypes = {
        account: ChainTypes.ChainAccount.isRequired,
        contained: PropTypes.bool
    };

    static defaultProps = {
        contained: false
    };

    constructor(props) {
        super();
        this.state = {
            xbtsxService: props.viewSettings.get("xbtsxService", "gateway"),
            BscService: props.viewSettings.get("BscService", "gateway"),
            ethService: props.viewSettings.get("ethService", "gateway"),
            eosService: props.viewSettings.get("eosService", "gateway"),
            wavesService: props.viewSettings.get("wavesService", "gateway"),
            activeService: props.viewSettings.get("activeService", 0)
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.account !== this.props.account ||
            nextProps.servicesDown !== this.props.servicesDown ||
            nextState.xbtsxService !== this.state.xbtsxService ||
            nextState.BscService !== this.state.BscService ||
            nextState.ethService !== this.state.ethService ||
            nextState.eosService !== this.state.eosService ||
            nextState.wavesService !== this.state.wavesService ||
            nextState.activeService !== this.state.activeService
        );
    }

    UNSAFE_componentWillMount() {
        accountUtils.getFinalFeeAsset(this.props.account, "transfer");
    }

    toggleXbtsxService(service) {
        this.setState({
            xbtsxService: service
        });

        SettingsActions.changeViewSetting({
            xbtsxService: service
        });
    }

    toggleWavesService(service) {
        this.setState({
            wavesService: service
        });

        SettingsActions.changeViewSetting({
            wavesService: service
        });
    }

    toggleEthService(service) {
        this.setState({
            ethService: service
        });

        SettingsActions.changeViewSetting({
            ethService: service
        });
    }

    toggleEosService(service) {
        this.setState({
            eosService: service
        });

        SettingsActions.changeViewSetting({
            eosService: service
        });
    }

    toggleBscService(service) {
        this.setState({
            BscService: service
        });

        SettingsActions.changeViewSetting({
            BscService: service
        });
    }

    onSetService(e) {
        //let index = this.state.services.indexOf(e.target.value);
        this.setState({
            activeService: parseInt(e.target.value)
        });

        SettingsActions.changeViewSetting({
            activeService: parseInt(e.target.value)
        });
    }

    renderServices(
        xbtsxGatewayCoins,
        BscGatewayCoins,
        ethGatewayCoins,
        eosGatewayCoins,
        wavesGatewayCoins
    ) {
        let serList = [];
        let {account} = this.props;
        let {
            xbtsxService,
            BscService,
            ethService,
            eosService,
            wavesService
        } = this.state;

        serList.push({
            name: "ALTCOINS (Native Chains)",
            template: (
                <div className="content-block">
                    <div
                        className="service-selector"
                        style={{marginBottom: "2rem"}}
                    >
                        <ul className="button-group segmented no-margin">
                            <li
                                onClick={this.toggleXbtsxService.bind(
                                    this,
                                    "gateway"
                                )}
                                className={
                                    xbtsxService === "gateway"
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <a>
                                    <Translate content="gateway.gateway" />
                                </a>
                            </li>

                            <li
                                onClick={this.toggleXbtsxService.bind(
                                    this,
                                    "fiat"
                                )}
                                className={
                                    xbtsxService === "fiat" ? "is-active" : ""
                                }
                            >
                                <a>Fiat USD RUB EUR</a>
                            </li>
                        </ul>
                    </div>

                    {xbtsxService === "gateway" && xbtsxGatewayCoins.length ? (
                        <XbtsxGateway
                            account={account}
                            coins={xbtsxGatewayCoins}
                        />
                    ) : null}

                    {xbtsxService === "fiat" ? (
                        <XbtsFiat
                            viewSettings={this.props.viewSettings}
                            account={account}
                        />
                    ) : null}
                </div>
            )
        });

        serList.push({
            name: "BSC Network",
            identifier: "BSC",
            template: (
                <div className="content-block">
                    <div
                        className="service-selector"
                        style={{marginBottom: "2rem"}}
                    >
                        <ul className="button-group segmented no-margin">
                            <li
                                onClick={this.toggleBscService.bind(
                                    this,
                                    "gateway"
                                )}
                                className={
                                    BscService === "gateway" ? "is-active" : ""
                                }
                            >
                                <a>
                                    <Translate content="gateway.gateway" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {BscService === "gateway" && BscGatewayCoins.length ? (
                        <BscGateway account={account} coins={BscGatewayCoins} />
                    ) : null}
                </div>
            )
        });

        serList.push({
            name: "Vaulta (EOS) Network",
            template: (
                <div className="content-block">
                    <div
                        className="service-selector"
                        style={{marginBottom: "2rem"}}
                    >
                        <ul className="button-group segmented no-margin">
                            <li
                                onClick={this.toggleEosService.bind(
                                    this,
                                    "gateway"
                                )}
                                className={
                                    eosService === "gateway" ? "is-active" : ""
                                }
                            >
                                <a>
                                    <Translate content="gateway.gateway" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {eosService === "gateway" && eosGatewayCoins.length ? (
                        <EosGateway account={account} coins={eosGatewayCoins} />
                    ) : null}
                </div>
            )
        });

        serList.push({
            name: "Ethereum Network",
            template: (
                <div className="content-block">
                    <div
                        className="service-selector"
                        style={{marginBottom: "2rem"}}
                    >
                        <ul className="button-group segmented no-margin">
                            <li
                                onClick={this.toggleEthService.bind(
                                    this,
                                    "gateway"
                                )}
                                className={
                                    ethService === "gateway" ? "is-active" : ""
                                }
                            >
                                <a>
                                    <Translate content="gateway.gateway" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {ethService === "gateway" && ethGatewayCoins.length ? (
                        <EthGateway account={account} coins={ethGatewayCoins} />
                    ) : null}
                </div>
            )
        });

        serList.push({
            name: "WAVES Network",
            template: (
                <div className="content-block">
                    <div
                        className="service-selector"
                        style={{marginBottom: "2rem"}}
                    >
                        <ul className="button-group segmented no-margin">
                            <li
                                onClick={this.toggleWavesService.bind(
                                    this,
                                    "gateway"
                                )}
                                className={
                                    wavesService === "gateway"
                                        ? "is-active"
                                        : ""
                                }
                            >
                                <a>
                                    <Translate content="gateway.gateway" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {wavesService === "gateway" && wavesGatewayCoins.length ? (
                        <WavesGateway
                            account={account}
                            coins={wavesGatewayCoins}
                        />
                    ) : null}
                </div>
            )
        });

        serList.push({
            name: "Payeer (USD RUB EUR)",
            template: (
                <XbtsFiat
                    viewSettings={this.props.viewSettings}
                    account={account}
                />
            )
        });

        return serList;
    }

    render() {
        let {account, servicesDown} = this.props;
        let {activeService} = this.state;

        let xbtsxGatewayCoins = this.props.xbtsxBackedCoins
            .map(coin => {
                return coin;
            })
            .sort((a, b) => {
                if (a.symbol < b.symbol) return -1;
                if (a.symbol > b.symbol) return 1;
                return 0;
            });

        let BscGatewayCoins = this.props.BscBackedCoins.map(coin => {
            return coin;
        }).sort((a, b) => {
            if (a.symbol < b.symbol) return -1;
            if (a.symbol > b.symbol) return 1;
            return 0;
        });

        let ethGatewayCoins = this.props.ethBackedCoins
            .map(coin => {
                return coin;
            })
            .sort((a, b) => {
                if (a.symbol < b.symbol) return -1;
                if (a.symbol > b.symbol) return 1;
                return 0;
            });

        let eosGatewayCoins = this.props.eosBackedCoins
            .map(coin => {
                return coin;
            })
            .sort((a, b) => {
                if (a.symbol < b.symbol) return -1;
                if (a.symbol > b.symbol) return 1;
                return 0;
            });

        let wavesGatewayCoins = this.props.wavesBackedCoins
            .map(coin => {
                return coin;
            })
            .sort((a, b) => {
                if (a.symbol < b.symbol) return -1;
                if (a.symbol > b.symbol) return 1;
                return 0;
            });

        let services = this.renderServices(
            xbtsxGatewayCoins,
            BscGatewayCoins,
            ethGatewayCoins,
            eosGatewayCoins,
            wavesGatewayCoins
        );

        const serviceNames = [
            "XBTSX",
            "XBTS_BSC",
            "ETH",
            "EOS",
            "WAVES",
            "XbtsFiat" // XbtsFiat fiat
        ];
        let options = services.map((services_obj, index) => {
            //serviceNames.push(services_obj.identifier);
            return (
                <option key={index} value={index}>
                    {services_obj.name}
                </option>
            );
        });

        const currentServiceName = serviceNames[activeService];
        const currentServiceDown = servicesDown.get(currentServiceName);

        return (
            <div
                className={
                    this.props.contained ? "grid-content" : "grid-container"
                }
            >
                <div
                    className={this.props.contained ? "" : "grid-content"}
                    style={{paddingTop: "2rem"}}
                >
                    {/*
                    <div className="grid-block vertical medium-horizontal no-margin no-padding">
                        <div style={{paddingBottom: "1rem"}}>
                            <DepositModal
                                ref="deposit_modal"
                                modalId="deposit_modal_new"
                                account={this.props.currentAccount}
                                backedCoins={this.props.backedCoins}
                            />
                            <WithdrawModal
                                ref="withdraw_modal"
                                modalId="withdraw_modal_new"
                                backedCoins={this.props.backedCoins}
                            />
                            <TranslateWithLinks
                                string="gateway.phase_out_warning"
                                keys={[
                                    {
                                        arg: "deposit_modal_link",
                                        value: (
                                            <a
                                                onClick={() => {
                                                    if (this.refs.deposit_modal)
                                                        this.refs.deposit_modal.show();
                                                }}
                                            >
                                                <Translate content="modal.deposit.submit" />
                                            </a>
                                        )
                                    },
                                    {
                                        arg: "withdraw_modal_link",
                                        value: (
                                            <a
                                                onClick={() => {
                                                    if (
                                                        this.refs.withdraw_modal
                                                    )
                                                        this.refs.withdraw_modal.show();
                                                }}
                                            >
                                                <Translate content="modal.withdraw.submit" />
                                            </a>
                                        )
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    */}

                    <Translate content="gateway.title" component="h2" />
                    <div className="grid-block vertical medium-horizontal no-margin no-padding">
                        <div className="medium-6 show-for-medium">
                            <HelpContent
                                path="components/DepositWithdraw"
                                section="deposit-short"
                            />
                        </div>
                        <div className="medium-5 medium-offset-1">
                            <HelpContent
                                account={account.get("name")}
                                path="components/DepositWithdraw"
                                section="receive"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="grid-block vertical medium-horizontal no-margin no-padding">
                            <div className="medium-6 small-order-2 medium-order-1">
                                <Translate
                                    component="label"
                                    className="left-label"
                                    content="gateway.service"
                                />
                                <select
                                    onChange={this.onSetService.bind(this)}
                                    className="bts-select"
                                    value={activeService}
                                >
                                    {options}
                                </select>
                                {currentServiceDown ? (
                                    <Translate
                                        style={{
                                            color: "red",
                                            marginBottom: "1em",
                                            display: "block"
                                        }}
                                        content={`gateway.unavailable_${currentServiceName}`}
                                    />
                                ) : null}
                            </div>
                            <div
                                className="medium-5 medium-offset-1 small-order-1 medium-order-2"
                                style={{paddingBottom: 20}}
                            >
                                <Translate
                                    component="label"
                                    className="left-label"
                                    content="gateway.your_account"
                                />
                                <div className="inline-label">
                                    <AccountImage
                                        size={{height: 40, width: 40}}
                                        account={account.get("name")}
                                        custom_image={null}
                                    />
                                    <input
                                        type="text"
                                        value={account.get("name")}
                                        placeholder={null}
                                        disabled
                                        onChange={() => {}}
                                        onKeyDown={() => {}}
                                        tabIndex={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="grid-content no-padding"
                        style={{paddingTop: 15}}
                    >
                        {currentServiceDown
                            ? null
                            : activeService && services[activeService]
                            ? services[activeService].template
                            : services[0].template}
                    </div>
                </div>
            </div>
        );
    }
}

AccountDepositWithdraw = BindToChainState(AccountDepositWithdraw);

class DepositStoreWrapper extends React.Component {
    UNSAFE_componentWillMount() {
        updateGatewayBackers();
    }

    render() {
        return <AccountDepositWithdraw {...this.props} />;
    }
}

export default connect(DepositStoreWrapper, {
    listenTo() {
        return [AccountStore, SettingsStore, GatewayStore];
    },
    getProps() {
        return {
            currentAccount:
                AccountStore.getState().currentAccount ||
                AccountStore.getState().passwordAccount,
            account: AccountStore.getState().currentAccount,
            viewSettings: SettingsStore.getState().viewSettings,
            backedCoins: GatewayStore.getState().backedCoins,
            xbtsxBackedCoins: GatewayStore.getState().backedCoins.get(
                "XBTSX",
                []
            ),
            BscBackedCoins: GatewayStore.getState().backedCoins.get("BSC", []),
            ethBackedCoins: GatewayStore.getState().backedCoins.get("ETH", []),
            eosBackedCoins: GatewayStore.getState().backedCoins.get("EOS", []),
            wavesBackedCoins: GatewayStore.getState().backedCoins.get(
                "WAVES",
                []
            ),
            servicesDown: GatewayStore.getState().down || {}
        };
    }
});
