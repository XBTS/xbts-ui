import alt from "alt-instance";

import WalletDb from "stores/WalletDb";
import {TransactionBuilder} from "bitsharesjs/es";

const STH_ASSET_ID = "1.3.4099";

class XbtsActions {
    stakeBalance(account, period, amount) {
        let tr = new TransactionBuilder();

        tr.add_type_operation("vesting_balance_create", {
            fee: {amount: "0", asset_id: STH_ASSET_ID},
            creator: account,
            owner: account,
            amount: {
                amount: amount * Math.pow(10, 6),
                asset_id: STH_ASSET_ID
            },
            policy: [
                1,
                {
                    start_claim: new Date().toISOString().slice(0, 19),
                    vesting_seconds: period
                }
            ]
        });

        return WalletDb.process_transaction(tr, null, true)
            .then(result => {})
            .catch(err => {
                console.log("vesting_balance_create err:", err);
            });
    }

    claimStakingBalance(account, cvb) {
        let tr = new TransactionBuilder();

        const balance = cvb.balance.amount;

        tr.add_type_operation("vesting_balance_withdraw", {
            fee: {amount: "0", asset_id: STH_ASSET_ID},
            owner: account,
            vesting_balance: cvb.id,
            amount: {
                amount: Math.floor(balance),
                asset_id: cvb.balance.asset_id
            }
        });

        return WalletDb.process_transaction(tr, null, true)
            .then(result => {})
            .catch(err => {
                console.log("vesting_balance_withdraw err:", err);
            });
    }
}

export default alt.createActions(XbtsActions);
