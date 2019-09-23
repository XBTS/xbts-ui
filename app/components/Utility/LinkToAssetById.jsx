import React from "react";
import {Link} from "react-router-dom";
import AssetWrapper from "./AssetWrapper";
import AssetName from "./AssetName";
import AssetImage from "../Utility/AssetImage";

class LinkToAssetById extends React.Component {
    render() {
        const symbol = this.props.asset.get("symbol");
        const assetName = <AssetName name={symbol} noTip />;
        const assetImage = (
            <AssetImage replaceNoneToBts={false} maxWidth={18} name={symbol} />
        );
        return this.props.noLink ? (
            assetName
        ) : (
            <Link to={`/asset/${symbol}/`}>
                {assetImage} {assetName}
            </Link>
        );
    }
}

export default AssetWrapper(LinkToAssetById);
